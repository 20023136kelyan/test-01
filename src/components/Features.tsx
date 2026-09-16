import React from 'react';
import {
  Zap,
  Cpu,
  Shield,
  Layers,
  Code2,
  Globe2,
  LineChart,
  GitMerge
} from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'Sub-80µs Execution Latency',
      description: 'Fiber-optic cross connects to NYSE (Mahwah) and NASDAQ (Carteret) ensure minimal slippage and immediate queue priority.',
      badge: 'Hardware Acceleration',
    },
    {
      icon: Cpu,
      title: 'AI Sentiment & 10-K NLP Stream',
      description: 'Institutional natural language processing parsing SEC filings, Fed speeches, and breaking news feeds before retail terminals react.',
      badge: 'Machine Learning',
    },
    {
      icon: GitMerge,
      title: 'Dark Pool & Lit Smart Order Router',
      description: 'Dissect large orders across dark liquidity venues and 16 lit exchanges simultaneously to minimize market impact.',
      badge: 'Execution Quality',
    },
    {
      icon: LineChart,
      title: 'Dynamic Bracket & Trailing Stops',
      description: 'Automate risk control with volatility-adjusted trailing stops, server-side bracket triggers, and take-profit algorithms.',
      badge: 'Risk Engine',
    },
    {
      icon: Code2,
      title: 'Python & Rust Developer SDK',
      description: 'Zero-lag WebSocket streams, historical tick tick-by-tick replays, and sub-second REST endpoints for automated bots.',
      badge: 'API First',
    },
    {
      icon: Shield,
      title: 'SIPC Insured & SOC2 Type II Certified',
      description: 'Your assets are protected up to $500,000 via SIPC custody, with cold storage multi-sig controls and end-to-end encryption.',
      badge: 'Institutional Security',
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 relative bg-[#06090e] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            Next-Generation Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered for Traders Who Demand Edge
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Every layer of ApexTrade was built from the ground up in modern systems languages to eliminate the lag and opacity of legacy brokerages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-7 hover:border-emerald-500/40 transition-all group flex flex-col justify-between hover:bg-slate-900/70"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-2.5 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center text-xs text-emerald-400/90 font-mono gap-1">
                  <span>Zero Lag Pipeline</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">Production Ready</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Co-location Datacenter Callout Banner */}
        <div className="mt-12 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/90 via-[#0a121e] to-slate-900/90 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Co-located at Equinix NY4 (Secaucus) & LD4 (London)
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Direct cross-connect access available via 10Gbps SFP+ optic drops for proprietary algorithmic firms.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right font-mono">
              <span className="text-xs text-slate-400 block">Jitter Standard Dev.</span>
              <span className="text-sm font-bold text-emerald-400">&lt; 1.2 microseconds</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
