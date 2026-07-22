import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SiteResponse } from '../types';
import { getStatusBadgeVariant } from './SiteTable';
import { Building2, MapPin, Calendar, Users, Eye, Pencil, Trash2, UserCheck } from 'lucide-react';

interface SiteCardProps {
  site: SiteResponse;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const SiteCard: React.FC<SiteCardProps> = ({
  site,
  onView,
  onEdit,
  onDelete,
}) => {
  const statusInfo = getStatusBadgeVariant(site.status);
  const siteCode = site.siteCode || `SITE-${site.id.substring(0, 6).toUpperCase()}`;
  const totalWorkersCount = site.totalWorkers ?? (site.workers ? site.workers.length : 0);
  const supervisorText = site.supervisor || site.builderName || site.clientName || 'N/A';

  return (
    <Card className="border border-border/80 bg-card/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between">
      <CardHeader className="p-4 pb-2 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-foreground text-base truncate" title={site.name}>
                {site.name}
              </h3>
              <p className="text-[11px] font-mono font-semibold text-muted-foreground">
                {siteCode}
              </p>
            </div>
          </div>
          <Badge
            variant={statusInfo.variant}
            className={`px-2 py-0.5 text-xs font-semibold shrink-0 border ${statusInfo.className}`}
          >
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-1 space-y-3 text-xs">
        {/* Address */}
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/70" />
          <span className="truncate">{site.address}</span>
        </div>

        {/* Supervisor */}
        <div className="flex items-center justify-between pt-1 border-t border-border/40">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <UserCheck className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
            <span>Supervisor:</span>
          </div>
          <span className="font-semibold text-foreground truncate max-w-[130px]">{supervisorText}</span>
        </div>

        {/* Total Workers */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
            <span>Total Workers:</span>
          </div>
          <span className="font-mono font-bold text-foreground bg-muted px-2 py-0.5 rounded-full text-xs">
            {totalWorkersCount}
          </span>
        </div>

        {/* Start / End Dates */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border/40 text-[11px]">
          <div>
            <span className="text-muted-foreground block text-[10px]">Start Date</span>
            <span className="font-mono font-medium text-foreground flex items-center gap-1 mt-0.5">
              <Calendar className="h-3 w-3 text-muted-foreground/60" />
              {site.startDate
                ? new Date(site.startDate).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: '2-digit',
                  })
                : '—'}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground block text-[10px]">End Date</span>
            <span className="font-mono font-medium text-foreground flex items-center gap-1 mt-0.5">
              <Calendar className="h-3 w-3 text-muted-foreground/60" />
              {site.endDate
                ? new Date(site.endDate).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: '2-digit',
                  })
                : '—'}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-3 bg-muted/20 border-t border-border/40 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView(site.id)}
          className="flex-1 text-xs gap-1 h-8 font-medium"
        >
          <Eye className="h-3.5 w-3.5" />
          View
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(site.id)}
          className="text-xs gap-1 h-8 font-medium hover:text-amber-500 hover:border-amber-500/50"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(site.id)}
          className="text-xs gap-1 h-8 font-medium hover:text-destructive hover:border-destructive/50"
        >
          <Trash2 className="h-3.5 w-3.5 text-destructive" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SiteCard;
