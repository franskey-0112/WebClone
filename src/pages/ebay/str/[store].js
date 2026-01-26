import { useRouter } from 'next/router';
import Head from 'next/head';
import EbayHeader from '../../../components/ebay/EbayHeader';
import EbayFooter from '../../../components/ebay/EbayFooter';
import { featuredProducts } from '../../../data/ebayData';
import Link from 'next/link';

const EbayStore = () => {
    const router = useRouter();
    const { store } = router.query;
    const storeName = store ? store.charAt(0).toUpperCase() + store.slice(1) : 'Store';

    // Mock store products
    const products = featuredProducts.slice(0, 8); // Just show some products

    return (
        <div className="min-h-screen bg-white font-sans text-[#333]">
            <Head>
                <title>{storeName} | eBay Store</title>
            </Head>
            <EbayHeader />

            {/* Store Banner */}
            <div className="w-full h-[200px] bg-gradient-to-r from-blue-900 to-blue-600 relative mb-8">
                <div className="max-w-[1400px] mx-auto px-4 h-full flex items-end pb-8">
                    <div className="flex items-end gap-6 translate-y-1/2">
                        <div className="w-32 h-32 bg-white rounded-lg shadow-lg flex items-center justify-center text-4xl font-bold text-gray-300 border-4 border-white">
                            {storeName.substring(0, 1)}
                        </div>
                        <div className="pb-2">
                            <h1 className="text-3xl font-bold text-white drop-shadow-md">{storeName}</h1>
                            <div className="text-white/90 text-sm flex gap-2 items-center">
                                <span>100% Positive Feedback</span>
                                <span>•</span>
                                <span>50K+ Items Sold</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 pt-12 pb-8">
                <div className="flex gap-4 mb-6 border-b border-gray-200 pb-2">
                    <button className="font-bold pb-2 border-b-2 border-[#3665f3] text-[#3665f3]">All Items</button>
                    <button className="font-medium pb-2 text-[#767676] hover:text-[#191919]">Sale</button>
                    <button className="font-medium pb-2 text-[#767676] hover:text-[#191919]">About</button>
                    <button className="font-medium pb-2 text-[#767676] hover:text-[#191919]">Feedback</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Link key={product.id} href={`/ebay/itm/${product.id}`} className="group cursor-pointer">
                            <div className="w-full h-[220px] bg-gray-100 rounded-lg mb-3 relative flex items-center justify-center overflow-hidden border border-gray-100">
                                {product.image ? (
                                    <img src={product.image} alt={product.title} className="w-full h-full object-contain p-4 mix-blend-multiply" />
                                ) : (
                                    <span className="text-4xl">📦</span>
                                )}
                            </div>
                            <div>
                                <h3 className="text-sm text-[#191919] group-hover:underline line-clamp-2 h-10 mb-1 leading-5">
                                    {product.title}
                                </h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-lg font-bold text-[#191919]">${product.price.toFixed(2)}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <EbayFooter />
        </div>
    );
};

export default EbayStore;
