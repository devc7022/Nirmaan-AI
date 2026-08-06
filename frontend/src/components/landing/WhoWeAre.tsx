'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShieldCheck, Clock, Cpu, CheckCircle2, Sparkles } from 'lucide-react';

export const WhoWeAre: React.FC = () => {
  const highlights = [
    {
      title: 'Verified Workers',
      description: 'Only experienced and verified workers for your job site.',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      badge: '100% Vetted',
    },
    {
      title: 'Fast Booking',
      description: 'Book skilled construction workers in minutes.',
      icon: Clock,
      color: 'text-amber-400',
      badge: 'Instant',
    },
    {
      title: 'AI Workforce Management',
      description: 'Automated attendance, live monitoring and instant reporting.',
      icon: Cpu,
      color: 'text-orange-400',
      badge: 'AI Powered',
    },
  ];

  return (
    <section id="who-we-are" className="py-24 bg-zinc-950 border-t border-zinc-800/80 relative overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>Who We Are</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              India&apos;s Modern Workforce Platform{' '}
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                Built for Construction
              </span>
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              BuilMate connects contractors, builders, architects, site supervisors, and skilled labour through one intelligent workforce platform.
            </p>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Whether it&apos;s hiring civil labour, painters, tile masons, POP experts, or managing site attendance with AI, BuilMate simplifies construction workforce management from hiring to reporting.
            </p>

            {/* 3 Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 hover:border-orange-500/40 transition-all duration-300 group shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5 stroke-[2]" />
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        {item.badge}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item.title}</span>
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Logo & Construction Graphic Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500" />
            
            <div className="relative rounded-3xl bg-zinc-900 border border-zinc-800 p-8 shadow-2xl space-y-6 text-center overflow-hidden">
              <div className="w-32 h-32 mx-auto relative flex items-center justify-center">
                <Image
                  src="/images/builmate_logo_hd.png"
                  alt="BuilMate AI Logo"
                  width={120}
                  height={120}
                  className="object-contain drop-shadow-[0_10px_20px_rgba(249,115,22,0.3)]"
                  unoptimized
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">BuilMate Operating System</h3>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
                  Unifying field operations, multi-site deployments, and skilled trade allocation into a single digital platform.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-left text-xs border-t border-zinc-800/80">
                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                  <span className="text-zinc-400 text-[10px] block font-mono">PAN-INDIA</span>
                  <span className="font-bold text-white">Multi-Site Active</span>
                </div>
                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                  <span className="text-zinc-400 text-[10px] block font-mono">SUPPORTED TRADES</span>
                  <span className="font-bold text-amber-400">13+ Skill Categories</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
