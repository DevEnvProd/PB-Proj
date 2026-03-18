import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Share2, ArrowLeft, ChevronRight } from 'lucide-react';
import { Article } from '../types';

export const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/articles/${slug}`)
      .then(res => res.json())
      .then(data => {
        setArticle(data);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return <div className="h-screen flex items-center justify-center font-serif text-2xl italic">Loading strategy...</div>;
  if (!article) return <div className="h-screen flex items-center justify-center">Article not found.</div>;

  return (
    <div className="pt-20 pb-24">
      <article className="max-w-4xl mx-auto px-6">
        <header className="mb-12 text-center">
          <Link to="/articles" className="inline-flex items-center text-[10px] uppercase tracking-widest text-gray-500 hover:text-secondary-gold mb-8 transition-colors">
            <ArrowLeft size={12} className="mr-2" /> Back to Archives
          </Link>
          <div className="flex items-center justify-center space-x-4 mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-gold">
            <span>{article.category}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>{article.readTime} Read</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary-navy dark:text-white mb-8 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-3">
              <img src={article.author.avatar} alt={article.author.name} className="w-10 h-10 rounded-full grayscale" referrerPolicy="no-referrer" />
              <div className="text-left">
                <p className="text-sm font-bold dark:text-white">{article.author.name}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{article.author.role}</p>
              </div>
            </div>
            <div className="h-8 w-[1px] bg-gray-200"></div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Published {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </header>

        <div className="relative aspect-[21/9] mb-16 overflow-hidden">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>

        <div className="grid md:grid-cols-[1fr_200px] gap-16">
          <div className="markdown-body dark:text-gray-300">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>

          <aside className="hidden md:block">
            <div className="sticky top-32 space-y-12">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Share Strategy</h4>
                <div className="flex space-x-4">
                  <button className="p-2 border border-gray-100 hover:border-secondary-gold hover:text-secondary-gold transition-all"><Share2 size={16} /></button>
                </div>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Difficulty</h4>
                <span className="bg-primary-navy text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                  {article.difficulty}
                </span>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-24 pt-16 border-t border-gray-100">
          <h3 className="font-serif text-3xl font-bold mb-12">Related Intelligence</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Mock related articles */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-video bg-gray-100 mb-4 overflow-hidden">
                  <img src={`https://picsum.photos/seed/rel${i}/400/225`} alt="Related" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <h4 className="font-serif font-bold text-lg group-hover:text-secondary-gold transition-colors">Strategic Maneuvers in Competitive Markets</h4>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};
