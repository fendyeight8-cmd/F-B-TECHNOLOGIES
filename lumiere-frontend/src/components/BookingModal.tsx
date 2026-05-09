"use client";

import React, { useState } from "react";

const services = [
  { id: "bridal", name: "Bridal Makeup", image: "/images/bridal_makeup.png" },
  { id: "catering", name: "Catering", image: "/images/catering.png" },
  { id: "corporate", name: "Corporate Event", image: "/images/corporate_event.png" },
  { id: "engagement", name: "Engagement", image: "/images/engagement.png" }
];

export default function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "0",
    location: "",
    notes: ""
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1 && !formData.service) { alert("Please select a service"); return; }
    if (step === 2) {
      if (!formData.name || !formData.phone || !formData.date) { alert("Please fill Name, Phone & Date"); return; }
    }
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    const data = { ...formData, guests: parseInt(formData.guests) };
    try {
      await fetch("https://fnbtechnologies.onrender.com/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      const whatsappMsg = `✨ *Food & Beverage Technologies — New Booking* ✨\n\n📋 *Service:* ${formData.service}\n👤 *Name:* ${formData.name}\n📅 *Date:* ${formData.date}\n🕐 *Time:* ${formData.time}\n📍 *Location:* ${formData.location}`;
      window.open(`https://wa.me/601110085626?text=${encodeURIComponent(whatsappMsg)}`, "_blank");
      
      onClose();
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  return (
    <div className={`booking-overlay open visible`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="booking-modal">
        <button className="booking-close" onClick={onClose}>✕</button>

        <div className="booking-progress">
          {[
            { id: 1, label: "Service" },
            { id: 2, label: "Details" },
            { id: 3, label: "Confirm" }
          ].map((s, idx) => (
            <React.Fragment key={s.id}>
              <div className={`bp-step ${step >= s.id ? "active" : ""} ${step > s.id ? "done" : ""}`}>
                <div className="bp-num">{s.id}</div>
                <div className="bp-label">{s.label}</div>
              </div>
              {idx < 2 && <div className={`bp-line ${step > s.id ? "done" : ""}`} />}
            </React.Fragment>
          ))}
        </div>

        {step === 1 && (
          <div className="booking-step active">
            <h3 className="booking-step-title">Select <em>Service</em></h3>
            <p className="booking-step-sub">Choose the artistry you desire.</p>
            <div className="service-select-grid">
              {services.map((s) => (
                <div 
                  key={s.id} 
                  className={`service-select-card ${formData.service === s.name ? "selected" : ""}`}
                  onClick={() => setFormData({...formData, service: s.name})}
                  style={{ position: 'relative', overflow: 'hidden', minHeight: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                >
                  <img src={s.image} alt={s.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: formData.service === s.name ? 0.8 : 0.4, transition: 'opacity 0.3s' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10, 8, 6, 0.9) 0%, rgba(10, 8, 6, 0.2) 100%)' }} />
                  <div className="ssc-name" style={{ position: 'relative', zIndex: 2, fontSize: '1.25rem' }}>{s.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="booking-step active">
            <h3 className="booking-step-title">Event <em>Details</em></h3>
            <p className="booking-step-sub">Tell us more about your special day.</p>
            <div className="booking-form-grid">
              <div className="form-group full">
                <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                <label>Name</label>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                <label>Phone</label>
              </div>
              <div className="form-group">
                <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
                <label>Date</label>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="booking-step active">
            <h3 className="booking-step-title">Final <em>Check</em></h3>
            <div className="confirm-card">
              <div className="confirm-row"><span className="confirm-label">Service</span><span className="confirm-value">{formData.service}</span></div>
              <div className="confirm-row"><span className="confirm-label">Name</span><span className="confirm-value">{formData.name}</span></div>
              <div className="confirm-row"><span className="confirm-label">Date</span><span className="confirm-value">{formData.date}</span></div>
            </div>
            <button className="book-btn-whatsapp" onClick={handleSubmit}>
              <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.37 0-4.567-.82-6.29-2.19l-.44-.37-3.28 1.1 1.1-3.28-.37-.44A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10-10-4.477 10-10 10z"/></svg>
              Confirm & WhatsApp
            </button>
          </div>
        )}

        <div className="booking-nav">
          {step > 1 && <button className="book-btn-back" onClick={() => setStep(step - 1)}>Back</button>}
          {step < 3 && <button className="book-btn-next" onClick={handleNext}>Next Step</button>}
        </div>
      </div>
    </div>
  );
}
