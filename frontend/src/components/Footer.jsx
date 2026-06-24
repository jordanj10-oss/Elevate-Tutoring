import { Link } from 'react-router-dom';
import './Footer.css';
import logoMark from '/logo-mark.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={logoMark} alt="Elevate Tutoring" className="footer-logo-img" />
              <span className="logo-text">Elevate Tutoring</span>
            </div>
            <p className="footer-tagline">
              Personalized, on-demand tutoring for every subject and every level — from elementary school through college.
            </p>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/subjects">All Subjects</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/about">How It Works</Link>
            <Link to="/contact">Get Started</Link>
          </div>

          <div className="footer-column">
            <h4>Subjects</h4>
            <Link to="/subjects">Math</Link>
            <Link to="/subjects">Science</Link>
            <Link to="/subjects">English</Link>
            <Link to="/subjects">Test Prep</Link>
            <Link to="/subjects">Computer Science</Link>
          </div>

          <div className="footer-column">
            <h4>Contact</h4>
            <p>hello@elevatetutoring.com</p>
            <p>(555) 123-4567</p>
            <p>San Francisco, CA</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Elevate Tutoring. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}