import React, { useState } from 'react';
import { Check, Zap, Sparkles, ArrowRight } from 'lucide-react';

interface PricingProps {
  onOpenDemoModal: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenDemoModal }) => {
  const [annualBilling, setAnnualBilling] = useState(true);

  const plans = [
    {
      name: 'Paper Trader',
      description: 'Ideal for practicing strategies without risking capital in live market conditions.',
      monthlyPrice: 0,
      annualPrice: 0,
      badge: 'Free Forever',
      popular: false,
      ctaText: 'Start Paper Trading',
      features: [
        '$100,000 virtual paper balance',
        'Real-time simulation engine',
        'Standard candlestick charting & indicators',
        'End-of-day market summaries & news',
        'Community discord & strategy discussions',
        'Web & iOS/Android mobile apps',
      ],
      notIncluded: [
        'Live Level 2 Market Depth',
        'Direct Market Access (DMA)',
        'Algorithmic Python API keys',
      ],
    },
    {
      name: 'Apex Pro',
      description: 'The standard for active retail traders, options scalpers, and systematic strategists.',
      monthlyPrice: 29,
      annualPrice: 23,
      badge: 'Most Popular',
      popular: true,
      ctaText: 'Upgrade to Apex Pro',
      features: [
        'Real-time Level 2 quotes (NASDAQ TotalView + NYSE OpenBook)',
        'Direct Market Access (DMA) sub-millisecond routing',
        'AI NLP sentiment stream & real-time SEC 10-K alerts',
        'Server-side bracket orders & dynamic trailing stops',
        'Full REST & WebSocket API access (50 req/sec)',
        'Unlimited custom watchlists & multi-chart layouts',
        'Zero commission on all US equities & ETFs',
        'Priority trader support via live chat',
      ],
      notIncluded: ['Dedicated FIX 4.4 protocol cross-connect'],
    },
    {
      name: 'Institutional Quant',
      description: 'Dedicated infrastructure designed for prop desks, hedge funds, and family offices.',
      monthlyPrice: 199,
      annualPrice: 159,
      badge: 'Institutional Grade',
      popular: false,
      ctaText: 'Contact Institutional Desk',
      features: [
        'Dedicated FIX 4.4 / ITCH protocol session',
        'Co-located fiber cross-connect at Equinix NY4 & LD4',
        'Custom algorithmic execution (VWAP, TWAP, POV)',
        'Unlimited API bandwidth & uncompressed tick-level L3 feed',
        'Master account structure with sub-account multi-allocations',
        'Dedicated 24/7 senior sales trader hotline',
        'Custom institutional margin & portfolio risk limits',
      ],
      notIncluded: [],
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 relative bg-[#070b13] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Transparent Pricing Built for Every Scale
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Start completely free with virtual paper capital, or unlock institutional dark pool routing and low-latency API access.
          </p>

          {/* Billing Switcher */}
          <div className="mt-8 inline-flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs">
            <button
              onClick={() => setAnnualBilling(false)}
              className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                !annualBilling
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnualBilling(true)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                annualBilling
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const price = annualBilling ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={idx}
                className={`rounded-2xl flex flex-col justify-between p-6 sm:p-8 transition-all ${
                  plan.popular
                    ? 'border-2 border-emerald-500 bg-[#0c1422] shadow-2xl shadow-emerald-500/10 relative scale-100 lg:-translate-y-2'
                    : 'border border-slate-800 bg-[#090e18]/80 hover:border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold uppercase tracking-wide flex items-center gap-1 shadow-lg shadow-emerald-500/40">
                    <Sparkles className="w-3 h-3" />
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    {!plan.popular && (
                      <span className="text-[11px] font-mono text-slate-400 px-2.5 py-0.5 rounded bg-slate-800 border border-slate-700">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 min-h-[36px]">{plan.description}</p>

                  <div className="mt-6 mb-6 pb-6 border-b border-slate-800/80">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white">
                        ${price}
                      </span>
                      <span className="text-slate-400 text-sm font-mono">
                        {price === 0 ? '' : '/month'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono mt-1">
                      {price === 0
                        ? 'Zero credit card required'
                        : annualBilling
                        ? 'Billed annually ($' + price * 12 + '/yr)'
                        : 'Billed on a monthly rolling basis'}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 text-xs text-slate-300">
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-slate-500 line-through">
                        <div className="w-4 h-4 rounded-full bg-slate-800 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                          ✕
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800/80">
                  <button
                    onClick={onOpenDemoModal}
                    className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      plan.popular
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
