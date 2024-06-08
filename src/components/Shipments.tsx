import React, { useContext, useState } from 'react';
import { ShipmentsContext } from '../contexts/ShipmentsContext';
import { Shipment } from '../types/Shipment';

const Shipments: React.FC = () => {
  const shipmentsContext = useContext(ShipmentsContext);
  if (!shipmentsContext) return null;

  const { shipments, addShipment, updateShipment } = shipmentsContext;
  const [newShipment, setNewShipment] = useState<Partial<Shipment>>({
    origin: '',
    destination: '',
    status: 'In Transit',
    estimatedDelivery: '',
  });

  const handleAddShipment = () => {
    if (newShipment.origin && newShipment.destination && newShipment.estimatedDelivery) {
      addShipment({ ...newShipment, id: Date.now() } as Shipment);
      setNewShipment({ origin: '', destination: '', status: 'In Transit', estimatedDelivery: '' });
    }
  };

  const handleStatusChange = (id: number, status: Shipment['status']) => {
    const shipment = shipments.find(s => s.id === id);
    if (shipment) {
      updateShipment({ ...shipment, status });
    }
  };

  return (
    <div>
      <h2>Shipments</h2>
      <ul>
        {shipments.map(shipment => (
          <li key={shipment.id}>
            {shipment.origin} - {shipment.destination} - {shipment.status} - {shipment.estimatedDelivery}
            <select onChange={(e) => handleStatusChange(shipment.id, e.target.value as Shipment['status'])} value={shipment.status}>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Delayed">Delayed</option>
            </select>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newShipment.origin}
          onChange={(e) => setNewShipment({ ...newShipment, origin: e.target.value })}
          placeholder="Origin"
        />
        <input
          type="text"
          value={newShipment.destination}
          onChange={(e) => setNewShipment({ ...newShipment, destination: e.target.value })}
          placeholder="Destination"
        />
        <input
          type="date"
          value={newShipment.estimatedDelivery}
          onChange={(e) => setNewShipment({ ...newShipment, estimatedDelivery: e.target.value })}
        />
        <button onClick={handleAddShipment}>Add Shipment</button>
      </div>
    </div>
  );
};

export default Shipments;
