'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { Bot, ShoppingCart, Video, Sparkles, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { cart, startCall } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Video Negotiator', href: '/video-call' },
    { name: 'Compare Deals', href: '/compare' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-brand-border px-4 py-3 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary p-0.5 shadow-md shadow-brand-primary/10">
            <div className="flex items-center justify-center w-full h-full rounded-[10px] bg-brand-dark">
              <Bot className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-white leading-tight flex items-center gap-1.5">
              Shop Negotiator <span className="text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded-full border border-indigo-500/35 uppercase tracking-wide">Agent</span>
            </span>
            <span className="text-[10.5px] text-zinc-400 tracking-wide">Hackathon Edition</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
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
        <div className="hidden md:flex items-center gap-4">
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
            <span>Negotiate Live</span>
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
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
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
