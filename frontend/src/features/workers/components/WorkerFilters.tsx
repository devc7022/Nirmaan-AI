import React from 'react';
import { useSites } from '../hooks/use-workers';
import { WorkerStatus } from '../types';
import { RefreshCw, Filter } from 'lucide-react';

interface WorkerFiltersProps {
  selectedSkill: string;
  selectedSiteId: string;
  selectedStatus: WorkerStatus | '';
  onSkillChange: (skill: string) => void;
  onSiteChange: (siteId: string) => void;
  onStatusChange: (status: WorkerStatus | '') => void;
  onReset: () => void;
}

export const WorkerFilters: React.FC<WorkerFiltersProps> = ({
  selectedSkill,
  selectedSiteId,
  selectedStatus,
  onSkillChange,
  onSiteChange,
  onStatusChange,
  onReset,
}) => {
  const { data: sites, isLoading: isLoadingSites } = useSites();

  const skillOptions = [
    'Masonry',
    'Plumbing',
    'Carpentry',
    'Electrical',
    'Welding',
    'Painting',
    'Scaffolding',
    'Laboring',
  ];

  const hasActiveFilters = selectedSkill !== '' || selectedSiteId !== '' || selectedStatus !== '';

  return (
    <div className="flex flex-wrap items-center gap-4 bg-card/30 border border-border p-4 rounded-xl shadow-sm">
      <div className="flex items-center gap-2 text-muted-foreground shrink-0 text-sm font-semibold">
        <Filter className="h-4 w-4 text-primary" />
        <span>Filters:</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 min-w-[240px]">
        {/* Skill Filter */}
        <select
          value={selectedSkill}
          onChange={(e) => onSkillChange(e.target.value)}
          className="h-9 px-3 border border-border bg-card text-foreground rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
        >
          <option value="">All Skills</option>
          {skillOptions.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>

        {/* Site Filter */}
        <select
          value={selectedSiteId}
          onChange={(e) => onSiteChange(e.target.value)}
          disabled={isLoadingSites}
          className="h-9 px-3 border border-border bg-card text-foreground rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer disabled:opacity-55"
        >
          <option value="">All Sites</option>
          {sites?.map((site) => (
            <option key={site.id} value={site.id}>
              {site.name}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value as WorkerStatus | '')}
          className="h-9 px-3 border border-border bg-card text-foreground rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
        >
          <option value="">All Statuses</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>
      </div>

      {/* Reset button */}
      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-1.5 h-9 px-4 text-xs font-semibold border border-border hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg transition-all"
          title="Clear Filters"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Clear
        </button>
      )}
    </div>
  );
};

export default WorkerFilters;
