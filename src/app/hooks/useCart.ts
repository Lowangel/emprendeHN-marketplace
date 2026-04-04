import { useState, useEffect } from 'react';
import { type Product } from '../data/mockData';

export interface CartItem {
  product: Product;
  quantity: number;
}

const STORAGE_KEY = 'emprendehn_cart';

// Función para inicializar carrito desde localStorage
const initializeCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];

  const savedCart = localStorage.getItem(STORAGE_KEY);

  if (savedCart) {
    return JSON.parse(savedCart);
  } else {
    // Primera vez: array vacío
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
};

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initializeCart());

  // Escuchar cambios en localStorage desde otras pestañas/ventanas
  useEffect(() => {
    const handleStorageChange = () => {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    };

    // Escuchar cambios en storage desde otras ventanas
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Función para guardar en localStorage
  const saveToLocalStorage = (updatedCart: CartItem[]) => {
    setCartItems(updatedCart);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCart));
  };

  // Agregar producto al carrito
  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.product.id === product.id);
      let updatedItems;

      if (existingItem) {
        updatedItems = items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedItems = [...items, { product, quantity }];
      }

      saveToLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  // Actualizar cantidad
  const updateQuantity = (productId: string, newQuantity: number) => {
    setCartItems((items) => {
      const updatedItems = items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, Math.min(item.product.stock, newQuantity)) }
          : item
      );
      saveToLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  // Remover item del carrito
  const removeFromCart = (productId: string) => {
    setCartItems((items) => {
      const updatedItems = items.filter((item) => item.product.id !== productId);
      saveToLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  // Limpiar carrito
  const clearCart = () => {
    const updatedItems: CartItem[] = [];
    saveToLocalStorage(updatedItems);
    setCartItems(updatedItems);
  };

  // Calcular totales
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 50 : 0;
  const total = subtotal + shipping;

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    shipping,
    total,
  };
}