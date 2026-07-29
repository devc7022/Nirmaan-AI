'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HardHat, Building2, UserCheck, Users2, ShieldCheck, CheckCircle } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const audiences = [
    {
      title: 'Contractors',
      description: 'Streamline daily labour logs, manage subcontractor wages, and eliminate double-booking.',
      icon: HardHat,
      badge: 'Labour Control',
      gradient: 'from-orange-500/10 via-amber-500/5 to-transparent',
      border: 'hover:border-orange-500/50',
      iconColor: 'text-orange-400',
    },
    {
      title: 'Construction Companies',
      description: 'Get centralized real-time multi-site workforce visibility, compliance logs, and cost analytics.',
      icon: Building2,
      badge: 'Enterprise OS',
      gradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
      border: 'hover:border-blue-500/50',
      iconColor: 'text-blue-400',
    },
    {
      title: 'Site Supervisors',
      description: 'Record attendance in 30 seconds via voice or simple WhatsApp-style Hindi text inputs.',
      icon: UserCheck,
      badge: '5x Faster Log',
      gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
      border: 'hover:border-emerald-500/50',
      iconColor: 'text-emerald-400',
    },
    {
      title: 'Labour Suppliers',
      description: 'Track deployed masons, helpers & skilled workers across client sites with automated payroll receipts.',
      icon: Users2,
      badge: 'Vendor Portal',
      gradient: 'from-amber-500/10 via-yellow-500/5 to-transparent',
      border: 'hover:border-amber-500/50',
      iconColor: 'text-amber-400',
    },
  ];

  return (
    <section className="py-16 bg-zinc-950 border-y border-zinc-800/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Tailored for the Indian Construction Industry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Built Specifically For
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            Engineered from ground up to serve the unique operational challenges of construction sites.
          </p>
        </div>

        {/* Audience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative group rounded-2xl bg-gradient-to-b ${item.gradient} bg-zinc-900/90 border border-zinc-800/80 p-6 space-y-4 shadow-xl ${item.border} transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center ${item.iconColor} group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-zinc-950 text-zinc-300 border border-zinc-800">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors flex items-center gap-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center text-[11px] font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                  <span>Ready out-of-the-box</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
