import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Radio, ShieldAlert, ArrowRight, X } from 'lucide-react';

export const IncomingTransmissionModal = () => {
  const { transmissionModalOpen, transmissionContent, closeTransmission } = useGameStore();

  if (!transmissionModalOpen || !transmissionContent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel-glow rounded-2xl overflow-hidden border-2 border-cyan-brand/50 p-6 shadow-2xl">
        
        {/* Header decoration */}
        <div className="flex items-center justify-between border-b border-cyan-brand/30 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-brand/20 text-cyan-brand animate-pulse">
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-light bg-cyan-brand/10 px-2 py-0.5 rounded border border-cyan-brand/30">
                SECURE TRANSMISSION
              </span>
              <h3 className="font-bold text-base text-white mt-0.5">{transmissionContent.title}</h3>
            </div>
          </div>
          <button 
            onClick={closeTransmission}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sender Info */}
        <div className="flex items-center gap-2 mb-4 bg-navy-900/60 p-3 rounded-lg border border-cyan-brand/10">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <p className="text-xs text-slate-400">ผู้ส่งข่าวกรอง:</p>
            <p className="text-xs font-semibold text-cyan-light">{transmissionContent.sender}</p>
          </div>
        </div>

        {/* Message Content */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-slate-200 text-sm leading-relaxed mb-6 font-sans">
          <p className="indent-4">{transmissionContent.message}</p>
        </div>

        {/* Action Button */}
        <button
          onClick={closeTransmission}
          className="w-full cyber-button text-navy-950 font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg shadow-cyan-brand/30"
        >
          <span>รับทราบและเข้าสู่ปฏิบัติการ</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
