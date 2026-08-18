import React, { useState, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { PRIMARY_STANDARD_OPTIONS } from '../../data/chemistryData';
import { CharacterDialogueCard } from '../common/CharacterDialogueCard';
import { sound } from '../../utils/audio';
import {
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  FileSpreadsheet,
  Zap,
  Scale,
  Lock
} from 'lucide-react';

export const EvidenceWorkstation = () => {
  const {
    selectedPrimaryStandard,
    setSelectedPrimaryStandard,
    submitPhase2,
    isPhase2Complete,
    triggerPhaseTransition,
    openHintModal
  } = useGameStore();

  const [selectedStd, setSelectedStd] = useState(selectedPrimaryStandard || null);
  const [feedback, setFeedback] = useState(null);
  const [activeTab, setActiveTab] = useState('comparison');
  const feedbackRef = useRef(null);

  const externalLabs = [
    { name: 'Lab Alpha (ภายนอก A)', result: 'Vitamin C = 0.500 g/250mL (ต่ำกว่าฉลาก 50%)', status: 'unreliable', reason: 'ใช้ NaOH สดที่ชั่งโดยตรงโดยไม่ปรับมาตรฐาน (Unstandardized NaOH)' },
    { name: 'Lab Beta (ภายนอก B)', result: 'Vitamin C = 1.020 g/250mL (ผ่านมาตรฐาน)', status: 'unreliable', reason: 'ใช้ NaOH ที่ตั้งทิ้งไว้นานจนดูด CO2 ในอากาศ ความเข้มข้นเปลี่ยน' },
    { name: 'Lab Gamma (ภายนอก C)', result: 'Vitamin C = 1.450 g/250mL (เกินมาตรฐาน)', status: 'unreliable', reason: 'ใช้อินดิเคเตอร์ผิดชนิด และอ่านปริมาตรบิวเรตต์คลาดเคลื่อน' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playClick();
    if (!selectedStd) {
      setFeedback({
        success: false,
        message: "โปรดคลิกเลือกสารมาตรฐานปฐมภูมิ 1 ชนิดก่อนกดยืนยัน"
      });
      sound.playError();
      setTimeout(() => {
        feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    }

    const res = submitPhase2(selectedStd);
    setFeedback(res);
    if (res.success) {
      sound.playPhaseUnlock();
    } else {
      sound.playError();
    }
    setTimeout(() => {
      feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleNextPhase = () => {
    sound.playClick();
    triggerPhaseTransition(3, 'analysis', 'CASE FILE Updating... Laboratory Analysis Unlocked');
  };

  return (
    <div className="space-y-5 pb-10 font-sans">

      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-5 md:p-6 border border-slate-700/70">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              CASE PHASE 2 : EVIDENCE COLLECTION & STANDARDIZATION
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white font-sans mt-1.5">
              การปรับมาตรฐานสารละลาย NaOH (Standardization of NaOH)
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 font-normal">
              สร้างข้อมูลอ้างอิงที่เชื่อถือได้ (Reliable Reference Data) ด้วยสารมาตรฐานปฐมภูมิ (Primary Standard) ก่อนไทเทรตตัวอย่างจริง
            </p>
          </div>
          {isPhase2Complete && (
            <div className="card-success px-4 py-2 rounded-xl text-emerald-300 flex items-center gap-2 text-xs md:text-sm font-semibold shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>ความเข้มข้นอ้างอิง NaOH = 0.1000 M</span>
            </div>
          )}
        </div>
      </div>

      {/* Character Dialogue Chat Box */}
      <CharacterDialogueCard
        characterId="director"
        title="ข้อสั่งการจาก Director Alan"
        text="ก่อนที่เราจะตรวจผลิตภัณฑ์ Vitamin Boost เราต้องมั่นใจก่อนว่าสารละลายเบส NaOH ของเรามีความเข้มข้นอ้างอิงที่แม่นยำแท้จริง! เพราะผลแล็บภายนอก 3 แห่งที่ส่งมาขัดแย้งกัน ล้วนเกิดจากการใช้ NaOH ที่ไม่ได้ปรับมาตรฐาน!"
      />

      {/* Locked Status Banner if Phase 2 is already completed */}
      {isPhase2Complete && (
        <div className="card-success p-3.5 rounded-xl flex items-center justify-between text-xs md:text-sm text-emerald-300 font-semibold animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>✓ ผ่านด่านที่ 2 แล้ว (โหมดดูข้อมูลย้อนหลัง - ไม่สามารถแก้ไขได้)</span>
          </div>
          <span className="text-[11px] text-slate-400 font-normal hidden sm:inline">
            NaOH ถูกปรับมาตรฐานเป็น 0.1000 M เรียบร้อยแล้ว
          </span>
        </div>
      )}

      {/* Activity Sub-tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('comparison');
          }}
          className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${activeTab === 'comparison'
              ? 'bg-sky-500 text-slate-950 shadow-sm'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
        >
          1. เปรียบเทียบผลแล็บ 3 แห่ง
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('primary_std');
          }}
          className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${activeTab === 'primary_std'
              ? 'bg-sky-500 text-slate-950 shadow-sm'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
        >
          2. เลือกสารมาตรฐานปฐมภูมิ
        </button>
      </div>

      {/* Activity 1: Evidence Comparison */}
      {activeTab === 'comparison' && (
        <div className="glass-card rounded-2xl p-5 md:p-6 space-y-4 border border-slate-700/70 animate-fade-in">
          <h3 className="font-bold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-2.5">
            <FileSpreadsheet className="w-5 h-5 text-sky-400" />
            <span>Activity 1: Evidence Comparison (รายงานผลการวิเคราะห์จากห้องปฏิบัติการภายนอก 3 แห่ง)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {externalLabs.map((lab, idx) => (
              <div key={idx} className="bg-slate-900/80 p-4 rounded-xl border border-rose-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-rose-300">{lab.name}</h4>
                  <span className="text-[10px] bg-rose-500/15 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30 font-semibold">
                    ⚠️ ไม่น่าเชื่อถือ
                  </span>
                </div>
                <p className="text-xs font-mono text-sky-300 font-semibold bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  {lab.result}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  🔍 สาเหตุ: {lab.reason}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <p className="font-bold text-sky-400">💡 สรุปเชิงนิติวิทยาศาสตร์:</p>
            <p className="mt-0.5">
              การชั่ง NaOH โดยตรงทำไม่ได้เพราะ NaOH ดูดความชื้นและทำปฏิกิริยากับ CO₂ ในอากาศ ทำให้มวลคลาดเคลื่อน
              ดังนั้นเพื่อความแม่นยำ 100% ต้องใช้สารมาตรฐานปฐมภูมิ (Primary Standard) มาปรับมาตรฐาน NaOH ใน Activity 2 ก่อนเสมอ!
            </p>
          </div>
        </div>
      )}

      {/* Activity 2: Select Primary Standard */}
      <div className="glass-card rounded-2xl p-5 md:p-6 space-y-5 border border-slate-700/70">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-base md:text-lg text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-sky-400" />
            <span>Activity 2: Select Primary Standard (เลือกสารมาตรฐานปฐมภูมิสำหรับ NaOH)</span>
          </h3>
          <button
            onClick={() => {
              sound.playClick();
              openHintModal();
            }}
            className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-medium"
          >
            <HelpCircle className="w-4 h-4" />
            <span>ขอคำแนะนำ</span>
          </button>
        </div>

        {/* Feedback Alert with Auto-Scroll Ref */}
        {feedback && (
          <div ref={feedbackRef} className={`p-3.5 rounded-xl border flex items-center gap-3 animate-fade-in text-sm font-medium ${feedback.success
              ? 'card-success text-emerald-300'
              : 'card-warning text-amber-300'
            }`}>
            {feedback.success ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />}
            <p>{feedback.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Primary Standard Option Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {PRIMARY_STANDARD_OPTIONS.map((opt) => {
              const isSelected = selectedStd === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => {
                    if (isPhase2Complete) return;
                    sound.playSelect();
                    setSelectedStd(opt.id);
                  }}
                  className={`p-4 rounded-xl border transition-all ${isPhase2Complete ? 'cursor-default opacity-90' : 'cursor-pointer'
                    } ${isSelected
                      ? 'bg-sky-500/15 border-sky-400 shadow-sm ring-1 ring-sky-400/40 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-white">{opt.name}</h4>
                    <span className="text-xs font-mono text-sky-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {opt.formula}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-mono">มวลโมเลกุล: {opt.molarMass}</p>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                    {opt.reason}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
            <div className="text-xs text-slate-300 font-mono bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800">
              สูตร: M_NaOH = (g_KHP / 204.22) × (1000 / V_NaOH) = <span className="text-emerald-400 font-bold">0.1000 M</span>
            </div>

            {!isPhase2Complete ? (
              <button
                type="submit"
                className="w-full sm:w-auto btn-primary text-white font-semibold px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>ยืนยันการเลือกสารมาตรฐานปฐมภูมิ KHP</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextPhase}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md transition-all"
              >
                <span>เข้าสู่ Phase 3: Virtual Titration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>

    </div>
  );
};
