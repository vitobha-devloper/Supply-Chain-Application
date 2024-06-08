import React ,{FC} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Inventory from './components/Invenstory';
import Shipments from './components/Shipments';
import Suppliers from './components/Supplers';
import { InventoryProvider } from './contexts/InventoryContext';
import { ShipmentsProvider } from './contexts/ShipmentsContext';
import { SuppliersProvider } from './contexts/SuppliersContext';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/inventory">Inventory</Link></li>
            <li><Link to="/shipments">Shipments</Link></li>
            <li><Link to="/suppliers">Suppliers</Link></li>
          </ul>
        </nav>
        <InventoryProvider>
          <ShipmentsProvider>
            <SuppliersProvider>
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/shipments" element={<Shipments/>} />
                <Route path="/suppliers" element={<Suppliers/>} />
              
            </SuppliersProvider>
          </ShipmentsProvider>
        </InventoryProvider>
      </div>
    </Router>
  );
}

export default App;
