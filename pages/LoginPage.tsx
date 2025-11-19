import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mic, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      navigate('/admin');
    } else {
      setError(true);
      // Shake animation trigger could go here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-primary-dark/10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary-dark p-3 rounded-full text-white mb-4">
            <Mic size={32} />
          </div>
          <h1 className="font-heading text-2xl font-bold text-primary-dark">Admin Login</h1>
          <p className="text-primary-dark/60 text-sm">Enter your password to manage content.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-primary-dark/70">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-dark/40" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                className={`w-full pl-10 pr-4 py-3 rounded-lg bg-primary-light/20 border focus:outline-none focus:ring-2 transition-all ${error ? 'border-red-500 focus:ring-red-200' : 'border-transparent focus:ring-accent/50'}`}
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">Incorrect password.</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-primary-dark text-white font-bold py-3 rounded-lg hover:bg-accent transition-colors"
          >
            Access Dashboard
          </button>
        </form>
        
        <div className="mt-8 text-center">
            <button onClick={() => navigate('/')} className="text-xs text-primary-dark/40 hover:text-primary-dark underline">Return to Website</button>
        </div>
      </motion.div>
    </div>
  );
}
