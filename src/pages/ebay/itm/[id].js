import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect } from 'react';
import Head from 'next/head';
import EbayHeader from '../../../components/ebay/EbayHeader';
import EbayFooter from '../../../components/ebay/EbayFooter';
import { featuredProducts } from '../../../data/ebayData';
import RelatedItems from '../../../components/ebay/RelatedItems';
import AboutSection from '../../../components/ebay/AboutSection';

const EbayItem = () => {
    const router = useRouter();
    const { id } = router.query;

    // Find product or use placeholder
    const product = featuredProducts.find(p => p.id === Number(id)) || featuredProducts[0];

    useEffect(() => {
        if (!product) return;

        // Save to local storage for "Recently Viewed" on homepage
        const MAX_RECENT = 10;
        try {
            const viewedStr = localStorage.getItem('ebay_recently_viewed');
            let viewed = viewedStr ? JSON.parse(viewedStr) : [];

            // Remove if already exists (to bump to top)
            viewed = viewed.filter(pid => pid !== product.id);

            // Add to front
            viewed.unshift(product.id);

            // Limit size
            if (viewed.length > MAX_RECENT) {
                viewed = viewed.slice(0, MAX_RECENT);
            }

            localStorage.setItem('ebay_recently_viewed', JSON.stringify(viewed));
        } catch (e) {
            console.error("Failed to save recently viewed product", e);
        }
    }, [product]);

    return (
        <div className="min-h-screen bg-white font-sans text-[#333] ebay-scope">
            <Head>
                <title>{product ? `${product.title} | eBay` : 'Item Details | eBay'}</title>
            </Head>
            <EbayHeader />

            <div className="max-w-[1600px] mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left: Image Gallery (Vertical Thumbnails + Main) */}
                    <div className="w-full lg:w-[62%] flex flex-col gap-6">
                        <div className="flex gap-4">
                            {/* Vertical Thumbnails (Desktop) */}
                            <div className="hidden md:flex flex-col gap-3 shrink-0">
                                {(product.additionalImages && product.additionalImages.length > 0
                                    ? product.additionalImages
                                    : [product.image, product.image, product.image, product.image] // Fallback if no additional images
                                ).slice(0, 6).map((imgStr, i) => (
                                    <div key={i} className={`w-[64px] h-[64px] rounded-lg cursor-pointer flex items-center justify-center overflow-hidden ${i === 0 ? 'border-2 border-[#191919]' : 'border border-gray-300 hover:border-black'}`}>
                                        {imgStr ? (
                                            <img src={imgStr} alt="Thumbnail" className="w-full h-full object-contain p-1" />
                                        ) : (
                                            "📦"
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Main Image */}
                            <div className="flex-1 aspect-[4/3] md:aspect-auto md:h-[600px] bg-gray-50 rounded-xl flex items-center justify-center relative overflow-hidden group border border-gray-100">
                                {/* Hover Zoom Hint */}
                                <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#191919]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                                    </svg>
                                </div>

                                {product.image ? (
                                    <img src={product.image} alt={product.title} className="w-full h-full object-contain p-4 transition-transform duration-300 scale-100 group-hover:scale-105" />
                                ) : (
                                    <div className="text-6xl">📦</div>
                                )}
                            </div>
                        </div>

                        {/* Sell & Share Buttons (Under Image) */}
                        <div className="flex justify-between items-center pl-[80px]"> {/* Offset for thumbnails */}
                            <div className="text-sm flex gap-4">
                                <span className="font-medium text-[#191919]">Upgrading? Sell it, don't trade it.</span>
                                <a href="#" className="font-bold text-[#191919] hover:underline">Sell one like this</a>
                                <span className="text-gray-300">|</span>
                                <a href="#" className="font-bold text-[#191919] hover:underline">Sell something else</a>
                            </div>
                            <button className="flex items-center gap-2 text-[#3665f3] hover:bg-blue-50 px-3 py-1.5 rounded-full transition-colors font-bold text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                                </svg>
                                Share
                            </button>
                        </div>

                        {/* Similar Items Section */}
                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-[#191919]">Similar items</h2>
                                    <span className="text-xs text-[#767676]">Sponsored</span>
                                </div>
                                <a href="#" className="font-bold text-[#191919] hover:underline text-sm">See all</a>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {featuredProducts
                                    .filter(p => p.category === product.category && p.id !== product.id)
                                    .slice(0, 4)
                                    .map((item, index) => (
                                        <article key={item.id} data-moduleid="146925" data-typename="GridItemModule" className="flex flex-col dp-entry-animiation gap-150 h-full">
                                            <div data-itemid={item.id} data-trackableid={`01KF340G2DCW04VJDKZ3R9MR9T-${item.id}`} data-trackablemoduleid="146925" className="relative rounded-100 media-scrim-rgba">
                                                <span data-testid="dp-iti-button-undefined" className="absolute right-100 top-100 z-10" style={{ pointerEvents: 'auto' }}>
                                                    <button aria-label="Watchlist" aria-pressed="false" className="dp-watchlist-toggle-button border-0 cursor-pointer h-400 inline-flex items-center justify-center p-0 relative rounded-full text-primary transition-all w-400 focus:opacity-90 hover:opacity-90" title="Watchlist" type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                                                        <span data-testid="icon-heart-16">
                                                            <svg aria-hidden="true" className="icon icon--16" focusable="false">
                                                                <use href="#icon-heart-16"></use>
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </span>
                                                <Link href={`/ebay/itm/${item.id}`} className="block no-underline hover:text-current dp-grid-item-module__link overflow-hidden rounded-100" data-testid="dp-gi-element-undefined" target="_blank" style={{ zIndex: 1 }}>
                                                    {item.image ? (
                                                        <img alt="" className="product-image block w-full rounded-100 product-image-transition aspect-ratio-square" src={item.image} style={{ objectFit: 'cover' }} />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-4xl">📦</div>
                                                    )}
                                                    <div className="absolute bg-neutral-800 rounded-100 inset-0 opacity-5 hover:opacity-10 opacity-transition"></div>
                                                </Link>
                                            </div>
                                            <Link href={`/ebay/itm/${item.id}`} className="block no-underline hover:text-current flex-grow">
                                                <div className="flex flex-col gap-50 items-start h-full">
                                                    <span title={item.title} className="bc-item-detail-title block line-clamp-2 min-h-[2.50rem] text-body text-primary w-full whitespace-normal hover:underline">
                                                        {item.title}
                                                    </span>
                                                    <div className="flex flex-col w-full mt-[2px] mb-[2px] md:mt-[4px] md:mb-[4px]">
                                                        {item.originalPrice ? (
                                                            <span className="bc-item-detail-price-discounted flex flex-wrap gap-x-100 items-baseline">
                                                                <ins className="font-weight-bold no-underline text-medium text-primary">${item.price.toFixed(2)}</ins>
                                                                <del className="text-secondary text-small">${item.originalPrice.toFixed(2)}</del>
                                                            </span>
                                                        ) : (
                                                            <span className="bc-item-detail-price block font-weight-bold text-medium text-primary">${item.price.toFixed(2)}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className="clipped"> - opens in new window or tab</span>
                                            </Link>
                                        </article>
                                    ))}
                            </div>
                        </div>

                    </div>

                    {/* Right: Product Info */}
                    <div className="flex-1 min-w-0">
                        {/* 1. Authenticity Guarantee */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className="flex items-center gap-1.5 text-[#191919] font-medium text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#3665f3]">
                                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm4.45 6.45l-4.3 4.3a.75.75 0 01-1.06-1.06l4.3-4.3a.75.75 0 011.06 1.06z" clipRule="evenodd" />
                                </svg>
                                eBay Refurbished
                            </span>
                        </div>

                        {/* 2. Title */}
                        <h1 className="text-xl md:text-2xl font-bold text-[#191919] mb-4 leading-snug">
                            {product.title}
                        </h1>

                        {/* 3. Seller Card (Summary) */}
                        <div className="flex items-center justify-between border-t border-gray-200 py-3 mb-2">
                            <div className="flex items-center gap-3">
                                {/* Logo */}
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                                    <div className="flex flex-col items-center justify-center leading-none">
                                        <span className="text-[8px] font-bold text-gray-500">DIRECT</span>
                                        <span className="text-[8px] font-bold text-gray-500">AUTH</span>
                                    </div>
                                </div>
                                <div className="leading-tight">
                                    <div className="flex items-center gap-1 mb-0.5">
                                        <span className="font-bold text-sm text-[#191919]">{product.seller?.username || 'DirectAuth'}</span>
                                        <span className="text-sm text-[#767676]">({product.seller?.feedbackScore || '60239'})</span>
                                    </div>
                                    <div className="text-sm flex flex-wrap gap-1 text-[#191919]">
                                        <span className="text-[#191919] underline decoration-dotted">{product.seller?.positivePercentage || '99.3'}% positive</span>
                                        <span className="text-gray-400">·</span>
                                        <a href="#" className="underline decoration-dotted text-[#191919] hover:underline">Seller's other items</a>
                                        <span className="text-gray-400">·</span>
                                        <a href="#" className="underline decoration-dotted text-[#191919] hover:underline">Contact seller</a>
                                    </div>
                                </div>
                            </div>
                            <button className="text-[#191919] hover:bg-gray-100 p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                        <div className="border-b border-gray-200 mb-5"></div>

                        {/* 4. Price */}
                        <div className="mb-6">
                            <div className="flex items-baseline gap-3 mb-1">
                                <span className="text-[24px] font-bold text-[#191919]">
                                    US ${product.price.toFixed(2)}
                                </span>
                            </div>
                            <div className="text-sm text-[#767676] mb-2 flex items-center gap-1 flex-wrap">
                                <span>List price <span className="line-through">US $1,299.99</span></span>
                                <span>(58% off)</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#191919] cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>
                                <a href="#" className="text-[#191919] underline decoration-dotted hover:underline">Price details</a>
                            </div>
                            <div className="text-sm text-[#191919]">
                                as low as $49.29/mo with <span className="font-bold">Klarna</span>. <a href="#" className="underline decoration-dotted hover:underline">Learn more</a>
                            </div>
                        </div>

                        {/* 5. Condition */}
                        <div className="flex items-baseline gap-8 mb-4 border-t border-gray-100 pt-4">
                            <span className="w-16 font-medium text-[#191919] text-sm pt-0.5">Condition:</span>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-[#191919]">{product.condition || 'Very Good - Refurbished'}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#191919] cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>
                            </div>
                        </div>

                        {/* 6. Dynamic Selectors (Color, Size, etc.) */}
                        {(product.options && product.options.length > 0 ? product.options : (function () {
                            // Fallback logic for items without explicit options
                            const cat = product.category || "";
                            const title = (product.title || "").toLowerCase();
                            let options = [];

                            if (cat.includes('Cell Phones') || title.includes('phone') || title.includes('apple') || title.includes('samsung')) {
                                options = [
                                    { label: "Color", values: ["Black", "White", "Blue", "Silver"] },
                                    { label: "Storage Capacity", values: ["128 GB", "256 GB", "512 GB"] }
                                ];
                            } else if (cat.includes('Clothing') || title.includes('shirt') || title.includes('jacket') || title.includes('coat') || title.includes('pant')) {
                                if (title.includes('shoe') || title.includes('sneaker') || title.includes('boot')) {
                                    options = [
                                        { label: "US Shoe Size", values: ["7", "8", "9", "9.5", "10", "10.5", "11", "12"] },
                                        { label: "Color", values: ["Black", "White/Red", "Blue", "Grey"] }
                                    ];
                                } else {
                                    options = [
                                        { label: "Size (Men's)", values: ["S", "M", "L", "XL", "XXL"] },
                                        { label: "Color", values: ["Black", "Navy", "Gray", "White"] }
                                    ];
                                }
                            } else {
                                // Default
                                options = [
                                    { label: "Color", values: ["Black", "White", "Silver"] }
                                ];
                            }
                            return options;
                        })()).map((opt, i) => (
                            <div key={i} className="mb-4">
                                <div className="w-full relative group">
                                    <div className="w-full border border-gray-400 rounded-lg px-3 py-3 text-[#191919] bg-white hover:border-[#191919] cursor-pointer flex items-center justify-between">
                                        <span className="text-sm">{opt.label}: <span className="font-bold">{opt.values[0]}</span></span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-[#191919]">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </div>
                                    <select className="absolute inset-0 opacity-0 cursor-pointer w-full h-full">
                                        {opt.values.map(v => <option key={v}>{v}</option>)}
                                    </select>
                                </div>
                            </div>
                        ))}

                        {/* 7. Quantity */}
                        <div className="flex items-center gap-8 mb-8">
                            <span className="w-16 font-medium text-[#191919] text-sm">Quantity:</span>
                            <div className="flex items-center gap-3">
                                <input type="number" defaultValue={1} className="w-12 h-10 border border-gray-400 rounded-md px-2 text-center text-[#191919] focus:border-black focus:outline-none" />
                                <span className="text-[#dd1e31] font-bold text-sm">38,313 sold</span>
                            </div>
                        </div>

                        {/* 8. Buttons */}
                        <div className="flex flex-col gap-3 w-full mb-8">
                            <button className="w-full bg-[#3665f3] text-white py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-sm cursor-pointer">
                                Buy It Now
                            </button>
                            <button className="w-full bg-white text-[#3665f3] py-3 rounded-full font-bold text-lg hover:bg-[#e5efff] transition-colors border border-[#3665f3] cursor-pointer">
                                Add to cart
                            </button>
                            <button className="w-full bg-white text-[#3665f3] py-3 rounded-full font-bold text-lg hover:bg-[#e5efff] border border-[#3665f3] flex items-center justify-center gap-2 transition-colors cursor-pointer">
                                <span className="text-xl">♡</span>
                                Add to Watchlist
                            </button>
                        </div>
                    </div>
                </div>

                {/* Full Width Sections */}
                <div className="mt-8">
                    {/* Explore Related Items */}
                    <RelatedItems products={featuredProducts.filter(p => p.id !== product.id).reverse()} />

                    {/* About This Item */}
                    <AboutSection product={product} />

                    {/* About this seller (Moved to bottom) */}
                    <div className="mt-8 border-t border-gray-200 pt-6">
                        <h2 className="text-xl font-bold text-[#191919] mb-4">About this seller</h2>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-[#3665f3] rounded-full flex items-center justify-center text-white font-bold text-2xl uppercase">
                                {(product.seller?.username || 'DA').substring(0, 2)}
                            </div>
                            <div>
                                <a href="#" className="font-bold text-[#191919] text-lg hover:underline block">{product.seller?.username || 'DirectAuth'}</a>
                                <div className="text-sm text-[#767676]">{product.seller?.positivePercentage || '99.3'}% positive feedback</div>
                                <div className="text-sm text-[#767676]">({product.seller?.feedbackScore || '60239'} sold)</div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm font-bold text-[#191919]">
                            <a href="#" className="hover:underline border border-gray-300 rounded-full px-4 py-2 text-[#191919]">Contact seller</a>
                            <a href="#" className="hover:underline border border-gray-300 rounded-full px-4 py-2 text-[#191919]">Visit store</a>
                            <a href="#" className="hover:underline border border-gray-300 rounded-full px-4 py-2 text-[#191919]">See other items</a>
                        </div>
                    </div>
                </div>
            </div >

            <EbayFooter />
        </div >
    );
};

export default EbayItem;
