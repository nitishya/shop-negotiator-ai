'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, MessageSquare, Send, Sparkles, Search, Mic, MicOff, MonitorUp, Loader2, Activity, CheckCircle2, MonitorPlay } from 'lucide-react';
import ProductRecommendationCard from './ProductRecommendationCard';
import { Product } from '@/data/mockData';

type ScreenShareState = 'idle' | 'waiting_permission' | 'active' | 'analyzing' | 'product_detected' | 'searching_platforms' | 'ready';

type Message = {
  id: number;
  text: string;
  sender: 'ai' | 'user' | 'tool';
  toolLogs?: string[];
  liveProduct?: Product;
};

export default function AIAssistantPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hi! I am your AI Shopping Negotiator. How can I help you find the best deal today?', sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Search Box State
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Speech-to-Text State
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  const [transcriptPreview, setTranscriptPreview] = useState<string | null>(null);

  // Screen Sharing State
  const [screenShareState, setScreenShareState] = useState<ScreenShareState>('idle');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, screenShareState, transcriptPreview]);

  // Handle outside click for search dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSendMessage = async (textOverride?: string) => {
    const textToSubmit = textOverride || inputValue;
    if (!textToSubmit.trim()) return;

    const queryTerm = textToSubmit.split(' ').pop() || 'laptop'; // simple keyword extraction

    const newUserMsg: Message = { id: Date.now(), text: textToSubmit, sender: 'user' };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setTranscriptPreview(null);
    setIsTyping(true);

    // Initial tool log
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + 1,
        text: '',
        sender: 'tool',
        toolLogs: [`🔍 Searching Web for "${queryTerm}"...`]
      }
    ]);

    try {
      // Fetch Live data!
      const res = await fetch(`/api/search?q=${encodeURIComponent(queryTerm)}`);
      const data = await res.json();
      const product = data.products?.[0];

      setMessages(prev => {
        const newMessages = [...prev];
        const lastToolMsg = newMessages[newMessages.length - 1];
        if (lastToolMsg.sender === 'tool' && lastToolMsg.toolLogs) {
          lastToolMsg.toolLogs.push(`💰 Found live pricing for ${product?.name || queryTerm}`);
          lastToolMsg.toolLogs.push('✅ Formatting recommendations');
        }
        return newMessages;
      });

      setTimeout(() => {
        setIsTyping(false);
        if (product) {
          setMessages(prev => [
            ...prev,
            { 
              id: Date.now() + 2, 
              text: `I found an excellent live deal on the ${product.name} based on current web results. Should we start negotiating?`, 
              sender: 'ai',
              liveProduct: product
            }
          ]);
        } else {
          setMessages(prev => [
            ...prev,
            { 
              id: Date.now() + 2, 
              text: `I couldn't find any live web results for "${queryTerm}". Could you try another product?`, 
              sender: 'ai' 
            }
          ]);
        }
      }, 1000);

    } catch (error) {
      console.error(error);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 2, text: 'Sorry, I encountered an error searching the web.', sender: 'ai' }
      ]);
    }
  };

  // Screen Sharing Logic
  const handleStartScreenShare = () => {
    setScreenShareState('waiting_permission');
    
    // Simulate flow
    setTimeout(() => setScreenShareState('active'), 2000);
    setTimeout(() => setScreenShareState('analyzing'), 4000);
    setTimeout(() => setScreenShareState('product_detected'), 6000);
    setTimeout(() => setScreenShareState('searching_platforms'), 8000);
    setTimeout(() => setScreenShareState('ready'), 10000);
  };

  // Speech-to-Text Logic
  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsProcessingAudio(true);
      // Simulate Sarvam AI processing
      setTimeout(() => {
        setIsProcessingAudio(false);
        setTranscriptPreview("Can you find a good deal on a MacBook?");
      }, 2000);
    } else {
      setIsRecording(true);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-lg shadow-indigo-600/30 transition-all duration-300 z-50 flex items-center justify-center hover:scale-110 active:scale-95 ${isOpen ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 scale-100'}`}
        aria-label="Open AI Assistant"
      >
        <Bot className="w-6 h-6" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
      </button>

      {/* Chat Panel */}
      <div 
        className={`fixed bottom-6 right-6 w-[350px] sm:w-[420px] h-[600px] max-h-[85vh] glass-panel bg-white/95 border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <Bot className="w-4 h-4" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-white rounded-full animate-pulse"></span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-tight">DealGenie AI</h3>
              <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Ready to assist
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={screenShareState === 'idle' ? handleStartScreenShare : () => setScreenShareState('idle')}
              className={`p-1.5 rounded-md transition-colors flex items-center gap-1 text-xs font-medium ${screenShareState !== 'idle' ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200' : 'hover:bg-slate-200 text-slate-500 hover:text-slate-900'}`}
              title="Share Screen for AI Context"
            >
              {screenShareState === 'idle' ? <MonitorUp className="w-4 h-4" /> : <MonitorPlay className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-md hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Box */}
        <div className="p-3 border-b border-slate-200 bg-slate-50 relative" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchDropdown(true)}
              placeholder="Search chat history or commands..."
              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-400 transition-colors"
            />
          </div>
          {showSearchDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 mx-3 bg-white border border-slate-200 rounded-lg shadow-xl z-20 overflow-hidden">
              <div className="p-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Suggested Actions</div>
              <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2"><Sparkles className="w-3 h-3 text-indigo-500"/> Find cheap laptops</button>
              <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2"><Sparkles className="w-3 h-3 text-indigo-500"/> Track Sony headphones price</button>
            </div>
          )}
        </div>

        {/* Screen Share Live Preview Panel */}
        {screenShareState !== 'idle' && (
          <div className="mx-4 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-emerald-100 flex items-center justify-center overflow-hidden relative shadow-sm">
                {screenShareState === 'waiting_permission' ? (
                  <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
                ) : (
                  <>
                    <MonitorPlay className="w-5 h-5 text-emerald-500" />
                    <div className="absolute inset-0 bg-emerald-100 animate-pulse"></div>
                  </>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">Live Screen Analysis</span>
                <span className="text-[10px] text-slate-500">
                  {screenShareState === 'waiting_permission' && 'Waiting for browser permission...'}
                  {screenShareState === 'active' && 'Screen sharing active. Ready.'}
                  {screenShareState === 'analyzing' && 'Analyzing page content...'}
                  {screenShareState === 'product_detected' && 'Product detected: Sony Headphones'}
                  {screenShareState === 'searching_platforms' && 'Searching Amazon, Flipkart...'}
                  {screenShareState === 'ready' && 'Recommendation ready!'}
                </span>
              </div>
            </div>
            {['analyzing', 'searching_platforms'].includes(screenShareState) && (
               <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
            )}
            {['product_detected', 'ready'].includes(screenShareState) && (
               <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            )}
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'tool' ? (
                <div className="w-full max-w-[85%] bg-slate-100 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 font-mono shadow-sm">
                  <div className="flex items-center gap-1.5 mb-2 text-slate-700 font-semibold">
                    <Activity className="w-3.5 h-3.5 text-indigo-500" />
                    Tool Execution
                  </div>
                  <div className="space-y-1.5">
                    {msg.toolLogs?.map((log, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-indigo-500 mt-0.5">{'>'}</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2 max-w-[85%]">
                  <div 
                    className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-indigo-600 text-white rounded-br-sm shadow-md' 
                        : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.liveProduct && (
                    <div className="mt-1 w-[280px]">
                      <ProductRecommendationCard product={msg.liveProduct} />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 w-16 shadow-sm">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-slate-200">
          {isRecording ? (
            <div className="flex items-center justify-between bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </div>
                <span className="text-sm font-medium text-red-500">Listening...</span>
              </div>
              <button onClick={handleToggleRecording} className="p-1.5 rounded-lg bg-red-100 text-red-500 hover:bg-red-200 transition-colors">
                <MicOff className="w-4 h-4" />
              </button>
            </div>
          ) : isProcessingAudio ? (
            <div className="flex items-center justify-center gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3">
              <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
              <span className="text-sm font-medium text-indigo-600">Processing with Sarvam AI...</span>
            </div>
          ) : transcriptPreview !== null ? (
            <div className="bg-white border border-indigo-200 rounded-xl p-3 flex flex-col gap-2 shadow-sm">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">Review Transcript</span>
                <button onClick={() => setTranscriptPreview(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <textarea
                value={transcriptPreview}
                onChange={(e) => setTranscriptPreview(e.target.value)}
                className="w-full bg-slate-50 rounded-lg text-sm text-slate-700 resize-none focus:outline-none focus:ring-1 focus:ring-indigo-300 p-2 border border-slate-200"
                rows={2}
              />
              <div className="flex justify-end gap-2 mt-1">
                <button onClick={() => setTranscriptPreview(null)} className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">Cancel</button>
                <button onClick={() => handleSendMessage(transcriptPreview)} className="px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm">
                  <Send className="w-3 h-3" /> Send
                </button>
              </div>
            </div>
          ) : (
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about live deals..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors placeholder:text-slate-400 shadow-sm"
              />
              <button
                type="button"
                onClick={handleToggleRecording}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors flex-shrink-0 border border-slate-200"
                title="Voice Input (Sarvam AI)"
              >
                <Mic className="w-4 h-4" />
              </button>
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 disabled:text-slate-400 text-white transition-colors flex-shrink-0 shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
