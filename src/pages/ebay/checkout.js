import Head from 'next/head';
import { useState, useEffect } from 'react';
import { featuredProducts } from '../../data/ebayData';
import Link from 'next/link';

const EbayCheckout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    // Shipping address (virtual)
    const shippingAddress = {
        name: 'John Smith',
        address1: '1234 Oak Street, Apt 5B',
        city: 'San Francisco, CA 94102',
        country: 'United States',
        phone: '(415) 555-0123'
    };

    useEffect(() => {
        // Load cart items
        try {
            const cartStr = localStorage.getItem('ebay_cart');
            if (cartStr) {
                const cartIds = JSON.parse(cartStr);
                const items = cartIds.map(item => ({
                    ...featuredProducts.find(p => p.id === item.id),
                    quantity: item.quantity || 1
                })).filter(Boolean);
                if (items.length > 0) {
                    setCartItems(items);
                    return;
                }
            }
        } catch (e) {
            console.error("Error loading cart", e);
        }

        // Demo items
        setCartItems([
            { ...featuredProducts[0], quantity: 1 },
        ].filter(Boolean));
    }, []);

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 6.26;
    const total = subtotal + shipping;

    const handleConfirmPay = () => {
        if (!selectedPayment) {
            alert('Please select a payment method');
            return;
        }
        setIsProcessing(true);
        setTimeout(() => {
            alert('Order placed successfully! (Demo)');
            setIsProcessing(false);
        }, 2000);
    };

    const paymentMethods = [
        { id: 'alipay', name: 'Alipay', icon: '支付宝' },
        { id: 'paypal', name: 'PayPal', icon: 'PayPal' },
        { id: 'card', name: 'Add new card', isCard: true },
        { id: 'googlepay', name: 'Google Pay', icon: 'G Pay' },
        { id: 'paypalcredit', name: 'PayPal Credit', icon: 'PP Credit' },
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-[#333] ebay-scope">
            <Head>
                <title>Checkout | eBay</title>
            </Head>

            {/* Header */}
            <header className="py-6 border-b border-gray-100">
                <div className="max-w-[1100px] mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <Link href="/ebay" className="flex items-center">
                            <span className="text-3xl font-bold">
                                <span className="text-[#e53238]">e</span>
                                <span className="text-[#0064d2]">b</span>
                                <span className="text-[#f5af02]">a</span>
                                <span className="text-[#86b817]">y</span>
                            </span>
                        </Link>
                        <span className="text-2xl text-[#191919] font-light">Checkout</span>
                    </div>
                    <div className="text-sm text-[#767676]">
                        How do you like our checkout? <Link href="#" className="text-[#191919] underline hover:no-underline">Give us feedback</Link>
                    </div>
                </div>
            </header>

            <div className="gh-container py-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {/* Pay with Section */}
                        <section className="mb-10">
                            <h2 className="text-xl font-bold text-[#191919] mb-6">Pay with</h2>
                            <div className="space-y-4">
                                {paymentMethods.map(method => (
                                    <label
                                        key={method.id}
                                        className="flex items-center gap-4 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value={method.id}
                                            checked={selectedPayment === method.id}
                                            onChange={(e) => setSelectedPayment(e.target.value)}
                                            className="w-5 h-5 text-[#3665f3] border-2 border-gray-400"
                                        />
                                        {method.isCard ? (
                                            <div>
                                                <span className="text-sm text-[#191919] underline">Add new card</span>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <span className="inline-block bg-[#1a1f71] text-white text-[8px] font-bold px-1.5 py-0.5 rounded">VISA</span>
                                                    <span className="inline-block bg-[#eb001b] text-white text-[8px] font-bold px-1.5 py-0.5 rounded">MC</span>
                                                    <span className="inline-block bg-[#ff6600] text-white text-[8px] font-bold px-1.5 py-0.5 rounded">AMEX</span>
                                                    <span className="inline-block bg-gray-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">DISC</span>
                                                    <span className="inline-block border border-gray-300 text-gray-600 text-[8px] font-bold px-1.5 py-0.5 rounded">⓵</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span className="inline-block border border-gray-300 rounded px-2 py-1 text-xs font-bold min-w-[50px] text-center">
                                                    {method.icon}
                                                </span>
                                                <span className="text-sm text-[#191919]">{method.name}</span>
                                            </div>
                                        )}
                                    </label>
                                ))}
                            </div>
                        </section>

                        {/* Ship to Section */}
                        <section className="mb-10">
                            <h2 className="text-xl font-bold text-[#191919] mb-4">Ship to</h2>
                            <div className="text-sm text-[#191919] space-y-0.5">
                                <p className="font-medium">{shippingAddress.name}</p>
                                <p>{shippingAddress.address1}</p>
                                <p>{shippingAddress.city}</p>
                                <p>{shippingAddress.country}</p>
                                <p>{shippingAddress.phone}</p>
                            </div>
                            <button className="text-sm text-[#191919] underline hover:no-underline mt-3">
                                Change
                            </button>
                        </section>

                        {/* Review Order Section */}
                        <section>
                            <h2 className="text-xl font-bold text-[#191919] mb-4">Review order</h2>
                            {cartItems.map(item => (
                                <div key={item.id} className="flex items-start gap-4 py-4 border-b border-gray-100">
                                    <div className="w-8 h-8 bg-[#3665f3] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                        {(item.seller?.username || 'V')[0].toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-sm text-[#191919] font-medium">{item.seller?.username || 'VandaSina'}</span>
                                            <span className="text-sm text-[#767676]">·</span>
                                            <Link href="#" className="text-sm text-[#191919] underline hover:no-underline">Add note for seller</Link>
                                        </div>
                                        <p className="text-xs text-[#767676]">{item.seller?.feedback || '100%'} positive feedback</p>
                                    </div>
                                </div>
                            ))}

                            {/* Item Preview */}
                            {cartItems.map(item => (
                                <div key={`preview-${item.id}`} className="flex gap-4 py-4">
                                    <div className="w-[80px] h-[80px] bg-gray-100 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                                        {item.image ? (
                                            <img src={item.image} alt={item.title} className="w-full h-full object-contain p-1" />
                                        ) : (
                                            <span className="text-2xl">📦</span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm text-[#191919] line-clamp-2 mb-1">{item.title}</h3>
                                        <p className="text-sm text-[#767676]">Qty: {item.quantity}</p>
                                        <p className="text-sm font-bold text-[#191919] mt-1">US ${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </section>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="w-full lg:w-[320px] flex-shrink-0">
                        <div className="border border-gray-200 rounded-lg p-5 sticky top-4">
                            <h2 className="text-lg font-bold text-[#191919] mb-4">Order Summary</h2>

                            <div className="space-y-2 mb-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-[#191919]">Item ({cartItems.reduce((s, i) => s + i.quantity, 0)})</span>
                                    <span className="text-[#191919]">US ${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#191919]">Shipping</span>
                                    <span className="text-[#191919]">US ${shipping.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4 mb-4">
                                <div className="flex justify-between items-start">
                                    <span className="font-bold text-[#191919]">Order total</span>
                                    <div className="text-right">
                                        <div className="font-bold text-lg text-[#191919]">US ${total.toFixed(2)}</div>
                                        <div className="text-sm text-[#767676]">RMB {(total * 7.2).toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleConfirmPay}
                                disabled={isProcessing || !selectedPayment}
                                className={`w-full py-3 rounded-full font-bold text-center transition-colors mb-3 ${selectedPayment
                                    ? 'bg-[#3665f3] text-white hover:bg-blue-700'
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {isProcessing ? 'Processing...' : 'Confirm and pay'}
                            </button>

                            {!selectedPayment && (
                                <p className="text-center text-sm text-[#767676] mb-4">Select a payment method</p>
                            )}

                            {/* Money Back Guarantee */}
                            <div className="flex items-start gap-2 pt-2">
                                <div className="w-5 h-5 bg-[#3665f3] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-white text-xs font-bold">$</span>
                                </div>
                                <p className="text-xs text-[#767676]">
                                    Purchase protected by <Link href="#" className="text-[#3665f3] underline hover:no-underline">eBay Money Back Guarantee</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Minimal Footer */}
            <footer className="border-t border-gray-200 py-6 mt-12">
                <div className="max-w-[1100px] mx-auto px-4 text-center text-sm text-[#767676]">
                    Copyright © 2024 eBay Inc. All Rights Reserved.
                </div>
            </footer>
        </div>
    );
};

export default EbayCheckout;
