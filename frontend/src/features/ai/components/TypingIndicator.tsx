'use client';

import React from 'react';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-3 animate-in fade-in duration-200">
      <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
        <Bot className="h-4 w-4" />
      </div>
      <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.3s]" />
        <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]" />
        <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" />
      </div>
    </div>
  );
};
