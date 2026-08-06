'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, IndianRupee, Building2, TrendingUp, BarChart2, PieChart, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const DashboardPreview: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'week' | 'month'>('week');

  const stats = [
    {
      title: 'Total Workers',
      value: '142',
      change: '+12 this week',
      isPositive: true,
      icon: Users,
      color: 'text-orange-400',
    },
    {
      title: 'Present Today',
      value: '128',
      change: '90.1% attendance rate',
      isPositive: true,
      icon: UserCheck,
      color: 'text-emerald-400',
    },
    {
      title: 'Labour Cost (Today)',
      value: '₹48,500',
      change: 'Within daily budget',
      isPositive: true,
      icon: IndianRupee,
      color: 'text-amber-400',
    },
    {
      title: 'Active Sites',
      value: '6 Sites',
      change: 'All supervisors synced',
      isPositive: true,
      icon: Building2,
      color: 'text-blue-400',
    },
  ];

  const attendanceTrendData = [
    { day: 'Mon', present: 135, absent: 7 },
    { day: 'Tue', present: 138, absent: 4 },
    { day: 'Wed', present: 140, absent: 2 },
    { day: 'Thu', present: 128, absent: 14 },
    { day: 'Fri', present: 136, absent: 6 },
    { day: 'Sat', present: 130, absent: 12 },
    { day: 'Sun', present: 95, absent: 47 },
  ];

  const skillDistribution = [
    { skill: 'Masons (Rajmistri)', count: 48, percentage: 34, color: 'bg-orange-500' },
    { skill: 'Helpers / Labour', count: 54, percentage: 38, color: 'bg-amber-500' },
    { skill: 'Bar Benders', count: 22, percentage: 15, color: 'bg-blue-500' },
    { skill: 'Carpenters & Plumbers', count: 18, percentage: 13, color: 'bg-emerald-500' },
  ];

  return (
    <section className="py-24 bg-zinc-950 border-t border-zinc-800/80 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20">
            <BarChart2 className="w-4 h-4 text-blue-400" />
            <span>Executive Command Center</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Real-Time Dashboard &{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-orange-400 bg-clip-text text-transparent">
              Workforce Analytics
            </span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Get instant multi-site headcounts, skill breakdowns, daily wage expenditure, and attendance trends at a single glance.
          </p>
        </div>

        {/* Dashboard Frame Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 shadow-2xl space-y-6"
        >
          {/* Top Bar Filter */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                BuilMate AI Central Dashboard Preview
                <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  Live Sync
                </span>
              </span>
            </div>

            <div className="flex items-center space-x-2 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setActiveFilter('week')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  activeFilter === 'week' ? 'bg-orange-500 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                This Week
              </button>
              <button
                onClick={() => setActiveFilter('month')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  activeFilter === 'month' ? 'bg-orange-500 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                This Month
              </button>
            </div>
          </div>

          {/* 4 Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 hover:border-zinc-700 transition-all shadow-inner"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-zinc-400">{item.title}</span>
                    <div className={`p-2 rounded-xl bg-zinc-900 border border-zinc-800 ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-extrabold text-white font-sans">{item.value}</h3>
                    <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{item.change}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            
            {/* Chart 1: Attendance Trend Bar Chart */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BarChart2 className="w-4 h-4 text-orange-400" />
                  <h3 className="text-sm font-bold text-white">Daily Attendance Trend</h3>
                </div>
                <div className="flex items-center space-x-3 text-[11px]">
                  <span className="flex items-center gap-1 text-orange-400">
                    <span className="w-2.5 h-2.5 rounded-sm bg-orange-500"></span> Present
                  </span>
                  <span className="flex items-center gap-1 text-zinc-500">
                    <span className="w-2.5 h-2.5 rounded-sm bg-zinc-800"></span> Absent
                  </span>
                </div>
              </div>

              {/* Bar Visualizer */}
              <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-zinc-800/80">
                {attendanceTrendData.map((d) => {
                  const maxCount = 150;
                  const heightPercent = (d.present / maxCount) * 100;
                  return (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group">
                      <span className="text-[10px] font-mono text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {d.present}
                      </span>
                      <div className="w-full bg-zinc-800 h-32 rounded-t-md flex items-end overflow-hidden">
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${heightPercent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                          className="w-full bg-gradient-to-t from-orange-600 to-amber-400 rounded-t-md group-hover:brightness-110 transition-all"
                        />
                      </div>
                      <span className="text-xs font-semibold text-zinc-300">{d.day}</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-[11px] text-zinc-500">Peak attendance recorded on Wednesday (140 workers).</p>
            </div>

            {/* Chart 2: Skill Distribution */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <PieChart className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">Skill Trade Distribution</h3>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">142 Total</span>
              </div>

              <div className="space-y-3.5 pt-2">
                {skillDistribution.map((item) => (
                  <div key={item.skill} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-zinc-200">{item.skill}</span>
                      <span className="font-mono text-zinc-400">{item.count} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={`h-full ${item.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-400 border-t border-zinc-800/80">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Optimal site trade balance
                </span>
                <span className="text-zinc-500">Auto-updated</span>
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
