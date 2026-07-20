import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WorkerResponse } from '../types';
import { Eye, Pencil, Trash2, Phone, Briefcase, Building2, Calendar } from 'lucide-react';

interface WorkerCardProps {
  worker: WorkerResponse;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const WorkerCard: React.FC<WorkerCardProps> = ({
  worker,
  onView,
  onEdit,
  onDelete,
}) => {
  const workerNumber = `WRK-${worker.id.substring(0, 8).toUpperCase()}`;
  const dailyWage = worker.hourlyRate * 8;
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    worker.name
  )}&backgroundColor=f97316,3b82f6,10b981,6366f1,8b5cf6`;

  return (
    <Card className="border border-border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-5 space-y-4">
        {/* Header containing photo and basic details */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full overflow-hidden border border-border bg-muted flex items-center justify-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatarUrl} alt={worker.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-foreground truncate">{worker.name}</h4>
            <p className="text-xs font-mono text-muted-foreground">{workerNumber}</p>
          </div>
          <Badge
            variant={worker.status === 'ACTIVE' ? 'success' : 'outline'}
            className="shadow-none self-start shrink-0"
          >
            {worker.status}
          </Badge>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-border/50">
          <div className="space-y-1">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Briefcase className="h-3 w-3 text-primary shrink-0" />
              Skills
            </span>
            <span className="font-semibold text-foreground block truncate">
              {worker.skills?.join(', ') || 'General'}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Phone className="h-3 w-3 text-primary shrink-0" />
              Phone
            </span>
            <span className="font-semibold text-foreground block font-mono">
              {worker.phone}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Building2 className="h-3 w-3 text-primary shrink-0" />
              Site
            </span>
            <span className="font-semibold text-foreground block truncate">
              {worker.siteName || 'Unassigned'}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-muted-foreground flex items-center gap-1.5">
              ₹ Daily Wage
            </span>
            <span className="font-bold text-foreground block font-mono">
              ₹{dailyWage.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-3 border-t border-border/50">
          <button
            onClick={() => onView(worker.id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-border bg-muted/30 hover:bg-primary/10 text-muted-foreground hover:text-primary text-xs font-semibold transition-all duration-200"
          >
            <Eye className="h-3.5 w-3.5" />
            View
          </button>
          <button
            onClick={() => onEdit(worker.id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-border bg-muted/30 hover:bg-amber-500/10 text-muted-foreground hover:text-amber-500 text-xs font-semibold transition-all duration-200"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </button>
          <button
            onClick={() => onDelete(worker.id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-border bg-muted/30 hover:bg-destructive/10 text-muted-foreground hover:text-destructive text-xs font-semibold transition-all duration-200"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkerCard;
