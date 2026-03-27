import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faFacebook,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-text">
          Copyright &copy; 2024 Digital Twin Technologies Pvt. Ltd, All Rights Reserved.
        </p>
        <div className="footer-icons">
          {/* FIX: changed from <button> to <a> — correct semantic for navigation links */}
          <a
            href="https://facebook.com"
            className="footer-social-btn"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href="https://twitter.com"
            className="footer-social-btn"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href="https://linkedin.com"
            className="footer-social-btn"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
