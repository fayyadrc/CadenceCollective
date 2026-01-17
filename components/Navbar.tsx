import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Instagram, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [joinUsDropdownOpen, setJoinUsDropdownOpen] = useState(false);
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
          <div className="relative">
            <button
              onClick={() => setJoinUsDropdownOpen(!joinUsDropdownOpen)}
              onBlur={() => setTimeout(() => setJoinUsDropdownOpen(false), 200)}
              className="px-6 py-2.5 bg-primary-dark text-white font-bold rounded-full hover:bg-accent transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-purple-900/20 flex items-center gap-2"
            >
              Join Us
              <ChevronDown size={16} className={`transition-transform ${joinUsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {joinUsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-primary-dark/10 overflow-hidden min-w-[220px]"
                >
                  <a
                    href="https://www.instagram.com/cadence.collective_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3 hover:bg-accent/10 transition-colors border-b border-primary-dark/10"
                  >
                    <Instagram size={20} className="text-primary-dark" />
                    <span className="font-medium text-primary-dark">Follow us on Instagram</span>
                  </a>
                  <a
                    href="mailto:cc.cadence.collective@gmail.com"
                    className="flex items-center gap-3 px-5 py-3 hover:bg-accent/10 transition-colors"
                  >
                    <Mail size={20} className="text-primary-dark" />
                    <span className="font-medium text-primary-dark">Email us for more info</span>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
              <div className="flex flex-col items-center gap-3 mt-2">
                <p className="font-bold text-primary-dark text-lg">Join Us</p>
                <a
                  href="https://www.instagram.com/cadence.collective_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary-dark text-white font-medium rounded-full hover:bg-accent transition-all"
                >
                  <Instagram size={18} />
                  Follow on Instagram
                </a>
                <a
                  href="mailto:cc.cadence.collective@gmail.com"
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary-dark text-white font-medium rounded-full hover:bg-accent transition-all"
                >
                  <Mail size={18} />
                  Email for info
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}