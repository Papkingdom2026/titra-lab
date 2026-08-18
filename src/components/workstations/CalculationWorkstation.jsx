import React, { useState, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { CharacterDialogueCard } from '../common/CharacterDialogueCard';
import { sound } from '../../utils/audio';
import {
  Calculator,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  Zap,
  BookOpen
} from 'lucide-react';

export const CalculationWorkstation = () => {
  const {
    trials,
    calculatedNaohMolarity,
    submitPhase4,
    isPhase4Complete,
    outlierTrialId,
    avgVolume,
    calculatedAscorbicMolarity,
    calculatedAscorbicMass,
    triggerPhaseTransition,
    openHintModal,
    addXp
  } = useGameStore();

  const [selectedOutlier, setSelectedOutlier] = useState(outlierTrialId || "");
  const [avgVolInput, setAvgVolInput] = useState(avgVolume || "");
  const [concInput, setConcInput] = useState(calculatedAscorbicMolarity || "");
  const [massInput, setMassInput] = useState(calculatedAscorbicMass || (calculatedAscorbicMolarity ? "496" : ""));
  const [feedback, setFeedback] = useState(null);
  const [showHelperCalc, setShowHelperCalc] = useState(false);
  const [helperUsed, setHelperUsed] = useState(false);
  const feedbackRef = useRef(null);

  // Dynamic trial volumes from recorded state or standard defaults
  const t1Vol = trials?.[0]?.recordedVol && trials[0].recordedVol > 0 ? trials[0].recordedVol : 24.80;
  const t2Vol = trials?.[1]?.recordedVol && trials[1].recordedVol > 0 ? trials[1].recordedVol : 24.85;
  const t3Vol = trials?.[2]?.recordedVol && trials[2].recordedVol > 0 ? trials[2].recordedVol : 28.50;

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playClick();

    if (!selectedOutlier) {
      setFeedback({
        success: false,
        message: "โปรดเลือกการทดลองที่เป็นค่าคลาดเคลื่อน (Outlier) หรือระบุว่าไม่พบ Outlier ก่อนกดยืนยัน"
      });
      sound.playError();
      setTimeout(() => {
        feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    }

    if (!avgVolInput.trim() || !concInput.trim()) {
      setFeedback({
        success: false,
        message: "โปรดคำนวณและกรอกปริมาตรเฉลี่ยและความเข้มข้นวิตามินซีให้ครบถ้วน หรือกดดู '🧮 ผู้ช่วยคำนวณ'"
      });
      sound.playError();
      setTimeout(() => {
        feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    }

    const res = submitPhase4(selectedOutlier, avgVolInput, concInput, massInput);
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

  const handleToggleHelper = () => {
    sound.playClick();
    if (!showHelperCalc && !helperUsed && !isPhase4Complete) {
      addXp(-15);
      setHelperUsed(true);
    }
    setShowHelperCalc(!showHelperCalc);
  };

  const handleGoToPhase5 = () => {
    sound.playClick();
    triggerPhaseTransition(5, 'report', 'CASE FILE Updating... Final Verdict CER Assessment Unlocked');
  };

  return (
    <div className="space-y-6 pb-12 font-sans">

      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-5 md:p-6 border border-slate-700/70">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
              CASE PHASE 4 : EVIDENCE INTERPRETATION WORKSTATION
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-sans mt-1.5">
              การตรวจหาค่า Outlier และคำนวณความเข้มข้นวิตามินซี
            </h2>
            <p className="text-sm text-slate-300 mt-1 font-normal">
              วิเคราะห์ผลการไทเทรตทั้ง 3 ซ้ำ คัดแยกผลการทดลองที่มีความคลาดเคลื่อนผิดปกติออก และคำนวณหาความเข้มข้นที่แท้จริง
            </p>
          </div>
          {isPhase4Complete && (
            <div className="card-success px-5 py-2.5 rounded-xl text-emerald-300 flex items-center gap-2 text-sm font-bold shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>ความเข้มข้นวิตามินซี = {calculatedAscorbicMolarity || "0.0993"} M</span>
            </div>
          )}
        </div>
      </div>

      {/* Character Dialogue Chat Box */}
      <CharacterDialogueCard
        characterId="maya"
        title="คำแนะนำตรวจ Outlier จาก Dr. Maya"
        text="นักวิเคราะห์ที่ดี ไม่ใช่แค่คำนวณค่าเฉลี่ยทางคณิตศาสตร์ แต่ต้องตรวจสอบคุณภาพของข้อมูลก่อนครับ! หากการทดลองซ้ำใดเกิดข้อผิดพลาดรุนแรง (เช่น มีฟองอากาศในปลายบิวเรตต์) ข้อมูลนั้นคือ Outlier ที่ต้องคัดออกก่อนคำนวณ แต่หากผลทั้ง 3 ซ้ำใกล้เคียงกันก็สามารถนำมาเฉลี่ยร่วมกันได้"
      />

      {/* Locked Status Banner if Phase 4 is already completed */}
      {isPhase4Complete && (
        <div className="card-success p-4 rounded-xl flex items-center justify-between text-sm text-emerald-300 font-semibold animate-fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>✓ ผ่านด่านที่ 4 แล้ว (โหมดดูข้อมูลย้อนหลัง - ไม่สามารถแก้ไขได้)</span>
          </div>
          <span className="text-xs text-slate-400 font-normal hidden sm:inline">
            คำนวณ C1 = {calculatedAscorbicMolarity || "0.0993"} M (มวล {calculatedAscorbicMass || "0.496"} g) เรียบร้อยแล้ว
          </span>
        </div>
      )}

      {/* Prominent Next Phase Navigation Card if Complete */}
      {isPhase4Complete && (
        <div className="card-success p-4 md:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in shadow-lg">
          <div>
            <h4 className="font-bold text-base text-emerald-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>🎉 การคำนวณและคัด Outlier สำเร็จสมบูรณ์!</span>
            </h4>
            <p className="text-sm text-slate-300 mt-1">
              ผลการคำนวณความเข้มข้น C1 = {calculatedAscorbicMolarity || "0.0993"} M พร้อมยื่นรายงาน CER ปิดคดี กดปุ่มด้านขวาเพื่อเข้าสู่ Phase 5 ทันที
            </p>
          </div>
          <button
            onClick={handleGoToPhase5}
            className="btn-primary text-white font-bold px-7 py-3 rounded-xl flex items-center justify-center gap-2 text-sm md:text-base shadow-md shrink-0 whitespace-nowrap"
          >
            <span>เข้าสู่ Phase 5: สรุปคำตัดสิน (CER)</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Data Table of 3 Trials */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-5 md:p-6 space-y-4 border border-slate-700/70">
          <h3 className="font-bold text-base md:text-lg text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Calculator className="w-5 h-5 text-sky-400" />
            <span>ตารางผลการไทเทรตตัวอย่าง (3 Trials)</span>
          </h3>

          <div className="space-y-3">
            {trials.map((tr, idx) => {
              const isSelectedOutlier = selectedOutlier === String(idx);
              const volDisplay = tr.recordedVol ? tr.recordedVol.toFixed(2) : (idx === 2 ? "28.50" : idx === 1 ? "24.85" : "24.80");

              return (
                <div
                  key={tr.id}
                  onClick={() => {
                    if (isPhase4Complete) return;
                    sound.playSelect();
                    setSelectedOutlier(String(idx));
                  }}
                  className={`p-4 rounded-xl border transition-all ${isPhase4Complete ? 'cursor-default opacity-90' : 'cursor-pointer'
                    } ${isSelectedOutlier
                      ? 'bg-rose-500/15 border-rose-400 text-white shadow-sm ring-1 ring-rose-400/40'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm md:text-base font-bold text-white">{tr.name}</span>
                      <p className="text-xs text-slate-400 mt-1">
                        สังเกตจุดยุติสีชมพูระเรื่อสมบูรณ์
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-bold font-mono text-sky-400">{volDisplay} mL</span>
                      {isSelectedOutlier && (
                        <p className="text-xs text-rose-300 font-semibold mt-0.5">ระบุเป็น Outlier</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-sm text-slate-300 space-y-1.5">
            <p className="font-bold text-sky-400">💡 นิยามของ Outlier:</p>
            <p className="leading-relaxed">
              ข้อมูลที่มีค่าเบี่ยงเบนสูงผิดปกติจากกลุ่ม เนื่องจากความผิดพลาดในการทดลอง ไม่ควรนำมาคำนวณหาค่าเฉลี่ย (หากข้อมูลทั้ง 3 ซ้ำมีความแม่นยำใกล้เคียงกัน ให้ระบุว่าไม่พบ Outlier)
            </p>
          </div>
        </div>

        {/* Right Column: Calculation Form */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-5 md:p-6 space-y-5 border border-slate-700/70">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-base md:text-lg text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
              <span>แบบฟอร์มคำนวณทางนิติเคมี</span>
            </h3>

            <button
              type="button"
              onClick={handleToggleHelper}
              className="text-xs md:text-sm bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/30 px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>{showHelperCalc ? 'ซ่อนคำแนะนำ' : '🧮 ผู้ช่วยคำนวณ '}</span>
            </button>
          </div>

          {/* STEP-BY-STEP METHODOLOGY HELPER (NO SPOILING DIRECT NUMBERS) */}
          {showHelperCalc && (
            <div className="bg-sky-950/40 p-4 md:p-5 rounded-2xl border border-sky-500/40 space-y-3.5 animate-fade-in font-sans">
              <div className="flex items-center justify-between border-b border-sky-800/60 pb-2">
                <h4 className="font-bold text-base text-sky-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>วิธีทำและสูตรคำนวณ (Forensic Chemical Calculation Guide)</span>
                </h4>
                <span className="text-xs text-amber-400 bg-amber-500/15 border border-amber-400/30 px-2.5 py-0.5 rounded-full font-semibold">
                  คำใบ้แนะนำขั้นตอน
                </span>
              </div>

              <div className="space-y-2.5 text-xs md:text-sm text-slate-200">
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-300">📌 1. วิธีตรวจหาค่า Outlier:</span>
                  <p className="text-slate-300 leading-relaxed">
                    เปรียบเทียบปริมาตรทั้ง 3 Trial หากมีค่าใดค่าหนึ่งกระโดดแตกต่างจากอีก 2 ค่าอย่างชัดเจน (เช่น ต่างกันเกิน ±1.0 mL) แสดงว่าเกิดความผิดพลาดในการทดลอง ให้เลือก Trial นั้นเป็น Outlier แต่หากทั้ง 3 ซ้ำใกล้เคียงกัน (ต่างกันไม่เกิน ±0.5 mL) ให้เลือก <b>"ไม่พบ Outlier"</b>
                  </p>
                </div>

                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-300">📌 2. วิธีหาปริมาตรเฉลี่ย NaOH (V̄):</span>
                  <p className="text-slate-300 leading-relaxed">
                    • <b>กรณีพบ Outlier:</b> ตัด Trial ที่ผิดพลาดออก แล้วนำ 2 Trial ที่เหลือมาเฉลี่ย: <span className="font-mono text-sky-300 font-bold">V̄ = (V₁ + V₂) / 2</span><br />
                    • <b>กรณีไม่พบ Outlier:</b> นำทั้ง 3 Trial มาเฉลี่ย: <span className="font-mono text-sky-300 font-bold">V̄ = (V₁ + V₂ + V₃) / 3</span>
                  </p>
                </div>

                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-300">📌 3. วิธีคำนวณความเข้มข้นกรด (C₁ หรือ M_Acid):</span>
                  <p className="text-slate-300 leading-relaxed">
                    จากสูตรปฏิกิริยาสะเทิน <span className="font-mono text-sky-300 font-bold">C₁V₁ = C₂V₂</span><br />
                    แทนค่า: <span className="font-mono text-sky-300 font-bold">C₁ = (C₂ × V̄) / V_sample = ({calculatedNaohMolarity || "0.1000"} M × V̄) / 25.00 mL</span>
                  </p>
                </div>

                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-300">📌 4. วิธีคำนวณมิลลิกรัมของวิตามินซีในขวด 250 mL:</span>
                  <p className="text-slate-300 leading-relaxed">
                    จากสูตรหามวล: <span className="font-mono text-sky-300 font-bold">มวล (g) = C₁ × V_total(0.250 L) × MW(176.12 g/mol)</span><br />
                    แปลงเป็นมิลลิกรัม: <span className="font-mono text-sky-300 font-bold">มวล (mg) = มวล (g) × 1000</span> (หรือประมาณ <span className="font-mono text-emerald-300 font-bold">496 mg</span> หรือ <span className="font-mono text-emerald-300 font-bold">0.496 g</span> เมื่อ C₁ ≈ 0.0993 M)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Feedback Alert with Auto-Scroll Ref */}
          {feedback && (
            <div ref={feedbackRef} className={`p-4 rounded-xl border flex items-center gap-3 animate-fade-in text-sm md:text-base font-medium ${feedback.success
                ? 'card-success text-emerald-300'
                : 'card-warning text-amber-300'
              }`}>
              {feedback.success ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />}
              <p>{feedback.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Step 1: Select Outlier (Dynamic trial values) */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-sky-400">
                1. เลือกการทดลองที่เป็นค่าคลาดเคลื่อน (Outlier):
              </label>
              <select
                disabled={isPhase4Complete}
                value={selectedOutlier}
                onChange={(e) => setSelectedOutlier(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-sm md:text-base text-white focus:outline-none focus:border-sky-400 font-sans disabled:opacity-80"
              >
                <option value="">-- โปรดเลือกการทดลองที่เป็น Outlier หรือระบุว่าไม่พบ --</option>
                <option value="0">Trial 1 (ปริมาตร {t1Vol.toFixed(2)} mL)</option>
                <option value="1">Trial 2 (ปริมาตร {t2Vol.toFixed(2)} mL)</option>
                <option value="2">Trial 3 (ปริมาตร {t3Vol.toFixed(2)} mL)</option>
                <option value="none">ไม่พบ Outlier (ผลการทดลองทั้ง 3 ซ้ำมีความแม่นยำใกล้เคียงกัน)</option>
              </select>
            </div>

            {/* Step 2: Average Volume */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-sky-400">
                2. คำนวณปริมาตรเฉลี่ยของ NaOH จาก Trial ที่น่าเชื่อถือ (mL):
              </label>
              <div className="relative flex items-center">
                <input
                  disabled={isPhase4Complete}
                  type="number"
                  step="0.001"
                  value={avgVolInput}
                  onChange={(e) => setAvgVolInput(e.target.value)}
                  placeholder="กรอกปริมาตรเฉลี่ย เช่น 24.825"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-4 pr-16 py-3 text-base text-white focus:outline-none focus:border-sky-400 font-mono disabled:opacity-80"
                />
                <span className="absolute right-4 text-xs font-mono font-bold text-sky-400 bg-slate-800 px-2.5 py-1 rounded border border-slate-700 pointer-events-none">
                  mL
                </span>
              </div>
              <p className="text-xs text-slate-400 font-normal">
                คำนวณจากค่าเฉลี่ยของ Trial ที่ตัด Outlier ออกแล้ว หรือเฉลี่ยทั้ง 3 Trial หากไม่มี Outlier
              </p>
            </div>

            {/* Step 3: Stoichiometry Concentration of Vitamin C */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-sky-400">
                3. คำนวณความเข้มข้นของกรดแอสคอร์บิก (วิตามินซี) ในตัวอย่าง (C₁ หรือ M_Acid) [Mol/L]:
              </label>
              <div className="relative flex items-center">
                <input
                  disabled={isPhase4Complete}
                  type="number"
                  step="0.0001"
                  value={concInput}
                  onChange={(e) => setConcInput(e.target.value)}
                  placeholder="กรอกความเข้มข้นกรด เช่น 0.0993"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-4 pr-16 py-3 text-base text-white focus:outline-none focus:border-sky-400 font-mono disabled:opacity-80"
                />
                <span className="absolute right-4 text-xs font-mono font-bold text-sky-400 bg-slate-800 px-2.5 py-1 rounded border border-slate-700 pointer-events-none">
                  M
                </span>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs md:text-sm font-mono text-slate-300">
                <span>C₁V₁ = C₂V₂ ➔ C₁ × 25.00 mL = {calculatedNaohMolarity || "0.1000"} M × {avgVolInput || "24.825"} mL</span>
              </div>
            </div>

            {/* Step 4: NEW FIELD - Calculate Milligrams of Vitamin C */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-sky-400">
                4. คำนวณปริมาณวิตามินซีในเครื่องดื่มขวดตัวอย่าง 250 mL (มิลลิกรัม : mg):
              </label>
              <div className="relative flex items-center">
                <input
                  disabled={isPhase4Complete}
                  type="number"
                  step="0.01"
                  value={massInput}
                  onChange={(e) => setMassInput(e.target.value)}
                  placeholder="กรอกปริมาณมิลลิกรัม เช่น 496 (หรือ 0.496 g)"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-4 pr-16 py-3 text-base text-white focus:outline-none focus:border-sky-400 font-mono disabled:opacity-80"
                />
                <span className="absolute right-4 text-xs font-mono font-bold text-amber-400 bg-slate-800 px-2.5 py-1 rounded border border-slate-700 pointer-events-none">
                  mg
                </span>
              </div>
              <p className="text-xs text-slate-400 font-normal">
                คำนวณจาก มวล (mg) = C₁ × 0.250 L × 176.12 g/mol × 1000 (ฉลากระบุ 1,000 mg)
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-3">
              {!isPhase4Complete ? (
                <button
                  type="submit"
                  className="btn-primary text-white font-semibold px-7 py-3 rounded-xl flex items-center gap-2 text-sm md:text-base shadow-md cursor-pointer"
                >
                  <Calculator className="w-5 h-5" />
                  <span>ยืนยันผลการคำนวณ</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleGoToPhase5}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-7 py-3 rounded-xl flex items-center gap-2 text-sm md:text-base shadow-md transition-all cursor-pointer"
                >
                  <span>เข้าสู่ Phase 5: สรุปคำตัดสิน (CER Builder)</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>

          </form>
        </div>

      </div>

    </div>
  );
};
