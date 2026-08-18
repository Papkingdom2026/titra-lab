import React, { useState, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { CER_OPTIONS } from '../../data/chemistryData';
import { BADGES, GAME_INFO } from '../../data/caseData';
import { CharacterDialogueCard } from '../common/CharacterDialogueCard';
import { sound } from '../../utils/audio';
import { 
  CheckCircle2, 
  Award, 
  FileText, 
  ShieldCheck, 
  AlertTriangle,
  Sparkles,
  HelpCircle,
  BookOpen,
  ArrowRight,
  Zap
} from 'lucide-react';

export const ReportWorkstation = () => {
  const { 
    submitCER, 
    isPhase5Complete,
    cerState,
    calculatedAscorbicMolarity,
    calculatedAscorbicMass,
    triggerPhaseTransition,
    openHintModal,
    addXp
  } = useGameStore();

  const [selectedClaim, setSelectedClaim] = useState(cerState.claim || '');
  const [selectedEvidence, setSelectedEvidence] = useState(cerState.evidence || []);
  const [selectedReasoning, setSelectedReasoning] = useState(cerState.reasoning || '');
  const [feedback, setFeedback] = useState(null);
  const feedbackRef = useRef(null);

  // Dynamic values pulled from Phase 4 calculations
  const acidMolarityDisplay = calculatedAscorbicMolarity || "0.01136";
  const acidMassDisplay = calculatedAscorbicMass 
    ? (parseFloat(calculatedAscorbicMass) > 10 ? (parseFloat(calculatedAscorbicMass)/1000).toFixed(3) : parseFloat(calculatedAscorbicMass).toFixed(3))
    : "0.500";

  const toggleEvidenceChoice = (id) => {
    if (isPhase5Complete) return; // locked if completed
    sound.playClick();
    setSelectedEvidence((prev) => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    sound.playClick();

    if (!selectedClaim) {
      setFeedback({
        success: false,
        message: "โปรดเลือกข้อกล่าวอ้าง (Claim) 1 ข้อก่อนกดยื่นรายงาน"
      });
      sound.playError();
      setTimeout(() => {
        feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    }

    if (selectedEvidence.length === 0) {
      setFeedback({
        success: false,
        message: "โปรดเลือกหลักฐานเชิงประจักษ์ (Evidence) อย่างน้อย 1-2 ข้อ"
      });
      sound.playError();
      setTimeout(() => {
        feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    }

    if (!selectedReasoning) {
      setFeedback({
        success: false,
        message: "โปรดเลือกเหตุผลทางวิทยาศาสตร์ (Scientific Reasoning) 1 ข้อ"
      });
      sound.playError();
      setTimeout(() => {
        feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    }

    const res = submitCER(selectedClaim, selectedEvidence, selectedReasoning);
    setFeedback(res);
    if (res.success) {
      sound.playSuccess();
    } else {
      sound.playError();
      setTimeout(() => {
        feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const handleAutoFillCER = () => {
    sound.playClick();
    addXp(-15);
    setSelectedClaim('c1');
    setSelectedEvidence(['e1', 'e2']);
    setSelectedReasoning('r1');
    setFeedback({
      success: true,
      message: "✨ ผู้ช่วยได้จัดเตรียมข้อสรุป CER ที่ถูกต้องให้แล้ว (-15 XP) กดยื่นรายงานเพื่อผ่านด่านทันที!"
    });
  };

  const handleGoToQuiz = () => {
    sound.playPhaseUnlock();
    triggerPhaseTransition(6, 'quiz', 'CASE PHASE 6 : Post-Lab Assessment (แบบทดสอบท้ายบทเรียน 10 ข้อ)');
  };

  return (
    <div className="space-y-6 pb-16 font-sans">
      
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-5 md:p-6 border border-slate-700/70">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
              CASE PHASE 5 : FINAL VERDICT (CER ASSESSMENT WORKSTATION)
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-sans mt-1.5">
              รายงานสรุปข้อสรุปเชิงนิติวิทยาศาสตร์ (Claim-Evidence-Reasoning)
            </h2>
            <p className="text-sm text-slate-300 mt-1 font-normal">
              สร้างรายงาน CER ยื่นต่อ Director Alan เพื่อตัดสินคดี Vitamin Boost บนพื้นฐานของหลักฐานเชิงประจักษ์
            </p>
          </div>
          {isPhase5Complete && (
            <div className="card-success px-5 py-2.5 rounded-xl text-emerald-300 flex items-center gap-2 text-sm font-bold shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>ปิดคดีสำเร็จ! (Case File 01 Closed)</span>
            </div>
          )}
        </div>
      </div>

      {/* Character Dialogue Chat Box */}
      <CharacterDialogueCard 
        characterId="director"
        title="คำกล่าวในที่ประชุมคณะกรรมการสรุปคดี"
        text="ถึงเวลาที่คุณจะทำหน้าที่ในฐานะนักวิเคราะห์เคมีอย่างสมบูรณ์แล้ว! ข้อสรุปของคดีนี้จะตั้งอยู่บนหลักฐาน ไม่ใช่การคาดเดา ขอให้คุณนำเสนอรายงาน CER เพื่อตัดสินว่าผลิตภัณฑ์ Vitamin Boost ผ่านมาตรฐานหรือไม่!"
      />

      {/* Prominent Quiz Navigation Callout if CER Completed */}
      {isPhase5Complete && (
        <div className="card-success p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in shadow-2xl border-2 border-emerald-400/60">
          <div className="space-y-1">
            <h4 className="font-extrabold text-xl text-emerald-300 flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-400" />
              <span>🎉 รายงาน CER ได้รับการอนุมัติและปิดคดีเรียบร้อยแล้ว!</span>
            </h4>
            <p className="text-sm text-slate-200">
              ท่านสามารถคลิกปุ่มด้านขวาเพื่อเข้าสู่ <b>"Phase 6: แบบทดสอบท้ายบทเรียน (10 ข้อ)"</b> เพื่อยืนยันองค์ความรู้และรับเกียรติบัตร
            </p>
          </div>
          <button
            onClick={handleGoToQuiz}
            className="btn-primary text-white font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-2.5 text-base shadow-xl shrink-0 whitespace-nowrap cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-amber-300" />
            <span>เข้าสู่หน้าแบบทดสอบ (Quiz 10 ข้อ)</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* CER Builder Form */}
      <div className="glass-card rounded-2xl p-5 md:p-7 space-y-6 border border-slate-700/70">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
          <h3 className="font-bold text-lg md:text-xl text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-400" />
            <span>แบบฟอร์มรายงาน CER (Scientific CER Builder)</span>
          </h3>
          
          {!isPhase5Complete && (
            <button
              type="button"
              onClick={handleAutoFillCER}
              className="text-xs md:text-sm bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/30 px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>✨ ผู้ช่วยสรุป CER (-15 XP)</span>
            </button>
          )}
        </div>

        {/* Feedback Alert with Auto-Scroll Ref */}
        {feedback && (
          <div ref={feedbackRef} className={`p-4 rounded-xl border flex items-center gap-3 animate-fade-in text-base font-medium ${
            feedback.success 
              ? 'card-success text-emerald-300' 
              : 'card-warning text-amber-300'
          }`}>
            {feedback.success ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />}
            <p>{feedback.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmitReport} className="space-y-5">
          
          {/* Section 1: Claim */}
          <div className="space-y-2.5">
            <label className="block text-sm font-semibold text-sky-400">
              1. Claim (สร้างข้อกล่าวอ้างสรุปผลคดี):
            </label>
            <div className="space-y-2.5">
              {CER_OPTIONS.claims.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    if (isPhase5Complete) return;
                    sound.playClick();
                    setSelectedClaim(c.id);
                  }}
                  className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                    isPhase5Complete ? 'cursor-default opacity-90' : 'cursor-pointer'
                  } ${
                    selectedClaim === c.id
                      ? 'bg-sky-500/15 border-sky-400 text-white shadow-sm ring-1 ring-sky-400/40'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <p className="text-sm md:text-base font-medium leading-relaxed">{c.text}</p>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ml-3 ${
                    selectedClaim === c.id ? 'bg-sky-400 border-sky-400 text-slate-950' : 'border-slate-700 bg-slate-900 text-slate-500'
                  }`}>
                    {selectedClaim === c.id && '✓'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Evidence (Dynamically Bound to Phase 4 Values) */}
          <div className="space-y-2.5">
            <label className="block text-sm font-semibold text-sky-400">
              2. Evidence (เลือกหลักฐานเชิงประจักษ์สนับสนุนข้อกล่าวอ้าง):
            </label>
            <div className="space-y-2.5">
              {CER_OPTIONS.evidences.map((e) => {
                const isSelected = selectedEvidence.includes(e.id);
                // Dynamically inject values from previous phase
                let displayText = e.text;
                if (e.id === 'e2') {
                  const massG = parseFloat(acidMassDisplay) > 10 ? (parseFloat(acidMassDisplay)/1000).toFixed(3) : parseFloat(acidMassDisplay).toFixed(3);
                  const massMg = (parseFloat(massG) * 1000).toFixed(0);
                  displayText = `คำนวณความเข้มข้นวิตามินซีได้ C1 = ${acidMolarityDisplay} M ซึ่งคิดเป็น ${massMg} mg (${massG} g) ต่อ 250 mL (ในขณะที่ฉลากระบุ 1,000 mg)`;
                }

                return (
                  <div
                    key={e.id}
                    onClick={() => toggleEvidenceChoice(e.id)}
                    className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                      isPhase5Complete ? 'cursor-default opacity-90' : 'cursor-pointer'
                    } ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-400 text-white shadow-sm ring-1 ring-emerald-400/40'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <p className="text-sm md:text-base font-medium leading-relaxed">{displayText}</p>
                    <div className={`w-6 h-6 rounded-md border flex items-center justify-center text-xs font-bold shrink-0 ml-3 ${
                      isSelected ? 'bg-emerald-400 border-emerald-400 text-slate-950' : 'border-slate-700 bg-slate-900 text-slate-500'
                    }`}>
                      {isSelected && '✓'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Reasoning */}
          <div className="space-y-2.5">
            <label className="block text-sm font-semibold text-sky-400">
              3. Scientific Reasoning (คำอธิบายเหตุผลตามหลักการเคมีนิติวิทยาศาสตร์):
            </label>
            <div className="space-y-2.5">
              {CER_OPTIONS.reasonings.map((r) => (
                <div
                  key={r.id}
                  onClick={() => {
                    if (isPhase5Complete) return;
                    sound.playClick();
                    setSelectedReasoning(r.id);
                  }}
                  className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                    isPhase5Complete ? 'cursor-default opacity-90' : 'cursor-pointer'
                  } ${
                    selectedReasoning === r.id
                      ? 'bg-amber-500/15 border-amber-400 text-white shadow-sm ring-1 ring-amber-400/40'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <p className="text-sm md:text-base font-medium leading-relaxed">{r.text}</p>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ml-3 ${
                    selectedReasoning === r.id ? 'bg-amber-400 border-amber-400 text-slate-950' : 'border-slate-700 bg-slate-900 text-slate-500'
                  }`}>
                    {selectedReasoning === r.id && '✓'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          {!isPhase5Complete ? (
            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto btn-primary text-white font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 text-base shadow-lg cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>ยื่นรายงาน CER สรุปผลการสืบสวน</span>
              </button>
            </div>
          ) : (
            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={handleGoToQuiz}
                className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 text-base shadow-lg cursor-pointer animate-pulse"
              >
                <BookOpen className="w-5 h-5 text-amber-300" />
                <span>ไปทำแบบทดสอบท้ายบทเรียน (10 ข้อ)</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

        </form>
      </div>

    </div>
  );
};
