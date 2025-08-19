// src/hooks/useCart.js
import { useEffect } from "react";

import useCartStore from "../stores/cartStore";
export function useCart() {
  const cart = useCartStore();

  // Synchronisation avec le localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      useCartStore.persist.rehydrate();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return {
    cart: cart.items,
    cartTotal: cart.getTotal(),
    cartCount: cart.getItemCount(),
    addToCart: cart.addItem,
    removeFromCart: cart.removeItem,
    updateQuantity: cart.updateQuantity,
    clearCart: cart.clearCart,
  };
}
