import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, BarChart3, Layers, DollarSign, Activity, 
  CheckCircle2, ArrowUpRight, Search, ShieldCheck, Zap
} from 'lucide-react';

interface IndexHolding {
  symbol: string;
  name: string;
  sector: string;
  weight_pct: number;
  current_price_usd: number;
  change_24h_pct: number;
  market_cap_billions: number;
}

interface CustomIndexModel {
  id: string;
  name: string;
  theme: string;
  nav_price_usd: number;
  total_market_cap_billions: number;
  expense_ratio_pct: number;
  annualized_10y_return_pct: number;
  sp500_10y_return_pct: number;
  nasdaq_10y_return_pct: number;
  msci_world_10y_return_pct: number;
  holdings_count: number;
  holdings: IndexHolding[];
  backtest_chart: { year: number; index_value: number; sp500_value: number; nasdaq_value: number }[];
  alpaca_paper_tradable: boolean;
  rebalance_frequency: string;
}

export const OskayiIndex: React.FC = () => {
  const [indices, setIndices] = useState<CustomIndexModel[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<CustomIndexModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [paperTradeAmount, setPaperTradeAmount] = useState(10000);
  const [orderNotice, setOrderNotice] = useState<string | null>(null);

  // New Index Builder modal / inputs
  const [isCreating, setIsCreating] = useState(false);
  const [newIndexName, setNewIndexName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('Artificial Intelligence & Robotics');
  const [searchStock, setSearchStock] = useState('');
  const [stockResults, setStockResults] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/index/list')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setIndices(data);
          setSelectedIndex(data[0]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSearchStocks = (query: string) => {
    setSearchStock(query);
    if (!query) {
      setStockResults([]);
      return;
    }
    fetch(`/api/index/stock-universe?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => setStockResults(data || []))
      .catch(console.error);
  };

  const handleExecutePaperTrade = async () => {
    if (!selectedIndex) return;
    try {
      const res = await fetch('/api/index/paper-trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ indexId: selectedIndex.id, amountUsd: paperTradeAmount })
      });
      const data = await res.json();
      if (data.success) {
        setOrderNotice(`Paper order executed via Alpaca API! ${data.order.shares_bought} units filled at $${data.order.execution_price_usd}/unit. Order ID: ${data.order.order_id}`);
        setTimeout(() => setOrderNotice(null), 8000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateNewIndex = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIndexName) return;

    try {
      const res = await fetch('/api/index/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newIndexName,
          theme: selectedTheme
        })
      });
      const data = await res.json();
      if (data.success && data.index) {
        setIndices(prev => [data.index, ...prev]);
        setSelectedIndex(data.index);
        setIsCreating(false);
        setNewIndexName('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 font-sans pb-20">
      {/* Bloomberg-style Top Ticker */}
      <div className="bg-[#0D1527] border-b border-amber-500/20 px-4 py-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-400 text-amber-400 font-bold uppercase tracking-wider">
            OSKAYI INDEX TERMINAL
          </span>
          <span className="text-slate-400">Institutional Algorithmic ETF & Thematic Basket Engine</span>
        </div>
        <div className="flex items-center space-x-4 text-slate-300">
          <span>S&P 500: <span className="text-emerald-400 font-mono">5,892.10 (+0.4%)</span></span>
          <span>NASDAQ: <span className="text-emerald-400 font-mono">18,410.80 (+0.9%)</span></span>
          <span>MSCI WORLD: <span className="text-emerald-400 font-mono">3,724.30 (+0.3%)</span></span>
          <span className="text-amber-400 font-semibold">FEED: TWELVE DATA & FMP LIVE</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-8 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-sm font-semibold tracking-wide uppercase">
              <Layers className="w-4 h-4" />
              <span>Global Index Fund Architecture</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Oskayi Custom Index Fund Builder
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Engineer custom indices from a universe of 500 global equities with institutional backtesting, monthly rebalancing, and paper execution via Alpaca API.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsCreating(true)}
              className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center space-x-2 transition"
            >
              <Zap className="w-4 h-4" />
              <span>Build New Index</span>
            </button>
            <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300">
              Free Tier: <span className="text-amber-400 font-semibold">1 Active Index</span>
            </div>
          </div>
        </div>

        {/* Index Selector Tabs */}
        <div className="mt-6 flex space-x-3 overflow-x-auto pb-2 scrollbar-thin">
          {indices.map(idx => (
            <button
              key={idx.id}
              onClick={() => setSelectedIndex(idx)}
              className={`px-4 py-3 rounded-xl border text-left whitespace-nowrap transition flex-shrink-0 ${
                selectedIndex?.id === idx.id
                  ? 'bg-amber-500/10 border-amber-500/60 text-white shadow-lg shadow-amber-500/10'
                  : 'bg-[#0E172A] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="text-xs uppercase font-mono text-amber-400">{idx.theme}</div>
              <div className="text-sm font-bold mt-0.5">{idx.name}</div>
              <div className="text-xs text-slate-400 mt-1 flex items-center space-x-2">
                <span>NAV: <strong className="text-white">${idx.nav_price_usd.toFixed(2)}</strong></span>
                <span className="text-emerald-400 font-semibold">+{idx.annualized_10y_return_pct}% 10Y</span>
              </div>
            </button>
          ))}
        </div>

        {orderNotice && (
          <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{orderNotice}</span>
          </div>
        )}

        {selectedIndex && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Index Metrics & 10Y Backtest & Holdings */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#0E172A] border border-slate-800 rounded-xl p-4">
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Index NAV Price</div>
                  <div className="text-2xl font-black text-amber-400 mt-1 font-mono">
                    ${selectedIndex.nav_price_usd.toFixed(2)}
                  </div>
                  <div className="text-xs text-emerald-400 mt-1 flex items-center">
                    <ArrowUpRight className="w-3 h-3 mr-0.5" />
                    <span>Real-time TWELVE DATA Feed</span>
                  </div>
                </div>

                <div className="bg-[#0E172A] border border-slate-800 rounded-xl p-4">
                  <div className="text-xs text-slate-400 uppercase tracking-wider">10-Year Ann. Return</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">
                    +{selectedIndex.annualized_10y_return_pct}%
                  </div>
                  <div className="text-xs text-slate-400 mt-1">vs S&P 500: +{selectedIndex.sp500_10y_return_pct}%</div>
                </div>

                <div className="bg-[#0E172A] border border-slate-800 rounded-xl p-4">
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Expense Ratio</div>
                  <div className="text-2xl font-black text-white mt-1 font-mono">
                    {selectedIndex.expense_ratio_pct}%
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Ultra Low Institutional Fee</div>
                </div>

                <div className="bg-[#0E172A] border border-slate-800 rounded-xl p-4">
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Rebalance Cycle</div>
                  <div className="text-lg font-bold text-white mt-1">
                    {selectedIndex.rebalance_frequency}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Constituents: {selectedIndex.holdings_count} Equities</div>
                </div>
              </div>

              {/* 10-Year Backtest Visual Table */}
              <div className="bg-[#0E172A] border border-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base font-bold text-white">10-Year Backtest Comparison (Initial $10,000 Portfolio)</h3>
                  </div>
                  <span className="text-xs text-slate-400">Twelve Data & FMP Normalized Backtest</span>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="py-2.5">Year</th>
                        <th className="py-2.5 text-amber-400 font-bold">{selectedIndex.name}</th>
                        <th className="py-2.5 text-blue-400">S&P 500 Index</th>
                        <th className="py-2.5 text-purple-400">NASDAQ 100</th>
                        <th className="py-2.5 text-right">Alpha vs S&P 500</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {selectedIndex.backtest_chart.map(row => {
                        const alpha = row.index_value - row.sp500_value;
                        return (
                          <tr key={row.year} className="hover:bg-slate-800/30">
                            <td className="py-2.5 text-slate-300 font-bold">{row.year}</td>
                            <td className="py-2.5 text-amber-400 font-bold">${row.index_value.toLocaleString()}</td>
                            <td className="py-2.5 text-blue-300">${row.sp500_value.toLocaleString()}</td>
                            <td className="py-2.5 text-purple-300">${row.nasdaq_value.toLocaleString()}</td>
                            <td className={`py-2.5 text-right font-bold ${alpha >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {alpha >= 0 ? `+$${alpha.toLocaleString()}` : `-$${Math.abs(alpha).toLocaleString()}`}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Holdings Table */}
              <div className="bg-[#0E172A] border border-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base font-bold text-white">Underlying Constituents & Weights</h3>
                  </div>
                  <span className="text-xs text-slate-400">Total Market Cap: ${(selectedIndex.total_market_cap_billions / 1000).toFixed(1)}T</span>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono">
                        <th className="py-2.5">Symbol</th>
                        <th className="py-2.5">Company Name</th>
                        <th className="py-2.5">Sector</th>
                        <th className="py-2.5 text-right">Weight</th>
                        <th className="py-2.5 text-right">Price (USD)</th>
                        <th className="py-2.5 text-right">24h Chg</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {selectedIndex.holdings.map(h => (
                        <tr key={h.symbol} className="hover:bg-slate-800/30">
                          <td className="py-2.5 font-bold text-amber-400">{h.symbol}</td>
                          <td className="py-2.5 text-slate-200 font-sans">{h.name}</td>
                          <td className="py-2.5 text-slate-400 font-sans">{h.sector}</td>
                          <td className="py-2.5 text-right font-bold text-white">{h.weight_pct}%</td>
                          <td className="py-2.5 text-right text-slate-200">${h.current_price_usd.toFixed(2)}</td>
                          <td className={`py-2.5 text-right font-semibold ${h.change_24h_pct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {h.change_24h_pct >= 0 ? `+${h.change_24h_pct}%` : `${h.change_24h_pct}%`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column: Alpaca Paper Trading & Expense Calculator */}
            <div className="space-y-6">
              {/* Paper Trading Card */}
              <div className="bg-[#0E172A] border border-amber-500/30 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <DollarSign className="w-4 h-4" />
                  <span>Alpaca API Paper Trading</span>
                </div>
                <h3 className="text-xl font-black text-white mt-1">
                  Simulate Basket Order
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Execute instantaneous zero-slippage paper allocation according to the constituent weights of {selectedIndex.name}.
                </p>

                <div className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs text-slate-300 font-semibold mb-1">
                      Allocation Capital (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400 font-mono">$</span>
                      <input
                        type="number"
                        value={paperTradeAmount}
                        onChange={e => setPaperTradeAmount(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-7 pr-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1.5 font-mono">
                    <div className="flex justify-between text-slate-400">
                      <span>Index Unit Price:</span>
                      <span className="text-white">${selectedIndex.nav_price_usd.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Estimated Units:</span>
                      <span className="text-amber-400 font-bold">{(paperTradeAmount / selectedIndex.nav_price_usd).toFixed(3)} units</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Slippage & Commission:</span>
                      <span className="text-emerald-400">$0.00 (Paper API)</span>
                    </div>
                  </div>

                  <button
                    onClick={handleExecutePaperTrade}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition flex items-center justify-center space-x-2"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Execute Basket on Alpaca Paper</span>
                  </button>
                </div>
              </div>

              {/* Expense Ratio & Savings Calculator */}
              <div className="bg-[#0E172A] border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <BarChart3 className="w-4 h-4" />
                  <span>Cost Efficiency vs Wall Street Funds</span>
                </div>
                <h4 className="text-base font-bold text-white mt-1">Expense Ratio Analysis</h4>
                
                <div className="mt-4 space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Traditional Active Mutual Fund:</span>
                      <span className="text-rose-400 font-bold">1.25% / year</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-rose-500 h-full w-[85%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Standard Thematic ETF:</span>
                      <span className="text-amber-400 font-bold">0.68% / year</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full w-[45%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>{selectedIndex.name}:</span>
                      <span className="text-emerald-400 font-bold">{selectedIndex.expense_ratio_pct}% / year</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full w-[10%]"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                  <strong>Save $18,400+ in fees</strong> over 20 years on a $100,000 portfolio compared to typical active hedge funds.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Create Custom Index */}
        {isCreating && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0E172A] border border-amber-500/40 rounded-2xl max-w-xl w-full p-6 text-slate-100 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">Create Custom Index Fund</h3>
                </div>
                <button
                  onClick={() => setIsCreating(false)}
                  className="text-slate-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateNewIndex} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs text-slate-300 font-semibold mb-1">
                    Index Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Oskayi Global Cyber & Defense 30"
                    value={newIndexName}
                    onChange={e => setNewIndexName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 font-semibold mb-1">
                    Theme / Sector Strategy
                  </label>
                  <select
                    value={selectedTheme}
                    onChange={e => setSelectedTheme(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Artificial Intelligence & Robotics">Artificial Intelligence & Robotics</option>
                    <option value="Green Energy & Solar">Green Energy & Solar</option>
                    <option value="Tech & Semiconductors">Tech & Semiconductors</option>
                    <option value="African Fintech & Telecom">African Fintech & Telecom</option>
                    <option value="Global Defense & Aerospace">Global Defense & Aerospace</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 font-semibold mb-1">
                    Search Constituent Universe (500 Stocks via Twelve Data)
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Type ticker or name (e.g. NVDA, MSFT, MTN, BABA)"
                      value={searchStock}
                      onChange={e => handleSearchStocks(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {stockResults.length > 0 && (
                    <div className="mt-2 max-h-36 overflow-y-auto bg-slate-900 border border-slate-800 rounded-lg divide-y divide-slate-800">
                      {stockResults.map((s: any) => (
                        <div key={s.symbol} className="px-3 py-1.5 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-amber-400 font-mono mr-2">{s.symbol}</span>
                            <span className="text-slate-300">{s.name}</span>
                          </div>
                          <span className="text-emerald-400 font-mono">${s.price_usd}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs"
                  >
                    Build & Backtest Index
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
