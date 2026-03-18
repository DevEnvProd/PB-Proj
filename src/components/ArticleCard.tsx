import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Bookmark } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`group bg-white dark:bg-primary-charcoal overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 ${
        featured ? 'grid md:grid-cols-2 gap-0' : 'flex flex-col'
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? 'h-full' : 'aspect-[16/9]'}`}>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-secondary-gold text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
            {article.category}
          </span>
        </div>
      </div>

      <div className="p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-4 mb-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
            <span className="flex items-center"><Clock size={12} className="mr-1" /> {article.readTime}</span>
            <span className="flex items-center"><BookOpen size={12} className="mr-1" /> {article.difficulty}</span>
          </div>
          <Link to={`/articles/${article.slug}`}>
            <h3 className={`font-serif font-bold text-primary-navy dark:text-white mb-4 group-hover:text-secondary-gold transition-colors ${
              featured ? 'text-4xl' : 'text-xl'
            }`}>
              {article.title}
            </h3>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
            {article.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <img src={article.author.avatar} alt={article.author.name} className="w-8 h-8 rounded-full grayscale" referrerPolicy="no-referrer" />
            <div className="flex flex-col">
              <span className="text-xs font-bold dark:text-white">{article.author.name}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-tighter">{article.author.role}</span>
            </div>
          </div>
          <button className="text-gray-400 hover:text-secondary-gold transition-colors">
            <Bookmark size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
