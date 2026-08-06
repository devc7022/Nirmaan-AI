'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, Send, CheckCircle2, RefreshCw, Zap, Save, Check } from 'lucide-react';

export const AIDemo: React.FC = () => {
  const samplePrompts = [
    "Ramesh and Mohit worked 8 hours today at Metro Site.",
    "5 masons & 8 helpers completed full shift at Tower B with 2 hrs overtime.",
    "Suresh worked half day at Highway Bridge site.",
  ];

  const [inputQuery, setInputQuery] = useState(samplePrompts[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Simulated AI Parsing Logic
  const getParsedResult = (text: string, isInitial = false) => {
    const lower = text.toLowerCase();
    
    let workers = ['Ramesh', 'Mohit'];
    if (lower.includes('suresh')) workers = ['Suresh'];
    if (lower.includes('5 masons') || lower.includes('helpers')) workers = ['5 Masons', '8 Helpers (13 Total)'];
    
    let hours = '8 Hours (Full Shift)';
    if (lower.includes('half day')) hours = '4 Hours (Half Day)';
    if (lower.includes('overtime') || lower.includes('2 hrs')) hours = '10 Hours (8h + 2h OT)';
    
    let site = 'Metro Site';
    if (lower.includes('tower b')) site = 'Tower B Commercial';
    if (lower.includes('highway bridge')) site = 'Highway Bridge Corridor';

    return {
      workers,
      hours,
      site,
      status: 'Ready to Save',
      confidence: '99.8%',
      extractedAt: isInitial
        ? '10:00:00 AM'
        : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
  };

  const [parsed, setParsed] = useState(getParsedResult(samplePrompts[0], true));

  const handleRunAI = (promptText?: string) => {
    const targetText = promptText || inputQuery;
    if (!targetText.trim()) return;

    setIsProcessing(true);
    setIsSaved(false);

    setTimeout(() => {
      setParsed(getParsedResult(targetText));
      setIsProcessing(false);
    }, 600);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <section id="demo" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-orange-600/15 to-amber-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
            <Sparkles className="w-4 h-4 text-orange-400 animate-spin-slow" />
            <span>Interactive Live AI Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Try the Live <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">BuilMate AI Assistant</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Type any natural language site update in Hindi or English, or click sample prompts to watch BuilMate AI extract structured attendance data in real time.
          </p>
        </div>

        {/* Interactive Sandbox Card Container */}
        <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  BuilMate AI Natural Language Parser
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                </h3>
                <p className="text-xs text-zinc-400">Zero manual form entry required</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputQuery(prompt);
                    handleRunAI(prompt);
                  }}
                  className="hidden sm:inline-block px-3 py-1 text-[11px] font-medium bg-zinc-950 hover:bg-zinc-800 text-zinc-300 rounded-lg border border-zinc-800 transition-colors"
                >
                  Sample {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-zinc-300">
              Enter Site Supervisor Natural Voice or Text Update:
            </label>
            <div className="relative">
              <textarea
                rows={3}
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Type or speak attendance updates..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm font-mono text-amber-300 placeholder-zinc-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-inner"
              />
              <button
                onClick={() => handleRunAI()}
                disabled={isProcessing}
                className="absolute right-3 bottom-3 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-xs rounded-lg shadow-lg shadow-orange-500/20 flex items-center space-x-1.5 transition-all"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Parsing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5" />
                    <span>Process with AI</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Card */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-200">
                <Sparkles className="w-4 h-4 text-orange-400" />
                Structured Output Result
              </span>
              <span className="font-mono text-emerald-400">Confidence: {parsed.confidence}</span>
            </div>

            <AnimatePresence mode="wait">
              {isProcessing ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center space-y-3"
                >
                  <RefreshCw className="w-8 h-8 text-orange-400 animate-spin" />
                  <p className="text-xs text-zinc-400 font-mono">BuilMate LLM extracting worker profiles, hours, and site allocation...</p>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl bg-zinc-950 border border-emerald-500/40 p-6 space-y-4 shadow-xl"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    {/* Worker Field */}
                    <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Workers</span>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {parsed.workers.map((w, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 font-bold text-xs border border-orange-500/30">
                            {w}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hours Field */}
                    <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Hours Recorded</span>
                      <p className="text-sm font-bold text-amber-400 pt-1">{parsed.hours}</p>
                    </div>

                    {/* Site Field */}
                    <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Construction Site</span>
                      <p className="text-sm font-bold text-white pt-1">{parsed.site}</p>
                    </div>

                    {/* Status Field */}
                    <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">AI Validation Status</span>
                      <div className="flex items-center space-x-1.5 pt-1 text-emerald-400 font-bold text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{parsed.status}</span>
                      </div>
                    </div>

                  </div>

                  {/* Save Action Bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80">
                    <span className="text-[11px] text-zinc-500 font-mono">Parsed at {parsed.extractedAt}</span>
                    <button
                      onClick={handleSave}
                      disabled={isSaved}
                      className={`px-5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
                        isSaved
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                      }`}
                    >
                      {isSaved ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Attendance Saved to Database!</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Confirm & Save Attendance</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};
