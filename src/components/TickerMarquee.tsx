import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { INITIAL_STOCKS, MARKET_INDICES } from '../data/stocks';

export const TickerMarquee: React.FC = () => {
  const [stocks, setStocks] = useState(INITIAL_STOCKS);
  const [activeFlashingSymbol, setActiveFlashingSymbol] = useState<string | null>(null);

  // Simulate subtle real-time price changes
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * stocks.length);
      const stock = stocks[randomIndex];
      const delta = (Math.random() - 0.48) * 0.4;
      const newPrice = Number((stock.price + delta).toFixed(2));
      const newChange = Number((stock.change + delta).toFixed(2));
      const newChangePercent = Number(((newChange / (newPrice - newChange)) * 100).toFixed(2));

      setActiveFlashingSymbol(stock.symbol);
      setTimeout(() => setActiveFlashingSymbol(null), 1200);

      setStocks(prev =>
        prev.map((s, idx) =>
          idx === randomIndex
            ? {
                ...s,
                price: newPrice,
                change: newChange,
                changePercent: newChangePercent,
              }
            : s
        )
      );
    }, 2800);

    return () => clearInterval(interval);
  }, [stocks]);

  const items = [
    ...MARKET_INDICES.map(index => ({
      key: `idx-${index.symbol}`,
      symbol: index.symbol,
      price: index.value,
      changeText: index.change,
      isPositive: index.isPositive,
      isIndex: true,
    })),
    ...stocks.map(stock => ({
      key: `stk-${stock.symbol}`,
      symbol: stock.symbol,
      price: `$${stock.price.toFixed(2)}`,
      changeText: `${stock.change >= 0 ? '+' : ''}${stock.changePercent.toFixed(2)}%`,
      isPositive: stock.change >= 0,
      isIndex: false,
    }))
  ];

  // Duplicate for seamless infinite loop
  const duplicatedItems = [...items, ...items];

  return (
    <div className="relative w-full border-y border-slate-800/80 bg-[#070b12]/90 backdrop-blur overflow-hidden py-2.5 z-30 select-none">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#06090e] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#06090e] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center space-x-6 whitespace-nowrap">
        {duplicatedItems.map((item, index) => {
          const isFlashing = activeFlashingSymbol === item.symbol;

          return (
            <div
              key={`${item.key}-${index}`}
              className={`inline-flex items-center gap-2.5 px-3 py-1 rounded-md text-xs font-mono transition-colors duration-300 ${
                isFlashing
                  ? item.isPositive
                    ? 'bg-emerald-950/40 text-emerald-300 ring-1 ring-emerald-500/50'
                    : 'bg-rose-950/40 text-rose-300 ring-1 ring-rose-500/50'
                  : 'text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <span className={`font-bold tracking-tight ${item.isIndex ? 'text-slate-200' : 'text-slate-100'}`}>
                {item.symbol}
              </span>
              <span className="text-slate-300 font-medium">{item.price}</span>
              <span
                className={`inline-flex items-center gap-0.5 font-semibold ${
                  item.isPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {item.isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {item.changeText}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
