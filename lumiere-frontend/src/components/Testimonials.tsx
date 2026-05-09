"use client";

import { useState, useEffect } from "react";

const testimonials = [
  {
    quote: "The catering was beyond anything we imagined. Our guests are still talking about it months later. Truly unforgettable.",
    author: "Siti Rahimah — Wedding Client, Penang"
  },
  {
    quote: "My makeup artist was an absolute genius. She understood my vision perfectly and made me feel like a queen on my special day.",
    author: "Amirah Lim — Bridal Client, KL"
  },
  {
    quote: "We hired Food & Beverage Technologies for both catering and beauty for our corporate gala. The seamless experience and exceptional quality blew everyone away.",
    author: "Dato' Ahmad — Corporate Event, Penang"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="testimonials-section">
      <div className="testimonials-inner">
        <div className="section-eyebrow">Testimonials</div>
        <h2 className="section-title">What Our <em>Clients Say</em></h2>
        <div className="testimonials-slider">
          {testimonials.map((t, index) => (
            <div key={index} className={`testimonial ${index === activeIndex ? "active" : ""}`}>
              <div className="testimonial-quote">{t.quote}</div>
              <div className="testimonial-author">{t.author}</div>
            </div>
          ))}
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`t-dot ${index === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
