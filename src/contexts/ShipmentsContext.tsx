import React, { createContext, useState, FC, ReactNode } from 'react';
import { Shipment } from '../types/Shipment';

interface ShipmentsContextProps {
  shipments: Shipment[];
  addShipment: (shipment: Shipment) => void;
  updateShipment: (shipment: Shipment) => void;
}

const ShipmentsContext = createContext<ShipmentsContextProps | undefined>(undefined);

const ShipmentsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [shipments, setShipments] = useState<Shipment[]>(() => {
    const savedShipments = localStorage.getItem('shipments');
    return savedShipments ? JSON.parse(savedShipments) : [];
  });

  const addShipment = (shipment: Shipment) => {
    setShipments(prevShipments => {
      const updatedShipments = [...prevShipments, shipment];
      localStorage.setItem('shipments', JSON.stringify(updatedShipments));
      return updatedShipments;
    });
  };

  const updateShipment = (shipment: Shipment) => {
    setShipments(prevShipments => {
      const updatedShipments = prevShipments.map(s => (s.id === shipment.id ? shipment : s));
      localStorage.setItem('shipments', JSON.stringify(updatedShipments));
      return updatedShipments;
    });
  };

  return (
    <ShipmentsContext.Provider value={{ shipments, addShipment, updateShipment }}>
      {children}
    </ShipmentsContext.Provider>
  );
};

export { ShipmentsProvider, ShipmentsContext };
