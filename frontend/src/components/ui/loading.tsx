import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  fullScreen?: boolean;
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ fullScreen, message = 'Loading...' }) => {
  const containerClass = fullScreen
    ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm'
    : 'flex flex-col items-center justify-center p-8';

  return (
    <div className={containerClass}>
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="mt-4 text-sm font-medium text-muted-foreground">{message}</p>
    </div>
  );
};
