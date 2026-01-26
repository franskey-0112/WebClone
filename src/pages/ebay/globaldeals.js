import Head from 'next/head';
import { useState } from 'react';
import EbayHeader from '../../components/ebay/EbayHeader';
import EbayFooter from '../../components/ebay/EbayFooter';
import { featuredProducts } from '../../data/ebayData';
import Link from 'next/link';
import { useWatchlist } from '../../utils/WatchlistContext';

const EbayDeals = () => {
    const [activeCategory, setActiveCategory] = useState('All Deals');
    const [searchQuery, setSearchQuery] = useState('');
    const { isInWatchlist, toggleWatchlist } = useWatchlist();

    // Categories for secondary nav
    const dealCategories = ['All Deals', 'Tech', 'Fashion', 'Home', 'Garden', 'Sports', 'Toys'];

    // Filter for products that have a discount or original price
    const dealProducts = featuredProducts.filter(p => p.discount || p.originalPrice);

    // Featured deal (first product with highest discount)
    const featuredDeal = dealProducts.sort((a, b) => {
        const discountA = a.originalPrice ? (1 - a.price / a.originalPrice) : 0;
        const discountB = b.originalPrice ? (1 - b.price / b.originalPrice) : 0;
        return discountB - discountA;
    })[0];

    // Remaining deals (excluding featured)
    const gridDeals = dealProducts.filter(p => p.id !== featuredDeal?.id);

    return (
        <div className="min-h-screen bg-white font-sans text-[#333] ebay-scope">
            <Head>
                <title>Daily Deals | eBay</title>
            </Head>
            <EbayHeader />

            {/* Deals Header */}
            <div className="bg-[#191919] text-white">
                <div className="max-w-[1400px] mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* eBay Deals Logo */}
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">eBay</span>
                            <span className="text-2xl font-bold text-[#dd1e31]">Deals</span>
                        </div>

                        {/* Search Deals */}
                        <div className="flex items-center gap-2 flex-1 max-w-md">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Search deals"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-2 pl-10 rounded-full text-[#191919] text-sm focus:outline-none focus:ring-2 focus:ring-[#dd1e31]"
                                />
                                <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#767676]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Navigation */}
                    <nav className="mt-4 flex gap-6 overflow-x-auto pb-2 custom-scrollbar">
                        {dealCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap text-sm font-medium pb-2 border-b-2 transition-colors ${activeCategory === cat
                                    ? 'border-white text-white'
                                    : 'border-transparent text-gray-400 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 py-8">
                {/* Featured Deal */}
                {featuredDeal && (
                    <div className="mb-10">
                        <h2 className="text-xl font-bold text-[#191919] mb-4">Featured Deal</h2>
                        <Link
                            href={`/ebay/itm/${featuredDeal.id}`}
                            className="group flex flex-col md:flex-row gap-6 p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white"
                        >
                            <div className="w-full md:w-[350px] h-[300px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative flex-shrink-0">
                                {featuredDeal.image ? (
                                    <img src={featuredDeal.image} alt={featuredDeal.title} className="w-full h-full object-contain p-4 mix-blend-multiply" />
                                ) : (
                                    <span className="text-6xl">📦</span>
                                )}
                                <div className="absolute top-3 left-3 bg-[#dd1e31] text-white text-sm font-bold px-3 py-1.5 rounded-sm shadow-md">
                                    {featuredDeal.originalPrice ? `${Math.round((1 - featuredDeal.price / featuredDeal.originalPrice) * 100)}% OFF` : 'DEAL'}
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <h3 className="text-xl font-bold text-[#191919] group-hover:underline mb-3 leading-snug">
                                    {featuredDeal.title}
                                </h3>
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-3xl font-bold text-[#191919]">${featuredDeal.price.toFixed(2)}</span>
                                    {featuredDeal.originalPrice && (
                                        <span className="text-lg text-[#767676] line-through">${featuredDeal.originalPrice.toFixed(2)}</span>
                                    )}
                                </div>
                                {featuredDeal.originalPrice && (
                                    <span className="text-[#dd1e31] font-bold text-lg mb-3">
                                        Save ${(featuredDeal.originalPrice - featuredDeal.price).toFixed(2)}
                                    </span>
                                )}
                                <div className="text-sm text-[#767676] mb-4">Free shipping • Limited time offer</div>
                                <button className="bg-[#3665f3] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors w-fit">
                                    Get this deal
                                </button>
                            </div>
                        </Link>
                    </div>
                )}

                {/* Deals Grid */}
                <h2 className="text-xl font-bold text-[#191919] mb-4">Today's Deals</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {gridDeals.map((product) => (
                        <Link key={product.id} href={`/ebay/itm/${product.id}`} className="group cursor-pointer block border border-transparent hover:border-gray-200 hover:shadow-lg rounded-lg p-3 transition-all">
                            <div className="w-full h-[200px] bg-gray-100 rounded-lg mb-3 relative flex items-center justify-center overflow-hidden">
                                {product.image ? (
                                    <img src={product.image} alt={product.title} className="w-full h-full object-contain p-4 mix-blend-multiply" />
                                ) : (
                                    <span className="text-4xl">📦</span>
                                )}
                                <div className="absolute top-2 left-2 bg-[#dd1e31] text-white text-xs font-bold px-2 py-1 shadow-sm rounded-sm z-10">
                                    {product.originalPrice
                                        ? `${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF`
                                        : product.discount || 'DEAL'}
                                </div>
                                {/* Watchlist Heart */}
                                <button
                                    className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-all ${isInWatchlist(product.id) ? 'bg-[#191919] text-white' : 'bg-white/80 hover:bg-white text-[#191919]'
                                        }`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        toggleWatchlist(product);
                                    }}
                                    title={isInWatchlist(product.id) ? "Remove from Watchlist" : "Add to Watchlist"}
                                >
                                    <svg className="w-4 h-4" fill={isInWatchlist(product.id) ? "white" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                </button>
                            </div>
                            <div>
                                <h3 className="text-sm text-[#191919] group-hover:underline line-clamp-2 h-10 mb-1 leading-5">
                                    {product.title}
                                </h3>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-xl font-bold text-[#191919]">${product.price.toFixed(2)}</span>
                                    {product.originalPrice && (
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="text-[#767676] line-through">${product.originalPrice.toFixed(2)}</span>
                                            <span className="font-bold text-[#dd1e31]">
                                                Save ${(product.originalPrice - product.price).toFixed(2)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="text-xs text-[#767676] mt-2">Free shipping</div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-10">
                    <button className="border-2 border-[#191919] text-[#191919] px-8 py-3 rounded-full font-bold hover:bg-[#191919] hover:text-white transition-colors">
                        See more deals
                    </button>
                </div>
            </div>

            <EbayFooter />
        </div>
    );
};

export default EbayDeals;
