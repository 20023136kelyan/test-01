import React, { useState } from 'react';
import {
  ArrowRight,
  Zap,
  BarChart3,
  DollarSign,
  ChevronRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { TIMEFRAME_DATA } from '../data/stocks';

interface HeroProps {
  onOpenDemoModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemoModal }) => {
  const [selectedStock, setSelectedStock] = useState('NVDA');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1D' | '1W' | '1M' | '1Y'>('1D');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  // Local simulated paper balance for interactive feedback
  const [paperBalance, setPaperBalance] = useState(100000);
  const [sharesHeld, setSharesHeld] = useState(25);
  const [lastOrderNotification, setLastOrderNotification] = useState<string | null>(null);

  const stockProfiles: Record<string, { name: string; price: number; change: string; positive: boolean }> = {
    NVDA: { name: 'NVIDIA Corp.', price: 138.45, change: '+4.23%', positive: true },
    AAPL: { name: 'Apple Inc.', price: 232.18, change: '+0.93%', positive: true },
    TSLA: { name: 'Tesla Inc.', price: 248.90, change: '+5.24%', positive: true },
    SPY: { name: 'SPDR S&P 500 ETF', price: 586.20, change: '+0.74%', positive: true },
  };

  const currentProfile = stockProfiles[selectedStock];
  const chartPoints = TIMEFRAME_DATA[selectedTimeframe];

  // SVG Chart Geometry
  const svgWidth = 600;
  const svgHeight = 220;
  const paddingX = 20;
  const paddingY = 25;

  const prices = chartPoints.map(p => p.price);
  const minPrice = Math.min(...prices) * 0.995;
  const maxPrice = Math.max(...prices) * 1.005;

  const getCoordinates = (price: number, index: number) => {
    const x = paddingX + (index / (chartPoints.length - 1)) * (svgWidth - 2 * paddingX);
    const y = svgHeight - paddingY - ((price - minPrice) / (maxPrice - minPrice)) * (svgHeight - 2 * paddingY);
    return { x, y };
  };

  // Build SVG Path
  const coordinates = chartPoints.map((p, i) => getCoordinates(p.price, i));
  const linePath = coordinates.reduce((acc, curr, index) => {
    if (index === 0) return `M ${curr.x} ${curr.y}`;
    // Bezier curve smoothing
    const prev = coordinates[index - 1];
    const cp1x = prev.x + (curr.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (curr.x - prev.x) / 2;
    const cp2y = curr.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }, '');

  const areaPath = `${linePath} L ${coordinates[coordinates.length - 1].x} ${svgHeight} L ${coordinates[0].x} ${svgHeight} Z`;

  const activeHoverPoint = hoveredPointIndex !== null ? chartPoints[hoveredPointIndex] : chartPoints[chartPoints.length - 1];
  const activeHoverCoord = hoveredPointIndex !== null ? coordinates[hoveredPointIndex] : coordinates[coordinates.length - 1];

  const handleSimulateTrade = (type: 'buy' | 'sell') => {
    const price = currentProfile.price;
    const qty = 5;
    if (type === 'buy') {
      const cost = price * qty;
      if (paperBalance >= cost) {
        setPaperBalance(prev => prev - cost);
        setSharesHeld(prev => prev + qty);
        setLastOrderNotification(`Filled BUY 5 ${selectedStock} @ $${price.toFixed(2)}`);
      }
    } else {
      if (sharesHeld >= qty) {
        const proceeds = price * qty;
        setPaperBalance(prev => prev + proceeds);
        setSharesHeld(prev => prev - qty);
        setLastOrderNotification(`Filled SELL 5 ${selectedStock} @ $${price.toFixed(2)}`);
      }
    }
    setTimeout(() => setLastOrderNotification(null), 3000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Glow effect and background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-radial-gradient blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Top Tag */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold tracking-wide backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>ApexTrade Engine v4.8 Released</span>
            <span className="text-emerald-500">•</span>
            <span className="text-slate-300 font-normal">Direct DMA Routing</span>
            <ChevronRight className="w-3 h-3 text-emerald-400" />
          </div>
        </div>

        {/* Hero Headline */}
        <div className="text-center mt-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Institutional Execution Speed.
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Zero Market Friction.
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Trade US equities, options, and algorithmic order flows with sub-millisecond execution, AI-driven sentiment analysis, and transparent dark pool liquidity.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenDemoModal}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm sm:text-base shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Launch Free Paper Account ($100k)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#terminal"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-sm sm:text-base backdrop-blur transition-all flex items-center justify-center gap-2 hover:border-slate-600"
            >
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>Explore Live Terminal</span>
            </a>
          </div>

          {/* Value Micro-Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>$0 Equity Commissions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Sub-80 Microsecond Latency</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>SIPC Insured to $500,000</span>
            </div>
          </div>
        </div>

        {/* Centerpiece: Interactive Terminal Card */}
        <div id="terminal" className="mt-12 lg:mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-2xl border border-slate-800 bg-[#090d16]/95 backdrop-blur-xl glow-card overflow-hidden">
            {/* Terminal Window Header Bar */}
            <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-slate-800/80 bg-[#06090e]/80">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 mr-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center bg-slate-900/90 rounded-lg p-1 border border-slate-800 text-xs">
                  {Object.keys(stockProfiles).map(symbol => (
                    <button
                      key={symbol}
                      onClick={() => setSelectedStock(symbol)}
                      className={`px-3 py-1 rounded font-mono font-semibold transition-all cursor-pointer ${
                        selectedStock === symbol
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {symbol}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeframe Selectors */}
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="flex bg-slate-900/90 rounded-lg p-0.5 border border-slate-800 text-xs font-mono">
                  {(['1D', '1W', '1M', '1Y'] as const).map(tf => (
                    <button
                      key={tf}
                      onClick={() => setSelectedTimeframe(tf)}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        selectedTimeframe === tf
                          ? 'bg-slate-800 text-white font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>

                {/* Simulated Paper Balance Tag */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                  <DollarSign className="w-3 h-3 text-emerald-400" />
                  <span>Paper Cash: ${paperBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            {/* Terminal Main Body */}
            <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Interactive Price Chart (8 cols) */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                {/* Current Stock Quote Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl sm:text-3xl font-bold font-mono text-white">
                        ${activeHoverPoint.price.toFixed(2)}
                      </h3>
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {currentProfile.change}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 font-mono">
                      {currentProfile.name} • Time: {activeHoverPoint.time} • Vol: {activeHoverPoint.volume}M
                    </p>
                  </div>

                  <div className="text-right hidden sm:block">
                    <span className="text-[11px] text-slate-400 uppercase font-mono block">Order Fill Engine</span>
                    <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center justify-end gap-1">
                      <Zap className="w-3 h-3" /> DMA Active (Equinix NY4)
                    </span>
                  </div>
                </div>

                {/* SVG Interactive Chart Canvas */}
                <div className="relative mt-4 w-full h-[220px] select-none">
                  <svg
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    className="w-full h-full overflow-visible"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Guideline Grids */}
                    <line x1="0" y1={svgHeight * 0.25} x2={svgWidth} y2={svgHeight * 0.25} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                    <line x1="0" y1={svgHeight * 0.5} x2={svgWidth} y2={svgHeight * 0.5} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                    <line x1="0" y1={svgHeight * 0.75} x2={svgWidth} y2={svgHeight * 0.75} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

                    {/* Gradient Area */}
                    <path d={areaPath} fill="url(#chartGradient)" />

                    {/* Main Curve Line */}
                    <path
                      d={linePath}
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Dynamic Hover Point Circle */}
                    <circle
                      cx={activeHoverCoord.x}
                      cy={activeHoverCoord.y}
                      r="5"
                      className="fill-emerald-400 stroke-[#06090e] stroke-[2.5]"
                    />

                    {/* Vertical guideline */}
                    <line
                      x1={activeHoverCoord.x}
                      y1="0"
                      x2={activeHoverCoord.x}
                      y2={svgHeight}
                      stroke="rgba(16, 185, 129, 0.35)"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                  </svg>

                  {/* Invisible Hover Trigger Overlays */}
                  <div className="absolute inset-0 flex">
                    {chartPoints.map((_, idx) => (
                      <div
                        key={idx}
                        className="flex-1 h-full cursor-crosshair"
                        onMouseEnter={() => setHoveredPointIndex(idx)}
                        onMouseLeave={() => setHoveredPointIndex(null)}
                      />
                    ))}
                  </div>
                </div>

                {/* X-axis time labels */}
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2 px-1">
                  {chartPoints.map((p, i) => (
                    <span key={i}>{p.time}</span>
                  ))}
                </div>
              </div>

              {/* Right Column: Live Order Book & Instant Order Execution (4 cols) */}
              <div className="lg:col-span-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800/80 pt-4 lg:pt-0 lg:pl-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-semibold text-slate-300">Level 2 Book (Live)</span>
                    <span className="text-[10px] font-mono text-slate-400">Spread: $0.02</span>
                  </div>

                  {/* Ask Rows (Sellers - Red) */}
                  <div className="space-y-1 font-mono text-xs">
                    <div className="relative flex justify-between px-2 py-0.5 rounded overflow-hidden">
                      <div className="absolute right-0 top-0 bottom-0 bg-rose-500/10 w-[78%]" />
                      <span className="relative text-rose-400">${(currentProfile.price + 0.12).toFixed(2)}</span>
                      <span className="relative text-slate-400">1,820</span>
                    </div>
                    <div className="relative flex justify-between px-2 py-0.5 rounded overflow-hidden">
                      <div className="absolute right-0 top-0 bottom-0 bg-rose-500/10 w-[55%]" />
                      <span className="relative text-rose-400">${(currentProfile.price + 0.08).toFixed(2)}</span>
                      <span className="relative text-slate-400">1,150</span>
                    </div>
                    <div className="relative flex justify-between px-2 py-0.5 rounded overflow-hidden">
                      <div className="absolute right-0 top-0 bottom-0 bg-rose-500/10 w-[30%]" />
                      <span className="relative text-rose-400">${(currentProfile.price + 0.02).toFixed(2)}</span>
                      <span className="relative text-slate-400">620</span>
                    </div>
                  </div>

                  {/* Mid Market Divider */}
                  <div className="my-2 py-1 px-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-400">Market Price</span>
                    <span className="font-bold text-emerald-400">${currentProfile.price.toFixed(2)}</span>
                  </div>

                  {/* Bid Rows (Buyers - Green) */}
                  <div className="space-y-1 font-mono text-xs">
                    <div className="relative flex justify-between px-2 py-0.5 rounded overflow-hidden">
                      <div className="absolute right-0 top-0 bottom-0 bg-emerald-500/10 w-[42%]" />
                      <span className="relative text-emerald-400">${(currentProfile.price - 0.02).toFixed(2)}</span>
                      <span className="relative text-slate-400">890</span>
                    </div>
                    <div className="relative flex justify-between px-2 py-0.5 rounded overflow-hidden">
                      <div className="absolute right-0 top-0 bottom-0 bg-emerald-500/10 w-[64%]" />
                      <span className="relative text-emerald-400">${(currentProfile.price - 0.07).toFixed(2)}</span>
                      <span className="relative text-slate-400">1,420</span>
                    </div>
                    <div className="relative flex justify-between px-2 py-0.5 rounded overflow-hidden">
                      <div className="absolute right-0 top-0 bottom-0 bg-emerald-500/10 w-[89%]" />
                      <span className="relative text-emerald-400">${(currentProfile.price - 0.15).toFixed(2)}</span>
                      <span className="relative text-slate-400">2,350</span>
                    </div>
                  </div>
                </div>

                {/* Quick Simulated Order Actions */}
                <div className="mt-4 pt-4 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                    <span>Position: {sharesHeld} shs</span>
                    <span>Equity: ${(sharesHeld * currentProfile.price).toFixed(2)}</span>
                  </div>

                  {lastOrderNotification && (
                    <div className="mb-2 p-1.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-[11px] font-mono text-emerald-300 text-center animate-fade-in">
                      {lastOrderNotification}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleSimulateTrade('buy')}
                      className="py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Buy 5 @ Mkt
                    </button>
                    <button
                      onClick={() => handleSimulateTrade('sell')}
                      className="py-2 px-3 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-bold font-mono text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Sell 5 @ Mkt
                    </button>
                  </div>

                  <p className="text-[10px] text-slate-500 text-center mt-2 font-mono">
                    Simulated paper fills • Real liquidity engine
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Bar: System Stats */}
            <div className="px-6 py-2.5 bg-[#05070c] border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-4">
                <span>Matching Engine: <strong className="text-slate-300">C++20 / DPDK</strong></span>
                <span className="hidden sm:inline">|</span>
                <span className="hidden sm:inline">Order Queue: <strong className="text-emerald-400">0 msgs delayed</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                <span>Feed: OPRA + NASDAQ ITCH Level 3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Big Metrics Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">$18.4B+</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">Daily Volume Routed</div>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">0.08ms</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">Average Fill Latency</div>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">99.99%</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">Trading Uptime SLA</div>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">$0.00</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">Commission on Stocks & ETFs</div>
          </div>
        </div>
      </div>
    </section>
  );
};
