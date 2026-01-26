import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';
import EbayHeader from '../../../components/ebay/EbayHeader';
import EbayFooter from '../../../components/ebay/EbayFooter';
import { featuredProducts } from '../../../data/ebayData';
import Link from 'next/link';

const EbayStore = () => {
    const router = useRouter();
    const { store } = router.query;
    const storeName = store ? store.charAt(0).toUpperCase() + store.slice(1) : 'Store';
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All Items');

    // Mock store data
    const storeData = {
        feedbackScore: '12,456',
        positivePercentage: '99.8',
        itemsSold: '52K+',
        memberSince: 'Dec 2015'
    };

    // Store navigation tabs
    const storeTabs = ['Home', 'All Items', 'About', 'Feedback'];

    // Mock store products (featured items)
    const featuredItems = featuredProducts.slice(0, 4);
    const allProducts = featuredProducts.slice(0, 12);

    return (
        <div className="min-h-screen bg-white font-sans text-[#333] ebay-scope">
            <Head>
                <title>{storeName} | eBay Store</title>
            </Head>
            <EbayHeader />

            {/* Store Billboard Header */}
            <div className="w-full h-[220px] bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 relative">
                {/* Simple gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            </div>

            {/* Store Info Card - overlapping banner */}
            <div className="max-w-[1400px] mx-auto px-4 -mt-16 relative z-10">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                        {/* Store Logo & Name */}
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-[#3665f3] rounded-lg shadow-md flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                                {storeName.substring(0, 1).toUpperCase()}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h1 className="text-2xl font-bold text-[#191919]">{storeName}</h1>
                                    {/* Verification Tick */}
                                    <svg className="w-6 h-6 text-[#3665f3]" viewBox="0 0 24 24" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-[#767676]">
                                    <span className="flex items-center gap-1">
                                        <span className="font-bold text-[#191919]">{storeData.positivePercentage}%</span> positive feedback
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-[#ffa800]" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                        <span className="font-bold text-[#191919]">{storeData.feedbackScore}</span> feedback score
                                    </span>
                                    <span>•</span>
                                    <span>{storeData.itemsSold} items sold</span>
                                </div>
                            </div>
                        </div>

                        {/* Search This Store */}
                        <div className="w-full md:w-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search this store"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full md:w-[280px] px-4 py-2.5 pl-10 border-2 border-[#191919] rounded-full text-sm focus:outline-none focus:border-[#3665f3]"
                                />
                                <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#767676]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Store Navigation Tabs */}
                    <nav className="flex gap-6 mt-6 border-t border-gray-200 pt-4">
                        {storeTabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`font-medium pb-2 border-b-2 transition-colors ${activeTab === tab
                                    ? 'border-[#3665f3] text-[#3665f3]'
                                    : 'border-transparent text-[#767676] hover:text-[#191919]'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Store Content */}
            <div className="max-w-[1400px] mx-auto px-4 py-8">
                {/* Featured Items Section */}
                <section className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-[#191919]">Seller&apos;s Picks</h2>
                        <Link href="#" className="text-[#191919] hover:underline font-medium text-sm">See all</Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {featuredItems.map((product) => (
                            <Link key={product.id} href={`/ebay/itm/${product.id}`} className="group cursor-pointer block">
                                <div className="w-full h-[180px] bg-gray-100 rounded-lg mb-3 relative flex items-center justify-center overflow-hidden border border-gray-100 group-hover:shadow-md transition-shadow">
                                    {product.image ? (
                                        <img src={product.image} alt={product.title} className="w-full h-full object-contain p-4 mix-blend-multiply" />
                                    ) : (
                                        <span className="text-4xl">📦</span>
                                    )}
                                </div>
                                <h3 className="text-sm text-[#191919] group-hover:underline line-clamp-2 h-10 mb-1 leading-5">
                                    {product.title}
                                </h3>
                                <span className="text-lg font-bold text-[#191919]">${product.price.toFixed(2)}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* All Items Grid */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-[#191919]">All Items</h2>
                        <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:border-[#191919] focus:outline-none cursor-pointer">
                            <option>Best Match</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newly Listed</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {allProducts.map((product) => (
                            <Link key={product.id} href={`/ebay/itm/${product.id}`} className="group cursor-pointer block">
                                <div className="w-full h-[220px] bg-gray-100 rounded-lg mb-3 relative flex items-center justify-center overflow-hidden border border-gray-100 group-hover:shadow-md transition-shadow">
                                    {product.image ? (
                                        <img src={product.image} alt={product.title} className="w-full h-full object-contain p-4 mix-blend-multiply" />
                                    ) : (
                                        <span className="text-4xl">📦</span>
                                    )}
                                    {/* Watchlist Heart */}
                                    <button
                                        className="absolute top-2 right-2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                    >
                                        <svg className="w-4 h-4 text-[#191919]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>
                                    </button>
                                </div>
                                <div>
                                    <h3 className="text-sm text-[#191919] group-hover:underline line-clamp-2 h-10 mb-1 leading-5">
                                        {product.title}
                                    </h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-bold text-[#191919]">${product.price.toFixed(2)}</span>
                                        {product.originalPrice && (
                                            <span className="text-xs text-[#767676] line-through">${product.originalPrice.toFixed(2)}</span>
                                        )}
                                    </div>
                                    <div className="text-xs text-[#767676] mt-1">Free shipping</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-10">
                    <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    {[1, 2, 3, 4, 5].map((page) => (
                        <button
                            key={page}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${page === 1
                                ? 'bg-[#191919] text-white'
                                : 'hover:bg-gray-100 text-[#191919]'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <EbayFooter />
        </div>
    );
};

export default EbayStore;
