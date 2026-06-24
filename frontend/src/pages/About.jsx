import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  const steps = [
    {
      number: 1,
      title: 'Tell Us Your Needs',
      description: 'Start by filling out a short form telling us about the subjects you need help with, your grade level, your learning goals, and your preferred schedule. The more we know, the better we can match you.',
      icon: '📝'
    },
    {
      number: 2,
      title: 'Get Matched with the Perfect Tutor',
      description: 'Our matching system reviews your needs against our network of 500+ qualified tutors. We consider subject expertise, teaching style, availability, and personality fit to find your ideal match. You will receive your tutor\'s profile and can ask any questions before starting.',
      icon: '🤝'
    },
    {
      number: 3,
      title: 'Start Your Learning Journey',
      description: 'Begin one-on-one sessions with your tutor. Sessions are held online via video chat or in person if available in your area. Your tutor will create a personalized learning plan, track your progress, and adjust as you improve.',
      icon: '🚀'
    },
    {
      number: 4,
      title: 'Track Progress & Provide Feedback',
      description: 'After each session, you can rate your tutor and provide feedback. We use this to continuously improve your experience. Monthly progress reports help you see how far you\'ve come and what to focus on next.',
      icon: '📈'
    }
  ];

  const qualifications = [
    {
      title: 'Advanced Degrees',
      description: 'Over 80% of our tutors hold a master\'s degree or PhD in their subject area. All tutors have a minimum of a bachelor\'s degree with demonstrated expertise.'
    },
    {
      title: 'Teaching Experience',
      description: 'Every tutor has at least 2 years of teaching or tutoring experience. Many are current or former educators who bring professional teaching skills to every session.'
    },
    {
      title: 'Background Checked',
      description: 'All tutors undergo comprehensive background checks. Your safety and your child\'s safety are our top priorities.'
    },
    {
      title: 'Vetted & Rated',
      description: 'Tutors are continuously evaluated based on student feedback, session quality, and improvement outcomes. Only the top-rated tutors remain in our network.'
    },
    {
      title: 'Subject Matter Experts',
      description: 'Our tutors are not just generalists — they are specialists in their fields. Whether you need help with organic chemistry or Shakespearean sonnets, we have an expert for you.'
    },
    {
      title: 'Personality Matched',
      description: 'We believe the tutor-student relationship matters. Our matching process considers learning style and personality to ensure a productive, comfortable learning environment.'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <h1>How <span className="text-accent">Elevate Tutoring</span> Works</h1>
          <p>We make personalized tutoring simple, effective, and accessible. Here is exactly how it works.</p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section">
        <div className="container">
          <div className="process-steps">
            {steps.map((step) => (
              <div key={step.number} className="process-step">
                <div className="process-step-left">
                  <div className="process-step-number">{step.number}</div>
                  <div className="process-step-line" />
                </div>
                <div className="process-step-content">
                  <div className="process-step-icon">{step.icon}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section section-alt">
        <div className="container">
          <div className="story-section">
            <h2 className="section-title">Our <span className="text-accent">Story</span></h2>
            <div className="story-content">
              <p>
                Elevate Tutoring was founded in 2020 by a group of educators and technologists who saw a simple truth: 
                every student learns differently, and every student deserves access to personalized academic support.
              </p>
              <p>
                Traditional tutoring models were too expensive, too rigid, or too impersonal. So we built something better — 
                a platform that combines the expertise of highly qualified tutors with smart matching technology to deliver 
                affordable, effective, one-on-one tutoring to anyone, anywhere.
              </p>
              <p>
                Today, we serve thousands of students across all 50 states, from kindergarteners learning to read to 
                college students tackling advanced calculus. Our tutors have helped students gain admission to top 
                universities, earn perfect test scores, and — most importantly — develop a genuine love for learning.
              </p>
              <p>
                We believe that education is the most powerful tool for changing lives. We are honored to be part of 
                your learning journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tutor Qualifications */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our <span className="text-accent">Tutors</span></h2>
          <p className="section-subtitle">
            We hold our tutors to the highest standards so you can learn with confidence.
          </p>

          <div className="quals-grid">
            {qualifications.map((qual, i) => (
              <div key={i} className="qual-card">
                <div className="qual-icon">✓</div>
                <h3>{qual.title}</h3>
                <p>{qual.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section section-alt">
        <div className="container">
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-number">5,000+</span>
              <span className="stat-label">Students Tutored</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Qualified Tutors</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Subjects Offered</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">96%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of successful students. Your perfect tutor is just a click away.</p>
          <Link to="/contact" className="btn btn-primary btn-lg">Find Your Tutor</Link>
        </div>
      </section>
    </div>
  );
}