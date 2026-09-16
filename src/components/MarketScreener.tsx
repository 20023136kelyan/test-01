import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, ArrowUpDown, ChevronRight, SlidersHorizontal, Sparkles } from 'lucide-react';
import { INITIAL_STOCKS, StockItem } from '../data/stocks';

interface MarketScreenerProps {
  onSelectTrade: (stock: StockItem) => void;
}

export const MarketScreener: React.FC<MarketScreenerProps> = ({ onSelectTrade }) => {
  const [stocks] = useState<StockItem[]>(INITIAL_STOCKS);
  const [activeCategory, setActiveCategory] = useState<'all' | 'gainers' | 'tech' | 'active' | 'ai'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof StockItem>('volume');
  const [sortAsc, setSortAsc] = useState(false);

  const filteredStocks = stocks
    .filter(stock => {
      const matchesCategory = activeCategory === 'all' || stock.category === activeCategory;
      const matchesSearch =
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      // Clean string volume or price for sorting
      if (typeof aVal === 'string') aVal = parseFloat(aVal.replace(/[^0-9.]/g, ''));
      if (typeof bVal === 'string') bVal = parseFloat(bVal.replace(/[^0-9.]/g, ''));

      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });

  const handleSort = (field: keyof StockItem) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const renderSparkline = (points: number[], isPositive: boolean) => {
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 80;
    const height = 24;

    const coords = points.map((val, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    });

    const path = `M ${coords.join(' L ')}`;
    const strokeColor = isPositive ? '#10B981' : '#F43F5E';

    return (
      <svg width={width} height={height} className="overflow-visible">
        <path d={path} fill="none" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  return (
    <section id="screener" className="py-20 md:py-28 relative bg-[#06090e] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Real-Time Market Screener
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Institutional Screener & Watchlist
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Filter through over 9,000+ US equities and ETFs. Spot momentum anomalies, dark pool block prints, and algorithmic volume surges in real time.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search symbol or name..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono"
            />
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 gap-3 overflow-x-auto">
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'All Markets' },
              { id: 'ai', label: 'AI & Chips' },
              { id: 'tech', label: 'Mega Cap Tech' },
              { id: 'gainers', label: 'Top Gainers' },
              { id: 'active', label: 'Most Active' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Showing {filteredStocks.length} Assets</span>
          </div>
        </div>

        {/* Screener Table */}
        <div className="mt-4 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-[#080d16]/70 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4 sm:px-6 cursor-pointer hover:text-slate-200" onClick={() => handleSort('symbol')}>
                    <div className="flex items-center gap-1.5">
                      <span>Asset</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-500" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-right cursor-pointer hover:text-slate-200" onClick={() => handleSort('price')}>
                    <div className="flex items-center justify-end gap-1.5">
                      <span>Last Price</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-500" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-right cursor-pointer hover:text-slate-200" onClick={() => handleSort('changePercent')}>
                    <div className="flex items-center justify-end gap-1.5">
                      <span>24H Change</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-500" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-center hidden md:table-cell">
                    <span>7D Trend</span>
                  </th>
                  <th className="py-3 px-4 text-right hidden sm:table-cell cursor-pointer hover:text-slate-200" onClick={() => handleSort('volume')}>
                    <div className="flex items-center justify-end gap-1.5">
                      <span>Volume</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-500" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-right hidden lg:table-cell">
                    <span>Mkt Cap</span>
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-right">
                    <span>Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-sm">
                {filteredStocks.map(stock => {
                  const isPositive = stock.change >= 0;

                  return (
                    <tr
                      key={stock.symbol}
                      className="hover:bg-slate-800/40 transition-colors group cursor-default"
                    >
                      {/* Asset Symbol & Name */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/60 flex items-center justify-center font-bold text-white text-xs font-sans group-hover:border-emerald-500/40 transition-colors">
                            {stock.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <div className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                              {stock.symbol}
                            </div>
                            <div className="text-xs text-slate-400 font-sans truncate max-w-[140px] sm:max-w-none">
                              {stock.name}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 text-right font-bold text-slate-100">
                        ${stock.price.toFixed(2)}
                      </td>

                      {/* 24h Change */}
                      <td className="py-4 px-4 text-right">
                        <div className={`inline-flex items-center gap-1 font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                          <span>{isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%</span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {isPositive ? '+' : ''}${stock.change.toFixed(2)}
                        </div>
                      </td>

                      {/* Mini Sparkline */}
                      <td className="py-4 px-4 text-center hidden md:table-cell">
                        <div className="flex justify-center">
                          {renderSparkline(stock.sparkline, isPositive)}
                        </div>
                      </td>

                      {/* Volume */}
                      <td className="py-4 px-4 text-right hidden sm:table-cell text-slate-300">
                        {stock.volume}
                      </td>

                      {/* Market Cap */}
                      <td className="py-4 px-4 text-right hidden lg:table-cell text-slate-400">
                        {stock.marketCap}
                      </td>

                      {/* Action Trade Button */}
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <button
                          onClick={() => onSelectTrade(stock)}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-semibold text-xs border border-emerald-500/20 hover:border-emerald-500 transition-all cursor-pointer inline-flex items-center gap-1"
                        >
                          <span>Trade</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
