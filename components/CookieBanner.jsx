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
    <div className="cookie-banner no-print" style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, 
      background: '#1e293b', color: 'white', padding: '1rem',
      display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', zIndex: 1000
    }}>
      <p style={{ margin: 0, fontSize: '0.875rem' }}>
        <strong>GDPR Notice:</strong> We value your privacy. We use no tracking cookies and store zero invoice data on our servers. Everything is processed locally.
      </p>
      <button onClick={accept} style={{
        background: '#3b82f6', color: 'white', border: 'none', 
        padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
      }}>I Understand</button>
    </div>
  );
}
