import React, { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';

interface SiteSearchProps {
  value: string;
  onSearchChange: (search: string) => void;
  placeholder?: string;
}

export const SiteSearch: React.FC<SiteSearchProps> = ({
  value,
  onSearchChange,
  placeholder = 'Search by site name, address, supervisor...',
}) => {
  const [localValue, setLocalValue] = useState(value);

  // Sync state if parent value updates
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce search input
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
    <div className="relative flex items-center bg-card/30 border border-border px-3.5 rounded-xl shadow-sm h-11 w-full transition-all focus-within:ring-2 focus-within:ring-ring focus-within:border-ring">
      <Search className="h-4 w-4 text-muted-foreground shrink-0 mr-2.5" />
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="w-full h-full bg-transparent text-foreground text-sm focus:outline-none placeholder:text-muted-foreground/70"
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="p-1 text-muted-foreground hover:text-foreground transition-colors shrink-0 ml-1"
          title="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SiteSearch;
