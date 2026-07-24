import React from 'react';
import { useSiteOptions } from '../hooks/use-attendance';
import { Button } from '@/components/ui/button';
import { FilterX } from 'lucide-react';

interface AttendanceFiltersProps {
  selectedSiteId: string;
  selectedDate: string;
  selectedStatus: boolean | '';
  selectedSort: string;
  onSiteChange: (siteId: string) => void;
  onDateChange: (date: string) => void;
  onStatusChange: (status: boolean | '') => void;
  onSortChange: (sort: string) => void;
  onReset: () => void;
}

export const AttendanceFilters: React.FC<AttendanceFiltersProps> = ({
  selectedSiteId,
  selectedDate,
  selectedStatus,
  selectedSort,
  onSiteChange,
  onDateChange,
  onStatusChange,
  onSortChange,
  onReset,
}) => {
  const { data: sites } = useSiteOptions();

  const isFiltered = !!selectedSiteId || !!selectedDate || selectedStatus !== '' || !!selectedSort;

  return (
    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
      {/* Site Filter */}
      <div className="flex items-center gap-2">
        <select
          value={selectedSiteId}
          onChange={(e) => onSiteChange(e.target.value)}
          className="h-11 px-3 border border-border bg-card/40 text-foreground rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
        >
          <option value="">All Sites</option>
          {sites?.map((site) => (
            <option key={site.id} value={site.id}>
              {site.name}
            </option>
          ))}
        </select>
      </div>

      {/* Date Filter */}
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="h-11 px-3 border border-border bg-card/40 text-foreground rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Status Filter */}
      <div className="flex items-center gap-2">
        <select
          value={selectedStatus === '' ? '' : selectedStatus ? 'true' : 'false'}
          onChange={(e) => {
            const val = e.target.value;
            if (val === '') onStatusChange('');
            else onStatusChange(val === 'true');
          }}
          className="h-11 px-3 border border-border bg-card/40 text-foreground rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
        >
          <option value="">All Statuses</option>
          <option value="true">Present</option>
          <option value="false">Absent</option>
        </select>
      </div>

      {/* Sort Select */}
      <div className="flex items-center gap-2">
        <select
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="h-11 px-3 border border-border bg-card/40 text-foreground rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
        >
          <option value="">Sort By (Default)</option>
          <option value="attendanceDate,desc">Date (Newest First)</option>
          <option value="attendanceDate,asc">Date (Oldest First)</option>
          <option value="workerName,asc">Worker Name (A-Z)</option>
          <option value="workerName,desc">Worker Name (Z-A)</option>
          <option value="hoursWorked,desc">Hours Worked (High-Low)</option>
          <option value="hoursWorked,asc">Hours Worked (Low-High)</option>
        </select>
      </div>

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

export default AttendanceFilters;
