"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const bentoData = [
  {
    id: 0,
    title: "Feast & Elegance",
    cat: "Catering",
    desc: "A stunning spread of culinary masterpieces.",
    images: [
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=80",
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=900&q=80",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=900&q=80"
    ],
    classes: "tall wide",
  },
  {
    id: 1,
    title: "Bridal Beauty",
    cat: "Makeup",
    desc: "Flawless artistry for your most special day.",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80"
    ],
    classes: "",
  },
  {
    id: 2,
    title: "Fine Dining",
    cat: "Catering",
    desc: "Exquisite courses crafted with precision.",
    images: [
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80"
    ],
    classes: "",
  },
  {
    id: 3,
    title: "Sweet Creations",
    cat: "Catering",
    desc: "Delicate pastries and bespoke celebration cakes.",
    images: [
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80"
    ],
    classes: "wide",
  },
];

const BentoItem = ({ item }: { item: typeof bentoData[0] }) => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    if (!item.images || item.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % item.images.length);
    }, 3500 + Math.random() * 1000); // Random offset so they don't slide exactly together
    return () => clearInterval(interval);
  }, [item.images]);

  return (
    <div className={`bento-item ${item.classes}`} style={{ position: 'relative', overflow: 'hidden' }}>
      {item.images.map((img, idx) => (
        <img 
          key={idx} 
          src={img} 
          alt={`${item.title} image ${idx + 1}`} 
          className="bento-img" 
          loading="lazy"
          style={{ 
            position: 'absolute', 
            top: 0, left: 0, 
            opacity: idx === currentImg ? 1 : 0, 
            transition: 'opacity 1s ease-in-out',
            zIndex: idx === currentImg ? 1 : 0 
          }} 
        />
      ))}
      <div className="bento-content" style={{ zIndex: 2 }}>
        <span className="bento-tag">{item.cat}</span>
        <h3 className="bento-title">{item.title}</h3>
        <p className="bento-desc">{item.desc}</p>
        
        {item.images.length > 1 && (
          <div style={{ display: 'flex', gap: '6px', marginTop: '16px' }}>
            {item.images.map((_, idx) => (
              <div 
                key={idx} 
                onClick={(e) => { e.stopPropagation(); setCurrentImg(idx); }}
                style={{ 
                  width: idx === currentImg ? '20px' : '6px', 
                  height: '6px', 
                  borderRadius: '3px', 
                  background: idx === currentImg ? 'var(--gold)' : 'rgba(255,255,255,0.3)',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer'
                }} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function BentoGrid() {
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

  return (
    <section className="bento-section" id="gallery">
      <div className="gallery-header" style={{ textAlign: "center", marginBottom: "80px" }}>
        <div className="section-eyebrow reveal">Portfolio</div>
        <h2 className="section-title reveal reveal-delay-1">
          Our <em>Work</em>
        </h2>
      </div>
      <div className="bento-grid">
        {bentoData.map((item) => (
          <BentoItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
