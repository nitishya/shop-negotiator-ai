'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { MOCK_PRODUCTS, NEGOTIATION_SCRIPT, Product } from '@/data/mockData';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  Play, 
  Pause, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  DollarSign, 
  TrendingDown, 
  MessageSquare,
  RefreshCw,
  ShoppingBag,
  Info,
  Bot
} from 'lucide-react';

export default function VideoCallPage() {
  const {
    negotiationStep,
    negotiationActive,
    isCallConnected,
    selectedProductId,
    startCall,
    endCall,
    advanceNegotiation,
    resetNegotiation,
    currentDealPrice,
    isDealLocked,
    lockDeal
  } = useApp();

  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const activeProduct = MOCK_PRODUCTS.find(p => p.id === selectedProductId) || MOCK_PRODUCTS[0];

  // Auto-scroll chat history
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [negotiationStep]);

  // Handle Auto-Play logic
  useEffect(() => {
    if (isAutoPlay && isCallConnected && negotiationStep < NEGOTIATION_SCRIPT.length) {
      autoPlayTimerRef.current = setTimeout(() => {
        advanceNegotiation();
      }, 4000); // advance every 4 seconds
    } else if (negotiationStep >= NEGOTIATION_SCRIPT.length) {
      setIsAutoPlay(false);
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlay, isCallConnected, negotiationStep, advanceNegotiation]);

  // If call is not active, auto-start a call for Sony WH-1000XM5 on mount
  useEffect(() => {
    if (!negotiationActive) {
      startCall(selectedProductId);
    }
  }, [negotiationActive, startCall, selectedProductId]);

  // Filter script steps up to current step
  const visibleSteps = NEGOTIATION_SCRIPT.slice(0, negotiationStep);
  const currentStepData = NEGOTIATION_SCRIPT[negotiationStep - 1] || null;

  // Calculate pricing metrics
  const originalPrice = Math.max(...activeProduct.stores.map(s => s.originalPrice));
  const currentBestStorePrice = Math.min(...activeProduct.stores.map(s => s.price));
  const savingsAmount = originalPrice - currentDealPrice;
  const savingsPercent = Math.round((savingsAmount / originalPrice) * 100);

  // Status helper
  const getStatusBadgeColor = (status: string | undefined) => {
    switch (status) {
      case 'Connecting': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/35';
      case 'Scanning Stores': return 'bg-blue-500/20 text-blue-400 border-blue-500/35';
      case 'Scan Complete': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/35';
      case 'Negotiating (Croma)': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/35';
      case 'Counter Offer Received': return 'bg-purple-500/20 text-purple-400 border-purple-500/35';
      case 'Negotiating (Flipkart)': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/35';
      case 'Final Price Locked': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/35';
      case 'Completed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/35';
      default: return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  return (
    <div className="flex-1 w-full bg-zinc-950 min-h-[calc(100vh-64px)] grid-bg py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-border pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-ping"></span>
              <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">Live Bargain Room</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              Negotiation Session: <span className="text-indigo-400">{activeProduct.name}</span>
            </h1>
          </div>

          {/* Quick Product Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 font-medium hidden md:inline">Negotiate another item:</span>
            <select
              value={selectedProductId}
              onChange={(e) => startCall(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs font-semibold text-zinc-300 focus:outline-none focus:border-indigo-500"
            >
              {MOCK_PRODUCTS.map(p => (
                <option key={p.id} value={p.id}>{p.name.split(' (')[0]}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT 2 COLUMNS: Video Streams */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            
            {/* Video Streams Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-[350px] sm:h-[400px]">
              
              {/* FEED 1: AI Agent */}
              <div className="relative rounded-2xl overflow-hidden glass-panel border border-brand-border flex flex-col items-center justify-center bg-zinc-900/60 shadow-lg group">
                {/* Agent glow effect */}
                <div className={`absolute w-36 h-36 rounded-full bg-indigo-500/10 blur-xl transition-all duration-1000 ${
                  isCallConnected && currentStepData?.speaker === 'agent' ? 'scale-125 bg-purple-500/20' : 'scale-100'
                }`} />
                
                {/* Visual Avatar */}
                <div className="relative flex items-center justify-center">
                  <div className={`w-24 h-24 rounded-full bg-zinc-800 border flex items-center justify-center transition-all duration-300 ${
                    isCallConnected && currentStepData?.speaker === 'agent' 
                      ? 'border-indigo-500 ring-4 ring-indigo-500/15 scale-105' 
                      : 'border-zinc-700'
                  }`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <div className="relative w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-indigo-950/40">
                      <Sparkles className="w-10 h-10 text-indigo-400 animate-float" />
                    </div>
                  </div>
                  
                  {/* Glowing Status Ring */}
                  {isCallConnected && currentStepData?.speaker === 'agent' && (
                    <span className="absolute -inset-1 rounded-full border border-indigo-500 animate-pulse opacity-75"></span>
                  )}
                </div>

                <div className="mt-4 text-center z-10">
                  <h3 className="font-bold text-white text-sm">Negotiator Agent (Voice AI)</h3>
                  <p className="text-xs text-zinc-500 font-medium mt-0.5">
                    {!isCallConnected ? 'Connecting server line...' : (currentStepData?.speaker === 'agent' ? 'Speaking...' : 'Listening...')}
                  </p>
                </div>

                {/* Simulated Audio Waveform */}
                {isCallConnected && currentStepData?.speaker === 'agent' && (
                  <div className="absolute bottom-4 flex items-end gap-1 h-6">
                    <span className="wave-bar w-1 bg-indigo-500 rounded-full h-3 animate-soundwave"></span>
                    <span className="wave-bar w-1 bg-indigo-400 rounded-full h-5 animate-soundwave"></span>
                    <span className="wave-bar w-1 bg-purple-500 rounded-full h-4 animate-soundwave"></span>
                    <span className="wave-bar w-1 bg-indigo-500 rounded-full h-6 animate-soundwave"></span>
                    <span className="wave-bar w-1 bg-purple-400 rounded-full h-3 animate-soundwave"></span>
                  </div>
                )}

                <div className="absolute top-4 left-4 bg-zinc-950/80 px-2 py-0.5 rounded text-[10px] uppercase font-extrabold text-indigo-400 border border-indigo-500/20 tracking-wider">
                  Agent Feed
                </div>
              </div>

              {/* FEED 2: User */}
              <div className="relative rounded-2xl overflow-hidden glass-panel border border-brand-border flex flex-col items-center justify-center bg-zinc-900/60 shadow-lg group">
                {videoActive ? (
                  <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 to-zinc-900 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-zinc-800/80 border border-zinc-700 flex items-center justify-center mb-3 text-zinc-400">
                      User
                    </div>
                    <span className="text-xs text-zinc-400 font-medium">Your camera is streaming (Mock)</span>
                    <div className="absolute bottom-4 flex items-end gap-1 h-6">
                      {micActive && isCallConnected && currentStepData?.speaker === 'user' ? (
                        <>
                          <span className="wave-bar w-1 bg-zinc-400 rounded-full h-2 animate-soundwave"></span>
                          <span className="wave-bar w-1 bg-zinc-300 rounded-full h-4 animate-soundwave"></span>
                          <span className="wave-bar w-1 bg-zinc-400 rounded-full h-3 animate-soundwave"></span>
                        </>
                      ) : (
                        <span className="text-[10px] text-zinc-500 font-semibold">{micActive ? 'Mic Idle' : 'Muted'}</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center text-zinc-600">
                    <VideoOff className="w-10 h-10 mb-2" />
                    <span className="text-xs font-semibold">Camera Off</span>
                  </div>
                )}

                <div className="absolute top-4 left-4 bg-zinc-950/80 px-2 py-0.5 rounded text-[10px] uppercase font-extrabold text-zinc-400 border border-zinc-800 tracking-wider">
                  You (Customer)
                </div>
              </div>

            </div>

            {/* Video Controls Bar */}
            <div className="glass-panel rounded-2xl border border-brand-border p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMicActive(!micActive)}
                  className={`p-3 rounded-xl border transition-all active:scale-95 ${
                    micActive 
                      ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300' 
                      : 'bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-400'
                  }`}
                  title={micActive ? 'Mute Mic' : 'Unmute Mic'}
                >
                  {micActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => setVideoActive(!videoActive)}
                  className={`p-3 rounded-xl border transition-all active:scale-95 ${
                    videoActive 
                      ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300' 
                      : 'bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-400'
                  }`}
                  title={videoActive ? 'Turn Camera Off' : 'Turn Camera On'}
                >
                  {videoActive ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </button>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center gap-3">
                {/* Reset button */}
                <button
                  onClick={resetNegotiation}
                  className="p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors active:scale-95"
                  title="Restart Negotiation"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                {/* Call Status Indicator */}
                <span className={`px-3 py-1.5 rounded-full border text-xs font-bold ${
                  getStatusBadgeColor(currentStepData?.statusLabel || 'Connecting')
                }`}>
                  {currentStepData?.statusLabel || 'Connecting...'}
                </span>
              </div>

              <div>
                <button
                  onClick={endCall}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-sm font-semibold text-white transition-colors shadow-md shadow-red-600/10 active:scale-95"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span className="hidden sm:inline">End Session</span>
                </button>
              </div>
            </div>

            {/* Bottom Deal Card */}
            <div className="glass-panel rounded-2xl border border-brand-border p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <h3 className="text-sm font-bold text-zinc-400 mb-4 flex items-center gap-1.5 uppercase tracking-wide">
                <TrendingDown className="w-4 h-4 text-emerald-400" /> Live Deal Dashboard
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                
                {/* original retail price */}
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-500 font-medium">Standard Retail Price</span>
                  <span className="text-xl font-bold text-zinc-400 line-through mt-0.5">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-zinc-500 mt-1">
                    (Best store price: ₹{currentBestStorePrice.toLocaleString()})
                  </span>
                </div>

                {/* Negotiated Price */}
                <div className="flex flex-col bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-3">
                  <span className="text-xs text-emerald-400/80 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Live Negotiated Price
                  </span>
                  <span className="text-2xl font-extrabold text-emerald-400 mt-0.5 glow-text-emerald">
                    ₹{currentDealPrice.toLocaleString()}
                  </span>
                  <span className="text-[10.5px] text-emerald-500/80 font-semibold mt-0.5">
                    You save ₹{savingsAmount.toLocaleString()} ({savingsPercent}% off)
                  </span>
                </div>

                {/* Deal Action */}
                <div className="flex flex-col gap-2">
                  <button
                    disabled={negotiationStep < 8 || isDealLocked}
                    onClick={lockDeal}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-md ${
                      isDealLocked
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 cursor-default'
                        : negotiationStep >= 8
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/10 cursor-pointer animate-pulse-glow'
                          : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                    }`}
                  >
                    {isDealLocked ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Deal Locked in Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Lock Negotiated Deal</span>
                      </>
                    )}
                  </button>
                  
                  {isDealLocked && (
                    <Link
                      href="/checkout"
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold text-center hover:underline flex items-center justify-center gap-1"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                  {negotiationStep < 8 && (
                    <span className="text-[10.5px] text-zinc-500 text-center flex items-center justify-center gap-1">
                      <Info className="w-3 h-3" /> Lock unlocks when agent finishes negotiation
                    </span>
                  )}
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Conversation History & Automation Controls */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            
            {/* Simulation automation card */}
            <div className="glass-panel rounded-2xl border border-brand-border p-5 shadow-lg">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-indigo-400" /> Script Controller
              </h3>

              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                Step through the AI negotiator's actions. Watch it contact Croma vendor bots and Flipkart B2B APIs to bargain down the price.
              </p>

              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  {/* Play / Pause Auto-Play */}
                  <button
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    disabled={negotiationStep >= NEGOTIATION_SCRIPT.length}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-bold transition-all active:scale-95 ${
                      isAutoPlay 
                        ? 'bg-purple-600 hover:bg-purple-500 border-purple-500 text-white shadow-md shadow-purple-500/10'
                        : negotiationStep >= NEGOTIATION_SCRIPT.length
                          ? 'bg-zinc-900 border-zinc-800 text-zinc-500 cursor-not-allowed'
                          : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300'
                    }`}
                  >
                    {isAutoPlay ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Pause Auto</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-purple-400" />
                        <span>Auto-Play Call</span>
                      </>
                    )}
                  </button>

                  {/* Manual Step */}
                  <button
                    onClick={advanceNegotiation}
                    disabled={negotiationStep >= NEGOTIATION_SCRIPT.length || isAutoPlay}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                      negotiationStep >= NEGOTIATION_SCRIPT.length || isAutoPlay
                        ? 'bg-zinc-900 border border-zinc-800 text-zinc-500 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/15'
                    }`}
                  >
                    <span>Next Agent Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-500 font-semibold px-1">
                  <span>Progress: {negotiationStep} of {NEGOTIATION_SCRIPT.length} events</span>
                  <button
                    onClick={resetNegotiation}
                    className="hover:text-indigo-400 flex items-center gap-0.5 hover:underline"
                  >
                    <RefreshCw className="w-3 h-3" /> Restart Script
                  </button>
                </div>
              </div>
            </div>

            {/* Conversation Log window */}
            <div className="glass-panel rounded-2xl border border-brand-border flex flex-col h-[350px] sm:h-[430px] shadow-lg overflow-hidden">
              <div className="px-5 py-4 border-b border-brand-border bg-zinc-900/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-sm font-bold text-white">Live Conversation Log</h3>
                </div>
                <span className="text-[10px] text-zinc-500 font-extrabold tracking-wide uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                  Realtime API Transcript
                </span>
              </div>

              {/* Chat Scroll Container */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar flex flex-col">
                {visibleSteps.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-zinc-500">
                    <span className="animate-spin h-5 w-5 rounded-full border-2 border-indigo-500 border-t-transparent mb-2"></span>
                    <span className="text-xs font-medium">Connecting voice stream, please wait...</span>
                  </div>
                ) : (
                  visibleSteps.map((step) => {
                    const isAgent = step.speaker === 'agent';
                    const isSystem = step.speaker === 'system';
                    const isStore = step.speaker === 'store_bot';
                    
                    if (isSystem) {
                      return (
                        <div key={step.id} className="flex flex-col items-center text-center my-1">
                          <span className="text-[10.5px] bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-lg text-zinc-500 font-semibold max-w-[90%] break-words">
                            {step.message}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={step.id}
                        className={`flex flex-col max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                          isAgent 
                            ? 'bg-indigo-950/40 border border-indigo-900/40 text-indigo-200 self-start'
                            : isStore 
                              ? 'bg-purple-950/35 border border-purple-900/35 text-purple-200 self-start ml-2 pl-3 border-l-2 border-l-purple-500'
                              : 'bg-zinc-800 border border-zinc-700/50 text-zinc-300 self-end'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4 mb-1.5 border-b border-white/5 pb-1">
                          <span className="font-extrabold tracking-wide text-[10px] uppercase text-zinc-400">
                            {step.speakerName}
                          </span>
                          <span className="text-[9.5px] text-zinc-500 font-medium">
                            {step.timestamp}
                          </span>
                        </div>
                        <p className="font-medium">{step.message}</p>
                      </div>
                    );
                  })
                )}
                <div ref={chatEndRef} />
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
