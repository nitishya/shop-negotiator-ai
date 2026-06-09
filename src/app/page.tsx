'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { 
  Bot, 
  Video, 
  TrendingDown, 
  Store, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Percent, 
  Sparkles,
  PhoneCall
} from 'lucide-react';

export default function Home() {
  const { startCall } = useApp();
  const router = useRouter();

  const handleStartNegotiation = (productId: string) => {
    startCall(productId);
    router.push('/video-call');
  };

  return (
    <div className="flex-1 w-full flex flex-col bg-zinc-950 grid-bg min-h-screen relative pb-16">
      {/* Background Radial Glow */}
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] -z-10 pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 pt-16 pb-12 sm:px-6 md:px-8 text-center flex flex-col items-center">
        {/* Hackathon Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 text-xs font-semibold mb-6 shadow-sm shadow-indigo-500/5 animate-pulse-glow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hackathon Demo: Fully Simulated Interactive Experience</span>
        </div>

        <h1 className="max-w-4xl text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
          Negotiate Best Deals in Real-Time <br />
          With Our <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent glow-text-indigo">Autonomous Voice AI</span>
        </h1>

        <p className="max-w-2xl text-zinc-400 text-lg sm:text-xl leading-relaxed mb-8">
          The ultimate shopping companion. Launch a live video call, and watch the AI Agent scan Croma, Amazon, and Flipkart, chatting directly with merchant bots to slash prices and secure custom coupons.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 w-full max-w-md">
          <Link
            href="/video-call"
            onClick={() => handleStartNegotiation('sony-wh1000xm5')}
            className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-base font-semibold text-white hover:opacity-95 transition-opacity shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 duration-200"
          >
            <Video className="w-5 h-5 text-indigo-200" />
            <span>Launch Live Agent Call</span>
            <ArrowRight className="w-4 h-4 text-indigo-200" />
          </Link>
          <Link
            href="/compare"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all hover:scale-[1.02] active:scale-95 duration-200"
          >
            <Store className="w-5 h-5" />
            <span>Compare Store Prices</span>
          </Link>
        </div>

        {/* Dynamic Interactive Stats / Preview */}
        <div className="w-full max-w-5xl mx-auto glass-panel rounded-2xl border border-brand-border p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
            <div className="flex flex-col items-center justify-center text-center p-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-3">
                <TrendingDown className="w-6 h-6" />
              </div>
              <span className="text-3xl font-extrabold text-white mb-1">14.6%</span>
              <span className="text-sm text-zinc-500 font-medium">Average Negotiated Discount</span>
            </div>

            <div className="flex flex-col items-center justify-center text-center p-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 mb-3">
                <Bot className="w-6 h-6" />
              </div>
              <span className="text-3xl font-extrabold text-white mb-1">&lt; 90s</span>
              <span className="text-sm text-zinc-500 font-medium">Agent Negotiation Speed</span>
            </div>

            <div className="flex flex-col items-center justify-center text-center p-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-3xl font-extrabold text-white mb-1">₹46,850+</span>
              <span className="text-sm text-zinc-500 font-medium">Mock User Savings Today</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">How AI Negotiation Works</h2>
          <p className="text-zinc-500 max-w-xl mx-auto">Our specialized retail negotiator AI uses multiple APIs to verify deals and prompt vendor bots.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass-panel glass-panel-hover rounded-2xl border border-brand-border p-6 flex flex-col items-start">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 mb-4 border border-indigo-500/20">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Voice & Video Streaming</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Connect via simulated video call. The negotiator agent listens to your shopping requirements, shares product metrics, and negotiates live.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel glass-panel-hover rounded-2xl border border-brand-border p-6 flex flex-col items-start">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-violet-500/10 text-violet-400 mb-4 border border-violet-500/20">
              <Store className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Cross-Platform Price Match</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Instantly scans Amazon, Flipkart, and Croma for pricing, and uses price gaps as leverage in chatbot sessions to secure price adjustments.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel glass-panel-hover rounded-2xl border border-brand-border p-6 flex flex-col items-start">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 mb-4 border border-emerald-500/20">
              <Percent className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Vendor Discount Injection</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Extracts private seller discount codes and combines them with bank card promotions for direct price reductions at mock checkout.
            </p>
          </div>
        </div>
      </section>

      {/* Product Catalog / Live Demo Triggers */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Choose a Product & Negotiate</h2>
            <p className="text-zinc-500">Pick any product card below to launch a customized live voice bargaining session.</p>
          </div>
          <Link
            href="/compare"
            className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-400 hover:text-indigo-300 hover:underline"
          >
            <span>View Full Multi-Store Comparison</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map((product) => {
            // Find lowest store price
            const storePrices = product.stores.map(s => s.price);
            const bestOnlinePrice = Math.min(...storePrices);
            const originalPrice = Math.max(...product.stores.map(s => s.originalPrice));
            const potentialSavings = originalPrice - (product.negotiatedPrice || bestOnlinePrice);

            return (
              <div 
                key={product.id}
                className="glass-panel rounded-2xl border border-brand-border overflow-hidden flex flex-col group shadow-lg"
              >
                {/* Product Image */}
                <div className="relative h-44 w-full bg-zinc-900 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-zinc-800 text-[11px] font-bold text-zinc-300">
                    {product.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-white text-base leading-snug mb-1 group-hover:text-indigo-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed flex-grow">
                    {product.description}
                  </p>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1 mb-4 pt-2 border-t border-zinc-900">
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span>Retail Price:</span>
                      <span className="line-through">₹{originalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span>Store Price:</span>
                      <span>₹{bestOnlinePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-emerald-400 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 fill-emerald-400" /> AI Target:
                      </span>
                      <span className="font-extrabold text-emerald-400">
                        ₹{product.negotiatedPrice?.toLocaleString() || '---'}
                      </span>
                    </div>
                  </div>

                  {/* Savings Badge */}
                  <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-lg py-1.5 px-3 flex items-center justify-between text-xs font-semibold text-emerald-400 mb-4">
                    <span>Est. AI Savings:</span>
                    <span>₹{potentialSavings.toLocaleString()}</span>
                  </div>

                  {/* Action Trigger */}
                  <button
                    onClick={() => handleStartNegotiation(product.id)}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-md shadow-indigo-600/10 active:scale-95"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Negotiate Price Live</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
