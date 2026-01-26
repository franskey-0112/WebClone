import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import EbayHeader from '../../components/ebay/EbayHeader';
import EbayFooter from '../../components/ebay/EbayFooter';
import PromoCarousel from '../../components/ebay/PromoCarousel';
import { heroSlides, featuredProducts } from '../../data/ebayData';
import Link from 'next/link';
import Image from 'next/image';

const EbayHome = () => {
    const [recentItems, setRecentItems] = useState([]);
    const recentItemsListRef = useRef(null);

    useEffect(() => {
        // Load recent items from local storage
        try {
            const viewedStr = localStorage.getItem('ebay_recently_viewed');
            if (viewedStr) {
                const viewedIds = JSON.parse(viewedStr);
                const items = viewedIds.map(id => featuredProducts.find(p => p.id === id)).filter(Boolean);
                if (items.length > 0) {
                    setRecentItems(items);
                    return;
                }
            }
        } catch (e) {
            console.error("Error loading recent items", e);
        }

        // Fallback: Default recommendations (Baby, Tech, Clothes) if no history
        const defaults = featuredProducts.filter(p =>
            p.category === 'Baby' ||
            p.category === 'Cell Phones & Accessories' ||
            p.category === 'Clothing, Shoes & Accessories'
        ).slice(0, 7);

        setRecentItems(defaults.length ? defaults : featuredProducts.slice(0, 7));
    }, []);

    const recentItemsViewportRef = useRef(null);

    const scrollRecentItems = (direction) => {
        if (!recentItemsViewportRef.current) return;

        const scrollAmount = recentItemsViewportRef.current.offsetWidth * 0.8;
        const currentScroll = recentItemsViewportRef.current.scrollLeft;
        const newScroll = direction === 'next'
            ? currentScroll + scrollAmount
            : currentScroll - scrollAmount;

        recentItemsViewportRef.current.scrollTo({
            left: newScroll,
            behavior: 'smooth'
        });
    };

    // Reusable product carousel component
    const ProductCarousel = ({ title, subtitle, products, listId }) => {
        const carouselViewportRef = useRef(null);
        const carouselId = listId || `product-carousel-${title.replace(/\s+/g, '-').toLowerCase()}`;
        const prevButtonId = `${carouselId}-prev`;
        const nextButtonId = `${carouselId}-next`;

        const scrollCarousel = (direction) => {
            if (!carouselViewportRef.current) return;

            const scrollAmount = carouselViewportRef.current.offsetWidth * 0.8; // Scroll 80% of visible width
            const currentScroll = carouselViewportRef.current.scrollLeft;
            const newScroll = direction === 'next'
                ? currentScroll + scrollAmount
                : currentScroll - scrollAmount;

            carouselViewportRef.current.scrollTo({
                left: newScroll,
                behavior: 'smooth'
            });
        };

        return (
            <section className="flex flex-col gap-[var(--spacing-200)] page-grid-container home-item-carousel mb-8">
                <div className="dp-item-carousel-module__wrapper">
                    <div className="dp-item-carousel-module__container">
                        <div className="flex flex-col dp-item-carousel-module__header mb-4">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h2 className="font-bold m-0 mr-[8px] text-[length:var(--font-size-large-1)] md:text-[length:var(--font-size-large-2)] text-[var(--color-foreground-primary)]">
                                        <a href="#" className="no-underline hover:underline text-inherit">{title}</a>
                                    </h2>
                                    {subtitle && <p className="text-sm text-[var(--color-foreground-secondary)] m-0 mt-1">{subtitle}</p>}
                                </div>
                                <div className="flex min-w-[45px]">
                                    <Link href="/ebay/sch" className="underline hover:text-[var(--color-foreground-secondary)] text-[var(--color-foreground-primary)]">See all</Link>
                                </div>
                            </div>
                        </div>
                        <div className="carousel dp-carousel-disable-mask m-0 mt-[var(--spacing-200)] xl:mt-[var(--spacing-300)] relative group" role="group">
                            <div className="carousel__container relative">
                                <button
                                    className="carousel__control carousel__control--prev"
                                    type="button"
                                    aria-label="Previous Slide"
                                    id={prevButtonId}
                                    onClick={() => scrollCarousel('prev')}
                                >
                                    <svg aria-hidden="true" className="icon icon--16" focusable="false">
                                        <use href="#icon-chevron-left-16"></use>
                                    </svg>
                                </button>
                                <div
                                    className="carousel__viewport overflow-x-auto custom-scrollbar pb-4"
                                    ref={carouselViewportRef}
                                >
                                    <ul
                                        className="carousel__list flex list-none p-0 m-0"
                                        id={carouselId}
                                    >
                                        {products.map((product, index) => (
                                            <li key={product.id} className={`carousel__snap-point flex-shrink-0`} style={{ width: 'calc(18.51851851851852% - 9.777777777777779px)', marginRight: index < products.length - 1 ? '12px' : '0' }}>
                                                <article data-moduleid="146925" data-typename="GridItemModule" data-viewport={JSON.stringify({ trackableId: `01KF340G2DCW04VJDKZ3R9MR9T-${product.id}` })} className="flex flex-col dp-entry-animiation gap-150 h-full">
                                                    <div data-itemid={product.id} data-trackableid={`01KF340G2DCW04VJDKZ3R9MR9T-${product.id}`} data-trackablemoduleid="146925" className="relative rounded-100 media-scrim-rgba">
                                                        <span data-testid="dp-iti-button-undefined" className="absolute right-100 top-100 z-10" style={{ pointerEvents: 'auto' }}>
                                                            <button aria-label="Watchlist" aria-pressed="false" className="dp-watchlist-toggle-button border-0 cursor-pointer h-400 inline-flex items-center justify-center p-0 relative rounded-full text-primary transition-all w-400 focus:opacity-90 hover:opacity-90" title="Watchlist" type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                                                                <span data-testid="icon-heart-16">
                                                                    <svg aria-hidden="true" className="icon icon--16" focusable="false">
                                                                        <use href="#icon-heart-16"></use>
                                                                    </svg>
                                                                </span>
                                                            </button>
                                                        </span>
                                                        <Link href={`/ebay/itm/${product.id}`} className="block no-underline hover:text-current dp-grid-item-module__link overflow-hidden rounded-100" data-testid="dp-gi-element-undefined" data-sp={`p4624852.m146925.l188512.c${index + 1}`} target="_blank" style={{ zIndex: 1 }}>
                                                            {product.image ? (
                                                                <img alt="" className="product-image block w-full rounded-100 product-image-transition aspect-ratio-square" aria-labelledby={`item-${listId}-${index + 1}`} src={product.image} style={{ objectFit: 'cover' }} />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-4xl">📦</div>
                                                            )}
                                                            <div className="absolute bg-neutral-800 rounded-100 inset-0 opacity-5 hover:opacity-10 opacity-transition"></div>
                                                        </Link>
                                                    </div>
                                                    <Link href={`/ebay/itm/${product.id}`} className="block no-underline hover:text-current flex-grow" id={`item-${listId}-${index + 1}`} data-testid={`dp-gi-element-undefined-0`} data-sp={`p4624852.m146925.l188512.c${index + 1}`} target="_blank">
                                                        <div className="flex flex-col gap-50 items-start h-full">
                                                            <span title={product.title} className="bc-item-detail-title block line-clamp-2 min-h-[2.50rem] text-body text-primary w-full whitespace-normal hover:underline">
                                                                {product.title}
                                                            </span>
                                                            <div className="flex flex-col w-full mt-[2px] mb-[2px] md:mt-[4px] md:mb-[4px]">
                                                                {product.originalPrice ? (
                                                                    <span className="bc-item-detail-price-discounted flex flex-wrap gap-x-100 items-baseline">
                                                                        <ins className="font-weight-bold no-underline text-medium text-primary">${product.price.toFixed(2)}</ins>
                                                                        <del className="text-secondary text-small">${product.originalPrice.toFixed(2)}</del>
                                                                    </span>
                                                                ) : (
                                                                    <span className="bc-item-detail-price block font-weight-bold text-medium text-primary">${product.price.toFixed(2)}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <span className="clipped"> - opens in new window or tab</span>
                                                    </Link>
                                                </article>
                                                <div aria-modal="false" role="dialog" className="snackbar-dialog z-4 snackbar-dialog--transition" hidden aria-live="polite">
                                                    <div className="snackbar-dialog__window">
                                                        <div className="snackbar-dialog__header"></div>
                                                        <div className="snackbar-dialog__main"></div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button
                                    className="carousel__control carousel__control--next"
                                    type="button"
                                    aria-label="Next Slide"
                                    id={nextButtonId}
                                    onClick={() => scrollCarousel('next')}
                                >
                                    <svg aria-hidden="true" className="icon icon--16" focusable="false">
                                        <use href="#icon-chevron-right-16"></use>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    return (
        <div className="min-h-screen bg-white ebay-scope">
            <Head>
                <title>Electronics, Cars, Fashion, Collectibles & More | eBay</title>
                <meta name="description" content="Buy & sell electronics, cars, clothes, collectibles & more on eBay, the world's online marketplace. Top brands, low prices & free shipping on many items." />
            </Head>

            <EbayHeader />

            <main className="mx-auto w-full px-0" style={{ maxWidth: 'var(--page-grid-max-width)' }}>

                {/* Section 1: Recently Viewed (Dynamic or Default) */}
                {/* Section 1: Recently Viewed (Dynamic or Default) */}
                <section className="flex flex-col gap-[var(--spacing-200)] page-grid-container home-item-carousel mb-8">
                    <div className="dp-item-carousel-module__wrapper">
                        <div className="dp-item-carousel-module__container">
                            <div className="flex flex-col dp-item-carousel-module__header mb-4">
                                <div className="flex justify-between items-end">
                                    <h2 className="font-bold m-0 mr-[8px] text-[length:var(--font-size-large-1)] md:text-[length:var(--font-size-large-2)] text-[var(--color-foreground-primary)]">
                                        <a href="#" className="no-underline hover:underline text-inherit">Your recently viewed items</a>
                                    </h2>
                                    <div className="flex min-w-[45px]">
                                        <Link href="/ebay/sch" className="underline hover:text-[var(--color-foreground-secondary)] text-[var(--color-foreground-primary)]">See all</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel dp-carousel-disable-mask m-0 mt-[var(--spacing-200)] xl:mt-[var(--spacing-300)] relative group" role="group">
                                <div className="carousel__container relative">
                                    <button
                                        className="carousel__control carousel__control--prev"
                                        type="button"
                                        aria-label="Previous Slide"
                                        id="s0-2-0-1-1-0-2-9-4-10-2-0-3-1-3-@homepage-0-0-5[0]-@us_xc_homepage_dweb_general_ep_hot-1-0-5[0]-@us_xc_homepage_dweb_general_prod-2-0-@102790-rvi-dweb-m1-3-2-4-1-11-1-0-6-0-9-5-0-prev"
                                        onClick={() => scrollRecentItems('prev')}
                                    >
                                        <svg aria-hidden="true" className="icon icon--16" focusable="false">
                                            <use href="#icon-chevron-left-16"></use>
                                        </svg>
                                    </button>
                                    <div
                                        className="carousel__viewport overflow-x-auto custom-scrollbar pb-4"
                                        ref={recentItemsViewportRef}
                                    >
                                        <ul
                                            className="carousel__list flex list-none p-0 m-0"
                                            id="s0-2-0-1-1-0-2-9-4-10-2-0-3-1-3-@homepage-0-0-5[0]-@us_xc_homepage_dweb_general_ep_hot-1-0-5[0]-@us_xc_homepage_dweb_general_prod-2-0-@102790-rvi-dweb-m1-3-2-4-1-11-1-0-6-0-9-5-0-list"
                                        >
                                            {recentItems.map((product, index) => (
                                                <li key={product.id} className={`carousel__snap-point flex-shrink-0 ${index < recentItems.length - 1 ? '' : ''}`} style={{ width: 'calc(18.51851851851852% - 9.777777777777779px)', marginRight: index < recentItems.length - 1 ? '12px' : '0' }}>
                                                    <article data-moduleid="146925" data-typename="GridItemModule" data-viewport={JSON.stringify({ trackableId: `01KF340G2DCW04VJDKZ3R9MR9T-${product.id}` })} className="flex flex-col dp-entry-animiation gap-150 h-full">
                                                        <div data-itemid={product.id} data-trackableid={`01KF340G2DCW04VJDKZ3R9MR9T-${product.id}`} data-trackablemoduleid="146925" className="relative rounded-100 media-scrim-rgba">
                                                            <span data-testid="dp-iti-button-undefined" className="absolute right-100 top-100 z-10" style={{ pointerEvents: 'auto' }}>
                                                                <button aria-label="Watchlist" aria-pressed="false" className="dp-watchlist-toggle-button border-0 cursor-pointer h-400 inline-flex items-center justify-center p-0 relative rounded-full text-primary transition-all w-400 focus:opacity-90 hover:opacity-90" title="Watchlist" type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                                                                    <span data-testid="icon-heart-16">
                                                                        <svg aria-hidden="true" className="icon icon--16" focusable="false">
                                                                            <use href="#icon-heart-16"></use>
                                                                        </svg>
                                                                    </span>
                                                                </button>
                                                            </span>
                                                            <Link href={`/ebay/itm/${product.id}`} className="block no-underline hover:text-current dp-grid-item-module__link overflow-hidden rounded-100" data-testid="dp-gi-element-undefined" data-sp={`p4624852.m146925.l188512.c${index + 1}`} target="_blank" style={{ zIndex: 1 }}>
                                                                {product.image ? (
                                                                    <img alt="" className="product-image block w-full rounded-100 product-image-transition aspect-ratio-square" aria-labelledby={`item-${index + 1}`} src={product.image} style={{ objectFit: 'cover' }} />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-4xl">📦</div>
                                                                )}
                                                                <div className="absolute bg-neutral-800 rounded-100 inset-0 opacity-5 hover:opacity-10 opacity-transition"></div>
                                                            </Link>
                                                        </div>
                                                        <Link href={`/ebay/itm/${product.id}`} className="block no-underline hover:text-current flex-grow" id={`item-${index + 1}`} data-testid={`dp-gi-element-undefined-0`} data-sp={`p4624852.m146925.l188512.c${index + 1}`} target="_blank">
                                                            <div className="flex flex-col gap-50 items-start h-full">
                                                                <span title={product.title} className="bc-item-detail-title block line-clamp-2 min-h-[2.50rem] text-body text-primary w-full whitespace-normal hover:underline">
                                                                    {product.title}
                                                                </span>
                                                                <div className="flex flex-col w-full mt-[2px] mb-[2px] md:mt-[4px] md:mb-[4px]">
                                                                    {product.originalPrice ? (
                                                                        <span className="bc-item-detail-price-discounted flex flex-wrap gap-x-100 items-baseline">
                                                                            <ins className="font-weight-bold no-underline text-medium text-primary">${product.price.toFixed(2)}</ins>
                                                                            <del className="text-secondary text-small">${product.originalPrice.toFixed(2)}</del>
                                                                        </span>
                                                                    ) : (
                                                                        <span className="bc-item-detail-price block font-weight-bold text-medium text-primary">${product.price.toFixed(2)}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <span className="clipped"> - opens in new window or tab</span>
                                                        </Link>
                                                    </article>
                                                    <div aria-modal="false" role="dialog" className="snackbar-dialog z-4 snackbar-dialog--transition" hidden aria-live="polite">
                                                        <div className="snackbar-dialog__window">
                                                            <div className="snackbar-dialog__header"></div>
                                                            <div className="snackbar-dialog__main"></div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button
                                        className="carousel__control carousel__control--next"
                                        type="button"
                                        aria-label="Next Slide"
                                        id="s0-2-0-1-1-0-2-9-4-10-2-0-3-1-3-@homepage-0-0-5[0]-@us_xc_homepage_dweb_general_ep_hot-1-0-5[0]-@us_xc_homepage_dweb_general_prod-2-0-@102790-rvi-dweb-m1-3-2-4-1-11-1-0-6-0-9-5-0-next"
                                        onClick={() => scrollRecentItems('next')}
                                    >
                                        <svg aria-hidden="true" className="icon icon--16" focusable="false">
                                            <use href="#icon-chevron-right-16"></use>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section Divider */}
                {/* Section Divider Removed */}

                {/* Store Bar */}
                {/* Store Bar */}
                <div className="w-full h-[100px] bg-white border border-gray-200 rounded-lg flex items-center px-6 gap-6 shadow-sm mt-8 overflow-hidden">
                    <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                            <img src="/images/ebay/products/home-garden/620.webp" className="w-full h-full object-cover scale-150" alt="Store Logo" />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-bold text-[#191919] text-base leading-tight">PLC Pro-0303</h3>
                            <p className="font-bold text-[#191919] text-sm leading-tight mt-0.5">9.0K items sold</p>
                            <p className="text-[11px] text-[#767676] mt-0.5">Sponsored</p>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center justify-start gap-3 overflow-hidden px-4 mask-linear-fade">
                        {featuredProducts.slice(20, 26).map((p, idx) => (
                            <div key={idx} className="w-[70px] h-[70px] bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                                <img src={p.image} className="w-full h-full object-cover mix-blend-multiply hover:scale-110 transition-transform duration-300" alt="" />
                            </div>
                        ))}
                    </div>

                    <div className="flex-shrink-0">
                        <button className="border-[1.5px] border-[#191919] text-[#191919] px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors whitespace-nowrap">Shop store on eBay</button>
                    </div>
                </div>

                {/* Section Divider */}
                {/* Section Divider Removed */}

                {/* Section 2: Sponsored (Based on recent views) */}
                <ProductCarousel
                    title="Sponsored items based on your recent views"
                    products={featuredProducts.slice(10, 18)}
                    listId="sponsored-items"
                />

                {/* Section 3: Deals for you (Industrial/High Discount) */}
                <ProductCarousel
                    title="Deals for you"
                    products={featuredProducts.filter(p => p.category === 'Business & Industrial' || p.discount).slice(0, 6)}
                    listId="deals-for-you"
                />

                {/* Section 4: Coats, Jackets & Vests */}
                <ProductCarousel
                    title="Coats, Jackets & Vests"
                    subtitle="Recommended for you"
                    products={featuredProducts.filter(p => p.category === 'Clothing, Shoes & Accessories' && (p.title.includes('Coat') || p.title.includes('Jacket') || p.title.includes('Vest'))).slice(0, 7)}
                    listId="coats-jackets-vests"
                />


                {/* Section Divider Removed */}

                {/* Section 6: Winter has nothing on you (Round Icons) */}
                <section className="py-8">
                    <h2 className="text-2xl font-bold text-[#191919] mb-8">Winter has nothing on you</h2>
                    <div className="flex flex-nowrap overflow-x-auto gap-8 items-start pb-4 custom-scrollbar">
                        {[
                            { name: 'Snow blowers', icon: '❄️', img: '/images/ebay/products/winter/snow-blower.png' },
                            { name: 'Bedding', icon: '🛏️', img: '/images/ebay/products/winter/bedding.png' },
                            { name: 'Generators', icon: '⚡', img: '/images/ebay/products/winter/generator.png' },
                            { name: "Men's Coats", icon: '🧥', img: '/images/ebay/products/winter/mens-coat.png' },
                            { name: "Women's Coats", icon: '👗', img: '/images/ebay/products/winter/womens-coat.png' },
                            { name: 'Tires', icon: '🚗', img: '/images/ebay/products/winter/tires.png' },
                            { name: 'Thermostats', icon: '🌡️', img: '/images/ebay/products/winter/thermostat.png' },
                        ].map((item, i) => (
                            <Link key={i} href={`/ebay/sch?_nkw=${encodeURIComponent(item.name)}`} className="flex flex-col items-center gap-4 cursor-pointer group flex-shrink-0 w-[185px] no-underline">
                                <div className="w-[185px] h-[185px] rounded-full bg-gray-100 flex items-center justify-center text-6xl overflow-hidden group-hover:shadow-lg transition-shadow bg-cover bg-center"
                                    style={item.img ? { backgroundImage: `url(${item.img})`, backgroundBlendMode: 'multiply' } : {}}>
                                    {!item.img && <span>{item.icon}</span>}
                                </div>
                                <span className="font-bold text-xl text-[#191919] group-hover:underline text-center">{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <PromoCarousel />

                {/* Section Divider Removed */}

                {/* Section 7: Live */}
                {/* Section 7: Live */}
                <section className="bg-white p-8 -mx-4 mt-8">
                    <div className="max-w-[1700px] mx-auto">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-[#191919]">eBay Live</h2>
                                <p className="text-[#707070]">Tune in and shop curated experiences</p>
                            </div>
                            <a href="#" className="font-medium hover:underline text-[#191919]">See all</a>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                            {[
                                { title: "Friday Deals @ a Buck and Go! with Westmoreland Rare Coins", user: "wstmcoins", viewers: "147", img: "/images/ebay/products/home-garden/103.webp" },
                                { title: "slabs and singles @1$", user: "noahtaylor_collects", viewers: "76", img: "/images/ebay/products/cell-phones-accessories/451.webp" },
                                { title: "COINS & CURRENCY WITH PCB HOBBY - FREE SHIPPING!! 1/16 J", user: "pcbhobby", viewers: "73", img: "/images/ebay/products/home-garden/432.webp" },
                                { title: "$1 Starts | Revolve, Anthropologie & More (Sudden Death Auction)", user: "worldsbestdeals", viewers: "67", img: "/images/ebay/products/clothing-shoes-accessories/205.webp" },
                                { title: "North Face, Adidas, Ralph Lauren, Hunter, Calvin Klein & O", user: "solenationlive", viewers: "54", img: "/images/ebay/products/clothing-shoes-accessories/218.webp" },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-3 min-w-[280px] w-[280px] cursor-pointer group">
                                    <div className="relative aspect-[9/13] bg-gray-200 rounded-xl overflow-hidden shadow-sm">
                                        <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute top-3 left-3 bg-green-600 text-white text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                            <span>LIVE</span>
                                            <span className="w-0.5 h-0.5 bg-white rounded-full mx-0.5"></span>
                                            <span>{item.viewers}</span>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-12 flex items-center justify-between text-white">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden border border-white/50">
                                                    {/* Placeholder avatar */}
                                                    <img src={item.img} alt={item.user} className="w-full h-full object-cover" />
                                                </div>
                                                <span className="text-sm font-medium truncate max-w-[120px]">{item.user}</span>
                                            </div>
                                            <div className="bg-white/20 hover:bg-white/30 rounded-full p-1.5 backdrop-blur-sm transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-sm text-[#191919] leading-tight line-clamp-2 group-hover:underline">
                                        {item.title}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section Divider Removed */}

                {/* Section 8: More to explore */}
                <section className="py-8 space-y-12">


                    {/* Random Products Row 1 */}
                    <ProductCarousel
                        title="More to explore"
                        products={featuredProducts.slice(30, 40)}
                        listId="more-to-explore-1"
                    />

                    {/* Ad Block 1: Men's Fashion (Moved & Fixed) */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row gap-4 shadow-sm">
                        <div className="flex-1 flex flex-col justify-center items-start pl-4">
                            <h3 className="text-3xl font-extrabold text-[#191919] mb-4">Men's fashion</h3>
                            <p className="text-[#707070] mb-8 text-lg">Show off your style.</p>
                            <button className="bg-[#191919] text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">Shop now</button>
                        </div>
                        <div className="flex-none w-[412px] rounded-xl overflow-hidden relative flex items-center justify-center">
                            {/* Fixed image: 412x412, Linked to first product */}
                            {(() => {
                                const categoryProducts = featuredProducts.filter(p => (p.category === 'Clothing, Shoes & Accessories' || p.category === 'Jewelry & Watches') && p.title.toLowerCase().includes('men') && !p.title.toLowerCase().includes('women'));
                                const firstProduct = categoryProducts[0] || {};
                                return (
                                    <Link href={`/ebay/itm/${firstProduct.id}`} className="block w-full h-full">
                                        <img src={firstProduct.image || "/images/ebay/products/clothing-shoes-accessories/201.webp"} className="w-[412px] h-[412px] object-contain" alt="Men's fashion" />
                                    </Link>
                                );
                            })()}
                        </div>
                        <div className="flex-none w-[412px] grid grid-cols-2 gap-4 content-center">
                            {featuredProducts.filter(p => (p.category === 'Clothing, Shoes & Accessories' || p.category === 'Jewelry & Watches') && p.title.toLowerCase().includes('men') && !p.title.toLowerCase().includes('women')).slice(1, 5).map(p => (
                                <Link key={p.id} href={`/ebay/itm/${p.id}`} className="relative w-[198px] h-[198px] rounded-100 media-scrim-rgba group cursor-pointer block">
                                    <img src={p.image} className="product-image block w-full h-full rounded-100 product-image-transition object-cover" alt={p.title} />
                                    <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm z-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#191919]">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Random Products Row 2 (Inserted) */}
                    <ProductCarousel
                        title="Daily Deals"
                        products={featuredProducts.slice(15, 25)}
                        listId="daily-deals"
                    />

                    {/* Ad Block 2: Wellness */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row gap-4 shadow-sm">
                        <div className="flex-1 flex flex-col justify-center items-start pl-4">
                            <h3 className="text-3xl font-extrabold text-[#191919] mb-4">Wellness</h3>
                            <p className="text-[#707070] mb-8 text-lg">Enhance your wellbeing.</p>
                            <button className="bg-[#191919] text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">Shop now</button>
                        </div>
                        <div className="flex-none w-[412px] rounded-xl overflow-hidden relative flex items-center justify-center">
                            {(() => {
                                const categoryProducts = featuredProducts.filter(p => p.category === 'Health & Beauty');
                                const firstProduct = categoryProducts[0] || {};
                                return (
                                    <Link href={`/ebay/itm/${firstProduct.id}`} className="block w-full h-full">
                                        <img src={firstProduct.image || "/images/ebay/products/health-beauty/434.webp"} className="w-[412px] h-[412px] object-contain" alt="Wellness" />
                                    </Link>
                                );
                            })()}
                        </div>
                        <div className="flex-none w-[412px] grid grid-cols-2 gap-4 content-center">
                            {featuredProducts.filter(p => p.category === 'Health & Beauty').slice(1, 5).map(p => (
                                <Link key={p.id} href={`/ebay/itm/${p.id}`} className="relative w-[198px] h-[198px] rounded-100 media-scrim-rgba group cursor-pointer block">
                                    <img src={p.image} className="product-image block w-full h-full rounded-100 product-image-transition object-cover" alt={p.title} />
                                    <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm z-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#191919]">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Random Products Row 3 */}
                    <ProductCarousel
                        title="Electronics & Cell Phones"
                        products={featuredProducts.filter(p => p.category === 'Cell Phones & Accessories' || p.category === 'Electronics').slice(0, 10)}
                        listId="electronics-cell-phones"
                    />
                </section>

            </main>

            {/* SVG Sprite for Icons */}
            <svg style={{ display: 'none' }} aria-hidden="true">
                <defs>
                    <symbol id="icon-heart-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </symbol>
                    <symbol id="icon-chevron-right-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </symbol>
                    <symbol id="icon-chevron-left-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </symbol>
                </defs>
            </svg>

            <EbayFooter />
        </div>
    );
};

export default EbayHome;
