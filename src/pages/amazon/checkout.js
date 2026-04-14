import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AmazonHeader from '../../components/amazon/AmazonHeader';
import { 
  FaLock, 
  FaShieldAlt, 
  FaTruck, 
  FaCheckCircle,
  FaEdit,
  FaPlus,
  FaCreditCard,
  FaGift,
  FaInfoCircle
} from 'react-icons/fa';
import { users } from '../../data/amazonData';

const CheckoutPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1); // 1: shipping, 2: payment, 3: review
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Demo user data
  const demoUser = users[0];

  // Form states
  const [newAddress, setNewAddress] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [newPayment, setNewPayment] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    billingAddress: 'same'
  });

  const [deliveryOptions] = useState([
    {
      id: 'standard',
      name: 'Standard Delivery',
      description: 'FREE delivery by Tuesday, Dec 17',
      price: 0,
      days: 5
    },
    {
      id: 'fast',
      name: 'Fast Delivery',
      description: 'Delivery by Monday, Dec 16',
      price: 5.99,
      days: 2
    },
    {
      id: 'prime',
      name: 'Prime FREE One-Day Delivery',
      description: 'FREE delivery tomorrow',
      price: 0,
      days: 1,
      prime: true
    }
  ]);

  const [selectedDelivery, setSelectedDelivery] = useState('prime');

  useEffect(() => {
    loadCheckoutData();
  }, []);

  const loadCheckoutData = () => {
    try {
      const savedCart = localStorage.getItem('amazon-cart');
      if (savedCart) {
        const items = JSON.parse(savedCart);
        if (items.length === 0) {
          router.push('/amazon/cart');
          return;
        }
        setCartItems(items);
      } else {
        // Demo cart items
        setCartItems([
          {
            id: 'iphone-15-pro',
            title: 'iPhone 15 Pro 128GB - Natural Titanium',
            price: 999.00,
            quantity: 1,
            image: '/images/amazon/products/electronics/smartphones/iphone-15-pro-1.jpg',
            prime: true
          },
          {
            id: 'macbook-air-m3',
            title: 'Apple MacBook Air 13-inch M3 Chip, 8GB RAM, 256GB SSD - Midnight',
            price: 1299.00,
            quantity: 1,
            image: '/images/amazon/products/electronics/laptops/macbook-air-m3-1.jpg',
            prime: true
          }
        ]);
      }

      // Set default selections
      if (demoUser.addresses.length > 0) {
        setSelectedAddress(demoUser.addresses.find(addr => addr.isDefault) || demoUser.addresses[0]);
      }
      if (demoUser.paymentMethods.length > 0) {
        setSelectedPayment(demoUser.paymentMethods.find(payment => payment.isDefault) || demoUser.paymentMethods[0]);
      }
    } catch (error) {
      console.error('Error loading checkout data:', error);
    }
    setLoading(false);
  };

  // Price calculations
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryOption = deliveryOptions.find(option => option.id === selectedDelivery);
  const shipping = deliveryOption?.price || 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      const newOrderId = `#${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setOrderId(newOrderId);
      setOrderComplete(true);
      setIsProcessing(false);
      
      // Clear cart
      localStorage.removeItem('amazon-cart');
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AmazonHeader cartItemCount={0} />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading checkout...</div>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AmazonHeader cartItemCount={0} />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for your order. Your order {orderId} has been received and is being processed.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800">
                <strong>Estimated Delivery:</strong> {deliveryOption?.description}
              </p>
            </div>
            <div className="space-y-3">
              <Link
                href="/amazon/orders"
                className="inline-block bg-orange-400 hover:bg-orange-500 text-gray-900 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Track Your Order
              </Link>
              <div>
                <Link
                  href="/amazon"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Checkout - Amazon.com</title>
        <meta name="description" content="Complete your Amazon order" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        <AmazonHeader cartItemCount={cartItems.length} />

        {/* Security header */}
        <div className="bg-gray-800 text-white py-2">
          <div className="container mx-auto px-4 flex items-center justify-center">
            <FaLock className="mr-2" />
            <span className="text-sm">Secure Checkout</span>
          </div>
        </div>

        <main className="container mx-auto px-4 py-6">
          {/* Checkout progress */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[
                { step: 1, title: 'Shipping' },
                { step: 2, title: 'Payment' },
                { step: 3, title: 'Review' }
              ].map((item, index) => (
                <div key={item.step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= item.step 
                      ? 'bg-orange-400 text-white' 
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {currentStep > item.step ? (
                      <FaCheckCircle />
                    ) : (
                      item.step
                    )}
                  </div>
                  <span className={`ml-2 ${
                    currentStep >= item.step ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {item.title}
                  </span>
                  {index < 2 && (
                    <div className={`w-12 h-px mx-4 ${
                      currentStep > item.step ? 'bg-orange-400' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main checkout content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Shipping Address */}
              {currentStep >= 1 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-medium text-gray-900">
                      1. Shipping address
                    </h2>
                    {currentStep > 1 && (
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <FaEdit className="inline mr-1" />
                        Change
                      </button>
                    )}
                  </div>

                  {currentStep === 1 ? (
                    <div className="space-y-4">
                      {/* Existing addresses */}
                      <div className="space-y-3">
                        {demoUser.addresses.map((address) => (
                          <label key={address.id} className="block">
                            <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                              selectedAddress?.id === address.id
                                ? 'border-orange-400 bg-orange-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}>
                              <input
                                type="radio"
                                name="address"
                                checked={selectedAddress?.id === address.id}
                                onChange={() => setSelectedAddress(address)}
                                className="sr-only"
                                data-testid={`address-${address.id}`}
                              />
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium text-gray-900">{address.name}</div>
                                  <div className="text-gray-600 text-sm">
                                    {address.addressLine1}
                                    {address.addressLine2 && <>, {address.addressLine2}</>}
                                  </div>
                                  <div className="text-gray-600 text-sm">
                                    {address.city}, {address.state} {address.zipCode}
                                  </div>
                                  <div className="text-gray-600 text-sm">{address.country}</div>
                                </div>
                                {address.isDefault && (
                                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                    Default
                                  </span>
                                )}
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>

                      {/* Delivery options */}
                      <div className="border-t pt-4">
                        <h3 className="font-medium text-gray-900 mb-3">Delivery options</h3>
                        <div className="space-y-2">
                          {deliveryOptions.map((option) => (
                            <label key={option.id} className="block">
                              <div className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                                selectedDelivery === option.id
                                  ? 'border-orange-400 bg-orange-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}>
                                <input
                                  type="radio"
                                  name="delivery"
                                  checked={selectedDelivery === option.id}
                                  onChange={() => setSelectedDelivery(option.id)}
                                  className="sr-only"
                                  data-testid={`delivery-${option.id}`}
                                />
                                <div className="flex justify-between items-center">
                                  <div>
                                    <div className="font-medium text-gray-900 flex items-center">
                                      {option.name}
                                      {option.prime && (
                                        <span className="bg-blue-500 text-white px-2 py-1 text-xs font-bold rounded ml-2">
                                          Prime
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-sm text-gray-600">{option.description}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-medium text-gray-900">
                                      {option.price === 0 ? 'FREE' : `$${option.price.toFixed(2)}`}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => setCurrentStep(2)}
                        disabled={!selectedAddress}
                        className="w-full bg-orange-400 hover:bg-orange-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 py-2 px-4 rounded-lg font-medium transition-colors"
                        data-testid="continue-to-payment"
                      >
                        Continue to payment
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">
                      <div className="font-medium text-gray-900">{selectedAddress?.name}</div>
                      <div>
                        {selectedAddress?.addressLine1}
                        {selectedAddress?.addressLine2 && <>, {selectedAddress.addressLine2}</>}
                      </div>
                      <div>
                        {selectedAddress?.city}, {selectedAddress?.state} {selectedAddress?.zipCode}
                      </div>
                      <div className="mt-2 text-green-600">
                        {deliveryOption?.description}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Payment Method */}
              {currentStep >= 2 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-medium text-gray-900">
                      2. Payment method
                    </h2>
                    {currentStep > 2 && (
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <FaEdit className="inline mr-1" />
                        Change
                      </button>
                    )}
                  </div>

                  {currentStep === 2 ? (
                    <div className="space-y-4">
                      {/* Existing payment methods */}
                      <div className="space-y-3">
                        {demoUser.paymentMethods.map((payment) => (
                          <label key={payment.id} className="block">
                            <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                              selectedPayment?.id === payment.id
                                ? 'border-orange-400 bg-orange-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}>
                              <input
                                type="radio"
                                name="payment"
                                checked={selectedPayment?.id === payment.id}
                                onChange={() => setSelectedPayment(payment)}
                                className="sr-only"
                                data-testid={`payment-${payment.id}`}
                              />
                              <div className="flex items-center">
                                <FaCreditCard className="text-gray-400 mr-3" />
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {payment.brand} ending in {payment.cardNumber.slice(-4)}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Expires {payment.expiryMonth}/{payment.expiryYear}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {payment.cardholderName}
                                  </div>
                                </div>
                                {payment.isDefault && (
                                  <span className="ml-auto bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                    Default
                                  </span>
                                )}
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>

                      <button
                        onClick={() => setCurrentStep(3)}
                        disabled={!selectedPayment}
                        className="w-full bg-orange-400 hover:bg-orange-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 py-2 px-4 rounded-lg font-medium transition-colors"
                        data-testid="continue-to-review"
                      >
                        Continue to review
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center">
                        <FaCreditCard className="text-gray-400 mr-2" />
                        <span>
                          {selectedPayment?.brand} ending in {selectedPayment?.cardNumber.slice(-4)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Review Order */}
              {currentStep >= 3 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-4">
                    3. Review your order
                  </h2>

                  <div className="space-y-4">
                    {/* Order items */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Items to be delivered</h3>
                      <div className="space-y-3">
                        {cartItems.map((item, index) => (
                          <div key={item.id} className="flex space-x-4 border-b border-gray-100 pb-3 last:border-b-0">
                            <img
                              src={item.image || '/images/placeholder-product.jpg'}
                              alt={item.title}
                              className="w-16 h-16 object-contain"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{item.title}</div>
                              <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                              <div className="text-lg font-bold text-gray-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Gift options */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <FaGift className="mr-2 text-orange-500" />
                        <span className="text-sm text-gray-700">
                          This order contains a gift
                        </span>
                      </label>
                    </div>

                    {/* Place order button */}
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 py-3 px-4 rounded-lg font-medium transition-colors"
                      data-testid="place-order"
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                          Processing order...
                        </div>
                      ) : (
                        'Place your order'
                      )}
                    </button>

                    {/* Order terms */}
                    <div className="text-xs text-gray-600 text-center">
                      By placing your order, you agree to Amazon's{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-800">privacy notice</a> and{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-800">conditions of use</a>.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order summary sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items ({cartItems.length}):</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping & handling:</span>
                      <span className="font-medium">
                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total before tax:</span>
                      <span className="font-medium">${(subtotal + shipping).toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated tax:</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    
                    <hr />
                    
                    <div className="flex justify-between text-lg">
                      <span className="font-medium text-red-600">Order total:</span>
                      <span className="font-bold text-red-600">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Security badges */}
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaShieldAlt className="mr-2 text-green-500" />
                      <span>Secure transaction</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaTruck className="mr-2 text-blue-500" />
                      <span>FREE returns</span>
                    </div>
                  </div>

                  {/* Delivery estimate */}
                  {selectedDelivery && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                      <div className="text-sm font-medium text-green-800">
                        Delivery Estimate
                      </div>
                      <div className="text-sm text-green-700">
                        {deliveryOption?.description}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CheckoutPage; 