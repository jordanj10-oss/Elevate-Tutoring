import { useState } from 'react';
import { subjects, levels } from '../data/subjects';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    gradeLevel: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend — just show success for now
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="contact-page">
        <section className="contact-hero">
          <div className="container">
            <h1>Thank You, <span className="text-accent">{formData.name}</span>!</h1>
            <p>Your request has been received. A member of our team will reach out to you within 24 hours to discuss your tutoring needs and match you with the perfect tutor.</p>
            <div className="success-actions">
              <a href="/" className="btn btn-primary">Back to Home</a>
              <a href="/subjects" className="btn btn-outline">Explore Subjects</a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const uniqueCategories = [...new Set(subjects.map(s => s.category))];

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="container">
          <h1>Get Started with <span className="text-accent">Elevate Tutoring</span></h1>
          <p>Tell us a little about yourself and what you need help with, and we'll match you with the perfect tutor — usually within 24 hours.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            {/* Form */}
            <div className="contact-form-wrapper">
              <h2 className="form-title">Tell Us About Your Needs</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gradeLevel">Grade Level *</label>
                    <select
                      id="gradeLevel"
                      name="gradeLevel"
                      value={formData.gradeLevel}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select your grade level</option>
                      {levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject Needed *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    {uniqueCategories.map(cat => (
                      <optgroup key={cat} label={cat}>
                        {subjects.filter(s => s.category === cat).map(s => (
                          <option key={s.id} value={s.name}>{s.name}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Tell Us More</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="What are your learning goals? Any specific challenges or topics you want to focus on? Do you have a preferred schedule or tutor preference?"
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block btn-lg">
                  Submit Your Request
                </button>
                <p className="form-disclaimer">
                  By submitting, you agree to our privacy policy. We'll never share your information.
                </p>
              </form>
            </div>

            {/* Contact Info Sidebar */}
            <div className="contact-info">
              <div className="contact-info-card">
                <h3>Other Ways to Reach Us</h3>

                <div className="contact-method">
                  <div className="contact-method-icon">📧</div>
                  <div>
                    <h4>Email</h4>
                    <p>hello@elevatetutoring.com</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-method-icon">📞</div>
                  <div>
                    <h4>Phone</h4>
                    <p>(555) 123-4567</p>
                    <p className="contact-note">Mon–Fri, 9am–6pm EST</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-method-icon">📍</div>
                  <div>
                    <h4>Location</h4>
                    <p>San Francisco, CA</p>
                    <p className="contact-note">Online sessions available nationwide</p>
                  </div>
                </div>
              </div>

              <div className="contact-info-card">
                <h3>What Happens Next?</h3>
                <ol className="next-steps">
                  <li>We review your request within 24 hours</li>
                  <li>We hand-select 2-3 tutor matches for you</li>
                  <li>You review profiles and choose your favorite</li>
                  <li>Book your first session and start learning!</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}