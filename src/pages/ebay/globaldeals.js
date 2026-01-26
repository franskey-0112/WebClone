import Head from 'next/head';
import EbayHeader from '../../components/ebay/EbayHeader';
import EbayFooter from '../../components/ebay/EbayFooter';
import { featuredProducts } from '../../data/ebayData';
import Link from 'next/link';

const EbayDeals = () => {
    // Filter for products that have a discount or original price
    const dealProducts = featuredProducts.filter(p => p.discount || p.originalPrice);

    return (
        <div className="min-h-screen bg-white font-sans text-[#333]">
            <Head>
                <title>Daily Deals | eBay</title>
            </Head>
            <EbayHeader />

            <div className="max-w-[1400px] mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-2">Daily Deals</h1>
                <p className="text-[#767676] mb-8">Featured deals on top brands.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dealProducts.map((product) => (
                        <Link key={product.id} href={`/ebay/itm/${product.id}`} className="group cursor-pointer block border border-transparent hover:border-gray-200 hover:shadow-lg rounded-lg p-3 transition-all">
                            <div className="w-full h-[220px] bg-gray-100 rounded-lg mb-3 relative flex items-center justify-center overflow-hidden">
                                {product.image ? (
                                    <img src={product.image} alt={product.title} className="w-full h-full object-contain p-4 mix-blend-multiply" />
                                ) : (
                                    <span className="text-4xl">📦</span>
                                )}
                                <div className="absolute top-2 left-2 bg-[#dd1e31] text-white text-xs font-bold px-2 py-1 shadow-sm rounded-sm z-10">
                                    {product.discount || "DEAL"}
                                </div>
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
                                            <span className="font-bold text-[#191919]">• {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</span>
                                        </div>
                                    )}
                                </div>
                                <div className="text-xs text-[#767676] mt-2">Free shipping</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <EbayFooter />
        </div>
    );
};

export default EbayDeals;
