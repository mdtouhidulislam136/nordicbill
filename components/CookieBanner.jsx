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
        <p>
          <strong>GDPR Notice:</strong> We value your privacy. We use no tracking cookies and store zero invoice data on our servers. Everything is processed locally.
        </p>
        <button onClick={accept}>I Understand</button>
      </div>

      <style jsx>{`
        .cookie-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #1e293b;
          color: white;
          padding: 1rem;
          z-index: 1000;
        }
        .cookie-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
        }
        p {
          margin: 0;
          font-size: 0.875rem;
          line-height: 1.4;
        }
        button {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.5rem 1.25rem;
          border-radius: 6px;
          cursor: pointer;
          fontWeight: bold;
          white-space: nowrap;
          transition: background 0.2s;
        }
        button:hover {
          background: #2563eb;
        }
        
        @media (max-width: 768px) {
          .cookie-content {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }
          button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
