import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Coins, 
  ShieldAlert, 
  Zap, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  Cpu, 
  Lock, 
  Globe2, 
  TrendingUp, 
  Layers, 
  Radio, 
  Terminal, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Server,
  Sliders,
  Play,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Clock,
  Calendar,
  Layers3,
  FileCode2,
  CheckCheck,
  Send,
  AlertCircle,
  Code2
} from 'lucide-react';

interface GlobalTreasurySectionProps {
  onSelectServiceForInquiry?: (serviceTitle: string) => void;
}

export const GlobalTreasuryFintechSection: React.FC<GlobalTreasurySectionProps> = ({
  onSelectServiceForInquiry
}) => {
  const [activeTab, setActiveTab] = useState<'treasury-dashboard' | 'connectors' | 'rules-engine' | 'architecture-doc'>('treasury-dashboard');
  
  // Treasury State
  const [treasuryData, setTreasuryData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Dynamic Rule Execution States
  const [testAmount, setTestAmount] = useState<number>(8500);
  const [testCurrency, setTestCurrency] = useState<string>('GHS');
  const [testCountry, setTestCountry] = useState<string>('Ghana');
  const [optimalRailResult, setOptimalRailResult] = useState<any>(null);
  const [evaluatingRail, setEvaluatingRail] = useState<boolean>(false);

  // Sweeping State
  const [sweepingStatus, setSweepingStatus] = useState<any>(null);
  const [isSweeping, setIsSweeping] = useState<boolean>(false);

  // Payroll Batch State
  const [payrollStatus, setPayrollStatus] = useState<any>(null);
  const [isTriggeringPayroll, setIsTriggeringPayroll] = useState<boolean>(false);

  // Expanded card state for fintech engines
  const [expandedEngineId, setExpandedEngineId] = useState<string | null>('engine1');

  // Fetch live treasury data
  const fetchTreasury = async () => {
    try {
      const res = await fetch('/api/treasury/overview');
      if (res.ok) {
        const json = await res.json();
        setTreasuryData(json);
      }
    } catch (e) {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreasury();
  }, []);

  // Run Optimal Rail Selection
  const handleSelectOptimalRail = async () => {
    setEvaluatingRail(true);
    try {
      const res = await fetch('/api/treasury/rails/select-optimal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: testAmount,
          currency: testCurrency,
          recipientCountry: testCountry,
          urgency: 'REAL_TIME'
        })
      });
      if (res.ok) {
        const json = await res.json();
        setOptimalRailResult(json);
      }
    } catch (e) {
      // ignore
    } finally {
      setEvaluatingRail(false);
    }
  };

  useEffect(() => {
    handleSelectOptimalRail();
  }, [testAmount, testCurrency, testCountry]);

  // Execute Auto-Sweep Rule
  const handleTriggerSweep = async () => {
    setIsSweeping(true);
    try {
      const res = await fetch('/api/treasury/rules/execute-sweep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceConnector: 'Paystack',
          sourceCurrency: 'GHS',
          thresholdAmount: 100000,
          targetAccount: 'Ecobank USD Base Treasury'
        })
      });
      if (res.ok) {
        const json = await res.json();
        setSweepingStatus(json);
        fetchTreasury();
      }
    } catch (e) {
      // ignore
    } finally {
      setIsSweeping(false);
    }
  };

  // Trigger Recurring Payroll Batch
  const handleTriggerPayroll = async () => {
    setIsTriggeringPayroll(true);
    try {
      const res = await fetch('/api/treasury/schedules/trigger-recurring', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batchType: 'Mid-Month Contractor & Engineering Payroll',
          totalRecipients: 42,
          totalAmountGhs: 245000
        })
      });
      if (res.ok) {
        const json = await res.json();
        setPayrollStatus(json);
      }
    } catch (e) {
      // ignore
    } finally {
      setIsTriggeringPayroll(false);
    }
  };

  // 4 Core Fintech Engines (Renamed without mentioning any amounts)
  const fintechEngines = [
    {
      id: 'engine1',
      tag: 'FINTECH ENGINE 01',
      title: 'Autonomous Sovereign SBLC Syndication',
      headline: 'Multi-Bank Infrastructure Syndicator & Contractor Escrow',
      summary: 'Replaces months of manual corporate banking syndication with automated multi-bank MT760 SBLC aggregation, automatically reserving an institutional escrow for certified turnkey EPC builders.',
      icon: Building2,
      accent: 'border-[#D4AF37]',
      technicalBenefits: [
        {
          title: 'Automated Multi-Bank Tranche Aggregation',
          description: 'Orchestrates institutional credit tranches per participating tier-1 bank into a unified sovereign facility without bilateral balance-sheet strain.',
          metric: 'Automated Multi-Bank Rail'
        },
        {
          title: 'Cryptographic 4-Milestone Contractor Escrow',
          description: 'Project capital is held in an irrevocable institutional escrow account disbursed strictly upon certified FIDIC engineer LiDAR milestone audits.',
          metric: 'Milestone Disbursed'
        },
        {
          title: 'Comprehensive Risk & Insurance Wrap',
          description: 'Structures a pre-underwritten insurance wrap policy covering non-payment, political force majeure, and debt moratorium events.',
          metric: 'AAA-Equivalent Wrap'
        },
        {
          title: 'Tri-Jurisdictional SPV Capital Architecture',
          description: 'Combines Ghana IP operational holding, Mauritius Double Taxation Treaty neutrality, and Dubai DIFC capital security under English Common Law.',
          metric: 'Zero Tax Leakage'
        }
      ],
      apiProviders: [
        {
          name: 'Bottomline Business Connect',
          category: 'SWIFT & ISO 20022 Financial Messaging Gateway',
          protocol: 'MT760 (Guarantees) & MT799 (Pre-Advice)',
          liveEndpoint: 'https://api.bottomline.com/financial-messaging/swift-net/mt760/v2',
          realtimeRole: 'Executes automated issuance, authentication, and Swift gpi tracking of SBLC tranches.'
        },
        {
          name: 'Finastra Fusion Fabric & Syndication Rails',
          category: 'Global Core Banking Syndication Engine',
          protocol: 'REST / Open Banking Webhooks',
          liveEndpoint: 'https://api.fusionfabric.cloud/corporate-lending/syndications/v1',
          realtimeRole: 'Distributes multi-bank participations, calculates facility interest spreads, and syncs borrower ledgers.'
        },
        {
          name: 'Ecobank & Standard Chartered Interbank Rails',
          category: 'Institutional Custodian & Escrow Agent',
          protocol: 'Host-to-Host (H2H) SFTP & REST API',
          liveEndpoint: 'https://api.sc.com/v1/corporate/escrow-disbursement',
          realtimeRole: 'Holds construction reserves and executes verified contractor milestone wires.'
        }
      ]
    },
    {
      id: 'engine2',
      tag: 'FINTECH ENGINE 02',
      title: 'Real-World Asset (RWA) Infrastructure Yield',
      headline: 'Industrial Cashflow & Clean Energy Micro-Grid Tokenization',
      summary: 'Wraps physical energy grids, pipelines, and telecom spines into digital securities with per-second continuous cashflow streaming backed by long-term power purchase agreements.',
      icon: Coins,
      accent: 'border-emerald-500',
      technicalBenefits: [
        {
          title: 'Permissioned ERC-3643 Institutional Token Standard',
          description: 'Enforces automated on-chain compliance, investor whitelist KYC/AML, and jurisdictional transfer restrictions directly in smart contract bytecode.',
          metric: '100% Compliant'
        },
        {
          title: 'Continuous Streaming Yield Vaults',
          description: 'Off-taker revenue streams per second to token holders, eliminating conventional bond coupon payment delays.',
          metric: 'Per-Second Streaming'
        },
        {
          title: 'Bankruptcy-Remote SPV Ring-Fencing',
          description: 'Legal title of physical infrastructure and transformers is held by an independent trust SPV, immune from developer insolvency.',
          metric: 'Insolvency Shield'
        },
        {
          title: 'Fractional Institutional Access',
          description: 'Opens institutional-grade infrastructure yields to global diaspora capital with automated compliance checks.',
          metric: 'Fractionalized Access'
        }
      ],
      apiProviders: [
        {
          name: 'Cloudflare Public Ethereum Gateway',
          category: 'Distributed Open RPC Blockchain Infrastructure',
          protocol: 'JSON-RPC 2.0 (eth_blockNumber, eth_call)',
          liveEndpoint: 'https://cloudflare-eth.com',
          realtimeRole: 'Verifies on-chain contract states, block timestamps, and state proof validity in real time.'
        },
        {
          name: 'Chainlink Decentralized Oracle Network',
          category: 'Off-Chain IoT & Financial Proof-of-Reserve',
          protocol: 'Chainlink Data Feeds & Proof of Reserve (PoR)',
          liveEndpoint: 'https://data.chain.link/feeds/ethereum/mainnet/por-reserves',
          realtimeRole: 'Streams certified solar inverter power output (kWh) from Scada IoT devices onto the smart contract ledger.'
        },
        {
          name: 'Superfluid Protocol Streaming Framework',
          category: 'Real-Time Money Streaming Smart Contracts',
          protocol: 'Superfluid CFA (Constant Flow Agreement)',
          liveEndpoint: 'https://api.superfluid.finance/subgraphs/name/superfluid-root',
          realtimeRole: 'Splits monthly sovereign PPA payments into per-second continuous balance distributions.'
        }
      ]
    },
    {
      id: 'engine3',
      tag: 'FINTECH ENGINE 03',
      title: 'Parametric Climate & Cargo Risk Oracles',
      headline: 'Autonomous Zero-Paperwork Parametric Insurance',
      summary: 'Replaces prolonged loss-adjustment delays with satellite radar and maritime AIS beacons, triggering automated smart contract escrow liquidity payouts in under 120 seconds.',
      icon: ShieldAlert,
      accent: 'border-blue-500',
      technicalBenefits: [
        {
          title: 'Deterministic Binary Trigger Conditions',
          description: 'Payouts activate mathematically when verifiable external data thresholds are crossed without manual claim adjusters.',
          metric: 'Zero Human Adjuster'
        },
        {
          title: 'Rapid Liquidity Payout Velocity',
          description: 'Claims are disbursed automatically from pre-funded capital vaults directly to the enterprise bank IBAN or mobile wallet in under two minutes.',
          metric: '< 120 Seconds Payout'
        },
        {
          title: 'Direct Satellite Earth Observation Feeds',
          description: 'Pulls synthetic aperture radar data from European Space Agency (ESA) Copernicus Sentinel satellites, preventing tampering.',
          metric: '10m Spatial Resolution'
        },
        {
          title: 'Significant Overhead Cost Reduction',
          description: 'Eliminating manual claims inspectors and paperwork filings drastically lowers policy premiums.',
          metric: 'Cost Minimized'
        }
      ],
      apiProviders: [
        {
          name: 'European Space Agency (ESA) Copernicus Program',
          category: 'Earth Observation & Satellite Synthetic Aperture Radar',
          protocol: 'Copernicus Data Space Ecosystem REST API',
          liveEndpoint: 'https://dataspace.copernicus.eu/api/v1/radar/hydro',
          realtimeRole: 'Supplies real-time precipitation, drought indices, and flood inundation vectors.'
        },
        {
          name: 'MarineTraffic & AIS Satellite Tracking',
          category: 'Global Maritime & Port Telemetry',
          protocol: 'AIS Open Ship Position Feed',
          liveEndpoint: 'https://services.marinetraffic.com/api/exportvessels/v:8',
          realtimeRole: 'Monitors container vessels, canal transit times, and port berthing delays along major trade lanes.'
        },
        {
          name: 'Curacel Grow Underwriting Consortium',
          category: 'Pan-African Embedded Insurance Engine',
          protocol: 'Curacel Underwriting & Claims API',
          liveEndpoint: 'https://api.curacel.co/v2/grow/parametric/quote',
          realtimeRole: 'Underwrites risk capacity with Lloyd’s and Munich Re reinsurance consortiums.'
        }
      ]
    },
    {
      id: 'engine4',
      tag: 'FINTECH ENGINE 04',
      title: 'Zero-Gas Pan-African Interoperability Gateway',
      headline: 'Account-Abstraction Mobile Money & AfCFTA Native Rails',
      summary: 'ERC-4337 Account Abstraction paymaster bridging GHS, KES, NGN, and mobile money networks with GH₵0 in native blockchain gas tokens required from customers.',
      icon: Zap,
      accent: 'border-purple-500',
      technicalBenefits: [
        {
          title: 'ERC-4337 Sponsored Transactions (Zero-Gas)',
          description: 'Customers hold GH₵0 in native crypto gas tokens. Independent paymaster contracts sponsor on-chain execution transparently.',
          metric: 'GH₵0 Customer Gas'
        },
        {
          title: 'AfCFTA Local-to-Local Currency Netting',
          description: 'Settles transactions directly between African currencies without routing through intermediary USD or EUR correspondent banks.',
          metric: 'Saves 5.5% FX Loss'
        },
        {
          title: 'Direct Telco Mobile Money Interoperability',
          description: 'Instant bilateral clearing between MTN MoMo, Airtel Money, Safaricom M-Pesa, Telebirr, and commercial bank ACH networks.',
          metric: '4.8s Settlement'
        },
        {
          title: 'Automated Sanctions & AML Screening',
          description: 'Every transaction is screened against real-time OFAC, UN, and regional African sanctions databases prior to authorization.',
          metric: '100% Real-Time AML'
        }
      ],
      apiProviders: [
        {
          name: 'Frankfurter European Central Bank Open FX',
          category: 'Real-Time Interbank Currency Exchange Feed',
          protocol: 'Frankfurter Open API (ECB Reference Data)',
          liveEndpoint: 'https://api.frankfurter.app/latest?from=USD',
          realtimeRole: 'Provides unmanipulated, open central bank reference exchange rates for international pricing.'
        },
        {
          name: 'PAPSS (Pan-African Payment & Settlement System)',
          category: 'African Union & Afreximbank Central Rail',
          protocol: 'ISO 20022 Cross-Border Clearing API',
          liveEndpoint: 'https://api.papss.com/v1/clearing/instant-netting',
          realtimeRole: 'Enables instant cross-border multilateral local currency netting under AfCFTA treaties.'
        },
        {
          name: 'ERC-4337 Decentralized Paymaster Infrastructure',
          category: 'Smart Contract Account Abstraction Rail',
          protocol: 'ERC-4337 UserOperation JSON-RPC',
          liveEndpoint: 'https://bundler.oskayiconsult.com/rpc/v1/paymaster',
          realtimeRole: 'Validates policy constraints and injects paymasterAndData signatures to sponsor blockchain gas fees.'
        }
      ]
    }
  ];

  return (
    <section id="treasury-orchestration" className="py-24 bg-[#070E1E] text-slate-100 border-t border-[#D4AF37]/20 relative overflow-hidden">
      
      {/* Background Subtle Tech Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#D4AF37]/15 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-16">
        
        {/* ========================================================================= */}
        {/* PART 1: GLOBAL TREASURY & CASH MANAGEMENT ORCHESTRATION SERVICE */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1931] border border-[#D4AF37]/40 text-xs font-semibold text-[#D4AF37] shadow-lg shadow-[#D4AF37]/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Global Treasury & Cash Management Service</span>
              <span className="text-slate-500">|</span>
              <span className="text-white">Paystack Core Rail + Multi-PSP & Bank Connectors</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Unified Treasury & <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] bg-clip-text text-transparent">Cash Management Orchestration</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
              Designed for digital businesses operating across Africa and globally. Integrates multiple Payment Service Providers (PSPs), commercial banks, open-banking gateways, and accounting SaaS into a single normalized cash ledger with automated sweeping and intelligent rail routing.
            </p>
          </div>

          {/* Navigation Tabs for Treasury Suite */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-2">
            <button
              onClick={() => setActiveTab('treasury-dashboard')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'treasury-dashboard'
                  ? 'bg-[#D4AF37] text-[#0A1931] shadow-md shadow-[#D4AF37]/20'
                  : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Treasury Dashboard & Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('connectors')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'connectors'
                  ? 'bg-[#D4AF37] text-[#0A1931] shadow-md shadow-[#D4AF37]/20'
                  : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Layers3 className="w-3.5 h-3.5" />
              <span>Connectors (Paystack, Stripe, Banks)</span>
            </button>

            <button
              onClick={() => setActiveTab('rules-engine')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'rules-engine'
                  ? 'bg-[#D4AF37] text-[#0A1931] shadow-md shadow-[#D4AF37]/20'
                  : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Rules: Auto-Sweep & Optimal Routing</span>
            </button>

            <button
              onClick={() => setActiveTab('architecture-doc')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'architecture-doc'
                  ? 'bg-[#D4AF37] text-[#0A1931] shadow-md shadow-[#D4AF37]/20'
                  : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Architecture Doc & Connector Interface</span>
            </button>
          </div>

          {/* TAB 1: TREASURY DASHBOARD (CASH BY ENTITY/CURRENCY, FORECAST, RAIL PERFORMANCE) */}
          {activeTab === 'treasury-dashboard' && (
            <div className="bg-[#0A1931] rounded-3xl border border-[#D4AF37]/30 p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in duration-200">
              
              {/* Top Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#070E1E] p-5 rounded-2xl border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-[#D4AF37] font-bold">TOTAL NORMALIZED CASH</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">
                    ${treasuryData ? treasuryData.totalCashNormalizedUsd.toLocaleString() : '829,189.97'}
                  </div>
                  <div className="text-[11px] text-slate-400">Consolidated Base Currency: USD</div>
                </div>

                <div className="bg-[#070E1E] p-5 rounded-2xl border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold">CORE RAIL ACTIVE (PAYSTACK)</div>
                  <div className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Paystack Live</span>
                  </div>
                  <div className="text-[11px] text-slate-400">Active in Ghana, Nigeria, Kenya, SA</div>
                </div>

                <div className="bg-[#070E1E] p-5 rounded-2xl border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-blue-400 font-bold">30-DAY CASH FORECAST</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">
                    ${treasuryData?.forecast ? treasuryData.forecast.day30ProjectedUsd.toLocaleString() : '1,119,406.46'}
                  </div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>+35% Inflow Projection</span>
                  </div>
                </div>

                <div className="bg-[#070E1E] p-5 rounded-2xl border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-purple-400 font-bold">PENDING OBLIGATIONS</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">
                    ${((treasuryData?.forecast?.pendingPayrollUsd || 48500) + (treasuryData?.forecast?.pendingVendorInvoicesUsd || 92400)).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-400">Payroll: $48.5K · Vendors: $92.4K</div>
                </div>
              </div>

              {/* Cash by Entity & Currency Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Entities */}
                <div className="bg-[#070E1E] p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#D4AF37]" />
                      <span>Cash by Operating Entity & Jurisdiction</span>
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400">UNIFIED MULTI-ENTITY</span>
                  </div>

                  <div className="space-y-2.5">
                    {treasuryData?.entities?.map((ent: any) => (
                      <div key={ent.id} className="p-3 bg-[#0A1931] rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-white">{ent.name}</div>
                          <div className="text-[10px] text-slate-400">{ent.jurisdiction} · Base: {ent.baseCurrency}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-[#D4AF37]">${ent.balanceUsd.toLocaleString()}</div>
                          <div className="text-[10px] text-emerald-400 font-semibold">Ledger Synced</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rail Performance Analytics */}
                <div className="bg-[#070E1E] p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-400" />
                      <span>Payment Rail Performance & Benchmarking</span>
                    </h3>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">REAL-TIME TELEMETRY</span>
                  </div>

                  <div className="space-y-2.5">
                    {treasuryData?.railPerformance?.map((rail: any, idx: number) => (
                      <div key={idx} className="p-3 bg-[#0A1931] rounded-xl border border-slate-800 space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{rail.rail}</span>
                          <span className="font-mono text-emerald-400 font-bold">{rail.successRate} Success</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Latency: <strong className="text-white">{rail.avgLatencySec}s</strong></span>
                          <span>Cost Score: <strong className="text-[#D4AF37]">{rail.costScore}</strong></span>
                          <span className="text-slate-300 font-semibold">{rail.recommendation}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: CONNECTORS (PAYSTACK CORE + STRIPE + BANKS + ACCOUNTING SAAS) */}
          {activeTab === 'connectors' && (
            <div className="bg-[#0A1931] rounded-3xl border border-[#D4AF37]/30 p-6 sm:p-10 shadow-2xl space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-xl font-bold text-white">Pluggable Connector Registry</h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Start with Paystack fully integrated as the primary African rail; other PSPs and banks operate as standardized pluggable adapter modules.
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold shrink-0">
                  4 CONNECTORS ONLINE
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {treasuryData?.connectors?.map((conn: any) => (
                  <div key={conn.id} className="bg-[#070E1E] p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-[#D4AF37] font-bold block">{conn.type}</span>
                        <h4 className="text-lg font-bold text-white">{conn.name}</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                        {conn.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs bg-[#0A1931] p-3 rounded-xl border border-slate-800/80">
                      <div>
                        <span className="text-slate-400 text-[10px] block">Currencies:</span>
                        <span className="font-mono text-white">{conn.currencies.join(', ')}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Settlement:</span>
                        <span className="font-mono text-slate-200">{conn.settlementSpeed}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Active Tariff:</span>
                        <span className="font-mono text-[#D4AF37]">{conn.activeFee}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Ledger Sync:</span>
                        <span className="text-emerald-400 font-semibold">Real-Time Webhook</span>
                      </div>
                    </div>

                    {conn.balances && conn.balances.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Unsettled / Floated Balances:</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {conn.balances.map((bal: any, bIdx: number) => (
                            <div key={bIdx} className="p-2 bg-[#0A1931] rounded-lg border border-slate-800 flex justify-between">
                              <span className="font-bold text-white">{bal.currency}</span>
                              <span className="font-mono text-slate-300">{bal.amount.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: RULES ENGINE (AUTO-SWEEPS, OPTIMAL ROUTING, RECURRING PAYMENTS) */}
          {activeTab === 'rules-engine' && (
            <div className="bg-[#0A1931] rounded-3xl border border-[#D4AF37]/30 p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in duration-200">
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Rule A: Optimal Payment Rail Selection */}
                <div className="bg-[#070E1E] p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#D4AF37]" />
                      <span>Rule 1: Optimal Rail Selection Per Transaction</span>
                    </h3>
                    <span className="text-[10px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded font-bold">
                      COST & SPEED ROUTER
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Evaluates payment amount, currency, counterparty bank, and priority to route via the most cost-efficient and fastest available rail (Paystack for domestic Africa vs. Stripe for US/EU vs. Ecobank RTGS for high-value corporate wires).
                  </p>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Amount</label>
                      <input
                        type="number"
                        value={testAmount}
                        onChange={(e) => setTestAmount(Number(e.target.value))}
                        className="w-full bg-[#0A1931] border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Currency</label>
                      <select
                        value={testCurrency}
                        onChange={(e) => setTestCurrency(e.target.value)}
                        className="w-full bg-[#0A1931] border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="GHS">GHS (Ghana)</option>
                        <option value="NGN">NGN (Nigeria)</option>
                        <option value="USD">USD (International)</option>
                        <option value="EUR">EUR (Europe)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Destination</label>
                      <select
                        value={testCountry}
                        onChange={(e) => setTestCountry(e.target.value)}
                        className="w-full bg-[#0A1931] border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Ghana">Ghana</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Kenya">Kenya</option>
                        <option value="UK/US">UK / US</option>
                      </select>
                    </div>
                  </div>

                  {optimalRailResult && (
                    <div className="p-4 bg-[#0A1931] rounded-xl border border-emerald-500/40 text-xs space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Optimal Rail Selected:</span>
                        <strong className="text-emerald-400 text-sm font-bold">{optimalRailResult.recommendedRail}</strong>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Execution Velocity:</span>
                        <span className="text-white font-mono">{optimalRailResult.executionSpeed}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Estimated Transaction Fee:</span>
                        <span className="text-[#D4AF37] font-mono font-bold">GH₵{optimalRailResult.estimatedFee} ({optimalRailResult.savingsVsUnoptimizedPct} saved)</span>
                      </div>
                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300">
                        <strong>Routing Logic: </strong>{optimalRailResult.routingLogic}
                      </div>
                    </div>
                  )}
                </div>

                {/* Rule B: Auto-Sweeping Excess Balances */}
                <div className="bg-[#070E1E] p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span>Rule 2: Excess Balance Auto-Sweep to Base Account</span>
                    </h3>
                    <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
                      LIQUIDITY HARVESTER
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Monitors operating balances across Paystack and regional bank accounts. When any wallet exceeds a preset threshold (e.g. GH₵100,000), excess funds are swept automatically into the central USD Treasury Account.
                  </p>

                  <div className="p-4 bg-[#0A1931] rounded-xl border border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Source Rail:</span>
                      <strong className="text-white">Paystack Ghana Operating Wallet</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current Balance:</span>
                      <strong className="text-white">GH₵285,000.00</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Sweeping Rule Threshold:</span>
                      <strong className="text-[#D4AF37]">Above GH₵100,000</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Destination Account:</span>
                      <strong className="text-white">Ecobank USD Base SPV Account</strong>
                    </div>
                  </div>

                  <button
                    onClick={handleTriggerSweep}
                    disabled={isSweeping}
                    className="w-full py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#FFF3B0] text-[#0A1931] font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    {isSweeping ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                    <span>Execute Auto-Sweep Rule Now</span>
                  </button>

                  {sweepingStatus && (
                    <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs text-emerald-200 flex items-center justify-between">
                      <span>Swept GH₵{sweepingStatus.excessSweptAmount.toLocaleString()} to USD Base Account (${sweepingStatus.creditedBaseUsd.toLocaleString()})</span>
                      <CheckCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                  )}
                </div>

              </div>

              {/* Rule C: Scheduled Recurring Disbursements (Payroll & Vendors) */}
              <div className="bg-[#070E1E] p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span>Rule 3: Recurring Payments & Automated Payroll Execution</span>
                  </h3>
                  <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-bold">
                    BATCH DISBURSEMENT ENGINE
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3.5 bg-[#0A1931] rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[10px]">Active Schedule:</span>
                    <strong className="text-white text-sm">Monthly Contractor & Vendor Payroll</strong>
                    <div className="text-[11px] text-slate-400">42 Staff & Contractors (GHS & NGN)</div>
                  </div>

                  <div className="p-3.5 bg-[#0A1931] rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[10px]">Disbursement Core Rail:</span>
                    <strong className="text-emerald-400 text-sm">Paystack Bulk Transfers API</strong>
                    <div className="text-[11px] text-slate-400">Direct-to-Mobile Money & Bank NUBAN</div>
                  </div>

                  <div className="p-3.5 bg-[#0A1931] rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[10px]">Reconciliation:</span>
                    <strong className="text-[#D4AF37] text-sm">2-Way Sync with QuickBooks / Xero</strong>
                    <div className="text-[11px] text-slate-400">Zero Manual Data Entry</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-400">Next Scheduled Trigger: 15th & 30th of the month (Auto-executing via cron)</span>
                  <button
                    onClick={handleTriggerPayroll}
                    disabled={isTriggeringPayroll}
                    className="px-5 py-2 bg-[#0A1931] hover:bg-[#132746] text-[#D4AF37] border border-[#D4AF37]/40 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                  >
                    {isTriggeringPayroll ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    <span>Trigger Verified Batch Test</span>
                  </button>
                </div>

                {payrollStatus && (
                  <div className="p-3 bg-purple-950/40 border border-purple-500/40 rounded-xl text-xs text-purple-200 flex items-center justify-between">
                    <span>Batch {payrollStatus.batchId} processed: GH₵{payrollStatus.totalDisbursedGhs.toLocaleString()} disbursed across {payrollStatus.totalRecipients} recipients with 0 errors.</span>
                    <CheckCheck className="w-4 h-4 text-purple-400" />
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 4: ARCHITECTURE DOC, CONNECTOR INTERFACE, AND MVP SCOPE */}
          {activeTab === 'architecture-doc' && (
            <div className="bg-[#0A1931] rounded-3xl border border-[#D4AF37]/30 p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in duration-200 text-xs">
              
              {/* Architecture Overview */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileCode2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>1. Architecture Documentation & Structural Design</span>
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm">
                  The Oskayi Global Treasury Orchestration layer abstracts disparate bank proprietary interfaces and PSP protocols into a canonical double-entry ledger. All financial movements (inflows, payouts, sweeps, fees) are normalized in real time into an immutable transactional ledger per tenant enterprise.
                </p>
                <div className="bg-[#070E1E] p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto">
{`+-------------------------------------------------------------------------------------------------+
|                          DIGITAL BUSINESS APPLICATION / FINANCE TEAM                            |
+-------------------------------------------------------------------------------------------------+
                                               |
                                     (Unified Treasury API)
                                               v
+-------------------------------------------------------------------------------------------------+
|                     OSKAYI UNIFIED TREASURY & CASH MANAGEMENT ORCHESTRATOR                      |
|                                                                                                 |
|   [ Normalized Treasury Ledger ]    [ Auto-Sweep Engine ]    [ Smart Rail Optimization Router ]  |
+-------------------------------------------------------------------------------------------------+
          |                                  |                                     |
          v                                  v                                     v
+--------------------+            +----------------------+              +----------------------+
|  PaystackConnector |            |   StripeConnector    |              |  OpenBankingConnector|
|  (Core Africa PSP) |            |  (Global / US Cards) |              |  (Ecobank / SC H2H)  |
+--------------------+            +----------------------+              +----------------------+
          |                                  |                                     |
          v                                  v                                     v
[ Paystack Transfers API ]        [ Stripe Payouts API ]                [ Bank ISO 20022 / ACH ]`}
                </div>
              </div>

              {/* Connector Interface Specification */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>2. Pluggable Connector Interface (`TreasuryConnector`)</span>
                </h3>
                <div className="bg-[#070E1E] p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-[#D4AF37] overflow-x-auto">
{`export interface TreasuryConnector {
  readonly connectorId: string;
  readonly connectorType: 'PSP' | 'BANK' | 'ACCOUNTING_SAAS';
  
  // Real-time balance normalization
  fetchBalances(accountId: string): Promise<NormalizedBalance[]>;
  
  // Outbound disbursement & routing
  initiatePayout(params: {
    amount: number;
    currency: string;
    recipientAccount: RecipientDetails;
    idempotencyKey: string;
  }): Promise<PayoutResult>;
  
  // Auto-sweeping & ledger reconciliation
  executeSweep(params: {
    sourceCurrency: string;
    targetAccount: string;
    amount: number;
  }): Promise<SweepExecutionResult>;
  
  // Webhook listener & idempotent event ingest
  handleWebhook(rawBody: string, signature: string): Promise<NormalizedTransactionEvent>;
}`}
                </div>
              </div>

              {/* MVP Scope Specification */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCheck className="w-4 h-4 text-purple-400" />
                  <span>3. Production MVP Scope Breakdown</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#070E1E] rounded-xl border border-slate-800 space-y-1">
                    <strong className="text-white text-xs block">Phase 1: Paystack Core Integration</strong>
                    <p className="text-slate-400 text-[11px]">
                      Full bidirectional connection to Paystack dedicated virtual accounts, mobile money rails (Ghana, Nigeria, Kenya), and bulk transfers.
                    </p>
                  </div>
                  <div className="p-4 bg-[#070E1E] rounded-xl border border-slate-800 space-y-1">
                    <strong className="text-white text-xs block">Phase 2: Unified Multi-Entity Ledger</strong>
                    <p className="text-slate-400 text-[11px]">
                      Single pane of glass normalizing all foreign exchange balances into USD base currency with daily mark-to-market central bank feeds.
                    </p>
                  </div>
                  <div className="p-4 bg-[#070E1E] rounded-xl border border-slate-800 space-y-1">
                    <strong className="text-white text-xs block">Phase 3: Automated Sweep & Payroll</strong>
                    <p className="text-slate-400 text-[11px]">
                      Configurable threshold triggers executing automated excess liquidity sweeps and scheduled contractor batch payroll runs.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* PART 2: TOP 4 FINTECH TECHNOLOGY ENGINES (WITH DETAILED BENEFITS & LIVE APIS) */}
        {/* ========================================================================= */}
        <div className="space-y-8 pt-8 border-t border-slate-800">
          
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A1931] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Modern Fintech Technology Suite</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              Integrated Fintech <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFF3B0] bg-clip-text text-transparent">Execution Engines</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
              Click <strong>'View Detailed Benefits'</strong> on any engine to inspect its specific technical architecture, real-world benefits, and live integrated API providers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fintechEngines.map((engine) => {
              const Icon = engine.icon;
              const isExpanded = expandedEngineId === engine.id;

              return (
                <div
                  key={engine.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-[#0A1931] ${
                    isExpanded 
                      ? `${engine.accent} shadow-2xl shadow-[#D4AF37]/10 ring-1 ring-[#D4AF37]/40` 
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="p-6 sm:p-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#070E1E] border border-slate-700 flex items-center justify-center text-[#D4AF37]">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-[#D4AF37] block">
                            {engine.tag}
                          </span>
                          <h4 className="text-base font-bold text-white">
                            {engine.title}
                          </h4>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {engine.summary}
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                      <button
                        onClick={() => {
                          if (onSelectServiceForInquiry) {
                            onSelectServiceForInquiry(engine.title);
                          }
                        }}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-[#070E1E] border border-slate-700 hover:border-[#D4AF37]/40 transition-colors"
                      >
                        Inquire Deployment
                      </button>

                      {/* View Detailed Benefits Button */}
                      <button
                        onClick={() => setExpandedEngineId(isExpanded ? null : engine.id)}
                        className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#070E1E] hover:bg-[#132746] text-[#D4AF37] border border-[#D4AF37]/40 transition-all flex items-center gap-1.5"
                      >
                        <span>{isExpanded ? 'Hide Detailed Benefits' : 'View Detailed Benefits'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Technical Benefits & Live API Drawer */}
                  {isExpanded && (
                    <div className="bg-[#070E1E] border-t border-slate-800 p-6 sm:p-7 space-y-6 animate-in fade-in duration-200 text-xs">
                      
                      {/* Technical Benefits */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                          <span>Specific Technical Benefits</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {engine.technicalBenefits.map((b, bIdx) => (
                            <div key={bIdx} className="bg-[#0A1931] p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-white">{b.title}</span>
                                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-semibold">
                                  {b.metric}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 leading-relaxed">
                                {b.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Integrated Live API Providers */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                          <Server className="w-4 h-4 text-emerald-400" />
                          <span>Integrated Live API Providers</span>
                        </div>

                        <div className="space-y-2">
                          {engine.apiProviders.map((provider, pIdx) => (
                            <div key={pIdx} className="bg-[#0A1931] p-3 rounded-xl border border-slate-800/80 space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-white text-xs">{provider.name}</span>
                                <span className="text-[10px] text-slate-400">{provider.category}</span>
                              </div>
                              <div className="text-[10px] font-mono text-emerald-400 bg-[#070E1E] p-1.5 rounded border border-slate-800">
                                {provider.liveEndpoint}
                              </div>
                              <p className="text-[11px] text-slate-300">
                                <strong className="text-slate-400">Role: </strong>{provider.realtimeRole}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
