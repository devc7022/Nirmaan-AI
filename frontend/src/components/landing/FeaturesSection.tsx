'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, CalendarCheck, Bot, FileSpreadsheet, MessageSquareCode, BarChart3, ShieldCheck, Sparkles, ArrowUpRight } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'Worker Management',
      description: 'Directory of all masons, helpers, electricians, and sub-contractors with skill tags, daily rates, and phone numbers.',
      icon: Users,
      badge: 'Core Directory',
      color: 'text-orange-400',
      bgGlow: 'group-hover:border-orange-500/50',
    },
    {
      title: 'Construction Site Management',
      description: 'Manage multiple active job sites simultaneously with geofencing boundaries, supervisor assignments, and site budgets.',
      icon: Building2,
      badge: 'Multi-Site',
      color: 'text-blue-400',
      bgGlow: 'group-hover:border-blue-500/50',
    },
    {
      title: 'Attendance Tracking',
      description: 'Record daily shifts, half-days, overtime, and leave entries with instant digital timestamps and history logs.',
      icon: CalendarCheck,
      badge: 'Real-Time',
      color: 'text-emerald-400',
      bgGlow: 'group-hover:border-emerald-500/50',
    },
    {
      title: 'AI Attendance',
      description: 'Speak or send voice messages like "Ramesh & Mohit worked 8 hrs at Metro site". AI auto-matches profiles and logs shifts.',
      icon: Bot,
      badge: 'Voice & Text AI',
      color: 'text-amber-400',
      bgGlow: 'group-hover:border-amber-500/50',
    },
    {
      title: 'AI Reports',
      description: 'Generate instant PDF & Excel payroll bills, weekly wage summaries, contractor invoice receipts, and compliance files.',
      icon: FileSpreadsheet,
      badge: '1-Click Export',
      color: 'text-rose-400',
      bgGlow: 'group-hover:border-rose-500/50',
    },
    {
      title: 'AI Assistant',
      description: 'Ask questions in natural Hindi or English: "How many masons are working at Site A today?" or "Calculate wage for Ramesh".',
      icon: MessageSquareCode,
      badge: 'Conversational',
      color: 'text-purple-400',
      bgGlow: 'group-hover:border-purple-500/50',
    },
    {
      title: 'Dashboard Analytics',
      description: 'Visual insights on daily attendance trends, labour cost breakdown per site, overtime spikes, and worker attendance ratios.',
      icon: BarChart3,
      badge: 'Visual Insights',
      color: 'text-indigo-400',
      bgGlow: 'group-hover:border-indigo-500/50',
    },
    {
      title: 'Secure Authentication',
      description: 'Enterprise-grade JWT authentication, role-based access control (Admin, Supervisor, Contractor), and encrypted storage.',
      icon: ShieldCheck,
      badge: 'Bank-Grade Security',
      color: 'text-teal-400',
      bgGlow: 'group-hover:border-teal-500/50',
    },
  ];

  return (
    <section id="features" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>Comprehensive Feature Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Everything You Need to Modernize Your{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              Site Operations
            </span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Designed specifically for field site execution, BumbleBrick AI equips site teams and owners with powerful digital tools.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`relative group rounded-2xl bg-zinc-900/90 border border-zinc-800 p-6 space-y-4 shadow-xl ${feature.bgGlow} transition-all duration-300 transform hover:-translate-y-1.5`}
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform shadow-inner`}>
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-zinc-950 text-zinc-300 border border-zinc-800">
                    {feature.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors flex items-center justify-between">
                    <span>{feature.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-orange-400 opacity-0 group-hover:opacity-100 transition-all" />
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {feature.description}
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
