import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Articles } from './pages/Articles';
import { ArticleDetail } from './pages/ArticleDetail';
import { Frameworks } from './pages/Frameworks';
import { CaseStudies } from './pages/CaseStudies';
import { About } from './pages/About';
import { Tools } from './pages/Tools';
import { BackToTop } from './components/BackToTop';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:slug" element={<ArticleDetail />} />
              <Route path="/frameworks" element={<Frameworks />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/about" element={<About />} />
              <Route path="/tools" element={<Tools />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}
