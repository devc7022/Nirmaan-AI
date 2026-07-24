'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AttendanceAIResponse, ParsedAttendanceItem } from '../types';
import { User, Building2, Calendar, Clock, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

interface AttendancePreviewCardProps {
  data: AttendanceAIResponse;
  onConfirm: () => void;
  onCancel: () => void;
  isSaving?: boolean;
}

export const AttendancePreviewCard: React.FC<AttendancePreviewCardProps> = ({
  data,
  onConfirm,
  onCancel,
  isSaving = false,
}) => {
  const records: ParsedAttendanceItem[] = data.records || [
    {
      workerName: data.workerName || 'Unknown Worker',
      siteName: data.siteName || 'Unassigned Site',
      attendanceDate: data.attendanceDate || new Date().toISOString().split('T')[0],
      hoursWorked: data.hoursWorked ?? 8,
      present: data.present ?? true,
      remarks: data.remarks,
    },
  ];

  return (
    <Card className="border-primary/30 bg-card/60 backdrop-blur shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
      <CardHeader className="pb-3 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <CardTitle className="text-lg font-bold">Extracted Attendance Preview</CardTitle>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-medium">
            AI Extracted ({records.length} {records.length === 1 ? 'record' : 'records'})
          </Badge>
        </div>
        <CardDescription>
          Please review the details extracted from your text statement before confirming.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {records.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-muted/40 border border-border/60 hover:border-primary/30 transition-all space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary shrink-0" />
                <span className="font-bold text-foreground text-sm">{item.workerName}</span>
              </div>
              <Badge
                className={
                  item.present
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                    : 'bg-destructive/10 text-destructive border-destructive/30'
                }
              >
                {item.present ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Present
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <XCircle className="h-3.5 w-3.5" /> Absent
                  </span>
                )}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4 text-amber-500 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground/70">Construction Site</p>
                  <p className="font-medium text-foreground">{item.siteName}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 text-blue-500 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground/70">Attendance Date</p>
                  <p className="font-medium text-foreground">{item.attendanceDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4 text-purple-500 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground/70">Hours Worked</p>
                  <p className="font-medium text-foreground">{item.hoursWorked} hrs</p>
                </div>
              </div>
            </div>

            {item.remarks && (
              <p className="text-xs text-muted-foreground italic bg-background/50 p-2 rounded-md border border-border/40">
                "{item.remarks}"
              </p>
            )}
          </div>
        ))}
      </CardContent>

      <CardFooter className="flex items-center justify-end gap-3 pt-3 border-t border-border/50">
        <Button variant="outline" onClick={onCancel} disabled={isSaving}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isSaving}
          className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving Attendance...
            </>
          ) : (
            'Confirm & Save'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
