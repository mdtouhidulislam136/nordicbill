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
          className="mobile-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        <div className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          <Link href="/#features" className="nav-link" onClick={() => setIsMenuOpen(false)}>Features</Link>
          <Link href="/create" className="btn btn-primary nav-cta" onClick={() => setIsMenuOpen(false)}>Create Invoice</Link>
        </div>
      </div>

      <style jsx>{`
        .mobile-toggle {
          display: none;
          background: transparent;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 4px;
          transition: background 0.2s;
        }
        .mobile-toggle:hover {
          background: rgba(0, 0, 0, 0.05);
        }
        
        @media (max-width: 768px) {
          .mobile-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .nav-links {
            display: ${isMenuOpen ? 'flex' : 'none'} !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--surface-color);
            flex-direction: column;
            padding: 1.5rem;
            border-bottom: 1px solid var(--border-color);
            box-shadow: var(--shadow-lg);
            gap: 1.25rem !important;
            z-index: 50;
            animation: slideDown 0.3s ease-out;
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .nav-link {
            display: block !important;
            font-size: 1rem;
            padding: 0.5rem 0;
          }
          .nav-cta {
            width: 100%;
            padding: 0.75rem !important;
            font-size: 1rem !important;
          }
        }
      `}</style>
    </nav>
  );
}
