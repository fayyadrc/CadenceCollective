import React from 'react';
import { Instagram, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-primary-light py-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="font-heading text-2xl font-bold mb-2">Cadence Collective</h2>
            <p className="text-sm opacity-60 max-w-xs">
              Empowering the next generation of musicians through student-led education.
            </p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-accent hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="mailto:hello@cadence.com" className="p-3 bg-white/10 rounded-full hover:bg-accent hover:text-white transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs opacity-40 gap-4">
          <p>&copy; {new Date().getFullYear()} Cadence Collective. All rights reserved.</p>
          <Link to="/login" className="flex items-center gap-1 hover:opacity-100 hover:text-white transition-opacity">
            <Lock size={12} /> Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
