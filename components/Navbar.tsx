import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Team', path: '/#team' },
    { name: 'Gallery', path: '/#gallery' },
  ];

  const handleScrollToSection = (path: string) => {
    if (path.includes('#')) {
      if (location.pathname !== '/') {

        return;
      }
      const id = path.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/20 backdrop-blur-lg border-b border-white/20 py-4'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/cadence_logo.png"
            alt="Cadence Collective"
            className="h-10 w-auto object-contain transition-transform group-hover:scale-110"
          />
          <span className="font-heading font-bold text-lg tracking-wide text-primary-dark">
            CadenceCollective<span className="text-accent"></span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => handleScrollToSection(link.path)}
              className="font-medium text-sm uppercase tracking-wider text-primary-dark/80 hover:text-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link
            to="/apply"
            className="px-6 py-2.5 bg-primary-dark text-white font-bold rounded-full hover:bg-accent transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-purple-900/20"
          >
            Join Us
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary-dark"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream border-b border-primary-dark/10 overflow-hidden"
          >
            <div className="flex flex-col items-center gap-6 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => handleScrollToSection(link.path)}
                  className="font-heading text-2xl text-primary-dark hover:text-accent"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/apply"
                onClick={() => setMobileMenuOpen(false)}
                className="px-8 py-3 bg-primary-dark text-white font-bold rounded-full mt-2"
              >
                Join Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}