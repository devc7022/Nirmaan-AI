'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileSpreadsheet, ClipboardList, Clock, EyeOff, AlertTriangle, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const painPoints = [
    {
      title: 'Manual Attendance Registers',
      description: 'Physical muster rolls get damaged, misplaced, or manipulated on busy sites, creating ghost worker disputes.',
      icon: ClipboardList,
      color: 'text-red-400',
      stat: '15-20% leakage',
    },
    {
      title: 'Excel Spreadsheets',
      description: 'Supervisors spend hours copying scribbled notes into messy Excel sheets at the end of exhausting 12-hour shifts.',
      icon: FileSpreadsheet,
      color: 'text-amber-400',
      stat: '2+ hrs wasted daily',
    },
    {
      title: 'Delayed Wage Calculations',
      description: 'Manual overtime calculations and contractor tallying delay weekly payouts, leading to labour strikes & high turnover.',
      icon: Clock,
      color: 'text-orange-400',
      stat: '3-5 days delay',
    },
    {
      title: 'No Real-time Visibility',
      description: 'Project managers have zero visibility into actual site strength until end-of-day reports, causing site slowdowns.',
      icon: EyeOff,
      color: 'text-rose-400',
      stat: 'Blindspot on sites',
    },
  ];

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-red-400 bg-red-500/10 px-3.5 py-1.5 rounded-full border border-red-500/20">
            <AlertTriangle className="w-4 h-4" />
            <span>The Old Construction Reality</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Construction Workforce Management is{' '}
            <span className="bg-gradient-to-r from-red-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">
              Broken
            </span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Legacy paper logs and manual spreadsheets waste supervisor energy, cause payroll disputes, and bleed construction profits every single day.
          </p>
        </div>

        {/* 4 Pain Point Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 space-y-4 hover:border-red-500/40 transition-all duration-300 group shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center ${point.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                    {point.stat}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Old vs New Comparison Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl" />
          
          <h3 className="text-center text-lg font-bold text-white mb-6">
            Contrast: The Traditional Way vs. The BuilMate AI Standard
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            
            {/* The Old Way */}
            <div className="p-5 rounded-xl bg-red-950/20 border border-red-900/30 space-y-3">
              <div className="flex items-center space-x-2 text-red-400 font-bold text-sm border-b border-red-900/40 pb-2">
                <XCircle className="w-4 h-4" />
                <span>The Traditional Way</span>
              </div>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span> Paper register torn or water-damaged on active sites
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span> Manual tallying leads to overpaying ghost workers
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span> End-of-week payroll calculations take 8+ hours
                </li>
              </ul>
            </div>

            {/* The BuilMate AI Way */}
            <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm border-b border-emerald-900/40 pb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>The BuilMate AI Standard</span>
              </div>
              <ul className="space-y-2 text-xs text-zinc-200">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> Instant voice/text entry in plain Hindi or English
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> Automated AI verification with zero double entries
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> Instant 1-click wage, site cost, & attendance reports
                </li>
              </ul>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
