import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/bose/Header';
import Footer from '../../components/bose/Footer';
import { useCart } from '../../context/CartContext';

/**
 * 购物车页面
 */
export default function BoseCart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  const subtotal = cartTotal;
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <>
      <Head>
        <title>Your Cart | Bose</title>
      </Head>

      <Header />

      <main className="container py-8" style={{ maxWidth: '1000px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Your Cart</h1>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Your cart is empty.</p>
            <Link href="/bose/search" className="btn">Start Shopping</Link>
          </div>
        ) : (
          <div className="flex gap-8">
            {/* 购物车商品列表 */}
            <div style={{ flex: 2 }}>
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4 py-4 border-b border-gray-200">
                  <div style={{ width: '120px', height: '120px', backgroundColor: '#f5f5f5', padding: '10px' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="flex justify-between mb-2">
                      <h3 style={{ fontWeight: 'bold' }}>{item.name}</h3>
                      <span style={{ fontWeight: 'bold' }}>${item.price.toFixed(2)}</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>Color: {item.color}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          style={{ padding: '0.25rem 0.75rem', background: 'none', border: 'none', cursor: 'pointer' }}
                        >-</button>
                        <span style={{ padding: '0 0.5rem' }}>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          style={{ padding: '0.25rem 0.75rem', background: 'none', border: 'none', cursor: 'pointer' }}
                        >+</button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        style={{ fontSize: '0.9rem', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                      >Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 订单摘要 */}
            <div style={{ flex: 1 }}>
              <div style={{ backgroundColor: '#f9f9f9', padding: '2rem', borderRadius: '8px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Order Summary</h2>
                
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4 pb-4 border-b border-gray-300">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                
                <div className="flex justify-between mb-6" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Link href="/bose/checkout" className="btn w-full" style={{ display: 'block', textAlign: 'center', width: '100%' }}>
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
