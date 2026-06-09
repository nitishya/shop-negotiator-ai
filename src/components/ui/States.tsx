import React from 'react';
import { Loader2, AlertCircle, Inbox } from 'lucide-react';

interface StateProps {
  title: string;
  message?: string;
  className?: string;
}

export function LoadingState({ title, message, className = '' }: StateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mb-4" />
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      {message && <p className="text-sm text-zinc-400 max-w-sm">{message}</p>}
    </div>
  );
}

export function ErrorState({ title, message, className = '' }: StateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-red-500/5 rounded-2xl border border-red-500/20 ${className}`}>
      <AlertCircle className="w-8 h-8 text-red-400 mb-4" />
      <h3 className="text-lg font-bold text-red-100 mb-2">{title}</h3>
      {message && <p className="text-sm text-red-300/80 max-w-sm">{message}</p>}
    </div>
  );
}

export function EmptyState({ title, message, className = '' }: StateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center glass-panel rounded-2xl border-dashed border-zinc-700 ${className}`}>
      <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
        <Inbox className="w-6 h-6 text-zinc-500" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      {message && <p className="text-sm text-zinc-400 max-w-sm">{message}</p>}
    </div>
  );
}
