import React from 'react';
import { Star, Quote, TrendingUp } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      quote: "ApexTrade's DMA routing shaved an average of 4.2 cents per share off our market orders compared to interactive retail brokers. For a desk trading 200k shares weekly, that's tens of thousands of dollars retained.",
      author: 'Marcus Vance',
      title: 'Managing Director, Horizon Quant Fund',
      metric: 'Over $42M Volume Traded',
      rating: 5,
    },
    {
      quote: "The live Level 2 depth and sub-millisecond execution are genuine institutional grade. When NVDA or TSLA have high-volatility earnings prints, Apex fills without freezing or requoting.",
      author: 'Elena Rostova',
      title: 'Proprietary Equities Trader',
      metric: '99.98% Fill Rate',
      rating: 5,
    },
    {
      quote: "The Python WebSocket feed is clean and rock solid. We migrated our automated momentum models in one weekend and our backtest-to-live execution drift dropped to virtually zero.",
      author: 'David Chen, CFA',
      title: 'Algorithmic Portfolio Architect',
      metric: '14,200+ Automated Executions',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 md:py-28 relative bg-[#06090e] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Quote className="w-3.5 h-3.5" />
            Verified Trader Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by Quantitative Funds & High-Volume Traders
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Discover why systematic investors, proprietary desks, and active retail scalpers choose ApexTrade as their execution venue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-500/30 transition-all group"
            >
              <div>
                <div className="flex items-center gap-1 text-emerald-400 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-emerald-400" />
                  ))}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <div className="font-bold text-white text-sm">{rev.author}</div>
                <div className="text-xs text-slate-400">{rev.title}</div>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400 font-medium">
                  <TrendingUp className="w-3 h-3" />
                  {rev.metric}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
