export interface StockItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  peRatio: number;
  sparkline: number[];
  category: 'gainers' | 'tech' | 'active' | 'ai';
}

export const INITIAL_STOCKS: StockItem[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 138.45,
    change: 5.62,
    changePercent: 4.23,
    volume: '54.2M',
    marketCap: '$3.41T',
    peRatio: 52.4,
    sparkline: [129, 131, 130, 134, 133, 136, 138.45],
    category: 'ai'
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 232.18,
    change: 2.14,
    changePercent: 0.93,
    volume: '42.8M',
    marketCap: '$3.52T',
    peRatio: 34.1,
    sparkline: [228, 229, 231, 230, 231.5, 232.18],
    category: 'tech'
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 248.90,
    change: 12.40,
    changePercent: 5.24,
    volume: '88.1M',
    marketCap: '$792B',
    peRatio: 68.2,
    sparkline: [230, 234, 238, 236, 242, 248.9],
    category: 'active'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    price: 428.60,
    change: 3.80,
    changePercent: 0.90,
    volume: '21.4M',
    marketCap: '$3.18T',
    peRatio: 36.5,
    sparkline: [422, 424, 425, 427, 426, 428.6],
    category: 'tech'
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 189.75,
    change: 3.15,
    changePercent: 1.69,
    volume: '34.9M',
    marketCap: '$1.97T',
    peRatio: 41.2,
    sparkline: [184, 185, 187, 186, 188, 189.75],
    category: 'tech'
  },
  {
    symbol: 'AMD',
    name: 'Advanced Micro Devices',
    price: 154.20,
    change: 6.80,
    changePercent: 4.61,
    volume: '49.3M',
    marketCap: '$249B',
    peRatio: 74.8,
    sparkline: [144, 147, 146, 150, 152, 154.2],
    category: 'ai'
  },
  {
    symbol: 'PLTR',
    name: 'Palantir Technologies',
    price: 36.80,
    change: 2.10,
    changePercent: 6.05,
    volume: '62.7M',
    marketCap: '$82B',
    peRatio: 98.4,
    sparkline: [33.5, 34.2, 34.8, 35.5, 36.1, 36.8],
    category: 'gainers'
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    price: 582.40,
    change: 7.90,
    changePercent: 1.38,
    volume: '18.3M',
    marketCap: '$1.47T',
    peRatio: 28.6,
    sparkline: [570, 574, 572, 578, 580, 582.4],
    category: 'tech'
  },
  {
    symbol: 'SMCI',
    name: 'Super Micro Computer',
    price: 48.30,
    change: 4.20,
    changePercent: 9.52,
    volume: '71.2M',
    marketCap: '$28B',
    peRatio: 18.2,
    sparkline: [42, 44, 43, 46, 47, 48.3],
    category: 'gainers'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 165.90,
    change: -0.45,
    changePercent: -0.27,
    volume: '24.1M',
    marketCap: '$2.06T',
    peRatio: 23.4,
    sparkline: [168, 167, 166.5, 166, 165.5, 165.9],
    category: 'active'
  }
];

export const MARKET_INDICES = [
  { symbol: 'S&P 500', value: '5,864.67', change: '+0.74%', isPositive: true },
  { symbol: 'NASDAQ', value: '18,489.55', change: '+1.12%', isPositive: true },
  { symbol: 'DOW JONES', value: '43,077.70', change: '+0.37%', isPositive: true },
  { symbol: 'RUSSELL 2000', value: '2,261.14', change: '-0.18%', isPositive: false },
  { symbol: 'US 10Y YIELD', value: '4.08%', change: '-0.04', isPositive: false },
  { symbol: 'VIX VOLATILITY', value: '14.82', change: '-4.12%', isPositive: true }
];

export interface ChartDataPoint {
  time: string;
  price: number;
  open: number;
  high: number;
  low: number;
  volume: number;
}

export const TIMEFRAME_DATA: Record<string, ChartDataPoint[]> = {
  '1D': [
    { time: '09:30', price: 134.2, open: 133.8, high: 134.5, low: 133.5, volume: 2.1 },
    { time: '10:30', price: 135.4, open: 134.2, high: 135.8, low: 134.0, volume: 4.8 },
    { time: '11:30', price: 134.9, open: 135.4, high: 136.0, low: 134.5, volume: 3.2 },
    { time: '12:30', price: 136.1, open: 134.9, high: 136.5, low: 134.8, volume: 2.7 },
    { time: '13:30', price: 137.3, open: 136.1, high: 137.6, low: 135.9, volume: 3.9 },
    { time: '14:30', price: 136.8, open: 137.3, high: 137.5, low: 136.4, volume: 3.4 },
    { time: '15:30', price: 138.1, open: 136.8, high: 138.4, low: 136.7, volume: 5.1 },
    { time: '16:00', price: 138.45, open: 138.1, high: 138.9, low: 137.9, volume: 6.8 }
  ],
  '1W': [
    { time: 'Mon', price: 128.5, open: 126.0, high: 129.2, low: 125.8, volume: 22 },
    { time: 'Tue', price: 131.2, open: 128.5, high: 132.0, low: 128.0, volume: 25 },
    { time: 'Wed', price: 130.4, open: 131.2, high: 131.8, low: 129.5, volume: 19 },
    { time: 'Thu', price: 134.8, open: 130.4, high: 135.2, low: 130.1, volume: 31 },
    { time: 'Fri', price: 138.45, open: 134.8, high: 139.1, low: 134.5, volume: 38 }
  ],
  '1M': [
    { time: 'Week 1', price: 118.0, open: 115.0, high: 119.5, low: 114.0, volume: 95 },
    { time: 'Week 2', price: 123.5, open: 118.0, high: 124.2, low: 117.8, volume: 110 },
    { time: 'Week 3', price: 129.8, open: 123.5, high: 131.0, low: 122.9, volume: 125 },
    { time: 'Week 4', price: 138.45, open: 129.8, high: 140.2, low: 129.0, volume: 142 }
  ],
  '1Y': [
    { time: 'Q1', price: 82.5, open: 68.0, high: 85.0, low: 67.5, volume: 410 },
    { time: 'Q2', price: 104.2, open: 82.5, high: 108.5, low: 81.2, volume: 520 },
    { time: 'Q3', price: 119.8, open: 104.2, high: 123.0, low: 101.5, volume: 480 },
    { time: 'Q4', price: 138.45, open: 119.8, high: 140.5, low: 116.0, volume: 610 }
  ]
};
