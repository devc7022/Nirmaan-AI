import React, { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';

interface WorkerSearchProps {
  value: string;
  onSearchChange: (search: string) => void;
  placeholder?: string;
}

export const WorkerSearch: React.FC<WorkerSearchProps> = ({
  value,
  onSearchChange,
  placeholder = 'Search by name, worker number, phone...',
}) => {
  const [localValue, setLocalValue] = useState(value);

  // Sync state if parent value updates
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce search input to avoid redundant API queries
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(localValue);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [localValue, onSearchChange]);

  const handleClear = () => {
    setLocalValue('');
    onSearchChange('');
  };

  return (
    <div className="relative flex-1 min-w-[280px]">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4.5 w-4.5 text-muted-foreground" />
      </div>
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 pl-10 pr-10 border border-border bg-card/30 text-foreground text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-ring transition-all placeholder:text-muted-foreground"
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
          title="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default WorkerSearch;
