import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AmazonHeader from '../../components/amazon/AmazonHeader';
import ProductCard from '../../components/amazon/ProductCard';
import { 
  FaFire, 
  FaBolt,
  FaTags,
  FaGift,
  FaShippingFast,
  FaArrowRight
} from 'react-icons/fa';
import { 
  categories, 
  products, 
  getFeaturedDeals, 
  getProductsByCategory 
} from '../../data/amazonData';

const AmazonHomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [dealProducts, setDealProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // 静态横幅数据 - 只显示一个主要横幅
  const banner = {
    id: 1,
    title: 'Welcome to Amazon',
    subtitle: 'Discover millions of products with great deals',
    image: '/images/amazon/banners/main-banner.jpg',
    cta: 'Start Shopping',
    link: '/amazon/category/electronics',
    bgColor: 'bg-gradient-to-r from-blue-600 to-blue-800'
  };

  // 快捷分类
  const quickCategories = [
    { id: 'electronics', name: 'Electronics', icon: '📱', color: 'bg-blue-100 text-blue-800' },
    { id: 'books', name: 'Books', icon: '📚', color: 'bg-green-100 text-green-800' },
    { id: 'home-garden', name: 'Home & Garden', icon: '🏠', color: 'bg-orange-100 text-orange-800' },
    { id: 'clothing', name: 'Fashion', icon: '👔', color: 'bg-purple-100 text-purple-800' },
    { id: 'sports', name: 'Sports', icon: '⚽', color: 'bg-red-100 text-red-800' }
  ];

  useEffect(() => {
    // 获取特色商品
    const featured = products.slice(0, 8);
    setFeaturedProducts(featured);

    // 获取促销商品
    const deals = products.filter(product => 
      product.originalPrice && product.originalPrice > product.price
    ).slice(0, 6);
    setDealProducts(deals);

    // 不再自动轮播，保持显示第一个横幅
    // const interval = setInterval(() => {
    //   setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    // }, 5000);

    // return () => clearInterval(interval);
  }, []);

  // 处理添加到购物车
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
      
      // 显示成功提示
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

  return (
    <>
      <Head>
        <title>Amazon.com: Online Shopping for Electronics, Apparel, Computers, Books, DVDs & more</title>
        <meta name="description" content="Online shopping from a great selection at Amazon.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <AmazonHeader cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />

        {/* Main Content */}
        <main>
          {/* Hero Banner Section - 静态显示 */}
          <section className="relative h-96 overflow-hidden">
            <div className={`w-full h-full ${banner.bgColor}`}>
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl text-white">
                  <h1 className="text-5xl font-bold mb-4">{banner.title}</h1>
                  <p className="text-xl mb-8">{banner.subtitle}</p>
                  <Link
                    href={banner.link}
                    className="bg-orange-400 hover:bg-orange-500 text-gray-900 px-8 py-3 rounded-lg font-bold text-lg transition-colors inline-flex items-center"
                    data-testid={`banner-cta-${banner.id}`}
                  >
                    {banner.cta}
                    <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Categories */}
          <section className="py-8 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {quickCategories.map(category => (
                  <Link
                    key={category.id}
                    href={`/amazon/category/${category.id}`}
                    className={`${category.color} p-6 rounded-lg text-center hover:shadow-lg transition-shadow`}
                    data-testid={`category-${category.id}`}
                  >
                    <div className="text-4xl mb-2">{category.icon}</div>
                    <h3 className="font-semibold">{category.name}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Today's Deals */}
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <FaBolt className="text-yellow-500 text-2xl mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Today's Deals</h2>
                </div>
                <Link
                  href="/amazon/deals"
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  See all deals
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dealProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    layout="grid"
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                    isInWishlist={isInWishlist(product.id)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Featured Products */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <FaFire className="text-orange-500 text-2xl mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                </div>
                <Link
                  href="/amazon/search"
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  Browse all products
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    layout="grid"
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                    isInWishlist={isInWishlist(product.id)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Prime Benefits */}
          <section className="py-12 bg-blue-600 text-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Join Amazon Prime</h2>
                <p className="text-xl">Fast, FREE delivery and exclusive deals</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <FaShippingFast className="text-4xl mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                  <p>FREE One-Day and Two-Day delivery on millions of items</p>
                </div>
                <div className="text-center">
                  <FaTags className="text-4xl mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Exclusive Deals</h3>
                  <p>Access to Prime Day and Lightning Deals before everyone else</p>
                </div>
                <div className="text-center">
                  <FaGift className="text-4xl mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">More Benefits</h3>
                  <p>Prime Video, Prime Music, and unlimited photo storage</p>
                </div>
              </div>

              <div className="text-center mt-8">
                <Link
                  href="/amazon/prime"
                  className="bg-orange-400 hover:bg-orange-500 text-gray-900 px-8 py-3 rounded-lg font-bold text-lg transition-colors inline-block"
                  data-testid="join-prime-button"
                >
                  Try Prime FREE for 30 days
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Get to Know Us</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">About Amazon</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Investor Relations</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Make Money with Us</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white">Sell products on Amazon</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Sell on Amazon Business</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Sell apps on Amazon</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Become an Affiliate</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Amazon Payment Products</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white">Amazon Business Card</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Shop with Points</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Reload Your Balance</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Amazon Currency Converter</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Let Us Help You</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white">Amazon and COVID-19</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Your Account</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Your Orders</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Shipping Rates & Policies</a></li>
                </ul>
              </div>
            </div>

            <hr className="border-gray-700 my-8" />

            <div className="text-center">
              <div className="text-2xl font-bold mb-4">
                amazon<span className="text-orange-400">.com</span>
              </div>
              <p className="text-gray-400">
                © 2024 Amazon.com, Inc. or its affiliates. This is a demo site for evaluation purposes.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AmazonHomePage; 