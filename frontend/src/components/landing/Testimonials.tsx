'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Building2, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Rajesh Sharma',
      role: 'Chief Project Manager',
      company: 'Apex Infrastructure Ltd.',
      site: 'Metro Line 3 Corridor Project',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      content: 'Nirmaan AI completely transformed our site attendance logging. Our supervisors speak updates in Hindi, and wages get calculated with zero disputes. We saved ₹4.2 Lakhs in payroll leakages within 2 months.',
      stars: 5,
    },
    {
      name: 'Vikram Choudhary',
      role: 'Class-1 Civil Contractor',
      company: 'Vanguard Builders & Developers',
      site: 'High-Rise Commercial Tower B',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      content: 'Managing 300+ masons across 4 sites used to be a daily headache. Nirmaan AI gives me real-time headcounts at 9 AM directly on my mobile screen. Essential tool for every Indian contractor.',
      stars: 5,
    },
    {
      name: 'Suresh Kumar',
      role: 'Senior Site Engineer',
      company: 'National Highway Infra',
      site: 'Expressway Flyover Project',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
      content: 'The AI natural language processing is unbelievable! It accurately recognizes Hindi mason terms, half-shifts, and overtime. Our weekly wage payout prep time dropped from 8 hours to 10 minutes.',
      stars: 5,
    },
  ];

  return (
    <section className="py-24 bg-zinc-950 border-t border-zinc-800/80 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
            <Quote className="w-4 h-4 text-amber-400" />
            <span>Trusted By Construction Leaders</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            What Site Leaders Say About{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              Nirmaan AI
            </span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Read how project managers and contractors across India are modernizing site attendance and payroll.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.12 }}
              className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between space-y-6 shadow-xl hover:border-amber-500/40 transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Star Rating & Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-medium text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-800/50 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Client
                  </span>
                </div>

                {/* Quote Content */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                  &quot;{t.content}&quot;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-zinc-800 flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-zinc-800 border border-amber-500/30 overflow-hidden flex-shrink-0">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-0.5 overflow-hidden">
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-zinc-400 truncate">{t.role}</p>
                  <p className="text-[10px] text-zinc-500 truncate flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-amber-500" />
                    <span>{t.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
