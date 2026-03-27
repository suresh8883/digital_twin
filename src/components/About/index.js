import React, { useRef, useEffect } from 'react';
import usePageTitle from '../../usePageTitle';
import sliderImageOne from '../../assets/images/HomeSlider/Slide_1.jpeg';
import sliderImageTwo from '../../assets/images/HomeSlider/Slide_2.jpeg';
import sliderImageThree from '../../assets/images/HomeSlider/Slide_3.jpeg';

const team = [
  {
    profileImage: sliderImageOne,
    name: 'BIM Manager',
    description: `Our BIM Manager is the person who is responsible for the implementation of Building Information
    Modelling (BIM) and digital construction procedures.
    He or she deals with organising the digital processes, supervising and generally coordinating orders and
    the specialised human resources involved in the BIM process. The BIM Manager manages also interacts
    mainly with two other management figures: the BIM Modeller and the BIM Coordinator; but possess the
    right background to make the final decisions independently. They have the practical knowledge that
    allows them to be fully involved in the management process and the creation of standards and
    documentation.`,
  },
  {
    profileImage: sliderImageTwo,
    name: 'BIM Coordinator',
    description: `Our BIM coordinator coordinates the process of generating and managing digital models of places;
    building information models are virtual files that help with decision-making during the building process.
    Our coordinators are well-educated in not only the industry in which they works, but in all aspects of
    construction as well.
    Aside from time spent in the office, our coordinator also likely spends substantial time at job/build sites
    to inspect the project and witness progress as it happens; the coordinator can compare real-time
    progress to the building model plan and revise when needed.`,
  },
  {
    profileImage: sliderImageThree,
    name: 'BIM Modeller',
    description: `Our BIM modeler is the person who actually makes the model. He/She will model the elements, will
    add the requirement information to the elements. They are able to make new elements (custom revit
    families for example). He knows how to make schedules which support him in modelling. Modelling for
    us, is making a 3D element PLUS adding the right info to it.
    We always like to team up engineers with a modeler. The BIM engineer brings input to the model. He (or
    she) has the technical knowledge that needs to be brought into the model. It's the responsibility of the
    engineer to make this happen.`,
  },
];

function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = Number(entry.target.getAttribute('data-delay') || 0);
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ref]);
}

const revealStyle = (delay = 0) => ({
  opacity: 0,
  transform: 'translateY(28px)',
  transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
});

function About() {
  usePageTitle('About');
  const aboutRef = useRef(null);
  const teamRef = useRef(null);
  useReveal(aboutRef);
  useReveal(teamRef);

  return (
    <>
      {/* About intro */}
      <section className="about-section" ref={aboutRef}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-reveal data-delay="0" style={revealStyle(0)}>
              <div className="about-img-wrap">
                <img src={sliderImageTwo} alt="Digital Twin Technologies" />
              </div>
            </div>
            <div className="col-lg-6 about-text text-start" data-reveal data-delay="150" style={revealStyle(150)}>
              <span className="section-label">Who We Are</span>
              <h2>About Digital Twin</h2>
              <div className="section-divider" />
              <p>
                We're an independently owned strategic creative agency forever curious and ready to transform the way business is done.
              </p>
              <p>
                Although we are a well-oiled machine, our people are talented and we cultivate the importance of honoring their respective crafts. It helps to better serve both each other and our partners and it shows in everything from what we design and produce, so what we value and believe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section" ref={teamRef}>
        <div className="container">
          <div
            data-reveal
            data-delay="0"
            style={{ ...revealStyle(0), textAlign: 'center', marginBottom: '3rem' }}
          >
            <span className="section-label">The People</span>
            <h2 className="section-title">Our Team</h2>
            <div className="section-divider" style={{ margin: '0 auto' }} />
          </div>

          <div className="row g-4">
            {team.map((member, i) => (
              <div
                key={i}
                className="col-md-4"
                data-reveal
                data-delay={`${i * 120}`}
                style={revealStyle(i * 120)}
              >
                <div className="team-card">
                  <div className="team-img-wrap">
                    <img src={member.profileImage} alt={member.name} />
                    <div className="team-img-overlay" />
                  </div>
                  <div className="team-card-body text-start">
                    <h3>{member.name}</h3>
                    <span className="team-role">BIM Professional</span>
                    <p>{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
