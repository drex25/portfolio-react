import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
