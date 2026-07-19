'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  HardHat,
  ClipboardCheck,
  LogOut,
  Building2
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'SUPERVISOR', 'CONTRACTOR'] },
    { name: 'Workers', href: '/workers', icon: Users, roles: ['ADMIN', 'SUPERVISOR', 'CONTRACTOR'] },
    { name: 'Sites', href: '/sites', icon: Building2, roles: ['ADMIN', 'SUPERVISOR', 'CONTRACTOR'] },
    { name: 'Attendance', href: '/attendance', icon: ClipboardCheck, roles: ['ADMIN', 'SUPERVISOR', 'CONTRACTOR'] },
  ];

  const filteredNavItems = navItems.filter(item =>
    user ? item.roles.includes(user.role) : false
  );

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col justify-between h-screen sticky top-0">
      <div>
        {/* Logo Branding */}
        <div className="p-6 border-b border-border flex items-center gap-3">
          <HardHat className="h-8 w-8 text-primary animate-pulse" />
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
            Nirmaan AI
          </span>
        </div>

        {/* Nav Links */}
        <nav className="p-4 space-y-1">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname ? pathname.startsWith(item.href) : false;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer User Info and Logout */}
      <div className="p-4 border-t border-border">
        {user && (
          <div className="mb-4 px-4">
            <p className="font-semibold text-sm text-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role.toLowerCase()}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};
