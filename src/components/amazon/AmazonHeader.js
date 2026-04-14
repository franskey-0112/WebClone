import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  FaSearch, 
  FaShoppingCart, 
  FaUser, 
  FaBars, 
  FaMapMarkerAlt,
  FaChevronDown,
  FaTimes
} from 'react-icons/fa';
import { categories, searchSuggestions } from '../../data/amazonData';

const AmazonHeader = ({ cartItemCount = 0 }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchInputRef = useRef(null);

  // 处理搜索建议
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8);
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // 处理搜索提交
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/amazon/search?q=${encodeURIComponent(searchQuery.trim())}&category=${selectedCategory}`);
      setShowSuggestions(false);
      searchInputRef.current?.blur();
    }
  };

  // 处理建议点击
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    router.push(`/amazon/search?q=${encodeURIComponent(suggestion)}&category=${selectedCategory}`);
  };

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      {/* Main header */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/amazon" className="flex items-center">
              <div className="text-2xl font-bold text-white hover:text-orange-400 transition-colors">
                amazon
                <span className="text-orange-400">.com</span>
              </div>
            </Link>

            {/* Delivery location */}
            <div className="hidden lg:flex items-center text-sm">
              <FaMapMarkerAlt className="text-white mr-1" />
              <div>
                <div className="text-gray-300 text-xs">Deliver to</div>
                <div className="font-bold">New York 10001</div>
              </div>
            </div>

            {/* Search bar */}
            <div className="flex-1 max-w-3xl mx-4 relative">
              <form onSubmit={handleSearch} className="flex">
                {/* Category selector */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-gray-200 text-gray-900 px-3 py-2 rounded-l-md border-r border-gray-300 focus:outline-none h-10"
                    data-testid="category-selector"
                  >
                    <option value="all">All Departments</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search input */}
                <div className="flex-1 relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery && setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder="Search Amazon"
                    className="w-full px-4 py-2 text-gray-900 focus:outline-none h-10"
                    data-testid="search-input"
                  />

                  {/* Search suggestions */}
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 shadow-lg z-50">
                      {filteredSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-4 py-2 text-gray-900 hover:bg-gray-100 cursor-pointer flex items-center"
                        >
                          <FaSearch className="text-gray-400 mr-3" />
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Search button */}
                <button
                  type="submit"
                  className="bg-orange-400 hover:bg-orange-500 px-4 py-2 rounded-r-md transition-colors h-10"
                  data-testid="search-button"
                >
                  <FaSearch className="text-gray-900" />
                </button>
              </form>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-6">
              {/* Language selector */}
              <div className="hidden lg:flex items-center text-sm">
                <span className="text-white">EN</span>
                <FaChevronDown className="ml-1 text-xs" />
              </div>

              {/* Account */}
              <Link href="/amazon/account" className="hidden lg:flex flex-col text-sm hover:text-orange-400">
                <span className="text-xs">Hello, Sign in</span>
                <span className="font-bold flex items-center">
                  Account & Lists
                  <FaChevronDown className="ml-1 text-xs" />
                </span>
              </Link>

              {/* Orders */}
              <Link href="/amazon/orders" className="hidden lg:flex flex-col text-sm hover:text-orange-400">
                <span className="text-xs">Returns</span>
                <span className="font-bold">& Orders</span>
              </Link>

              {/* Cart */}
              <Link href="/amazon/cart" className="flex items-center hover:text-orange-400 relative">
                <div className="relative">
                  <FaShoppingCart className="text-2xl" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-400 text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cartItemCount > 9 ? '9+' : cartItemCount}
                    </span>
                  )}
                </div>
                <span className="ml-2 font-bold hidden lg:block">Cart</span>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-white hover:text-orange-400"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary navigation */}
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-10 text-sm">
            <button className="flex items-center hover:text-orange-400 mr-6">
              <FaBars className="mr-2" />
              All
            </button>
            
            <div className="hidden lg:flex items-center space-x-6">
              <Link href="/amazon/deals" className="hover:text-orange-400">Today's Deals</Link>
              <Link href="/amazon/customer-service" className="hover:text-orange-400">Customer Service</Link>
              <Link href="/amazon/registry" className="hover:text-orange-400">Registry</Link>
              <Link href="/amazon/gift-cards" className="hover:text-orange-400">Gift Cards</Link>
              <Link href="/amazon/sell" className="hover:text-orange-400">Sell</Link>
            </div>

            <div className="ml-auto hidden lg:block">
              <Link href="/amazon/prime" className="text-orange-400 hover:text-orange-300">
                Prime members get fast & free shipping, plus so much more
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)}>
          <div className="bg-white w-80 h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gray-900 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaUser className="mr-2" />
                  <span className="font-bold">Hello, Sign in</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)}>
                  <FaTimes />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-4">Browse Departments</h3>
              {categories.map(category => (
                <Link 
                  key={category.id}
                  href={`/amazon/category/${category.id}`}
                  className="block py-2 text-gray-700 hover:text-orange-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              
              <hr className="my-4" />
              
              <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
              <Link href="/amazon/account" className="block py-2 text-gray-700 hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>
                Your Account
              </Link>
              <Link href="/amazon/orders" className="block py-2 text-gray-700 hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>
                Your Orders
              </Link>
              <Link href="/amazon/deals" className="block py-2 text-gray-700 hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>
                Today's Deals
              </Link>
              <Link href="/amazon/prime" className="block py-2 text-gray-700 hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>
                Prime
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AmazonHeader; 