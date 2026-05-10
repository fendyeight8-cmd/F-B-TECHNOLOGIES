"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar({ onOpenBooking, onOpenAdmin }: { onOpenBooking: () => void, onOpenAdmin: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`${scrolled ? "scrolled" : ""} ${mobileMenuOpen ? "menu-active" : ""}`}>
        <Link href="/" className="logo" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.6rem', fontWeight: '800', letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: '1.1' }}>
          Nums-Nums<span style={{ color: 'var(--gold)', fontSize: '0.55em', display: 'block', letterSpacing: '0.15em', fontWeight: '300', marginTop: '-2px' }}>Catering & Events</span><span style={{ fontSize: '0.35em', display: 'block', letterSpacing: '0.12em', fontWeight: '300', opacity: 0.5, marginTop: '2px' }}>Owned By F&B Tech</span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links desktop-only">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About Us</Link></li>
          <li><Link href="/gallery">Gallery</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
        </ul>

        {/* Desktop Actions */}
        <div className="nav-actions desktop-only" style={{ display: 'flex', gap: '15px' }}>
          <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.6rem' }} onClick={onOpenBooking}>Book Now</button>
          <button className="nav-admin-btn" onClick={onOpenAdmin}>Admin</button>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className={`mobile-menu-toggle ${mobileMenuOpen ? "active" : ""}`} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="bar line-1"></span>
          <span className="bar line-2"></span>
          <span className="bar line-3"></span>
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`}>
        <div className="drawer-overlay" onClick={() => setMobileMenuOpen(false)}></div>
        <div className="drawer-content">
          <ul className="drawer-links">
            <li style={{ transitionDelay: '0.1s' }}>
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            </li>
            <li style={{ transitionDelay: '0.2s' }}>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            </li>
            <li style={{ transitionDelay: '0.3s' }}>
              <Link href="/gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
            </li>
            <li style={{ transitionDelay: '0.4s' }}>
              <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </li>
          </ul>
          <div className="drawer-actions" style={{ transitionDelay: '0.5s' }}>
            <button 
              className="btn-primary" 
              style={{ width: '100%', marginBottom: '15px', padding: '14px' }} 
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
            >
              Book Now
            </button>
            <button 
              className="nav-admin-btn" 
              style={{ width: '100%', padding: '14px' }} 
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
