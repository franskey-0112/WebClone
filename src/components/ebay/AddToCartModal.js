import Link from 'next/link';
import { featuredProducts } from '../../data/ebayData';

const AddToCartModal = ({ isOpen, onClose, product, cartItemCount = 1 }) => {
    if (!isOpen || !product) return null;

    // Get related products
    const relatedProducts = featuredProducts
        .filter(p => p.id !== product.id)
        .slice(0, 4);

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl z-50 w-[90%] max-w-[700px] max-h-[90vh] overflow-auto">
                {/* Header */}
                <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                    </div>
                    <h2 className="text-lg font-bold text-[#191919]">Added to cart</h2>
                    <button
                        onClick={onClose}
                        className="ml-auto p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <svg className="w-5 h-5 text-[#767676]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col md:flex-row">
                    {/* Left - Added Item */}
                    <div className="flex-1 p-4 border-r border-gray-200">
                        <div className="flex gap-4">
                            {/* Product Image */}
                            <div className="w-[100px] h-[100px] bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                                {product.image ? (
                                    <img src={product.image} alt={product.title} className="w-full h-full object-contain p-2" />
                                ) : (
                                    <span className="text-3xl">📦</span>
                                )}
                            </div>
                            {/* Product Details */}
                            <div className="flex-1 min-w-0">
                                <span className="inline-block bg-gray-100 text-[11px] font-medium text-[#191919] px-2 py-0.5 rounded mb-1">
                                    IN 7225 CARTS
                                </span>
                                <h3 className="text-sm text-[#191919] font-medium line-clamp-2 mb-1">{product.title}</h3>
                                <p className="text-xs text-[#767676]">{product.condition || 'Brand New'}</p>
                            </div>
                        </div>

                        {/* Price & Shipping */}
                        <div className="mt-4 space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-[#767676]">Item</span>
                                <span className="text-[#191919]">${product.price?.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#767676]">Shipping</span>
                                <span className="text-[#191919]">Free</span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-4 space-y-2">
                            <Link
                                href="/ebay/cart"
                                className="block w-full bg-[#3665f3] text-white py-2.5 rounded-full font-bold text-center text-sm hover:bg-blue-700 transition-colors"
                            >
                                See in cart
                            </Link>
                            <Link
                                href="/ebay/checkout"
                                className="block w-full bg-white text-[#3665f3] py-2.5 rounded-full font-bold text-center text-sm border border-[#3665f3] hover:bg-blue-50 transition-colors"
                            >
                                Checkout {cartItemCount} {cartItemCount === 1 ? 'Item' : 'Items'}
                            </Link>
                        </div>
                    </div>

                    {/* Right - Related Items */}
                    <div className="flex-1 p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <h3 className="font-bold text-[#191919] text-sm">Explore related items</h3>
                                <p className="text-xs text-[#767676]">Sponsored</p>
                            </div>
                            <Link href="#" className="text-xs text-[#191919] hover:underline">See all</Link>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {relatedProducts.map(item => (
                                <Link key={item.id} href={`/ebay/itm/${item.id}`} className="group" onClick={onClose}>
                                    <div className="aspect-square bg-gray-100 rounded-lg mb-1 flex items-center justify-center overflow-hidden relative">
                                        {item.image ? (
                                            <img src={item.image} alt={item.title} className="w-full h-full object-contain p-1" />
                                        ) : (
                                            <span className="text-xl">📦</span>
                                        )}
                                        <button className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-xs">♡</span>
                                        </button>
                                    </div>
                                    <h4 className="text-[10px] text-[#191919] line-clamp-2 leading-tight mb-0.5">{item.title}</h4>
                                    <div className="text-xs font-bold text-[#191919]">RMB {(item.price * 7.2).toFixed(2)}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddToCartModal;
