import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';
import { Framework } from '../types';

export const Frameworks = () => {
  const [frameworks, setFrameworks] = useState<Framework[]>([]);

  useEffect(() => {
    fetch('/api/frameworks').then(res => res.json()).then(setFrameworks);
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 bg-bg-offwhite min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <span className="text-secondary-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Mental Models</span>
          <h1 className="text-6xl font-serif font-bold text-primary-navy mb-6">Frameworks Library</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            A curated collection of strategic frameworks and mental models to sharpen your thinking and improve your decision-making process.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {frameworks.map((fw, i) => (
            <motion.div
              key={fw.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="bg-secondary-gold/10 text-secondary-gold text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                  {fw.difficulty}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{fw.category}</span>
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4 group-hover:text-secondary-gold transition-colors">{fw.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 h-12 line-clamp-2">
                {fw.description}
              </p>
              <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-widest text-gray-400">By {fw.originator}</span>
                <button className="text-primary-navy hover:text-secondary-gold transition-colors flex items-center text-xs font-bold uppercase tracking-widest">
                  Learn More <ExternalLink size={14} className="ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
