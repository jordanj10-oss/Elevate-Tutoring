import { Link } from 'react-router-dom';
import { subjects, categories, levels } from '../data/subjects';
import './Home.css';

const gradeLevels = [
  { id: 'K-5', label: 'K-5', description: 'Elementary', color: '#38a169' },
  { id: '6-8', label: '6-8', description: 'Middle School', color: '#d69e2e' },
  { id: '9-12', label: '9-12', description: 'High School', color: '#dd6b20' },
  { id: 'College', label: 'College', description: 'College & Beyond', color: '#3182ce' }
];

const howItWorks = [
  { step: 1, title: 'Tell Us Your Needs', description: 'Fill out a quick form telling us what subjects you need help with, your grade level, and your goals. We\'ll use this to find the perfect tutor match.' },
  { step: 2, title: 'We Match You', description: 'Our system pairs you with a qualified tutor who matches your learning style, subject expertise, and budget. You can review their profile and qualifications.' },
  { step: 3, title: 'Start Learning', description: 'Begin your sessions online or in person at your convenience. Track your progress, provide feedback, and watch your confidence grow.' }
];

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <h1>Unlock Your Full Potential with <span className="hero-highlight">Expert Tutoring</span></h1>
          <p className="hero-subtitle">
            Personalized, one-on-one tutoring for every subject and every level. 
            From elementary school through college, we match you with the perfect tutor to help you succeed.
          </p>
          <div className="hero-cta">
            <Link to="/contact" className="btn btn-primary btn-lg">Find Your Tutor</Link>
            <Link to="/subjects" className="btn btn-secondary btn-lg">Explore Subjects</Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Expert Tutors</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Subjects</span>
            </div>
            <div className="stat">
              <span className="stat-number"><span className="text-rating">★</span> 4.8</span>
              <span className="stat-label">Avg. Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grade Levels */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Learning for <span className="text-accent">Every Stage</span></h2>
          <p className="section-subtitle">
            No matter where you are in your academic journey, we have a tutor who can help.
          </p>
          <div className="levels-grid">
            {gradeLevels.map(level => (
              <div key={level.id} className="level-card" style={{ borderTopColor: level.color }}>
                <div className="level-icon" style={{ background: `${level.color}15`, color: level.color }}>{level.id}</div>
                <h3>{level.label}</h3>
                <p>{level.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Explore Our <span className="text-accent">Subjects</span></h2>
          <p className="section-subtitle">
            From algebra to zoology, we cover every subject across every grade level.
          </p>

          <div className="categories-grid">
            {categories.map(category => (
              <div key={category} className="category-card">
                <h3 className="category-title">{category}</h3>
                <div className="category-subjects">
                  {subjects.filter(s => s.category === category).map(subject => (
                    <div key={subject.id} className="subject-chip">
                      <span className="chip-icon">{subject.icon}</span>
                      <span>{subject.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="section-cta">
            <Link to="/subjects" className="btn btn-primary">View All Subjects</Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">How It <span className="text-accent">Works</span></h2>
          <p className="section-subtitle">
            Getting started with Elevate Tutoring is simple. Three easy steps to academic success.
          </p>

          <div className="steps-grid">
            {howItWorks.map(step => (
              <div key={step.step} className="step-card">
                <div className="step-number">{step.step}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Why Choose <span className="text-accent">Elevate Tutoring</span></h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Qualified Tutors</h3>
              <p>Every tutor is vetted, background-checked, and selected for their expertise and teaching ability.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Flexible Scheduling</h3>
              <p>Book sessions when they work for you — evenings, weekends, and same-day availability.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Personalized Matching</h3>
              <p>We match you with tutors who fit your learning style, personality, and academic goals.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Proven Results</h3>
              <p>Our students see an average grade improvement of one full letter grade within 8 sessions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Affordable Options</h3>
              <p>Pay-as-you-go or subscribe to save — we have options for every budget.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>All Ages & Levels</h3>
              <p>From kindergarten through college and adult learning, we support every stage of education.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <h2>Ready to Elevate Your Learning?</h2>
          <p>Join thousands of students who have transformed their academic performance with personalized tutoring.</p>
          <Link to="/contact" className="btn btn-primary btn-lg">Get Started Today</Link>
        </div>
      </section>
    </div>
  );
}