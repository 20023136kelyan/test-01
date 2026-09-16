import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TickerMarquee } from './components/TickerMarquee';
import { Hero } from './components/Hero';
import { MarketScreener } from './components/MarketScreener';
import { RoiCalculator } from './components/RoiCalculator';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { TradeModal } from './components/TradeModal';
import { StockItem } from './data/stocks';

export function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tradeStock, setTradeStock] = useState<StockItem | null>(null);

  const handleOpenDemoModal = () => {
    setTradeStock(null);
    setIsModalOpen(true);
  };

  const handleSelectTrade = (stock: StockItem) => {
    setTradeStock(stock);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-400">
      {/* Fixed Navigation Bar */}
      <Navbar onOpenDemoModal={handleOpenDemoModal} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Real-time Ticker Marquee Bar right under nav */}
        <div className="pt-[72px]">
          <TickerMarquee />
        </div>

        {/* Hero Section with Interactive Chart & Level 2 Book */}
        <Hero onOpenDemoModal={handleOpenDemoModal} />

        {/* Market Screener Section */}
        <MarketScreener onSelectTrade={handleSelectTrade} />

        {/* Strategy ROI & Performance Simulator */}
        <RoiCalculator onOpenDemoModal={handleOpenDemoModal} />

        {/* Feature Pillars & Infrastructure */}
        <Features />

        {/* Transparent Pricing Plans */}
        <Pricing onOpenDemoModal={handleOpenDemoModal} />

        {/* Trader Testimonials & Social Proof */}
        <Testimonials />
      </main>

      {/* Institutional Footer & Regulatory Disclosures */}
      <Footer />

      {/* Modal Dialog for Demo Registration and Stock Execution */}
      <TradeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedStock={tradeStock}
      />
    </div>
  );
}

export default App;
