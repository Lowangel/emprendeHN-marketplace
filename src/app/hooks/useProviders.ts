import { useState, useEffect } from 'react';
import { initialProviders, type Provider } from '../data/mockData';

const STORAGE_KEY = 'emprendehn_providers';

// Función para inicializar proveedores desde localStorage
const initializeProviders = (): Provider[] => {
  if (typeof window === 'undefined') return initialProviders;
  
  const savedProviders = localStorage.getItem(STORAGE_KEY);
  
  if (savedProviders) {
    return JSON.parse(savedProviders);
  } else {
    // Primera vez: guardamos los proveedores iniciales
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProviders));
    return initialProviders;
  }
};

export function useProviders() {
  const [providers, setProviders] = useState<Provider[]>(initializeProviders());

  // Escuchar cambios en localStorage desde otras pestañas/ventanas
  useEffect(() => {
    const handleStorageChange = () => {
      const savedProviders = localStorage.getItem(STORAGE_KEY);
      if (savedProviders) {
        setProviders(JSON.parse(savedProviders));
      }
    };

    // Escuchar cambios en storage desde otras ventanas
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Función para guardar en localStorage
  const saveToLocalStorage = (updatedProviders: Provider[]) => {
    setProviders(updatedProviders);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProviders));
  };

  // Agregar nuevo proveedor
  const addProvider = (newProvider: Omit<Provider, 'id'>) => {
    const providerWithId: Provider = {
      ...newProvider,
      id: Date.now().toString(), // ID simple y único
    };
    const updated = [...providers, providerWithId];
    saveToLocalStorage(updated);
    return providerWithId;
  };

  // Editar proveedor
  const updateProvider = (id: string, updates: Partial<Provider>) => {
    const updated = providers.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    );
    saveToLocalStorage(updated);
  };

  // Eliminar proveedor
  const deleteProvider = (id: string) => {
    const updated = providers.filter((p) => p.id !== id);
    saveToLocalStorage(updated);
  };

  // Resetear a datos iniciales (útil para pruebas)
  const resetToInitial = () => {
    saveToLocalStorage(initialProviders);
  };

  return {
    providers,
    addProvider,
    updateProvider,
    deleteProvider,
    resetToInitial,
  };
}