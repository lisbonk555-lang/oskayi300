import React from 'react';
import {
  Cpu,
  Zap,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Code,
  Layers,
  Database
} from 'lucide-react';
import { OFFICIAL_GAS_SPONSORS } from '../../data/creditCheckoutData';

export const ZeroGasRailsView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto font-mono text-xs">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 text-amber-300 text-[10px] border border-indigo-800 font-bold">
          <Cpu className="w-3.5 h-3.5 text-amber-400" />
          <span>ERC-4337 Account Abstraction Architecture</span>
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">
          How Zero-Gas Blockchain Transactions Work
        </h2>
        <p className="text-slate-400">
          Enabling customers with GH₵0 bank balances and 0 native gas tokens to transact with cryptographic finality.
        </p>
      </div>

      {/* 4-Step Technical Pipeline Diagram */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-900/60 text-amber-400 flex items-center justify-center font-bold">
            1
          </div>
          <h3 className="font-bold text-white text-sm">UserOperation Construction</h3>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            The customer client constructs an ERC-4337 <code>UserOperation</code> containing the merchant checkout payload without requiring native POL/ETH.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="w-8 h-8 rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/30 flex items-center justify-center font-bold">
            2
          </div>
          <h3 className="font-bold text-white text-sm">Paymaster Sponsorship</h3>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            The configured Gas Sponsor verifies the credit agreement status and appends a cryptographic sponsorship signature (<code>paymasterAndData</code>).
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="w-8 h-8 rounded-xl bg-sky-900/60 text-sky-300 flex items-center justify-center font-bold">
            3
          </div>
          <h3 className="font-bold text-white text-sm">Bundler Relayer</h3>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Independent bundler nodes bundle the sponsored UserOp into standard Ethereum transactions sent to the canonical <code>EntryPoint v0.7</code> contract.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-900/60 text-emerald-300 flex items-center justify-center font-bold">
            4
          </div>
          <h3 className="font-bold text-white text-sm">On-Chain Finality</h3>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            The EntryPoint contract executes the call, debits gas from the Paymaster deposit, and settles merchant escrow deterministically.
          </p>
        </div>
      </div>

      {/* Raw UserOp Payload Anatomy */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-white flex items-center gap-2 text-sm">
            <Code className="w-4 h-4 text-amber-400" />
            <span>Cryptographic ERC-4337 UserOp Structure</span>
          </h3>
          <span className="text-[10px] text-slate-400">Standard: ERC-4337 / EIP-712</span>
        </div>

        <pre className="p-4 rounded-2xl bg-slate-900 text-amber-300 text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
{`{
  "sender": "0x4337bC9189008819aDcE21D33E019aDb59DC96Ad2",
  "nonce": "0x01",
  "initCode": "0x",
  "callData": "0x8f27e481000000000000000000000000mvolta000000000000000000000000000038a4",
  "callGasLimit": "0x0186a0",
  "verificationGasLimit": "0x0249f0",
  "preVerificationGas": "0x0c350",
  "maxFeePerGas": "0x0773594000",
  "maxPriorityFeePerGas": "0x0773594000",
  "paymasterAndData": "0x00000f73b64c39fa8e578c77ecf274a1e9bb8b88...SPONSORED_BY_BICONOMY...",
  "signature": "0x3891048bcae9817290184bfaec981729384719028471928374918237491827341b"
}`}
        </pre>
      </div>

      {/* Paymasters Registry Table */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
        <h3 className="font-bold text-white flex items-center gap-2 text-sm">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Active Paymasters &amp; Smart Contract Endpoints</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3">Sponsor Entity</th>
                <th className="p-3">Supported Network</th>
                <th className="p-3">EntryPoint v0.7 Contract</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 text-slate-300">
              {OFFICIAL_GAS_SPONSORS.map(s => (
                <tr key={s.sponsorId} className="hover:bg-slate-900/50">
                  <td className="p-3 font-bold text-white">{s.sponsorName}</td>
                  <td className="p-3">{s.supportedChain}</td>
                  <td className="p-3 font-mono text-indigo-300 truncate max-w-[200px]">
                    {s.paymasterContractAddress}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                      {s.sponsorshipStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
