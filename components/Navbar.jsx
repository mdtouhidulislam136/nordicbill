"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar no-print" style={{ position: 'relative' }}>
      <div className="nav-container">
        <Link href="/" className="nav-logo" style={{ gap: '0.75rem' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="#2563eb"/>
            <path d="M7 23V9L13 23V9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 9H22C24.2091 9 26 10.7909 26 13C26 15.2091 24.2091 17 22 17H19V9Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 17H23C25.2091 17 27 18.7909 27 21C27 23.2091 25.2091 25 23 25H19V17Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 9V25" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="nav-logo-text" style={{ fontSize: '1.4rem' }}>NordicBill</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="mobile-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="nav-menu"
        >
          {isMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>

        <div
          id="nav-menu"
          className={`nav-links${isMenuOpen ? ' nav-links--open' : ''}`}
        >
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
          min-width: 44px;
          min-height: 44px;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        .mobile-toggle:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        @media (max-width: 768px) {
          .mobile-toggle {
            display: flex;
          }
          .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--surface-color);
            flex-direction: column;
            padding: 1.5rem;
            border-bottom: 1px solid var(--border-color);
            box-shadow: var(--shadow-lg);
            gap: 1.25rem;
            z-index: 50;
          }
          .nav-links--open {
            display: flex;
            animation: slideDown 0.25s ease-out;
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .nav-link {
            display: block;
            font-size: 1rem;
            padding: 0.5rem 0;
          }
          .nav-cta {
            width: 100%;
            padding: 0.75rem !important;
            font-size: 1rem !important;
            text-align: center;
          }
        }
      `}</style>
    </nav>
  );
}
