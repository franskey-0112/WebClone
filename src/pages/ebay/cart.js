import Head from 'next/head';
import { useState, useEffect } from 'react';
import EbayHeader from '../../components/ebay/EbayHeader';
import EbayFooter from '../../components/ebay/EbayFooter';
import { featuredProducts } from '../../data/ebayData';
import Link from 'next/link';

const EbayCart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Load cart from localStorage or use demo items
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

        // Demo cart items if empty
        setCartItems([
            { ...featuredProducts[0], quantity: 1 },
        ].filter(Boolean));
    }, []);

    const updateQuantity = (id, newQty) => {
        if (newQty < 1) return;
        setCartItems(items => {
            const newItems = items.map(item =>
                item.id === id ? { ...item, quantity: newQty } : item
            );
            const storageItems = newItems.map(i => ({ id: i.id, quantity: i.quantity }));
            localStorage.setItem('ebay_cart', JSON.stringify(storageItems));
            window.dispatchEvent(new Event('cartUpdated'));
            return newItems;
        });
    };

    const removeItem = (id) => {
        setCartItems(items => {
            const newItems = items.filter(item => item.id !== id);
            const storageItems = newItems.map(i => ({ id: i.id, quantity: i.quantity }));
            localStorage.setItem('ebay_cart', JSON.stringify(storageItems));
            window.dispatchEvent(new Event('cartUpdated'));
            return newItems;
        });
    };

    const saveForLater = (id) => {
        // Implement save for later
        alert('Saved for later! (Demo)');
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 6.26;
    const total = subtotal + shipping;

    // Recommended items
    const recommendedItems = featuredProducts.filter(p => !cartItems.find(c => c.id === p.id)).slice(0, 5);

    return (
        <div className="min-h-screen bg-white font-sans text-[#333] ebay-scope">
            <Head>
                <title>Shopping Cart | eBay</title>
            </Head>
            <EbayHeader hideNavItems={true} />

            <div className="gh-container py-2">
                {/* Cart Title */}
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-[#191919]">Cart</h1>
                    <Link href="#" className="text-sm text-[#3665f3] hover:underline">Send Us Your Comments</Link>
                </div>

                {cartItems.length === 0 ? (
                    <div className="text-center py-16">
                        <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h2 className="text-xl font-bold text-[#191919] mb-2">Your cart is empty</h2>
                        <p className="text-[#767676] mb-6">Looks like you haven&apos;t added anything to your cart yet.</p>
                        <Link href="/ebay" className="inline-block bg-[#3665f3] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors">
                            Start shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items */}
                        <div className="flex-1 min-w-0">
                            <div className="border border-gray-200 rounded-2xl p-6 mb-6">
                                {cartItems.map((item, index) => (
                                    <div key={item.id} className={index > 0 ? 'pt-5 mt-5 border-t border-gray-200' : ''}>
                                        {/* Seller Info */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <Link href={`/ebay/str/${item.seller?.username || 'VandaSina'}`} className="text-[#3665f3] font-medium text-sm hover:underline">
                                                    {item.seller?.username || 'VandaSina'}
                                                </Link>
                                                <p className="text-xs text-[#767676]">{item.seller?.feedback || '100%'} positive feedback</p>
                                            </div>
                                        </div>

                                        {/* Product Row */}
                                        <div className="flex gap-4">
                                            {/* Product Image */}
                                            <Link href={`/ebay/itm/${item.id}`} className="w-[120px] h-[120px] bg-white flex-shrink-0 flex items-center justify-center overflow-hidden">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                                                ) : (
                                                    <span className="text-3xl">📦</span>
                                                )}
                                            </Link>

                                            {/* Product Details */}
                                            <div className="flex-1 min-w-0">
                                                {/* Sold Badge */}
                                                <span className="inline-block bg-[#e5f0ff] text-[#3665f3] text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 uppercase">
                                                    358 SOLD
                                                </span>

                                                {/* Product Title - Black underlined link */}
                                                <Link href={`/ebay/itm/${item.id}`} className="block text-[#191919] underline hover:no-underline text-sm mb-1 line-clamp-2">
                                                    {item.title}
                                                </Link>

                                                <p className="text-sm text-[#767676] mb-0.5">{item.condition || 'New without box'}</p>
                                                <p className="text-sm text-[#767676] mb-2">C175-Black, 11cm(0-6months)</p>

                                                {/* Prices */}
                                                <div className="mb-0.5">
                                                    <span className="text-base font-bold text-[#191919]">US ${item.price.toFixed(2)}</span>
                                                </div>
                                                <p className="text-sm text-[#767676] mb-2">(RMB {(item.price * 7.2).toFixed(2)})</p>

                                                {/* Shipping */}
                                                <p className="text-sm text-[#191919]">+ US $6.26</p>
                                                <p className="text-sm text-[#767676] mb-1">(RMB 43.59)</p>
                                                <p className="text-sm text-[#767676]">eBay SpeedPAK Economy</p>
                                                <p className="text-sm text-[#767676] mb-4">Returns accepted</p>

                                                {/* Quantity & Actions Row */}
                                                <div className="flex items-center justify-between">
                                                    {/* Quantity Selector */}
                                                    <div className="flex items-center border border-gray-300 rounded">
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="p-2 hover:bg-gray-100 transition-colors border-r border-gray-300"
                                                        >
                                                            <svg className="w-4 h-4 text-[#767676]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                        <span className="px-4 py-2 text-sm text-center min-w-[40px]">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-2 hover:bg-gray-100 transition-colors border-l border-gray-300"
                                                        >
                                                            <svg className="w-4 h-4 text-[#767676]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    {/* Action Links */}
                                                    <div className="flex items-center gap-4">
                                                        <button onClick={() => saveForLater(item.id)} className="text-xs text-[#191919] underline hover:no-underline font-medium">
                                                            Save for later
                                                        </button>
                                                        <button onClick={() => removeItem(item.id)} className="text-xs text-[#191919] underline hover:no-underline font-medium">
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Promo Text */}
                            <div className="mb-8">
                                <p className="text-sm font-medium text-[#191919]">Save up to 10% when you buy more</p>
                                <Link href="#" className="text-sm text-[#3665f3] hover:underline">Increase your item quantity to qualify</Link>
                            </div>

                            {/* These are for you - Recommended Section */}
                            <div className="mt-8">
                                <h2 className="text-xl font-bold text-[#191919] mb-1">These are for you</h2>
                                <p className="text-sm text-[#767676] mb-4">Sponsored</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                    {recommendedItems.map(item => (
                                        <Link key={item.id} href={`/ebay/itm/${item.id}`} className="group">
                                            <div className="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-contain p-2" />
                                                ) : (
                                                    <span className="text-3xl">📦</span>
                                                )}
                                            </div>
                                            <h3 className="text-xs text-[#191919] line-clamp-3 mb-1">{item.title}</h3>
                                            <p className="text-xs text-[#767676] mb-0.5">{item.condition || 'New (Other)'}</p>
                                            <p className="text-sm font-bold text-[#191919]">RMB {(item.price * 7.2).toFixed(2)}</p>
                                            <p className="text-xs text-[#767676]">+ CNY43.59 shipping</p>
                                            <p className="text-xs text-[#767676]">358 sold</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="w-full lg:w-[380px] flex-shrink-0">
                            <div className="bg-[#f7f7f7] rounded-2xl p-8 sticky top-4">
                                <h2 className="text-2xl font-bold text-[#191919] mb-6">Order summary</h2>

                                <div className="space-y-4 mb-6 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#191919]">Item ({cartItems.reduce((s, i) => s + i.quantity, 0)})</span>
                                        <span className="text-[#191919]">RMB {(subtotal * 7.2).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-1">
                                            <span className="text-[#191919]">Shipping to 310000</span>
                                            <svg className="w-4 h-4 text-[#767676]" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                                            </svg>
                                        </div>
                                        <span className="text-[#191919]">RMB {(shipping * 7.2).toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-6 mb-8">
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-lg font-bold text-[#191919]">Subtotal</span>
                                        <span className="text-lg font-bold text-[#191919]">RMB {(total * 7.2).toFixed(2)}</span>
                                    </div>
                                </div>

                                <Link
                                    href="/ebay/checkout"
                                    className="block w-full bg-[#3665f3] text-white py-4 rounded-full font-bold text-center hover:bg-blue-700 transition-colors mb-6 text-base"
                                >
                                    Go to checkout
                                </Link>

                                <div className="flex items-start gap-2 justify-center">
                                    <svg className="w-5 h-5 text-[#3665f3] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                                    </svg>
                                    <p className="text-[11px] text-[#191919] leading-tight">
                                        Purchase protected by <Link href="#" className="text-[#3665f3] underline hover:no-underline">eBay Money Back Guarantee</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <EbayFooter />
        </div>
    );
};

export default EbayCart;
