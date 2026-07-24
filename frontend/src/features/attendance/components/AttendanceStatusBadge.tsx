import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';

interface AttendanceStatusBadgeProps {
  present: boolean;
  className?: string;
}

export const AttendanceStatusBadge: React.FC<AttendanceStatusBadgeProps> = ({
  present,
  className = '',
}) => {
  if (present) {
    return (
      <Badge
        variant="success"
        className={`px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 gap-1.5 ${className}`}
      >
        <CheckCircle2 className="h-3.5 w-3.5" />
        Present
      </Badge>
    );
  }

  return (
    <Badge
      variant="destructive"
      className={`px-2.5 py-0.5 text-xs font-semibold bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 gap-1.5 ${className}`}
    >
      <XCircle className="h-3.5 w-3.5" />
      Absent
    </Badge>
  );
};

export default AttendanceStatusBadge;
