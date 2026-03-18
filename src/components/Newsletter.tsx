import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error(error);
      setStatus('idle');
    }
  };

  return (
    <section className="bg-primary-charcoal py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary-gold/20 via-transparent to-transparent"></div>
      </div>
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <span className="text-secondary-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Intelligence Briefing</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Get The Playbook Weekly</h2>
        <p className="text-gray-400 text-lg mb-10">
          Advanced strategy insights, mental models, and decision frameworks delivered to your inbox every Sunday.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your professional email"
            required
            className="flex-1 bg-white/5 border border-white/10 text-white px-6 py-4 focus:outline-none focus:border-secondary-gold transition-colors font-sans"
          />
          <button
            type="submit"
            disabled={status !== 'idle'}
            className="bg-secondary-gold hover:bg-white hover:text-primary-charcoal text-white px-10 py-4 font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center disabled:opacity-50"
          >
            {status === 'loading' ? 'Processing...' : status === 'success' ? 'Subscribed' : (
              <>Subscribe <Send size={16} className="ml-2" /></>
            )}
          </button>
        </form>
        <p className="mt-6 text-[10px] text-gray-500 uppercase tracking-widest">
          No spam. Only strategy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};
