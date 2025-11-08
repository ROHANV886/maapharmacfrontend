import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ✅ Initialize from localStorage safely
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Error loading saved cart:", err);
      localStorage.removeItem("cartItems");
      return [];
    }
  });

  // ✅ Sync to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (err) {
      console.error("Error saving cart:", err);
    }
  }, [cartItems]);

  // ➕ Add item (increase quantity if exists)
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: (p.quantity || 1) + 1 }
            : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // ➖ Remove completely
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  // 🔁 Update quantity
  const updateQuantity = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(newQty, 1) } : item
      )
    );
  };

  // 🧹 Clear full cart
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom Hook for easy usage
export const useCart = () => useContext(CartContext);
