import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DashboardResponse } from '../types';
import {
  Users,
  UserCheck,
  Building2,
  IndianRupee,
  Percent,
  Clock,
} from 'lucide-react';

interface DashboardStatsProps {
  data: DashboardResponse;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ data }) => {
  const stats = [
    {
      title: 'Total Workers',
      value: data.workerStatistics?.totalWorkers?.toLocaleString() || '0',
      subtitle: `${data.workerStatistics?.activeWorkers || 0} active, ${data.workerStatistics?.inactiveWorkers || 0} inactive`,
      icon: Users,
      colorClass: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      hoverClass: 'hover:shadow-blue-500/5',
    },
    {
      title: 'Present Today',
      value: data.attendanceStatistics?.presentToday?.toLocaleString() || '0',
      subtitle: `${data.attendanceStatistics?.absentToday || 0} absent today`,
      icon: UserCheck,
      colorClass: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      hoverClass: 'hover:shadow-emerald-500/5',
    },
    {
      title: 'Active Sites',
      value: data.siteStatistics?.activeSites?.toLocaleString() || '0',
      subtitle: `Out of ${data.siteStatistics?.totalSites || 0} total sites`,
      icon: Building2,
      colorClass: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      hoverClass: 'hover:shadow-amber-500/5',
    },
    {
      title: "Today's Labour Cost",
      value: `₹${Number(data.labourStatistics?.todayLabourCost || 0).toLocaleString('en-IN')}`,
      subtitle: `Weekly: ₹${Number(data.labourStatistics?.weeklyLabourCost || 0).toLocaleString('en-IN')}`,
      icon: IndianRupee,
      colorClass: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      hoverClass: 'hover:shadow-indigo-500/5',
    },
    {
      title: 'Attendance Percentage',
      value: `${(data.attendanceStatistics?.attendancePercentage ?? 0).toFixed(1)}%`,
      subtitle: 'Rate among active workers',
      icon: Percent,
      colorClass: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
      hoverClass: 'hover:shadow-teal-500/5',
    },
    {
      title: 'Average Hours Worked',
      value: `${(data.labourStatistics?.averageHoursWorkedToday ?? 0).toFixed(1)} hrs`,
      subtitle: 'Per present worker today',
      icon: Clock,
      colorClass: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
      hoverClass: 'hover:shadow-rose-500/5',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <Card
            key={idx}
            className={`transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-border bg-card/50 backdrop-blur-sm cursor-default ${stat.hoverClass}`}
          >
            <CardContent className="p-6 pt-6">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold text-foreground tracking-tight">
                    {stat.value}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {stat.subtitle}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-xl border flex items-center justify-center ${stat.colorClass}`}
                >
                  <IconComponent className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;
