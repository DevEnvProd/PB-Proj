import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, NAV_LINKS } from '../constants';

export const Footer = () => {
  return (
    <footer className="bg-primary-navy text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex flex-col mb-6">
            <span className="text-2xl font-serif font-bold tracking-tighter text-white">
              THE PLAYBOOK
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-secondary-gold font-medium">
              Strategy. Decision. Mastery.
            </span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            The definitive resource for high-stakes decision making, game theory, and strategic mastery.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-lg font-bold mb-6 text-secondary-gold">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            {NAV_LINKS.map(link => (
              <li key={link.name}>
                <Link to={link.path} className="hover:text-white transition-colors">{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg font-bold mb-6 text-secondary-gold">Categories</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            {CATEGORIES.map(cat => (
              <li key={cat.name}>
                <Link to={`/articles?category=${cat.name}`} className="hover:text-white transition-colors">{cat.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg font-bold mb-6 text-secondary-gold">Legal</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li className="pt-4 text-[10px] uppercase tracking-widest opacity-50">
              18+ Content. Strategy involves risk.
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:row justify-between items-center text-[10px] uppercase tracking-widest text-gray-500">
        <p>© 2024 THE PLAYBOOK. ALL RIGHTS RESERVED.</p>
        <p>DESIGNED FOR STRATEGISTS.</p>
      </div>
    </footer>
  );
};
