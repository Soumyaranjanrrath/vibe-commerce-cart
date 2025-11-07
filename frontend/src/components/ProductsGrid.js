import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from './ProductCard';
import { productAPI, cartAPI } from '../services/api';

const ProductsGrid = ({ onCartUpdate }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productAPI.getAll();
      setAllProducts(response.data);
    } catch (error) {
      setError('Failed to load products. Please try again later.');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(allProducts.map(p => p.category).filter(Boolean))];
    return cats;
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allProducts, searchQuery, selectedCategory]);

  const handleAddToCart = async (productId) => {
    try {
      setError(null);
      await cartAPI.add(productId, 1);
      setMessage('Item added to cart!');
      onCartUpdate(); // Notify parent to update cart count
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setError('Failed to add item to cart. Please try again.');
      console.error('Error adding to cart:', error);
      
      // Clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  if (loading) {
    return (
      <div className="products-section">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-section">
      <div className="container">
        <div className="products-header">
          <h2>Our Products</h2>
          <p className="products-subtitle">Discover amazing products at great prices</p>
        </div>

        {/* Search and Filter */}
        <div className="products-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {error && <div className="error">{error}</div>}
        {message && <div className="success">{message}</div>}
        
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>No products found. Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <div className="products-count">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </div>
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsGrid;