import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      <main>
        <Hero />
        
        {/* Features Section */}
        <section id="features" className="features-section">
          <div className="features-container">
            <h2 className="section-title">Professional billing made simple</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🌍</div>
                <h3>Global Standards</h3>
                <p>Support for multiple currencies, local tax names (VAT, GST, ALV), and formal bank transfer slips.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Live Preview</h3>
                <p>Watch your invoice update in real-time as you type. What you see is exactly what you get.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>100% Private</h3>
                <p>Your data never leaves your browser. We don't use cookies to track your business details.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Fully Responsive</h3>
                <p>Create invoices on your phone, tablet, or desktop. Optimized for every screen size.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🖨️</div>
                <h3>Print Ready</h3>
                <p>Perfectly formatted A4 PDF layouts that look professional when printed or emailed.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💎</div>
                <h3>No Account Needed</h3>
                <p>Start billing immediately. No sign-up, no subscriptions, no hidden fees. Just free tools.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 className="cta-title">Ready to bill your first client?</h2>
            <p className="cta-subtitle">Join thousands of freelancers using NordicBill for their daily invoicing needs.</p>
            <Link href="/create" className="btn btn-primary hero-btn-main">Get Started for Free</Link>
          </div>
        </section>
      </main>
      <Footer />

    </div>
  );
}
