'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import productsData from '@/data/products.json';

export interface Product {
  id: string;
  slug: string;
  name: string;
  family: string;
  tagline: string;
  gender: string;
  timeOfDay: string;
  price: number;
  price100ml: number;
  engravedPrice: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  moodLine: string;
  shortDescription: string;
  description: string;
  concentration: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  meters: {
    longevity: number;
    longevityLabel: string;
    sillage: string;
    sillagePercent: number;
  };
  images: {
    primary: string;
    secondary: string;
    macro: string;
  };
  layeringWith?: {
    name: string;
    slug: string;
    effect: string;
  };
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  size: '50ml' | '100ml' | 'Engraved (100ml)';
  engravedText?: string;
  engravedFont?: string;
  price: number;
  quantity: number;
}

interface StoreContextType {
  // Brand name configurable
  brandName: string;
  setBrandName: (name: string) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (
    product: Product,
    size?: '50ml' | '100ml' | 'Engraved (100ml)',
    engravedText?: string,
    engravedFont?: string,
    quantity?: number
  ) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  cartCount: number;
  subtotal: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  amountToFreeShipping: number;
  appliedPromo: string | null;
  applyPromoCode: (code: string) => boolean;
  discountAmount: number;
  finalTotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Quick View
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Dark Mode
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [brandName, setBrandName] = useState<string>('AURA');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Load saved state from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('aura_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('aura_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedTheme = localStorage.getItem('aura_theme');
      if (savedTheme === 'dark') {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      }
    } catch {
      // LocalStorage unavailable
    }
  }, []);

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem('aura_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('aura_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('aura_theme', 'light');
      }
      return next;
    });
  };

  const addToCart = (
    product: Product,
    size: '50ml' | '100ml' | 'Engraved (100ml)' = '50ml',
    engravedText = '',
    engravedFont = 'Classic Serif',
    quantity = 1
  ) => {
    let unitPrice = product.price;
    if (size === '100ml') unitPrice = product.price100ml;
    if (size === 'Engraved (100ml)') unitPrice = product.engravedPrice;

    const cartItemId = `${product.id}-${size}-${engravedText ? engravedText.trim() : 'standard'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          product,
          size,
          engravedText: engravedText ? engravedText.trim() : undefined,
          engravedFont,
          price: unitPrice,
          quantity,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FESTIVE15' || clean === 'AURA15' || clean === 'LUMEN15') {
      setAppliedPromo(clean);
      return true;
    }
    return false;
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 599;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const discountAmount = appliedPromo ? Math.round(subtotal * 0.15) : 0;
  const finalTotal = subtotal - discountAmount;

  return (
    <StoreContext.Provider
      value={{
        brandName,
        setBrandName,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        cartCount,
        subtotal,
        freeShippingThreshold,
        freeShippingProgress,
        amountToFreeShipping,
        appliedPromo,
        applyPromoCode,
        discountAmount,
        finalTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        quickViewProduct,
        setQuickViewProduct,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
