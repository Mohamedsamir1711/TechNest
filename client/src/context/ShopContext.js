import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products } from '../data/catalog';

const ShopContext = createContext(null);

const load = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

export const ShopProvider = ({ children }) => {
 
  
  const [cart, setCart] = useState(() => load('tn_cart'));
  const [wishlist, setWishlist] = useState(() => load('tn_wishlist'));

  useEffect(() => localStorage.setItem('tn_cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('tn_wishlist', JSON.stringify(wishlist)), [wishlist]);

  const value = useMemo(() => {
    const addToCart = (id, qty = 1) =>
      setCart((c) => {
        const found = c.find((i) => i.id === id);
        return found ? c.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i)) : [...c, { id, qty }];
      });
    const updateQty = (id, qty) =>
      setCart((c) => (qty <= 0 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty } : i))));
    const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id));
    const toggleWishlist = (id) =>
      setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
    const inWishlist = (id) => wishlist.includes(id);

    const cartItems = cart
      .map((i) => ({ ...i, product: products.find((p) => p.id === i.id) }))
      .filter((i) => i.product);
    const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
    const cartTotal = cartItems.reduce((s, i) => s + i.qty * i.product.price, 0);

    return { cart, cartItems, cartCount, cartTotal, wishlist, addToCart, updateQty, removeFromCart, toggleWishlist, inWishlist };
  }, [cart, wishlist]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => useContext(ShopContext);

