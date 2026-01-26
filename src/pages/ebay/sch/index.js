import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import EbayHeader from '../../../components/ebay/EbayHeader';
import EbayFooter from '../../../components/ebay/EbayFooter';
import { featuredProducts } from '../../../data/ebayData';
import { categoryLayouts } from '../../../data/categoryLayouts';

const EbaySearch = () => {
    const router = useRouter();
    const { _nkw, _sacat } = router.query;
    const [results, setResults] = useState([]);
    const [hubData, setHubData] = useState(null);

    // Simple category ID to Name mapping based on EbayHeader.js
    const categoryIdMap = {
        "20081": "Antiques",
        "550": "Art",
        "2984": "Baby",
        "267": "Books",
        "12576": "Business & Industrial",
        "625": "Cameras & Photo",
        "15032": "Cell Phones & Accessories",
        "11450": "Clothing, Shoes & Accessories",
        "11116": "Coins & Paper Money",
        "1": "Collectibles",
        "58058": "Computers/Tablets & Networking",
        "293": "Consumer Electronics",
        "14339": "Crafts",
        "237": "Dolls & Bears",
        "11232": "Movies & TV",
        "6000": "eBay Motors",
        "45100": "Entertainment Memorabilia",
        "172008": "Gift Cards & Coupons",
        "26395": "Health & Beauty",
        "11700": "Home & Garden",
        "281": "Jewelry & Watches",
        "11233": "Music",
        "619": "Musical Instruments & Gear",
        "1281": "Pet Supplies",
        "870": "Pottery & Glass",
        "10542": "Real Estate",
        "316": "Specialty Services",
        "888": "Sporting Goods",
        "64482": "Sports Mem, Cards & Fan Shop",
        "260": "Stamps",
        "1305": "Tickets & Experiences",
        "220": "Toys & Hobbies",
        "3252": "Travel",
        "1249": "Video Games & Consoles",
        "99": "Everything Else"
    };

    useEffect(() => {
        if (!router.isReady) return;

        // Reset hub data
        setHubData(null);

        // Check if we have a special hub layout for this category
        if (_sacat && categoryLayouts[_sacat] && !_nkw) {
            setHubData(categoryLayouts[_sacat]);
        }

        let filtered = featuredProducts;

        // Keyword filter
        if (_nkw) {
            const lowerQuery = _nkw.toLowerCase();
            filtered = filtered.filter(p =>
                (p.title && p.title.toLowerCase().includes(lowerQuery)) ||
                (p.category && p.category.toLowerCase().includes(lowerQuery))
            );
        }

        // Category filter
        if (_sacat && _sacat !== '0') {
            const targetCategory = categoryIdMap[_sacat];
            if (targetCategory) {
                filtered = filtered.filter(p =>
                    p.category === targetCategory ||
                    (p.category && p.category.includes(targetCategory))
                );
            }
        }

        setResults(filtered);

    }, [router.isReady, _nkw, _sacat]);

    // Render Hub Layout
    const renderHub = () => (
        <div className="flex gap-8">
            {/* Hub Sidebar */}
            <div className="w-[240px] hidden md:block shrink-0">
                <h3 className="font-bold text-lg mb-4">Shop by category</h3>
                <ul className="text-sm space-y-3 mb-6 text-[#191919]">
                    {hubData.sidebarCategories.map((cat, i) => (
                        <li key={i}><a href="#" className="hover:underline block py-0.5">{cat}</a></li>
                    ))}
                </ul>
            </div>

            {/* Hub Content */}
            <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold text-[#191919] mb-8">{hubData.title}</h1>

                {hubData.sections.map((section, idx) => (
                    <div key={idx} className="mb-12">
                        {section.title && <h2 className="text-2xl font-bold text-[#191919] mb-6">{section.title}</h2>}

                        {/* Grid Style */}
                        {section.type === "category-grid" && (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {section.items.map((item, i) => (
                                    <div key={i} className="flex flex-col gap-3 group cursor-pointer">
                                        <div className="bg-gray-100 rounded-xl aspect-square flex items-center justify-center overflow-hidden">
                                            {item.img ? (
                                                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                            ) : (
                                                <span className="text-4xl">📦</span>
                                            )}
                                        </div>
                                        <span className="font-bold text-[#191919] group-hover:underline leading-tight text-center">{item.title}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Brand Row Style */}
                        {section.type === "brand-row" && (
                            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                                {section.items.map((item, i) => (
                                    <div key={i} className="flex flex-col gap-3 group cursor-pointer shrink-0 w-[180px]">
                                        <div className="bg-gray-100 rounded-xl aspect-square flex items-center justify-center p-6">
                                            {item.img ? (
                                                <img src={item.img} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                                            ) : (
                                                <span className="text-xl font-bold text-gray-400">{item.title}</span>
                                            )}
                                        </div>
                                        <span className="font-bold text-[#191919] group-hover:underline text-center">{item.title}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Banner Style */}
                        {section.type === "banner" && (
                            <div className="w-full rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 mt-8" style={{ backgroundColor: section.bgColor || "#f0f0f0" }}>
                                <div className="flex flex-col gap-2 max-w-lg">
                                    <h2 className="text-3xl font-bold text-[#191919]">{section.title}</h2>
                                    <p className="text-lg text-[#333]">{section.subtitle}</p>
                                    <button className="mt-4 px-6 py-2 border border-[#191919] rounded-full font-bold bg-white text-[#191919] hover:bg-[#191919] hover:text-white transition-colors w-fit">
                                        {section.cta}
                                    </button>
                                </div>
                                <div className="w-64 flex items-center justify-center">
                                    {section.image ? (
                                        <img src={section.image} alt={section.title} className="max-w-full max-h-full object-contain" />
                                    ) : (
                                        <div className="text-4xl font-bold text-blue-500">eBay <span className="text-blue-400">x</span> 支</div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Product Carousel Style */}
                        {section.type === "product-carousel" && (
                            <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
                                {section.items.map((item, i) => (
                                    <div key={i} className="min-w-[220px] w-[220px] bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
                                        <div className="w-full h-[180px] bg-gray-100 rounded mb-3 overflow-hidden flex items-center justify-center">
                                            {item.img ? (
                                                <img src={item.img} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                                            ) : (
                                                <span className="text-4xl">📦</span>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-[#191919] hover:underline text-sm line-clamp-2 h-10 leading-tight">{item.title}</h3>
                                            <div className="font-bold text-lg text-[#191919]">{item.price}</div>
                                            {item.originalPrice && <div className="text-xs text-[#767676] line-through">{item.originalPrice}</div>}
                                            {item.discount && <div className="text-xs font-bold text-[#dd1e31]">{item.discount}</div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Text List Style */}
                        {section.type === "text-list" && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-8">
                                {section.items.map((item, i) => (
                                    <div key={i}>
                                        <a href="#" className="text-[#191919] hover:underline text-sm block py-1">{item.title}</a>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Split Banner Style */}
                        {section.type === "split-banner" && (
                            <div className="flex flex-col md:flex-row bg-[#daf6f5] rounded-xl overflow-hidden mt-8">
                                <div className="p-8 md:w-1/3 flex flex-col justify-center">
                                    <h2 className="text-3xl font-bold text-[#191919] mb-4">{section.title}</h2>
                                    <p className="text-lg text-[#191919] mb-6">{section.subtitle}</p>
                                    <button className="px-6 py-2 border border-[#191919] rounded-full font-bold bg-transparent text-[#191919] hover:bg-[#191919] hover:text-white transition-colors w-fit">
                                        {section.cta}
                                    </button>
                                </div>
                                <div className="p-6 md:w-2/3 flex gap-4 overflow-x-auto">
                                    {section.items.map((item, i) => (
                                        <div key={i} className="min-w-[160px] bg-white rounded-lg p-3 shadow-sm flex-shrink-0">
                                            <div className="w-full h-[120px] flex items-center justify-center mb-2">
                                                <img src={item.img} alt={item.title} className="max-h-full max-w-full object-contain" />
                                            </div>
                                            <div className="text-sm font-bold text-[#191919]">{item.price}</div>
                                            <div className="text-xs text-[#767676] line-clamp-2">{item.title}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white font-sans text-[#333] ebay-scope">
            <Head>
                <title>{_nkw ? `${_nkw} | eBay` : (hubData ? hubData.title : 'Search Results | eBay')}</title>
            </Head>
            <EbayHeader />

            <div className="max-w-[1400px] mx-auto px-4 py-4">
                {hubData ? renderHub() : (
                    <div className="flex gap-4">
                        {/* Standard Search Sidebar */}
                        <div className="w-[240px] hidden md:block pr-4">
                            <h3 className="font-bold text-lg mb-4">Category</h3>
                            <ul className="text-sm space-y-2 mb-6 text-[#191919]">
                                <li><Link href="/ebay/sch?_sacat=293" className="font-bold">Electronics</Link></li>
                                <li><Link href="/ebay/sch?_sacat=58058" className="pl-2 hover:underline">Computers & Tablets</Link></li>
                                <li><Link href="/ebay/sch?_sacat=1249" className="pl-2 hover:underline">Video Games & Consoles</Link></li>
                                <li><Link href="/ebay/sch?_sacat=625" className="pl-2 hover:underline">Cameras & Photo</Link></li>
                            </ul>

                            <h3 className="font-bold text-lg mb-4 border-t pt-4">Condition</h3>
                            <div className="space-y-2 text-sm">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /> New
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /> Used
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /> Certified Refurbished
                                </label>
                            </div>

                            <h3 className="font-bold text-lg mb-4 border-t pt-4 mt-4">Price</h3>
                            <div className="flex items-center gap-2 text-sm mb-2">
                                <input type="text" placeholder="$" className="w-20 border border-gray-300 rounded p-1" />
                                to
                                <input type="text" placeholder="$" className="w-20 border border-gray-300 rounded p-1" />
                            </div>
                        </div>

                        {/* Standard Search Results */}
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold mb-2">Results for <span className="text-[#191919]">{_nkw || "Anything"}</span></h1>
                            <p className="text-sm text-[#767676] mb-4">{results.length} items found</p>

                            <div className="space-y-6">
                                {results.length > 0 ? results.map((product) => (
                                    <Link key={product.id} href={`/ebay/itm/${product.id}`} className="flex gap-6 p-4 border border-gray-300 rounded hover:shadow-lg transition-shadow bg-white text-[#333] hover:text-[#333]">
                                        <div className="w-[200px] h-[200px] bg-gray-100 flex items-center justify-center text-6xl rounded flex-shrink-0 overflow-hidden">
                                            {product.image ? (
                                                <img src={product.image} alt={product.title} className="w-full h-full object-contain p-2 mix-blend-multiply" />
                                            ) : (
                                                "📦"
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg text-[#191919] hover:underline font-medium mb-1">{product.title}</h3>
                                            <p className="text-xs text-[#767676] mb-2">{product.condition}</p>
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <span className="text-2xl font-bold text-[#191919]">${product.price.toFixed(2)}</span>
                                                {product.originalPrice && (
                                                    <span className="text-sm text-[#767676] line-through">was ${product.originalPrice.toFixed(2)}</span>
                                                )}
                                            </div>
                                            {product.discount && (
                                                <div className="text-sm text-[#dd1e31] font-semibold mb-2">{product.discount}</div>
                                            )}
                                            <div className="text-sm text-[#767676] mb-1">Free shipping</div>
                                            <div className="text-sm text-[#767676]">Free returns</div>
                                            {/* Seller Info */}
                                            <div className="text-sm text-[#767676] mt-2">
                                                Sold by <span className="text-[#191919] font-medium">{product.seller?.username || 'eBay Seller'}</span> ({product.seller?.feedbackScore || Math.floor(Math.random() * 1000)})
                                            </div>
                                        </div>
                                    </Link>
                                )) : (
                                    <div className="text-center py-10">
                                        <p className="text-lg text-[#767676]">No matching results found.</p>
                                        <p className="text-sm text-[#767676]">Try checking your spelling or use different keywords.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <EbayFooter />
        </div>
    );
};

export default EbaySearch;
