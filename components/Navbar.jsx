import Link from 'next/link';

export default function Navbar() {
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
        <div className="nav-links">
          <Link href="#features" className="nav-link">Features</Link>
          <Link href="/create" className="btn btn-primary nav-cta">Create Invoice</Link>
        </div>
      </div>
    </nav>
  );
}
