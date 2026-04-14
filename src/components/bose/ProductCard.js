import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '../../context/CartContext';

/**
 * ProductCard 组件
 * 展示单个产品信息，包含颜色选择和价格
 * 样式还原 Bose 官网 Trending Products 板块
 */
const ProductCard = ({ product }) => {
  const [activeColor, setActiveColor] = useState(0);
  const { addToCart } = useCart();
  const router = useRouter();
  
  // 模拟颜色数据（实际应该从 product props 中获取）
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White Smoke', hex: '#f5f5f5' },
    { name: 'Blue', hex: '#0000ff' },
    { name: 'Sandstone', hex: '#d2b48c' },
    { name: 'Moonstone Blue', hex: '#add8e6' }
  ].slice(0, 5); // Limit to 5 for display

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <div className="product-card-container">
      <Link href={`/bose/${product.id}`} className="product-card-link">
        {/* Image Container */}
        <div className="product-img-wrapper">
          {/* Wishlist Icon */}
          <button 
            className="product-wishlist-btn"
            aria-label="Add to wishlist"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-img"
          />
        </div>
        
        {/* Product Info */}
        <div className="product-details">
          {/* Color Name */}
          <p className="product-color-label">
            Color: {product.color}
          </p>

          {/* Color Swatches */}
          <div className="product-swatches">
            {colors.map((color, idx) => (
              <div 
                key={idx} 
                className={`product-swatch ${activeColor === idx ? 'product-swatch-active' : ''}`}
                style={{ backgroundColor: color.hex }}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveColor(idx);
                }}
                title={color.name}
              >
                {/* Active ring handled by CSS */}
              </div>
            ))}
            <span className="product-swatch-more">+3</span>
          </div>

          {/* Exclusive Badge */}
          {product.isExclusive && (
            <div className="product-badge-container">
              <span className="product-badge-exclusive">
                Exclusive color
              </span>
            </div>
          )}

          {/* Product Name */}
          <h3 className="product-title">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="product-rating-container">
            <div className="product-rating-stars">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < Math.floor(product.rating) ? "black" : "none"} stroke="black" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              ))}
            </div>
            <span className="product-rating-text">
              {product.rating} ({product.reviewCount || 0})
            </span>
          </div>

          {/* Footer: Price & Add to Cart */}
          <div className="product-footer">
            {/* Price Section */}
            <div className="product-price-box">
              <span className="product-price-current">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="product-price-original">${product.originalPrice.toFixed(2)}</span>
                  <span className="product-price-save">Save ${savings}</span>
                </>
              )}
            </div>

            {/* Add to Cart Button */}
            <div className="product-add-to-cart-box">
              <button 
                className="product-add-to-cart-btn"
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product);
                  // Optional: Add a visual feedback or toast here
                  // For now, we can just redirect to cart or stay on page
                  // Bose usually opens a side drawer or goes to cart
                  // Let's go to cart as per original behavior but with real data
                  router.push('/bose/cart');
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
