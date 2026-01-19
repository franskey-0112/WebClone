import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Calendar, Tag, Truck, User, ChevronRight, ChevronLeft } from 'lucide-react';
import Header from '../../components/bose/Header';
import Footer from '../../components/bose/Footer';
import ProductCard from '../../components/bose/ProductCard';
import { products, heroData } from '../../data/boseData';

/**
 * Category Navigation Component
 * 横向滚动的分类导航条
 */
const CategoryNav = () => {
  const categories = [
    'Earbuds',
    'Headphones',
    'Speakers',
    'Soundbars',
    'Home Theater',
    'Portable PA',
    'Aviation',
    'Accessories',
    'Sale'
  ];

  const scrollRight = () => {
    const container = document.getElementById('category-nav-scroll');
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    const container = document.getElementById('category-nav-scroll');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  return (
    <div className="category-nav-wrapper" style={{ borderBottom: '1px solid #e5e5e5' }}>
      <div className="container" style={{ position: 'relative', padding: '20px 40px' }}>
        
        {/* Left Scroll Button */}
        <button 
          onClick={scrollLeft}
          className="nav-scroll-btn-left"
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'white',
            border: '1px solid #e5e5e5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>

        {/* Right Scroll Button */}
        <button 
          onClick={scrollRight}
          className="nav-scroll-btn-right"
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'white',
            border: '1px solid #e5e5e5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <ChevronRight size={24} strokeWidth={1.5} />
        </button>

        <div 
          id="category-nav-scroll"
          className="category-nav-list" 
          style={{ 
            display: 'flex', 
            overflowX: 'auto', 
            whiteSpace: 'nowrap', 
            gap: '4px',
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none',  /* IE 10+ */
          }}
        >
          <style jsx>{`
            .category-nav-list::-webkit-scrollbar {
              display: none;
            }
            .category-nav-item:hover {
              background-color: #e0e0e0 !important;
            }
          `}</style>
          {categories.map((cat, idx) => (
            <Link href="/bose/search" key={idx} className="category-nav-item" style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold', 
              color: 'black', 
              textDecoration: 'none',
              fontSize: '0.9rem',
              flexShrink: 0,
              backgroundColor: '#f5f5f5',
              width: '200px',
              height: '100px',
              transition: 'background-color 0.2s'
            }}>
              {cat}
            </Link>
          ))}
          {/* 占位符，确保最后一个元素有右边距 */}
          <div style={{ minWidth: '60px' }}></div>
        </div>
      </div>
    </div>
  );
};

/**
 * Bose 首页
 */
