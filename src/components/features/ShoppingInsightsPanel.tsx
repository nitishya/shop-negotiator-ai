import React from 'react';
import { Product } from '@/data/mockData';
import { TrendingDown, Calendar, AlertCircle, BarChart3 } from 'lucide-react';

interface ShoppingInsightsPanelProps {
  product: Product;
}

export default function ShoppingInsightsPanel({ product }: ShoppingInsightsPanelProps) {
  const prices = product.historicalPrices && product.historicalPrices.length > 0 
    ? product.historicalPrices 
    : [30000, 29000, 29500, 28000, 28500, 27000];
  
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const currentPrice = prices[prices.length - 1];
  const previousPrice = prices[prices.length - 2] || currentPrice;
  const priceDropped = currentPrice <= previousPrice;

  const bestTime = product.bestBuyingTime || 'Buy Now';
  const isGoodTimeToBuy = bestTime.toLowerCase().includes('buy now');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
        <div className="p-2 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-600">
          <BarChart3 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-base">Shopping Insights</h3>
          <p className="text-xs text-slate-500">AI-powered price tracking &amp; predictions</p>
        </div>
      </div>

      {/* Recommendation Box */}
      <div className={`p-4 rounded-xl border flex items-start gap-3 ${
        isGoodTimeToBuy 
          ? 'bg-emerald-50 border-emerald-100' 
          : 'bg-amber-50 border-amber-100'
      }`}>
        {isGoodTimeToBuy ? (
          <TrendingDown className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
        )}
        <div>
          <h4 className={`text-sm font-bold mb-1 ${isGoodTimeToBuy ? 'text-emerald-700' : 'text-amber-700'}`}>
            AI Recommendation: {bestTime.split('-')[0].trim()}
          </h4>
          <p className={`text-xs ${isGoodTimeToBuy ? 'text-emerald-600' : 'text-amber-600'}`}>
            {bestTime.split('-')[1]?.trim() || 'Based on market historical data.'}
          </p>
        </div>
      </div>

      {/* Mini Bar Chart */}
      <div>
        <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Last 6 Months</span>
          <span className="font-medium text-slate-700">Current: ₹{currentPrice.toLocaleString()}</span>
        </div>
        
        <div className="h-24 flex items-end justify-between gap-1.5 pb-1 border-b border-slate-100">
          {prices.map((price, idx) => {
            const range = maxPrice - minPrice || 1;
            const heightPercent = Math.max(15, ((price - minPrice) / range) * 100);
            const isLast = idx === prices.length - 1;
            
            return (
              <div key={idx} className="w-full flex flex-col items-center gap-1.5 group relative">
                <div 
                  className={`w-full rounded-t transition-all duration-500 ${
                    isLast 
                      ? (priceDropped ? 'bg-emerald-400' : 'bg-red-400') 
                      : 'bg-slate-200 group-hover:bg-indigo-300'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap pointer-events-none transition-opacity z-10">
                    ₹{price.toLocaleString()}
                  </div>
                </div>
                <span className="text-[9px] text-slate-400 font-bold uppercase">M{idx+1}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">6 Mo Low</span>
          <p className="text-sm font-bold text-slate-900 mt-1">₹{minPrice.toLocaleString()}</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">6 Mo High</span>
          <p className="text-sm font-bold text-slate-900 mt-1">₹{maxPrice.toLocaleString()}</p>
        </div>
      </div>

    </div>
  );
}
