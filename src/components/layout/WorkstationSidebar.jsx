import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../utils/audio';
import { 
  ShieldAlert, 
  FlaskConical, 
  Pipette, 
  Calculator, 
  CheckCircle2, 
  BookOpen, 
  Lock, 
  Sparkles,
  ChevronRight,
  Award,
  FileText
} from 'lucide-react';

export const WorkstationSidebar = () => {
  const { 
    phase, 
    activeWorkstation, 
    setActiveWorkstation,
    notebookEntries,
    isPhase5Complete
  } = useGameStore();

  const handleNavClick = (wsId, isUnlocked) => {
    if (!isUnlocked) {
      sound.playError();
      return;
    }
    sound.playClick();
    setActiveWorkstation(wsId);
  };

  const workstations = [
    {
      id: 'casefile',
      stepNum: '1',
      title: 'ไฟล์คดี (Case File)',
      subtitle: 'ตรวจฉลาก & เลือกอุปกรณ์',
      icon: ShieldAlert,
      minPhase: 1
    },
    {
      id: 'evidence',
      stepNum: '2',
      title: 'สารมาตรฐาน (Standard)',
      subtitle: 'ปรับมาตรฐาน NaOH ด้วย KHP',
      icon: FlaskConical,
      minPhase: 2
    },
    {
      id: 'analysis',
      stepNum: '3',
      title: 'การไทเทรต (Analysis)',
      subtitle: 'ไทเทรตเสมือนจริง 3 Trials',
      icon: Pipette,
      minPhase: 3
    },
    {
      id: 'calculation',
      stepNum: '4',
      title: 'การคำนวณ (Calculation)',
      subtitle: 'ตัด Outlier & สูตร C1V1=C2V2',
      icon: Calculator,
      minPhase: 4
    },
    {
      id: 'report',
      stepNum: '5',
      title: 'รายงาน CER (Verdict)',
      subtitle: 'สรุปผลคดีเชิงประจักษ์',
      icon: CheckCircle2,
      minPhase: 5
    },
    {
      id: 'certificate',
      stepNum: '🏆',
      title: 'เกียรติบัตร (Certificate)',
      subtitle: 'รับใบประกาศ & สรุปดาว ⭐',
      icon: Award,
      isSpecial: true,
      unlocked: isPhase5Complete
    }
  ];

  return (
    <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-4 font-sans no-print">
      
      {/* 5-Phase + Certificate Navigation Stack */}
      <div className="glass-card rounded-2xl p-3 md:p-4 space-y-2 border border-slate-700/60 shadow-lg">
        <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-slate-800">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>เวิร์กสเตชันการสืบสวน</span>
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
            {isPhase5Complete ? 'ปิดคดีสมบูรณ์' : `เฟส ${phase}/5`}
          </span>
        </div>

        <div className="space-y-1.5 pt-1">
          {workstations.map((ws) => {
            const Icon = ws.icon;
            const isUnlocked = ws.isSpecial ? ws.unlocked : (phase >= ws.minPhase);
            const isActive = activeWorkstation === ws.id;

            return (
              <button
                key={ws.id}
                onClick={() => handleNavClick(ws.id, isUnlocked)}
                disabled={!isUnlocked}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group ${
                  isActive
                    ? ws.isSpecial 
                      ? 'bg-amber-500/25 border-2 border-amber-400 text-white shadow-md'
                      : 'bg-sky-500/20 border border-sky-500/60 text-white shadow-md'
                    : isUnlocked
                      ? ws.isSpecial
                        ? 'bg-amber-500/15 border border-amber-500/40 text-amber-200 hover:bg-amber-500/25'
                        : 'bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 text-slate-200 hover:text-white'
                      : 'bg-slate-950/40 border border-slate-900 text-slate-500 cursor-not-allowed opacity-60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold ${
                    isActive 
                      ? ws.isSpecial ? 'bg-amber-400 text-slate-950' : 'bg-sky-500 text-slate-950' 
                      : isUnlocked 
                        ? ws.isSpecial ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-sky-400 group-hover:bg-sky-500/20' 
                        : 'bg-slate-900 text-slate-600'
                  }`}>
                    {isUnlocked ? <Icon className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </div>

                  <div className="truncate">
                    <p className={`text-sm font-semibold truncate ${
                      isActive 
                        ? ws.isSpecial ? 'text-amber-300 font-extrabold' : 'text-sky-300 font-bold' 
                        : isUnlocked 
                          ? ws.isSpecial ? 'text-amber-200 font-bold' : 'text-slate-200' 
                          : 'text-slate-500'
                    }`}>
                      {ws.title}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {isUnlocked ? ws.subtitle : ws.isSpecial ? '🔒 รอยื่นรายงาน CER' : `🔒 ต้องผ่านด่านที่ ${ws.minPhase - 1} ก่อน`}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 ml-1">
                  {isActive ? (
                    <ChevronRight className="w-4 h-4 text-sky-400" />
                  ) : isUnlocked ? (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${ws.isSpecial ? 'bg-amber-500/20 text-amber-300 border-amber-400/40' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                      {ws.isSpecial ? '⭐ พร้อมรับ' : '✓ ปลดล็อก'}
                    </span>
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STANDOUT VIBRANT LAB NOTEBOOK BUTTON */}
      <button
        onClick={() => {
          sound.playClick();
          setActiveWorkstation('notebook');
        }}
        className={`w-full text-left p-4 rounded-2xl btn-notebook transition-all flex items-center justify-between shadow-lg group ${
          activeWorkstation === 'notebook' ? 'ring-2 ring-amber-300' : ''
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-950/20 flex items-center justify-center text-slate-950 shrink-0">
            <BookOpen className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider opacity-80 block">
              FORENSIC CHEAT SHEET
            </span>
            <h4 className="font-bold text-base text-slate-950 leading-tight">
              📖 สมุดบันทึกเคมี & สูตร
            </h4>
          </div>
        </div>

        <span className="bg-slate-950 text-amber-300 px-2.5 py-1 rounded-lg text-xs font-mono font-bold shrink-0">
          {notebookEntries.length} บันทึก
        </span>
      </button>

      {/* FULL USER MANUAL PROMINENT BUTTON */}
      <button
        onClick={() => {
          sound.playClick();
          setActiveWorkstation('manual');
        }}
        className="w-full text-left p-3.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-sky-400 text-slate-900 transition-all flex items-center justify-between shadow-md hover:scale-[1.02] cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-sky-700 block tracking-wider">
              OFFICIAL MANUAL
            </span>
            <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
              📑 คู่มือการใช้งานฉบับเต็ม
            </h4>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-sky-600 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Case File Status Card */}
      <div className="glass-card-subtle rounded-2xl p-4 border border-slate-800 space-y-2 text-xs text-slate-300 hidden lg:block">
        <p className="font-semibold text-slate-200">📌 บันทึกข้อมูลคดี:</p>
        <p className="text-slate-400 leading-relaxed">
          Vitamin Boost (ขนาด 250 mL) • คดีหมายเลข Case File 01 • ศูนย์วิเคราะห์อาหารแห่งชาติ NFSIC
        </p>
      </div>

    </aside>
  );
};
