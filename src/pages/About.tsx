import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

export const About = () => {
  return (
    <div className="pt-32 pb-24 px-6 bg-bg-offwhite min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-secondary-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Our Mission</span>
            <h1 className="text-6xl font-serif font-bold text-primary-navy mb-8">Strategy. Decision. Mastery.</h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              The Playbook exists to help professionals, gamers, and thinkers make better decisions through proven frameworks and strategic thinking.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We believe that decision-making is a skill that can be studied, practiced, and mastered. By combining behavioral economics, game theory, and historical analysis, we provide the tools for intellectual dominance.
            </p>
          </motion.div>
          <div className="aspect-square bg-gray-200 relative overflow-hidden">
            <img src="https://picsum.photos/seed/library/800/800" alt="About" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 border-[20px] border-white/20"></div>
          </div>
        </div>

        <section className="mb-32">
          <h2 className="text-4xl font-serif font-bold mb-16 text-center">The Council</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { name: 'Alexander Vance', role: 'Chief Strategist', expertise: 'Game Theory' },
              { name: 'Elena Rossi', role: 'Research Lead', expertise: 'Behavioral Economics' },
              { name: 'Marcus Thorne', role: 'Risk Analyst', expertise: 'Risk Management' },
            ].map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="aspect-square bg-gray-100 mb-6 grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden">
                   <img src={`https://picsum.photos/seed/${member.name}/400/400`} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-1">{member.name}</h3>
                <p className="text-secondary-gold text-[10px] font-bold uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-gray-500 text-sm">Expertise: {member.expertise}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-primary-navy text-white p-16">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-8 text-secondary-gold">Contact The Council</h2>
              <p className="text-gray-400 mb-12">For partnership inquiries, strategic consulting, or editorial contributions.</p>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Mail className="text-secondary-gold" size={20} />
                  <span className="text-sm tracking-widest uppercase">intelligence@theplaybook.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="text-secondary-gold" size={20} />
                  <span className="text-sm tracking-widest uppercase">Zurich, Switzerland</span>
                </div>
              </div>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <input placeholder="NAME" className="bg-white/5 border border-white/10 px-6 py-4 text-xs font-bold uppercase tracking-widest focus:border-secondary-gold outline-none" />
                <input placeholder="EMAIL" className="bg-white/5 border border-white/10 px-6 py-4 text-xs font-bold uppercase tracking-widest focus:border-secondary-gold outline-none" />
              </div>
              <textarea placeholder="MESSAGE" rows={4} className="w-full bg-white/5 border border-white/10 px-6 py-4 text-xs font-bold uppercase tracking-widest focus:border-secondary-gold outline-none" />
              <button className="bg-secondary-gold text-white px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-primary-navy transition-all">Send Message</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};
