import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../utils/audio';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  CheckCircle2, 
  Lightbulb,
  Lock,
  Bookmark
} from 'lucide-react';

export const AdaptiveHintModal = () => {
  const { 
    isHintModalOpen, 
    closeHintModal, 
    currentHintLevel, 
    setHintLevel,
    getHintContent,
    notebookEntries,
    addXp
  } = useGameStore();

  const [activeModalTab, setActiveModalTab] = useState('hints'); // 'hints' or 'notebook'

  if (!isHintModalOpen) return null;

  const hintContent = getHintContent();

  const handleNextLevel = () => {
    sound.playClick();
    if (currentHintLevel < 6) {
      const nextLvl = currentHintLevel + 1;
      setHintLevel(nextLvl);
      addXp(-10); // deduct 10 XP for using deeper scaffolding hints
    }
  };

  const handlePrevLevel = () => {
    sound.playClick();
    if (currentHintLevel > 1) {
      setHintLevel(currentHintLevel - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in no-print font-sans">
      <div className="relative w-full max-w-2xl glass-card rounded-2xl p-5 md:p-7 shadow-2xl border border-slate-700/80 space-y-4 text-slate-100">
        
        {/* Header & Main Modal Tab Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-sky-500/15 text-sky-400 rounded-xl border border-sky-500/30">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg text-white">
                ศูนย์ช่วยเหลือทางนิติเคมี (Forensic Assistance)
              </h3>
              <p className="text-xs text-slate-400">แนะแนวโดย Dr. Maya (Senior Analyst)</p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              closeHintModal();
            }}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors self-end sm:self-auto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Switcher: Hints vs Notebook */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => {
              sound.playClick();
              setActiveModalTab('hints');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeModalTab === 'hints'
                ? 'bg-sky-500 text-slate-950 shadow-sm'
                : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>💡 คำแนะนำช่วยเหลือ (Scaffolding Hints)</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveModalTab('notebook');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeModalTab === 'notebook'
                ? 'bg-sky-500 text-slate-950 shadow-sm'
                : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>📖 สมุดบันทึกเคมี & สูตร (Lab Notebook)</span>
          </button>
        </div>

        {/* TAB 1: ADAPTIVE HINTS */}
        {activeModalTab === 'hints' && (
          <div className="space-y-4 animate-fade-in">
            
            {/* Level Stepper Pills */}
            <div className="grid grid-cols-6 gap-1.5">
              {[1, 2, 3, 4, 5, 6].map((lvl) => {
                const isLocked = lvl > currentHintLevel && lvl === 6 && currentHintLevel < 5;
                const isCurrent = lvl === currentHintLevel;

                return (
                  <button
                    key={lvl}
                    disabled={isLocked}
                    onClick={() => {
                      sound.playClick();
                      if (!isLocked) setHintLevel(lvl);
                    }}
                    className={`py-2 rounded-xl text-xs font-semibold font-mono transition-all flex flex-col items-center gap-0.5 ${
                      isCurrent
                        ? 'bg-sky-500 text-slate-950 shadow-sm'
                        : isLocked
                          ? 'bg-slate-950/40 text-slate-600 border border-slate-900 cursor-not-allowed'
                          : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span>Lvl {lvl}</span>
                    {isLocked ? <Lock className="w-2.5 h-2.5 text-slate-600" /> : null}
                  </button>
                );
              })}
            </div>

            {/* Hint Content Box */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-sky-400">{hintContent.title}</h4>
                <span className="text-[11px] font-semibold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                  ระดับการช่วยเหลือที่ {currentHintLevel} / 6
                </span>
              </div>
              <p className="text-[11px] text-slate-400 italic">{hintContent.desc}</p>
              <div className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800 text-xs md:text-sm text-slate-200 leading-relaxed font-normal">
                {hintContent.text}
              </div>
            </div>

            {/* Action Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                {currentHintLevel > 1 && (
                  <button
                    onClick={handlePrevLevel}
                    className="bg-slate-900 hover:bg-slate-800 text-slate-200 font-medium px-3 py-1.5 rounded-xl flex items-center gap-1 text-xs border border-slate-700 transition-all"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>ระดับก่อนหน้า</span>
                  </button>
                )}
              </div>

              <div>
                {currentHintLevel < 6 ? (
                  <button
                    onClick={handleNextLevel}
                    className="btn-primary text-white font-semibold px-4 py-1.5 rounded-xl flex items-center gap-1.5 text-xs shadow-sm"
                  >
                    <span>ระดับถัดไป (ระดับ {currentHintLevel + 1}) [-10 XP]</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      sound.playSuccess();
                      closeHintModal();
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-1.5 rounded-xl flex items-center gap-1.5 text-xs shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>เข้าใจแล้ว ลองทำด้วยตัวเอง!</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: NOTEBOOK & CHEAT SHEET */}
        {activeModalTab === 'notebook' && (
          <div className="space-y-3 animate-fade-in max-h-[380px] overflow-y-auto pr-1">
            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <h4 className="font-bold text-xs text-sky-400 flex items-center gap-1.5">
                <Bookmark className="w-4 h-4" />
                <span>สูตรและทฤษฎีอ้างอิงด่วน</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="font-semibold text-amber-300 block text-[11px]">สูตรการปรับมาตรฐาน:</span>
                  <code className="font-mono text-sky-300 text-[11px]">M_NaOH = (g_KHP/204.22) × (1000/V_NaOH)</code>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="font-semibold text-amber-300 block text-[11px]">สูตรสะเทินกรด-เบส:</span>
                  <code className="font-mono text-sky-300 text-[11px]">C₁V₁ = C₂V₂</code>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-xs text-white">รายการบันทึกข้อสังเกตประจำคดี ({notebookEntries.length} รายการ):</h4>
              {notebookEntries.map((e) => (
                <div key={e.id} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sky-400">{e.title}</span>
                    <span className="text-slate-500 font-mono text-[10px]">{e.timestamp}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-normal">{e.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
