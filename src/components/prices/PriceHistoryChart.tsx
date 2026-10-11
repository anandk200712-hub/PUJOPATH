import React, { useState } from 'react';
import {
  TrendingUp,
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface PriceHistoryChartProps {
  cropName: string;
  basePrice: number;
}

interface PriceDataPoint {
  date: string;
  modalPrice: number;
  minPrice: number;
  maxPrice: number;
  volumeTonnes: number;
}

export const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({
  cropName,
  basePrice,
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');

  // Generate realistic 7-day and 30-day series based on base price
  const generateChartData = (days: number): PriceDataPoint[] => {
    const data: PriceDataPoint[] = [];
    const now = new Date();

    const priceFactors7d = [-45, -20, 10, 35, 20, 60, 85];
    const priceFactors30d = [
      -180, -150, -120, -90, -110, -80, -60, -40, -20, 0,
      15, -10, 25, 40, 30, 50, 70, 60, 85, 95,
      110, 90, 120, 140, 130, 160, 150, 175, 190, 210,
    ];

    const factors = days === 7 ? priceFactors7d : priceFactors30d;

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const factorIndex = days - 1 - i;
      const variation = factors[factorIndex] || (Math.sin(i) * 50);

      const modal = Math.round(basePrice + variation);
      const min = Math.round(modal * 0.92);
      const max = Math.round(modal * 1.09);
      const volume = Math.round(280 + Math.abs(variation) * 4);

      const dateLabel =
        days === 7
          ? d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
          : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

      data.push({
        date: dateLabel,
        modalPrice: modal,
        minPrice: min,
        maxPrice: max,
        volumeTonnes: volume,
      });
    }

    return data;
  };

  const chartData = generateChartData(timeRange === '7d' ? 7 : 30);
  const firstPoint = chartData[0]?.modalPrice || basePrice;
  const lastPoint = chartData[chartData.length - 1]?.modalPrice || basePrice;
  const priceDiff = lastPoint - firstPoint;
  const percentageChange = Number(((priceDiff / firstPoint) * 100).toFixed(1));
  const isPositive = priceDiff >= 0;

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as PriceDataPoint;
      return (
        <div className="bg-slate-900/95 text-white p-3.5 rounded-2xl shadow-xl border border-emerald-500/30 text-xs space-y-1.5 backdrop-blur-md">
          <p className="font-bold text-slate-300 border-b border-slate-700 pb-1">{label}</p>
          <div className="flex justify-between gap-4">
            <span className="text-emerald-400 font-semibold">Modal Price:</span>
            <span className="font-mono font-black text-white">₹{data.modalPrice}/Qtl</span>
          </div>
          <div className="flex justify-between gap-4 text-slate-400 text-[11px]">
            <span>Min / Max:</span>
            <span className="font-mono">₹{data.minPrice} - ₹{data.maxPrice}</span>
          </div>
          <div className="flex justify-between gap-4 text-slate-400 text-[11px]">
            <span>Daily Arrival:</span>
            <span className="font-mono">{data.volumeTonnes} Tonnes</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Historical Price Trend & Volume Dynamics
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            National modal price movements for {cropName} across integrated APMC exchanges.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Trend Badge */}
          <div
            className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 ${
              isPositive
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-4 h-4 text-emerald-600" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-600" />
            )}
            <span>
              {isPositive ? '+' : ''}
              {percentageChange}% ({timeRange === '7d' ? '7 Days' : '30 Days'})
            </span>
          </div>

          {/* Time range switcher */}
          <div className="bg-slate-100 p-1 rounded-xl flex border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1 rounded-lg transition-all ${
                timeRange === '7d'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              7 Days
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1 rounded-lg transition-all ${
                timeRange === '30d'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              30 Days
            </button>
          </div>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis
              domain={['dataMin - 100', 'dataMax + 100']}
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `₹${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="modalPrice"
              stroke="#059669"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#priceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend & Stats Footer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 text-xs">
        <div className="p-3 bg-slate-50 rounded-xl">
          <span className="text-slate-500 text-[11px] block">Period Low</span>
          <strong className="text-slate-900 font-mono text-sm">
            ₹{Math.min(...chartData.map((d) => d.modalPrice))}/Qtl
          </strong>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl">
          <span className="text-slate-500 text-[11px] block">Period High</span>
          <strong className="text-slate-900 font-mono text-sm">
            ₹{Math.max(...chartData.map((d) => d.modalPrice))}/Qtl
          </strong>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl">
          <span className="text-slate-500 text-[11px] block">Current Benchmark</span>
          <strong className="text-emerald-800 font-mono text-sm">
            ₹{lastPoint}/Qtl
          </strong>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl">
          <span className="text-slate-500 text-[11px] block">7-Day Momentum</span>
          <strong className="text-emerald-700 font-bold text-sm">
            Bullish Demand
          </strong>
        </div>
      </div>
    </div>
  );
};

export default PriceHistoryChart;
