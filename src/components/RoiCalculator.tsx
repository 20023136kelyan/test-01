import React, { useState, useMemo } from 'react';
import { Calculator, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenDemoModal: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenDemoModal }) => {
  const [initialCapital, setInitialCapital] = useState(25000);
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [years, setYears] = useState(5);
  const [strategy, setStrategy] = useState<'quant' | 'dividend' | 'benchmark'>('quant');

  const strategyRates = {
    quant: { name: 'Apex AI Quant Momentum', rate: 0.234, label: '23.4% Historical CAGR', color: 'emerald' },
    dividend: { name: 'Dividend Alpha Growth', rate: 0.142, label: '14.2% Historical CAGR', color: 'cyan' },
    benchmark: { name: 'S&P 500 Passive Benchmark', rate: 0.098, label: '9.8% Standard CAGR', color: 'slate' },
  };

  const calculation = useMemo(() => {
    const rate = strategyRates[strategy].rate;
    const benchmarkRate = strategyRates.benchmark.rate;

    let totalQuant = initialCapital;
    let totalBenchmark = initialCapital;
    let totalContributions = initialCapital;

    const months = years * 12;
    const monthlyRate = rate / 12;
    const monthlyBenchmarkRate = benchmarkRate / 12;

    for (let i = 0; i < months; i++) {
      totalQuant = totalQuant * (1 + monthlyRate) + monthlyContribution;
      totalBenchmark = totalBenchmark * (1 + monthlyBenchmarkRate) + monthlyContribution;
      totalContributions += monthlyContribution;
    }

    const alphaGenerated = totalQuant - totalBenchmark;

    return {
      totalProjected: Math.round(totalQuant),
      totalBenchmark: Math.round(totalBenchmark),
      totalContributions: Math.round(totalContributions),
      alphaGenerated: Math.round(alphaGenerated),
    };
  }, [initialCapital, monthlyContribution, years, strategy]);

  return (
    <section id="calculator" className="py-20 md:py-28 relative bg-[#070b13] border-t border-slate-800/80 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Performance & Yield Simulator
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Simulate Your Portfolio Alpha
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Model how ApexTrade's algorithmic smart execution, automated rebalancing, and low-latency fills compare against a traditional index over time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#0a0f1b]/80 p-6 sm:p-8 backdrop-blur glow-card flex flex-col justify-between">
            <div className="space-y-6">
              {/* Strategy Selector */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                  Select Execution Strategy
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(['quant', 'dividend', 'benchmark'] as const).map(key => {
                    const strat = strategyRates[key];
                    const active = strategy === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setStrategy(key)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          active
                            ? 'bg-emerald-500/15 border-emerald-500/50 text-white shadow-lg shadow-emerald-500/10'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold font-sans text-slate-200">{strat.name}</div>
                        <div className={`text-[11px] font-mono mt-1 ${active ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
                          {strat.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Initial Capital Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono uppercase text-slate-400">Initial Capital</span>
                  <span className="text-base font-bold font-mono text-emerald-400">
                    ${initialCapital.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="200000"
                  step="1000"
                  value={initialCapital}
                  onChange={e => setInitialCapital(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>$1,000</span>
                  <span>$100,000</span>
                  <span>$200,000</span>
                </div>
              </div>

              {/* Monthly Contribution Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono uppercase text-slate-400">Monthly Contribution</span>
                  <span className="text-base font-bold font-mono text-emerald-400">
                    ${monthlyContribution.toLocaleString()}/mo
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="250"
                  value={monthlyContribution}
                  onChange={e => setMonthlyContribution(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>$0</span>
                  <span>$5,000</span>
                  <span>$10,000</span>
                </div>
              </div>

              {/* Time Horizon Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono uppercase text-slate-400">Time Horizon</span>
                  <span className="text-base font-bold font-mono text-emerald-400">
                    {years} {years === 1 ? 'Year' : 'Years'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={years}
                  onChange={e => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>1 Year</span>
                  <span>5 Years</span>
                  <span>10 Years</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>
                Calculations assume monthly compounding without tax friction. Past performance does not guarantee future results.
              </span>
            </div>
          </div>

          {/* Results Display Card (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#0e1626] to-[#070b13] p-6 sm:p-8 flex flex-col justify-between shadow-2xl shadow-emerald-500/10">
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-400 pb-4 border-b border-slate-800">
                <span>Projected Portfolio Value</span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <Zap className="w-3.5 h-3.5" /> Compound Horizon
                </span>
              </div>

              {/* Big Projected Total */}
              <div className="mt-6">
                <div className="text-3xl sm:text-5xl font-extrabold font-mono text-white tracking-tight">
                  ${calculation.totalProjected.toLocaleString()}
                </div>
                <p className="text-xs text-slate-400 font-mono mt-2 flex items-center gap-1">
                  Total capital contributions: ${calculation.totalContributions.toLocaleString()}
                </p>
              </div>

              {/* Comparison vs S&P 500 */}
              <div className="mt-8 space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-400">Standard S&P 500 Return</span>
                    <span className="text-slate-200 font-bold">${calculation.totalBenchmark.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-slate-500 h-full rounded-full"
                      style={{ width: `${Math.min(100, (calculation.totalBenchmark / calculation.totalProjected) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-emerald-300 font-medium">Outperformance (Alpha)</span>
                    <span className="text-emerald-400 font-bold text-sm">
                      +${Math.max(0, calculation.alphaGenerated).toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full w-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal CTA */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <button
                onClick={onOpenDemoModal}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Deploy Strategy on Paper Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
