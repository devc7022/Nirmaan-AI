import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { WorkerResponse } from '../types';
import { Eye, Pencil, Trash2 } from 'lucide-react';

interface WorkerTableProps {
  workers: WorkerResponse[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const WorkerTable: React.FC<WorkerTableProps> = ({
  workers,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-card/40 backdrop-blur-sm shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Photo</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead className="text-right">Daily Wage</TableHead>
              <TableHead>Assigned Site</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workers.map((worker) => {
              // Calculate daily wage (hourly rate * 8 hours)
              const dailyWage = worker.hourlyRate * 8;
              
              // Initials avatar fallback
              const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                worker.name
              )}&backgroundColor=f97316,3b82f6,10b981,6366f1,8b5cf6`;

              return (
                <TableRow key={worker.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="h-10 w-10 rounded-full overflow-hidden border border-border bg-muted flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={avatarUrl}
                        alt={worker.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-foreground">
                    {worker.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {worker.phone}
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate text-muted-foreground">
                    {worker.skills?.join(', ') || 'General'}
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold text-foreground">
                    ₹{dailyWage.toLocaleString('en-IN')}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {worker.siteName || (
                      <span className="text-xs font-normal text-muted-foreground italic">
                        Unassigned
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={worker.status === 'ACTIVE' ? 'success' : 'outline'}
                      className="shadow-none"
                    >
                      {worker.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onView(worker.id)}
                        className="p-1.5 rounded-lg border border-border hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-200"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onEdit(worker.id)}
                        className="p-1.5 rounded-lg border border-border hover:bg-amber-500/10 text-muted-foreground hover:text-amber-500 transition-all duration-200"
                        title="Edit Worker"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(worker.id)}
                        className="p-1.5 rounded-lg border border-border hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all duration-200"
                        title="Delete Worker"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WorkerTable;
