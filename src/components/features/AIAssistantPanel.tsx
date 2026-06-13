'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, MessageSquare, Send, Sparkles, Search, Mic, MicOff, MonitorUp, Loader2, Activity, CheckCircle2, MonitorPlay } from 'lucide-react';

type ScreenShareState = 'idle' | 'waiting_permission' | 'active' | 'analyzing' | 'product_detected' | 'searching_platforms' | 'ready';

type Message = {
  id: number;
  text: string;
  sender: 'ai' | 'user' | 'tool';
  toolLogs?: string[];
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

  const handleSendMessage = (textOverride?: string) => {
    const textToSubmit = textOverride || inputValue;
    if (!textToSubmit.trim()) return;

    const newUserMsg: Message = { id: Date.now(), text: textToSubmit, sender: 'user' };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setTranscriptPreview(null);
    setIsTyping(true);

    // Simulate Tool Execution then AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: '',
          sender: 'tool',
          toolLogs: ['🔍 Searching Web for best prices...', '💰 Comparing deals on Amazon and Flipkart...', '✅ Formatting recommendations']
        }
      ]);
      
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          { 
            id: Date.now() + 2, 
            text: 'I found some excellent deals based on current market trends. Would you like me to start negotiating with the retailers?', 
            sender: 'ai' 
          }
        ]);
      }, 2000);
    }, 1000);
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
        setTranscriptPreview("Can you find a good deal on Sony WH-1000XM5 headphones?");
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
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-zinc-950 rounded-full"></span>
      </button>

      {/* Chat Panel */}
      <div 
        className={`fixed bottom-6 right-6 w-[350px] sm:w-[420px] h-[600px] max-h-[85vh] glass-panel bg-zinc-950/90 border border-brand-border rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-brand-border bg-zinc-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Bot className="w-4 h-4" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-zinc-900 rounded-full animate-pulse"></span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">DealGenie AI</h3>
              <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Ready to assist
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={screenShareState === 'idle' ? handleStartScreenShare : () => setScreenShareState('idle')}
              className={`p-1.5 rounded-md transition-colors flex items-center gap-1 text-xs font-medium ${screenShareState !== 'idle' ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'}`}
              title="Share Screen for AI Context"
            >
              {screenShareState === 'idle' ? <MonitorUp className="w-4 h-4" /> : <MonitorPlay className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Box */}
        <div className="p-3 border-b border-zinc-800/50 bg-zinc-900/30 relative" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchDropdown(true)}
              placeholder="Search products..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          {showSearchDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 mx-3 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-20 overflow-hidden">
              <div className="p-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Recent Searches</div>
              <button className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors">Sony WH-1000XM5</button>
              <button className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors">MacBook Pro M3</button>
              <div className="p-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider border-t border-zinc-800 mt-1">Suggestions</div>
              <button className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors flex items-center gap-2"><Sparkles className="w-3 h-3 text-indigo-400"/> Best gaming laptops under $1000</button>
            </div>
          )}
        </div>

        {/* Screen Share Live Preview Panel */}
        {screenShareState !== 'idle' && (
          <div className="mx-4 mt-4 p-3 bg-zinc-900/80 border border-emerald-500/30 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center overflow-hidden relative">
                {screenShareState === 'waiting_permission' ? (
                  <Loader2 className="w-5 h-5 text-zinc-500 animate-spin" />
                ) : (
                  <>
                    <MonitorPlay className="w-5 h-5 text-emerald-500" />
                    <div className="absolute inset-0 bg-emerald-500/10 animate-pulse"></div>
                  </>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">Live Screen Analysis</span>
                <span className="text-[10px] text-zinc-400">
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gradient-to-b from-transparent to-zinc-900/20">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'tool' ? (
                <div className="w-full max-w-[85%] bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-400 font-mono">
                  <div className="flex items-center gap-1.5 mb-2 text-zinc-300 font-semibold">
                    <Activity className="w-3.5 h-3.5" />
                    Tool Execution
                  </div>
                  <div className="space-y-1.5">
                    {msg.toolLogs?.map((log, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-indigo-400 mt-0.5">{'>'}</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-indigo-600 text-white rounded-br-sm' 
                      : 'bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-bl-sm shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-zinc-800 border border-zinc-700 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 w-16 shadow-sm">
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-zinc-900/80 border-t border-brand-border">
          {isRecording ? (
            <div className="flex items-center justify-between bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </div>
                <span className="text-sm font-medium text-red-400">Listening...</span>
              </div>
              <button onClick={handleToggleRecording} className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                <MicOff className="w-4 h-4" />
              </button>
            </div>
          ) : isProcessingAudio ? (
            <div className="flex items-center justify-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-4 py-3">
              <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
              <span className="text-sm font-medium text-indigo-400">Processing with Sarvam AI...</span>
            </div>
          ) : transcriptPreview !== null ? (
            <div className="bg-zinc-950 border border-indigo-500/50 rounded-xl p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Review Transcript</span>
                <button onClick={() => setTranscriptPreview(null)} className="text-zinc-500 hover:text-zinc-300">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <textarea
                value={transcriptPreview}
                onChange={(e) => setTranscriptPreview(e.target.value)}
                className="w-full bg-transparent text-sm text-white resize-none focus:outline-none px-1"
                rows={2}
              />
              <div className="flex justify-end gap-2 mt-1">
                <button onClick={() => setTranscriptPreview(null)} className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors">Cancel</button>
                <button onClick={() => handleSendMessage(transcriptPreview)} className="px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-1.5">
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
                placeholder="Ask about deals or trends..."
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-zinc-600"
              />
              <button
                type="button"
                onClick={handleToggleRecording}
                className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors flex-shrink-0"
                title="Voice Input (Sarvam AI)"
              >
                <Mic className="w-4 h-4" />
              </button>
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white transition-colors flex-shrink-0"
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
