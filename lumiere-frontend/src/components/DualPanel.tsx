

export default function DualPanel() {
  return (
    <div className="dual-section" id="about">
      <div className="dual-panel">
        <div 
          className="dual-panel-bg"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=80')" }}
        />
        <div className="dual-panel-content">
          <div className="dual-tag">Fine Catering</div>
          <h2 className="dual-title">Culinary<br />Excellence</h2>
          <p className="dual-body">
            From intimate dinners to grand celebrations — our chefs craft menus that tell a story
            through every dish, using the finest local ingredients with global inspiration.
          </p>
          <a href="#contact" className="dual-link">Get in Touch →</a>
        </div>
      </div>
      <div className="dual-panel">
        <div 
          className="dual-panel-bg"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=80')" }}
        />
        <div className="dual-panel-content">
          <div className="dual-tag">Beauty & Makeup</div>
          <h2 className="dual-title">Artistry in<br />Every Detail</h2>
          <p className="dual-body">
            Our beauty artists bring your vision to life — whether for bridal, editorial, or special
            occasions. Flawless, lasting, and uniquely you.
          </p>
          <a href="#contact" className="dual-link">Book Now →</a>
        </div>
      </div>
    </div>
  );
}
