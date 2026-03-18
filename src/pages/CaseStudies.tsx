import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CaseStudy } from '../types';

export const CaseStudies = () => {
  const [studies, setStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    fetch('/api/case-studies').then(res => res.json()).then(setStudies);
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 bg-bg-offwhite min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <span className="text-secondary-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Real World Analysis</span>
          <h1 className="text-6xl font-serif font-bold text-primary-navy mb-6">Strategic Case Studies</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Deep dives into famous strategic decisions and their outcomes across business, military, and competition.
          </p>
        </header>

        <div className="space-y-12">
          {studies.map((study, i) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white shadow-sm border border-gray-100 overflow-hidden grid md:grid-cols-2 group"
            >
              <div className="aspect-video md:aspect-auto overflow-hidden">
                <img src={study.image} alt={study.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="p-12 flex flex-col justify-center">
                <span className="text-secondary-gold text-[10px] font-bold uppercase tracking-widest mb-4 block">{study.industry}</span>
                <h3 className="text-4xl font-serif font-bold mb-6">{study.title}</h3>
                <div className="space-y-6 mb-10">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">The Challenge</h4>
                    <p className="text-sm text-gray-600">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Framework Applied</h4>
                    <p className="text-sm font-bold text-primary-navy">{study.framework}</p>
                  </div>
                </div>
                <button className="bg-primary-navy text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-secondary-gold transition-colors w-fit">
                  Read Full Analysis
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
