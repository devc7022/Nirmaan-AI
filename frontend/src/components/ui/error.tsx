import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorProps {
  message?: string;
  reset?: () => void;
}

export const Error: React.FC<ErrorProps> = ({
  message = 'An unexpected error occurred. Please try again.',
  reset
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-destructive/10 rounded-xl border border-destructive/20 max-w-md mx-auto">
      <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
      <h3 className="text-lg font-semibold text-destructive mb-2">Error Occurred</h3>
      <p className="text-sm text-muted-foreground mb-6">{message}</p>
      {reset && (
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-all font-medium text-sm shadow-sm"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </button>
      )}
    </div>
  );
};
