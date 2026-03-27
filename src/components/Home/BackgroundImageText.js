import React from 'react';
import { useHistory } from 'react-router-dom';
import bannerImage from '../../assets/images/banner-logo.jpeg';

function BackgroundImageText() {
  const history = useHistory();

  return (
    <div
      className="cta-banner"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="cta-banner-overlay" />
      <div className="container cta-banner-content">
        <h2>You have questions, we have answers</h2>
        <p>
          "Let's talk about your project. Send us a text message and we will be in touch within one business day."
        </p>
        <button className="btn-premium" onClick={() => history.push('/contactUs')}>
          Contact Us
        </button>
      </div>
    </div>
  );
}

export default BackgroundImageText;
