'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap, Bot, Users, Building, TrendingUp } from 'lucide-react';

interface HeroProps {
  onOpenDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemo }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-zinc-950">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-orange-600/20 via-amber-500/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b15_1px,transparent_1px),linear-gradient(to_bottom,#18181b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-orange-500/30 text-orange-400 text-xs font-medium shadow-md shadow-orange-500/5 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              <span>Next-Gen Construction AI Assistant</span>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
              <span className="text-zinc-400 font-normal">V2.0 Live</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              AI-Powered Construction{' '}
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                Workforce Management
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Replace paperwork, spreadsheets, and manual attendance with an AI assistant built specifically for construction companies, contractors, and site supervisors.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base shadow-xl shadow-orange-500/25 flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              <button
                onClick={onOpenDemo}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-semibold text-base border border-zinc-800 shadow-md flex items-center justify-center space-x-2.5 transition-all group"
              >
                <div className="w-7 h-7 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Key Value Micro-Badges */}
            <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-3 text-left">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-xs font-medium text-zinc-300">99.8% Wage Accuracy</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-xs font-medium text-zinc-300">5x Faster Attendance</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-xs font-medium text-zinc-300">Zero Paper Register</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Interactive Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            {/* Outer Glow frame */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500" />
            
            <div className="relative rounded-2xl bg-zinc-900 border border-zinc-800 p-5 shadow-2xl space-y-4">
              
              {/* Top Dashboard Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-zinc-400 ml-2">builmate-ai // site-commander</span>
                </div>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Live AI Processing
                </span>
              </div>

              {/* Floating AI Voice/Text Entry Card */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-orange-500/30 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-zinc-200">Natural Language Attendance Intake</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">Hindi / English Supported</span>
                </div>

                <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 text-xs font-mono text-amber-300/90 leading-relaxed shadow-inner">
                  &quot;Ramesh and Mohit worked 8 hours today at Metro Site Tower B.&quot;
                </div>

                {/* Animated Output Card */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/50 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> AI Extraction Result
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                      Confidence: 99.4%
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-zinc-900/80 p-2 rounded border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 block">Workers Recognized</span>
                      <span className="font-bold text-white">Ramesh, Mohit (2)</span>
                    </div>
                    <div className="bg-zinc-900/80 p-2 rounded border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 block">Hours & Site</span>
                      <span className="font-bold text-amber-400">8 hrs @ Metro Site</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Quick Mini Metric Cards */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-center">
                  <Users className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                  <p className="text-[10px] text-zinc-400">Active Workers</p>
                  <p className="text-base font-extrabold text-white">1,420+</p>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-center">
                  <Building className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <p className="text-[10px] text-zinc-400">Sites Monitored</p>
                  <p className="text-base font-extrabold text-white">48 Sites</p>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-center">
                  <TrendingUp className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <p className="text-[10px] text-zinc-400">Hours Saved/Mo</p>
                  <p className="text-base font-extrabold text-white">350+ hrs</p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
