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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [negotiationStep]);

  useEffect(() => {
    if (isAutoPlay && isCallConnected && negotiationStep < NEGOTIATION_SCRIPT.length) {
      autoPlayTimerRef.current = setTimeout(() => {
        advanceNegotiation();
      }, 4000);
    } else if (negotiationStep >= NEGOTIATION_SCRIPT.length) {
      setIsAutoPlay(false);
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlay, isCallConnected, negotiationStep, advanceNegotiation]);

  useEffect(() => {
    if (!negotiationActive) {
      startCall(selectedProductId);
    }
  }, [negotiationActive, startCall, selectedProductId]);

  const visibleSteps = NEGOTIATION_SCRIPT.slice(0, negotiationStep);
  const currentStepData = NEGOTIATION_SCRIPT[negotiationStep - 1] || null;

  const originalPrice = Math.max(...activeProduct.stores.map(s => s.originalPrice));
  const currentBestStorePrice = Math.min(...activeProduct.stores.map(s => s.price));
  const savingsAmount = originalPrice - currentDealPrice;
  const savingsPercent = Math.round((savingsAmount / originalPrice) * 100);

  const getStatusBadgeColor = (status: string | undefined) => {
    switch (status) {
      case 'Connecting': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'Scanning Stores': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Scan Complete': return 'bg-cyan-50 text-cyan-600 border-cyan-200';
      case 'Negotiating (Croma)': return 'bg-indigo-50 text-indigo-600 border-indigo-200';
      case 'Counter Offer Received': return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'Negotiating (Flipkart)': return 'bg-indigo-50 text-indigo-600 border-indigo-200';
      case 'Final Price Locked': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'Completed': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      default: return 'bg-slate-100 text-slate-500 border-slate-200';
    }
  };

  return (
    <div className="flex-1 w-full bg-slate-50 min-h-[calc(100vh-64px)] grid-bg py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-indigo-600 animate-ping"></span>
              <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider">Live Bargain Room</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              Negotiation Session: <span className="text-indigo-600">{activeProduct.name}</span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium hidden md:inline">Negotiate another item:</span>
            <select
              value={selectedProductId}
              onChange={(e) => startCall(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
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
              <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-200 flex flex-col items-center justify-center shadow-sm group">
                <div className={`absolute w-36 h-36 rounded-full bg-indigo-100 blur-xl transition-all duration-1000 ${
                  isCallConnected && currentStepData?.speaker === 'agent' ? 'scale-125 bg-purple-100' : 'scale-100'
                }`} />
                
                <div className="relative flex items-center justify-center">
                  <div className={`w-24 h-24 rounded-full bg-slate-50 border flex items-center justify-center transition-all duration-300 ${
                    isCallConnected && currentStepData?.speaker === 'agent' 
                      ? 'border-indigo-400 ring-4 ring-indigo-100 scale-105' 
                      : 'border-slate-200'
                  }`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <div className="relative w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-indigo-50">
                      <Sparkles className="w-10 h-10 text-indigo-500 animate-float" />
                    </div>
                  </div>
                  
                  {isCallConnected && currentStepData?.speaker === 'agent' && (
                    <span className="absolute -inset-1 rounded-full border border-indigo-400 animate-pulse opacity-75"></span>
                  )}
                </div>

                <div className="mt-4 text-center z-10">
                  <h3 className="font-bold text-slate-900 text-sm">Negotiator Agent (Voice AI)</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {!isCallConnected ? 'Connecting server line...' : (currentStepData?.speaker === 'agent' ? 'Speaking...' : 'Listening...')}
                  </p>
                </div>

                {isCallConnected && currentStepData?.speaker === 'agent' && (
                  <div className="absolute bottom-4 flex items-end gap-1 h-6">
                    <span className="wave-bar w-1 bg-indigo-500 rounded-full h-3 animate-soundwave"></span>
                    <span className="wave-bar w-1 bg-indigo-400 rounded-full h-5 animate-soundwave"></span>
                    <span className="wave-bar w-1 bg-purple-500 rounded-full h-4 animate-soundwave"></span>
                    <span className="wave-bar w-1 bg-indigo-500 rounded-full h-6 animate-soundwave"></span>
                    <span className="wave-bar w-1 bg-purple-400 rounded-full h-3 animate-soundwave"></span>
                  </div>
                )}

                <div className="absolute top-4 left-4 bg-white/90 px-2 py-0.5 rounded text-[10px] uppercase font-extrabold text-indigo-600 border border-indigo-100 tracking-wider shadow-sm">
                  Agent Feed
                </div>
              </div>

              {/* FEED 2: User */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 flex flex-col items-center justify-center shadow-sm group">
                {videoActive ? (
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-slate-800 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-slate-700/80 border border-slate-600 flex items-center justify-center mb-3 text-slate-300">
                      User
                    </div>
                    <span className="text-xs text-slate-400 font-medium">Your camera is streaming (Mock)</span>
                    <div className="absolute bottom-4 flex items-end gap-1 h-6">
                      {micActive && isCallConnected && currentStepData?.speaker === 'user' ? (
                        <>
                          <span className="wave-bar w-1 bg-slate-400 rounded-full h-2 animate-soundwave"></span>
                          <span className="wave-bar w-1 bg-slate-300 rounded-full h-4 animate-soundwave"></span>
                          <span className="wave-bar w-1 bg-slate-400 rounded-full h-3 animate-soundwave"></span>
                        </>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-semibold">{micActive ? 'Mic Idle' : 'Muted'}</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center text-slate-500">
                    <VideoOff className="w-10 h-10 mb-2" />
                    <span className="text-xs font-semibold">Camera Off</span>
                  </div>
                )}

                <div className="absolute top-4 left-4 bg-black/50 px-2 py-0.5 rounded text-[10px] uppercase font-extrabold text-white border border-white/20 tracking-wider backdrop-blur-sm">
                  You (Customer)
                </div>
              </div>

            </div>

            {/* Video Controls Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMicActive(!micActive)}
                  className={`p-3 rounded-xl border transition-all active:scale-95 ${
                    micActive 
                      ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600' 
                      : 'bg-red-50 hover:bg-red-100 border-red-200 text-red-500'
                  }`}
                  title={micActive ? 'Mute Mic' : 'Unmute Mic'}
                >
                  {micActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => setVideoActive(!videoActive)}
                  className={`p-3 rounded-xl border transition-all active:scale-95 ${
                    videoActive 
                      ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600' 
                      : 'bg-red-50 hover:bg-red-100 border-red-200 text-red-500'
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
                  className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-700 transition-colors active:scale-95"
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
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-sm font-semibold text-white transition-colors shadow-sm shadow-red-500/20 active:scale-95"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span className="hidden sm:inline">End Session</span>
                </button>
              </div>
            </div>

            {/* Bottom Deal Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-2xl pointer-events-none" />
              
              <h3 className="text-sm font-bold text-slate-600 mb-4 flex items-center gap-1.5 uppercase tracking-wide">
                <TrendingDown className="w-4 h-4 text-emerald-500" /> Live Deal Dashboard
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                
                {/* original retail price */}
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">Standard Retail Price</span>
                  <span className="text-xl font-bold text-slate-400 line-through mt-0.5">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1">
                    (Best store price: ₹{currentBestStorePrice.toLocaleString()})
                  </span>
                </div>

                {/* Negotiated Price */}
                <div className="flex flex-col bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Live Negotiated Price
                  </span>
                  <span className="text-2xl font-extrabold text-emerald-600 mt-0.5 glow-text-emerald">
                    ₹{currentDealPrice.toLocaleString()}
                  </span>
                  <span className="text-[10.5px] text-emerald-700 font-semibold mt-0.5">
                    You save ₹{savingsAmount.toLocaleString()} ({savingsPercent}% off)
                  </span>
                </div>

                {/* Deal Action */}
                <div className="flex flex-col gap-2">
                  <button
                    disabled={negotiationStep < 8 || isDealLocked}
                    onClick={lockDeal}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-sm ${
                      isDealLocked
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-600 cursor-default'
                        : negotiationStep >= 8
                          ? 'bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer shadow-emerald-500/20'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
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
                      className="text-[11px] text-indigo-600 hover:text-indigo-700 font-semibold text-center hover:underline flex items-center justify-center gap-1"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                  {negotiationStep < 8 && (
                    <span className="text-[10.5px] text-slate-500 text-center flex items-center justify-center gap-1">
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
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-indigo-500" /> Script Controller
              </h3>

              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
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
                        ? 'bg-purple-500 hover:bg-purple-600 border-purple-600 text-white shadow-sm shadow-purple-500/20'
                        : negotiationStep >= NEGOTIATION_SCRIPT.length
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {isAutoPlay ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Pause Auto</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-purple-500" />
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
                        ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/20'
                    }`}
                  >
                    <span>Next Agent Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold px-1">
                  <span>Progress: {negotiationStep} of {NEGOTIATION_SCRIPT.length} events</span>
                  <button
                    onClick={resetNegotiation}
                    className="hover:text-indigo-600 flex items-center gap-0.5 hover:underline"
                  >
                    <RefreshCw className="w-3 h-3" /> Restart Script
                  </button>
                </div>
              </div>
            </div>

            {/* Conversation Log window */}
            <div className="bg-white rounded-2xl border border-slate-200 flex flex-col h-[350px] sm:h-[430px] shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-indigo-500" />
                  <h3 className="text-sm font-bold text-slate-900">Live Conversation Log</h3>
                </div>
                <span className="text-[10px] text-slate-500 font-extrabold tracking-wide uppercase px-2 py-0.5 rounded bg-white border border-slate-200">
                  Realtime API Transcript
                </span>
              </div>

              {/* Chat Scroll Container */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar flex flex-col bg-slate-50">
                {visibleSteps.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-500">
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
                          <span className="text-[10.5px] bg-white border border-slate-200 px-3 py-1 rounded-lg text-slate-500 font-semibold max-w-[90%] break-words shadow-sm">
                            {step.message}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={step.id}
                        className={`flex flex-col max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                          isAgent 
                            ? 'bg-indigo-50 border border-indigo-100 text-indigo-900 self-start'
                            : isStore 
                              ? 'bg-purple-50 border border-purple-100 text-purple-900 self-start ml-2 pl-3 border-l-2 border-l-purple-500'
                              : 'bg-white border border-slate-200 text-slate-700 self-end'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4 mb-1.5 border-b border-slate-200/50 pb-1">
                          <span className="font-extrabold tracking-wide text-[10px] uppercase text-slate-500">
                            {step.speakerName}
                          </span>
                          <span className="text-[9.5px] text-slate-400 font-medium">
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
