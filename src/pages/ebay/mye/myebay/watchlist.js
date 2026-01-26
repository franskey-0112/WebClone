import Head from 'next/head';
import { useState, useMemo } from 'react';
import EbayHeader from '../../../../components/ebay/EbayHeader';
import EbayFooter from '../../../../components/ebay/EbayFooter';
import { useWatchlist } from '../../../../utils/WatchlistContext';
import Link from 'next/link';

const WatchlistPage = () => {
    const { watchlistItems, removeFromWatchlist } = useWatchlist();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedItems, setSelectedItems] = useState([]);

    // Category stats logic
    const categoryStats = useMemo(() => {
        const stats = { 'All': watchlistItems.length };
        watchlistItems.forEach(item => {
            const cat = item.category || 'Other';
            stats[cat] = (stats[cat] || 0) + 1;
        });
        return stats;
    }, [watchlistItems]);

    // Filtering
    const displayedItems = useMemo(() => {
        return watchlistItems.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'All' || (item.category || 'Other') === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [watchlistItems, searchQuery, activeCategory]);

    // Handle selection
    const toggleSelect = (id) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedItems.length === displayedItems.length && displayedItems.length > 0) {
            setSelectedItems([]);
        } else {
            setSelectedItems(displayedItems.map(i => i.id));
        }
    };

    const deleteSelected = () => {
        selectedItems.forEach(id => removeFromWatchlist(id));
        setSelectedItems([]);
    };

    const sidebarItems = [
        { id: 'summary', label: 'Summary', href: '/ebay/mye/myebay/summary' },
        { id: 'recent', label: 'Recently viewed', href: '#' },
        { id: 'bids', label: 'Bids & offers', href: '#' },
        { id: 'watchlist', label: 'Watchlist', href: '/ebay/mye/myebay/watchlist', active: true },
        { id: 'purchases', label: 'Purchases', href: '#' },
        { id: 'saved-feed', label: 'Saved feed', href: '#', isNew: true },
        { id: 'saved-searches', label: 'Saved searches', href: '#' },
        { id: 'saved-sellers', label: 'Saved sellers', href: '#' },
        { id: 'selling', label: 'Selling', href: '#', hasChevron: true },
        { id: 'garage', label: 'My Garage', href: '#' },
        { id: 'collection', label: 'My Collection', href: '#' },
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-[#333] ebay-scope">
            <Head>
                <title>Watchlist | My eBay</title>
            </Head>
            <EbayHeader hideNavItems={true} />

            <div className="max-w-[1400px] mx-auto px-4 py-2">
                <h1 className="text-2xl font-bold text-[#191919] mb-2">My eBay</h1>

                {/* Top Tabs */}
                <div className="border-b border-gray-200 mb-4">
                    <div className="flex gap-6">
                        <button className="pb-1 border-b-2 border-[#191919] font-bold text-[#191919] text-base bg-transparent cursor-pointer">Activity</button>
                        <button className="pb-1 text-[#707070] hover:text-[#191919] text-base bg-transparent cursor-pointer">Messages</button>
                        <button className="pb-1 text-[#707070] hover:text-[#191919] text-base bg-transparent cursor-pointer">Account</button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-[200px] shrink-0">
                        <nav className="space-y-0">
                            {sidebarItems.map(item => (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className={`flex items-center justify-between px-3 py-1 text-sm transition-colors ${item.active
                                        ? 'bg-gray-100 font-bold text-[#191919]'
                                        : 'text-[#191919] hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        {item.label}
                                        {item.isNew && <span className="bg-green-100 text-green-700 text-[10px] font-bold px-1 rounded">NEW</span>}
                                    </span>
                                    {item.hasChevron && (
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-4">
                            <a href="#" className="text-xs text-[#3665f3] hover:underline">Tell us what you think</a>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {/* Title & Search Section */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div className="flex items-center gap-2 cursor-pointer group">
                                <h2 className="text-xl font-bold text-[#191919]">My eBay - Watchlist</h2>
                                <svg className="w-4 h-4 text-[#191919]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="relative flex-1 md:w-[350px]">
                                    <input
                                        type="text"
                                        placeholder="Search your Watchlist"
                                        className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:border-[#3665f3] outline-none text-sm"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 border-0 bg-transparent cursor-pointer"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                <button className="bg-[#3665f3] text-white px-8 py-2 rounded-full font-bold hover:bg-blue-700 transition-colors border-0 cursor-pointer">Search</button>
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
                            <div className="flex items-center gap-4">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 cursor-pointer rounded border-gray-300"
                                    checked={selectedItems.length === displayedItems.length && displayedItems.length > 0}
                                    onChange={toggleSelectAll}
                                />
                                <button
                                    disabled={selectedItems.length === 0}
                                    className="px-6 py-1.5 border border-gray-300 rounded-full text-sm font-bold text-[#191919] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 bg-white cursor-pointer transition-colors"
                                >
                                    Add to custom list
                                </button>
                                <button
                                    onClick={deleteSelected}
                                    disabled={selectedItems.length === 0}
                                    className="px-6 py-1.5 border border-gray-300 rounded-full text-sm font-bold text-[#191919] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 bg-white cursor-pointer transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-sm">
                                    <span className="text-[#767676]">Status: </span>
                                    <button className="font-bold flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0">All ({watchlistItems.length}) <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button>
                                </div>
                                <div className="text-sm">
                                    <span className="text-[#767676]">Sort: </span>
                                    <button className="font-bold flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0">Ending soonest <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button>
                                </div>
                            </div>
                        </div>

                        {/* Category Pills */}
                        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-4">
                            {Object.entries(categoryStats).map(([cat, count]) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-1.5 rounded-full text-sm font-medium border whitespace-nowrap transition-all cursor-pointer ${activeCategory === cat
                                        ? 'bg-gray-100 border-[#191919] font-bold text-[#191919]'
                                        : 'bg-white border-transparent hover:bg-gray-50 text-[#191919]'
                                        }`}
                                >
                                    {cat === 'All' ? 'All Categories' : cat} ({count})
                                </button>
                            ))}
                        </div>

                        {/* Items List */}
                        <div className="space-y-0">
                            {displayedItems.length > 0 ? displayedItems.map((item) => (
                                <div key={item.id} className="group py-5 border-b border-gray-200 flex gap-6">
                                    <div className="pt-2">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 cursor-pointer rounded border-gray-300"
                                            checked={selectedItems.includes(item.id)}
                                            onChange={() => toggleSelect(item.id)}
                                        />
                                    </div>
                                    <Link href={`/ebay/itm/${item.id}`} className="w-[180px] h-[180px] bg-gray-50 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100 relative group">
                                        <img src={item.image} alt="" className="w-full h-full object-contain p-4 mix-blend-multiply group-hover:scale-110 transition-transform duration-300" />
                                    </Link>
                                    <div className="flex-1 min-w-0">
                                        <Link href={`/ebay/itm/${item.id}`} className="text-base text-[#191919] font-medium hover:underline block mb-1 leading-snug">
                                            {item.title}
                                        </Link>
                                        <p className="text-xs text-[#767676] mb-2">{item.condition || 'New without box'}</p>
                                        <div className="flex flex-col mb-3">
                                            <div className="text-xl font-bold text-[#191919]">RMB {(item.price * 7.1).toFixed(2)}*</div>
                                            <div className="text-xs text-[#767676]">^ Converted from ${item.price.toFixed(2)}</div>
                                            <div className="text-xs text-[#767676] mt-1">Or Buy It Now</div>
                                            <div className="text-xs text-[#767676] font-bold mt-1 text-gray-500">+RMB 43.60 shipping</div>
                                        </div>
                                        <div className="text-xs text-[#767676]">
                                            <span className="hover:underline cursor-pointer font-medium text-[#191919]">{item.seller?.username || 'babysina'}</span>
                                            <span className="ml-1">100% (43)</span>
                                        </div>
                                        <div className="text-xs text-[#767676] mt-1">40 sold 306 watching</div>
                                    </div>
                                    <div className="w-[200px] flex flex-col gap-3">
                                        <button className="w-full bg-[#3665f3] text-white py-2.5 rounded-full font-bold text-sm hover:bg-blue-700 transition-colors border-0 cursor-pointer">Buy It Now</button>
                                        <button className="w-full bg-white text-[#3665f3] py-2.5 border border-[#3665f3] rounded-full font-bold text-sm hover:bg-blue-50 transition-colors cursor-pointer">View in cart</button>
                                        <div className="relative group/actions">
                                            <button className="w-full text-[#3665f3] text-sm font-bold flex items-center justify-center gap-1 hover:underline mt-1 bg-transparent border-0 cursor-pointer py-1">
                                                More Actions
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="py-24 text-center border-t border-gray-100">
                                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#191919] mb-2">Your watchlist is empty</h3>
                                    <p className="text-[#767676] mb-8">Items you're watching will appear here.</p>
                                    <Link href="/ebay" className="bg-[#191919] text-white px-10 py-3 rounded-full font-bold inline-block hover:bg-gray-800 transition-all">Start shopping</Link>
                                </div>
                            )}
                        </div>

                        {/* Recommendations Overlay */}
                        <div className="mt-16 pt-12 border-t border-gray-200">
                            <h2 className="text-xl font-bold text-[#191919] mb-8">Sponsored items similar to what you've watched</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                                {watchlistItems.length > 0 ? watchlistItems.slice(0, 5).map(item => (
                                    <Link key={`rec-${item.id}`} href={`/ebay/itm/${item.id}`} className="group block">
                                        <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
                                            <img src={item.image} alt="" className="w-full h-full object-contain p-4 mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                                        </div>
                                        <div className="text-sm text-[#191919] line-clamp-2 h-10 group-hover:underline leading-snug mb-2">{item.title}</div>
                                        <div className="font-bold text-lg text-[#191919]">${item.price.toFixed(2)}</div>
                                    </Link>
                                )) : (
                                    // Placeholder recommendations if watchlist is empty
                                    [1, 2, 3, 4, 5].map(i => (
                                        <div key={`rec-placeholder-${i}`} className="animate-pulse">
                                            <div className="aspect-square bg-gray-100 rounded-lg mb-4"></div>
                                            <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                                            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <EbayFooter />
        </div>
    );
};

export default WatchlistPage;