export default function BoseHome() {
  useEffect(() => {
    console.log('BoseHome mounted');
  }, []);

  if (!heroData || !products) {
    return <div>Loading resources...</div>;
  }

  return (
    <>
      <Head>
        <title>Headphones, Earbuds, Speakers, Soundbars, & More | Bose</title>
        <meta name="description" content="Experience the latest in sound innovation. Shop Bose headphones, speakers, soundbars, and more." />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="hero">
          <img src={heroData.image} alt={heroData.title} />
          <div className="hero-content">
            <h4 className="hero-subtitle" style={{ color: '#f5f5f5' }}>{heroData.subtitle}</h4>
            <h1 className="hero-title">{heroData.title}</h1>
            <p className="hero-desc">
              {heroData.description}
            </p>
            <Link href={heroData.ctaLink} className="btn btn-white">
              {heroData.ctaText}
            </Link>
          </div>
        </section>

        {/* Category Navigation (紧贴 Hero 下方) */}
        <CategoryNav />

        {/* Trending Products */}
        <section className="container py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Trending products</h2>
            <Link href="/bose/search" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Shop all</Link>
          </div>
          
          <div className="grid grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Content Blocks */}
        <section className="container py-8">
          {/* Stacked Full Width Items */}
          <div className="flex flex-col gap-8 mb-12">
            {/* Certified Refurbished */}
            <div style={{ position: 'relative', backgroundColor: '#f5f5f5', borderRadius: '12px', overflow: 'hidden' }}>
              <img src="/images/bose/certified-refurbished.avif" alt="Refurbished" style={{ width: '100%', height: 'auto', display: 'block' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, padding: '50px', maxWidth: '400px', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem', lineHeight: '1.1' }}>Like new. Lower price.</h2>
                <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>Get up to 50% off Certified Refurbished Bose favorites before they’re gone.</p>
                <Link href="/bose/search" className="btn btn-white">SHOP</Link>
              </div>
            </div>

            {/* SoundLink Micro */}
            <div style={{ position: 'relative', backgroundColor: '#e0e0e0', borderRadius: '12px', overflow: 'hidden' }}>
              <img src="/images/bose/soundlink-micro-banner.avif" alt="SoundLink" style={{ width: '100%', height: 'auto', display: 'block' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, padding: '50px', maxWidth: '400px', color: '#000' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem', lineHeight: '1.1' }}>Bold colors. Unreal audio.</h2>
                <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>Explore SoundLink Micro (2nd Gen) in a range of vibrant hues.</p>
                <Link href="/bose/search" className="btn">BUY NOW</Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* Home Theater */}
            <div style={{ position: 'relative', backgroundColor: '#131317', borderRadius: '12px', overflow: 'hidden' }}>
              <img src="/images/bose/home-theater-cinematic.avif" alt="Home Theater" style={{ width: '100%', height: 'auto', display: 'block' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, padding: '50px', maxWidth: '400px', color: '#fff' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem', lineHeight: '1.1' }}>Score cinematic sound</h2>
                <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>Get game-day and movie-night ready with the best home theater equipment.</p>
                <Link href="/bose/search" className="btn btn-white">SHOP</Link>
              </div>
            </div>

            {/* Headphones */}
            <div style={{ position: 'relative', backgroundColor: '#131317', borderRadius: '12px', overflow: 'hidden' }}>
              <img src="/images/bose/headphones-shimmering.avif" alt="Headphones" style={{ width: '100%', height: 'auto', display: 'block' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, padding: '50px', maxWidth: '400px', color: '#000' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem', lineHeight: '1.1' }}>Premium sound. Shimmering shades.</h2>
                <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>Legendary noise cancellation and iconic audio available in an array of shades.</p>
                <Link href="/bose/search" className="btn">SHOP</Link>
              </div>
            </div>
          </div>
          
          {/* Automotive - Full Width */}
          <div style={{ marginTop: '2rem', position: 'relative', height: '500px', backgroundColor: '#131317', borderRadius: '12px', overflow: 'hidden' }}>
            <img src="/images/bose/automotive.avif" alt="Bose Automotive" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, padding: '50px', maxWidth: '400px', color: '#fff' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem', lineHeight: '1.1' }}>Bose Automotive</h2>
              <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>True believers in the power of sound</p>
              <Link href="https://automotive.bose.com" className="btn btn-white">Learn more</Link>
            </div>
          </div>
        </section>

        {/* Why Buy From Bose */}
        <section className="container py-16" style={{ marginTop: '4rem', borderTop: '1px solid #eee' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '3rem', letterSpacing: '-0.02em', lineHeight: 1 }}>Why buy from Bose</h2>
          <div className="grid grid-cols-4 gap-8">
            <div className="flex flex-col items-start">
              <div style={{ backgroundColor: '#f5f5f5', borderRadius: '50%', width: '120px', height: '120px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Calendar size={40} strokeWidth={1} />
              </div>
              <h3 style={{ fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '0.5rem', lineHeight: 1.2 }}>90-day return policy</h3>
              <p style={{ color: '#666', fontSize: '1rem', marginBottom: '1rem', lineHeight: 1.5 }}>Try it for 90 days to make sure it’s right for you.</p>
              <Link href="#" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem', color: '#0062cc', display: 'flex', alignItems: 'center' }}>
                Learn more <ChevronRight size={16} strokeWidth={3} style={{ marginLeft: '4px' }} />
              </Link>
            </div>
            <div className="flex flex-col items-start">
              <div style={{ backgroundColor: '#f5f5f5', borderRadius: '50%', width: '120px', height: '120px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Tag size={40} strokeWidth={1} />
              </div>
              <h3 style={{ fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '0.5rem', lineHeight: 1.2 }}>Price match promise</h3>
              <p style={{ color: '#666', fontSize: '1rem', marginBottom: '1rem', lineHeight: 1.5 }}>Shop confidently. We’ll match a lower price.</p>
              <Link href="#" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem', color: '#0062cc', display: 'flex', alignItems: 'center' }}>
                Learn more <ChevronRight size={16} strokeWidth={3} style={{ marginLeft: '4px' }} />
              </Link>
            </div>
            <div className="flex flex-col items-start">
              <div style={{ backgroundColor: '#f5f5f5', borderRadius: '50%', width: '120px', height: '120px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Truck size={40} strokeWidth={1} />
              </div>
              <h3 style={{ fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '0.5rem', lineHeight: 1.2 }}>Complimentary shipping & returns</h3>
              <p style={{ color: '#666', fontSize: '1rem', marginBottom: '1rem', lineHeight: 1.5 }}>On all in-stock orders of $49 or more.</p>
              <Link href="#" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem', color: '#0062cc', display: 'flex', alignItems: 'center' }}>
                Learn more <ChevronRight size={16} strokeWidth={3} style={{ marginLeft: '4px' }} />
              </Link>
            </div>
            <div className="flex flex-col items-start">
              <div style={{ backgroundColor: '#f5f5f5', borderRadius: '50%', width: '120px', height: '120px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <User size={40} strokeWidth={1} />
              </div>
              <h3 style={{ fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '0.5rem', lineHeight: 1.2 }}>My Bose perks</h3>
              <p style={{ color: '#666', fontSize: '1rem', marginBottom: '1rem', lineHeight: 1.5 }}>My Bose members receive welcome and birthday offers, exclusive experiences, and more.</p>
              <Link href="#" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem', color: '#0062cc', display: 'flex', alignItems: 'center' }}>
                Learn more <ChevronRight size={16} strokeWidth={3} style={{ marginLeft: '4px' }} />
              </Link>
            </div>
          </div>
        </section>

        {/* Brand Statement / Sound is Power */}
        <section className="py-16 text-left" style={{ backgroundColor: '#fff' }}>
          <div className="container">
            <h2 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '1rem', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>Sound is Power</h2>
            <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 0 4rem 0', color: '#333' }}>
              Looks good. Sounds amazing. Your life, your soundtrack, your Bose.
            </p>
            
            {/* UGC Media Gallery */}
            <div className="ugc-gallery grid grid-cols-2 gap-4">
              {/* Left Column - Large Image */}
              <div className="ugc-item">
                <img 
                  src="/images/bose/ugc/ugc-1.webp" 
                  alt="Sound is Power UGC Large" 
                  className="ugc-img"
                />
                <div className="ugc-overlay"></div>
              </div>

              {/* Right Column - 2x2 Grid */}
              <div className="grid grid-cols-2 gap-4 h-full">
                {[2, 3, 4, 5].map((num) => (
                  <div key={num} className="ugc-item">
                    <img 
                      src={`/images/bose/ugc/ugc-${num}.webp`} 
                      alt={`Sound is Power UGC ${num}`} 
                      className="ugc-img"
                    />
                    <div className="ugc-overlay"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Load More Button */}
            <div className="mt-12 mb-8">
              <button className="bg-black text-white px-8 py-3 text-sm font-bold tracking-wider hover:bg-gray-800 transition-colors">
                Load More
              </button>
            </div>
            
            <div className="mt-8 text-left text-sm text-gray-500 container">
               <p>Important recall notice regarding certain Acoustimass, Lifestyle, and Companion system bass modules manufactured prior to April 1, 2006. <a href="#" className="underline font-bold">LEARN MORE</a></p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
