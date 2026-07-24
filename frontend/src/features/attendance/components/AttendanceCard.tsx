import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AttendanceResponse } from '../types';
import { AttendanceStatusBadge } from './AttendanceStatusBadge';
import { Building2, Calendar, Clock, Eye, Pencil, Trash2, User } from 'lucide-react';

interface AttendanceCardProps {
  record: AttendanceResponse;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const AttendanceCard: React.FC<AttendanceCardProps> = ({
  record,
  onView,
  onEdit,
  onDelete,
}) => {
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    record.workerName
  )}&backgroundColor=3b82f6,10b981,f97316,8b5cf6`;

  return (
    <Card className="border border-border/80 bg-card/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between">
      <CardHeader className="p-4 pb-2 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-9 w-9 rounded-full overflow-hidden border border-border bg-muted shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={avatarUrl} alt={record.workerName} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-foreground text-base truncate" title={record.workerName}>
                {record.workerName}
              </h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Building2 className="h-3 w-3 shrink-0 text-primary" />
                <span className="truncate">{record.siteName}</span>
              </p>
            </div>
          </div>
          <AttendanceStatusBadge present={record.present} />
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-1 space-y-2.5 text-xs">
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/40">
          <div>
            <span className="text-muted-foreground block text-[10px]">Date</span>
            <span className="font-mono font-medium text-foreground flex items-center gap-1 mt-0.5">
              <Calendar className="h-3 w-3 text-muted-foreground/70" />
              {record.attendanceDate
                ? new Date(record.attendanceDate).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })
                : '—'}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground block text-[10px]">Hours Worked</span>
            <span className="font-mono font-bold text-foreground flex items-center gap-1 mt-0.5">
              <Clock className="h-3 w-3 text-primary" />
              {record.hoursWorked} hrs
            </span>
          </div>
        </div>

        {record.remarks && (
          <div className="pt-2 border-t border-border/40">
            <span className="text-muted-foreground block text-[10px]">Remarks</span>
            <p className="text-xs text-muted-foreground italic truncate mt-0.5">{record.remarks}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-3 bg-muted/20 border-t border-border/40 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView(record.id)}
          className="flex-1 text-xs gap-1 h-8 font-medium"
        >
          <Eye className="h-3.5 w-3.5" />
          View
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(record.id)}
          className="text-xs gap-1 h-8 font-medium hover:text-amber-500 hover:border-amber-500/50"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(record.id)}
          className="text-xs gap-1 h-8 font-medium hover:text-destructive hover:border-destructive/50"
        >
          <Trash2 className="h-3.5 w-3.5 text-destructive" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AttendanceCard;
