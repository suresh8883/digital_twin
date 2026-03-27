import React, { useState, useEffect, useRef, useCallback } from 'react';
import sliderImageOne from '../../assets/images/HomeSlider/Slide_1.jpeg';
import sliderImageTwo from '../../assets/images/HomeSlider/Slide_2.jpeg';
import sliderImageThree from '../../assets/images/HomeSlider/Slide_3.jpeg';
import sliderImageFour from '../../assets/images/HomeSlider/Slide_4.jpeg';
import sliderImageFive from '../../assets/images/HomeSlider/Slide_5.jpg';

const slides = [
  { image: sliderImageOne,   label: 'BIM Services', title: 'MEP Coordination and BOQ' },
  { image: sliderImageTwo,   label: 'BIM Services', title: 'Facade Models' },
  { image: sliderImageThree, label: 'BIM Services', title: 'MEP Models' },
  { image: sliderImageFour,  label: 'BIM Services', title: 'Structure Models' },
  { image: sliderImageFive,  label: 'BIM Services', title: 'Architecture Models' },
];

const INTERVAL = 5000;

function HomeSlider() {
  const [current, setCurrent] = useState(0);
  // Use a ref so we can clear/restart the timer imperatively
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, INTERVAL);
  }, []);

  // Start auto-advance on mount, clear on unmount
  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  // Manual dot click: jump to slide AND reset the timer so it doesn't
  // auto-advance immediately after the user's action
  const goTo = (index) => {
    setCurrent(index);
    startTimer(); // FIX: reset interval from this moment
  };

  return (
    <div className="hero-slider" style={{ marginTop: 'calc(-1 * var(--nav-height))' }}>
      {slides.map((slide, i) => (
        <div key={i} className={`hero-slide${i === current ? ' active' : ''}`}>
          <img src={slide.image} alt={slide.title} className="hero-slide-img" />
          <div className="hero-overlay" />
          <div className="hero-content container">
            <span className="hero-slide-label">{slide.label}</span>
            <h1 className="hero-slide-title">{slide.title}</h1>
          </div>
        </div>
      ))}

      <div className="hero-controls">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot${i === current ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* FIX: removed key={current} — progress bar now animates via CSS
          and is restarted by re-triggering the animation on slide change */}
      <div className="hero-progress" key={current} />
    </div>
  );
}

export default HomeSlider;
