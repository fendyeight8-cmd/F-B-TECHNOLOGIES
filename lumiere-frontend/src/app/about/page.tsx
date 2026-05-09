"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

export default function AboutPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleOpenAdmin = () => {
    router.push("/admin");
  };

  return (
    <main className="about-page">
      <Navbar 
        onOpenBooking={() => setIsBookingOpen(true)} 
        onOpenAdmin={handleOpenAdmin} 
      />

      <div className="about-hero reveal">
        <h1 className="about-hero-title">
          Our <em>Story</em>
        </h1>
        <p className="about-hero-subtitle">
          Pioneering luxury catering and cinematic event design across Malaysia. We turn every occasion into a masterpiece of taste and elegance.
        </p>
      </div>

      <div className="about-content">
        <div className="about-text reveal">
          <div className="section-eyebrow">The Foundation</div>
          <h2 className="section-title" style={{ fontSize: '3rem', marginBottom: '32px' }}>
            A Legacy of <em>Excellence</em>
          </h2>
          <p>
            Founded on the principles of culinary artistry and unparalleled service, <strong>Food & Beverage Technologies</strong> has redefined the landscape of luxury events. What began as a passionate endeavor to elevate local dining experiences has blossomed into Malaysia's premier event design and catering powerhouse.
          </p>
          <p>
            Our dedicated team of master chefs, bridal artisans, and event architects work in perfect harmony to curate bespoke journeys. Whether it is a grand royal wedding, an intimate garden engagement, or a high-profile corporate summit, our signature touch ensures an unforgettable narrative.
          </p>
          <p>
            We believe that true luxury lies in the details—from the meticulous sourcing of the finest ingredients to the flawless execution of atmospheric design. Welcome to a world where excellence is not just expected; it is meticulously crafted.
          </p>
        </div>
        <div className="about-image-wrapper reveal reveal-delay-1">
          <div className="about-image-inner">
            <img src="/images/hero3.png" alt="Culinary Artistry" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="facts-section">
        <div className="facts-grid">
          <div className="fact-item reveal">
            <div className="fact-number">15+</div>
            <div className="fact-label">Years of Excellence</div>
          </div>
          <div className="fact-item reveal reveal-delay-1">
            <div className="fact-number">2,500+</div>
            <div className="fact-label">Events Curated</div>
          </div>
          <div className="fact-item reveal reveal-delay-2">
            <div className="fact-number">30+</div>
            <div className="fact-label">Industry Awards</div>
          </div>
          <div className="fact-item reveal reveal-delay-3">
            <div className="fact-number">100%</div>
            <div className="fact-label">Bespoke Experiences</div>
          </div>
        </div>
      </div>

      <br/><br/><br/>

      <Footer />

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </main>
  );
}
