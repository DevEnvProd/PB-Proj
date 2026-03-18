import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArticleCard } from '../components/ArticleCard';
import { Article } from '../types';
import { CATEGORIES } from '../constants';
import { clsx } from 'clsx';

export const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/api/articles').then(res => res.json()).then(setArticles);
  }, []);

  const filteredArticles = filter === 'All' 
    ? articles 
    : articles.filter(a => a.category === filter);

  return (
    <div className="pt-32 pb-24 px-6 bg-bg-offwhite min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <span className="text-secondary-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">The Archive</span>
          <h1 className="text-6xl font-serif font-bold text-primary-navy mb-12">Strategic Intelligence</h1>
          
          <div className="flex flex-wrap gap-4 border-b border-gray-200 pb-8">
            <button
              onClick={() => setFilter('All')}
              className={clsx(
                "px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                filter === 'All' ? "bg-primary-navy text-white" : "text-gray-500 hover:text-primary-navy"
              )}
            >
              All
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.name}
                onClick={() => setFilter(cat.name)}
                className={clsx(
                  "px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                  filter === cat.name ? "bg-primary-navy text-white" : "text-gray-500 hover:text-primary-navy"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
