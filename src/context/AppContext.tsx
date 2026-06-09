'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Coupon, MOCK_PRODUCTS, MOCK_COUPONS } from '../data/mockData';

export interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  storeName: 'Amazon' | 'Flipkart' | 'Croma';
  price: number;
  originalPrice: number;
  quantity: number;
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  
  // Negotiation Simulation State
  negotiationStep: number;
  negotiationActive: boolean;
  isCallConnected: boolean;
  selectedProductId: string;
  startCall: (productId: string) => void;
  endCall: () => void;
  advanceNegotiation: () => void;
  resetNegotiation: () => void;
  currentDealPrice: number;
  isDealLocked: boolean;
  lockDeal: () => void;
  
  // Coupon State
  activeCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [negotiationStep, setNegotiationStep] = useState(0);
  const [negotiationActive, setNegotiationActive] = useState(false);
  const [isCallConnected, setIsCallConnected] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('sony-wh1000xm5');
  const [currentDealPrice, setCurrentDealPrice] = useState(29990);
  const [isDealLocked, setIsDealLocked] = useState(false);
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);

  // Set initial deal price based on selected product
  useEffect(() => {
    const product = MOCK_PRODUCTS.find(p => p.id === selectedProductId);
    if (product) {
      const bestInitialPrice = Math.min(...product.stores.map(s => s.price));
      setCurrentDealPrice(bestInitialPrice);
    }
  }, [selectedProductId]);

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === newItem.id && item.storeName === newItem.storeName);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setActiveCoupon(null);
  };

  const startCall = (productId: string) => {
    setSelectedProductId(productId);
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    if (product) {
      const bestInitialPrice = Math.min(...product.stores.map(s => s.price));
      setCurrentDealPrice(bestInitialPrice);
    }
    setNegotiationActive(true);
    setIsCallConnected(false);
    setNegotiationStep(0);
    setIsDealLocked(false);
    
    // Simulate line connection after 1.5 seconds
    setTimeout(() => {
      setIsCallConnected(true);
      setNegotiationStep(1); // Advance to step 1 (agent greeting)
    }, 1500);
  };

  const endCall = () => {
    setNegotiationActive(false);
    setIsCallConnected(false);
    setNegotiationStep(0);
  };

  const advanceNegotiation = () => {
    setNegotiationStep(prev => {
      const nextStep = prev + 1;
      // Trigger price updates during simulation at key points
      const product = MOCK_PRODUCTS.find(p => p.id === selectedProductId);
      if (product) {
        const bestInitialPrice = Math.min(...product.stores.map(s => s.price));
        if (nextStep === 3) {
          // Scan Complete
          setCurrentDealPrice(bestInitialPrice);
        } else if (nextStep === 5) {
          // Croma counter
          const negotiatedVal = product.negotiatedPrice 
            ? product.negotiatedPrice + Math.round((bestInitialPrice - product.negotiatedPrice) * 0.5)
            : Math.round(bestInitialPrice * 0.92);
          setCurrentDealPrice(negotiatedVal);
        } else if (nextStep >= 7) {
          // Final Flipkart merchant code
          setCurrentDealPrice(product.negotiatedPrice || Math.round(bestInitialPrice * 0.85));
        }
      }
      return nextStep;
    });
  };

  const resetNegotiation = () => {
    setNegotiationStep(1);
    setIsDealLocked(false);
    const product = MOCK_PRODUCTS.find(p => p.id === selectedProductId);
    if (product) {
      const bestInitialPrice = Math.min(...product.stores.map(s => s.price));
      setCurrentDealPrice(bestInitialPrice);
    }
  };

  const lockDeal = () => {
    const product = MOCK_PRODUCTS.find(p => p.id === selectedProductId);
    if (product) {
      // Find the store we negotiated the deal with (usually Flipkart in script, let's map it)
      const bestStore = product.stores.find(s => s.storeName === 'Flipkart') || product.stores[0];
      
      addToCart({
        id: product.id,
        name: `${product.name} (Negotiated Offer)`,
        imageUrl: product.imageUrl,
        storeName: bestStore.storeName,
        price: currentDealPrice,
        originalPrice: Math.max(...product.stores.map(s => s.originalPrice))
      });
      setIsDealLocked(true);
    }
  };

  const applyCoupon = (code: string): boolean => {
    const coupon = MOCK_COUPONS.find(c => c.code.toLowerCase() === code.toLowerCase());
    if (coupon) {
      setActiveCoupon(coupon);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
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
        lockDeal,
        activeCoupon,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
