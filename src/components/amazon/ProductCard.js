import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar, 
  FaShippingFast, 
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

const ProductCard = ({ 
  product, 
  layout = 'grid', // 'grid' or 'list'
  onAddToCart,
  onAddToWishlist,
  isInWishlist = false,
  showComparison = false,
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);

  // 渲染星级评分
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  // 计算折扣百分比
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // 处理添加到购物车
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  // 处理愿望清单
  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToWishlist) {
      onAddToWishlist(product);
    }
  };

  // Grid布局
  if (layout === 'grid') {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 ${className}`}>
        <Link href={`/amazon/product/${product.id}`} className="block" data-testid={`product-link-${product.id}`}>
          {/* 商品图片 */}
          <div className="relative mb-4 group">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
              {!imageError ? (
                <img
                  src={product.images?.[currentImageIndex] || '/images/placeholder-product.jpg'}
                  alt={product.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              
              {/* 折扣标签 */}
              {discountPercent > 0 && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                  -{discountPercent}%
                </div>
              )}

              {/* Prime标签 */}
              {product.delivery?.prime && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 text-xs font-bold rounded">
                  Prime
                </div>
              )}

              {/* 愿望清单按钮 */}
              <button
                onClick={handleWishlistToggle}
                className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                {isInWishlist ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-gray-600" />
                )}
              </button>
            </div>

            {/* 图片导航点 */}
            {product.images && product.images.length > 1 && (
              <div className="flex justify-center mt-2 space-x-1">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-orange-400' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 商品信息 */}
          <div className="space-y-2">
            {/* 品牌 */}
            {product.brand && (
              <div className="text-sm text-gray-600">{product.brand}</div>
            )}

            {/* 标题 */}
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-4">
              {product.title}
            </h3>

            {/* 评分 */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {renderRating(product.rating)}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviewCount?.toLocaleString()})
              </span>
            </div>

            {/* 价格 */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* 配送信息 */}
            {product.delivery && (
              <div className="text-sm text-gray-600">
                {product.delivery.freeShipping && (
                  <div className="flex items-center">
                    <FaShippingFast className="mr-1 text-green-600" />
                    FREE delivery {product.delivery.prime ? 'tomorrow' : `in ${product.delivery.estimatedDays} days`}
                  </div>
                )}
              </div>
            )}

            {/* 库存状态 */}
            {product.inStock ? (
              product.stockCount <= 10 && (
                <div className="text-sm text-orange-600">
                  Only {product.stockCount} left in stock
                </div>
              )
            ) : (
              <div className="text-sm text-red-600">Currently unavailable</div>
            )}
          </div>
        </Link>

        {/* 操作按钮 */}
        <div className="mt-4 space-y-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              product.inStock
                ? 'bg-orange-400 hover:bg-orange-500 text-gray-900'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            data-testid={`add-to-cart-${product.id}`}
          >
            <FaShoppingCart className="inline mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    );
  }

  // List布局
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 ${className}`}>
      <Link href={`/amazon/product/${product.id}`} className="flex space-x-4" data-testid={`product-link-${product.id}`}>
        {/* 商品图片 */}
        <div className="flex-shrink-0 w-48">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
            {!imageError ? (
              <img
                src={product.images?.[0] || '/images/placeholder-product.jpg'}
                alt={product.title}
                className="w-full h-full object-contain"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            
            {/* 折扣标签 */}
            {discountPercent > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                -{discountPercent}%
              </div>
            )}
          </div>
        </div>

        {/* 商品信息 */}
        <div className="flex-1 space-y-2">
          {/* 品牌和标题 */}
          <div>
            {product.brand && (
              <div className="text-sm text-gray-600 mb-1">{product.brand}</div>
            )}
            <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
              {product.title}
            </h3>
          </div>

          {/* 评分 */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {renderRating(product.rating)}
            </div>
            <span className="text-sm text-gray-600">
              ({product.reviewCount?.toLocaleString()})
            </span>
          </div>

          {/* 描述 */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>

          {/* 特性 */}
          {product.features && (
            <div>
              <ul className="text-sm text-gray-600 space-y-1">
                {product.features.slice(0, showMoreFeatures ? product.features.length : 3).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              {product.features.length > 3 && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowMoreFeatures(!showMoreFeatures);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center mt-1"
                >
                  {showMoreFeatures ? (
                    <>Show less <FaChevronUp className="ml-1" /></>
                  ) : (
                    <>Show more features <FaChevronDown className="ml-1" /></>
                  )}
                </button>
              )}
            </div>
          )}

          {/* 配送信息 */}
          {product.delivery && (
            <div className="text-sm text-gray-600">
              {product.delivery.freeShipping && (
                <div className="flex items-center">
                  <FaShippingFast className="mr-1 text-green-600" />
                  FREE delivery {product.delivery.prime ? 'tomorrow' : `in ${product.delivery.estimatedDays} days`}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 价格和操作 */}
        <div className="flex-shrink-0 w-48 text-right space-y-3">
          {/* 价格 */}
          <div>
            <div className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </div>
            )}
          </div>

          {/* Prime标签 */}
          {product.delivery?.prime && (
            <div className="inline-block bg-blue-500 text-white px-2 py-1 text-xs font-bold rounded">
              Prime
            </div>
          )}

          {/* 库存状态 */}
          {product.inStock ? (
            product.stockCount <= 10 && (
              <div className="text-sm text-orange-600">
                Only {product.stockCount} left
              </div>
            )
          ) : (
            <div className="text-sm text-red-600">Unavailable</div>
          )}

          {/* 操作按钮 */}
          <div className="space-y-2">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                product.inStock
                  ? 'bg-orange-400 hover:bg-orange-500 text-gray-900'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              data-testid={`add-to-cart-${product.id}`}
            >
              <FaShoppingCart className="inline mr-2" />
              Add to Cart
            </button>

            <button
              onClick={handleWishlistToggle}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isInWishlist ? (
                <>
                  <FaHeart className="inline mr-2 text-red-500" />
                  In Wishlist
                </>
              ) : (
                <>
                  <FaRegHeart className="inline mr-2" />
                  Add to List
                </>
              )}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard; 