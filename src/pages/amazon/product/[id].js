import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import AmazonHeader from '../../../components/amazon/AmazonHeader';
import { 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar, 
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaShieldAlt,
  FaTruck,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronUp,
  FaCheck,
  FaPlus,
  FaMinus,
  FaThumbsUp,
  FaThumbsDown,
  FaShare,
  FaPrint
} from 'react-icons/fa';
import { getProductById, getRecommendedProducts } from '../../../data/amazonData';

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [expandedReview, setExpandedReview] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // 模拟用户评价数据
  const [reviews] = useState([
    {
      id: 1,
      author: "John D.",
      rating: 5,
      date: "December 10, 2024",
      verified: true,
      title: "Excellent product, highly recommend!",
      content: "This product exceeded my expectations. The build quality is outstanding and it works perfectly. Delivery was fast and packaging was secure.",
      helpful: 42,
      images: ["/images/amazon/review1.jpg"]
    },
    {
      id: 2,
      author: "Sarah M.",
      rating: 4,
      date: "December 8, 2024",
      verified: true,
      title: "Good value for money",
      content: "Great product overall. Minor issues with setup but customer service was helpful. Would buy again.",
      helpful: 28,
      images: []
    },
    {
      id: 3,
      author: "Mike R.",
      rating: 5,
      date: "December 5, 2024",
      verified: false,
      title: "Perfect!",
      content: "Exactly what I needed. Fast shipping and excellent quality.",
      helpful: 15,
      images: []
    },
    {
      id: 4,
      author: "Lisa K.",
      rating: 3,
      date: "December 3, 2024",
      verified: true,
      title: "Average product",
      content: "It's okay, not bad but not great either. Does the job but there are probably better alternatives out there.",
      helpful: 8,
      images: ["/images/amazon/review2.jpg"]
    }
  ]);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = () => {
    setLoading(true);
    
    // 模拟API调用延迟
    setTimeout(() => {
      const productData = getProductById(id);
      
      if (productData) {
        setProduct(productData);
        
        // 加载推荐商品
        const recommended = getRecommendedProducts(id, 'customers-who-viewed');
        setRecommendations(recommended);
        
        // 初始化变体选择（如果有的话）
        if (productData.sizes) {
          setSelectedVariant({ size: productData.sizes[0] });
        }
        if (productData.colors) {
          setSelectedVariant(prev => ({ ...prev, color: productData.colors[0] }));
        }
      }
      
      setLoading(false);
    }, 500);
  };

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

  // 添加到购物车
  const handleAddToCart = () => {
    try {
      // 从localStorage获取当前购物车
      const savedCart = localStorage.getItem('amazon-cart');
      let currentCart = savedCart ? JSON.parse(savedCart) : [];
      
      // 检查商品是否已在购物车中
      const existingItemIndex = currentCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // 如果商品已存在，增加数量
        currentCart[existingItemIndex].quantity += quantity;
      } else {
        // 如果商品不存在，添加新商品
        const cartItem = {
          id: product.id,
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice,
          quantity: quantity,
          image: product.images?.[0] || product.image,
          inStock: product.inStock,
          prime: product.delivery?.prime || product.prime || false,
          selectedVariant: selectedVariant,
          seller: product.seller?.name || product.seller || 'Amazon.com'
        };
        currentCart.push(cartItem);
      }
      
      // 保存到localStorage
      localStorage.setItem('amazon-cart', JSON.stringify(currentCart));
      
      // 更新本地状态
      setCartItems(currentCart);
      
      alert(`${product.title} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  // 立即购买
  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/amazon/cart');
  };

  // 切换愿望清单
  const toggleWishlist = () => {
    setWishlistItems(prev => {
      const isInWishlist = prev.some(item => item.id === product.id);
      if (isInWishlist) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AmazonHeader cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading product details...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AmazonHeader cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Product not found</div>
        </div>
      </div>
    );
  }

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <Head>
        <title>{product.title} - Amazon.com</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="min-h-screen bg-white">
        <AmazonHeader cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />

        {/* Breadcrumb */}
        <div className="bg-gray-50 py-2">
          <div className="container mx-auto px-4">
            <div className="text-sm text-gray-600">
              <Link href="/amazon" className="hover:text-orange-600">Home</Link>
              <span className="mx-2">›</span>
              <Link href={`/amazon/category/${product.category}`} className="hover:text-orange-600 capitalize">
                {product.category}
              </Link>
              <span className="mx-2">›</span>
              <span className="text-gray-900">{product.title.substring(0, 50)}...</span>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Images */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                {/* Main Image */}
                <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square">
                  <img
                    src={product.images?.[selectedImageIndex] || '/images/placeholder-product.jpg'}
                    alt={product.title}
                    className="w-full h-full object-contain"
                    data-testid="main-product-image"
                  />
                </div>

                {/* Thumbnail Images */}
                {product.images && product.images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 bg-gray-100 rounded border-2 overflow-hidden ${
                          index === selectedImageIndex ? 'border-orange-400' : 'border-gray-200'
                        }`}
                        data-testid={`thumbnail-${index}`}
                      >
                        <img
                          src={image}
                          alt={`${product.title} ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {/* Brand */}
                {product.brand && (
                  <div className="text-blue-600 hover:text-blue-800">
                    <Link href={`/amazon/search?q=${product.brand}`}>
                      Visit the {product.brand} Store
                    </Link>
                  </div>
                )}

                {/* Title */}
                <h1 className="text-2xl font-normal text-gray-900" data-testid="product-title">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {renderRating(product.rating)}
                  </div>
                  <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                    {product.rating} out of 5 stars
                  </span>
                  <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                    {product.reviewCount?.toLocaleString()} ratings
                  </span>
                </div>

                {/* Prime badge */}
                {product.delivery?.prime && (
                  <div className="flex items-center">
                    <div className="bg-blue-500 text-white px-2 py-1 text-sm font-bold rounded mr-2">
                      Prime
                    </div>
                    <span className="text-sm text-gray-600">
                      FREE delivery tomorrow with Prime
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="space-y-2">
                  {discountPercent > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="bg-red-500 text-white px-2 py-1 text-sm font-bold rounded">
                        -{discountPercent}%
                      </span>
                      <span className="text-sm text-gray-600">Limited time deal</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl text-gray-900" data-testid="current-price">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-lg text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Variants (Size/Color) */}
                {(product.sizes || product.colors) && (
                  <div className="space-y-3">
                    {product.sizes && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Size: <span className="font-normal">{selectedVariant.size}</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map(size => (
                            <button
                              key={size}
                              onClick={() => setSelectedVariant(prev => ({ ...prev, size }))}
                              className={`px-3 py-2 border rounded text-sm ${
                                selectedVariant.size === size
                                  ? 'border-orange-400 bg-orange-50 text-orange-600'
                                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                              }`}
                              data-testid={`size-${size}`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {product.colors && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Color: <span className="font-normal">{selectedVariant.color}</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {product.colors.map(color => (
                            <button
                              key={color}
                              onClick={() => setSelectedVariant(prev => ({ ...prev, color }))}
                              className={`px-3 py-2 border rounded text-sm ${
                                selectedVariant.color === color
                                  ? 'border-orange-400 bg-orange-50 text-orange-600'
                                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                              }`}
                              data-testid={`color-${color.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* About this item */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">About this item</h3>
                  <ul className="space-y-2">
                    {product.features?.slice(0, showAllFeatures ? product.features.length : 5).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-gray-400 mr-2 mt-1">•</span>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {product.features?.length > 5 && (
                    <button
                      onClick={() => setShowAllFeatures(!showAllFeatures)}
                      className="text-blue-600 hover:text-blue-800 text-sm mt-2 flex items-center"
                    >
                      {showAllFeatures ? (
                        <>Show less <FaChevronUp className="ml-1" /></>
                      ) : (
                        <>Show more <FaChevronDown className="ml-1" /></>
                      )}
                    </button>
                  )}
                </div>

                {/* Product specifications */}
                {product.specifications && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Product Specifications</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {Object.entries(product.specifications).slice(0, showAllSpecs ? Object.entries(product.specifications).length : 4).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-1 border-b border-gray-100 last:border-b-0">
                          <span className="text-sm text-gray-600 font-medium">{key}</span>
                          <span className="text-sm text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                    {Object.entries(product.specifications).length > 4 && (
                      <button
                        onClick={() => setShowAllSpecs(!showAllSpecs)}
                        className="text-blue-600 hover:text-blue-800 text-sm mt-2 flex items-center"
                      >
                        {showAllSpecs ? (
                          <>Show less <FaChevronUp className="ml-1" /></>
                        ) : (
                          <>Show more specifications <FaChevronDown className="ml-1" /></>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Purchase Options */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <div className="border border-gray-200 rounded-lg p-4 bg-white">
                  {/* Price */}
                  <div className="mb-4">
                    <div className="text-2xl text-gray-900 mb-1">
                      ${product.price.toFixed(2)}
                    </div>
                    {product.delivery?.freeShipping && (
                      <div className="text-sm text-green-600 flex items-center">
                        <FaTruck className="mr-1" />
                        FREE delivery
                      </div>
                    )}
                  </div>

                  {/* Stock status */}
                  <div className="mb-4">
                    {product.inStock ? (
                      product.stockCount <= 10 ? (
                        <div className="text-orange-600 text-sm">
                          Only {product.stockCount} left in stock - order soon.
                        </div>
                      ) : (
                        <div className="text-green-600 text-sm">In Stock</div>
                      )
                    ) : (
                      <div className="text-red-600 text-sm">Currently unavailable</div>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity:
                    </label>
                    <div className="flex items-center border border-gray-300 rounded w-20">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-2 py-1 hover:bg-gray-100"
                        data-testid="quantity-decrease"
                      >
                        <FaMinus size={10} />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full text-center py-1 border-0 focus:outline-none"
                        min="1"
                        data-testid="quantity-input"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-2 py-1 hover:bg-gray-100"
                        data-testid="quantity-increase"
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="space-y-2 mb-4">
                    <button
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        product.inStock
                          ? 'bg-orange-400 hover:bg-orange-500 text-gray-900'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      data-testid="add-to-cart-button"
                    >
                      <FaShoppingCart className="inline mr-2" />
                      Add to Cart
                    </button>

                    <button
                      onClick={handleBuyNow}
                      disabled={!product.inStock}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        product.inStock
                          ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      data-testid="buy-now-button"
                    >
                      Buy Now
                    </button>

                    <button
                      onClick={toggleWishlist}
                      className="w-full py-2 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      data-testid="wishlist-button"
                    >
                      {isInWishlist ? (
                        <>
                          <FaHeart className="inline mr-2 text-red-500" />
                          Remove from Wish List
                        </>
                      ) : (
                        <>
                          <FaRegHeart className="inline mr-2" />
                          Add to Wish List
                        </>
                      )}
                    </button>
                  </div>

                  {/* Security and guarantee */}
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex items-center">
                      <FaShieldAlt className="mr-2 text-green-600" />
                      <span>Secure transaction</span>
                    </div>
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="mr-2 text-gray-400 mt-1" />
                      <div>
                        <div>Ships from Amazon.com</div>
                        <div>Sold by {product.seller?.name || 'Amazon.com'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {['description', 'specifications', 'reviews'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    data-testid={`tab-${tab}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            <div className="mt-6">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
              )}

              {activeTab === 'specifications' && product.specifications && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-600">{key}</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  {/* Review summary */}
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-medium">Customer Reviews</h3>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Write a review
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        {renderRating(product.rating)}
                        <span className="ml-2 text-lg font-medium">{product.rating} out of 5</span>
                      </div>
                      <span className="text-gray-600">
                        {product.reviewCount?.toLocaleString()} global ratings
                      </span>
                    </div>
                  </div>

                  {/* Individual reviews */}
                  <div className="space-y-6">
                    {reviews.map(review => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-gray-900">{review.author}</span>
                              {review.verified && (
                                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {renderRating(review.rating)}
                              </div>
                              <span className="text-sm text-gray-600">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        
                        <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                        
                        <p className={`text-gray-700 ${
                          expandedReview === review.id ? '' : 'line-clamp-3'
                        }`}>
                          {review.content}
                        </p>
                        
                        {review.content.length > 150 && (
                          <button
                            onClick={() => setExpandedReview(
                              expandedReview === review.id ? null : review.id
                            )}
                            className="text-blue-600 hover:text-blue-800 text-sm mt-1"
                          >
                            {expandedReview === review.id ? 'Show less' : 'Read more'}
                          </button>
                        )}
                        
                        <div className="flex items-center space-x-4 mt-3">
                          <button className="flex items-center text-sm text-gray-600 hover:text-gray-800">
                            <FaThumbsUp className="mr-1" />
                            Helpful ({review.helpful})
                          </button>
                          <button className="flex items-center text-sm text-gray-600 hover:text-gray-800">
                            <FaThumbsDown className="mr-1" />
                            Not helpful
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recommended products */}
          {recommendations.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-medium text-gray-900 mb-6">
                Customers who viewed this item also viewed
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {recommendations.map(item => (
                  <Link key={item.id} href={`/amazon/product/${item.id}`}>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                      <img
                        src={item.images?.[0] || '/images/placeholder-product.jpg'}
                        alt={item.title}
                        className="w-full aspect-square object-contain mb-2"
                      />
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center mb-1">
                        <div className="flex">
                          {renderRating(item.rating)}
                        </div>
                        <span className="text-xs text-gray-600 ml-1">
                          ({item.reviewCount})
                        </span>
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default ProductDetailPage; 