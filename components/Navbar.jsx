"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar no-print">
      <div className="nav-container">
        <Link href="/" className="nav-logo" style={{ gap: '0.75rem' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#2563eb"/>
            <path d="M9 23L9 9L15 23L15 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23 9H18V23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 15H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="nav-logo-text" style={{ fontSize: '1.4rem' }}>NordicBill</span>
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          style={{ display: 'none' }} /* This will be handled by CSS or I'll just use inline styles for simplicity since I'm not sure about Tailwind availability in this context */
        >
          <span style={{ width: '24px', height: '2px', background: 'var(--text-primary)', display: 'block' }}></span>
          <span style={{ width: '24px', height: '2px', background: 'var(--text-primary)', display: 'block' }}></span>
          <span style={{ width: '24px', height: '2px', background: 'var(--text-primary)', display: 'block' }}></span>
        </button>

        <div className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          <Link href="/#features" className="nav-link" onClick={() => setIsMenuOpen(false)}>Features</Link>
          <Link href="/create" className="btn btn-primary nav-cta" onClick={() => setIsMenuOpen(false)}>Create Invoice</Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          button {
            display: flex !important;
          }
          .nav-links {
            display: ${isMenuOpen ? 'flex' : 'none'} !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 1.5rem;
            border-bottom: 1px solid var(--border-color);
            box-shadow: var(--shadow-lg);
            gap: 1.5rem !important;
            z-index: 50;
          }
          .nav-link {
            display: block !important;
            font-size: 1.1rem;
          }
          .nav-cta {
            width: 100%;
          }
        }
      `}</style>
    </nav>
  );
}
