'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Heart, ShieldCheck, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link href="#" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Image
                  src="/images/builmate_logo_hd.png"
                  alt="BuilMate AI Logo"
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                  unoptimized
                />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                BuilMate <span className="text-orange-500">AI</span>
              </span>
            </Link>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              The next-generation AI operating system for construction companies, civil contractors, and site supervisors across India.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="GitHub Repository"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="LinkedIn Page"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#features" className="hover:text-orange-400 transition-colors">Features</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-orange-400 transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#why-builmate" className="hover:text-orange-400 transition-colors">Why Choose BuilMate AI</a>
              </li>
              <li>
                <a href="#demo" className="hover:text-orange-400 transition-colors">Live AI Sandbox</a>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-orange-400 transition-colors text-left">
                  Contact Sales & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Policy Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Legal & Compliance</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveModal('privacy')}
                  className="hover:text-orange-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('terms')}
                  className="hover:text-orange-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  Terms of Service
                </button>
              </li>
              <li className="pt-2 text-[11px] text-zinc-500">
                Encrypted with SSL 256-bit security. Certified for Indian Labour Code compliance.
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© 2026 BuilMate AI. All rights reserved.</p>
          <p className="flex items-center gap-1 text-[11px] text-zinc-400">
            Crafted for the Indian Construction Industry
          </p>
        </div>

      </div>

      {/* Privacy / Terms Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <h3 className="text-lg font-bold text-white">
                  {activeModal === 'privacy' ? 'BuilMate AI Privacy Policy' : 'Terms of Service'}
                </h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 text-zinc-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="text-xs text-zinc-300 space-y-3 leading-relaxed">
                {activeModal === 'privacy' ? (
                  <>
                    <p>At BuilMate AI, we prioritize the confidentiality and protection of site attendance records, biometric logs, and contractor financial transactions.</p>
                    <h5 className="font-bold text-white pt-2">Data Protection:</h5>
                    <p>All worker records and site financial data are encrypted at rest and in transit using TLS 1.3 encryption. We never sell site operational data to third parties.</p>
                    <h5 className="font-bold text-white pt-2">AI Data Processing:</h5>
                    <p>Natural language voice updates processed by BuilMate AI are handled solely for structural parsing and profile matching on your registered tenant database.</p>
                  </>
                ) : (
                  <>
                    <p>By using BuilMate AI, you agree to adhere to standard operational site guidelines for attendance logging and wage administration.</p>
                    <h5 className="font-bold text-white pt-2">Account Responsibility:</h5>
                    <p>Site supervisors and administrators are responsible for verifying natural language AI suggestions before confirming final payroll payouts.</p>
                    <h5 className="font-bold text-white pt-2">SaaS Availability:</h5>
                    <p>BuilMate AI provides a 99.9% uptime SLA for multi-site synchronization and real-time dashboard analytics.</p>
                  </>
                )}
              </div>
              <div className="pt-4 border-t border-zinc-800 text-right">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};
