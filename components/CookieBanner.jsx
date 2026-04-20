"use client";
import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('gdpr_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('gdpr_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner no-print">
      <div className="cookie-content">
        <div className="cookie-text">
          <span className="cookie-icon">🛡️</span>
          <p>
            <strong>Privacy First:</strong> NordicBill uses no tracking cookies and stores zero invoice data on any server. Your business stays your business.
          </p>
        </div>
        <button className="cookie-btn" onClick={accept}>Got it</button>
      </div>

      <style jsx>{`
        .cookie-banner {
          position: fixed;
          bottom: 2rem;
          left: 2rem;
          right: 2rem;
          background: rgba(30, 41, 59, 0.95);
          backdrop-filter: blur(12px);
          color: white;
          padding: 1rem 1.5rem;
          z-index: 1000;
          border-radius: var(--radius-lg);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          animation: slideUp 0.5s ease-out;
        }
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .cookie-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
        }
        .cookie-text {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .cookie-icon {
          font-size: 1.5rem;
        }
        p {
          margin: 0;
          font-size: 0.875rem;
          line-height: 1.5;
          max-width: 600px;
        }
        .cookie-btn {
          background: white;
          color: #1e293b;
          border: none;
          padding: 0.6rem 1.5rem;
          border-radius: 100px;
          cursor: pointer;
          font-weight: 700;
          white-space: nowrap;
          transition: transform 0.2s, background 0.2s;
        }
        .cookie-btn:hover {
          transform: translateY(-2px);
          background: #f8fafc;
        }
        
        @media (max-width: 768px) {
          .cookie-banner {
            bottom: 1rem;
            left: 1rem;
            right: 1rem;
            padding: 1rem;
          }
          .cookie-content {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }
          .cookie-text {
            flex-direction: column;
            gap: 0.5rem;
          }
          .cookie-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
