import React, { useState } from 'react';
import usePageTitle from '../../usePageTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faEnvelope,
  faClock,
  faPaperPlane,
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedinIn,
  faFacebook,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

const INITIAL = { name: '', phone: '', email: '', message: '' };
const CHAR_LIMIT = 999;

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Full name is required.';
  if (!fields.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!/^\+?[\d\s\-().]{7,20}$/.test(fields.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!fields.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!fields.message.trim()) errors.message = 'Message is required.';
  return errors;
}

function ContactUs() {
  usePageTitle('Contact Us');
  const [fields, setFields]   = useState(INITIAL);
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus]   = useState(null); // 'sending' | 'success' | 'error'

  const remaining = CHAR_LIMIT - fields.message.length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    // Clear error as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const fieldErrors = validate({ ...fields });
    setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = { name: true, phone: true, email: true, message: true };
    setTouched(allTouched);
    const fieldErrors = validate(fields);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setStatus('sending');
    // mailto: fallback — opens email client with pre-filled content
    const subject = encodeURIComponent(`Enquiry from ${fields.name}`);
    const body = encodeURIComponent(
      `Name: ${fields.name}\nPhone: ${fields.phone}\nEmail: ${fields.email}\n\nMessage:\n${fields.message}`
    );
    window.location.href = `mailto:Enquiry@digitaltwintec.com?subject=${subject}&body=${body}`;
    // Show success state after triggering mailto
    setTimeout(() => {
      setStatus('success');
      setFields(INITIAL);
      setTouched({});
      setErrors({});
    }, 500);
  };

  const fieldClass = (name) => {
    if (!touched[name]) return 'form-floating-group';
    return `form-floating-group${errors[name] ? ' field-error' : ' field-valid'}`;
  };

  return (
    <>
      {/* Map + Details */}
      <section className="contact-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">Get In Touch</span>
            <h2 className="section-title">Contact Us</h2>
            <div className="section-divider" style={{ margin: '0 auto' }} />
          </div>

          <div className="row g-5 align-items-start">
            <div className="col-lg-8">
              <div className="map-wrap">
                <iframe
                  title="Digital Twin Technologies Location"
                  src="https://www.google.com/maps/embed?pb=!1m27!1m12!1m3!1d57800.01325236461!2d55.172173520097125!3d25.118753401972594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m12!3e0!4m4!1s0x3e5f6bc1af6c4c71%3A0xf083c1c6ad64697b!3m2!1d25.1186798!2d55.2071932!4m5!1s0x3e5f6bc1af6c4c71%3A0xf083c1c6ad64697b!2sThe%20Iridium%20-%20Al%20BarshaAl%20Barsha%201%20-%20Dubai%20-%20United%20Arab%20Emirates!3m2!1d25.1186798!2d55.2071932!5e0!3m2!1sen!2sin!4v1628343180034!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </div>

            <div className="col-lg-4">
              <div className="contact-details text-start">
                <h3>Contact Details</h3>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </div>
                  <div className="contact-detail-text">
                    Suite 17, The Iridium Building, Umm Suqeim Road
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div className="contact-detail-text">
                    <a href="mailto:Enquiry@digitaltwintec.com">Enquiry@digitaltwintec.com</a>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                  <div className="contact-detail-text">
                    Monday – Friday: 9:00 AM to 5:00 PM
                  </div>
                </div>

                <div className="contact-social">
                  <a href="#" aria-label="Facebook" onClick={e => e.preventDefault()}>
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                  <a href="#" aria-label="LinkedIn" onClick={e => e.preventDefault()}>
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </a>
                  <a href="#" aria-label="Twitter" onClick={e => e.preventDefault()}>
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 text-start">
              <span className="section-label">Drop Us a Line</span>
              <h3>Send us a Message</h3>
              <div className="section-divider" />

              {/* Success Banner */}
              {status === 'success' && (
                <div className="form-status-banner form-status-success">
                  <FontAwesomeIcon icon={faCheckCircle} />
                  &nbsp; Your message has been prepared — your email client should open shortly.
                </div>
              )}

              {/* Error Banner */}
              {status === 'error' && (
                <div className="form-status-banner form-status-error">
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  &nbsp; Something went wrong. Please try again.
                </div>
              )}

              <form id="contactForm" onSubmit={handleSubmit} noValidate>

                <div className={fieldClass('name')}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    value={fields.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby="name-error"
                    aria-invalid={!!errors.name}
                  />
                  <label htmlFor="name">Full Name</label>
                  {touched.name && errors.name && (
                    <span className="field-error-msg" id="name-error" role="alert">
                      <FontAwesomeIcon icon={faExclamationCircle} /> {errors.name}
                    </span>
                  )}
                </div>

                <div className={fieldClass('phone')}>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    value={fields.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby="phone-error"
                    aria-invalid={!!errors.phone}
                  />
                  <label htmlFor="phone">Phone Number</label>
                  {touched.phone && errors.phone && (
                    <span className="field-error-msg" id="phone-error" role="alert">
                      <FontAwesomeIcon icon={faExclamationCircle} /> {errors.phone}
                    </span>
                  )}
                </div>

                <div className={fieldClass('email')}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    value={fields.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby="email-error"
                    aria-invalid={!!errors.email}
                  />
                  <label htmlFor="email">Email Address</label>
                  {touched.email && errors.email && (
                    <span className="field-error-msg" id="email-error" role="alert">
                      <FontAwesomeIcon icon={faExclamationCircle} /> {errors.email}
                    </span>
                  )}
                </div>

                <div className={fieldClass('message')}>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Message"
                    value={fields.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={CHAR_LIMIT}
                    aria-describedby="message-error"
                    aria-invalid={!!errors.message}
                  />
                  <label htmlFor="message">Message</label>
                  <span className={`char-count${remaining < 50 ? ' char-count-warn' : ''}`}>
                    {remaining} characters remaining
                  </span>
                  {touched.message && errors.message && (
                    <span className="field-error-msg" id="message-error" role="alert">
                      <FontAwesomeIcon icon={faExclamationCircle} /> {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-send"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>Sending…</>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
