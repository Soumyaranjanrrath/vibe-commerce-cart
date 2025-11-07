import React, { useState, useEffect } from 'react';
import './App.css';
import ProductsGrid from './components/ProductsGrid';
import Cart from './components/Cart';
import { cartAPI } from './services/api';

function App() {
  const [currentView, setCurrentView] = useState('products');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    updateCartCount();
  }, []);

  const updateCartCount = async () => {
    try {
      const response = await cartAPI.get();
      if (response && response.data && response.data.items) {
        const totalItems = response.data.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
        setCartCount(totalItems);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error('Error updating cart count:', error);
      setCartCount(0);
    }
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    if (view === 'cart') {
      updateCartCount(); // Refresh cart count when viewing cart
    }
  };

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>🛍️ Vibe Commerce</h1>
          <nav className="nav">
            <button 
              className={currentView === 'products' ? 'active' : ''}
              onClick={() => handleViewChange('products')}
            >
              Products
            </button>
            <button 
              className={currentView === 'cart' ? 'active' : ''}
              onClick={() => handleViewChange('cart')}
            >
              Cart {cartCount > 0 && `(${cartCount})`}
            </button>
          </nav>
        </div>
      </header>

      <main>
        {currentView === 'products' ? (
          <ProductsGrid onCartUpdate={updateCartCount} />
        ) : (
          <Cart onCartUpdate={updateCartCount} />
        )}
      </main>

      <footer style={{ 
        textAlign: 'center', 
        padding: '2rem', 
        color: '#6c757d', 
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #e9ecef' 
      }}>
        <p>&copy; 2024 Vibe Commerce. Mock E-Commerce Application.</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Built with React, Node.js, Express & MongoDB
        </p>
      </footer>
    </div>
  );
}

export default App;