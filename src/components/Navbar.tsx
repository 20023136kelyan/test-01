import React, { useState, useEffect } from 'react';
import { TrendingUp, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenDemoModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemoModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#06090e]/85 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Platform Badge */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-[1px] shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all">
                <div className="w-full h-full bg-[#070b12] rounded-[11px] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  Apex<span className="text-emerald-400 font-extrabold">Trade</span>
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">PRO</span>
                </span>
                <span className="text-[11px] text-slate-400 font-medium tracking-wide">Institutional Execution</span>
              </div>
            </a>

            {/* Live Market State Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-semibold">NYSE: LIVE</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">0.08ms Latency</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#markets" className="hover:text-emerald-400 transition-colors">Markets</a>
            <a href="#terminal" className="hover:text-emerald-400 transition-colors">Terminal</a>
            <a href="#screener" className="hover:text-emerald-400 transition-colors">Screener</a>
            <a href="#calculator" className="hover:text-emerald-400 transition-colors">Yield Simulator</a>
            <a href="#features" className="hover:text-emerald-400 transition-colors">Execution Engine</a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenDemoModal}
              className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-slate-800/60 transition-all cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={onOpenDemoModal}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 group-hover:from-emerald-600 group-hover:to-cyan-600 hover:text-white text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all cursor-pointer"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-[#0a0f19] rounded-[7px] group-hover:bg-opacity-0 flex items-center gap-1.5 font-semibold text-emerald-400 group-hover:text-white">
                Start Paper Trading
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0f19]/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-4 pb-6 mt-3 space-y-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-semibold">NYSE: LIVE</span>
            <span className="text-slate-500">|</span>
            <span>0.08ms Execution</span>
          </div>
          <div className="flex flex-col space-y-3 text-slate-300 text-sm font-medium">
            <a
              href="#markets"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/60 hover:text-emerald-400 transition-colors"
            >
              Markets
            </a>
            <a
              href="#terminal"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/60 hover:text-emerald-400 transition-colors"
            >
              Terminal
            </a>
            <a
              href="#screener"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/60 hover:text-emerald-400 transition-colors"
            >
              Screener
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/60 hover:text-emerald-400 transition-colors"
            >
              Yield Simulator
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/60 hover:text-emerald-400 transition-colors"
            >
              Execution Engine
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/60 hover:text-emerald-400 transition-colors"
            >
              Pricing
            </a>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemoModal();
              }}
              className="w-full py-2.5 rounded-lg font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition-colors flex items-center justify-center gap-1.5"
            >
              Start Free Paper Trading
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemoModal();
              }}
              className="w-full py-2.5 rounded-lg font-medium border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
            >
              Sign In to Account
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
