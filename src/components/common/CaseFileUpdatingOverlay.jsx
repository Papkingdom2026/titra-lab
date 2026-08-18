import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { RefreshCw, CheckCircle2 } from 'lucide-react';

export const CaseFileUpdatingOverlay = () => {
  const { isTransitioning, transitionText } = useGameStore();

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md animate-fade-in no-print font-sans">
      <div className="text-center space-y-4 max-w-sm p-6 glass-card rounded-2xl border border-slate-700/80 shadow-2xl">
        <div className="relative inline-flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border-2 border-slate-700 border-t-sky-400 animate-spin" />
          <RefreshCw className="w-6 h-6 text-sky-400 absolute" />
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-lg text-white font-sans">
            {transitionText || "CASE FILE Updating..."}
          </h3>
          <p className="text-xs text-emerald-400 font-mono flex items-center justify-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Evidence Updated • Synchronizing Database
          </p>
        </div>

        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
          <div className="h-full bg-gradient-to-r from-sky-500 via-emerald-400 to-sky-500 w-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};
