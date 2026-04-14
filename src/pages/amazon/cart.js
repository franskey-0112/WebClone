import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AmazonHeader from '../../components/amazon/AmazonHeader';
import { 
  FaTrash, 
  FaHeart, 
  FaShieldAlt, 
  FaTruck, 
  FaGift,
  FaPlus,
  FaMinus,
  FaLock,
  FaArrowLeft
} from 'react-icons/fa';

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedForLater, setSavedForLater] = useState([]);
  const [recommendedItems] = useState([
    {
      id: 'rec-1',
      title: 'Frequently bought together',
      items: [
        { id: 'wireless-charger', title: 'Wireless Charger Stand', price: 29.99, image: '/images/amazon/products/electronics/smartphones/samsung-galaxy-s24-1.jpg' },
        { id: 'phone-case', title: 'Clear Phone Case', price: 15.99, image: '/images/amazon/products/electronics/smartphones/iphone-15-pro-2.jpg' }
      ]
    }
  ]);

  // 清理购物车数据格式
  const cleanCartData = (cartData) => {
    if (!Array.isArray(cartData)) {
      return [];
    }
    
    return cartData.map(item => {
      // 确保item是一个对象
      if (!item || typeof item !== 'object') {
        return null;
      }
      
      return {
        ...item,
        // 安全地处理seller字段
        seller: typeof item.seller === 'object' ? item.seller?.name || 'Amazon.com' : item.seller || 'Amazon.com',
        // 安全地处理prime字段
        prime: typeof item.prime === 'object' ? item.prime?.status || false : Boolean(item.prime),
        // 确保数量是数字
        quantity: parseInt(item.quantity) || 1,
        // 确保价格是数字
        price: parseFloat(item.price) || 0,
        originalPrice: parseFloat(item.originalPrice) || parseFloat(item.price) || 0,
        // 确保selectedVariant是对象
        selectedVariant: (item.selectedVariant && typeof item.selectedVariant === 'object') ? item.selectedVariant : {}
      };
    }).filter(Boolean); // 移除null项
  };

  // 从localStorage加载购物车数据
  useEffect(() => {
    const loadCartData = () => {
      try {
        const savedCart = localStorage.getItem('amazon-cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          // 清理数据格式
          const cleanedCart = cleanCartData(parsedCart);
          setCartItems(cleanedCart);
          // 保存清理后的数据
          localStorage.setItem('amazon-cart', JSON.stringify(cleanedCart));
        } else {
          // 如果没有保存的购物车数据，就显示空购物车
          setCartItems([]);
        }
      } catch (error) {
        console.error('Error loading cart data:', error);
        setCartItems([]);
      }
      setLoading(false);
    };

    loadCartData();
  }, []);

  // 保存购物车到localStorage
  const saveCartToStorage = (items) => {
    try {
      // 清理数据格式后再保存
      const cleanedItems = cleanCartData(items);
      localStorage.setItem('amazon-cart', JSON.stringify(cleanedItems));
    } catch (error) {
      console.error('Error saving cart data:', error);
    }
  };

  // 更新商品数量
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    saveCartToStorage(updatedItems);
  };

  // 删除商品
  const removeItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    saveCartToStorage(updatedItems);
  };

  // 移动到稍后购买
  const moveToSaveForLater = (item) => {
    setSavedForLater(prev => [...prev, item]);
    removeItem(item.id);
  };

  // 从稍后购买移回购物车
  const moveToCart = (item) => {
    const updatedItems = [...cartItems, { ...item, quantity: 1 }];
    setCartItems(updatedItems);
    saveCartToStorage(updatedItems);
    setSavedForLater(prev => prev.filter(savedItem => savedItem.id !== item.id));
  };

  // 计算价格
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateSavings = () => {
    return cartItems.reduce((total, item) => {
      const originalPrice = item.originalPrice || item.price;
      return total + ((originalPrice - item.price) * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const savings = calculateSavings();
  const shipping = subtotal > 35 ? 0 : 5.99; // Free shipping over $35
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AmazonHeader cartItemCount={0} />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading cart...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Shopping Cart - Amazon.com</title>
        <meta name="description" content="Your Amazon shopping cart" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        <AmazonHeader cartItemCount={cartItems.length} />

        <main className="container mx-auto px-4 py-6">
          {cartItems.length === 0 ? (
            // Empty cart
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="mb-6">
                <div className="text-6xl text-gray-300 mb-4">🛒</div>
                <h1 className="text-2xl font-medium text-gray-900 mb-2">Your Amazon Cart is empty</h1>
                <p className="text-gray-600">Shop today's deals</p>
              </div>
              <div className="space-y-3">
                <Link
                  href="/amazon"
                  className="inline-block bg-orange-400 hover:bg-orange-500 text-gray-900 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Continue Shopping
                </Link>
                <div>
                  <Link href="/amazon/account" className="text-blue-600 hover:text-blue-800 text-sm">
                    Sign in to your account
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            // Cart with items
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main cart content */}
              <div className="lg:col-span-3 space-y-6">
                {/* Cart header */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-medium text-gray-900" data-testid="cart-title">
                      Shopping Cart
                    </h1>
                    <div className="text-gray-600">
                      {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Price
                  </div>
                </div>

                {/* Cart items */}
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex space-x-4">
                        {/* Product image */}
                        <div className="flex-shrink-0 w-32 h-32">
                          <Link href={`/amazon/product/${item.id}`}>
                            <img
                              src={item.image || '/images/placeholder-product.jpg'}
                              alt={item.title}
                              className="w-full h-full object-contain cursor-pointer"
                              data-testid={`cart-item-image-${index}`}
                            />
                          </Link>
                        </div>

                        {/* Product details */}
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div className="flex-1">
                              <Link 
                                href={`/amazon/product/${item.id}`}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                                data-testid={`cart-item-title-${index}`}
                              >
                                {item.title}
                              </Link>
                              
                              {item.inStock ? (
                                <div className="text-green-600 text-sm mt-1">In Stock</div>
                              ) : (
                                <div className="text-red-600 text-sm mt-1">Currently unavailable</div>
                              )}

                              {item.prime && (
                                <div className="flex items-center mt-2">
                                  <div className="bg-blue-500 text-white px-2 py-1 text-xs font-bold rounded mr-2">
                                    Prime
                                  </div>
                                  <span className="text-sm text-gray-600">
                                    FREE One-Day Delivery
                                  </span>
                                </div>
                              )}

                              {/* Variant information */}
                              {item.selectedVariant && (
                                <div className="mt-2 text-sm text-gray-600">
                                  {Object.entries(item.selectedVariant).map(([key, value]) => (
                                    <span key={key} className="mr-4">
                                      {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                                    </span>
                                  ))}
                                </div>
                              )}

                              <div className="text-sm text-gray-600 mt-1">
                                Sold by {typeof item.seller === 'object' ? item.seller?.name || 'Amazon.com' : item.seller || 'Amazon.com'}
                              </div>

                              {/* Action buttons */}
                              <div className="flex items-center space-x-6 mt-4">
                                {/* Quantity selector */}
                                <div className="flex items-center">
                                  <label className="text-sm text-gray-600 mr-2">Qty:</label>
                                  <div className="flex items-center border border-gray-300 rounded">
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      className="px-2 py-1 hover:bg-gray-100"
                                      data-testid={`decrease-quantity-${index}`}
                                    >
                                      <FaMinus size={10} />
                                    </button>
                                    <span className="px-3 py-1 text-center min-w-[3rem]">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      className="px-2 py-1 hover:bg-gray-100"
                                      data-testid={`increase-quantity-${index}`}
                                    >
                                      <FaPlus size={10} />
                                    </button>
                                  </div>
                                </div>

                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-blue-600 hover:text-blue-800 text-sm"
                                  data-testid={`delete-item-${index}`}
                                >
                                  Delete
                                </button>

                                <button
                                  onClick={() => moveToSaveForLater(item)}
                                  className="text-blue-600 hover:text-blue-800 text-sm"
                                  data-testid={`save-for-later-${index}`}
                                >
                                  Save for later
                                </button>

                                <button className="text-blue-600 hover:text-blue-800 text-sm">
                                  <FaHeart className="inline mr-1" />
                                  Add to Wish List
                                </button>
                              </div>
                            </div>

                            {/* Price */}
                            <div className="text-right ml-4">
                              <div className="text-lg font-bold text-gray-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                              {item.originalPrice && item.originalPrice > item.price && (
                                <div className="text-sm text-gray-500 line-through">
                                  ${(item.originalPrice * item.quantity).toFixed(2)}
                                </div>
                              )}
                              <div className="text-sm text-gray-600">
                                ${item.price.toFixed(2)} each
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="text-right">
                    <div className="text-lg">
                      Subtotal ({cartItems.reduce((total, item) => total + item.quantity, 0)} items): 
                      <span className="font-bold ml-2">${subtotal.toFixed(2)}</span>
                    </div>
                    {savings > 0 && (
                      <div className="text-sm text-green-600">
                        You saved ${savings.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Save for later */}
                {savedForLater.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Saved for later ({savedForLater.length} {savedForLater.length === 1 ? 'item' : 'items'})
                    </h2>
                    <div className="space-y-4">
                      {savedForLater.map((item, index) => (
                        <div key={item.id} className="flex space-x-4 border-b border-gray-100 pb-4 last:border-b-0">
                          <div className="w-20 h-20">
                            <img
                              src={item.image || '/images/placeholder-product.jpg'}
                              alt={item.title}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{item.title}</div>
                            <div className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</div>
                            <div className="flex space-x-4 mt-2">
                              <button
                                onClick={() => moveToCart(item)}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                              >
                                Move to Cart
                              </button>
                              <button className="text-blue-600 hover:text-blue-800 text-sm">
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended items */}
                {recommendedItems.map((recommendation, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      {recommendation.title}
                    </h2>
                    <div className="flex space-x-4 overflow-x-auto">
                      {recommendation.items.map((item, itemIndex) => (
                        <div key={item.id} className="flex-shrink-0 w-48 border border-gray-200 rounded-lg p-4">
                          <img
                            src={item.image || '/images/placeholder-product.jpg'}
                            alt={item.title}
                            className="w-full h-32 object-contain mb-2"
                          />
                          <div className="text-sm font-medium text-gray-900 mb-1">
                            {item.title}
                          </div>
                          <div className="text-lg font-bold text-gray-900 mb-2">
                            ${item.price.toFixed(2)}
                          </div>
                          <button className="w-full bg-orange-400 hover:bg-orange-500 text-gray-900 px-3 py-1 rounded text-sm font-medium transition-colors">
                            Add to Cart
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-20">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="space-y-4">
                      {/* Proceed to checkout */}
                      <button
                        onClick={() => router.push('/amazon/checkout')}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 px-4 rounded-lg font-medium transition-colors"
                        data-testid="proceed-to-checkout"
                      >
                        Proceed to checkout
                      </button>

                      {/* EMI option */}
                      <div className="text-sm text-center">
                        <button className="text-blue-600 hover:text-blue-800">
                          EMI Available
                        </button>
                      </div>

                      <hr />

                      {/* Order summary */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Subtotal:</span>
                          <span className="text-sm font-medium">${subtotal.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Shipping:</span>
                          <span className="text-sm font-medium">
                            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Estimated tax:</span>
                          <span className="text-sm font-medium">${tax.toFixed(2)}</span>
                        </div>

                        {savings > 0 && (
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-green-600">You save:</span>
                            <span className="text-sm font-medium text-green-600">-${savings.toFixed(2)}</span>
                          </div>
                        )}

                        <hr className="my-3" />

                        <div className="flex justify-between items-center">
                          <span className="text-lg font-medium text-gray-900">Order total:</span>
                          <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
                        </div>
                      </div>

                      <hr />

                      {/* Gift options */}
                      <div>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm text-gray-700">
                            This order contains a gift
                          </span>
                        </label>
                      </div>

                      {/* Security notice */}
                      <div className="flex items-center text-xs text-gray-600">
                        <FaLock className="mr-1" />
                        <span>Secure transaction</span>
                      </div>

                      {/* Prime benefits */}
                      <div className="bg-blue-50 p-3 rounded">
                        <div className="text-sm font-medium text-blue-900 mb-1">
                          Prime benefits on this order:
                        </div>
                        <ul className="text-xs text-blue-700 space-y-1">
                          <li className="flex items-center">
                            <FaTruck className="mr-1" />
                            FREE One-Day Delivery
                          </li>
                          <li className="flex items-center">
                            <FaShieldAlt className="mr-1" />
                            Prime returns
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Continue shopping */}
          <div className="mt-8 text-center">
            <Link
              href="/amazon"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <FaArrowLeft className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default CartPage; 