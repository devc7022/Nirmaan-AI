'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building, UserPlus, Mic, FileCheck, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Register Construction Site',
      description: 'Create your construction job sites with site names, locations, geofencing coordinates, and supervisor assignments in under 60 seconds.',
      icon: Building,
      badge: 'Setup',
      detail: 'Supports multi-site project hierarchies',
    },
    {
      step: '02',
      title: 'Add Workers',
      description: 'Add masons, helpers, bar benders, and sub-contractors with skill types, daily wage rates, emergency contacts, and ID proofs.',
      icon: UserPlus,
      badge: 'Roster',
      detail: 'Bulk CSV import or quick phone app onboarding',
    },
    {
      step: '03',
      title: 'Record Attendance using AI',
      description: 'Supervisors simply dictate or type natural updates like "12 masons worked full shift at Metro Site today". AI automatically logs shifts.',
      icon: Mic,
      badge: 'AI Intake',
      detail: 'Voice, text, and biometric photo check-in options',
    },
    {
      step: '04',
      title: 'Generate Reports',
      description: 'Click one button to compute weekly payouts, overtime breakdowns, GST contractor invoices, and PDF site audit logs.',
      icon: FileCheck,
      badge: 'Payouts',
      detail: 'Export to Excel, PDF, or accounting ERPs',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-zinc-950 border-t border-zinc-800/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
            <span>Simple 4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How BumbleBrick Works in{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              4 Easy Steps
            </span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            No training required for site staff. From sign-up to your first automated payroll report in 10 minutes.
          </p>
        </div>

        {/* Timeline Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">

          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.12 }}
                className="relative rounded-2xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 group shadow-xl"
              >
                {/* Step Number Watermark & Icon */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-extrabold font-mono text-zinc-800 group-hover:text-amber-500/40 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shadow-inner">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer Detail */}
                <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center text-[11px] font-medium text-zinc-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2 flex-shrink-0" />
                  <span>{item.detail}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
