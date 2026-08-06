'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  HardHat,
  Building2,
  Building,
  Compass,
  Palette,
  Landmark,
  ShieldCheck,
  Briefcase,
  Users,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const WhoWeServe: React.FC = () => {
  const clients = [
    {
      title: 'Contractors',
      description: 'Civil, electrical, plumbing, and finishing sub-contractors managing multi-site daily labour.',
      icon: HardHat,
      badge: 'Sub-Contractors',
      color: 'text-orange-400',
    },
    {
      title: 'Construction Companies',
      description: 'General contracting firms scaling project execution with automated attendance and wage tracking.',
      icon: Building2,
      badge: 'General Contractors',
      color: 'text-blue-400',
    },
    {
      title: 'Builders',
      description: 'Residential & commercial property developers ensuring zero delay and project cost control.',
      icon: Building,
      badge: 'Developers',
      color: 'text-amber-400',
    },
    {
      title: 'Architects',
      description: 'Design leaders keeping track of field trade execution quality and labor allocation timelines.',
      icon: Compass,
      badge: 'Design Leads',
      color: 'text-emerald-400',
    },
    {
      title: 'Interior Designers',
      description: 'Turnkey interior specialists hiring painters, POP experts, electricians, and carpenters on demand.',
      icon: Palette,
      badge: 'Interior Firms',
      color: 'text-purple-400',
    },
    {
      title: 'Infrastructure Projects',
      description: 'Highways, metro corridors, flyovers, and bridge projects managing heavy manpower deployments.',
      icon: Landmark,
      badge: 'Infra & Transit',
      color: 'text-rose-400',
    },
    {
      title: 'Government Contractors',
      description: 'Public works department (PWD) & municipal contractors requiring strict audit logs & muster rolls.',
      icon: ShieldCheck,
      badge: 'Public Works',
      color: 'text-teal-400',
    },
    {
      title: 'Real Estate Developers',
      description: 'Township & commercial real estate groups managing centralized workforce analytics across states.',
      icon: Briefcase,
      badge: 'Real Estate',
      color: 'text-indigo-400',
    },
  ];

  return (
    <section id="who-we-serve" className="py-24 bg-zinc-950 border-t border-zinc-800/80 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
            <Users className="w-4 h-4 text-orange-400" />
            <span>Target Industry Sectors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Built for Every <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">Construction Business</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Tailored digital workflows for independent civil contractors, large infrastructure firms, and real estate developers alike.
          </p>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clients.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative group rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-4 shadow-xl hover:border-orange-500/40 transition-all duration-300 transform hover:-translate-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform shadow-inner`}>
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-zinc-950 text-zinc-300 border border-zinc-800">
                    {item.badge}
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

                <div className="pt-2 flex items-center justify-between text-[11px] font-medium text-emerald-400 border-t border-zinc-800/80">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Tailored Solution
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
