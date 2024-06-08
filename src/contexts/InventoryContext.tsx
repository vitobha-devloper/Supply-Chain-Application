import React, { createContext, useState, FC, ReactNode } from 'react';
import { InventoryItem } from '../types/InventoryItems';

interface InventoryContextProps {
  items: InventoryItem[];
  addItem: (item: InventoryItem) => void;
  updateItem: (item: InventoryItem) => void;
  removeItem: (id: number) => void;
}

const InventoryContext = createContext<InventoryContextProps | undefined>(undefined);

const InventoryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<InventoryItem[]>(() => {
    const savedItems = localStorage.getItem('inventory');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const addItem = (item: InventoryItem) => {
    setItems(prevItems => {
      const updatedItems = [...prevItems, item];
      localStorage.setItem('inventory', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const updateItem = (item: InventoryItem) => {
    setItems(prevItems => {
      const updatedItems = prevItems.map(i => (i.id === item.id ? item : i));
      localStorage.setItem('inventory', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const removeItem = (id: number) => {
    setItems(prevItems => {
      const updatedItems = prevItems.filter(i => i.id !== id);
      localStorage.setItem('inventory', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  return (
    <InventoryContext.Provider value={{ items, addItem, updateItem, removeItem }}>
      {children}
    </InventoryContext.Provider>
  );
};

export { InventoryProvider, InventoryContext };
