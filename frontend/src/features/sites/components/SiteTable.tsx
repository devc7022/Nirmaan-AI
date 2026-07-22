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
import { SiteResponse, ConstructionSiteStatus } from '../types';
import { Eye, Pencil, Trash2, Building2, Calendar, Users, MapPin } from 'lucide-react';

interface SiteTableProps {
  sites: SiteResponse[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const getStatusBadgeVariant = (status: ConstructionSiteStatus) => {
  switch (status) {
    case 'ACTIVE':
      return { variant: 'success' as const, label: 'Active', className: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' };
    case 'PLANNED':
      return { variant: 'outline' as const, label: 'Planned', className: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30' };
    case 'COMPLETED':
      return { variant: 'secondary' as const, label: 'Completed', className: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30' };
    case 'ON_HOLD':
      return { variant: 'destructive' as const, label: 'On Hold', className: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30' };
    default:
      return { variant: 'outline' as const, label: status, className: '' };
  }
};

export const SiteTable: React.FC<SiteTableProps> = ({
  sites,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-card/40 backdrop-blur-sm shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-bold text-foreground">Site Name</TableHead>
              <TableHead className="font-bold text-foreground">Site Code</TableHead>
              <TableHead className="font-bold text-foreground">Address</TableHead>
              <TableHead className="font-bold text-foreground">Supervisor / Builder</TableHead>
              <TableHead className="font-bold text-foreground text-center">Total Workers</TableHead>
              <TableHead className="font-bold text-foreground text-center">Status</TableHead>
              <TableHead className="font-bold text-foreground">Start Date</TableHead>
              <TableHead className="font-bold text-foreground">End Date</TableHead>
              <TableHead className="font-bold text-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sites.map((site) => {
              const statusInfo = getStatusBadgeVariant(site.status);
              const siteCode = site.siteCode || `SITE-${site.id.substring(0, 6).toUpperCase()}`;
              const totalWorkersCount = site.totalWorkers ?? (site.workers ? site.workers.length : 0);
              const supervisorText = site.supervisor || site.builderName || site.clientName || 'N/A';

              return (
                <TableRow key={site.id} className="hover:bg-muted/30 transition-colors">
                  {/* Site Name */}
                  <TableCell className="font-semibold text-foreground">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <span className="truncate max-w-[180px]">{site.name}</span>
                    </div>
                  </TableCell>

                  {/* Site Code */}
                  <TableCell className="font-mono text-xs font-semibold text-muted-foreground">
                    {siteCode}
                  </TableCell>

                  {/* Address */}
                  <TableCell className="max-w-[200px] truncate text-muted-foreground text-xs">
                    <div className="flex items-center gap-1.5" title={site.address}>
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                      <span className="truncate">{site.address}</span>
                    </div>
                  </TableCell>

                  {/* Supervisor / Builder */}
                  <TableCell className="text-muted-foreground text-sm font-medium">
                    {supervisorText}
                  </TableCell>

                  {/* Total Workers */}
                  <TableCell className="text-center font-mono font-semibold text-foreground">
                    <div className="inline-flex items-center justify-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      {totalWorkersCount}
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="text-center">
                    <Badge
                      variant={statusInfo.variant}
                      className={`px-2.5 py-0.5 text-xs font-semibold border ${statusInfo.className}`}
                    >
                      {statusInfo.label}
                    </Badge>
                  </TableCell>

                  {/* Start Date */}
                  <TableCell className="text-xs font-mono text-muted-foreground">
                    {site.startDate ? (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground/60" />
                        {new Date(site.startDate).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    ) : (
                      '—'
                    )}
                  </TableCell>

                  {/* End Date */}
                  <TableCell className="text-xs font-mono text-muted-foreground">
                    {site.endDate ? (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground/60" />
                        {new Date(site.endDate).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    ) : (
                      '—'
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onView(site.id)}
                        className="p-1.5 rounded-lg border border-border hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-200"
                        title="View Site Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onEdit(site.id)}
                        className="p-1.5 rounded-lg border border-border hover:bg-amber-500/10 text-muted-foreground hover:text-amber-500 transition-all duration-200"
                        title="Edit Site"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(site.id)}
                        className="p-1.5 rounded-lg border border-border hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all duration-200"
                        title="Delete Site"
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

export default SiteTable;
