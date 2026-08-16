'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, LayoutDashboard, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenDemo: () => void;
  onOpenContractorQuery?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenDemo, onOpenContractorQuery }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Why BuilMate', href: '/#why-builmate' },
    { name: 'FAQ', href: '/#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 shadow-lg shadow-black/20 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/builmate_logo_hd.png"
                alt="BuilMate AI Logo"
                width={40}
                height={40}
                className="object-contain w-full h-full"
                unoptimized
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5 font-sans">
                BuilMate <span className="text-orange-500 font-black">AI</span>
              </span>
              <span className="text-[10px] font-medium text-zinc-400 tracking-wider uppercase -mt-1">
                Construction OS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-zinc-900/60 p-1.5 rounded-full border border-zinc-800/80 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full hover:bg-zinc-800/60 transition-colors"
              >
                {link.name}
              </a>
            ))}
            {onOpenContractorQuery ? (
              <button
                onClick={onOpenContractorQuery}
                className="px-4 py-1.5 text-xs font-semibold text-orange-400 hover:text-orange-300 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 rounded-full transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-orange-400" />
                <span>Submit Requirement</span>
              </button>
            ) : (
              <Link
                href="/contractor-query"
                className="px-4 py-1.5 text-xs font-semibold text-orange-400 hover:text-orange-300 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 rounded-full transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-orange-400" />
                <span>Submit Requirement</span>
              </Link>
            )}
            <button
              onClick={onOpenContact}
              className="px-4 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full hover:bg-zinc-800/60 transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-orange-400" />
                <span>Go to Dashboard</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="relative group overflow-hidden px-5 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 transition-all transform hover:scale-[1.02]"
                >
                  <span className="flex items-center space-x-1.5">
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-900 border border-zinc-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-950/95 border-b border-zinc-800 backdrop-blur-xl px-6 py-6 space-y-4"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-zinc-300 hover:text-orange-400 py-1 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              {onOpenContractorQuery ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContractorQuery();
                  }}
                  className="text-left text-sm font-semibold text-orange-400 py-1 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  Submit Contractor Requirement
                </button>
              ) : (
                <Link
                  href="/contractor-query"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left text-sm font-semibold text-orange-400 py-1 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  Submit Contractor Requirement
                </Link>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="text-left text-sm font-medium text-zinc-300 hover:text-orange-400 py-1 transition-colors"
              >
                Contact
              </button>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex flex-col space-y-2">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg bg-zinc-800 text-white font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4 text-orange-400" />
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-lg border border-zinc-700 text-zinc-200 font-semibold text-sm hover:bg-zinc-900"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-sm shadow-lg shadow-orange-500/20"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
