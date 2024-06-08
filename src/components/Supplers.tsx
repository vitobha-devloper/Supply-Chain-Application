import React, { useContext, useState } from 'react';
import { SuppliersContext } from '../contexts/SuppliersContext';
import { Supplier } from '../types/Suppliers';

const Suppliers: React.FC = () => {
  const suppliersContext = useContext(SuppliersContext);
  if (!suppliersContext) return null;

  const { suppliers, addSupplier, updateSupplier, removeSupplier } = suppliersContext;
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
  });

  const handleAddSupplier = () => {
    if (newSupplier.name && newSupplier.contactPerson && newSupplier.phone && newSupplier.email) {
      addSupplier({ ...newSupplier, id: Date.now() } as Supplier);
      setNewSupplier({ name: '', contactPerson: '', phone: '', email: '' });
    }
  };

  return (
    <div>
      <h2>Suppliers</h2>
      <ul>
        {suppliers.map(supplier => (
          <li key={supplier.id}>
            {supplier.name} - {supplier.contactPerson} - {supplier.phone} - {supplier.email}
            <button onClick={() => removeSupplier(supplier.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newSupplier.name}
          onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
          placeholder="Name"
        />
        <input
          type="text"
          value={newSupplier.contactPerson}
          onChange={(e) => setNewSupplier({ ...newSupplier, contactPerson: e.target.value })}
          placeholder="Contact Person"
        />
        <input
          type="text"
          value={newSupplier.phone}
          onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
          placeholder="Phone"
        />
        <input
          type="email"
          value={newSupplier.email}
          onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
          placeholder="Email"
        />
        <button onClick={handleAddSupplier}>Add Supplier</button>
      </div>
    </div>
  );
};

export default Suppliers;
