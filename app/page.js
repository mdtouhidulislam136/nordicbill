import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      <main>
        <Hero />
        
        {/* Features Section */}
        <section id="features" className="features-section">
          <div className="features-container">
            <h2 className="section-title">Everything you need to bill clients</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🌍</div>
                <h3>Global & Formal Standards</h3>
                <p>Built-in support for multiple currencies, local tax names (VAT, GST, ALV), and formal European payment slips.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Real-time Preview</h3>
                <p>See exactly what your client will see as you type. Watch calculations happen instantly.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>GDPR Compliant</h3>
                <p>100% private by default. All data stays entirely in your browser. We never save your business data to any server.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
