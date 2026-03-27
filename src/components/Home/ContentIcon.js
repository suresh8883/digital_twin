import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNetworkWired,
  faCogs,
  faBuilding,
  faWrench,
  faDraftingCompass,
} from '@fortawesome/free-solid-svg-icons';

const services = [
  {
    icon: faNetworkWired,
    name: 'BIM Model',
    description:
      'BIM was introduced over a decade ago mainly to distinguish the information-rich architectural 3D modeling from the traditional 2D drawing',
  },
  {
    icon: faCogs,
    name: 'Shop Drawings',
    description:
      'Shop drawings provide the details needed by a fabricator during fabrication, assembly, installation and erection, such as the specified material, weld types and connections.',
  },
  {
    icon: faBuilding,
    name: 'Design & Development',
    description:
      'In design development, the schematic plans and elevations are reviewed, revised and expanded to incorporate all the details and specifications required for construction',
  },
  {
    icon: faWrench,
    name: 'Point Cloud to BIM',
    description:
      'A 3D laser scanning device is used to capture the existing conditions, the scanned data is in the form of "Points" when millions of such points are combined together that formulates as a Point Cloud Scan.',
  },
  {
    icon: faDraftingCompass,
    name: 'As-Build & Facilities Management',
    description:
      'A digital twin allows a facilities manager to identify different elements of a building, isolate them for their information, and understand the needs of both that specific element and its relationship to peripheral systems.',
  },
];

function useScrollReveal(ref) {
  useEffect(() => {
    const elements = ref.current ? ref.current.querySelectorAll('[data-reveal]') : [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || 0;
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ref]);
}

function ContentIcon() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section className="services-grid-section" ref={sectionRef}>
      <div className="container">
        <div
          data-reveal
          data-delay="0"
          style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease', marginBottom: '3rem', textAlign: 'center' }}
        >
          <span className="section-label">What We Do</span>
          <h2 className="section-title">Welcome to Digital Twin Technology</h2>
          <div className="section-divider" style={{ margin: '0 auto' }} />
        </div>

        <div className="row g-4 justify-content-center">
          {services.map((svc, i) => (
            <div
              key={i}
              className={`col-md-4${i >= 3 ? ' mt-4' : ''}`}
              data-reveal
              data-delay={`${i * 100}`}
              style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
            >
              <div className="service-card">
                <div className="service-icon-wrap">
                  <FontAwesomeIcon icon={svc.icon} />
                </div>
                <h4>{svc.name}</h4>
                <p>{svc.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContentIcon;
