'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { MOCK_COUPONS } from '@/data/mockData';
import { 
  Trash2, 
  Tag, 
  Check, 
  AlertCircle, 
  ShoppingBag, 
  ArrowRight,
  TrendingDown,
  Sparkles,
  PartyPopper,
  X,
  CreditCard,
  ExternalLink
} from 'lucide-react';

export default function CheckoutPage() {
  const { cart, removeFromCart, activeCoupon, applyCoupon, removeCoupon, clearCart } = useApp();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(false);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess(false);

    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    const success = applyCoupon(couponCode);
    if (success) {
      setCouponSuccess(true);
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code. Try NEGOTIATOR15 or HACKATHON20.');
    }
  };

  const handleQuickApply = (code: string) => {
    setCouponError('');
    setCouponSuccess(false);
    const success = applyCoupon(code);
    if (success) {
      setCouponSuccess(true);
    }
  };

  // Math calculations
  const originalRetailTotal = cart.reduce((acc, item) => acc + (item.originalPrice * item.quantity), 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const negotiatorSavings = originalRetailTotal - cartSubtotal;
  
  // Service fee is 1.5% of negotiated subtotal (adds realism)
  const baseServiceFee = Math.round(cartSubtotal * 0.015);
  
  // Coupon deduction
  let couponDiscount = 0;
  if (activeCoupon) {
    if (activeCoupon.discountType === 'percentage') {
      // Coupon applies to the service fee (typical for agent apps) or product total?
      // Let's make it apply as a flat discount to the product total or the service fee.
      // If NEGOTIATOR15, 15% off the service fee. If others, fixed deduction on product total.
      if (activeCoupon.code === 'NEGOTIATOR15') {
        couponDiscount = Math.round(baseServiceFee * (activeCoupon.value / 100));
      } else {
        couponDiscount = activeCoupon.value;
      }
    } else {
      couponDiscount = Math.min(activeCoupon.value, cartSubtotal);
    }
  }

  const serviceFee = Math.max(0, baseServiceFee - (activeCoupon?.code === 'NEGOTIATOR15' ? couponDiscount : 0));
  const finalCouponProductDiscount = activeCoupon?.code !== 'NEGOTIATOR15' ? couponDiscount : 0;
  
  const finalPrice = Math.max(0, cartSubtotal - finalCouponProductDiscount + serviceFee);
  const totalSavedValue = originalRetailTotal - finalPrice;

  const handleCheckoutSubmit = () => {
    setIsCheckoutSuccess(true);
  };

  const handleModalClose = () => {
    setIsCheckoutSuccess(false);
    clearCart();
  };

  // Empty State Render
  if (cart.length === 0) {
    return (
      <div className="flex-1 w-full bg-zinc-950 min-h-[calc(100vh-64px)] grid-bg py-16 px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center text-center">
        <div className="max-w-md glass-panel border border-brand-border rounded-2xl p-8 flex flex-col items-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-brand-primary to-brand-secondary" />
          
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 text-zinc-500">
            <ShoppingBag className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-extrabold text-white mb-2">Your Cart is Empty</h1>
          <p className="text-zinc-400 text-sm leading-relaxed mb-8">
            You haven't locked in any negotiated deals yet. Start a session with our Voice AI negotiator to get exclusive discounts!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link
              href="/video-call"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-xs font-bold text-white shadow-md shadow-indigo-500/10 active:scale-95 transition-all"
            >
              <span>Negotiate a Deal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/compare"
              className="flex-1 py-3 px-4 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900 text-xs font-bold text-zinc-300 hover:text-white transition-colors active:scale-95"
            >
              <span>Compare Store Prices</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full bg-zinc-950 min-h-[calc(100vh-64px)] grid-bg py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Title bar */}
        <div className="border-b border-brand-border pb-4">
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            Secure Checkout
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Review your locked pricing contract, apply platform coupons, and finalize your purchase.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
              Selected Item Summary ({cart.length})
            </h2>

            <div className="space-y-4">
              {cart.map((item) => {
                const itemSavings = item.originalPrice - item.price;
                return (
                  <div 
                    key={item.id}
                    className="glass-panel rounded-2xl border border-brand-border p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shadow-md group relative overflow-hidden"
                  >
                    {/* Glowing highlight for negotiated items */}
                    {item.name.includes('Negotiated') && (
                      <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-brand-primary to-brand-secondary" />
                    )}

                    <div className="flex gap-4 items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover border border-zinc-800 bg-zinc-900"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase tracking-wider">
                            {item.storeName}
                          </span>
                          {item.name.includes('Negotiated') && (
                            <span className="bg-emerald-500/10 border border-emerald-500/35 text-[9px] text-emerald-400 font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-0.5">
                              <Sparkles className="w-2.5 h-2.5 fill-emerald-400" /> AI Lock
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-white text-sm sm:text-base mt-1.5">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-zinc-500">Qty: {item.quantity}</span>
                          <span className="text-[10px] text-zinc-500">•</span>
                          <span className="text-xs text-zinc-500">Retail price: ₹{item.originalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-900">
                      <div className="text-left sm:text-right">
                        <span className="text-base font-extrabold text-white">
                          ₹{item.price.toLocaleString()}
                        </span>
                        {itemSavings > 0 && (
                          <span className="text-xs text-emerald-400 font-semibold block mt-0.5">
                            You save ₹{itemSavings.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 rounded-lg border border-zinc-900 bg-zinc-900/60 hover:bg-zinc-900 hover:border-zinc-800 text-zinc-500 hover:text-red-400 transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Pricing Breakdown & Coupon Form */}
          <div className="flex flex-col gap-6">
            
            {/* Coupon Section */}
            <div className="glass-panel rounded-2xl border border-brand-border p-5 shadow-lg">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-1.5 uppercase tracking-wide">
                <Tag className="w-4 h-4 text-indigo-400" /> Apply Coupon Code
              </h3>

              <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-grow bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors active:scale-95"
                >
                  Apply
                </button>
              </form>

              {/* Feedback messages */}
              {couponError && (
                <div className="flex items-center gap-1.5 text-xs text-red-400 font-semibold mb-4 bg-red-500/5 p-2 rounded-lg border border-red-500/10">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{couponError}</span>
                </div>
              )}

              {couponSuccess && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-4 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10 animate-in fade-in duration-200">
                  <Check className="w-3.5 h-3.5" />
                  <span>Coupon successfully applied!</span>
                </div>
              )}

              {activeCoupon ? (
                <div className="bg-indigo-500/5 border border-indigo-500/20 p-3 rounded-xl flex items-center justify-between text-xs mb-3">
                  <div className="flex flex-col">
                    <span className="font-extrabold text-indigo-400 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Code: {activeCoupon.code}
                    </span>
                    <span className="text-[10.5px] text-zinc-400 mt-0.5">{activeCoupon.description}</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* Quick selection suggestions */
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-zinc-500 block">Available Negotiator Coupons:</span>
                  <div className="flex flex-wrap gap-2">
                    {MOCK_COUPONS.map((coupon) => (
                      <button
                        key={coupon.code}
                        onClick={() => handleQuickApply(coupon.code)}
                        className="text-[10.5px] font-bold border border-zinc-800 hover:border-indigo-500/40 bg-zinc-900/60 hover:bg-indigo-500/5 px-2.5 py-1.5 rounded-lg text-zinc-400 hover:text-indigo-400 transition-all active:scale-95"
                      >
                        {coupon.code}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pricing Summary Card */}
            <div className="glass-panel rounded-2xl border border-brand-border p-6 shadow-xl relative overflow-hidden flex flex-col bg-gradient-to-b from-zinc-900/40 to-zinc-900/80">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-1.5 uppercase tracking-wide">
                <CreditCard className="w-4 h-4 text-indigo-400" /> Billing Summary
              </h3>

              {/* Price Table Details */}
              <div className="space-y-3 pb-4 border-b border-zinc-900/80 text-xs sm:text-sm">
                
                <div className="flex justify-between text-zinc-400 font-medium">
                  <span>Standard Retail Total:</span>
                  <span className="line-through text-zinc-500 font-semibold">₹{originalRetailTotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-zinc-400 font-medium">
                  <span>Negotiated Cart Price:</span>
                  <span className="text-white font-bold">₹{cartSubtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span className="flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" /> AI Negotiated Savings:
                  </span>
                  <span>-₹{negotiatorSavings.toLocaleString()}</span>
                </div>

                {activeCoupon && (
                  <div className="flex justify-between text-indigo-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" /> Coupon Discount ({activeCoupon.code}):
                    </span>
                    <span>-₹{couponDiscount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-400 font-medium">
                  <span>AI Agent Service Fee:</span>
                  {serviceFee === 0 ? (
                    <span className="text-emerald-400 font-bold uppercase text-[10.5px]">Free</span>
                  ) : (
                    <span>₹{serviceFee.toLocaleString()}</span>
                  )}
                </div>

              </div>

              {/* Total Saved Badge */}
              <div className="my-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 fill-emerald-400" /> Total Net Savings:</span>
                <span>₹{totalSavedValue.toLocaleString()} ({Math.round((totalSavedValue / originalRetailTotal) * 100)}% off)</span>
              </div>

              {/* Final Price */}
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-500 block">Final Checkout Price</span>
                  <span className="text-2xl font-extrabold text-white tracking-tight glow-text-indigo">
                    ₹{finalPrice.toLocaleString()}
                  </span>
                </div>
                <span className="text-[10.5px] text-zinc-400 font-semibold mb-1">
                  Tax & delivery included
                </span>
              </div>

              {/* Purchase Button */}
              <button
                onClick={handleCheckoutSubmit}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-sm font-bold text-white shadow-lg shadow-indigo-500/15 hover:opacity-95 transition-opacity active:scale-95 duration-200"
              >
                <span>Complete Checkout</span>
                <ArrowRight className="w-4 h-4 text-indigo-200" />
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Success Modal */}
      {isCheckoutSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative max-w-md w-full glass-panel border border-brand-border rounded-2xl p-8 shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            
            {/* Header glow */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-emerald-400 to-indigo-500" />

            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/35 flex items-center justify-center text-emerald-400 mb-6 animate-pulse-glow">
              <PartyPopper className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-black text-white mb-2">Order Confirmed!</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Your mock payment has been processed successfully. Custom vendor clearance codes have been injected into merchant databases.
            </p>

            {/* Savings dashboard */}
            <div className="w-full bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-4 mb-6">
              <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wide block mb-1">AI Shopping Negotiator Impact</span>
              <div className="flex justify-between items-center text-sm font-semibold border-b border-zinc-800/80 pb-2">
                <span className="text-zinc-400">Total Savings:</span>
                <span className="text-emerald-400 font-extrabold text-base">₹{totalSavedValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold pt-2 text-zinc-400">
                <span>Total Paid:</span>
                <span className="text-white font-bold">₹{finalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleModalClose}
              className="w-full py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all active:scale-95 font-bold text-xs"
            >
              Back to Catalog
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
