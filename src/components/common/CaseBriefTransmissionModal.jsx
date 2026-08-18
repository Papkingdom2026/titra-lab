import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../utils/audio';
import { ShieldAlert, Check, Radio, User, FileText } from 'lucide-react';

export const CaseBriefTransmissionModal = () => {
  const { transmissionOpen, currentTransmission, closeTransmission } = useGameStore();

  if (!transmissionOpen || !currentTransmission) return null;

  const handleAccept = () => {
    sound.playSuccess();
    closeTransmission();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in no-print font-sans">
      <div className="relative w-full max-w-2xl glass-card rounded-2xl p-5 md:p-7 shadow-2xl border border-slate-700/80 space-y-4 text-slate-100">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-500/15 text-rose-400 border border-rose-500/30 rounded-xl">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-rose-400 tracking-wider uppercase">
                INCOMING SECURE TRANSMISSION
              </span>
              <h3 className="font-bold text-base md:text-lg text-white">
                National Food Safety Investigation Center (NFSIC)
              </h3>
            </div>
          </div>
          <div className="bg-rose-500/15 border border-rose-500/30 text-rose-300 px-2.5 py-0.5 rounded-lg text-xs font-semibold">
            PRIORITY : {currentTransmission.priority || 'URGENT'}
          </div>
        </div>

        {/* Transmission Metadata Table */}
        <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 space-y-1.5 text-xs md:text-sm">
          <div className="grid grid-cols-12 gap-2">
            <span className="col-span-3 text-slate-400 font-medium">FROM :</span>
            <span className="col-span-9 text-sky-400 font-bold flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-sky-400" /> {currentTransmission.from}
            </span>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <span className="col-span-3 text-slate-400 font-medium">CASE FILE :</span>
            <span className="col-span-9 text-amber-300 font-bold flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-amber-400" /> Case File 01 : The Vitamin Boost Investigation
            </span>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <span className="col-span-3 text-slate-400 font-medium">PHASE :</span>
            <span className="col-span-9 text-emerald-400 font-semibold">
              {currentTransmission.phaseName}
            </span>
          </div>
        </div>

        {/* Message Content */}
        <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800 text-xs md:text-sm leading-relaxed text-slate-200 space-y-1">
          <span className="text-[11px] font-mono text-sky-400 block font-bold uppercase tracking-wider">
            MESSAGE DIRECTIVE :
          </span>
          <p className="whitespace-pre-line leading-relaxed font-normal">{currentTransmission.message}</p>
        </div>

        {/* Accept Button */}
        <div className="flex items-center justify-end pt-1">
          <button
            onClick={handleAccept}
            className="w-full sm:w-auto btn-primary text-white font-bold px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>[ ACCEPT CASE DIRECTIVE ]</span>
          </button>
        </div>

      </div>
    </div>
  );
};
