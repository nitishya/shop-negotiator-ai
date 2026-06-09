import React from 'react';
import Link from 'next/link';
import { Star, TrendingDown, PhoneCall, Zap } from 'lucide-react';
import { Product } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

interface ProductRecommendationCardProps {
  product: Product;
}

export default function ProductRecommendationCard({ product }: ProductRecommendationCardProps) {
  const { startCall } = useApp();
  const router = useRouter();

  const handleStartNegotiation = () => {
    startCall(product.id);
    router.push('/video-call');
  };

  const storePrices = product.stores.map(s => s.price);
  const bestOnlinePrice = Math.min(...storePrices);
  const originalPrice = Math.max(...product.stores.map(s => s.originalPrice));

  // Default to 0 if not provided
  const rating = product.rating || 0;
  const aiScore = product.aiRecommendationScore || 0;

  // Determine score color
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (score >= 70) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
    return 'text-red-400 bg-red-500/10 border-red-500/30';
  };

  return (
    <div className="glass-panel rounded-2xl border border-brand-border overflow-hidden flex flex-col group shadow-lg transition-transform hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative h-48 w-full bg-zinc-900 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* AI Score Badge */}
        <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full border text-[11px] font-bold backdrop-blur-md flex items-center gap-1 ${getScoreColor(aiScore)}`}>
          <Zap className="w-3 h-3" />
          AI Score: {aiScore}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
          <span className="text-xs font-bold text-zinc-300">{rating.toFixed(1)}</span>
        </div>

        <h3 className="font-bold text-white text-base leading-snug mb-1 group-hover:text-indigo-400 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed flex-grow">
          {product.description}
        </p>

        {/* Pricing Breakdown */}
        <div className="space-y-2 mb-5 pt-3 border-t border-zinc-900">
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500">Best Store Price</span>
            <div className="flex items-end gap-2">
              <span className="text-lg font-bold text-white">₹{bestOnlinePrice.toLocaleString()}</span>
              <span className="text-xs text-zinc-500 line-through mb-1">₹{originalPrice.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm bg-indigo-500/10 border border-indigo-500/20 p-2 rounded-lg">
            <span className="font-semibold text-indigo-400 text-xs">Expected AI Price:</span>
            <span className="font-extrabold text-indigo-400">
              ₹{product.negotiatedPrice?.toLocaleString() || '---'}
            </span>
          </div>
        </div>

        {/* Action Trigger */}
        <button
          onClick={handleStartNegotiation}
          className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold text-sm transition-opacity hover:opacity-95 shadow-md shadow-indigo-600/20 active:scale-95"
        >
          <PhoneCall className="w-4 h-4 text-indigo-200" />
          <span>Call AI to Negotiate</span>
        </button>
      </div>
    </div>
  );
}
