'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { Bot, ShoppingCart, Video, Sparkles, Menu, X, ArrowRight, Search, Mic, MicOff, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const { cart, startCall } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Video Negotiator', href: '/video-call' },
    { name: 'Compare Deals', href: '/compare' },
    { name: 'About', href: '/about' },
  ];

  // Search Results
  const searchResults = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 4); // Show top 4 results

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
        setSearchQuery("Sony headphones");
        setIsSearchFocused(true);
      }, 1500);
    } else {
      setIsRecording(true);
      setIsSearchFocused(true);
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-brand-border px-4 py-3 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary p-0.5 shadow-md shadow-brand-primary/10">
            <div className="flex items-center justify-center w-full h-full rounded-[10px] bg-brand-dark">
              <Bot className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="font-bold tracking-tight text-white leading-tight flex items-center gap-1.5">
              Shop Negotiator <span className="text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded-full border border-indigo-500/35 uppercase tracking-wide">Agent</span>
            </span>
            <span className="text-[10.5px] text-zinc-400 tracking-wide">Autonomous Edition</span>
          </div>
        </Link>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-xl mx-auto relative hidden md:block" ref={searchContainerRef}>
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search products, brands..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-12 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 focus:bg-zinc-950 transition-all placeholder:text-zinc-600"
            />
            <button
              onClick={handleToggleRecording}
              className={`absolute right-2 p-1.5 rounded-lg transition-colors ${
                isRecording ? 'bg-red-500/20 text-red-400' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
              title="Search by Voice (Sarvam AI)"
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>

          {/* Search Dropdown */}
          {isSearchFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden">
              {isRecording && (
                <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border-b border-red-500/20">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </div>
                  <span className="text-xs font-medium text-red-400">Listening to your voice...</span>
                </div>
              )}
              {isProcessingAudio && (
                <div className="flex items-center gap-2 px-4 py-3 bg-indigo-500/10 border-b border-indigo-500/20">
                  <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                  <span className="text-xs font-medium text-indigo-400">Processing with Sarvam AI...</span>
                </div>
              )}

              <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                {searchQuery.trim() === '' && !isRecording && !isProcessingAudio ? (
                  <div className="p-4 text-center text-sm text-zinc-500">
                    Try searching for &quot;Headphones&quot; or &quot;MacBook&quot;
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="py-2">
                    {searchResults.map(product => (
                      <Link
                        key={product.id}
                        href="/compare"
                        onClick={() => setIsSearchFocused(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800/50 transition-colors border-b border-zinc-800/50 last:border-0"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white p-1 shrink-0 flex items-center justify-center">
                          <Image src={product.imageUrl} alt={product.name} width={40} height={40} className="object-contain w-full h-full" />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-sm font-medium text-white truncate">{product.name}</span>
                          <span className="text-xs text-emerald-400 font-semibold">₹{product.stores[0].price.toLocaleString()}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : !isRecording && !isProcessingAudio && (
                  <div className="p-4 text-center text-sm text-zinc-500">
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
                className={`text-sm font-medium transition-colors hover:text-white ${
                  isActive ? 'text-indigo-400 font-semibold' : 'text-zinc-400'
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
            className="relative p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900 transition-colors text-zinc-300 hover:text-white"
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
            className="relative p-2 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-300"
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
            className="p-2 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-brand-border flex flex-col gap-3 pb-2 animate-in slide-in-from-top-2 duration-250">
          <div className="px-3">
             {/* Mobile Search */}
            <div className="relative flex items-center mb-2">
              <Search className="absolute left-3 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-12 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 focus:bg-zinc-950 transition-all"
              />
              <button className="absolute right-2 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800">
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
                  isActive ? 'bg-indigo-500/10 text-indigo-400' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          <div className="px-3 py-2 border-t border-zinc-800 mt-1 flex flex-col gap-3">
            <Link
              href="/checkout"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-sm text-zinc-400 hover:text-white"
            >
              <span>View Shopping Cart</span>
              <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-xs font-semibold">
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
