'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { MOCK_PRODUCTS } from '@/data/mockData';
import ProductRecommendationCard from '@/components/features/ProductRecommendationCard';
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
    <div className="flex-1 w-full flex flex-col bg-slate-50 grid-bg min-h-screen relative pb-16">
      {/* Background Radial Glow */}
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] -z-10 pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 pt-16 pb-12 sm:px-6 md:px-8 text-center flex flex-col items-center">
        {/* Platform Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 text-xs font-semibold mb-6 shadow-sm shadow-indigo-500/5 animate-pulse-glow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Retail Negotiation Platform: Fully Autonomous & Live</span>
        </div>

        <h1 className="max-w-4xl text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6">
          Negotiate Best Deals in Real-Time <br />
          With Our <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent glow-text-indigo">Autonomous Voice AI</span>
        </h1>

        <p className="max-w-2xl text-slate-500 text-lg sm:text-xl leading-relaxed mb-8">
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
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-all hover:scale-[1.02] active:scale-95 duration-200"
          >
            <Store className="w-5 h-5" />
            <span>Compare Store Prices</span>
          </Link>
        </div>

        {/* Dynamic Interactive Stats / Preview */}
        <div className="w-full max-w-5xl mx-auto glass-panel rounded-2xl border border-brand-border p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="flex flex-col items-center justify-center text-center p-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 border border-indigo-200 text-indigo-600 mb-3">
                <TrendingDown className="w-6 h-6" />
              </div>
              <span className="text-3xl font-extrabold text-slate-900 mb-1">14.6%</span>
              <span className="text-sm text-slate-500 font-medium">Average Negotiated Discount</span>
            </div>

            <div className="flex flex-col items-center justify-center text-center p-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-violet-100 border border-violet-200 text-violet-600 mb-3">
                <Bot className="w-6 h-6" />
              </div>
              <span className="text-3xl font-extrabold text-slate-900 mb-1">&lt; 90s</span>
              <span className="text-sm text-slate-500 font-medium">Agent Negotiation Speed</span>
            </div>

            <div className="flex flex-col items-center justify-center text-center p-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-600 mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-3xl font-extrabold text-slate-900 mb-1">₹46,850+</span>
              <span className="text-sm text-slate-500 font-medium">Mock User Savings Today</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">How AI Negotiation Works</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Our specialized retail negotiator AI uses multiple APIs to verify deals and prompt vendor bots.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass-panel glass-panel-hover rounded-2xl border border-slate-200 p-6 flex flex-col items-start bg-white">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 mb-4 border border-indigo-100">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Voice & Video Streaming</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Connect via simulated video call. The negotiator agent listens to your shopping requirements, shares product metrics, and negotiates live.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel glass-panel-hover rounded-2xl border border-slate-200 p-6 flex flex-col items-start bg-white">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-violet-50 text-violet-600 mb-4 border border-violet-100">
              <Store className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Cross-Platform Price Match</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Instantly scans Amazon, Flipkart, and Croma for pricing, and uses price gaps as leverage in chatbot sessions to secure price adjustments.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel glass-panel-hover rounded-2xl border border-slate-200 p-6 flex flex-col items-start bg-white">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 mb-4 border border-emerald-100">
              <Percent className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Vendor Discount Injection</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Extracts private seller discount codes and combines them with bank card promotions for direct price reductions at mock checkout.
            </p>
          </div>
        </div>
      </section>

      {/* Product Catalog / Live Demo Triggers */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Choose a Product & Negotiate</h2>
            <p className="text-slate-500">Pick any product card below to launch a customized live voice bargaining session.</p>
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
          {MOCK_PRODUCTS.map((product) => (
            <ProductRecommendationCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
