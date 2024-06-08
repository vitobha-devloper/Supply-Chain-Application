import React, { useContext, useState } from 'react';
import { InventoryContext } from '../contexts/InventoryContext';
import { InventoryItem } from '../types/InventoryItems';

const Inventory: React.FC = () => {
  const inventoryContext = useContext(InventoryContext);
  if (!inventoryContext) return null;

  const { items, addItem, updateItem, removeItem } = inventoryContext;
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: '',
    sku: '',
    quantity: 0,
    warehouse: '',
  });

  const handleAddItem = () => {
    if (newItem.name && newItem.sku && newItem.quantity && newItem.warehouse) {
      addItem({ ...newItem, id: Date.now() } as InventoryItem);
      setNewItem({ name: '', sku: '', quantity: 0, warehouse: '' });
    }
  };

  return (
    <div>
      <h2>Inventory</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.sku} - {item.quantity} - {item.warehouse}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          placeholder="Name"
        />
        <input
          type="text"
          value={newItem.sku}
          onChange={(e) => setNewItem({ ...newItem, sku: e.target.value })}
          placeholder="SKU"
        />
        <input
          type="number"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
          placeholder="Quantity"
        />
        <input
          type="text"
          value={newItem.warehouse}
          onChange={(e) => setNewItem({ ...newItem, warehouse: e.target.value })}
          placeholder="Warehouse"
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
    </div>
  );
};

export default Inventory;
