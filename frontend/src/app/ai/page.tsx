'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AIAttendanceCard } from '@/features/ai/components/AIAttendanceCard';
import { AIChat } from '@/features/ai/components/AIChat';
import { AIReportCard } from '@/features/ai/components/AIReportCard';
import { Sparkles, ClipboardCheck, Bot, FileText, CheckCircle2, XCircle } from 'lucide-react';

export default function AIPage() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto pb-10">
        {/* Toast Notification */}
        {toast && (
          <div
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3.5 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-300 border ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 text-emerald-100 border-emerald-500/40'
                : 'bg-destructive/90 text-destructive-foreground border-destructive/40'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            ) : (
              <XCircle className="h-5 w-5 text-red-400 shrink-0" />
            )}
            <span className="font-semibold text-sm">{toast.message}</span>
          </div>
        )}

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/15 via-orange-500/10 to-amber-500/15 p-6 md:p-8 border border-primary/20 shadow-sm">
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>Next-Gen Construction AI</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              AI Workforce Assistant
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl font-medium">
              Manage construction workforce using natural language. Process daily attendance, query workforce stats, and generate automated summaries in seconds.
            </p>
          </div>

          <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-10 pointer-events-none hidden md:block">
            <Sparkles className="h-64 w-64 text-primary" />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="attendance" className="w-full space-y-6">
          <TabsList className="grid grid-cols-3 w-full md:w-[600px]">
            <TabsTrigger value="attendance" className="gap-2">
              <ClipboardCheck className="h-4 w-4 shrink-0" />
              <span>AI Attendance</span>
            </TabsTrigger>

            <TabsTrigger value="assistant" className="gap-2">
              <Bot className="h-4 w-4 shrink-0" />
              <span>AI Assistant</span>
            </TabsTrigger>

            <TabsTrigger value="report" className="gap-2">
              <FileText className="h-4 w-4 shrink-0" />
              <span>AI Report Generator</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: AI Attendance */}
          <TabsContent value="attendance">
            <AIAttendanceCard onShowToast={showToast} />
          </TabsContent>

          {/* Tab 2: AI Assistant */}
          <TabsContent value="assistant">
            <AIChat onShowToast={showToast} />
          </TabsContent>

          {/* Tab 3: AI Report Generator */}
          <TabsContent value="report">
            <AIReportCard onShowToast={showToast} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
