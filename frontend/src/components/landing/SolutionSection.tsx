'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, UserCheck, MessageSquareText, Cpu, CheckSquare, LayoutDashboard, FileText, ArrowRight, Sparkles } from 'lucide-react';

export const SolutionSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(2);

  const workflowSteps = [
    {
      id: 1,
      title: 'Supervisor',
      subtitle: 'On-site Supervisor',
      description: 'Supervisors simply speak or type natural voice note updates from the construction site ground.',
      icon: UserCheck,
      color: 'from-amber-500 to-orange-500',
      badge: 'Step 1',
    },
    {
      id: 2,
      title: 'Natural Language',
      subtitle: 'Voice & Text Input',
      description: 'Accepts unstructured inputs like "10 masons & 5 helpers worked overtime today at Metro Line 3".',
      icon: MessageSquareText,
      color: 'from-orange-500 to-amber-500',
      badge: 'Step 2',
    },
    {
      id: 3,
      title: 'AI Processing',
      subtitle: 'BuilMate LLM Engine',
      description: 'AI extracts worker names, skill categories, working hours, sites, and applies overtime logic instantly.',
      icon: Cpu,
      color: 'from-purple-500 to-pink-500',
      badge: 'Step 3',
    },
    {
      id: 4,
      title: 'Attendance',
      subtitle: 'Structured Record',
      description: 'Muster logs are verified with zero manual typing or duplicate registration.',
      icon: CheckSquare,
      color: 'from-blue-500 to-indigo-500',
      badge: 'Step 4',
    },
    {
      id: 5,
      title: 'Dashboard',
      subtitle: 'Real-Time Sync',
      description: 'HQ managers get instant live headcounts, active site metrics, and labour costs.',
      icon: LayoutDashboard,
      color: 'from-emerald-500 to-teal-500',
      badge: 'Step 5',
    },
    {
      id: 6,
      title: 'Reports',
      subtitle: 'Automated Payouts',
      description: 'Generate PDF/Excel payroll summaries, contractor wage bills, and compliance audit reports.',
      icon: FileText,
      color: 'from-amber-500 to-yellow-500',
      badge: 'Step 6',
    },
  ];

  return (
    <section className="py-24 bg-zinc-950 border-t border-zinc-800/80 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>AI-Driven Workforce Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Meet <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">BuilMate AI</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Our specialized construction AI engine turns informal site updates into structured attendance, accurate payroll, and real-time site intelligence.
          </p>
        </div>

        {/* Interactive Workflow Diagram Pipeline */}
        <div className="space-y-8">
          
          {/* Workflow Stepper Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {workflowSteps.map((step) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`relative p-4 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between group ${
                    isActive
                      ? 'bg-zinc-900 border-orange-500 shadow-xl shadow-orange-500/10 scale-105'
                      : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      isActive ? 'bg-orange-500 text-white' : 'bg-zinc-900 text-zinc-400'
                    }`}>
                      {step.badge}
                    </span>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-orange-400' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                  </div>

                  <div>
                    <h3 className={`text-sm font-bold ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-zinc-500 truncate">{step.subtitle}</p>
                  </div>

                  {/* Connecting Arrow for Desktop */}
                  {step.id < 6 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-4 h-4 text-zinc-700" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Step Showcase Detail Card */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              
              <div className="space-y-3 text-center sm:text-left flex-1">
                <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                  <Bot className="w-3.5 h-3.5" />
                  <span>Pipeline Step {activeStep} of 6</span>
                </div>

                <h3 className="text-2xl font-bold text-white">
                  {workflowSteps[activeStep - 1].title} – {workflowSteps[activeStep - 1].subtitle}
                </h3>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {workflowSteps[activeStep - 1].description}
                </p>

                <div className="pt-2 flex items-center justify-center sm:justify-start space-x-4">
                  {activeStep > 1 && (
                    <button
                      onClick={() => setActiveStep(activeStep - 1)}
                      className="px-4 py-1.5 text-xs font-medium text-zinc-400 hover:text-white bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                    >
                      ← Previous Step
                    </button>
                  )}
                  {activeStep < 6 && (
                    <button
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow transition-colors"
                    >
                      Next Step →
                    </button>
                  )}
                </div>
              </div>

              {/* Visual Graphic Element */}
              <div className="w-full sm:w-64 h-36 rounded-xl bg-zinc-950 border border-zinc-800 p-4 flex flex-col justify-center items-center text-center space-y-2 relative overflow-hidden shadow-inner">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-lg">
                  {React.createElement(workflowSteps[activeStep - 1].icon, { className: 'w-6 h-6' })}
                </div>
                <span className="text-xs font-bold text-zinc-200">
                  {workflowSteps[activeStep - 1].title} Active
                </span>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Latency: 0.12s
                </span>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
