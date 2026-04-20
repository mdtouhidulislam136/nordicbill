import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="landing-page">
      <Navbar />
      <main className="container privacy-main">
        <h1 className="title mb-4">Privacy Policy & GDPR Compliance</h1>
        <p className="mb-4">Last updated: April 20, 2026</p>
        
        <div className="card privacy-card">
          <h2 className="subtitle">1. Data Storage & Processing</h2>
          <p className="mb-4">
            NordicBill is designed with privacy by default. We do <strong>not</strong> collect, store, or process any of the invoice data you enter into our tool. All data processing and PDF generation happens entirely locally within your web browser. 
          </p>

          <h2 className="subtitle">2. GDPR Compliance</h2>
          <p className="mb-4">
            Because we do not transmit or store your personal or business data on our servers, using NordicBill is inherently GDPR compliant. You remain in full control of the data you enter.
          </p>

          <h2 className="subtitle">3. Cookies & Tracking</h2>
          <p className="mb-4">
            We do not use tracking cookies, analytics scripts, or third-party advertising trackers on this website. Your visit is completely private.
          </p>

          <h2 className="subtitle">4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact the creators at Nordicdesh.
          </p>
        </div>
      </main>
      <Footer />

    </div>
  );
}
