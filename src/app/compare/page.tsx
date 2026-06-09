'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { MOCK_PRODUCTS, Product, ProductStore } from '@/data/mockData';
import { 
  Store, 
  TrendingDown, 
  Star, 
  Zap, 
  PhoneCall, 
  Check, 
  X, 
  ShoppingCart,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default function ProductComparisonPage() {
  const { startCall, addToCart } = useApp();
  const router = useRouter();
  
  // Default selected comparison product is the first one
  const [selectedProductId, setSelectedProductId] = useState(MOCK_PRODUCTS[0].id);

  const selectedProduct = MOCK_PRODUCTS.find(p => p.id === selectedProductId) || MOCK_PRODUCTS[0];

  const handleStartNegotiation = (productId: string) => {
    startCall(productId);
    router.push('/video-call');
  };

  // Find stores sorted by price (lowest first)
  const sortedStores = [...selectedProduct.stores].sort((a, b) => a.price - b.price);
  const bestStore = sortedStores[0];
  const worstStore = sortedStores[sortedStores.length - 1];
  
  const originalPrice = Math.max(...selectedProduct.stores.map(s => s.originalPrice));
  const onlinePriceGap = worstStore.price - bestStore.price;
  const aiNegotiatedSavings = bestStore.price - (selectedProduct.negotiatedPrice || bestStore.price);
  const totalPotentialSavings = originalPrice - (selectedProduct.negotiatedPrice || bestStore.price);

  const handleAddStoreToCart = (store: ProductStore) => {
    addToCart({
      id: `${selectedProduct.id}-${store.storeName.toLowerCase()}`,
      name: `${selectedProduct.name} (${store.storeName})`,
      imageUrl: selectedProduct.imageUrl,
      storeName: store.storeName,
      price: store.price,
      originalPrice: store.originalPrice
    });
  };

  return (
    <div className="flex-1 w-full bg-zinc-950 min-h-[calc(100vh-64px)] grid-bg py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Page title */}
        <div className="border-b border-brand-border pb-4">
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            Multi-Store Price Engine
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Real-time catalog comparison between Amazon, Flipkart, and Croma. Activate the AI Negotiator to push prices below the best market listings.
          </p>
        </div>

        {/* Product selector grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {MOCK_PRODUCTS.map((prod) => {
            const isSelected = prod.id === selectedProductId;
            const lowestPrice = Math.min(...prod.stores.map(s => s.price));
            return (
              <button
                key={prod.id}
                onClick={() => setSelectedProductId(prod.id)}
                className={`p-4 rounded-2xl border text-left transition-all active:scale-98 ${
                  isSelected 
                    ? 'bg-indigo-500/10 border-indigo-500 shadow-md shadow-indigo-500/5' 
                    : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                }`}
              >
                <span className={`text-[10px] font-extrabold uppercase tracking-wider ${
                  isSelected ? 'text-indigo-400' : 'text-zinc-500'
                }`}>
                  {prod.category}
                </span>
                <h3 className={`font-bold text-sm line-clamp-1 mt-1 ${
                  isSelected ? 'text-white' : 'text-zinc-400'
                }`}>
                  {prod.name.split(' (')[0]}
                </h3>
                <span className="text-xs font-semibold text-zinc-500 mt-2 block">
                  From ₹{lowestPrice.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Details Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Compare Table */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="glass-panel rounded-2xl border border-brand-border overflow-hidden shadow-lg">
              
              {/* Product Info Header */}
              <div className="p-6 bg-zinc-900/40 border-b border-brand-border flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-16 h-16 rounded-xl object-cover border border-zinc-800"
                />
                <div>
                  <h2 className="text-lg font-bold text-white leading-tight">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                    {selectedProduct.description}
                  </p>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-brand-border bg-zinc-900/10 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-4 px-6">Store Platform</th>
                      <th className="py-4 px-4">Standard Price</th>
                      <th className="py-4 px-4">Delivery time</th>
                      <th className="py-4 px-4">Rating</th>
                      <th className="py-4 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900/80 font-medium">
                    {selectedProduct.stores.map((store) => {
                      const isBestPrice = store.price === bestStore.price;
                      return (
                        <tr key={store.storeName} className="hover:bg-zinc-900/30 transition-colors">
                          {/* Store Info */}
                          <td className="py-4 px-6 flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-[10px] text-zinc-300">
                              {store.storeName[0]}
                            </span>
                            <span className="font-bold text-white">{store.storeName}</span>
                            {isBestPrice && (
                              <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded">
                                Best Price
                              </span>
                            )}
                          </td>

                          {/* Price */}
                          <td className="py-4 px-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-extrabold text-white">
                                ₹{store.price.toLocaleString()}
                              </span>
                              <span className="text-[10px] text-zinc-500 line-through">
                                ₹{store.originalPrice.toLocaleString()}
                              </span>
                            </div>
                          </td>

                          {/* Delivery */}
                          <td className="py-4 px-4 text-zinc-300">
                            {store.deliveryDays === 1 ? 'Tomorrow' : `In ${store.deliveryDays} Days`}
                          </td>

                          {/* Rating */}
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                              <span className="text-zinc-200">{store.rating}</span>
                              <span className="text-[10px] text-zinc-500">({store.reviewsCount})</span>
                            </div>
                          </td>

                          {/* Action */}
                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={() => handleAddStoreToCart(store)}
                              className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors active:scale-95 text-xs font-semibold"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>Add to Cart</span>
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

          {/* Savings Summary Widget */}
          <div className="flex flex-col gap-6">
            
            {/* The Negotiator Pitch Card */}
            <div className="glass-panel rounded-2xl border border-brand-border p-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-full bg-gradient-to-b from-zinc-900/30 to-brand-primary/5">
              <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
              
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-indigo-500/15 border border-indigo-500/30 rounded-lg text-indigo-400">
                    <Zap className="w-4 h-4 fill-indigo-400" />
                  </div>
                  <h3 className="font-extrabold text-sm uppercase tracking-wider text-indigo-300">AI Negotiator Action</h3>
                </div>

                <h4 className="text-xl font-bold text-white leading-tight mb-2">
                  Beat the Market Price by ₹{aiNegotiatedSavings.toLocaleString()}!
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  Even the best online store price ({bestStore.storeName} at ₹{bestStore.price.toLocaleString()}) isn't the absolute lowest. Launch our voice AI call to negotiate a private clearance voucher from vendor chat lines.
                </p>

                <div className="space-y-3 pt-4 border-t border-zinc-900">
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span>Worst online price:</span>
                    <span>₹{worstStore.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Lowest online listing:</span>
                    <span>₹{bestStore.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-white">Target Negotiated Deal:</span>
                    <span className="font-extrabold text-emerald-400 text-base">
                      ₹{selectedProduct.negotiatedPrice?.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Savings progress indicator */}
                <div className="mt-5 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-emerald-400 font-extrabold uppercase">Total Potential Savings</span>
                    <span className="text-lg font-extrabold text-emerald-400">
                      ₹{totalPotentialSavings.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-500 block uppercase font-bold">Reduction</span>
                    <span className="text-sm font-extrabold text-emerald-500 flex items-center gap-0.5 justify-end">
                      <TrendingDown className="w-4 h-4" /> {Math.round((totalPotentialSavings / originalPrice) * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Negotiator Trigger Button */}
              <div className="mt-6">
                <button
                  onClick={() => handleStartNegotiation(selectedProduct.id)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-sm font-bold text-white shadow-md shadow-indigo-500/10 hover:opacity-95 transition-opacity active:scale-95"
                >
                  <PhoneCall className="w-4 h-4 text-indigo-200" />
                  <span>Start Negotiator Voice Call</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
