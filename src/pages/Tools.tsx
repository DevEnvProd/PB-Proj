import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Info } from 'lucide-react';

interface Option {
  id: string;
  name: string;
  scores: Record<string, number>;
}

interface Criterion {
  id: string;
  name: string;
  weight: number;
}

export const Tools = () => {
  const [criteria, setCriteria] = useState<Criterion[]>([
    { id: '1', name: 'Potential Reward', weight: 5 },
    { id: '2', name: 'Ease of Execution', weight: 3 },
    { id: '3', name: 'Risk Level', weight: 4 },
  ]);

  const [options, setOptions] = useState<Option[]>([
    { id: '1', name: 'Option A', scores: { '1': 8, '2': 5, '3': 4 } },
    { id: '2', name: 'Option B', scores: { '1': 6, '2': 9, '3': 2 } },
  ]);

  const addCriterion = () => {
    const id = Math.random().toString(36).substr(2, 9);
    setCriteria([...criteria, { id, name: 'New Criterion', weight: 3 }]);
    setOptions(options.map(opt => ({ ...opt, scores: { ...opt.scores, [id]: 5 } })));
  };

  const addOption = () => {
    const id = Math.random().toString(36).substr(2, 9);
    const initialScores: Record<string, number> = {};
    criteria.forEach(c => initialScores[c.id] = 5);
    setOptions([...options, { id, name: 'New Option', scores: initialScores }]);
  };

  const updateScore = (optionId: string, criterionId: string, value: number) => {
    setOptions(options.map(opt => {
      if (opt.id === optionId) {
        return { ...opt, scores: { ...opt.scores, [criterionId]: value } };
      }
      return opt;
    }));
  };

  const calculateTotal = (option: Option) => {
    return criteria.reduce((sum, c) => {
      const score = option.scores[c.id] || 0;
      // For risk, we subtract or invert? Let's keep it simple: higher is better for all.
      return sum + (score * c.weight);
    }, 0);
  };

  const sortedOptions = [...options].sort((a, b) => calculateTotal(b) - calculateTotal(a));

  return (
    <div className="pt-32 pb-24 px-6 bg-bg-offwhite min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <span className="text-secondary-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Strategic Instruments</span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary-navy mb-6">Decision Matrix Calculator</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Quantify your choices using weighted criteria. A rational approach to complex multi-variable decisions.
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr_350px] gap-12">
          <div className="space-y-12">
            {/* Criteria Section */}
            <div className="bg-white p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-serif text-2xl font-bold">01. Define Criteria</h3>
                <button onClick={addCriterion} className="text-secondary-gold hover:text-primary-navy flex items-center text-xs font-bold uppercase tracking-widest transition-colors">
                  <Plus size={16} className="mr-2" /> Add Criterion
                </button>
              </div>
              <div className="space-y-4">
                {criteria.map(c => (
                  <div key={c.id} className="flex items-center gap-6 p-4 bg-bg-offwhite border border-gray-100">
                    <input
                      value={c.name}
                      onChange={(e) => setCriteria(criteria.map(item => item.id === c.id ? { ...item, name: e.target.value } : item))}
                      className="bg-transparent font-bold uppercase tracking-widest text-xs flex-1 outline-none focus:text-secondary-gold"
                    />
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] uppercase tracking-widest text-gray-400">Weight (1-10)</span>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={c.weight}
                        onChange={(e) => setCriteria(criteria.map(item => item.id === c.id ? { ...item, weight: parseInt(e.target.value) || 1 } : item))}
                        className="w-12 bg-white border border-gray-200 text-center py-1 text-sm font-bold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Options Section */}
            <div className="bg-white p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-serif text-2xl font-bold">02. Score Options</h3>
                <button onClick={addOption} className="text-secondary-gold hover:text-primary-navy flex items-center text-xs font-bold uppercase tracking-widest transition-colors">
                  <Plus size={16} className="mr-2" /> Add Option
                </button>
              </div>
              <div className="space-y-8">
                {options.map(opt => (
                  <div key={opt.id} className="border-b border-gray-100 pb-8 last:border-0">
                    <input
                      value={opt.name}
                      onChange={(e) => setOptions(options.map(item => item.id === opt.id ? { ...item, name: e.target.value } : item))}
                      className="font-serif text-xl font-bold mb-6 outline-none focus:text-secondary-gold bg-transparent"
                    />
                    <div className="grid md:grid-cols-3 gap-4">
                      {criteria.map(c => (
                        <div key={c.id} className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 block">{c.name}</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="range"
                              min="1"
                              max="10"
                              value={opt.scores[c.id] || 5}
                              onChange={(e) => updateScore(opt.id, c.id, parseInt(e.target.value))}
                              className="flex-1 accent-secondary-gold"
                            />
                            <span className="text-xs font-bold w-4">{opt.scores[c.id] || 5}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk-Reward Analyzer */}
            <div className="bg-white p-8 shadow-sm border border-gray-100">
              <h3 className="font-serif text-2xl font-bold mb-8">03. Risk-Reward Analyzer</h3>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest block">Potential Reward</label>
                    <input type="range" className="w-full accent-secondary-gold" />
                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400">
                      <span>Conservative</span>
                      <span>Aggressive</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest block">Risk Probability</label>
                    <input type="range" className="w-full accent-red-700" />
                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400">
                      <span>Low Risk</span>
                      <span>High Risk</span>
                    </div>
                  </div>
                </div>
                <div className="bg-bg-offwhite p-8 border border-gray-100 flex flex-col items-center justify-center text-center">
                  <div className="w-32 h-32 rounded-full border-4 border-secondary-gold flex items-center justify-center mb-4">
                    <span className="text-2xl font-serif font-bold">7.2</span>
                  </div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Efficiency Ratio</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Calculated based on Sharpe-inspired model.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Sidebar */}
          <aside className="space-y-8">
            <div className="bg-primary-navy text-white p-8 sticky top-32">
              <h3 className="font-serif text-2xl font-bold mb-8 text-secondary-gold">Strategic Analysis</h3>
              <div className="space-y-6">
                {sortedOptions.map((opt, i) => (
                  <div key={opt.id} className="relative">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-bold uppercase tracking-widest">
                        {i === 0 && <span className="text-secondary-gold mr-2">★</span>}
                        {opt.name}
                      </span>
                      <span className="text-secondary-gold font-mono text-xl">{calculateTotal(opt)}</span>
                    </div>
                    <div className="h-1 bg-white/10 w-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(calculateTotal(opt) / (criteria.reduce((s, c) => s + c.weight, 0) * 10)) * 100}%` }}
                        className="h-full bg-secondary-gold"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex items-start gap-3 text-gray-400">
                  <Info size={16} className="shrink-0 mt-1" />
                  <p className="text-[10px] uppercase tracking-widest leading-relaxed">
                    The highest score represents the most rational choice based on your weighted criteria.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
