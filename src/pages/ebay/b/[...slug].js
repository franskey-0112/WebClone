import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';
import EbayHeader from '../../../components/ebay/EbayHeader';
import EbayFooter from '../../../components/ebay/EbayFooter';
import { featuredProducts } from '../../../data/ebayData';
import Link from 'next/link';
import { useWatchlist } from '../../../utils/WatchlistContext';

const EbayBrowse = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { isInWatchlist, toggleWatchlist } = useWatchlist();

    // Slug is an array in [...slug].js, e.g., ['Electronics', 'bn_123456']
    const categoryNameRaw = Array.isArray(slug) ? slug[0] : (slug || 'Category');
    const categoryName = categoryNameRaw.charAt(0).toUpperCase() + categoryNameRaw.slice(1);

    // Accordion state for filters
    const [openFilters, setOpenFilters] = useState({ category: true, condition: true, price: false, brand: false });

    const toggleFilter = (filter) => {
        setOpenFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
    };

    // Sub-categories with circular images
    const subCategories = [
        { name: 'Smartphones', img: '/images/ebay/products/cell-phones-accessories/451.webp' },
        { name: 'Laptops', img: '/images/ebay/products/electronics/401.webp' },
        { name: 'Tablets', img: '/images/ebay/products/electronics/402.webp' },
        { name: 'Cameras', img: '/images/ebay/products/electronics/403.webp' },
        { name: 'Audio', img: '/images/ebay/products/electronics/404.webp' },
        { name: 'Accessories', img: '/images/ebay/products/cell-phones-accessories/452.webp' },
    ];

    // Brands for this category
    const brands = ['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP', 'Lenovo', 'Asus'];

    const products = featuredProducts;

    return (
        <div className="min-h-screen bg-white font-sans text-[#333] ebay-scope">
            <Head>
                <title>{categoryName} | eBay</title>
            </Head>
            <EbayHeader />

            <div className="max-w-[1400px] mx-auto px-4 py-4">
                {/* Breadcrumb - using dark colors as per design spec */}
                <nav className="text-xs text-[#767676] mb-4 flex items-center gap-2">
                    <Link href="/ebay" className="text-[#191919] hover:underline">eBay</Link>
                    <svg className="w-3 h-3 text-[#767676]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-[#191919] font-medium">{categoryName}</span>
                </nav>

                {/* Page Title */}
                <h1 className="text-3xl font-bold text-[#191919] mb-6">{categoryName}</h1>

                {/* Sub-Category Navigation Circles */}
                <div className="mb-8">
                    <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
                        {subCategories.map((sub, i) => (
                            <Link
                                key={i}
                                href={`/ebay/sch?_nkw=${encodeURIComponent(sub.name)}`}
                                className="flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0"
                            >
                                <div className="w-[100px] h-[100px] rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-[#191919] group-hover:shadow-md transition-all">
                                    {sub.img ? (
                                        <img
                                            src={sub.img}
                                            alt={sub.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    ) : (
                                        <span className="text-2xl">📦</span>
                                    )}
                                </div>
                                <span className="text-sm font-medium text-[#191919] group-hover:underline text-center">{sub.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex gap-6">
                    {/* Left Sidebar with Accordion Filters */}
                    <div className="w-[240px] hidden md:block shrink-0">
                        {/* Shop by Category Accordion */}
                        <div className="border-b border-gray-200 pb-4 mb-4">
                            <button
                                onClick={() => toggleFilter('category')}
                                className="w-full flex items-center justify-between font-bold text-base text-[#191919] mb-3"
                            >
                                <span>Shop by Category</span>
                                <svg className={`w-4 h-4 transition-transform ${openFilters.category ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {openFilters.category && (
                                <ul className="text-sm space-y-2 text-[#191919]">
                                    <li><Link href="#" className="font-bold hover:underline">All Listings</Link></li>
                                    <li><Link href="#" className="hover:underline pl-2">New Arrivals</Link></li>
                                    <li><Link href="#" className="hover:underline pl-2">Top Rated</Link></li>
                                    <li><Link href="#" className="hover:underline pl-2">Auctions</Link></li>
                                    <li><Link href="#" className="hover:underline pl-2">Buy It Now</Link></li>
                                </ul>
                            )}
                        </div>

                        {/* Condition Accordion */}
                        <div className="border-b border-gray-200 pb-4 mb-4">
                            <button
                                onClick={() => toggleFilter('condition')}
                                className="w-full flex items-center justify-between font-bold text-base text-[#191919] mb-3"
                            >
                                <span>Condition</span>
                                <svg className={`w-4 h-4 transition-transform ${openFilters.condition ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {openFilters.condition && (
                                <div className="space-y-2 text-sm">
                                    <label className="flex items-center gap-2 cursor-pointer hover:text-[#3665f3]">
                                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#3665f3] focus:ring-[#3665f3]" />
                                        <span>New</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer hover:text-[#3665f3]">
                                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#3665f3] focus:ring-[#3665f3]" />
                                        <span>Used</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer hover:text-[#3665f3]">
                                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#3665f3] focus:ring-[#3665f3]" />
                                        <span>Certified Refurbished</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer hover:text-[#3665f3]">
                                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#3665f3] focus:ring-[#3665f3]" />
                                        <span>For parts or not working</span>
                                    </label>
                                </div>
                            )}
                        </div>

                        {/* Price Accordion */}
                        <div className="border-b border-gray-200 pb-4 mb-4">
                            <button
                                onClick={() => toggleFilter('price')}
                                className="w-full flex items-center justify-between font-bold text-base text-[#191919] mb-3"
                            >
                                <span>Price</span>
                                <svg className={`w-4 h-4 transition-transform ${openFilters.price ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {openFilters.price && (
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <input type="text" placeholder="$ Min" className="w-20 border border-gray-300 rounded-md p-2 text-sm focus:border-[#191919] focus:outline-none" />
                                        <span className="text-[#767676]">to</span>
                                        <input type="text" placeholder="$ Max" className="w-20 border border-gray-300 rounded-md p-2 text-sm focus:border-[#191919] focus:outline-none" />
                                    </div>
                                    <button className="text-[#3665f3] hover:underline font-medium text-sm">Apply</button>
                                </div>
                            )}
                        </div>

                        {/* Shop by Brand Accordion */}
                        <div className="border-b border-gray-200 pb-4 mb-4">
                            <button
                                onClick={() => toggleFilter('brand')}
                                className="w-full flex items-center justify-between font-bold text-base text-[#191919] mb-3"
                            >
                                <span>Shop by Brand</span>
                                <svg className={`w-4 h-4 transition-transform ${openFilters.brand ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {openFilters.brand && (
                                <div className="space-y-2 text-sm">
                                    {brands.map((brand, i) => (
                                        <label key={i} className="flex items-center gap-2 cursor-pointer hover:text-[#3665f3]">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#3665f3] focus:ring-[#3665f3]" />
                                            <span>{brand}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1 min-w-0">
                        {/* Results header */}
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                            <p className="text-sm text-[#767676]">{products.length} results</p>
                            <div className="flex items-center gap-4">
                                <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:border-[#191919] focus:outline-none cursor-pointer">
                                    <option>Best Match</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Newly Listed</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <Link key={product.id} href={`/ebay/itm/${product.id}`} className="group cursor-pointer block">
                                    <div className="w-full h-[220px] bg-gray-100 rounded-lg mb-3 relative flex items-center justify-center overflow-hidden group-hover:shadow-md transition-shadow">
                                        {product.image ? (
                                            <img src={product.image} alt={product.title} className="w-full h-full object-contain p-4 mix-blend-multiply" />
                                        ) : (
                                            <span className="text-4xl">📦</span>
                                        )}
                                        {product.discount && (
                                            <div className="absolute top-2 left-2 bg-[#dd1e31] text-white text-xs font-bold px-2 py-1 rounded-sm z-10">
                                                {product.discount}
                                            </div>
                                        )}
                                        {/* Watchlist Heart Icon */}
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
                                        <h3 className="text-sm text-[#191919] group-hover:underline line-clamp-2 md:h-10 mb-1 leading-5">
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
                    </div>
                </div>

                {/* SEO Text Block */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <h2 className="text-xl font-bold text-[#191919] mb-4">About {categoryName}</h2>
                    <p className="text-sm text-[#767676] leading-relaxed">
                        Browse our extensive collection of {categoryName.toLowerCase()} on eBay. Whether you're looking for new or refurbished items,
                        you'll find great deals from trusted sellers. Shop with confidence knowing you're protected by eBay's Money Back Guarantee.
                        Free shipping is available on many items, and you can filter by price, condition, and brand to find exactly what you need.
                    </p>
                </div>
            </div>

            <EbayFooter />
        </div>
    );
};

export default EbayBrowse;
