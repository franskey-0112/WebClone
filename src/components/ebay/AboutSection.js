import React from 'react';

const AboutSection = ({ product }) => {
    // Default/Fallback data if product details aren't fully populated
    const specifics = product?.specifics || {};
    const seller = product?.seller || {
        username: "DirectAuth",
        feedbackScore: 60239,
        positivePercentage: 99.3
    };

    // Helper to format specifics for display
    // We want to ensure 'Condition' is sometimes visible here if requested, 
    // but usually it's in the top hero. 
    // However, the screenshot shows 'Condition' as the first row. 
    // Let's prepend it if it exists and isn't in specifics.
    let displaySpecifics = { ...specifics };
    if (product?.condition && !displaySpecifics['Condition']) {
        displaySpecifics = { "Condition": product.condition, ...displaySpecifics };
    }

    const specificsEntries = Object.entries(displaySpecifics);
    const hasSpecifics = specificsEntries.length > 0;

    return (
        <div className="mt-8 font-sans text-[#333] max-w-[1600px]">
            {/* Tab Header */}
            <div className="block mb-[-1px]">
                <div className="inline-block border-t border-l border-r border-[#e5e5e5] rounded-t-lg bg-white relative z-10 px-6 py-3">
                    <h2 className="text-sm font-bold m-0 text-[#3665f3]">About this item</h2>
                </div>
                <div className="border-b border-[#e5e5e5]"></div>
            </div>

            {/* Card Content Container */}
            <div className="border border-[#e5e5e5] rounded-b-lg rounded-tr-lg p-6 bg-white">

                {/* Disclaimer and Item Number */}
                <div className="text-xs text-[#767676] mb-8 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                        <span>Seller assumes all responsibility for this listing.</span>
                        <span className="text-[#767676]">eBay item number: <span className="font-bold text-[#333]">{product?.id || '356227859677'}</span></span>
                    </div>
                    <div>
                        <span className="text-[#333] ">Last updated on</span> Jan 15, 2026 05:44:01 CST <a href="#" className="text-[#191919] underline decoration-dotted hover:no-underline">View all revisions</a>
                    </div>
                </div>

                {/* Item Specifics */}
                <div className="mb-10">
                    <h2 className="text-2xl font-bold mb-6 text-[#191919]">Item specifics</h2>

                    {hasSpecifics ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-4 text-sm">
                            {specificsEntries.map(([key, value], index) => (
                                <div key={key} className="flex items-start">
                                    <span className="w-1/3 text-[#767676] shrink-0">{key}</span>
                                    <span className="flex-1 font-medium text-[#191919]">{value}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-500 italic">No item specifics available for this product.</div>
                    )}
                </div>

                {/* Seller Description */}
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-[#191919]">Item description from the seller</h2>

                    {/* Premium Store Template Container */}
                    <div className="border-t border-[#e5e5e5] pt-10">
                        <div className="font-sans text-[#333]">

                            {/* 1. Seller Branding Header */}
                            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 px-2">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#3665f3] text-white rounded-full flex items-center justify-center font-bold text-xl uppercase shadow-sm">
                                        {seller.username[0]}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-xl leading-tight text-[#191919]">{seller.username}</span>
                                        <span className="text-xs text-[#767676] uppercase tracking-widest font-semibold mt-0.5">Official Store Listing</span>
                                    </div>
                                </div>
                                <button className="border-2 border-[#191919] text-[#191919] px-6 py-2 rounded-full font-bold text-sm hover:bg-[#191919] hover:text-white transition-colors uppercase tracking-wide">
                                    Visit Store
                                </button>
                            </div>

                            {/* 2. Marketing Banner */}
                            <div className="w-full h-14 bg-gradient-to-r from-[#191919] via-[#333] to-[#191919] flex items-center justify-between px-8 mb-10 rounded shadow-sm text-white overflow-hidden relative">
                                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                                <span className="font-bold tracking-widest text-sm uppercase z-10">Premium Quality</span>
                                <span className="font-bold tracking-widest text-sm uppercase z-10 hidden md:block">Satisfaction Guaranteed</span>
                                <span className="font-bold tracking-widest text-sm uppercase z-10">Fast Shipping</span>
                            </div>

                            {/* 3. Main Product Showcase */}
                            <div className="flex flex-col lg:flex-row gap-12 align-top">

                                {/* Left: Hero Image */}
                                <div className="w-full lg:w-1/2 flex flex-col">
                                    <div className="relative w-full aspect-[4/3] border border-gray-100 rounded-xl p-8 flex items-center justify-center bg-gray-50 mb-4 shadow-inner">
                                        {product?.image ? (
                                            <img src={product.image} alt={product.title} className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-xl" />
                                        ) : (
                                            <span className="text-4xl">📦</span>
                                        )}
                                    </div>
                                    <div className="flex justify-center gap-2">
                                        <span className="h-1.5 w-16 bg-[#3665f3] rounded-full"></span>
                                        <span className="h-1.5 w-4 bg-gray-200 rounded-full"></span>
                                        <span className="h-1.5 w-4 bg-gray-200 rounded-full"></span>
                                    </div>
                                </div>

                                {/* Right: Detailed Description & Specs */}
                                <div className="w-full lg:w-1/2 flex flex-col">
                                    <h3 className="text-2xl md:text-3xl font-bold text-[#191919] mb-6 leading-tight">
                                        {product?.title}
                                    </h3>

                                    <div className="w-24 h-1.5 bg-[#3665f3] mb-8"></div>

                                    {/* Description Content */}
                                    <div className="prose prose-lg text-[#333] leading-relaxed mb-8">
                                        {/* Inject existing HTML description or Fallback */}
                                        {product?.description ? (
                                            <div dangerouslySetInnerHTML={{ __html: product.description }} />
                                        ) : (
                                            <p className="text-gray-500 italic">No detailed description available.</p>
                                        )}
                                    </div>

                                    {/* Feature Highlights Box */}
                                    <div className="bg-[#f8f9fa] p-8 rounded-xl border border-gray-100 shadow-sm mt-auto">
                                        <h4 className="font-bold text-[#191919] text-lg mb-4 flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3665f3]" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Product Highlights
                                        </h4>
                                        <ul className="grid grid-cols-1 gap-3 text-sm text-[#555]">
                                            <li className="flex items-center gap-3">
                                                <span className="w-1.5 h-1.5 bg-[#3665f3] rounded-full"></span>
                                                Condition: <span className="font-semibold text-[#191919]">{product?.condition || 'New'}</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span className="w-1.5 h-1.5 bg-[#3665f3] rounded-full"></span>
                                                Brand: <span className="font-semibold text-[#191919]">{specifics?.Brand || 'Generic'}</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span className="w-1.5 h-1.5 bg-[#3665f3] rounded-full"></span>
                                                Shipping: <span className="font-semibold text-[#191919]">{product?.shipping?.service ? 'Fast & Free' : 'Standard'}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Note */}
                            <div className="mt-12 text-center text-xs text-gray-400 border-t border-gray-100 pt-4">
                                Copyright © {new Date().getFullYear()} {seller.username}. All Rights Reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;
