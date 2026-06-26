import { useState } from 'react';
import { subjects, levels } from '../data/subjects';
import './TutorApply.css';

const educationLevels = [
  'High School Diploma',
  'Some College',
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Doctorate (PhD)',
  'Professional Degree (JD, MD, etc.)'
];

const experienceOptions = [
  'Less than 1 year',
  '1–2 years',
  '3–5 years',
  '5–10 years',
  '10+ years'
];

const hoursOptions = [
  'Less than 5 hours/week',
  '5–10 hours/week',
  '10–20 hours/week',
  '20–30 hours/week',
  '30+ hours/week'
];

export default function TutorApply() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    institution: '',
    subjects: [],
    gradeLevels: [],
    experience: '',
    description: '',
    hoursPerWeek: '',
    schedule: '',
    whyYou: '',
    consentBgCheck: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubjectToggle = (subject) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleLevelToggle = (level) => {
    setFormData(prev => ({
      ...prev,
      gradeLevels: prev.gradeLevels.includes(level)
        ? prev.gradeLevels.filter(l => l !== level)
        : [...prev.gradeLevels, level]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tutor Application:', formData);
    setSubmitted(true);
  };

  const uniqueCategories = [...new Set(subjects.map(s => s.category))];

  if (submitted) {
    return (
      <div className="apply-page">
        <section className="apply-hero">
          <div className="container">
            <h1>Application Received, <span className="text-accent">{formData.name}</span>!</h1>
            <p>Thank you for applying to join the Elevate Tutoring team. Our operations team will review your application and reach out within 5–7 business days.</p>
            <div className="success-actions">
              <a href="/" className="btn btn-primary">Back to Home</a>
              <a href="/about" className="btn btn-outline">Learn About Us</a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="apply-page">
      {/* Hero */}
      <section className="apply-hero">
        <div className="container">
          <h1>Become a <span className="text-accent">Tutor</span></h1>
          <p>Join our network of 500+ qualified educators. Share your expertise, set your own schedule, and make a real impact on students' lives.</p>
        </div>
      </section>

      {/* Application Form */}
      <section className="section">
        <div className="container">
          <div className="form-layout">
            <div className="form-wrapper">
              <h2 className="form-title">Tutor Application</h2>
              <form onSubmit={handleSubmit} className="apply-form">

                {/* Personal Info */}
                <h3 className="form-section-title">Personal Information</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Jane Smith" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="jane@example.com" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="(555) 123-4567" />
                </div>

                {/* Education */}
                <h3 className="form-section-title">Education & Experience</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="education">Highest Degree *</label>
                    <select id="education" name="education" value={formData.education} onChange={handleChange} required>
                      <option value="">Select your highest degree</option>
                      {educationLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="institution">Institution Name</label>
                    <input type="text" id="institution" name="institution" value={formData.institution} onChange={handleChange} placeholder="University of California" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="experience">Years of Tutoring/Teaching *</label>
                    <select id="experience" name="experience" value={formData.experience} onChange={handleChange} required>
                      <option value="">Select experience level</option>
                      {experienceOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="hoursPerWeek">Hours Available Per Week *</label>
                    <select id="hoursPerWeek" name="hoursPerWeek" value={formData.hoursPerWeek} onChange={handleChange} required>
                      <option value="">Select availability</option>
                      {hoursOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Describe Your Experience *</label>
                  <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} required placeholder="Tell us about your tutoring/teaching background, subjects you've taught, and your approach to working with students. (Approx. 200 words)" />
                </div>

                {/* Subjects */}
                <h3 className="form-section-title">Subjects You Can Tutor *</h3>
                <p className="form-section-desc">Select all subjects you are qualified to teach.</p>

                {uniqueCategories.map(category => (
                  <div key={category} className="subject-category-group">
                    <h4 className="subject-category-label">{category}</h4>
                    <div className="subject-checkboxes">
                      {subjects.filter(s => s.category === category).map(subject => (
                        <label key={subject.id} className={`subject-checkbox ${formData.subjects.includes(subject.name) ? 'selected' : ''}`}>
                          <input
                            type="checkbox"
                            checked={formData.subjects.includes(subject.name)}
                            onChange={() => handleSubjectToggle(subject.name)}
                          />
                          <span className="subject-checkbox-icon">{subject.icon}</span>
                          <span>{subject.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Grade Levels */}
                <h3 className="form-section-title">Preferred Grade Levels *</h3>

                <div className="level-checkboxes">
                  {levels.map(level => (
                    <label key={level} className={`level-checkbox ${formData.gradeLevels.includes(level) ? 'selected' : ''}`}>
                      <input
                        type="checkbox"
                        checked={formData.gradeLevels.includes(level)}
                        onChange={() => handleLevelToggle(level)}
                      />
                      <span>{level}</span>
                    </label>
                  ))}
                </div>

                {/* Schedule & Motivation */}
                <h3 className="form-section-title">Availability & Motivation</h3>

                <div className="form-group">
                  <label htmlFor="schedule">Preferred Schedule</label>
                  <textarea id="schedule" name="schedule" value={formData.schedule} onChange={handleChange} rows={3} placeholder="Which days and times are you typically available? (e.g., Weekdays after 4pm, Saturdays 9am–2pm)" />
                </div>

                <div className="form-group">
                  <label htmlFor="whyYou">Why Do You Want to Tutor With Us? *</label>
                  <textarea id="whyYou" name="whyYou" value={formData.whyYou} onChange={handleChange} rows={3} required placeholder="What motivates you to join Elevate Tutoring? What makes you a great tutor?" />
                </div>

                {/* Consent */}
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" name="consentBgCheck" checked={formData.consentBgCheck} onChange={handleChange} required />
                    <span>I consent to a background check as part of the application process. *</span>
                  </label>
                </div>

                <button type="submit" className="btn btn-primary btn-block btn-lg">Submit Application</button>
                <p className="form-disclaimer">
                  By submitting, you agree to our tutor agreement and privacy policy. We'll review your application and be in touch.
                </p>
              </form>
            </div>

            {/* Sidebar */}
            <div className="form-sidebar">
              <div className="sidebar-card">
                <h3>Why Join Elevate?</h3>
                <div className="sidebar-benefit">
                  <div className="benefit-icon">💰</div>
                  <div>
                    <h4>Competitive Pay</h4>
                    <p>Set your own rates and earn $35–$70/hr based on your expertise.</p>
                  </div>
                </div>
                <div className="sidebar-benefit">
                  <div className="benefit-icon">⏰</div>
                  <div>
                    <h4>Flexible Schedule</h4>
                    <p>Tutor when it works for you — evenings, weekends, or between classes.</p>
                  </div>
                </div>
                <div className="sidebar-benefit">
                  <div className="benefit-icon">🌎</div>
                  <div>
                    <h4>Work from Anywhere</h4>
                    <p>All sessions are online. Reach students across the country.</p>
                  </div>
                </div>
                <div className="sidebar-benefit">
                  <div className="benefit-icon">📈</div>
                  <div>
                    <h4>Make an Impact</h4>
                    <p>Help students build confidence and achieve their academic goals.</p>
                  </div>
                </div>
              </div>

              <div className="sidebar-card">
                <h3>Requirements</h3>
                <ul className="requirements-list">
                  <li>Bachelor's degree or higher (or currently enrolled)</li>
                  <li>Demonstrated expertise in your subject area</li>
                  <li>Minimum 1 year of tutoring/teaching experience</li>
                  <li>Reliable internet connection</li>
                  <li>Must pass a background check</li>
                  <li>Strong communication skills</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}