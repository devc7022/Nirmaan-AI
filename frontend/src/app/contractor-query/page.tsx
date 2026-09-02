'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { DemoModal } from '@/components/landing/DemoModal';
import { ContactModal } from '@/components/landing/ContactModal';
import { ContractorQueryForm } from '@/components/contractor/ContractorQueryForm';
import { HardHat, ShieldCheck, Zap, Users2 } from 'lucide-react';

export default function ContractorQueryPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const originalHtmlBg = document.documentElement.style.backgroundColor;
    const originalBodyBg = document.body.style.backgroundColor;

    document.documentElement.style.backgroundColor = '#09090b';
    document.body.style.backgroundColor = '#09090b';

    return () => {
      document.documentElement.style.backgroundColor = originalHtmlBg;
      document.body.style.backgroundColor = originalBodyBg;
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-orange-500 selection:text-white font-sans antialiased">
      <Navbar
        onOpenContact={() => setIsContactOpen(true)}
        onOpenDemo={() => setIsDemoOpen(true)}
      />

      <main className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
            <HardHat className="w-4 h-4" />
            <span>Contractor Requirement & Query Submission</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Submit Your Construction <span className="text-orange-500">Requirements</span>
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Need masons, skilled electricians, plumbers, or general labour for your construction site? Submit your detailed requirements below. Our workforce team will coordinate deployment right away.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 flex-shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Rapid Deployment</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">Matched within 24 hours of form submission.</p>
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 flex-shrink-0">
              <Users2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Verified Skilled Manpower</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">Masons, electricians, plumbers, & civil workers.</p>
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 flex-shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Guaranteed Payout Log</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">Tracked directly via BumbleBrick AI Attendance OS.</p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          <ContractorQueryForm />
        </div>
      </main>

      <Footer onOpenContact={() => setIsContactOpen(true)} />

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
