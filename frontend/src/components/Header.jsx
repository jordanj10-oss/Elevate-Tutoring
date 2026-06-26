import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/logo-with-text.png" alt="Elevate Tutoring Logo" className="logo-img" />
        </Link>

        <nav className="nav">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/subjects" className={isActive('/subjects')}>Subjects</Link>
          <Link to="/pricing" className={isActive('/pricing')}>Pricing</Link>
          <Link to="/about" className={isActive('/about')}>How It Works</Link>
          <Link to="/become-a-tutor" className={isActive('/become-a-tutor')}>Become a Tutor</Link>
          <Link to="/contact" className="nav-cta">Get Started</Link>
        </nav>
      </div>
    </header>
  );
}
