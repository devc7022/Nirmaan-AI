'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/protected-route';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Error as ErrorCard } from '@/components/ui/error';
import { useDashboard } from '@/features/dashboard/hooks/useDashboard';
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import { DashboardStats } from '@/features/dashboard/components/DashboardStats';
import { AttendanceChart } from '@/features/dashboard/components/AttendanceChart';
import { LabourChart } from '@/features/dashboard/components/LabourChart';
import { SkillChart } from '@/features/dashboard/components/SkillChart';
import { RecentAttendanceTable } from '@/features/dashboard/components/RecentAttendanceTable';
import { TopSitesCard } from '@/features/dashboard/components/TopSitesCard';
import { LayoutDashboard } from 'lucide-react';

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-9 w-48 bg-muted rounded-lg" />
          <div className="h-4 w-96 bg-muted rounded" />
        </div>
        <div className="h-10 w-48 bg-muted rounded-xl" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 bg-muted/60 rounded-xl border border-muted/50" />
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="h-[370px] bg-muted/60 rounded-xl border border-muted/50" />
        <div className="h-[370px] bg-muted/60 rounded-xl border border-muted/50" />
        <div className="h-[370px] bg-muted/60 rounded-xl border border-muted/50" />
      </div>

      {/* Tables Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[400px] bg-muted/60 rounded-xl border border-muted/50" />
        <div className="h-[400px] bg-muted/60 rounded-xl border border-muted/50" />
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const {
    data,
    attendanceTrend,
    labourCostTrend,
    skillDistribution,
    isLoading,
    isError,
    error,
    refetch,
  } = useDashboard();

  return (
    <ProtectedRoute allowedRoles={['ADMIN', 'SUPERVISOR', 'CONTRACTOR']}>
      <DashboardLayout>
        <div className="mx-auto max-w-7xl">
          {isLoading ? (
            <DashboardSkeleton />
          ) : isError ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <ErrorCard
                message={error instanceof Error ? error.message : 'Could not fetch dashboard statistics from the server.'}
                reset={refetch}
              />
            </div>
          ) : !data ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-card border border-border rounded-2xl max-w-md mx-auto">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <LayoutDashboard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">No Data Available</h3>
              <p className="text-sm text-muted-foreground mt-2 mb-6">
                No dashboard data available.
              </p>
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium text-sm shadow-sm"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="space-y-8 fade-in">
              {/* Header */}
              <DashboardHeader />

              {/* Stats cards section */}
              <DashboardStats data={data} />

              {/* Charts section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <AttendanceChart data={attendanceTrend} />
                </div>
                <div className="lg:col-span-1">
                  <LabourChart data={labourCostTrend} />
                </div>
                <div className="lg:col-span-1">
                  <SkillChart data={skillDistribution} />
                </div>
              </div>

              {/* Recent Activity and Sites */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <RecentAttendanceTable data={data.recentAttendance} />
                </div>
                <div className="lg:col-span-1">
                  <TopSitesCard data={data.topSites} />
                </div>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
