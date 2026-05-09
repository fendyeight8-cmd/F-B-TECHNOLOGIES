"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  { id: 1, src: "/images/hero1.png" },
  { id: 2, src: "/images/hero2.png" },
  { id: 3, src: "/images/hero3.png" },
];

export default function Hero({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-slides">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero-slide ${index === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide.src})` }}
            />
          ))}
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-eyebrow">Luxury Catering & Artistry</div>
        <h1 className="hero-title">
          The Art of <em>Excellence</em>
        </h1>
        <p className="hero-subtitle">
          Crafting unforgettable culinary journeys and cinematic bridal experiences in the heart of Malaysia.
        </p>
        <div className="hero-cta-group">
          <button onClick={onOpenBooking} className="btn-primary">Book Now</button>
          <Link href="/gallery" className="btn-ghost">View Gallery</Link>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </header>
  );
}
