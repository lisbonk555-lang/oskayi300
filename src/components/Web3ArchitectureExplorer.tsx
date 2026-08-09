import React, { useState } from 'react';
import { Cpu, ShieldCheck, Lock, Layers, Code, ArrowRight, FileCode, CheckCircle2, AlertTriangle, Terminal } from 'lucide-react';
import { WEB3_INDUSTRY_SOLUTIONS } from '../data/companyData';
import { Web3IndustryArchitecture } from '../types';

export const Web3ArchitectureExplorer: React.FC = () => {
  const [selectedSolution, setSelectedSolution] = useState<Web3IndustryArchitecture>(WEB3_INDUSTRY_SOLUTIONS[0]);
  const [activeCodeTab, setActiveCodeTab] = useState<'architecture' | 'contractSpec' | 'compliance'>('architecture');

  return (
    <section id="web3" className="py-16 bg-slate-50 text-slate-900 px-4 sm:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-semibold uppercase tracking-wider border border-indigo-200">
            <Cpu className="w-3.5 h-3.5 text-indigo-700" />
            <span>Decentralized Financial Engineering</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-indigo-950">
            Custom Enterprise Web3 Applications
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Tailored blockchain applications, smart contract protocols, and real-world asset (RWA) tokenization designed for banks, trade, agriculture, and logistics.
          </p>
        </div>

        {/* OSKAYI V1 Protocol Rules Notice */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-sm">
          <div className="flex items-center gap-2 text-indigo-950 font-medium">
            <Lock className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              <strong>Oskayi Protocol Rules:</strong> Real cryptographic smart contracts only. No simulated balances, fake transactions, or mocked execution history.
            </span>
          </div>
          <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full font-mono text-slate-700 font-semibold text-[11px]">
            Live Node Connections Active
          </span>
        </div>

        {/* Interactive Industry Selector */}
        <div className="grid md:grid-cols-4 gap-4">
          {WEB3_INDUSTRY_SOLUTIONS.map((sol) => {
            const isSelected = selectedSolution.id === sol.id;
            return (
              <div
                key={sol.id}
                onClick={() => setSelectedSolution(sol)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-white border-indigo-600 shadow-lg ring-2 ring-indigo-500/20'
                    : 'bg-white border-slate-200 hover:border-indigo-300 shadow-sm'
                }`}
              >
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider font-mono">
                  {sol.industry}
                </span>
                <h3 className="font-sans font-bold text-sm text-slate-900 hover:text-indigo-600 transition-colors">
                  {sol.solutionTitle}
                </h3>
                <div className="pt-2 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-mono text-[10px]">{sol.smartContractStandard}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    sol.deploymentStatus === 'Live Partner Rail'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : sol.deploymentStatus === 'Coming Soon'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                  }`}>
                    {sol.deploymentStatus}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Architecture Visualizer - Deep Indigo Card */}
        <div className="bg-indigo-950 rounded-2xl border border-indigo-900 text-white p-8 shadow-xl space-y-8">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-indigo-800 pb-6">
            <div>
              <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-widest">
                Selected Web3 Architecture
              </span>
              <h3 className="font-sans text-2xl font-bold text-white mt-0.5">
                {selectedSolution.solutionTitle}
              </h3>
              <p className="text-xs text-indigo-200 mt-1 font-mono">
                Industry Target: {selectedSolution.industry}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setActiveCodeTab('architecture')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCodeTab === 'architecture'
                    ? 'bg-amber-400 text-indigo-950'
                    : 'bg-indigo-900 text-indigo-200 hover:bg-indigo-800'
                }`}
              >
                Architecture & Design
              </button>
              <button
                onClick={() => setActiveCodeTab('contractSpec')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCodeTab === 'contractSpec'
                    ? 'bg-amber-400 text-indigo-950'
                    : 'bg-indigo-900 text-indigo-200 hover:bg-indigo-800'
                }`}
              >
                Contract Interface Spec
              </button>
              <button
                onClick={() => setActiveCodeTab('compliance')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCodeTab === 'compliance'
                    ? 'bg-amber-400 text-indigo-950'
                    : 'bg-indigo-900 text-indigo-200 hover:bg-indigo-800'
                }`}
              >
                Regulatory Framework
              </button>
            </div>
          </div>

          {/* Dynamic Content Views */}
          {activeCodeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-indigo-900/60 border border-indigo-800 space-y-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">System Design & Logic</h4>
                <p className="text-indigo-100 text-sm leading-relaxed font-sans">
                  {selectedSolution.customDesign}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-indigo-200 uppercase tracking-wider">Key Protocol Features</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {selectedSolution.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-indigo-900/60 border border-indigo-800 text-xs text-indigo-100 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeCodeTab === 'contractSpec' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-indigo-200 bg-indigo-900/80 p-3 rounded-t-xl border border-indigo-800 border-b-0">
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-300" />
                  Interface Standard: {selectedSolution.smartContractStandard}
                </span>
                <span className="text-amber-300 font-bold">SOLC ^0.8.20 Compatible</span>
              </div>

              <div className="bg-indigo-950 p-5 rounded-b-xl border border-indigo-800 font-mono text-xs text-indigo-100 space-y-3 overflow-x-auto">
                <div className="text-indigo-300/70">// Oskayi Consult Protocol Interface Spec - {selectedSolution.industry}</div>
                <div className="text-amber-300 font-bold">interface IOskayi{selectedSolution.id.replace(/-/g, '')}Module &#123;</div>
                <div className="pl-4 text-emerald-300">event AssetTokenized(address indexed owner, uint256 indexed id, uint256 valuationUSD);</div>
                <div className="pl-4 text-emerald-300">event EscrowReleased(uint256 indexed id, address indexed beneficiary, uint256 amount);</div>
                <div className="pl-4 text-amber-200">function verifyRegulatoryKYC(address entity) external view returns (bool isVerified);</div>
                <div className="pl-4 text-white">function executeCrossBorderSettlement(uint256 assetId, bytes calldata proof) external returns (bool success);</div>
                <div className="text-amber-300 font-bold">&#125;</div>
              </div>
            </div>
          )}

          {activeCodeTab === 'compliance' && (
            <div className="space-y-4 bg-indigo-900/60 p-6 rounded-xl border border-indigo-800 text-xs font-sans">
              <div className="flex items-center gap-2 text-amber-300 font-bold uppercase tracking-wider">
                <ShieldCheck className="w-5 h-5 text-amber-300" />
                Compliance & Regulatory Mapping:
              </div>
              <div className="p-3.5 bg-indigo-950 rounded-lg border border-indigo-800 text-white font-mono">
                {selectedSolution.complianceFramework}
              </div>
              <p className="text-indigo-100 leading-relaxed">
                All Web3 smart contract deployments orchestrated by Oskayi Consult comply with Bank of Ghana digital asset guidelines, international Anti-Money Laundering (AML) standards, and FATF Travel Rule data requirements.
              </p>
            </div>
          )}

          {/* Execution Note */}
          <div className="p-4 rounded-xl bg-indigo-900/40 border border-indigo-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-indigo-200 font-mono">
              Status: <strong className="text-amber-300">{selectedSolution.deploymentStatus}</strong>
            </div>
            <div className="flex items-center gap-1.5 text-amber-300 font-medium">
              <span>Private Vault Execution & RPC Access:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-indigo-950 font-bold text-[11px] uppercase">
                Coming Soon
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
