import { useState, useEffect } from 'react';
import { initialUsers, type User } from '../data/mockData';

const STORAGE_KEY = 'emprendehn_users';

// Función para inicializar usuarios desde localStorage
const initializeUsers = (): User[] => {
  if (typeof window === 'undefined') return initialUsers;
  
  const savedUsers = localStorage.getItem(STORAGE_KEY);
  
  if (savedUsers) {
    return JSON.parse(savedUsers);
  } else {
    // Primera vez: guardamos los usuarios iniciales
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialUsers));
    return initialUsers;
  }
};

export function useUsers() {
  const [users, setUsers] = useState<User[]>(initializeUsers());

  // Escuchar cambios en localStorage desde otras pestañas/ventanas
  useEffect(() => {
    const handleStorageChange = () => {
      const savedUsers = localStorage.getItem(STORAGE_KEY);
      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
      }
    };

    // Escuchar cambios en storage desde otras ventanas
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Función para guardar en localStorage
  const saveToLocalStorage = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
  };

  // Agregar nuevo usuario
  const addUser = (newUser: Omit<User, 'id'>) => {
    const userWithId: User = {
      ...newUser,
      id: Date.now().toString(), // ID simple y único
    };
    const updated = [...users, userWithId];
    saveToLocalStorage(updated);
    return userWithId;
  };

  // Editar usuario
  const updateUser = (id: string, updates: Partial<User>) => {
    const updated = users.map((u) =>
      u.id === id ? { ...u, ...updates } : u
    );
    saveToLocalStorage(updated);
  };

  // Eliminar usuario
  const deleteUser = (id: string) => {
    const updated = users.filter((u) => u.id !== id);
    saveToLocalStorage(updated);
  };

  // Resetear a datos iniciales (útil para pruebas)
  const resetToInitial = () => {
    saveToLocalStorage(initialUsers);
  };

  return {
    users,
    addUser,
    updateUser,
    deleteUser,
    resetToInitial,
  };
}