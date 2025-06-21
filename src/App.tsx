import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import CV from './pages/CV';
import CustomLoader from './components/CustomLoader';

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timeout);
  }, [location]);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {loading && <CustomLoader />}
      {/* Solo mostrar Navbar y Footer si no estamos en la página CV */}
      {location.pathname !== '/cv' && <Navbar onLanguageChange={changeLanguage} />}
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cv" element={<CV />} />
        </Routes>
      </main>
      {/* Solo mostrar Footer si no estamos en la página CV */}
      {location.pathname !== '/cv' && <Footer />}
    </div>
  );
};

export default App;