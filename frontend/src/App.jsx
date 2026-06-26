import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Subjects from './pages/Subjects';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import TutorApply from './pages/TutorApply';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/become-a-tutor" element={<TutorApply />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;