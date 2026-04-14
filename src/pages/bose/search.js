import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../../components/bose/Header';
import Footer from '../../components/bose/Footer';
import ProductCard from '../../components/bose/ProductCard';
import { products } from '../../data/boseData';

/**
 * 搜索/分类页面
 */
export default function BoseSearch() {
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('featured');

  // 获取所有唯一分类
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // 过滤和排序产品
  const filteredProducts = products
    .filter(p => filter === 'All' || p.category === filter)
    .sort((a, b) => {
      if (sort === 'price-low-high') return a.price - b.price;
      if (sort === 'price-high-low') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      return 0; // featured (default order)
    });

  return (
    <>
      <Head>
        <title>Search Results | Bose</title>
      </Head>

      <Header />

      <main className="container py-8">
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>All Products</h1>

        <div className="flex gap-8">
          {/* 侧边栏过滤器 */}
          <aside style={{ width: '250px' }}>
            <div className="mb-4">
              <h3 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Category</h3>
              <ul>
                {categories.map(cat => (
                  <li key={cat} style={{ marginBottom: '0.5rem' }}>
                    <label className="flex items-center" style={{ cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="category" 
                        checked={filter === cat}
                        onChange={() => setFilter(cat)}
                        style={{ marginRight: '0.5rem' }}
                      />
                      {cat}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* 产品列表区域 */}
          <div style={{ flex: 1 }}>
            <div className="flex justify-between items-center mb-4">
              <span>{filteredProducts.length} results</span>
              <select 
                value={sort} 
                onChange={(e) => setSort(e.target.value)}
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div style={{ padding: '4rem', textAlign: 'center', color: '#666' }}>
                No products found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
