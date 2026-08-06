'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  LogOut,
  Building2,
  Menu,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onToggle }) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'SUPERVISOR', 'CONTRACTOR'] },
    { name: 'Workers', href: '/workers', icon: Users, roles: ['ADMIN', 'SUPERVISOR', 'CONTRACTOR'] },
    { name: 'Sites', href: '/sites', icon: Building2, roles: ['ADMIN', 'SUPERVISOR', 'CONTRACTOR'] },
    { name: 'Attendance', href: '/attendance', icon: ClipboardCheck, roles: ['ADMIN', 'SUPERVISOR', 'CONTRACTOR'] },
    { name: 'AI Assistant', href: '/ai', icon: Sparkles, roles: ['ADMIN', 'SUPERVISOR', 'CONTRACTOR'] },
  ];

  const filteredNavItems = navItems.filter(item =>
    user ? item.roles.includes(user.role) : false
  );

  return (
    <aside
      className={`bg-card border-r border-border flex flex-col justify-between h-screen sticky top-0 transition-all duration-300 ease-in-out shrink-0 z-40 ${
        isOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 overflow-hidden border-none pointer-events-none'
      }`}
    >
      <div className="flex flex-col h-full justify-between min-w-[16rem]">
        <div>
          {/* Logo Branding & Top Close Button */}
          <div className="p-4 border-b border-border flex items-center justify-between h-16">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
                <Image
                  src="/images/builmate_logo_hd.png"
                  alt="BuilMate AI Logo"
                  width={36}
                  height={36}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent truncate">
                BuilMate AI
              </span>
            </div>

            {onToggle && (
              <button
                onClick={onToggle}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
                title="Close sidebar"
                aria-label="Close sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
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
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer User Info and Logout */}
        <div className="p-4 border-t border-border">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span className="truncate">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
