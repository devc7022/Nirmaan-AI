import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AttendanceResponse } from '../types';
import { AttendanceStatusBadge } from './AttendanceStatusBadge';
import {
  User,
  Building2,
  Calendar,
  Clock,
  FileText,
  Pencil,
  ArrowLeft,
  History,
} from 'lucide-react';

interface AttendanceDetailsCardProps {
  attendance: AttendanceResponse;
  onEdit?: () => void;
  onBack?: () => void;
}

export const AttendanceDetailsCard: React.FC<AttendanceDetailsCardProps> = ({
  attendance,
  onEdit,
  onBack,
}) => {
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    attendance.workerName
  )}&backgroundColor=3b82f6,10b981,f97316,8b5cf6`;

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
              <div className="h-12 w-12 rounded-full overflow-hidden border border-border bg-muted shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={avatarUrl} alt={attendance.workerName} className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    {attendance.workerName}
                  </h1>
                  <AttendanceStatusBadge present={attendance.present} />
                </div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5 font-medium">
                  <Building2 className="h-3.5 w-3.5 text-primary" />
                  <span>{attendance.siteName}</span>
                </p>
              </div>
            </div>

            {onEdit && (
              <Button
                onClick={onEdit}
                className="flex items-center gap-2 font-semibold shadow-sm self-start sm:self-center"
              >
                <Pencil className="h-4 w-4" />
                Edit Record
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          {/* Worker Name */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <User className="h-4 w-4 text-primary" />
              <span>Worker Profile</span>
            </div>
            <p className="font-semibold text-foreground">{attendance.workerName}</p>
          </div>

          {/* Construction Site */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <Building2 className="h-4 w-4 text-primary" />
              <span>Assigned Site</span>
            </div>
            <p className="font-semibold text-foreground">{attendance.siteName}</p>
          </div>

          {/* Attendance Date */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Attendance Date</span>
            </div>
            <p className="font-semibold font-mono text-foreground">
              {attendance.attendanceDate
                ? new Date(attendance.attendanceDate).toLocaleDateString('en-IN', {
                    weekday: 'short',
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })
                : '—'}
            </p>
          </div>

          {/* Hours Worked */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <Clock className="h-4 w-4 text-primary" />
              <span>Hours Logged</span>
            </div>
            <p className="font-semibold font-mono text-foreground text-lg">
              {attendance.hoursWorked} hrs
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Grid for Remarks & Audit Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Remarks Section (2 Cols) */}
        <Card className="lg:col-span-2 border border-border/80 bg-card/60 backdrop-blur-md shadow-sm">
          <CardHeader className="p-5 pb-3 border-b border-border/40">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Work Remarks & Notes
            </h3>
          </CardHeader>
          <CardContent className="p-5">
            <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
              {attendance.remarks ||
                'No additional remarks or work logs provided for this attendance record.'}
            </p>
          </CardContent>
        </Card>

        {/* Audit History (1 Col) */}
        <Card className="border border-border/80 bg-card/60 backdrop-blur-md shadow-sm">
          <CardHeader className="p-5 pb-3 border-b border-border/40">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <History className="h-4 w-4 text-primary" />
              Audit Log
            </h3>
          </CardHeader>
          <CardContent className="p-5 space-y-4 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-border/40">
              <span className="text-muted-foreground font-medium">Created On</span>
              <span className="font-mono text-foreground">
                {attendance.createdAt
                  ? new Date(attendance.createdAt).toLocaleString('en-IN')
                  : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground font-medium">Last Updated</span>
              <span className="font-mono text-foreground">
                {attendance.updatedAt
                  ? new Date(attendance.updatedAt).toLocaleString('en-IN')
                  : 'N/A'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceDetailsCard;
