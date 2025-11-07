import React, { useState, useEffect } from 'react';
import CheckoutForm from './CheckoutForm';
import { cartAPI } from '../services/api';
import { formatPrice } from '../utils/priceFormatter';

const Cart = ({ onCartUpdate }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await cartAPI.get();
      setCart(response.data);
    } catch (error) {
      setError('Failed to load cart. Please try again later.');
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      setError(null);
      await cartAPI.update(itemId, newQuantity);
      await fetchCart(); // Refresh cart
      onCartUpdate(); // Notify parent
    } catch (error) {
      setError('Failed to update quantity. Please try again.');
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      setError(null);
      await cartAPI.remove(itemId);
      await fetchCart(); // Refresh cart
      onCartUpdate(); // Notify parent
    } catch (error) {
      setError('Failed to remove item. Please try again.');
      console.error('Error removing item:', error);
    }
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleCheckoutComplete = () => {
    setShowCheckout(false);
    fetchCart(); // Refresh cart after checkout
    onCartUpdate(); // Notify parent
  };

  const handleCheckoutCancel = () => {
    setShowCheckout(false);
  };

  if (loading) {
    return (
      <div className="cart-section">
        <div className="container">
          <div className="loading">Loading cart...</div>
        </div>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <CheckoutForm 
        cartItems={cart.items}
        total={cart.total}
        onComplete={handleCheckoutComplete}
        onCancel={handleCheckoutCancel}
      />
    );
  }

  return (
    <div className="cart-section">
      <div className="container">
        <h2>Shopping Cart</h2>
        
        {error && <div className="error">{error}</div>}
        
        {cart.items.length === 0 ? (
          <div className="cart-empty">
            Your cart is empty. Start shopping to add items!
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.items.map(item => (
                <div key={item.id} className="cart-item">
                  <img 
                    src={item.product?.image} 
                    alt={item.product?.name}
                    className="cart-item-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x80/6c757d/ffffff?text=No+Image';
                    }}
                  />
                  <div className="cart-item-details">
                    <div className="cart-item-name">{item.product?.name}</div>
                    <div className="cart-item-price">{formatPrice(item.product?.price)} each</div>
                  </div>
                  <div className="cart-item-quantity-control">
                    <button 
                      className="quantity-btn"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-subtotal">{formatPrice(item.subtotal)}</div>
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item.id)}
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              ))}
              
              <div className="cart-total">
                <span className="cart-total-label">Total:</span>
                <span className="cart-total-amount">{formatPrice(cart.total)}</span>
              </div>
            </div>
            
            <button 
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={cart.items.length === 0}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;