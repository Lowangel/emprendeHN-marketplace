import { useState, useEffect } from 'react';
import { type Order } from '../data/mockData';

const STORAGE_KEY = 'emprendehn_orders';

// Función para inicializar pedidos desde localStorage
const initializeOrders = (): Order[] => {
  if (typeof window === 'undefined') return [];

  const savedOrders = localStorage.getItem(STORAGE_KEY);

  if (savedOrders) {
    return JSON.parse(savedOrders);
  } else {
    // Primera vez: array vacío
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
};

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(initializeOrders());

  // Escuchar cambios en localStorage desde otras pestañas/ventanas
  useEffect(() => {
    const handleStorageChange = () => {
      const savedOrders = localStorage.getItem(STORAGE_KEY);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    };

    // Escuchar cambios en storage desde otras ventanas
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Función para guardar en localStorage
  const saveToLocalStorage = (updatedOrders: Order[]) => {
    setOrders(updatedOrders);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
  };

  // Agregar nuevo pedido
  const addOrder = (newOrder: Omit<Order, 'id' | 'date'>) => {
    const orderWithId: Order = {
      ...newOrder,
      id: `ORDER-${Date.now()}`, // ID único
      date: new Date().toISOString().split('T')[0], // Fecha actual YYYY-MM-DD
    };
    const updated = [...orders, orderWithId];
    saveToLocalStorage(updated);
    return orderWithId;
  };

  // Actualizar estado del pedido
  const updateOrderStatus = (id: string, status: Order['status']) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status } : o
    );
    saveToLocalStorage(updated);
  };

  // Eliminar pedido
  const deleteOrder = (id: string) => {
    const updated = orders.filter((o) => o.id !== id);
    saveToLocalStorage(updated);
  };

  return {
    orders,
    addOrder,
    updateOrderStatus,
    deleteOrder,
  };
}