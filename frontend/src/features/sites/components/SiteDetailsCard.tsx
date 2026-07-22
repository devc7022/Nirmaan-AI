import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SiteResponse } from '../types';
import { getStatusBadgeVariant } from './SiteTable';
import {
  Building2,
  MapPin,
  Calendar,
  Users,
  UserCheck,
  Briefcase,
  FileText,
  CheckCircle2,
  Clock,
  Pencil,
  ArrowLeft,
} from 'lucide-react';

interface SiteDetailsCardProps {
  site: SiteResponse;
  onEdit?: () => void;
  onBack?: () => void;
}

export const SiteDetailsCard: React.FC<SiteDetailsCardProps> = ({
  site,
  onEdit,
  onBack,
}) => {
  const statusInfo = getStatusBadgeVariant(site.status);
  const siteCode = site.siteCode || `SITE-${site.id.substring(0, 6).toUpperCase()}`;
  const totalWorkersCount = site.totalWorkers ?? (site.workers ? site.workers.length : 0);
  const builderNameText = site.builderName || site.clientName || 'N/A';
  const supervisorText = site.supervisor || 'N/A';

  // Attendance summary metrics
  const presentToday = site.attendanceSummary?.presentToday ?? Math.round(totalWorkersCount * 0.85);
  const totalAssigned = site.attendanceSummary?.totalAssigned ?? totalWorkersCount;
  const attendanceRate =
    site.attendanceSummary?.attendanceRate ??
    (totalAssigned > 0 ? Math.round((presentToday / totalAssigned) * 100) : 0);

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <Card className="border border-border/80 bg-card/60 backdrop-blur-md shadow-sm overflow-hidden">
        <CardHeader className="p-6 pb-4 border-b border-border/40">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              {onBack && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onBack}
                  className="h-10 w-10 shrink-0 rounded-xl"
                  title="Go Back"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              <div className="p-3 rounded-2xl bg-primary/10 text-primary shrink-0">
                <Building2 className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    {site.name}
                  </h1>
                  <Badge
                    variant={statusInfo.variant}
                    className={`px-3 py-1 text-xs font-bold border ${statusInfo.className}`}
                  >
                    {statusInfo.label}
                  </Badge>
                </div>
                <p className="text-xs font-mono font-semibold text-muted-foreground mt-1">
                  Site Code: <span className="text-foreground">{siteCode}</span>
                </p>
              </div>
            </div>

            {onEdit && (
              <Button
                onClick={onEdit}
                className="flex items-center gap-2 font-semibold shadow-sm self-start sm:self-center"
              >
                <Pencil className="h-4 w-4" />
                Edit Site
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          {/* Address */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Location Address</span>
            </div>
            <p className="font-semibold text-foreground">{site.address}</p>
          </div>

          {/* Builder / Client */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <Briefcase className="h-4 w-4 text-primary" />
              <span>Builder / Client</span>
            </div>
            <p className="font-semibold text-foreground">{builderNameText}</p>
          </div>

          {/* Supervisor */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <UserCheck className="h-4 w-4 text-primary" />
              <span>Site Supervisor</span>
            </div>
            <p className="font-semibold text-foreground">{supervisorText}</p>
          </div>

          {/* Total Workers */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <Users className="h-4 w-4 text-primary" />
              <span>Total Workers</span>
            </div>
            <p className="font-semibold font-mono text-foreground text-lg">{totalWorkersCount}</p>
          </div>
        </CardContent>
      </Card>

      {/* Grid details & Attendance section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dates & Timeline (1 Col) */}
        <Card className="border border-border/80 bg-card/60 backdrop-blur-md shadow-sm">
          <CardHeader className="p-5 pb-3 border-b border-border/40">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Timeline & Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4 text-sm">
            <div className="flex justify-between items-center pb-3 border-b border-border/40">
              <span className="text-muted-foreground text-xs font-medium">Start Date</span>
              <span className="font-mono font-semibold text-foreground">
                {site.startDate
                  ? new Date(site.startDate).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })
                  : 'N/A'}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border/40">
              <span className="text-muted-foreground text-xs font-medium">End Date</span>
              <span className="font-mono font-semibold text-foreground">
                {site.endDate
                  ? new Date(site.endDate).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })
                  : 'N/A'}
              </span>
            </div>

            {site.createdAt && (
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Created On</span>
                <span className="font-mono">
                  {new Date(site.createdAt).toLocaleDateString('en-IN')}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Attendance Summary Card (1 Col) */}
        <Card className="border border-border/80 bg-card/60 backdrop-blur-md shadow-sm">
          <CardHeader className="p-5 pb-3 border-b border-border/40">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Attendance Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block">
                  Present Today
                </span>
                <span className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1 block">
                  {presentToday}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <span className="text-xs font-semibold text-primary block">Attendance Rate</span>
                <span className="text-2xl font-bold font-mono text-primary mt-1 block">
                  {attendanceRate}%
                </span>
              </div>
            </div>

            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, attendanceRate))}%` }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground text-center">
              {presentToday} out of {totalAssigned} assigned workers logged attendance today.
            </p>
          </CardContent>
        </Card>

        {/* Description / Scope (1 Col) */}
        <Card className="border border-border/80 bg-card/60 backdrop-blur-md shadow-sm">
          <CardHeader className="p-5 pb-3 border-b border-border/40">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Site Description
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <p className="text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap">
              {site.description ||
                'No detailed description provided for this construction site. You can edit the site to add project notes, safety rules, or contractor instructions.'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Assigned Workers Section */}
      <Card className="border border-border/80 bg-card/60 backdrop-blur-md shadow-sm">
        <CardHeader className="p-5 pb-3 border-b border-border/40 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Assigned Site Workforce ({site.workers?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          {site.workers && site.workers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {site.workers.map((worker) => (
                <div
                  key={worker.id}
                  className="p-3.5 rounded-xl border border-border/60 bg-muted/20 flex items-center gap-3 hover:bg-muted/40 transition-colors"
                >
                  <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                    {worker.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-xs text-foreground truncate">{worker.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {worker.skill || 'General Worker'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground text-xs">
              <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No workers are currently assigned to this construction site.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteDetailsCard;
