import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, TrendingUp, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { StockItem } from '../data/stocks';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStock?: StockItem | null;
}

export const TradeModal: React.FC<TradeModalProps> = ({
  isOpen,
  onClose,
  selectedStock,
}) => {
  const [activeTab, setActiveTab] = useState<'paper-account' | 'quick-trade'>('paper-account');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Intermediate Trader');
  const [isSuccess, setIsSuccess] = useState(false);

  // Quick Trade State
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [shares, setShares] = useState(10);
  const [orderExecuted, setOrderExecuted] = useState(false);

  useEffect(() => {
    if (selectedStock) {
      setActiveTab('quick-trade');
    } else {
      setActiveTab('paper-account');
    }
    setIsSuccess(false);
    setOrderExecuted(false);
  }, [selectedStock, isOpen]);

  if (!isOpen) return null;

  const handleCreatePaperAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;
    setIsSuccess(true);
  };

  const handleExecuteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderExecuted(true);
  };

  const stockPrice = selectedStock?.price ?? 138.45;
  const stockSymbol = selectedStock?.symbol ?? 'NVDA';
  const totalCost = shares * stockPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-700/80 bg-[#090e18] shadow-2xl overflow-hidden glow-card">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#06090e]/90">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {activeTab === 'quick-trade' ? `Simulate Order: ${stockSymbol}` : 'Create Free Paper Trading Account'}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {activeTab === 'quick-trade' ? 'Direct Market Access Route' : '$100,000 Virtual Capital Included'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-900/50 text-xs font-mono">
          <button
            onClick={() => setActiveTab('paper-account')}
            className={`flex-1 py-3 text-center font-semibold transition-colors cursor-pointer ${
              activeTab === 'paper-account'
                ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-500/5'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Open Paper Account
          </button>
          <button
            onClick={() => setActiveTab('quick-trade')}
            className={`flex-1 py-3 text-center font-semibold transition-colors cursor-pointer ${
              activeTab === 'quick-trade'
                ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-500/5'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Quick Order Ticket
          </button>
        </div>

        {/* Tab 1: Paper Account Sign Up */}
        {activeTab === 'paper-account' && (
          <div className="p-6">
            {isSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Paper Account Activated!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Welcome aboard, <strong className="text-white">{fullName}</strong>. Your sandbox account has been provisioned with <strong className="text-emerald-400 font-mono">$100,000.00 USD</strong> in virtual buying power.
                </p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
                  Routing: <span className="text-emerald-400">Equinix NY4 Sandbox DMA</span> • Fill Mode: <span className="text-white">Instant L2</span>
                </div>
                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => setActiveTab('quick-trade')}
                    className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Execute First Practice Trade</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onClose}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreatePaperAccount} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Work or Personal Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Trading Style & Experience
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={e => setExperienceLevel(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                  >
                    <option>Retail Day Trader (Equities & Options)</option>
                    <option>Swing Trader / Growth Investor</option>
                    <option>Quant Developer / Automated Python Bots</option>
                    <option>Proprietary Fund Desk</option>
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-center gap-2.5 text-xs text-emerald-300">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>No credit card required. Instant activation with live market simulated data.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                >
                  <span>Generate $100k Sandbox Key</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Quick Order Ticket */}
        {activeTab === 'quick-trade' && (
          <div className="p-6">
            {orderExecuted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Order Filled Immediately!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto font-mono">
                  {orderType} {shares} shares of <strong className="text-white">{stockSymbol}</strong> @ ${stockPrice.toFixed(2)}
                </p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Execution Latency:</span>
                    <span className="text-emerald-400 font-bold">0.076ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Venue:</span>
                    <span>NASDAQ TotalView (Direct)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Value:</span>
                    <span className="text-white font-bold">${totalCost.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => setOrderExecuted(false)}
                    className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Place Another Order
                  </button>
                  <button
                    onClick={onClose}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleExecuteOrder} className="space-y-4">
                {/* Stock Info Bar */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold font-mono text-white text-base">{stockSymbol}</span>
                    <span className="text-xs text-slate-400 block font-mono">{selectedStock?.name || 'Asset Profile'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold font-mono text-emerald-400">${stockPrice.toFixed(2)}</span>
                    <span className="text-[11px] font-mono text-slate-400 block">Spread: $0.01</span>
                  </div>
                </div>

                {/* Buy / Sell Toggle */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('BUY')}
                    className={`py-2.5 rounded-xl font-mono font-bold text-xs transition-all cursor-pointer ${
                      orderType === 'BUY'
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    BUY / LONG
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('SELL')}
                    className={`py-2.5 rounded-xl font-mono font-bold text-xs transition-all cursor-pointer ${
                      orderType === 'SELL'
                        ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    SELL / SHORT
                  </button>
                </div>

                {/* Quantity Input */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Order Quantity (Shares)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={shares}
                    onChange={e => setShares(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                {/* Order Summary */}
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-xs font-mono space-y-1.5">
                  <div className="flex justify-between text-slate-400">
                    <span>Order Type:</span>
                    <span className="text-slate-200">Market On Close (DMA)</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Est. Commissions:</span>
                    <span className="text-emerald-400 font-bold">$0.00 FREE</span>
                  </div>
                  <div className="flex justify-between text-slate-200 pt-1 border-t border-slate-800 font-bold">
                    <span>Total Estimated Cost:</span>
                    <span className="text-emerald-400">${totalCost.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3.5 rounded-xl font-bold font-mono text-sm shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    orderType === 'BUY'
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                      : 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/20'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>Execute {orderType} {shares} {stockSymbol}</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
