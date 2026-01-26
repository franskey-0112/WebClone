import { useRouter } from 'next/router';
import Head from 'next/head';
import EbayHeader from '../../../components/ebay/EbayHeader';
import EbayFooter from '../../../components/ebay/EbayFooter';
import { featuredProducts } from '../../../data/ebayData';
import Link from 'next/link';

const EbayBrowse = () => {
    const router = useRouter();
    const { slug } = router.query;

    // Slug is an array in [...slug].js, e.g., ['Electronics', 'bn_123456']
    // We'll take the first element as the readable name, or fallback
    const categoryNameRaw = Array.isArray(slug) ? slug[0] : (slug || 'Category');
    const categoryName = categoryNameRaw.charAt(0).toUpperCase() + categoryNameRaw.slice(1);

    // In a real app, we would filter by category ID (slug[1]) or name. 
    // For now, reuse existing data.
    const products = featuredProducts;

    return (
        <div className="min-h-screen bg-white font-sans text-[#333]">
            <Head>
                <title>{categoryName} | eBay</title>
            </Head>
            <EbayHeader />

            <div className="max-w-[1400px] mx-auto px-4 py-4">
                {/* Breadcrumb */}
                <div className="text-xs text-[#767676] mb-4">
                    <Link href="/ebay" className="text-blue-600 hover:underline">eBay</Link>
                    <span className="mx-2">&gt;</span>
                    <span className="font-bold text-[#333]">{categoryName}</span>
                </div>

                <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>

                <div className="flex gap-4">
                    {/* Simple Sidebar */}
                    <div className="w-[240px] hidden md:block pr-4">
                        <h3 className="font-bold text-lg mb-4">Shop by Category</h3>
                        <ul className="text-sm space-y-2 mb-6 text-[#191919]">
                            <li><Link href="#" className="font-bold">New Arrivals</Link></li>
                            <li><Link href="#" className="hover:underline">Top Rated</Link></li>
                            <li><Link href="#" className="hover:underline">Auctions</Link></li>
                            <li><Link href="#" className="hover:underline">Buy It Now</Link></li>
                        </ul>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <Link key={product.id} href={`/ebay/itm/${product.id}`} className="group cursor-pointer">
                                    <div className="w-full h-[220px] bg-gray-100 rounded-lg mb-3 relative flex items-center justify-center overflow-hidden">
                                        {product.image ? (
                                            <img src={product.image} alt={product.title} className="w-full h-full object-contain p-4 mix-blend-multiply" />
                                        ) : (
                                            <span className="text-4xl">📦</span>
                                        )}
                                        {product.discount && (
                                            <div className="absolute top-2 left-2 bg-white text-[#191919] text-xs font-bold px-2 py-1 shadow-sm rounded-sm z-10">
                                                {product.discount}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-[#191919] group-hover:underline line-clamp-2 md:h-10 mb-1 leading-5">
                                            {product.title}
                                        </h3>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-lg font-bold text-[#191919]">${product.price.toFixed(2)}</span>
                                            {product.originalPrice && (
                                                <span className="text-xs text-[#707070] line-through">${product.originalPrice.toFixed(2)}</span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <EbayFooter />
        </div>
    );
};

export default EbayBrowse;
