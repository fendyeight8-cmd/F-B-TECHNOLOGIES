"use client";

import React, { useState } from "react";

const services = [
  { id: "bridal", name: "Bridal Makeup", icon: "💄", image: "/images/bridal_makeup.png" },
  { id: "catering", name: "Catering", icon: "🍽️", image: "/images/catering.png" },
  { id: "bento", name: "Corporate Bento", icon: "🍱", image: "/images/corporate_event.png" },
  { id: "event", name: "Event Planning", icon: "🎪", image: "/images/hero2.png" },
  { id: "engagement", name: "Engagement", icon: "💍", image: "/images/engagement.png" }
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
    notes: "",
    // Corporate Bento specific
    bentoType: "",
    bentoPax: "",
    deliveryTime: "",
    companyName: "",
    // Bridal specific
    bridalPackage: "",
    trialDate: "",
    // Catering specific
    cuisineType: "",
    eventType: "",
    // Engagement specific
    theme: "",
    venue: "",
    // Event Planning specific
    eventCategory: "",
    eventSize: "",
    budget: ""
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
      
      let extraDetails = "";
      if (formData.service === "Corporate Bento") {
        extraDetails = `\n🍱 *Bento Type:* ${formData.bentoType || "–"}\n👥 *Pax:* ${formData.bentoPax || "–"}\n🏢 *Company:* ${formData.companyName || "–"}\n🕐 *Delivery Time:* ${formData.deliveryTime || "–"}`;
      } else if (formData.service === "Bridal Makeup") {
        extraDetails = `\n💄 *Package:* ${formData.bridalPackage || "–"}\n📅 *Trial Date:* ${formData.trialDate || "–"}`;
      } else if (formData.service === "Catering") {
        extraDetails = `\n🍽️ *Cuisine:* ${formData.cuisineType || "–"}\n🎪 *Event Type:* ${formData.eventType || "–"}\n👥 *Guests:* ${formData.guests || "–"}`;
      } else if (formData.service === "Engagement") {
        extraDetails = `\n🎨 *Theme:* ${formData.theme || "–"}\n📍 *Venue:* ${formData.venue || "–"}\n👥 *Guests:* ${formData.guests || "–"}`;
      } else if (formData.service === "Event Planning") {
        extraDetails = `\n🎪 *Event Category:* ${formData.eventCategory || "–"}\n👥 *Event Size:* ${formData.eventSize || "–"}\n💰 *Budget:* ${formData.budget || "–"}\n📍 *Venue:* ${formData.venue || "–"}`;
      }

      const whatsappMsg = `✨ *Nums-Nums Catering & Events — New Booking* ✨\n\n📋 *Service:* ${formData.service}\n👤 *Name:* ${formData.name}\n📱 *Phone:* ${formData.phone}\n📅 *Date:* ${formData.date}${extraDetails}\n\n📝 *Notes:* ${formData.notes || "None"}`;
      window.open(`https://wa.me/601110085626?text=${encodeURIComponent(whatsappMsg)}`, "_blank");
      
      onClose();
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  const renderServiceFields = () => {
    switch (formData.service) {
      case "Corporate Bento":
        return (
          <>
            <div className="form-group">
              <select
                value={formData.bentoType}
                onChange={(e) => setFormData({...formData, bentoType: e.target.value})}
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(201,169,110,0.25)', color: 'var(--white)', padding: '14px 0', fontFamily: 'var(--font-jost), sans-serif', outline: 'none' }}
              >
                <option value="" style={{ background: '#13100a' }}>Select Bento Type</option>
                <option value="Malay Bento" style={{ background: '#13100a' }}>Malay Bento</option>
                <option value="Western Bento" style={{ background: '#13100a' }}>Western Bento</option>
                <option value="Chinese Bento" style={{ background: '#13100a' }}>Chinese Bento</option>
                <option value="Japanese Bento" style={{ background: '#13100a' }}>Japanese Bento</option>
                <option value="Mixed / Custom" style={{ background: '#13100a' }}>Mixed / Custom</option>
              </select>
            </div>
            <div className="form-group">
              <input type="number" placeholder="Number of Pax" min="10" value={formData.bentoPax} onChange={(e) => setFormData({...formData, bentoPax: e.target.value})} />
              <label>Number of Pax</label>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Company Name" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} />
              <label>Company Name</label>
            </div>
            <div className="form-group">
              <input type="time" value={formData.deliveryTime} onChange={(e) => setFormData({...formData, deliveryTime: e.target.value})} />
              <label>Delivery Time</label>
            </div>
          </>
        );
      case "Bridal Makeup":
        return (
          <>
            <div className="form-group">
              <select
                value={formData.bridalPackage}
                onChange={(e) => setFormData({...formData, bridalPackage: e.target.value})}
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(201,169,110,0.25)', color: 'var(--white)', padding: '14px 0', fontFamily: 'var(--font-jost), sans-serif', outline: 'none' }}
              >
                <option value="" style={{ background: '#13100a' }}>Select Package</option>
                <option value="Nikah Package" style={{ background: '#13100a' }}>Nikah Package</option>
                <option value="Reception Package" style={{ background: '#13100a' }}>Reception Package</option>
                <option value="Full Day Package" style={{ background: '#13100a' }}>Full Day Package</option>
                <option value="Bridesmaid Makeup" style={{ background: '#13100a' }}>Bridesmaid Makeup</option>
              </select>
            </div>
            <div className="form-group">
              <input type="date" value={formData.trialDate} onChange={(e) => setFormData({...formData, trialDate: e.target.value})} />
              <label>Trial Makeup Date</label>
            </div>
          </>
        );
      case "Catering":
        return (
          <>
            <div className="form-group">
              <select
                value={formData.cuisineType}
                onChange={(e) => setFormData({...formData, cuisineType: e.target.value})}
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(201,169,110,0.25)', color: 'var(--white)', padding: '14px 0', fontFamily: 'var(--font-jost), sans-serif', outline: 'none' }}
              >
                <option value="" style={{ background: '#13100a' }}>Select Cuisine</option>
                <option value="Malay" style={{ background: '#13100a' }}>Malay</option>
                <option value="Western" style={{ background: '#13100a' }}>Western</option>
                <option value="Chinese" style={{ background: '#13100a' }}>Chinese</option>
                <option value="Mixed Buffet" style={{ background: '#13100a' }}>Mixed Buffet</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Event Type" value={formData.eventType} onChange={(e) => setFormData({...formData, eventType: e.target.value})} />
              <label>Event Type (e.g. Wedding, Birthday)</label>
            </div>
            <div className="form-group">
              <input type="number" placeholder="Guests" min="10" value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})} />
              <label>Estimated Guests</label>
            </div>
          </>
        );
      case "Engagement":
        return (
          <>
            <div className="form-group">
              <input type="text" placeholder="Theme" value={formData.theme} onChange={(e) => setFormData({...formData, theme: e.target.value})} />
              <label>Event Theme</label>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Venue" value={formData.venue} onChange={(e) => setFormData({...formData, venue: e.target.value})} />
              <label>Venue / Location</label>
            </div>
            <div className="form-group">
              <input type="number" placeholder="Guests" min="10" value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})} />
              <label>Estimated Guests</label>
            </div>
          </>
        );
      case "Event Planning":
        return (
          <>
            <div className="form-group">
              <select
                value={formData.eventCategory}
                onChange={(e) => setFormData({...formData, eventCategory: e.target.value})}
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(201,169,110,0.25)', color: 'var(--white)', padding: '14px 0', fontFamily: 'var(--font-jost), sans-serif', outline: 'none' }}
              >
                <option value="" style={{ background: '#13100a' }}>Select Event Category</option>
                <option value="Wedding" style={{ background: '#13100a' }}>Wedding</option>
                <option value="Birthday Party" style={{ background: '#13100a' }}>Birthday Party</option>
                <option value="Corporate Dinner" style={{ background: '#13100a' }}>Corporate Dinner</option>
                <option value="Product Launch" style={{ background: '#13100a' }}>Product Launch</option>
                <option value="Charity Gala" style={{ background: '#13100a' }}>Charity Gala</option>
                <option value="Family Gathering" style={{ background: '#13100a' }}>Family Gathering</option>
                <option value="Other" style={{ background: '#13100a' }}>Other</option>
              </select>
            </div>
            <div className="form-group">
              <select
                value={formData.eventSize}
                onChange={(e) => setFormData({...formData, eventSize: e.target.value})}
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(201,169,110,0.25)', color: 'var(--white)', padding: '14px 0', fontFamily: 'var(--font-jost), sans-serif', outline: 'none' }}
              >
                <option value="" style={{ background: '#13100a' }}>Event Size</option>
                <option value="Intimate (10-30 pax)" style={{ background: '#13100a' }}>Intimate (10–30 pax)</option>
                <option value="Medium (30-100 pax)" style={{ background: '#13100a' }}>Medium (30–100 pax)</option>
                <option value="Large (100-300 pax)" style={{ background: '#13100a' }}>Large (100–300 pax)</option>
                <option value="Grand (300+ pax)" style={{ background: '#13100a' }}>Grand (300+ pax)</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Budget" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} />
              <label>Estimated Budget (RM)</label>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Venue" value={formData.venue} onChange={(e) => setFormData({...formData, venue: e.target.value})} />
              <label>Venue / Location</label>
            </div>
          </>
        );
      default:
        return null;
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
                  <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                    <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{s.icon}</div>
                    <div className="ssc-name" style={{ fontSize: '1.1rem' }}>{s.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="booking-step active">
            <h3 className="booking-step-title">Event <em>Details</em></h3>
            <p className="booking-step-sub">
              {formData.service === "Corporate Bento" ? "Tell us about your bento order." :
               formData.service === "Bridal Makeup" ? "Tell us about your special day." :
               formData.service === "Catering" ? "Tell us about your event." :
               formData.service === "Event Planning" ? "Let us plan your perfect event." :
               "Tell us about your celebration."}
            </p>
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
                <label>{formData.service === "Corporate Bento" ? "Delivery Date" : "Event Date"}</label>
              </div>

              {/* Dynamic service-specific fields */}
              {renderServiceFields()}

              <div className="form-group full">
                <textarea placeholder="Additional notes or requests" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} style={{ minHeight: '60px' }} />
                <label>Additional Notes</label>
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
              <div className="confirm-row"><span className="confirm-label">Phone</span><span className="confirm-value">{formData.phone}</span></div>
              <div className="confirm-row"><span className="confirm-label">Date</span><span className="confirm-value">{formData.date}</span></div>
              
              {/* Dynamic confirm fields */}
              {formData.service === "Corporate Bento" && (
                <>
                  {formData.bentoType && <div className="confirm-row"><span className="confirm-label">Bento Type</span><span className="confirm-value">{formData.bentoType}</span></div>}
                  {formData.bentoPax && <div className="confirm-row"><span className="confirm-label">Pax</span><span className="confirm-value">{formData.bentoPax}</span></div>}
                  {formData.companyName && <div className="confirm-row"><span className="confirm-label">Company</span><span className="confirm-value">{formData.companyName}</span></div>}
                  {formData.deliveryTime && <div className="confirm-row"><span className="confirm-label">Delivery Time</span><span className="confirm-value">{formData.deliveryTime}</span></div>}
                </>
              )}
              {formData.service === "Bridal Makeup" && (
                <>
                  {formData.bridalPackage && <div className="confirm-row"><span className="confirm-label">Package</span><span className="confirm-value">{formData.bridalPackage}</span></div>}
                  {formData.trialDate && <div className="confirm-row"><span className="confirm-label">Trial Date</span><span className="confirm-value">{formData.trialDate}</span></div>}
                </>
              )}
              {formData.service === "Catering" && (
                <>
                  {formData.cuisineType && <div className="confirm-row"><span className="confirm-label">Cuisine</span><span className="confirm-value">{formData.cuisineType}</span></div>}
                  {formData.eventType && <div className="confirm-row"><span className="confirm-label">Event Type</span><span className="confirm-value">{formData.eventType}</span></div>}
                  {formData.guests !== "0" && <div className="confirm-row"><span className="confirm-label">Guests</span><span className="confirm-value">{formData.guests}</span></div>}
                </>
              )}
              {formData.service === "Engagement" && (
                <>
                  {formData.theme && <div className="confirm-row"><span className="confirm-label">Theme</span><span className="confirm-value">{formData.theme}</span></div>}
                  {formData.venue && <div className="confirm-row"><span className="confirm-label">Venue</span><span className="confirm-value">{formData.venue}</span></div>}
                  {formData.guests !== "0" && <div className="confirm-row"><span className="confirm-label">Guests</span><span className="confirm-value">{formData.guests}</span></div>}
                </>
              )}
              {formData.service === "Event Planning" && (
                <>
                  {formData.eventCategory && <div className="confirm-row"><span className="confirm-label">Category</span><span className="confirm-value">{formData.eventCategory}</span></div>}
                  {formData.eventSize && <div className="confirm-row"><span className="confirm-label">Size</span><span className="confirm-value">{formData.eventSize}</span></div>}
                  {formData.budget && <div className="confirm-row"><span className="confirm-label">Budget</span><span className="confirm-value">RM {formData.budget}</span></div>}
                  {formData.venue && <div className="confirm-row"><span className="confirm-label">Venue</span><span className="confirm-value">{formData.venue}</span></div>}
                </>
              )}
              {formData.notes && <div className="confirm-row"><span className="confirm-label">Notes</span><span className="confirm-value">{formData.notes}</span></div>}
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
