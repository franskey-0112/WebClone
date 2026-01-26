import React, { useRef } from 'react';
import Link from 'next/link';

const RelatedItems = ({ products }) => {
    const scrollContainer = useRef(null);

    const scroll = (direction) => {
        if (scrollContainer.current) {
            const scrollAmount = 600;
            scrollContainer.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="mt-12 font-sans">
            <div className="flex justify-between items-baseline mb-4">
                <div>
                    <h2 className="text-xl font-bold text-[#191919]">Explore related items</h2>
                    <span className="text-xs text-[#767676]">Sponsored</span>
                </div>
                <a href="#" className="font-bold text-[#191919] hover:underline text-sm">See all</a>
            </div>

            <div className="relative group">
                {/* Scroll Button Left */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/3 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-gray-200 hover:bg-gray-50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#191919]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                {/* Scroll Button Right */}
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/3 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-gray-200 hover:bg-gray-50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#191919]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>

                {/* Carousel Container */}
                <div
                    ref={scrollContainer}
                    className="flex overflow-x-auto gap-4 scrollbar-hide pb-4 snap-x"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {products.map((item) => (
                        <div key={item.id} className="min-w-[200px] w-[200px] snap-start flex flex-col gap-2">
                            {/* Card Image */}
                            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                <Link href={`/ebay/itm/${item.id}`}>
                                    {item.image ? (
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-4xl">📦</div>
                                    )}
                                </Link>
                                <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#191919]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Details */}
                            <div className="flex flex-col gap-1">
                                <Link href={`/ebay/itm/${item.id}`} className="text-[#191919] hover:underline text-sm leading-snug line-clamp-2 min-h-[40px]">
                                    {item.title}
                                </Link>

                                {/* Badge if available */}
                                {item.condition === 'New' && (
                                    <span className="text-[10px] font-bold text-[#dd1e31] uppercase tracking-wide border border-[#dd1e31] px-1 rounded-sm w-fit">LAST ONE</span>
                                )}

                                <div className="text-[#191919] font-bold text-lg">
                                    ${item.price.toFixed(2)}
                                </div>
                                <div className="text-xs text-[#767676]">
                                    + ${(typeof item.shipping === 'object' ? item.shipping.cost : (item.shipping || 15.00)).toFixed(2)} shipping
                                </div>
                                <div className="text-xs text-[#767676]">
                                    {item.soldCount || 100} sold
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-b border-gray-200 mt-8"></div>
        </div>
    );
};

export default RelatedItems;
