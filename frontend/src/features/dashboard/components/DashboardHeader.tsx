import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const DashboardHeader: React.FC = () => {
  const { user } = useAuth();
  const today = new Date();
  
  // Format: Monday, July 20, 2026
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight bg-gradient-to-r from-foreground via-foreground/95 to-muted-foreground bg-clip-text">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          Welcome back, <span className="font-semibold text-primary">{user?.name || 'Contractor'}</span>. Here is a quick summary of today's progress.
        </p>
      </div>
      <div className="bg-card border border-border rounded-xl px-4 py-2.5 shadow-sm self-start md:self-center flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Today:</span>
        <span className="text-sm font-semibold text-foreground">{formattedDate}</span>
      </div>
    </div>
  );
};

export default DashboardHeader;
