import { useState, useEffect } from 'react';
import { initialProducts, type Product } from '../data/mockData';

const STORAGE_KEY = 'emprendehn_products';

// Función para inicializar productos desde localStorage
const initializeProducts = (): Product[] => {
  if (typeof window === 'undefined') return initialProducts;
  
  const savedProducts = localStorage.getItem(STORAGE_KEY);
  
  if (savedProducts) {
    return JSON.parse(savedProducts);
  } else {
    // Primera vez: guardamos los productos iniciales
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
    return initialProducts;
  }
};

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(initializeProducts());

  // Escuchar cambios en localStorage desde otras pestañas/ventanas
  useEffect(() => {
    const handleStorageChange = () => {
      const savedProducts = localStorage.getItem(STORAGE_KEY);
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      }
    };

    // Escuchar cambios en storage desde otras ventanas
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Función para guardar en localStorage
  const saveToLocalStorage = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
  };

  // Agregar nuevo producto
  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const productWithId: Product = {
      ...newProduct,
      id: Date.now().toString(), // ID simple y único
    };
    const updated = [...products, productWithId];
    saveToLocalStorage(updated);
    return productWithId;
  };

  // Editar producto
  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    );
    saveToLocalStorage(updated);
  };

  // Eliminar producto
  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveToLocalStorage(updated);
  };

  // Resetear a datos iniciales (útil para pruebas)
  const resetToInitial = () => {
    saveToLocalStorage(initialProducts);
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToInitial,
  };
}