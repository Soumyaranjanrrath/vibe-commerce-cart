import React, { useState } from 'react';
import { formatPrice } from '../utils/priceFormatter';

const ProductCard = ({ product, onAddToCart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await onAddToCart(product.id);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="product-rating">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="star filled">★</span>
        ))}
        {hasHalfStar && <span className="star half">★</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="star">★</span>
        ))}
        <span className="rating-value">{rating}</span>
      </div>
    );
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        {!imageLoaded && <div className="image-placeholder"></div>}
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            // Try fallback image if Pexels fails
            if (!e.target.src.includes('placeholder')) {
              e.target.src = `https://picsum.photos/seed/${product.id}/500/500`;
            } else {
              e.target.src = 'https://via.placeholder.com/500x500/667eea/ffffff?text=' + encodeURIComponent(product.name);
            }
            setImageLoaded(true);
          }}
          style={{ opacity: imageLoaded ? 1 : 0 }}
          loading="lazy"
        />
        {product.category && (
          <span className="product-badge">{product.category}</span>
        )}
      </div>
      <div className="product-info">
        <div className="product-name">{product.name}</div>
        {product.rating && renderStars(product.rating)}
        {product.reviews && (
          <div className="product-reviews">({product.reviews} reviews)</div>
        )}
        <div className="product-price">{formatPrice(product.price)}</div>
        {product.description && (
          <div className="product-description">{product.description}</div>
        )}
      </div>
      <button 
        className="add-to-cart-btn"
        onClick={handleAddToCart}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="btn-spinner"></span>
            Adding...
          </>
        ) : (
          <>
            <span>🛒</span>
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
};

export default ProductCard;