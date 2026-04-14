import React from 'react';
import Link from 'next/link';

/**
 * Footer 组件
 * 包含链接和版权信息
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid grid-cols-4 gap-8">
          <div className="footer-col">
            <h4>Customer Support</h4>
            <ul>
              <li><Link href="#" className="footer-link">Contact Us</Link></li>
              <li><Link href="#" className="footer-link">Order Tracking</Link></li>
              <li><Link href="#" className="footer-link">Returns & Exchanges</Link></li>
              <li><Link href="#" className="footer-link">Product Guides</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Our Company</h4>
            <ul>
              <li><Link href="#" className="footer-link">About Bose</Link></li>
              <li><Link href="#" className="footer-link">Careers</Link></li>
              <li><Link href="#" className="footer-link">Press Room</Link></li>
              <li><Link href="#" className="footer-link">Sustainability</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              <li><Link href="#" className="footer-link">Headphones</Link></li>
              <li><Link href="#" className="footer-link">Speakers</Link></li>
              <li><Link href="#" className="footer-link">Earbuds</Link></li>
              <li><Link href="#" className="footer-link">Gift Cards</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="flex gap-4">
              <span className="social-icon">Instagram</span>
              <span className="social-icon">Twitter</span>
              <span className="social-icon">Facebook</span>
              <span className="social-icon">YouTube</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-700 text-center" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #333' }}>
          <p style={{ fontSize: '0.8rem', color: '#999' }}>© 2025 Bose Corporation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
