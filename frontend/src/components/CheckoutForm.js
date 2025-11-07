import React, { useState } from 'react';
import { cartAPI } from '../services/api';
import { formatPrice } from '../utils/priceFormatter';

const CheckoutForm = ({ cartItems, total, onComplete, onCancel }) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [receipt, setReceipt] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!customerInfo.name.trim() || !customerInfo.email.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!customerInfo.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await cartAPI.checkout(cartItems, customerInfo);
      setReceipt(response.data.receipt);
    } catch (error) {
      setError('Checkout failed. Please try again.');
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseReceipt = () => {
    setReceipt(null);
    onComplete();
  };

  if (receipt) {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h3>✅ Order Completed!</h3>
          <div className="receipt">
            <p><strong>Order ID:</strong> {receipt.id}</p>
            <p><strong>Customer:</strong> {receipt.customer.name}</p>
            <p><strong>Email:</strong> {receipt.customer.email}</p>
            <p><strong>Date:</strong> {new Date(receipt.timestamp).toLocaleDateString()}</p>
            
            <h4>Items Ordered:</h4>
            {receipt.items.map(item => (
              <div key={item.id} className="receipt-item">
                <span>{item.product.name} x {item.quantity}</span>
                <span>{formatPrice(item.subtotal)}</span>
              </div>
            ))}
            
            <div className="receipt-total">
              <span>Total:</span>
              <span>{formatPrice(receipt.total)}</span>
            </div>
            
            <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
              Thank you for your purchase! A confirmation email will be sent to {receipt.customer.email}.
            </p>
          </div>
          
          <button className="modal-close" onClick={handleCloseReceipt}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-section">
      <div className="container">
        <h2>Checkout</h2>
        
        {/* Order Summary */}
        <div className="cart-items">
          <h3>Order Summary</h3>
          {cartItems.map(item => (
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
              <div className="cart-item-quantity">Qty: {item.quantity}</div>
              <div className="cart-item-subtotal">{formatPrice(item.subtotal)}</div>
            </div>
          ))}
          
          <div className="cart-total">
            <span className="cart-total-label">Total:</span>
            <span className="cart-total-amount">{formatPrice(total)}</span>
          </div>
        </div>

        {/* Checkout Form */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Customer Information</h3>
          
          {error && <div className="error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={customerInfo.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={customerInfo.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email address"
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button 
              type="button" 
              className="checkout-btn" 
              onClick={onCancel}
              style={{ backgroundColor: '#6c757d' }}
            >
              Back to Cart
            </button>
            
            <button 
              type="submit" 
              className="checkout-btn"
              disabled={loading}
            >
              {loading ? 'Processing...' : `Complete Order - ${formatPrice(total)}`}
            </button>
          </div>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>
          <p>* This is a mock checkout. No real payment will be processed.</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;