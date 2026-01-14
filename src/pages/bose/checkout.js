import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/bose/Header';
import Footer from '../../components/bose/Footer';

/**
 * 结算页面
 */
export default function BoseCheckout() {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    email: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitShipping = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <>
      <Head>
        <title>Checkout | Bose</title>
      </Head>

      <div style={{ borderBottom: '1px solid #e5e5e5' }}>
        <div className="container py-4 flex justify-between items-center">
          <Link href="/bose">
            <img src="/images/bose/logo.svg" alt="Bose" style={{ height: '24px' }} />
          </Link>
          <div style={{ fontWeight: 'bold' }}>Secure Checkout</div>
        </div>
      </div>

      <main className="container py-8" style={{ maxWidth: '800px' }}>
        {step === 3 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Order Confirmed!</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Thank you for your purchase. A confirmation email has been sent to {formData.email}.</p>
            <p style={{ marginBottom: '2rem' }}>Order #BOSE-{Math.floor(Math.random() * 1000000)}</p>
            <Link href="/bose" className="btn">Return to Home</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {/* 步骤指示器 */}
            <div className="flex gap-4 mb-8 border-b border-gray-200 pb-4">
              <span style={{ fontWeight: step === 1 ? 'bold' : 'normal', color: step === 1 ? 'black' : '#999' }}>1. Shipping</span>
              <span style={{ color: '#ccc' }}>&gt;</span>
              <span style={{ fontWeight: step === 2 ? 'bold' : 'normal', color: step === 2 ? 'black' : '#999' }}>2. Payment</span>
            </div>

            {step === 1 && (
              <form onSubmit={handleSubmitShipping}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2 text-sm font-bold">First Name</label>
                    <input 
                      required
                      type="text" 
                      name="firstName" 
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-bold">Last Name</label>
                    <input 
                      required
                      type="text" 
                      name="lastName" 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold">Address</label>
                  <input 
                    required
                    type="text" 
                    name="address" 
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2 text-sm font-bold">City</label>
                    <input 
                      required
                      type="text" 
                      name="city" 
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-bold">ZIP Code</label>
                    <input 
                      required
                      type="text" 
                      name="zip" 
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                  </div>
                </div>
                <div className="mb-8">
                  <label className="block mb-2 text-sm font-bold">Email</label>
                  <input 
                    required
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                </div>
                <button type="submit" className="btn w-full" style={{ width: '100%' }}>Continue to Payment</button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmitPayment}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Payment Method</h2>
                
                <div className="mb-6 p-4 border border-gray-300 rounded bg-gray-50">
                  <div className="flex items-center mb-4">
                    <input type="radio" checked readOnly style={{ marginRight: '0.5rem' }} />
                    <span style={{ fontWeight: 'bold' }}>Credit Card</span>
                  </div>
                  <div className="mb-4">
                    <input 
                      type="text" 
                      placeholder="Card Number" 
                      defaultValue="4242 4242 4242 4242"
                      className="w-full p-2 border border-gray-300 rounded mb-2"
                      style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '0.5rem' }}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="MM/YY" 
                        defaultValue="12/25"
                        className="p-2 border border-gray-300 rounded"
                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                      <input 
                        type="text" 
                        placeholder="CVC" 
                        defaultValue="123"
                        className="p-2 border border-gray-300 rounded"
                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(1)} className="btn btn-white" style={{ flex: 1, border: '1px solid black' }}>Back</button>
                  <button type="submit" className="btn" style={{ flex: 1 }}>Place Order</button>
                </div>
              </form>
            )}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
