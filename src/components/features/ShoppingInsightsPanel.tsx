import React from 'react';
import { Product } from '@/data/mockData';
import { TrendingDown, TrendingUp, Calendar, AlertCircle, BarChart3 } from 'lucide-react';

interface ShoppingInsightsPanelProps {
  product: Product;
}

export default function ShoppingInsightsPanel({ product }: ShoppingInsightsPanelProps) {
  // Use mock historical prices, fallback if empty
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
    <div className="glass-panel rounded-2xl border border-brand-border p-6 shadow-xl flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-4">
        <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400">
          <BarChart3 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-white text-base">Shopping Insights</h3>
          <p className="text-xs text-zinc-500">AI-powered price tracking & predictions</p>
        </div>
      </div>

      {/* Recommendation Box */}
      <div className={`p-4 rounded-xl border flex items-start gap-3 ${
        isGoodTimeToBuy 
          ? 'bg-emerald-500/10 border-emerald-500/30' 
          : 'bg-yellow-500/10 border-yellow-500/30'
      }`}>
        {isGoodTimeToBuy ? (
          <TrendingDown className="w-5 h-5 text-emerald-400 mt-0.5" />
        ) : (
          <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
        )}
        <div>
          <h4 className={`text-sm font-bold mb-1 ${isGoodTimeToBuy ? 'text-emerald-400' : 'text-yellow-400'}`}>
            AI Recommendation: {bestTime.split('-')[0].trim()}
          </h4>
          <p className={`text-xs ${isGoodTimeToBuy ? 'text-emerald-500/80' : 'text-yellow-500/80'}`}>
            {bestTime.split('-')[1]?.trim() || 'Based on market historical data.'}
          </p>
        </div>
      </div>

      {/* Mini Chart (CSS based bars) */}
      <div>
        <div className="flex items-center justify-between mb-3 text-xs text-zinc-400">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Last 6 Months</span>
          <span>Current: ₹{currentPrice.toLocaleString()}</span>
        </div>
        
        <div className="h-32 flex items-end justify-between gap-2 pt-4 border-b border-zinc-800">
          {prices.map((price, idx) => {
            // Calculate height percentage based on min/max
            const range = maxPrice - minPrice || 1;
            const heightPercent = Math.max(10, ((price - minPrice) / range) * 100);
            const isLast = idx === prices.length - 1;
            
            return (
              <div key={idx} className="w-full flex flex-col items-center gap-2 group">
                <div 
                  className={`w-full rounded-t-sm transition-all duration-500 ${
                    isLast 
                      ? (priceDropped ? 'bg-emerald-500' : 'bg-red-500') 
                      : 'bg-zinc-700 group-hover:bg-indigo-500/50'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                >
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 absolute -translate-y-8 bg-zinc-900 border border-zinc-700 text-xs px-2 py-1 rounded text-white pointer-events-none transition-opacity z-10">
                    ₹{price.toLocaleString()}
                  </div>
                </div>
                <span className="text-[9px] text-zinc-600 font-bold uppercase">M{idx+1}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-900/50 rounded-lg p-3 border border-zinc-800">
          <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">6 Mo Low</span>
          <p className="text-sm font-bold text-white mt-1">₹{minPrice.toLocaleString()}</p>
        </div>
        <div className="bg-zinc-900/50 rounded-lg p-3 border border-zinc-800">
          <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">6 Mo High</span>
          <p className="text-sm font-bold text-white mt-1">₹{maxPrice.toLocaleString()}</p>
        </div>
      </div>

    </div>
  );
}
