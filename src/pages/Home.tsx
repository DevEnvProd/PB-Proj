import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { ArticleCard } from '../components/ArticleCard';
import { Newsletter } from '../components/Newsletter';
import { Article } from '../types';
import { CATEGORIES } from '../constants';

export const Home = () => {
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('/api/articles/featured').then(res => res.json()).then(setFeaturedArticle);
    fetch('/api/articles').then(res => res.json()).then(setRecentArticles);
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center px-6 overflow-hidden bg-primary-navy">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary-gold/30 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-secondary-gold text-xs font-bold uppercase tracking-[0.4em] mb-6 block">The Definitive Resource</span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white leading-[0.9] mb-8">
              Master the Art of Strategic <span className="text-secondary-gold italic">Decision-Making</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-lg mb-10 leading-relaxed">
              Game theory, risk analysis, and mental models for high-stakes choices in business, life, and competition.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/articles" className="bg-secondary-gold text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-primary-navy transition-all duration-300">
                Explore Strategies
              </Link>
              <Link to="/frameworks" className="border border-white/20 text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-300">
                Decision Library
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden md:block relative"
          >
            <div className="aspect-square bg-white/5 border border-white/10 rounded-full flex items-center justify-center p-12 relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/chess/800/800')] opacity-40 mix-blend-overlay"></div>
               <div className="text-secondary-gold opacity-20 absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <span className="text-[30rem] font-serif">♟</span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-secondary-gold text-[10px] font-bold uppercase tracking-widest mb-2 block">Taxonomy of Thought</span>
              <h2 className="text-4xl font-serif font-bold">Strategic Domains</h2>
            </div>
            <Link to="/articles" className="text-sm font-bold uppercase tracking-widest flex items-center hover:text-secondary-gold transition-colors">
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-bg-offwhite p-8 aspect-square flex flex-col justify-between hover:bg-primary-navy hover:text-white transition-all duration-500 border border-gray-100">
                  <span className={`w-8 h-1 ${cat.color} mb-4`}></span>
                  <h3 className="text-sm font-bold uppercase tracking-widest leading-tight">{cat.name}</h3>
                  <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-24 px-6 bg-bg-offwhite">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-secondary-gold text-[10px] font-bold uppercase tracking-widest mb-2 block">Deep Dive</span>
            <h2 className="text-4xl font-serif font-bold">The Featured Play</h2>
          </div>
          {featuredArticle && <ArticleCard article={featuredArticle} featured />}
        </div>
      </section>

      {/* Strategy Matrix Section */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-secondary-gold text-[10px] font-bold uppercase tracking-widest mb-2 block">Decision Matrix</span>
            <h2 className="text-5xl font-serif font-bold mb-8">The Strategic Quadrant</h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              Understand where your current situation sits on the risk-complexity spectrum. Our proprietary matrix helps you choose the right framework for the right moment.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start">
                <span className="w-6 h-6 rounded-full bg-secondary-gold/10 text-secondary-gold flex items-center justify-center text-xs font-bold mr-4 mt-1">01</span>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-1">High Risk / Low Complexity</h4>
                  <p className="text-gray-500 text-sm">Focus on insurance and mitigation strategies.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 rounded-full bg-secondary-gold/10 text-secondary-gold flex items-center justify-center text-xs font-bold mr-4 mt-1">02</span>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-1">High Risk / High Complexity</h4>
                  <p className="text-gray-500 text-sm">Requires deep game theory and scenario planning.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="relative aspect-square">
            <div className="absolute inset-0 border-2 border-gray-100 grid grid-cols-2 grid-rows-2">
              <div className="border-r border-b border-gray-100 p-8 flex flex-col justify-center items-center text-center group hover:bg-secondary-gold/5 transition-colors">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Tactical</span>
                <h4 className="font-serif text-xl font-bold">Execution</h4>
              </div>
              <div className="border-b border-gray-100 p-8 flex flex-col justify-center items-center text-center group hover:bg-secondary-gold/5 transition-colors">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Strategic</span>
                <h4 className="font-serif text-xl font-bold">Vision</h4>
              </div>
              <div className="border-r border-gray-100 p-8 flex flex-col justify-center items-center text-center group hover:bg-secondary-gold/5 transition-colors">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Reactive</span>
                <h4 className="font-serif text-xl font-bold">Defense</h4>
              </div>
              <div className="p-8 flex flex-col justify-center items-center text-center group hover:bg-secondary-gold/5 transition-colors">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Proactive</span>
                <h4 className="font-serif text-xl font-bold">Offense</h4>
              </div>
            </div>
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-secondary-gold/30"></div>
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-secondary-gold/30"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-secondary-gold rounded-full shadow-[0_0_20px_rgba(201,169,89,0.5)]"></div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
};
