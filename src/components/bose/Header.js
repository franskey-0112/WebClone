import React, { useState } from 'react';
import Link from 'next/link';
import { navigationData } from '../../data/boseData';
import { useCart } from '../../context/CartContext';

/**
 * Header 组件
 * 包含导航菜单、Logo、搜索栏和购物车图标
 */
const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const { cartCount } = useCart();

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="flex justify-between items-center" style={{ height: '80px' }}>
            
            {/* 左侧导航菜单 */}
            <nav className="flex items-center gap-4">
              <div 
                className="nav-item"
                onMouseEnter={() => setActiveMenu('shop')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link href="/bose/search" className="nav-link">Shop</Link>
                {activeMenu === 'shop' && (
                  <div className="dropdown-menu" style={{
                    position: 'absolute',
                    top: '80px',
                    left: 0,
                    width: '100%',
                    backgroundColor: 'white',
                    borderBottom: '1px solid #e5e5e5',
                    padding: '3rem 0',
                    zIndex: 101,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}>
                    <div className="container grid grid-cols-4 gap-8">
                      {navigationData.shop.map((section, idx) => (
                        <div key={idx}>
                          <h4 style={{ fontWeight: 'bold', marginBottom: '1.2rem', fontSize: '0.9rem', letterSpacing: '0.05em' }}>{section.title}</h4>
                          <ul>
                            {section.items.map((item, i) => (
                              <li key={i} style={{ marginBottom: '0.8rem', fontSize: '0.9rem', color: '#555' }}>
                                <Link href="/bose/search" className="hover:underline">{item}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="nav-item">
                <Link href="#" className="nav-link">Explore</Link>
              </div>
              
              <div className="nav-item">
                <Link href="#" className="nav-link">Support</Link>
              </div>
            </nav>

            {/* 中间 Logo */}
            <div className="logo" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
              <Link href="/bose">
                <img src="/images/bose/logo.svg" alt="Bose" style={{ height: '26px' }} />
              </Link>
            </div>

            {/* 右侧工具栏 */}
            <div className="flex items-center gap-6">
              {/* 搜索框 */}
              <div className="relative hidden md:block" style={{ width: '240px', position: 'relative' }}>
                <input 
                  type="text" 
                  placeholder="Search" 
                  style={{
                    width: '100%',
                    backgroundColor: '#f5f5f5',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '8px 40px 8px 16px',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
                <button style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#666',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>

              {/* 图标组 */}
              <div className="flex items-center gap-4">
                {/* 用户图标 */}
                <Link href="#" className="nav-icon" aria-label="Sign In / Join My Bose">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="5"></circle>
                    <path d="M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2"></path>
                  </svg>
                </Link>

                {/* 愿望单图标 */}
                <Link href="#" className="nav-icon" aria-label="Wish List">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </Link>

                {/* 购物车图标 */}
                <Link href="/bose/cart" className="nav-icon relative" aria-label="Cart">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  {cartCount > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-6px',
                      backgroundColor: 'black',
                      color: 'white',
                      borderRadius: '50%',
                      width: '16px',
                      height: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.6rem',
                      fontWeight: 'bold'
                    }}>{cartCount}</span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
