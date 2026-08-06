'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { TrustSection } from '@/components/landing/TrustSection';
import { WhoWeAre } from '@/components/landing/WhoWeAre';
import { ServicesSection } from '@/components/landing/ServicesSection';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { SolutionSection } from '@/components/landing/SolutionSection';
import { WhoWeServe } from '@/components/landing/WhoWeServe';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { AIDemo } from '@/components/landing/AIDemo';
import { DashboardPreview } from '@/components/landing/DashboardPreview';
import { WhyNirmaan } from '@/components/landing/WhyNirmaan';
import { StatsSection } from '@/components/landing/StatsSection';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQSection } from '@/components/landing/FAQSection';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';
import { DemoModal } from '@/components/landing/DemoModal';
import { ContactModal } from '@/components/landing/ContactModal';

export default function Home() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    // Set root html and body background to dark zinc while on landing page to prevent white overscroll bounce
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
      {/* Sticky Glassmorphic Navbar */}
      <Navbar
        onOpenContact={() => setIsContactOpen(true)}
        onOpenDemo={() => setIsDemoOpen(true)}
      />

      <main>
        {/* Hero Section */}
        <Hero onOpenDemo={() => setIsDemoOpen(true)} />

        {/* Built For Trust Section */}
        <TrustSection />

        {/* Section 1: Who We Are */}
        <WhoWeAre />

        {/* Section 2: What We Do (Services) */}
        <ServicesSection />

        {/* Section 5: BuilMate vs Traditional Comparison */}
        <ProblemSection />

        {/* Meet BuilMate AI Solution Section */}
        <SolutionSection />

        {/* Section 4: Who We Serve */}
        <WhoWeServe />

        {/* Section 8: Comprehensive Features */}
        <FeaturesSection />

        {/* Section 6: How BuilMate Works (6 Steps Timeline) */}
        <HowItWorks />

        {/* Live Interactive AI Sandbox Demo */}
        <AIDemo />

        {/* Dashboard Analytics Preview */}
        <DashboardPreview />

        {/* Section 3: Why Choose BuilMate Benefits & Guarantees */}
        <WhyNirmaan />

        {/* Section 9: Statistics Counters */}
        <StatsSection />

        {/* Testimonials */}
        <Testimonials />

        {/* FAQ Accordion */}
        <FAQSection />

        {/* Section 10: Call To Action Banner */}
        <CTASection
          onOpenContact={() => setIsContactOpen(true)}
          onOpenDemo={() => setIsDemoOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {/* Interactive Modals */}
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
