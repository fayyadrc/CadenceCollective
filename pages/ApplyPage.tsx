import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

export default function ApplyPage() {
  const [formState, setFormState] = useState({
    name: '',
    age: '',
    email: '',
    reason: '',
    experience: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form Submitted:", formState);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-cream flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-5xl md:text-6xl font-bold text-primary-dark mb-4"
          >
            Join the Collective
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-dark/60 text-lg"
          >
            Take the first step towards mastering your craft and finding your community.
          </motion.p>
        </div>

        {isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/50 backdrop-blur-md border border-green-200 rounded-2xl p-12 text-center shadow-xl"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>
            <h3 className="font-heading text-3xl font-bold text-primary-dark mb-4">Application Sent!</h3>
            <p className="text-primary-dark/70 mb-8">Thank you for applying. We will review your details and get back to you shortly via email.</p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="text-accent font-bold underline decoration-2 underline-offset-4 hover:text-primary-dark transition-colors"
            >
              Submit another application
            </button>
          </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-8 md:p-12 shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-primary-dark/80">Full Name</label>
                <input 
                  required
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full bg-white/60 border border-white/40 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg px-4 py-3 outline-none transition-all"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="age" className="text-sm font-bold uppercase tracking-wider text-primary-dark/80">Age</label>
                <input 
                  required
                  type="number" 
                  id="age" 
                  name="age" 
                  value={formState.age}
                  onChange={handleChange}
                  className="w-full bg-white/60 border border-white/40 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg px-4 py-3 outline-none transition-all"
                  placeholder="16"
                />
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-primary-dark/80">Email Address</label>
              <input 
                required
                type="email" 
                id="email" 
                name="email" 
                value={formState.email}
                onChange={handleChange}
                className="w-full bg-white/60 border border-white/40 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg px-4 py-3 outline-none transition-all"
                placeholder="jane@example.com"
              />
            </div>

            <div className="space-y-2 mb-6">
              <label htmlFor="reason" className="text-sm font-bold uppercase tracking-wider text-primary-dark/80">Why do you want to join?</label>
              <textarea 
                required
                id="reason" 
                name="reason" 
                rows={3}
                value={formState.reason}
                onChange={handleChange}
                className="w-full bg-white/60 border border-white/40 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg px-4 py-3 outline-none transition-all resize-none"
                placeholder="Tell us about your motivation..."
              />
            </div>

            <div className="space-y-2 mb-8">
              <label htmlFor="experience" className="text-sm font-bold uppercase tracking-wider text-primary-dark/80">Musical Experience (Optional)</label>
              <textarea 
                id="experience" 
                name="experience" 
                rows={3}
                value={formState.experience}
                onChange={handleChange}
                className="w-full bg-white/60 border border-white/40 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg px-4 py-3 outline-none transition-all resize-none"
                placeholder="Instruments, vocals, previous lessons..."
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-primary-dark text-white font-bold py-4 rounded-lg hover:bg-accent transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Sending...</span>
              ) : (
                <>
                  Submit Application <Send size={18} />
                </>
              )}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}