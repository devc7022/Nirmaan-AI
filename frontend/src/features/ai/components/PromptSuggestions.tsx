'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface PromptSuggestionsProps {
  suggestions: string[];
  onSelectSuggestion: (prompt: string) => void;
  disabled?: boolean;
}

export const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({
  suggestions,
  onSelectSuggestion,
  disabled = false,
}) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground px-1">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        <span>Suggested Prompts:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            disabled={disabled}
            onClick={() => onSelectSuggestion(prompt)}
            className="text-xs px-3.5 py-2 rounded-full bg-muted/60 border border-border/60 hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all duration-200 text-left font-medium disabled:opacity-50 disabled:pointer-events-none shadow-sm"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};
