import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { StudentProfileModal } from '../common/StudentProfileModal';
import { GuidedTourModal } from '../common/GuidedTourModal';
import { sound } from '../../utils/audio';
import { 
  FlaskConical, 
  BookOpen, 
  Award, 
  HelpCircle, 
  RotateCcw,
  User,
  Edit3,
  Compass,
  Volume2,
  VolumeX,
  Sparkles,
  TrendingUp,
  TrendingDown,
  FileText
} from 'lucide-react';

export const Header = () => {
  const { 
    phase, 
    activeWorkstation, 
    setActiveWorkstation, 
    xp, 
    xpDelta,
    openHintModal, 
    resetGame,
    unlockedBadges,
    studentInfo,
    isStudentInfoSubmitted
  } = useGameStore();

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showXpDelta, setShowXpDelta] = useState(false);

  useEffect(() => {
    if (xpDelta) {
      setShowXpDelta(true);
      const timer = setTimeout(() => setShowXpDelta(false), 2400);
      return () => clearTimeout(timer);
    }
  }, [xpDelta?.key]);

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    sound.setMuted(nextState);
    if (!nextState) sound.playClick();
  };

  const progressPercentage = Math.round((phase / 5) * 100);

  return (
    <>
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-40 px-4 py-2.5 shadow-md no-print font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div 
              onClick={() => {
                sound.playClick();
                setActiveWorkstation('casefile');
              }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white shadow-md shadow-sky-500/20 shrink-0 group-hover:scale-105 transition-transform">
                <FlaskConical className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-lg md:text-xl text-white tracking-wide">
                    TITRA <span className="text-sky-400 text-xs px-2 py-0.5 rounded-md bg-sky-500/10 border border-sky-500/30 font-mono font-bold">LABS</span>
                  </h1>
                </div>
                <p className="text-[11px] md:text-xs font-medium text-slate-400">
                  การสืบสวนนิติวิทยาศาสตร์เคมี • NFSIC-2045
                </p>
              </div>
            </div>

            {/* Mobile Progress Pill */}
            <div className="md:hidden flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 text-xs">
              <span className="text-sky-400 font-bold">เฟส {phase}/5</span>
            </div>
          </div>

          {/* Center Progress Line (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 bg-slate-950/60 px-4 py-1.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-300 font-medium">ความคืบหน้าคดี:</span>
            <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">{progressPercentage}%</span>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5 flex-wrap justify-center md:justify-end">
            
            {/* Guided Tour Button */}
            <button
              onClick={() => {
                sound.playClick();
                setTourModalOpen(true);
              }}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 px-3 py-1.5 rounded-xl text-xs text-slate-300 hover:text-white font-medium transition-all"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>สอนใช้งาน (Tour)</span>
            </button>

            {/* FULL USER MANUAL BUTTON */}
            <button
              onClick={() => {
                sound.playClick();
                setActiveWorkstation('manual');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                activeWorkstation === 'manual'
                  ? 'bg-sky-400 text-slate-950 ring-2 ring-sky-300'
                  : 'bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>📖 คู่มือฉบับเต็ม</span>
            </button>

            {/* Student Profile Badge with Scientist Avatar */}
            <button
              onClick={() => {
                sound.playClick();
                setProfileModalOpen(true);
              }}
              className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-750 border border-slate-700 px-3 py-1.5 rounded-xl text-xs text-slate-200 hover:text-white font-medium transition-all"
            >
              <span className="text-base">{studentInfo.avatar || '👨‍🔬'}</span>
              <span className="truncate max-w-[120px] sm:max-w-[160px]">
                {isStudentInfoSubmitted && studentInfo.name 
                  ? `Analyst ${studentInfo.name}`
                  : 'ระบุข้อมูลผู้สืบสวน'}
              </span>
              <Edit3 className="w-3 h-3 text-slate-400" />
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition-all ${
                isMuted 
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' 
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
              title={isMuted ? "เปิดเสียงเอฟเฟกต์" : "ปิดเสียงเอฟเฟกต์"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* PROMINENT XP BADGE WITH FLOATING DELTA NOTIFICATION */}
            <div className="relative">
              <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/15 to-yellow-500/15 border border-amber-500/40 px-3.5 py-1.5 rounded-xl text-amber-300 font-bold text-sm shadow-sm">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-mono text-base tracking-wide">{xp} XP</span>
              </div>

              {/* Animated Floating XP Delta */}
              {showXpDelta && xpDelta && (
                <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-md text-xs font-bold font-mono shadow-md animate-bounce z-50 flex items-center gap-1 whitespace-nowrap ${
                  xpDelta.type === 'add'
                    ? 'bg-emerald-500 text-slate-950 border border-emerald-400'
                    : 'bg-rose-500 text-white border border-rose-400'
                }`}>
                  {xpDelta.type === 'add' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{xpDelta.type === 'add' ? `+${xpDelta.amount} XP` : `-${xpDelta.amount} XP`}</span>
                </div>
              )}
            </div>

            {/* Hint System Button */}
            <button
              onClick={() => {
                sound.playClick();
                openHintModal();
              }}
              className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold px-3.5 py-1.5 rounded-xl text-xs shadow-sm transition-all"
            >
              <HelpCircle className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>คำแนะนำ</span>
            </button>

            {/* Reset Button */}
            <button
              onClick={() => {
                sound.playClick();
                if (window.confirm("คุณต้องการรีเซ็ตความคืบหน้าของเกมเพื่อเริ่มใหม่หรือไม่?")) {
                  resetGame();
                }
              }}
              className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg transition-all"
              title="รีเซ็ตเกม"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

          </div>
        </div>
      </header>

      <StudentProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

      <GuidedTourModal
        isOpen={tourModalOpen}
        onClose={() => setTourModalOpen(false)}
      />
    </>
  );
};
