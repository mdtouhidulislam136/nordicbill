export default function Footer() {
  return (
    <footer className="footer no-print">
      <div className="footer-container">
        <div className="footer-brand" style={{ alignItems: 'flex-start' }}>
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '0.5rem', marginTop: '2px' }}>
            <rect width="32" height="32" rx="8" fill="#2563eb"/>
            <path d="M7 23V9L13 23V9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 9H22C24.2091 9 26 10.7909 26 13C26 15.2091 24.2091 17 22 17H19V9Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 17H23C25.2091 17 27 18.7909 27 21C27 23.2091 25.2091 25 23 25H19V17Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 9V25" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>NordicBill &copy; {new Date().getFullYear()}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Created by Nordicdesh</span>
          </div>
        </div>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
