import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">100% Free & No Sign-up Required</div>
        <h1 className="hero-title">Create Professional Invoices in Seconds</h1>
        <p className="hero-subtitle">
          Instantly generate, preview, and download formal business invoices. 
          Built for freelancers, contractors, and agencies who want to look professional without the hassle.
        </p>
        <div className="hero-actions">
          <Link href="/create" className="btn btn-primary hero-btn-main">Start Creating Now &rarr;</Link>
          <Link href="#features" className="btn btn-secondary hero-btn-sub">See Features</Link>
        </div>
      </div>
      <div className="hero-image-wrapper">
        <div className="hero-image-mockup">
          {/* Abstract Invoice Representation */}
          <div className="mockup-header">
             <div className="mockup-logo"></div>
             <div className="mockup-title">INVOICE</div>
          </div>
          <div className="mockup-grid">
             <div className="mockup-box"></div>
             <div className="mockup-box"></div>
             <div className="mockup-box"></div>
             <div className="mockup-box"></div>
          </div>
          <div className="mockup-table">
             <div className="mockup-row header"></div>
             <div className="mockup-row"></div>
             <div className="mockup-row"></div>
             <div className="mockup-row"></div>
          </div>
          <div className="mockup-footer">
             <div className="mockup-total"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
