'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, CheckCircle2, Sparkles, ShieldCheck, Zap, Bot } from 'lucide-react';
import Link from 'next/link';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<'voice' | 'attendance' | 'payroll'>('voice');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/80">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  BuilMate AI Interactive Product Tour
                  <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    Live Interactive Demo
                  </span>
                </h3>
                <p className="text-xs text-zinc-400">See how site supervisors mark attendance 5x faster</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* Video Simulation Canvas */}
            <div className="relative rounded-xl border border-zinc-800 bg-black overflow-hidden aspect-video group shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-950/20 via-zinc-900 to-zinc-950 flex flex-col justify-between p-6">
                {/* Simulated UI overlay top */}
                <div className="flex items-center justify-between text-xs text-zinc-400 bg-zinc-900/80 backdrop-blur px-4 py-2 rounded-lg border border-zinc-800">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-mono text-zinc-200">Site: Metro Line 3 Corridor</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-orange-400" />
                    <span>AI Engine Active</span>
                  </div>
                </div>

                {/* Simulated playback graphic */}
                <div className="my-auto text-center space-y-4 max-w-md mx-auto">
                  {activeTab === 'voice' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                      <div className="w-16 h-16 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center mx-auto text-orange-400 shadow-lg shadow-orange-500/10">
                        <Zap className="w-8 h-8 animate-bounce" />
                      </div>
                      <div className="p-4 bg-zinc-900/90 rounded-xl border border-zinc-700/80 shadow-lg font-mono text-sm text-zinc-200">
                        &quot;Supervisor Aarav: 12 masons & 8 helpers completed full shift at Tower A today.&quot;
                      </div>
                      <div className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 20 Workers Parsed & Verified (0.4s)
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'attendance' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-left">
                        <div className="p-3 bg-zinc-900/90 rounded-lg border border-zinc-800">
                          <p className="text-xs text-zinc-400">Total Site Workforce</p>
                          <p className="text-xl font-bold text-white">148 Workers</p>
                        </div>
                        <div className="p-3 bg-zinc-900/90 rounded-lg border border-zinc-800">
                          <p className="text-xs text-zinc-400">Present Today</p>
                          <p className="text-xl font-bold text-emerald-400">142 Present (96%)</p>
                        </div>
                      </div>
                      <div className="text-xs text-zinc-400 bg-zinc-900/60 p-2 rounded border border-zinc-800">
                        ⚡ Real-time biometric & natural language cross-checking complete
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'payroll' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                      <div className="p-4 bg-zinc-900/90 rounded-xl border border-zinc-800 text-left space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">Estimated Today Daily Wage</span>
                          <span className="font-bold text-orange-400">₹64,200</span>
                        </div>
                        <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-orange-500 to-amber-400 h-full w-[85%] rounded-full" />
                        </div>
                        <p className="text-xs text-zinc-500">Overtime & skill bonuses calculated automatically</p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Bottom play bar */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center space-x-2 text-xs bg-zinc-900/90 hover:bg-zinc-800 text-white px-3 py-1.5 rounded-lg border border-zinc-700 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 text-orange-400" /> : <Play className="w-3.5 h-3.5 text-orange-400" />}
                    <span>{isPlaying ? 'Pause Simulation' : 'Play Demo'}</span>
                  </button>

                  {/* Tabs */}
                  <div className="flex space-x-1 bg-zinc-900/80 p-1 rounded-lg border border-zinc-800 text-xs">
                    <button
                      onClick={() => setActiveTab('voice')}
                      className={`px-3 py-1 rounded-md transition-colors ${
                        activeTab === 'voice' ? 'bg-orange-500 text-white font-medium' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Voice AI Entry
                    </button>
                    <button
                      onClick={() => setActiveTab('attendance')}
                      className={`px-3 py-1 rounded-md transition-colors ${
                        activeTab === 'attendance' ? 'bg-orange-500 text-white font-medium' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Attendance Board
                    </button>
                    <button
                      onClick={() => setActiveTab('payroll')}
                      className={`px-3 py-1 rounded-md transition-colors ${
                        activeTab === 'payroll' ? 'bg-orange-500 text-white font-medium' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Wage Calculation
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-800 space-y-1.5">
                <div className="flex items-center space-x-2 text-orange-400 text-sm font-semibold">
                  <Zap className="w-4 h-4" />
                  <span>Natural Language AI</span>
                </div>
                <p className="text-xs text-zinc-400">Speak or text in Hindi, English, or Hinglish. BuilMate AI parses workers and hours instantly.</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-800 space-y-1.5">
                <div className="flex items-center space-x-2 text-emerald-400 text-sm font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Zero Dispute Wage Audit</span>
                </div>
                <p className="text-xs text-zinc-400">Automated daily wages, overtime, and contractor payouts with total transparency.</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-800 space-y-1.5">
                <div className="flex items-center space-x-2 text-blue-400 text-sm font-semibold">
                  <Bot className="w-4 h-4" />
                  <span>Multi-Site Visibility</span>
                </div>
                <p className="text-xs text-zinc-400">Track all active sites and site supervisors from one high-level command center.</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 bg-zinc-900/90">
            <span className="text-xs text-zinc-400 hidden sm:inline">Ready to eliminate daily site paperwork?</span>
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-zinc-300 hover:text-white rounded-lg transition-colors"
              >
                Close
              </button>
              <Link
                href="/register"
                onClick={onClose}
                className="px-5 py-2 text-sm font-semibold rounded-lg bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 transition-all transform hover:scale-[1.02]"
              >
                Get Started Free →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
