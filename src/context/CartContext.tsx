import React, { createContext, useContext, useState } from "react";
import { CartItem, ProductWithExpandedPrice } from "../features/register/models";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: ProductWithExpandedPrice, quantity: number, size?: string, type?: string) => void;
  removeFromCart: (cartItem: CartItem) => void;
  emptyCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: ProductWithExpandedPrice, quantity: number, size?: string, type?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.selectedSize === size && item.selectedType === type);
      if (existing) {
        return prev.map((item) => item.id === existing.id ? { ...item, quantity: item.quantity + quantity } : item);
      } else {
        return [...prev, { ...product, quantity: quantity, selectedSize: size, selectedType: type }];
      }
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCart((prev) => prev.filter((item) => !(item.id === cartItem.id && item.selectedSize === cartItem.selectedSize && item.selectedType === cartItem.selectedType)));
  };

  const emptyCart = () => {
    setCart([]);
  }

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, emptyCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
