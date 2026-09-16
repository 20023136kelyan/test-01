import React from 'react';
import { TrendingUp } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#04060a] border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info (2 cols on md) */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Apex<span className="text-emerald-400">Trade</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Institutional execution, smart order routing, and sub-millisecond market intelligence for active traders and systematic funds worldwide.
            </p>

            <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All Systems Operational (99.99%)</span>
            </div>
          </div>

          {/* Column: Markets & Platform */}
          <div>
            <h4 className="text-xs font-mono uppercase font-bold text-white tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#terminal" className="hover:text-emerald-400 transition-colors">Web Terminal</a></li>
              <li><a href="#screener" className="hover:text-emerald-400 transition-colors">Market Screener</a></li>
              <li><a href="#calculator" className="hover:text-emerald-400 transition-colors">Yield Simulator</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Order Router (DMA)</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing & Plans</a></li>
            </ul>
          </div>

          {/* Column: Developers */}
          <div>
            <h4 className="text-xs font-mono uppercase font-bold text-white tracking-wider mb-3">
              Developers & API
            </h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Python SDK</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Rust FIX Engine</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">WebSocket Docs</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Level 3 Raw Feed</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Tick Historical Replay</a></li>
            </ul>
          </div>

          {/* Column: Compliance & Trust */}
          <div>
            <h4 className="text-xs font-mono uppercase font-bold text-white tracking-wider mb-3">
              Institutional
            </h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Equinix NY4 Cross-Connect</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Custody & Clearing</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">SOC2 Type II Audit</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">SIPC Protection</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Security Whitepaper</a></li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimers & Disclosures */}
        <div className="pt-8 border-t border-slate-800/80 space-y-4 text-[11px] text-slate-500 leading-relaxed">
          <p>
            <strong>Regulatory Notice:</strong> ApexTrade Securities LLC is a registered broker-dealer and member of the Financial Industry Regulatory Authority (<a href="#" className="underline hover:text-slate-400">FINRA</a>) and the Securities Investor Protection Corporation (<a href="#" className="underline hover:text-slate-400">SIPC</a>). Securities in your account are protected up to $500,000 (including $250,000 for claims for cash). Explanatory brochure available upon request or at www.sipc.org.
          </p>
          <p>
            <strong>Risk Warning:</strong> Trading stocks, options, and futures involves substantial risk of loss and is not appropriate for all investors. Electronic trading involves unique risks including system latency, order routing queue delays, market volatility, and exchange technical halts. Sub-millisecond execution times are measured within our Equinix NY4 network perimeter and may vary based on client internet connectivity and market conditions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-900 text-slate-500 gap-2">
            <div>
              &copy; {new Date().getFullYear()} ApexTrade Technologies Inc. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-300 transition-colors">FINRA Rule 606 Disclosure</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
