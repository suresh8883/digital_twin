import React, { useState, useRef, useLayoutEffect } from 'react';
import usePageTitle from '../../usePageTitle';
import sliderImageTwo from '../../assets/images/HomeSlider/Slide_2.jpeg';

const tabs = [
  {
    key: 'models',
    label: 'Models',
    title: 'Models',
    content: [
      `A 3D model is a mathematical representation of something three-dimensional. 3D models are used to
      portray real-world and conceptual visuals for better understanding and coordinjation in AEC industries. It
      is being acclaimed by its advocates as a lifesaver for complicated projects because of its ability to correct
      errors early in the design stage and accurately schedule construction.`,
      `We deliver the models in designated software extensions such as .rvt, .nwc and so on...`,
    ],
  },
  {
    key: 'shop',
    label: 'Shop Drawings',
    title: 'Shop Drawings',
    content: [
      `Design drawings are used in the early stage of design development as a means to communicate design
      ideas and proposals. In comparison, shop drawings provide the details needed by a fabricator during
      fabrication, assembly, installation and erection, such as the specified material, weld types and
      connections. All our drawings will be given in CAD and PDF formats.`,
    ],
  },
  {
    key: 'asbuilt',
    label: 'As-Built & Facilities Management',
    title: 'As-Built & Facilities Management',
    content: [
      `The simplest introduction to BIM for facilities managers is through digital twins. A digital twin is a 3D
      digital replication of a physical building and the baseline model for a BIM record. A digital twin allows a
      facilities manager to identify different elements of a building, isolate them for their information, and
      understand the needs of both that specific element and its relationship to peripheral systems. We also
      incorporate the data as per the industry CoBie standard.`,
    ],
  },
];

function Services() {
  usePageTitle('Services');
  const [active, setActive] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef([]);

  // useLayoutEffect fires synchronously after DOM mutations but before paint,
  // so the indicator is always correctly positioned on first render
  useLayoutEffect(() => {
    const el = tabRefs.current[active];
    if (el) {
      setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [active]);

  return (
    <>
      <div className="services-banner" style={{ marginTop: 'calc(-1 * var(--nav-height))' }}>
        <img src={sliderImageTwo} alt="Services" />
        <div className="services-banner-overlay" />
        <div className="services-banner-content container">
          <span className="section-label" style={{ marginBottom: '0.75rem' }}>What We Offer</span>
          <h1>Services</h1>
        </div>
      </div>

      <div className="tab-switcher">
        <div className="tab-nav">
          {tabs.map((tab, i) => (
            <button
              key={tab.key}
              ref={(el) => (tabRefs.current[i] = el)}
              className={`tab-btn${active === i ? ' active' : ''}`}
              onClick={() => setActive(i)}
            >
              {tab.label}
            </button>
          ))}
          <span className="tab-indicator" style={indicatorStyle} />
        </div>

        {tabs.map((tab, i) => (
          <div key={tab.key} className={`tab-panel text-start${active === i ? ' active' : ''}`}>
            <h4>{tab.title}</h4>
            {tab.content.map((para, j) => (
              <p key={j}>{para}</p>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Services;
