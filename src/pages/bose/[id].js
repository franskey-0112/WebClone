import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/bose/Header';
import Footer from '../../components/bose/Footer';
import { products } from '../../data/boseData';
import { useCart } from '../../context/CartContext';

/**
 * 产品详情页
 */
export default function BoseProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const found = products.find(p => p.id === id);
      setProduct(found);
    }
  }, [id]);

  if (!product) {
    return (
      <>
        <Header />
        <main className="container py-8 text-center">
          <p>Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    // 将商品添加到购物车
    addToCart(product);
    // 跳转到购物车页面
    router.push('/bose/cart');
  };

  return (
    <>
      <Head>
        <title>{product.name} | Bose</title>
      </Head>

      <Header />

      <main>
        {/* 产品主要展示区 */}
        <section className="container py-8">
          <div className="grid grid-cols-2 gap-8">
            {/* 左侧图片 */}
            <div style={{ backgroundColor: '#f5f5f5', padding: '2rem', borderRadius: '8px' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%' }} />
            </div>

            {/* 右侧信息 */}
            <div className="flex flex-col justify-center">
              <span style={{ textTransform: 'uppercase', fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                {product.category}
              </span>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="original-price" style={{ fontSize: '1.2rem' }}>${product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              <div className="mb-4">
                <span style={{ fontWeight: 'bold' }}>Color: </span> {product.color}
              </div>

              <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
                {product.description}
              </p>

              <button 
                className="btn" 
                style={{ padding: '1rem 2rem', fontSize: '1.1rem', textAlign: 'center' }}
                onClick={handleAddToCart}
              >
                Add to Cart - ${product.price.toFixed(2)}
              </button>

              <div className="mt-4" style={{ fontSize: '0.9rem', color: '#666' }}>
                <p>✓ Free 2-day shipping</p>
                <p>✓ 90-day risk-free trial</p>
                <p>✓ 2-year warranty</p>
              </div>
            </div>
          </div>
        </section>

        {/* 特性展示区 */}
        <section className="container py-8 my-8">
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>Key Features</h2>
          <div className="grid grid-cols-3 gap-8 text-center">
            {product.features.map((feature, idx) => (
              <div key={idx} style={{ padding: '2rem', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
                <h3 style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{feature}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
