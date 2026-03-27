import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import sliderImageOne from '../../assets/images/HomeSlider/Slide_1.jpeg';
import sliderImageTwo from '../../assets/images/HomeSlider/Slide_2.jpeg';
import sliderImageThree from '../../assets/images/HomeSlider/Slide_3.jpeg';
import sliderImageFour from '../../assets/images/HomeSlider/Slide_4.jpeg';

const slides = [
  { image: sliderImageOne,  title: 'MEP Coordination and BOQ' },
  { image: sliderImageTwo,  title: 'Facade Models' },
  { image: sliderImageThree,title: 'MEP Models' },
  { image: sliderImageFour, title: 'Structure Models' },
];

function Homecontentslider() {
  const sliderRef = useRef();

  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 2,   // FIX: 4 items ÷ 2 = even, no partial trailing card
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="solutions-section">
      <div className="container">
        <div className="solutions-header">
          <div>
            <span className="section-label">Portfolio</span>
            <h2 className="section-title" style={{ margin: 0 }}>Engineering Solutions</h2>
          </div>
          <div className="slider-nav-group">
            <button className="slider-nav-btn" onClick={() => sliderRef.current.slickPrev()} aria-label="Previous">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="slider-nav-btn" onClick={() => sliderRef.current.slickNext()} aria-label="Next">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>

        <Slider ref={sliderRef} {...settings}>
          {slides.map((slide, i) => (
            <div key={i} className="solution-slide-card">
              <div className="solution-slide-inner">
                <img src={slide.image} alt={slide.title} />
                <div className="solution-slide-caption">
                  <h4>{slide.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Homecontentslider;
