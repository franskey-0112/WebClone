import Head from 'next/head';
import { useState } from 'react';
import EbayHeader from '../../../../components/ebay/EbayHeader';
import EbayFooter from '../../../../components/ebay/EbayFooter';
import { featuredProducts } from '../../../../data/ebayData';
import Link from 'next/link';

const MyEbaySummary = () => {
    const [activeNav, setActiveNav] = useState('summary');

    // Mock user data
    const userData = {
        username: 'john_doe_123',
        memberSince: 'Jan 2019',
        feedbackScore: 45,
        positivePercentage: 100
    };

    // Mock data for dashboard
    const watchingItems = featuredProducts.slice(0, 4);
    const purchaseHistory = featuredProducts.slice(4, 7).map(p => ({
        ...p,
        purchaseDate: '2024-01-15',
        status: 'Delivered'
    }));
    const savedSearches = [
        { query: 'iPhone 15 Pro', count: 234 },
        { query: 'MacBook Pro M3', count: 89 },
        { query: 'Sony WH-1000XM5', count: 156 },
    ];
    const savedSellers = [
        { name: 'DirectAuth', feedback: '99.3%', items: 1200 },
        { name: 'TechDeals_USA', feedback: '98.7%', items: 856 },
    ];

    const sidebarItems = [
        { id: 'summary', label: 'Summary', icon: 'home' },
        { id: 'activity', label: 'Activity', icon: 'activity' },
        { id: 'messages', label: 'Messages', icon: 'mail', badge: 3 },
        { id: 'account', label: 'Account', icon: 'user' },
    ];

    const buyingItems = [
        { id: 'watching', label: 'Watching', count: watchingItems.length },
        { id: 'bids', label: 'Bids/Offers', count: 0 },
        { id: 'purchases', label: 'Purchases', count: purchaseHistory.length },
        { id: 'saved', label: 'Saved searches', count: savedSearches.length },
    ];

    return (
        <div className="min-h-screen bg-[#f7f7f7] font-sans text-[#333] ebay-scope">
            <Head>
                <title>My eBay Summary</title>
            </Head>
            <EbayHeader hideNavItems={true} />

            <div className="max-w-[1400px] mx-auto px-4 py-2">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Sidebar Navigation */}
                    <aside className="w-full lg:w-[220px] flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            {/* User Info */}
                            <div className="pb-4 mb-4 border-b border-gray-200">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-12 h-12 bg-[#3665f3] rounded-full flex items-center justify-center text-white font-bold text-lg">
                                        {userData.username.substring(0, 1).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="font-bold text-[#191919]">{userData.username}</div>
                                        <div className="text-xs text-[#767676]">Member since {userData.memberSince}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-[#191919] font-medium">{userData.feedbackScore}</span>
                                    <span className="text-[#767676]">Feedback score</span>
                                    <span className="text-green-600">({userData.positivePercentage}%)</span>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="space-y-1">
                                {sidebarItems.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveNav(item.id)}
                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${activeNav === item.id
                                            ? 'bg-blue-50 text-[#3665f3] border-l-4 border-[#3665f3]'
                                            : 'text-[#191919] hover:bg-gray-100'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {item.icon === 'home' && (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                </svg>
                                            )}
                                            {item.icon === 'activity' && (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                            )}
                                            {item.icon === 'mail' && (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                            {item.icon === 'user' && (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            )}
                                            <span className="font-medium">{item.label}</span>
                                        </div>
                                        {item.badge && (
                                            <span className="bg-[#dd1e31] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        <h1 className="text-2xl font-bold text-[#191919] mb-6">My eBay Summary</h1>

                        {/* Buying Section */}
                        <section className="bg-white rounded-lg shadow-sm mb-6">
                            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-[#191919]">Buying</h2>
                            </div>
                            <div className="p-4">
                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    {buyingItems.map(item => (
                                        <Link key={item.id} href="#" className="text-center p-4 rounded-lg border border-gray-200 hover:border-[#3665f3] hover:shadow-sm transition-all">
                                            <div className="text-2xl font-bold text-[#191919]">{item.count}</div>
                                            <div className="text-sm text-[#767676]">{item.label}</div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Watching Items */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-bold text-[#191919]">Watching</h3>
                                        <Link href="#" className="text-[#191919] text-sm hover:underline">See all</Link>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {watchingItems.map(item => (
                                            <Link key={item.id} href={`/ebay/itm/${item.id}`} className="group">
                                                <div className="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center overflow-hidden group-hover:shadow-md transition-shadow">
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.title} className="w-full h-full object-contain p-2" />
                                                    ) : (
                                                        <span className="text-3xl">📦</span>
                                                    )}
                                                </div>
                                                <h4 className="text-sm text-[#191919] group-hover:underline line-clamp-2 mb-1">{item.title}</h4>
                                                <div className="font-bold text-[#191919]">${item.price.toFixed(2)}</div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Recent Purchases */}
                        <section className="bg-white rounded-lg shadow-sm mb-6">
                            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-[#191919]">Recent Purchases</h2>
                                <Link href="#" className="text-[#191919] text-sm hover:underline">See all</Link>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {purchaseHistory.map(item => (
                                    <div key={item.id} className="p-4 flex gap-4">
                                        <Link href={`/ebay/itm/${item.id}`} className="w-[80px] h-[80px] bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                                            {item.image ? (
                                                <img src={item.image} alt={item.title} className="w-full h-full object-contain p-2" />
                                            ) : (
                                                <span className="text-2xl">📦</span>
                                            )}
                                        </Link>
                                        <div className="flex-1 min-w-0">
                                            <Link href={`/ebay/itm/${item.id}`} className="text-[#191919] hover:underline font-medium line-clamp-2 text-sm mb-1">
                                                {item.title}
                                            </Link>
                                            <div className="text-sm text-[#767676]">Purchased: {item.purchaseDate}</div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                    </svg>
                                                    {item.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <div className="font-bold text-[#191919]">${item.price.toFixed(2)}</div>
                                            <Link href="#" className="text-sm text-[#3665f3] hover:underline">Leave feedback</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Saved Searches & Sellers */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Saved Searches */}
                            <section className="bg-white rounded-lg shadow-sm">
                                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                    <h2 className="text-lg font-bold text-[#191919]">Saved Searches</h2>
                                    <Link href="#" className="text-[#191919] text-sm hover:underline">See all</Link>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {savedSearches.map((search, i) => (
                                        <Link key={i} href={`/ebay/sch?_nkw=${encodeURIComponent(search.query)}`} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-[#767676]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                                <span className="text-[#191919] font-medium">{search.query}</span>
                                            </div>
                                            <span className="text-sm text-[#767676]">{search.count} items</span>
                                        </Link>
                                    ))}
                                </div>
                            </section>

                            {/* Saved Sellers */}
                            <section className="bg-white rounded-lg shadow-sm">
                                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                    <h2 className="text-lg font-bold text-[#191919]">Saved Sellers</h2>
                                    <Link href="#" className="text-[#191919] text-sm hover:underline">See all</Link>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {savedSellers.map((seller, i) => (
                                        <Link key={i} href={`/ebay/str/${seller.name}`} className="p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                                            <div className="w-10 h-10 bg-[#3665f3] rounded-full flex items-center justify-center text-white font-bold">
                                                {seller.name.substring(0, 1).toUpperCase()}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-[#191919] font-medium">{seller.name}</div>
                                                <div className="text-sm text-[#767676]">{seller.feedback} positive · {seller.items} items</div>
                                            </div>
                                            <svg className="w-5 h-5 text-[#767676]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            </div>

            <EbayFooter />
        </div>
    );
};

export default MyEbaySummary;
