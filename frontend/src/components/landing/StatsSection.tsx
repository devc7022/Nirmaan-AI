'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, CheckCircle2, Award, Headphones } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      value: '1,500+',
      label: 'Verified Workers',
      description: 'Skilled masons, painters, and site trades',
      icon: Users,
      color: 'text-orange-400',
    },
    {
      value: '300+',
      label: 'Construction Projects',
      description: 'Active residential, commercial & infra sites',
      icon: Building2,
      color: 'text-amber-400',
    },
    {
      value: '98%',
      label: 'Attendance Accuracy',
      description: 'AI-verified daily shift & wage logging',
      icon: CheckCircle2,
      color: 'text-emerald-400',
    },
    {
      value: '75+',
      label: 'Construction Companies',
      description: 'Trusted by leading contractors across India',
      icon: Award,
      color: 'text-blue-400',
    },
    {
      value: '24×7',
      label: 'Customer Support',
      description: 'Dedicated site onboarding & support',
      icon: Headphones,
      color: 'text-purple-400',
    },
  ];

  return (
    <section className="py-20 bg-zinc-950 border-t border-zinc-800/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-orange-600/15 via-amber-500/10 to-orange-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative rounded-2xl bg-zinc-900 border border-zinc-800 p-6 text-center space-y-3 shadow-xl hover:border-orange-500/40 transition-all duration-300 group"
              >
                <div className={`w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mx-auto ${item.color} group-hover:scale-110 transition-transform shadow-inner`}>
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>

                <div className="space-y-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans block group-hover:text-orange-400 transition-colors">
                    {item.value}
                  </span>
                  <h3 className="text-sm font-bold text-zinc-200">
                    {item.label}
                  </h3>
                  <p className="text-[11px] text-zinc-400 leading-snug">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
