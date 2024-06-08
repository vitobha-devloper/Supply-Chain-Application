import React, { createContext, useState, FC, ReactNode } from 'react';
import { Supplier } from '../types/Suppliers';

interface SuppliersContextProps {
  suppliers: Supplier[];
  addSupplier: (supplier: Supplier) => void;
  updateSupplier: (supplier: Supplier) => void;
  removeSupplier: (id: number) => void;
}

const SuppliersContext = createContext<SuppliersContextProps | undefined>(undefined);

const SuppliersProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(() => {
    const savedSuppliers = localStorage.getItem('suppliers');
    return savedSuppliers ? JSON.parse(savedSuppliers) : [];
  });

  const addSupplier = (supplier: Supplier) => {
    setSuppliers(prevSuppliers => {
      const updatedSuppliers = [...prevSuppliers, supplier];
      localStorage.setItem('suppliers', JSON.stringify(updatedSuppliers));
      return updatedSuppliers;
    });
  };

  const updateSupplier = (supplier: Supplier) => {
    setSuppliers(prevSuppliers => {
      const updatedSuppliers = prevSuppliers.map(s => (s.id === supplier.id ? supplier : s));
      localStorage.setItem('suppliers', JSON.stringify(updatedSuppliers));
      return updatedSuppliers;
    });
  };

  const removeSupplier = (id: number) => {
    setSuppliers(prevSuppliers => {
      const updatedSuppliers = prevSuppliers.filter(s => s.id !== id);
      localStorage.setItem('suppliers', JSON.stringify(updatedSuppliers));
      return updatedSuppliers;
    });
  };

  return (
    <SuppliersContext.Provider value={{ suppliers, addSupplier, updateSupplier, removeSupplier }}>
      {children}
    </SuppliersContext.Provider>
  );
};

export { SuppliersProvider, SuppliersContext };
