import React from 'react';
import { ConstructionSiteStatus } from '../types';
import { Button } from '@/components/ui/button';
import { FilterX } from 'lucide-react';

interface SiteFiltersProps {
  selectedStatus: ConstructionSiteStatus | '';
  selectedSupervisor?: string;
  onStatusChange: (status: ConstructionSiteStatus | '') => void;
  onSupervisorChange?: (supervisor: string) => void;
  onReset: () => void;
}

export const SiteFilters: React.FC<SiteFiltersProps> = ({
  selectedStatus,
  selectedSupervisor = '',
  onStatusChange,
  onSupervisorChange,
  onReset,
}) => {
  const isFiltered = !!selectedStatus || !!selectedSupervisor;

  return (
    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
      {/* Status Filter */}
      <div className="flex items-center gap-2">
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value as ConstructionSiteStatus | '')}
          className="h-11 px-3 border border-border bg-card/40 text-foreground rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
        >
          <option value="">All Statuses</option>
          <option value="PLANNED">Planned</option>
          <option value="ACTIVE">Active</option>
          <option value="COMPLETED">Completed</option>
          <option value="ON_HOLD">On Hold</option>
        </select>
      </div>

      {/* Supervisor Search/Filter */}
      {onSupervisorChange && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={selectedSupervisor}
            onChange={(e) => onSupervisorChange(e.target.value)}
            placeholder="Filter by supervisor..."
            className="h-11 px-3 border border-border bg-card/40 text-foreground rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      )}

      {/* Reset Button */}
      {isFiltered && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="h-11 px-3 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 font-medium rounded-xl"
        >
          <FilterX className="h-3.5 w-3.5" />
          Reset Filters
        </Button>
      )}
    </div>
  );
};

export default SiteFilters;
