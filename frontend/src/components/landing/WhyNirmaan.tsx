'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, TrendingUp, DollarSign, Cpu, CheckCircle2, Award } from 'lucide-react';

export const WhyNirmaan: React.FC = () => {
  const benefits = [
    {
      title: 'Reduce Paperwork by 85%',
      description: 'Eliminate physical register notebooks, muster rolls, and lost paper logs on dusty construction sites.',
      icon: ShieldCheck,
      metric: '85% Less',
      color: 'text-orange-400',
    },
    {
      title: 'Save Supervisor Time',
      description: 'Site supervisors save 2+ hours every day, allowing them to focus on quality control and site safety.',
      icon: Zap,
      metric: '2+ Hrs Daily',
      color: 'text-amber-400',
    },
    {
      title: 'Improve Workforce Visibility',
      description: 'Real-time multi-site headcount tracking from any smartphone or HQ desktop screen.',
      icon: TrendingUp,
      metric: '100% Live',
      color: 'text-emerald-400',
    },
    {
      title: 'Reduce Payroll Errors',
      description: 'Automated wage calculation ensures zero overpayment, ghost worker inflation, or overtime disputes.',
      icon: DollarSign,
      metric: '0 Disputes',
      color: 'text-blue-400',
    },
    {
      title: 'AI-Powered Automation',
      description: 'Natural language parsing algorithms tailored specifically to Indian construction language terms & accents.',
      icon: Cpu,
      metric: '99.8% Accuracy',
      color: 'text-purple-400',
    },
  ];

  return (
    <section id="why-nirmaan" className="py-24 bg-zinc-950 border-t border-zinc-800/80 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
            <Award className="w-4 h-4 text-orange-400" />
            <span>Proven Construction ROI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Why Choose <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">Nirmaan AI</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Delivering direct cost savings, operational speed, and payroll accuracy across residential, commercial, and infrastructure sites.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative rounded-2xl bg-zinc-900/90 border border-zinc-800 p-6 space-y-4 shadow-xl hover:border-orange-500/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform shadow-inner`}>
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {item.metric}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center text-[11px] font-medium text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                  <span>Verified Field Metric</span>
                </div>
              </motion.div>
            );
          })}

          {/* Special Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="relative rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 p-6 text-white space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-black/20 text-white">
                Guaranteed Impact
              </span>
              <h3 className="text-xl font-black leading-tight pt-2">
                Pays for Itself in 14 Days
              </h3>
              <p className="text-xs text-orange-100 leading-relaxed">
                By eliminating ghost workers and supervisor manual entry hours, Nirmaan AI recovers its total subscription cost within your first 2 weeks.
              </p>
            </div>

            <div className="pt-4 border-t border-white/20 flex items-center justify-between text-xs font-bold">
              <span>Zero Risk Trial</span>
              <span>100% Onboarding Support →</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
