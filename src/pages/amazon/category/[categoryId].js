import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AmazonHeader from '../../../components/amazon/AmazonHeader';
import ProductCard from '../../../components/amazon/ProductCard';
import { 
  FaFilter, 
  FaSort, 
  FaThLarge, 
  FaList, 
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaStar,
  FaStarHalfAlt,
  FaRegStar
} from 'react-icons/fa';
import { 
  categories, 
  products, 
  getProductsByCategory 
} from '../../../data/amazonData';

const CategoryPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;
  
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [layout, setLayout] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // 过滤器状态
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 10000 },
    rating: 0,
    brand: [],
    subcategory: [],
    inStock: false,
    prime: false
  });

  // 排序选项
  const sortOptions = [
    { value: 'relevance', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Reviews' },
    { value: 'newest', label: 'Newest Arrivals' }
  ];

  useEffect(() => {
    if (router.isReady && categoryId) {
      // 查找当前分类
      const category = categories.find(cat => cat.id === categoryId);
      setCurrentCategory(category);

      // 获取分类商品
      const categoryProducts = getProductsByCategory(categoryId);
      setCategoryProducts(categoryProducts);
      setFilteredProducts(categoryProducts);

      // 从localStorage获取购物车数据
      try {
        const savedCart = localStorage.getItem('amazon-cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, [router.isReady, categoryId]);

  // 应用过滤器和排序
  useEffect(() => {
    let filtered = [...categoryProducts];

    // 价格过滤
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange.min && 
      product.price <= filters.priceRange.max
    );

    // 评分过滤
    if (filters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.rating);
    }

    // 品牌过滤
    if (filters.brand.length > 0) {
      filtered = filtered.filter(product => 
        filters.brand.includes(product.brand)
      );
    }

    // 子分类过滤
    if (filters.subcategory.length > 0) {
      filtered = filtered.filter(product => 
        filters.subcategory.includes(product.subcategory)
      );
    }

    // 库存过滤
    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Prime过滤
    if (filters.prime) {
      filtered = filtered.filter(product => product.delivery?.prime);
    }

    // 排序
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // 假设ID越大越新
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default: // relevance
        // 保持原始顺序
        break;
    }

    setFilteredProducts(filtered);
  }, [categoryProducts, filters, sortBy]);

  // 获取可用的品牌
  const availableBrands = [...new Set(categoryProducts.map(p => p.brand).filter(Boolean))];
  
  // 获取可用的子分类
  const availableSubcategories = currentCategory?.subcategories || [];

  // 处理过滤器更改
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (filterType === 'brand' || filterType === 'subcategory') {
        if (newFilters[filterType].includes(value)) {
          newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
        } else {
          newFilters[filterType] = [...newFilters[filterType], value];
        }
      } else {
        newFilters[filterType] = value;
      }
      
      return newFilters;
    });
  };

  // 清除过滤器
  const clearFilters = () => {
    setFilters({
      priceRange: { min: 0, max: 10000 },
      rating: 0,
      brand: [],
      subcategory: [],
      inStock: false,
      prime: false
    });
  };

  // 处理添加到购物车
  const handleAddToCart = (product) => {
    try {
      const savedCart = localStorage.getItem('amazon-cart');
      let currentCart = savedCart ? JSON.parse(savedCart) : [];
      
      const existingItemIndex = currentCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        currentCart[existingItemIndex].quantity += 1;
      } else {
        const cartItem = {
          id: product.id,
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice,
          quantity: 1,
          image: product.images?.[0] || product.image,
          inStock: product.inStock,
          prime: product.delivery?.prime || product.prime || false,
          selectedVariant: {},
          seller: product.seller?.name || product.seller || 'Amazon.com'
        };
        currentCart.push(cartItem);
      }
      
      localStorage.setItem('amazon-cart', JSON.stringify(currentCart));
      setCartItems(currentCart);
      alert(`${product.title} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  // 处理愿望清单
  const handleAddToWishlist = (product) => {
    setWishlistItems(prev => {
      const isInWishlist = prev.some(item => item.id === product.id);
      if (isInWishlist) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  // 检查商品是否在愿望清单中
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
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

  // 如果路由器还没有准备好，显示加载状态
  if (!router.isReady) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-4">Loading...</div>
        </div>
      </div>
    );
  }

  // 如果分类不存在，显示404
  if (router.isReady && categoryId && !currentCategory) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</div>
          <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
          <a
            href="/amazon"
            className="bg-orange-400 hover:bg-orange-500 text-gray-900 px-6 py-3 rounded-lg font-bold transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{currentCategory.name} - Amazon.com</title>
        <meta name="description" content={`Shop ${currentCategory.name} on Amazon.com`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <AmazonHeader cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <a href="/amazon" className="hover:text-orange-600">Home</a>
            <span>/</span>
            <span className="text-gray-900 font-medium">{currentCategory.name}</span>
          </nav>

          {/* Category Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{currentCategory.name}</h1>
            <p className="text-gray-600">
              {filteredProducts.length} results for "{currentCategory.name}"
            </p>
          </div>

          <div className="flex gap-6">
            {/* Sidebar Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 space-y-6`}>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Filters</h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear all
                  </button>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Price</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.priceRange.min}
                        onChange={(e) => handleFilterChange('priceRange', {
                          ...filters.priceRange,
                          min: parseInt(e.target.value) || 0
                        })}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <span>to</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.priceRange.max}
                        onChange={(e) => handleFilterChange('priceRange', {
                          ...filters.priceRange,
                          max: parseInt(e.target.value) || 10000
                        })}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Customer Reviews */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Customer Reviews</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => (
                      <label key={rating} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.rating === rating}
                          onChange={() => handleFilterChange('rating', rating)}
                          className="mr-2"
                        />
                        <div className="flex items-center">
                          {renderRating(rating)}
                          <span className="ml-1 text-sm text-gray-600">& Up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brand */}
                {availableBrands.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Brand</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {availableBrands.map(brand => (
                        <label key={brand} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.brand.includes(brand)}
                            onChange={() => handleFilterChange('brand', brand)}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subcategory */}
                {availableSubcategories.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Category</h4>
                    <div className="space-y-2">
                      {availableSubcategories.map(subcat => (
                        <label key={subcat.id} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.subcategory.includes(subcat.id)}
                            onChange={() => handleFilterChange('subcategory', subcat.id)}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">{subcat.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Filters */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Availability & More</h4>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.inStock}
                        onChange={() => handleFilterChange('inStock', !filters.inStock)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">In Stock</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.prime}
                        onChange={() => handleFilterChange('prime', !filters.prime)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Prime</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden flex items-center text-gray-700 hover:text-gray-900"
                    >
                      <FaFilter className="mr-2" />
                      Filters
                    </button>
                    
                    <div className="flex items-center space-x-2">
                      <FaSort className="text-gray-500" />
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1 text-sm"
                      >
                        {sortOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setLayout('grid')}
                      className={`p-2 rounded ${layout === 'grid' ? 'bg-orange-100 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <FaThLarge />
                    </button>
                    <button
                      onClick={() => setLayout('list')}
                      className={`p-2 rounded ${layout === 'list' ? 'bg-orange-100 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <FaList />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid/List */}
              {filteredProducts.length > 0 ? (
                <div className={layout === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                  : 'space-y-4'
                }>
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      layout={layout}
                      onAddToCart={handleAddToCart}
                      onAddToWishlist={handleAddToWishlist}
                      isInWishlist={isInWishlist(product.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-4">No products found</div>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search terms.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-orange-400 hover:bg-orange-500 text-gray-900 px-6 py-3 rounded-lg font-bold transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CategoryPage;
