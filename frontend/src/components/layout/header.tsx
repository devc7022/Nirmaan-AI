'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, Bell } from 'lucide-react';

export const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div>
        <h2 className="text-lg font-bold text-foreground">
          Welcome Back, <span className="text-primary">{user?.name || 'Guest'}</span>
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-destructive rounded-full" />
        </button>

        <div className="flex items-center gap-3 border-l border-border pl-4">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold text-foreground">{user?.name}</p>
            <p className="text-[10px] text-muted-foreground capitalize">{user?.role.toLowerCase()}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
