"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar({ onOpenBooking, onOpenAdmin }: { onOpenBooking: () => void, onOpenAdmin: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <Link href="/" className="logo" style={{ fontSize: '1.6rem', fontWeight: '800', letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: '1.1' }}>
        Nums-Nums<span style={{ color: 'var(--gold)', fontSize: '0.55em', display: 'block', letterSpacing: '0.15em', fontWeight: '300', marginTop: '-2px' }}>Catering & Events</span><span style={{ fontSize: '0.35em', display: 'block', letterSpacing: '0.12em', fontWeight: '300', opacity: 0.5, marginTop: '2px' }}>Owned By F&B Tech</span>
      </Link>

      <ul className="nav-links">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About Us</Link></li>
        <li><Link href="/gallery">Gallery</Link></li>
        <li><Link href="/#contact">Contact</Link></li>
      </ul>

      <div style={{ display: 'flex', gap: '15px' }}>
        <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.6rem' }} onClick={onOpenBooking}>Book Now</button>
        <button className="nav-admin-btn" onClick={onOpenAdmin}>Admin</button>
      </div>
    </nav>
  );
}
