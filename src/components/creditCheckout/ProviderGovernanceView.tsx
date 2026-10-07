import React, { useState } from 'react';
import {
  Layers,
  Building,
  ShieldCheck,
  Zap,
  Globe,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Cpu,
  Lock,
  Landmark
} from 'lucide-react';
import {
  OFFICIAL_CREDIT_PROVIDERS,
  OFFICIAL_GAS_SPONSORS,
  OFFICIAL_INSURANCE_PROVIDERS,
  MANDATORY_LEGAL_DISCLOSURES
} from '../../data/creditCheckoutData';

export const ProviderGovernanceView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'CREDIT' | 'GAS' | 'INSURANCE' | 'BLOCKCHAIN'>('CREDIT');

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Layers className="w-6 h-6 text-amber-400" />
          <span>Provider Governance &amp; Regulatory Registry</span>
        </h2>
        <p className="text-xs text-slate-400 font-mono">
          Oskayi is an infrastructure orchestrator. Regulated third-party partners perform credit, insurance, and gas sponsorship functions.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
        <button
          onClick={() => setActiveCategory('CREDIT')}
          className={`px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-all border flex items-center gap-2 ${
            activeCategory === 'CREDIT'
              ? 'bg-amber-400 text-indigo-950 border-amber-300 shadow-lg'
              : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>Credit Providers ({OFFICIAL_CREDIT_PROVIDERS.length})</span>
        </button>

        <button
          onClick={() => setActiveCategory('GAS')}
          className={`px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-all border flex items-center gap-2 ${
            activeCategory === 'GAS'
              ? 'bg-amber-400 text-indigo-950 border-amber-300 shadow-lg'
              : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Gas Sponsors &amp; Paymasters ({OFFICIAL_GAS_SPONSORS.length})</span>
        </button>

        <button
          onClick={() => setActiveCategory('INSURANCE')}
          className={`px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-all border flex items-center gap-2 ${
            activeCategory === 'INSURANCE'
              ? 'bg-amber-400 text-indigo-950 border-amber-300 shadow-lg'
              : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Insurance Underwriters ({OFFICIAL_INSURANCE_PROVIDERS.length})</span>
        </button>

        <button
          onClick={() => setActiveCategory('BLOCKCHAIN')}
          className={`px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-all border flex items-center gap-2 ${
            activeCategory === 'BLOCKCHAIN'
              ? 'bg-amber-400 text-indigo-950 border-amber-300 shadow-lg'
              : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Blockchain Networks (4)</span>
        </button>
      </div>

      {/* Credit Providers Grid */}
      {activeCategory === 'CREDIT' && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6 font-mono text-xs">
            {OFFICIAL_CREDIT_PROVIDERS.map(p => (
              <div key={p.providerId} className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {p.apiStatus}
                    </span>
                    <span className="text-[10px] text-slate-400">{p.supportedCountry}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug">{p.brandName}</h3>
                  <p className="text-[11px] text-slate-400">{p.legalName}</p>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-[11px]">
                    <div>Regulator: <span className="text-amber-300">{p.regulatorName}</span></div>
                    <div>License: <span className="text-slate-200">{p.licenseNumber}</span></div>
                    <div>Underwriting: <span className="text-slate-300">{p.underwritingModel}</span></div>
                  </div>

                  <div className="space-y-1 text-[11px]">
                    <div className="text-slate-400 uppercase text-[10px] font-bold">Supported Products</div>
                    {p.supportedCreditProducts.map((cp, idx) => (
                      <div key={idx} className="p-2 rounded bg-slate-900/60 text-slate-300">
                        <div className="font-bold text-white">{cp.productName}</div>
                        <div className="text-[10px] text-amber-300">
                          GH₵ {cp.minCreditGHS.toLocaleString()} - GH₵ {cp.maxCreditGHS.toLocaleString()} • {cp.interestRateAnnualPct}% p.a.
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-900 text-[10px] text-slate-500 italic">
                  Oskayi communicates via secure mTLS API adapter. Oskayi is not the lender.
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gas Sponsors Grid */}
      {activeCategory === 'GAS' && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6 font-mono text-xs">
            {OFFICIAL_GAS_SPONSORS.map(s => (
              <div key={s.sponsorId} className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {s.sponsorshipStatus}
                    </span>
                    <span className="text-[10px] text-slate-400">{s.sponsorType}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug">{s.sponsorName}</h3>
                  <p className="text-[11px] text-slate-400">{s.supportedChain}</p>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-[11px]">
                    <div>Paymaster Contract:</div>
                    <div className="text-[10px] text-indigo-300 truncate">{s.paymasterContractAddress}</div>
                    <div className="pt-1">Daily Cap: <span className="text-amber-300">GH₵ {s.dailyLimitGHS.toLocaleString()}</span></div>
                    <div>Max Per Tx: <span className="text-emerald-400">GH₵ {s.maxSponsorshipPerTxGHS}</span></div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 text-[11px] text-amber-300">
                    {s.legalDisclosure}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-900 text-[10px] text-slate-500 italic">
                  ERC-4337 EntryPoint v0.7 Compliant Paymaster Relayer.
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insurance Underwriters */}
      {activeCategory === 'INSURANCE' && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6 font-mono text-xs">
            {OFFICIAL_INSURANCE_PROVIDERS.map(ins => (
              <div key={ins.providerId} className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {ins.apiStatus}
                  </span>
                  <span className="text-[10px] text-slate-400">NIC Ghana Authorized</span>
                </div>

                <h3 className="text-base font-bold text-white">{ins.brandName}</h3>
                <p className="text-xs text-slate-400">{ins.legalName} • License #{ins.licenseNumber}</p>

                <div className="space-y-3 pt-2">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Active Policies</div>
                  {ins.products.map(prod => (
                    <div key={prod.productCode} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="flex justify-between">
                        <span className="font-bold text-white">{prod.productName}</span>
                        <span className="text-emerald-400 font-bold">{prod.premiumRatePct}% Premium</span>
                      </div>
                      <p className="text-[11px] text-slate-300">{prod.termsSummary}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blockchain Networks */}
      {activeCategory === 'BLOCKCHAIN' && (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
          {[
            { name: 'Polygon POS', chainId: 137, rpc: 'https://polygon-rpc.com', status: 'LIVE', latency: '42ms' },
            { name: 'Arbitrum One', chainId: 42161, rpc: 'https://arb1.arbitrum.io/rpc', status: 'LIVE', latency: '38ms' },
            { name: 'Base Network', chainId: 8453, rpc: 'https://mainnet.base.org', status: 'LIVE', latency: '48ms' },
            { name: 'Ethereum Mainnet', chainId: 1, rpc: 'https://eth.llamarpc.com', status: 'LIVE', latency: '65ms' }
          ].map(net => (
            <div key={net.chainId} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between">
                <span className="font-bold text-white">{net.name}</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                  {net.status}
                </span>
              </div>
              <div className="text-slate-400 text-[11px]">Chain ID: {net.chainId}</div>
              <div className="text-slate-500 text-[10px] truncate">{net.rpc}</div>
              <div className="text-emerald-400 text-[10px] font-bold">Latency: {net.latency}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
