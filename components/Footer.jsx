export default function Footer() {
  return (
    <footer className="footer no-print">
      <div className="footer-container">
        <div className="footer-brand" style={{ alignItems: 'flex-start' }}>
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '0.5rem', marginTop: '2px' }}>
            <rect width="32" height="32" rx="8" fill="#2563eb"/>
            <path d="M9 23L9 9L15 23L15 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23 9H18V23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 15H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 700, color: '#111827' }}>NordicBill &copy; {new Date().getFullYear()}</span>
            <span style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '2px' }}>Created by Nordicdesh</span>
          </div>
        </div>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
