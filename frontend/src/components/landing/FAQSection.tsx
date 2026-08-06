'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is BuilMate AI?',
      answer: 'BuilMate AI is an AI-powered construction workforce management platform designed specifically for contractors, construction firms, and site supervisors. It replaces physical muster books and manual spreadsheets with an intelligent AI assistant that parses natural voice/text updates into verified daily attendance, overtime, and payroll reports.',
    },
    {
      question: 'Who can use it?',
      answer: 'BuilMate AI is built for civil contractors, general contracting firms, real estate developers, site supervisors, site engineers, and labour suppliers. Roles can be configured for Admins (managing budgets & multi-site analytics), Supervisors (recording daily worker logs), and Contractors (tracking deployed manpower & wage receipts).',
    },
    {
      question: 'Is AI attendance accurate?',
      answer: 'Yes! BuilMate AI is trained on Hindi, English, and Hinglish construction terminology (such as "Mason", "Rajmistri", "Beldar", "Helper", "Overtime", "Half-Day"). The AI cross-references worker profiles and presents a structured preview with 99.8% confidence before saving, giving supervisors full 1-click verification authority.',
    },
    {
      question: 'How does reporting work?',
      answer: 'With one click, BuilMate AI generates instant PDF and Excel reports for daily attendance muster, weekly wage calculation, skill trade breakdowns, and contractor payout summaries. Reports can be exported directly or shared via WhatsApp and email.',
    },
    {
      question: 'Can it handle multiple construction sites simultaneously?',
      answer: 'Absolutely. BuilMate AI supports unlimited construction sites. Enterprise administrators can view live headcounts, active site cost charts, and supervisor submission status across all locations from a single central dashboard.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-zinc-950 border-t border-zinc-800/80 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
            <HelpCircle className="w-4 h-4 text-orange-400" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            Everything you need to know about setting up BuilMate AI on your construction sites.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'bg-zinc-900 border-orange-500/50 shadow-lg' : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between space-x-4 focus:outline-none"
                >
                  <span className="text-base font-bold text-white flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center text-xs font-mono">
                      Q{index + 1}
                    </span>
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-zinc-800 text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-orange-400 bg-orange-500/20' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-6 pb-6 pt-1 text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
