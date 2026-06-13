'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { MOCK_PRODUCTS, Product, ProductStore } from '@/data/mockData';
import { 
  Store, 
  TrendingDown, 
  Star, 
  Zap, 
  PhoneCall, 
  ShoppingCart,
  Search,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import ShoppingInsightsPanel from '@/components/features/ShoppingInsightsPanel';

function ComparePageContent() {
  const { startCall, addToCart } = useApp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryFromSearch = searchParams.get('q') || '';

  const [selectedProductId, setSelectedProductId] = useState(MOCK_PRODUCTS[0].id);
  const [liveResults, setLiveResults] = useState<Product[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [searchQuery, setSearchQuery] = useState(queryFromSearch);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(MOCK_PRODUCTS);

  // When a search query arrives (from Navbar), fetch live products
  useEffect(() => {
    if (queryFromSearch) {
      setSearchQuery(queryFromSearch);
      fetchLiveProducts(queryFromSearch);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryFromSearch]);

  const fetchLiveProducts = async (q: string) => {
    if (!q.trim()) return;
    setIsLoadingLive(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (data.products && data.products.length > 0) {
        setLiveResults(data.products);
        setDisplayedProducts(data.products);
        setSelectedProductId(data.products[0].id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingLive(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchLiveProducts(searchQuery);
    } else {
      setDisplayedProducts(MOCK_PRODUCTS);
      setSelectedProductId(MOCK_PRODUCTS[0].id);
    }
  };

  const handleStartNegotiation = (productId: string) => {
    startCall(productId);
    router.push('/video-call');
  };

  const selectedProduct = displayedProducts.find(p => p.id === selectedProductId) || displayedProducts[0];

  if (!selectedProduct) return null;

  const sortedStores = [...selectedProduct.stores].sort((a, b) => a.price - b.price);
  const bestStore = sortedStores[0];
  const worstStore = sortedStores[sortedStores.length - 1];
  const originalPrice = Math.max(...selectedProduct.stores.map(s => s.originalPrice));
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
    <div className="flex-1 w-full bg-slate-50 min-h-screen grid-bg py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">

        {/* Page title */}
        <div className="border-b border-slate-200 pb-5">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Multi-Platform Price Engine
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time comparison across Amazon, Flipkart, Croma &amp; more. Search any product below.
          </p>

          {/* Inline Search Bar */}
          <form onSubmit={handleSearch} className="mt-4 flex items-center gap-2 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any product (e.g. iPhone, laptop, headphones)..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-indigo-400 transition-colors shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isLoadingLive}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-300 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
            >
              {isLoadingLive ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Search
            </button>
          </form>
        </div>

        {/* Loading state */}
        {isLoadingLive && (
          <div className="flex items-center justify-center gap-3 py-12 text-slate-500">
            <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
            <span className="text-sm font-medium">Fetching live product data...</span>
          </div>
        )}

        {!isLoadingLive && (
          <>
            {/* Product selector */}
            {liveResults.length > 0 && (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2 w-fit">
                <Zap className="w-3.5 h-3.5 fill-emerald-500" />
                Showing {liveResults.length} live web results for &quot;{queryFromSearch || searchQuery}&quot;
              </div>
            )}

            {/* Product selector grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {displayedProducts.map((prod) => {
                const isSelected = prod.id === selectedProductId;
                const lowestPrice = Math.min(...prod.stores.map(s => s.price));
                return (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProductId(prod.id)}
                    className={`p-4 rounded-2xl border text-left transition-all active:scale-[0.98] ${
                      isSelected 
                        ? 'bg-indigo-50 border-indigo-400 shadow-md shadow-indigo-100' 
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider ${
                      isSelected ? 'text-indigo-600' : 'text-slate-400'
                    }`}>
                      {prod.category}
                    </span>
                    <h3 className={`font-bold text-sm line-clamp-1 mt-1 ${
                      isSelected ? 'text-slate-900' : 'text-slate-600'
                    }`}>
                      {prod.name.split(' (')[0]}
                    </h3>
                    <span className="text-xs font-semibold text-emerald-600 mt-2 block">
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
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  
                  {/* Product Info Header */}
                  <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                    <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0 p-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedProduct.imageUrl}
                        alt={selectedProduct.name}
                        className="object-contain w-full h-full rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-slate-900 leading-tight">
                        {selectedProduct.name}
                      </h2>
                      <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
                        {selectedProduct.description}
                      </p>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                          <th className="py-4 px-6">Store Platform</th>
                          <th className="py-4 px-4">Price</th>
                          <th className="py-4 px-4">Delivery</th>
                          <th className="py-4 px-4">Rating</th>
                          <th className="py-4 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {selectedProduct.stores.map((store) => {
                          const isBestPrice = store.price === bestStore.price;
                          return (
                            <tr key={store.storeName} className="hover:bg-slate-50 transition-colors">
                              {/* Store Info */}
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-2.5">
                                  <span className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-xs text-indigo-600">
                                    {store.storeName[0]}
                                  </span>
                                  <span className="font-bold text-slate-900">{store.storeName}</span>
                                  {isBestPrice && (
                                    <span className="bg-emerald-50 border border-emerald-200 text-emerald-600 font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                                      Best Price
                                    </span>
                                  )}
                                </div>
                              </td>

                              {/* Price */}
                              <td className="py-4 px-4">
                                <div className="flex flex-col">
                                  <span className="text-sm font-extrabold text-slate-900">
                                    ₹{store.price.toLocaleString()}
                                  </span>
                                  <span className="text-[10px] text-slate-400 line-through">
                                    ₹{store.originalPrice.toLocaleString()}
                                  </span>
                                </div>
                              </td>

                              {/* Delivery */}
                              <td className="py-4 px-4 text-slate-600">
                                {store.deliveryTime 
                                  ? store.deliveryTime < 60 
                                    ? `${store.deliveryTime} min`
                                    : store.deliveryTime < 1440
                                      ? `${Math.round(store.deliveryTime / 60)} hr`
                                      : `${store.deliveryDays ?? Math.round(store.deliveryTime / 1440)} days`
                                  : store.deliveryDays === 1 ? 'Tomorrow' : `In ${store.deliveryDays} days`
                                }
                              </td>

                              {/* Rating */}
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-1">
                                  <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                                  <span className="text-slate-700">{store.rating}</span>
                                  <span className="text-[10px] text-slate-400">({store.reviewsCount})</span>
                                </div>
                              </td>

                              {/* Action */}
                              <td className="py-4 px-4 text-right">
                                <div className="flex items-center gap-2 justify-end">
                                  <a
                                    href={store.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 py-1.5 px-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-colors text-xs font-semibold shadow-sm"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                  <button
                                    onClick={() => handleAddStoreToCart(store)}
                                    className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 text-indigo-600 transition-colors text-xs font-semibold"
                                  >
                                    <ShoppingCart className="w-3.5 h-3.5" />
                                    <span>Add</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="flex flex-col gap-6">
                
                {/* AI Negotiator Action Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500 rounded-t-2xl" />
                  <div className="absolute top-[-40px] right-[-40px] w-24 h-24 bg-indigo-100 rounded-full blur-2xl opacity-60" />
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-indigo-100 border border-indigo-200 rounded-lg text-indigo-600">
                      <Zap className="w-4 h-4 fill-indigo-500" />
                    </div>
                    <h3 className="font-extrabold text-sm uppercase tracking-wider text-indigo-600">AI Negotiator</h3>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 leading-tight mb-2">
                    Save ₹{aiNegotiatedSavings.toLocaleString()} more!
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-5">
                    Best online price is {bestStore.storeName} at ₹{bestStore.price.toLocaleString()}. Our AI will negotiate a private clearance voucher to go even lower.
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-5">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Highest store price:</span>
                      <span>₹{worstStore.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>Best online price:</span>
                      <span className="font-semibold">₹{bestStore.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold text-slate-900">AI Target Price:</span>
                      <span className="font-extrabold text-emerald-600 text-base">
                        ₹{selectedProduct.negotiatedPrice?.toLocaleString() ?? bestStore.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between mb-5">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-emerald-600 font-extrabold uppercase">Total Potential Savings</span>
                      <span className="text-lg font-extrabold text-emerald-600">
                        ₹{totalPotentialSavings.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Reduction</span>
                      <span className="text-sm font-extrabold text-emerald-500 flex items-center gap-0.5 justify-end">
                        <TrendingDown className="w-4 h-4" /> {Math.round((totalPotentialSavings / originalPrice) * 100)}%
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartNegotiation(selectedProduct.id)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-sm font-bold text-white shadow-md shadow-indigo-200 hover:opacity-95 transition-opacity active:scale-95"
                  >
                    <PhoneCall className="w-4 h-4 text-indigo-200" />
                    <span>Start Negotiator Voice Call</span>
                  </button>
                </div>

                <ShoppingInsightsPanel product={selectedProduct} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ProductComparisonPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen gap-3 text-slate-500">
        <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
        <span className="text-sm">Loading compare page...</span>
      </div>
    }>
      <ComparePageContent />
    </Suspense>
  );
}
