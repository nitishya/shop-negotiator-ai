'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { Product } from '@/data/mockData';
import { Bot, ShoppingCart, Video, Sparkles, Menu, X, ArrowRight, Search, Mic, MicOff, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart, startCall } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  const [isFetchingLive, setIsFetchingLive] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const [liveSearchResults, setLiveSearchResults] = useState<Product[]>([]);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Video Negotiator', href: '/video-call' },
    { name: 'Compare Deals', href: '/compare' },
    { name: 'About', href: '/about' },
  ];

  // Debounce search query to API
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.trim().length > 1) {
        setIsFetchingLive(true);
        fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
          .then(res => res.json())
          .then(data => {
            setLiveSearchResults(data.products || []);
            setIsFetchingLive(false);
          })
          .catch(err => {
            console.error(err);
            setIsFetchingLive(false);
          });
      } else {
        setLiveSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsProcessingAudio(true);
      // Simulate Sarvam AI processing
      setTimeout(() => {
        setIsProcessingAudio(false);
        const transcript = 'Laptop';
        setSearchQuery(transcript);
        setIsSearchFocused(true);
      }, 1500);
    } else {
      setIsRecording(true);
      setIsSearchFocused(true);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      router.push(`/compare?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-slate-200 px-4 py-3 sm:px-6 md:px-8 bg-white/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary p-0.5 shadow-md shadow-brand-primary/10">
            <div className="flex items-center justify-center w-full h-full rounded-[10px] bg-slate-50">
              <Bot className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
            </div>
            <div className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="font-bold tracking-tight text-slate-900 leading-tight flex items-center gap-1.5">
              Shop Negotiator <span className="text-[10px] font-semibold bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-full border border-indigo-200 uppercase tracking-wide">Agent</span>
            </span>
            <span className="text-[10.5px] text-slate-500 tracking-wide">Autonomous Edition</span>
          </div>
        </Link>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-xl mx-auto relative hidden md:block" ref={searchContainerRef}>
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Live web search for products..."
              className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-20 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all placeholder:text-slate-400"
            />
            <div className="absolute right-2 flex items-center gap-1">
              <button
                type="button"
                onClick={handleToggleRecording}
                className={`p-1.5 rounded-lg transition-colors ${
                  isRecording ? 'bg-red-100 text-red-500' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200'
                }`}
                title="Search by Voice (Sarvam AI)"
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              {searchQuery && (
                <button type="submit" className="p-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition-colors">
                  <Search className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </form>

          {/* Search Dropdown */}
          {isSearchFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden">
              {isRecording && (
                <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border-b border-red-100">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </div>
                  <span className="text-xs font-medium text-red-500">Listening to your voice...</span>
                </div>
              )}
              {isProcessingAudio && (
                <div className="flex items-center gap-2 px-4 py-3 bg-indigo-50 border-b border-indigo-100">
                  <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                  <span className="text-xs font-medium text-indigo-600">Processing with Sarvam AI...</span>
                </div>
              )}

              <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                {searchQuery.trim() === '' && !isRecording && !isProcessingAudio ? (
                  <div className="p-4 text-center text-sm text-slate-500">
                    Try searching for &quot;Laptop&quot; or &quot;Phone&quot; to fetch live data
                  </div>
                ) : isFetchingLive ? (
                  <div className="p-4 flex flex-col items-center justify-center gap-2 text-slate-500">
                    <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
                    <span className="text-xs font-medium">Fetching live products from Web...</span>
                  </div>
                ) : liveSearchResults.length > 0 ? (
                  <div className="py-2">
                    {liveSearchResults.map(product => (
                      <Link
                        key={product.id}
                        href={`/compare?q=${encodeURIComponent(searchQuery)}`}
                        onClick={() => {
                          setIsSearchFocused(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                      >
                        <div className="w-10 h-10 rounded-lg bg-slate-100 p-1 shrink-0 flex items-center justify-center">
                          <Image src={product.imageUrl} alt={product.name} width={40} height={40} className="object-contain w-full h-full" />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-sm font-medium text-slate-900 truncate">{product.name}</span>
                          <span className="text-xs text-emerald-600 font-semibold">₹{product.stores[0].price.toLocaleString()}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : !isRecording && !isProcessingAudio && searchQuery.trim().length > 1 && (
                  <div className="p-4 text-center text-sm text-slate-500">
                    No products found for &quot;{searchQuery}&quot;
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 shrink-0">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-slate-900 ${
                  isActive ? 'text-indigo-600 font-semibold' : 'text-slate-500'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            href="/checkout"
            className="relative p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-slate-600 hover:text-slate-900"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[11px] font-bold text-white shadow-md shadow-indigo-500/20">
                {cartItemsCount}
              </span>
            )}
          </Link>

          <Link
            href="/video-call"
            onClick={() => startCall('sony-wh1000xm5')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-md shadow-indigo-500/20 active:scale-95"
          >
            <Video className="w-4 h-4" />
            <span>Live Agent</span>
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/checkout"
            className="relative p-2 rounded-lg border border-slate-200 bg-white text-slate-600"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[9px] font-bold text-white">
                {cartItemsCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-slate-900"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-slate-200 flex flex-col gap-3 pb-2 animate-in slide-in-from-top-2 duration-250">
          <div className="px-3">
             {/* Mobile Search */}
            <div className="relative flex items-center mb-2">
              <Search className="absolute left-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Live web search..."
                className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-12 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all"
              />
              <button className="absolute right-2 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200">
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`mx-3 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          <div className="px-3 py-2 border-t border-slate-200 mt-1 flex flex-col gap-3">
            <Link
              href="/checkout"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-sm text-slate-500 hover:text-slate-900"
            >
              <span>View Shopping Cart</span>
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-semibold border border-slate-200">
                {cartItemsCount} items
              </span>
            </Link>

            <Link
              href="/video-call"
              onClick={() => {
                setMobileMenuOpen(false);
                startCall('sony-wh1000xm5');
              }}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-sm font-semibold text-white shadow-md"
            >
              <Video className="w-4 h-4" />
              <span>Negotiate Live</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
