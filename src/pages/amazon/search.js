import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import AmazonHeader from '../../components/amazon/AmazonHeader';
import ProductCard from '../../components/amazon/ProductCard';
import { 
  FaFilter, 
  FaThLarge, 
  FaList, 
  FaSort,
  FaStar,
  FaCheck,
  FaTimes,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import { 
  products, 
  categories, 
  searchProducts, 
  getProductsByCategory,
  brands
} from '../../data/amazonData';

const AmazonSearchPage = () => {
  const router = useRouter();
  const { q: query, category: categoryFilter } = router.query;

  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(16);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // 筛选器状态
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 2000 },
    brands: [],
    rating: 0,
    primeOnly: false,
    freeShipping: false,
    inStock: false
  });

  const [showFilters, setShowFilters] = useState(false);
  const [expandedFilterSections, setExpandedFilterSections] = useState({
    price: true,
    brand: true,
    rating: true,
    shipping: true
  });

  // 排序选项
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest Arrivals' }
  ];

  useEffect(() => {
    performSearch();
  }, [query, categoryFilter]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [searchResults, filters, sortBy, currentPage]);

  // 执行搜索
  const performSearch = () => {
    setLoading(true);
    
    let results = [];
    
    if (query) {
      // 文本搜索
      results = searchProducts(query);
    } else if (categoryFilter && categoryFilter !== 'all') {
      // 分类筛选
      results = getProductsByCategory(categoryFilter);
    } else {
      // 显示所有商品
      results = [...products];
    }

    setSearchResults(results);
    setCurrentPage(1);
    setLoading(false);
  };

  // 应用筛选器和排序
  const applyFiltersAndSort = () => {
    let filtered = [...searchResults];

    // 价格筛选
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange.min && 
      product.price <= filters.priceRange.max
    );

    // 品牌筛选
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => 
        filters.brands.includes(product.brand)
      );
    }

    // 评分筛选
    if (filters.rating > 0) {
      filtered = filtered.filter(product => 
        product.rating >= filters.rating
      );
    }

    // Prime筛选
    if (filters.primeOnly) {
      filtered = filtered.filter(product => 
        product.delivery?.prime
      );
    }

    // 免费配送筛选
    if (filters.freeShipping) {
      filtered = filtered.filter(product => 
        product.delivery?.freeShipping
      );
    }

    // 库存筛选
    if (filters.inStock) {
      filtered = filtered.filter(product => 
        product.inStock
      );
    }

    // 排序
    switch (sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // 假设根据ID排序（较新的产品有较大的ID）
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        // 保持相关性排序（默认顺序）
        break;
    }

    setFilteredResults(filtered);
  };

  // 处理筛选器更新
  const updateFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
  };

  // 切换筛选器展开状态
  const toggleFilterSection = (section) => {
    setExpandedFilterSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // 清除筛选器
  const clearFilters = () => {
    setFilters({
      priceRange: { min: 0, max: 2000 },
      brands: [],
      rating: 0,
      primeOnly: false,
      freeShipping: false,
      inStock: false
    });
  };

  // 添加到购物车
  const handleAddToCart = (product) => {
    try {
      // 从localStorage获取当前购物车
      const savedCart = localStorage.getItem('amazon-cart');
      let currentCart = savedCart ? JSON.parse(savedCart) : [];
      
      // 检查商品是否已在购物车中
      const existingItemIndex = currentCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // 如果商品已存在，增加数量
        currentCart[existingItemIndex].quantity += 1;
      } else {
        // 如果商品不存在，添加新商品
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

  // 检查是否在愿望清单中
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  // 分页
  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = filteredResults.slice(startIndex, endIndex);

  // 获取品牌列表
  const availableBrands = [...new Set(searchResults.map(product => product.brand))];

  return (
    <>
      <Head>
        <title>
          {query ? `"${query}" - Amazon.com` : categoryFilter ? `${categoryFilter} - Amazon.com` : 'Amazon.com'}
        </title>
        <meta name="description" content="Search results on Amazon.com" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        <AmazonHeader cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />

        <main className="container mx-auto px-4 py-6">
          {/* 搜索结果标题 */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {query ? (
                    <>Results for "<span className="text-orange-600">{query}</span>"</>
                  ) : categoryFilter ? (
                    <>Products in {categories.find(cat => cat.id === categoryFilter)?.name || categoryFilter}</>
                  ) : (
                    'All Products'
                  )}
                </h1>
                <p className="text-gray-600 mt-1">
                  {loading ? 'Searching...' : `${filteredResults.length} results`}
                </p>
              </div>

              {/* 视图和排序控制 */}
              <div className="flex items-center space-x-4">
                {/* 筛选器切换 */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden bg-white border border-gray-300 px-4 py-2 rounded-lg flex items-center"
                >
                  <FaFilter className="mr-2" />
                  Filters
                </button>

                {/* 视图切换 */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setLayout('grid')}
                    className={`p-2 ${layout === 'grid' ? 'bg-orange-400 text-white' : 'bg-white text-gray-600'}`}
                    data-testid="grid-view-button"
                  >
                    <FaThLarge />
                  </button>
                  <button
                    onClick={() => setLayout('list')}
                    className={`p-2 ${layout === 'list' ? 'bg-orange-400 text-white' : 'bg-white text-gray-600'}`}
                    data-testid="list-view-button"
                  >
                    <FaList />
                  </button>
                </div>

                {/* 排序 */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-300 px-4 py-2 rounded-lg"
                  data-testid="sort-select"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            {/* 侧边栏筛选器 */}
            <div className={`w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear all
                  </button>
                </div>

                {/* 价格筛选 */}
                <div className="mb-6">
                  <button
                    onClick={() => toggleFilterSection('price')}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
                  >
                    Price
                    {expandedFilterSections.price ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {expandedFilterSections.price && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.priceRange.min}
                          onChange={(e) => updateFilter('priceRange', {
                            ...filters.priceRange,
                            min: parseInt(e.target.value) || 0
                          })}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                          data-testid="price-min-input"
                        />
                        <span>to</span>
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.priceRange.max}
                          onChange={(e) => updateFilter('priceRange', {
                            ...filters.priceRange,
                            max: parseInt(e.target.value) || 2000
                          })}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                          data-testid="price-max-input"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 品牌筛选 */}
                <div className="mb-6">
                  <button
                    onClick={() => toggleFilterSection('brand')}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
                  >
                    Brand
                    {expandedFilterSections.brand ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {expandedFilterSections.brand && (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {availableBrands.map(brand => (
                        <label key={brand} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.brands.includes(brand)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                updateFilter('brands', [...filters.brands, brand]);
                              } else {
                                updateFilter('brands', filters.brands.filter(b => b !== brand));
                              }
                            }}
                            className="mr-2"
                            data-testid={`brand-filter-${brand.toLowerCase().replace(/\s+/g, '-')}`}
                          />
                          <span className="text-sm">{brand}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* 评分筛选 */}
                <div className="mb-6">
                  <button
                    onClick={() => toggleFilterSection('rating')}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
                  >
                    Customer Rating
                    {expandedFilterSections.rating ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {expandedFilterSections.rating && (
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map(rating => (
                        <label key={rating} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="rating"
                            checked={filters.rating === rating}
                            onChange={() => updateFilter('rating', rating)}
                            className="mr-2"
                            data-testid={`rating-filter-${rating}`}
                          />
                          <div className="flex items-center">
                            {[...Array(5)].map((_, index) => (
                              <FaStar
                                key={index}
                                className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
                                size={12}
                              />
                            ))}
                            <span className="ml-1 text-sm">& up</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* 配送筛选 */}
                <div className="mb-6">
                  <button
                    onClick={() => toggleFilterSection('shipping')}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
                  >
                    Shipping & Availability
                    {expandedFilterSections.shipping ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {expandedFilterSections.shipping && (
                    <div className="space-y-2">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.primeOnly}
                          onChange={(e) => updateFilter('primeOnly', e.target.checked)}
                          className="mr-2"
                          data-testid="prime-filter"
                        />
                        <span className="text-sm">Prime</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.freeShipping}
                          onChange={(e) => updateFilter('freeShipping', e.target.checked)}
                          className="mr-2"
                          data-testid="free-shipping-filter"
                        />
                        <span className="text-sm">FREE Shipping</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.inStock}
                          onChange={(e) => updateFilter('inStock', e.target.checked)}
                          className="mr-2"
                          data-testid="in-stock-filter"
                        />
                        <span className="text-sm">In Stock</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 搜索结果 */}
            <div className="flex-1">
              {loading ? (
                <div className="text-center py-12">
                  <div className="text-gray-600">Loading...</div>
                </div>
              ) : currentResults.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-600 text-lg">No products found</div>
                  <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
                </div>
              ) : (
                <>
                  {/* 结果网格 */}
                  <div className={
                    layout === 'grid' 
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                      : 'space-y-4'
                  }>
                    {currentResults.map(product => (
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

                  {/* 分页 */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-12 space-x-2">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      
                      {[...Array(Math.min(totalPages, 7))].map((_, index) => {
                        let pageNumber;
                        if (totalPages <= 7) {
                          pageNumber = index + 1;
                        } else if (currentPage <= 4) {
                          pageNumber = index + 1;
                        } else if (currentPage >= totalPages - 3) {
                          pageNumber = totalPages - 6 + index;
                        } else {
                          pageNumber = currentPage - 3 + index;
                        }

                        return (
                          <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`px-3 py-2 border border-gray-300 rounded ${
                              currentPage === pageNumber 
                                ? 'bg-orange-400 text-white border-orange-400' 
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AmazonSearchPage; 