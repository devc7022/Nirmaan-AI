import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { AttendanceResponse } from '../types';
import { AttendanceStatusBadge } from './AttendanceStatusBadge';
import { Eye, Pencil, Trash2, Calendar, Building2, User, Clock, ArrowUpDown } from 'lucide-react';

interface AttendanceTableProps {
  attendanceList: AttendanceResponse[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  onSortChange?: (field: string) => void;
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({
  attendanceList,
  onView,
  onEdit,
  onDelete,
  sortField,
  sortOrder,
  onSortChange,
}) => {
  const handleSort = (field: string) => {
    if (onSortChange) {
      onSortChange(field);
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-card/40 backdrop-blur-sm shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {/* Worker Name Column */}
              <TableHead className="font-bold text-foreground cursor-pointer select-none" onClick={() => handleSort('workerName')}>
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Worker Name</span>
                  <ArrowUpDown className={`h-3 w-3 ${sortField === 'workerName' ? 'text-primary' : 'text-muted-foreground/40'}`} />
                </div>
              </TableHead>

              {/* Construction Site */}
              <TableHead className="font-bold text-foreground">
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Construction Site</span>
                </div>
              </TableHead>

              {/* Attendance Date Column */}
              <TableHead className="font-bold text-foreground cursor-pointer select-none" onClick={() => handleSort('attendanceDate')}>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Attendance Date</span>
                  <ArrowUpDown className={`h-3 w-3 ${sortField === 'attendanceDate' ? 'text-primary' : 'text-muted-foreground/40'}`} />
                </div>
              </TableHead>

              {/* Hours Worked Column */}
              <TableHead className="font-bold text-foreground text-center cursor-pointer select-none" onClick={() => handleSort('hoursWorked')}>
                <div className="flex items-center justify-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Hours Worked</span>
                  <ArrowUpDown className={`h-3 w-3 ${sortField === 'hoursWorked' ? 'text-primary' : 'text-muted-foreground/40'}`} />
                </div>
              </TableHead>

              {/* Status */}
              <TableHead className="font-bold text-foreground text-center">Status</TableHead>

              {/* Remarks */}
              <TableHead className="font-bold text-foreground">Remarks</TableHead>

              {/* Actions */}
              <TableHead className="font-bold text-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceList.map((record) => {
              const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                record.workerName
              )}&backgroundColor=3b82f6,10b981,f97316,8b5cf6`;

              return (
                <TableRow key={record.id} className="hover:bg-muted/30 transition-colors">
                  {/* Worker Name */}
                  <TableCell className="font-semibold text-foreground">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full overflow-hidden border border-border bg-muted shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={avatarUrl} alt={record.workerName} className="h-full w-full object-cover" />
                      </div>
                      <span className="truncate max-w-[160px]">{record.workerName}</span>
                    </div>
                  </TableCell>

                  {/* Construction Site */}
                  <TableCell className="font-medium text-foreground text-sm">
                    <span className="truncate max-w-[180px] block" title={record.siteName}>
                      {record.siteName}
                    </span>
                  </TableCell>

                  {/* Attendance Date */}
                  <TableCell className="text-xs font-mono text-muted-foreground">
                    {record.attendanceDate ? (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground/70" />
                        {new Date(record.attendanceDate).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    ) : (
                      '—'
                    )}
                  </TableCell>

                  {/* Hours Worked */}
                  <TableCell className="text-center font-mono font-bold text-foreground">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-muted/60 text-xs">
                      {record.hoursWorked} hrs
                    </div>
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell className="text-center">
                    <AttendanceStatusBadge present={record.present} />
                  </TableCell>

                  {/* Remarks */}
                  <TableCell className="max-w-[180px] truncate text-xs text-muted-foreground">
                    {record.remarks || <span className="italic text-muted-foreground/60">—</span>}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onView(record.id)}
                        className="p-1.5 rounded-lg border border-border hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-200"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onEdit(record.id)}
                        className="p-1.5 rounded-lg border border-border hover:bg-amber-500/10 text-muted-foreground hover:text-amber-500 transition-all duration-200"
                        title="Edit Record"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(record.id)}
                        className="p-1.5 rounded-lg border border-border hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all duration-200"
                        title="Delete Record"
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

export default AttendanceTable;
