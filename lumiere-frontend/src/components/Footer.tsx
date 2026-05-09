import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="footer-logo" style={{fontSize: '1.5rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--gold)'}}>Food & Beverage Technologies</div>
        <div className="footer-ownership">Owned By F&B Technology Centre Enterprise</div>
      </div>
      <div className="footer-copy">© 2025 Food & Beverage Technologies. Hak cipta terpelihara.</div>
      <div className="social-links">
        <Link href="#">Instagram</Link>
        <Link href="#">Facebook</Link>
        <Link href="https://wa.me/601110085626" target="_blank" rel="noopener noreferrer">WhatsApp</Link>
      </div>
    </footer>
  );
}
