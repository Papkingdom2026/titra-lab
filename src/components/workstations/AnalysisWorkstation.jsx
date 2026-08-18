import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { TitrationCanvas } from '../canvas/TitrationCanvas';
import { CharacterDialogueCard } from '../common/CharacterDialogueCard';
import { sound } from '../../utils/audio';
import {
  FlaskConical,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  HelpCircle,
  Sparkles,
  Droplets,
  Zap,
  Play,
  Pause,
  Sliders
} from 'lucide-react';

export const AnalysisWorkstation = () => {
  const {
    trials,
    currentTrialIndex,
    recordTrialResult,
    isPhase3Complete,
    triggerPhaseTransition,
    openHintModal
  } = useGameStore();

  const [activeTrial, setActiveTrial] = useState(currentTrialIndex || 0);
  const [currentVolumeAdded, setCurrentVolumeAdded] = useState(trials[activeTrial]?.recordedVol || 0);
  const [isDropping, setIsDropping] = useState(false);
  const [isAutoDripping, setIsAutoDripping] = useState(false);
  const autoDripIntervalRef = useRef(null);

  const trial = trials[activeTrial] || trials[0];

  // Sync state when switching trials
  useEffect(() => {
    setCurrentVolumeAdded(trials[activeTrial]?.recordedVol || 0);
    setIsAutoDripping(false);
    if (autoDripIntervalRef.current) clearInterval(autoDripIntervalRef.current);
  }, [activeTrial]);

  // Clean up timer
  useEffect(() => {
    return () => {
      if (autoDripIntervalRef.current) clearInterval(autoDripIntervalRef.current);
    };
  }, []);

  const handleAddDrop = (amount) => {
    try {
      sound.playDrop();
    } catch (e) { }

    setIsDropping(true);
    setCurrentVolumeAdded((prev) => {
      const next = parseFloat(((prev || 0) + amount).toFixed(2));
      return Math.min(50.0, next);
    });
    setTimeout(() => setIsDropping(false), 250);
  };

  const handleToggleAutoDrip = () => {
    if (isAutoDripping) {
      try { sound.playClick(); } catch (e) { }
      setIsAutoDripping(false);
      if (autoDripIntervalRef.current) clearInterval(autoDripIntervalRef.current);
    } else {
      try { sound.playSuccess(); } catch (e) { }
      setIsAutoDripping(true);
      autoDripIntervalRef.current = setInterval(() => {
        setCurrentVolumeAdded((prev) => {
          if (prev >= 50.0) {
            clearInterval(autoDripIntervalRef.current);
            setIsAutoDripping(false);
            return 50.0;
          }
          try { sound.playDrop(); } catch (e) { }
          return parseFloat((prev + 0.1).toFixed(2));
        });
      }, 200);
    }
  };

  const handleResetTrial = () => {
    try { sound.playClick(); } catch (e) { }
    if (isAutoDripping) {
      setIsAutoDripping(false);
      if (autoDripIntervalRef.current) clearInterval(autoDripIntervalRef.current);
    }
    setCurrentVolumeAdded(0);
  };

  const handleRecordEndpoint = () => {
    try { sound.playSuccess(); } catch (e) { }
    if (isAutoDripping) {
      setIsAutoDripping(false);
      if (autoDripIntervalRef.current) clearInterval(autoDripIntervalRef.current);
    }
    recordTrialResult(activeTrial, currentVolumeAdded);
    if (activeTrial < 2) {
      setTimeout(() => {
        const nextIdx = activeTrial + 1;
        setActiveTrial(nextIdx);
        const nextVol = trials[nextIdx]?.recordedVol || 0;
        setCurrentVolumeAdded(nextVol);
      }, 400);
    }
  };

  const handleGoToPhase4 = () => {
    try { sound.playClick(); } catch (e) { }
    triggerPhaseTransition(4, 'calculation', 'CASE FILE Updating... Calculation and Outlier Analysis Unlocked');
  };

  // Check if all 3 trials have been recorded
  const allRecorded = trials.every(t => t.completed || t.recordedVol > 0);

  return (
    <div className="space-y-6 pb-12 font-sans">

      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-5 md:p-6 border border-slate-700/70">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
              CASE PHASE 3 : VIRTUAL TITRATION WORKSTATION
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-sans mt-1.5">
              การไทเทรตตัวอย่างสารละลาย Vitamin Boost (3 Trials)
            </h2>
            <p className="text-sm text-slate-300 mt-1 font-normal">
              ควบคุมบิวเรตต์เพื่อหยดสารละลายมาตรฐาน NaOH (0.1000 M) สังเกตการเปลี่ยนสีของฟีนอล์ฟทาเลอีนที่จุดยุติอย่างแม่นยำ
            </p>
          </div>
          {(isPhase3Complete || allRecorded) && (
            <div className="card-success px-5 py-2.5 rounded-xl text-emerald-300 flex items-center gap-2 text-sm font-bold shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>การไทเทรตครบ 3 ซ้ำเสร็จสิ้น!</span>
            </div>
          )}
        </div>
      </div>

      {/* Character Dialogue Chat Box */}
      <CharacterDialogueCard
        characterId="maya"
        title="คำแนะนำเทคนิคการไทเทรตจาก Dr. Maya"
        text="สังเกตการเปลี่ยนสีของสารละลายอย่างระมัดระวังนะครับ! จุดยุติของการไทเทรตนี้คือเมื่อสารละลายเปลี่ยนเป็นสีชมพูระเรื่อคงที่นานอย่างน้อย 30 วินาที หากหยดเกินจะกลายเป็นสีชมพูเข้ม"
      />

      {/* Prominent Next Phase Navigation Card if Complete */}
      {(isPhase3Complete || allRecorded) && (
        <div className="card-success p-4 md:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in shadow-lg">
          <div>
            <h4 className="font-bold text-base text-emerald-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>🎉 บันทึกผลการไทเทรตครบทั้ง 3 ซ้ำเรียบร้อยแล้ว!</span>
            </h4>
            <p className="text-sm text-slate-300 mt-1">
              ท่านสามารถคลิกสลับดูผลทั้ง 3 ซ้ำเพื่อปรับปรุงได้ หรือกดปุ่ม 'ไปต่อ Phase 4' เพื่อเข้าสู่การคำนวณ
            </p>
          </div>
          <button
            onClick={handleGoToPhase4}
            className="btn-primary text-white font-bold px-7 py-3 rounded-xl flex items-center justify-center gap-2 text-sm md:text-base shadow-md shrink-0 whitespace-nowrap"
          >
            <span>ไปต่อ Phase 4: การคำนวณ</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Trial Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1">
        {trials.map((t, idx) => {
          const isDone = t.completed || t.recordedVol > 0;
          return (
            <button
              key={t.id}
              onClick={() => {
                try { sound.playClick(); } catch (e) { }
                setActiveTrial(idx);
              }}
              className={`px-5 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2.5 whitespace-nowrap shadow-sm ${activeTrial === idx
                  ? 'bg-sky-500 text-slate-950 shadow-md ring-2 ring-sky-400/60 font-extrabold'
                  : isDone
                    ? 'bg-emerald-950/70 border border-emerald-500/60 text-emerald-300 hover:bg-emerald-900/70'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
            >
              <span>{t.name}</span>
              {isDone && (
                <span className="text-xs bg-emerald-500/20 px-2 py-0.5 rounded-md text-emerald-300 font-mono">
                  ✓ {t.recordedVol.toFixed(2)} mL
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Titration Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* Canvas Area (Real-time Chemical Render) */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-5 md:p-6 flex flex-col justify-between border border-slate-700/70 relative">
          <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
            <div>
              <span className="font-bold text-base text-sky-400 block">{trial.name}</span>
              <span className="text-xs text-slate-400">สังเกตการเปลี่ยนสีจุดยุติ</span>
            </div>
            <span className="text-xs font-mono text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 font-semibold">
              ตัวอย่างกรด: 25.00 mL
            </span>
          </div>

          <div className="w-full my-auto flex flex-col items-center justify-center">
            <TitrationCanvas
              currentVolume={currentVolumeAdded}
              targetEndpoint={trial.targetEndpoint || 24.80}
              isDropping={isDropping || isAutoDripping}
              isStirring={true}
            />
          </div>
        </div>

        {/* Controls Area */}
        <div className="lg:col-span-7 space-y-5">

          <div className="glass-card rounded-2xl p-5 md:p-6 space-y-5 border border-slate-700/70">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <Droplets className="w-5 h-5 text-sky-400" />
                <span>แผงควบคุมการหยดสารละลาย (Burette Controls)</span>
              </h3>

              <button
                type="button"
                onClick={() => {
                  try { sound.playClick(); } catch (e) { }
                  openHintModal();
                }}
                className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-medium"
              >
                <HelpCircle className="w-4 h-4" />
                <span>ขอคำแนะนำ</span>
              </button>
            </div>

            {/* Readouts */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 font-medium block">ปริมาตร NaOH ที่หยดแล้ว:</span>
                <span className="text-3xl font-extrabold text-sky-400 font-mono mt-1 block">
                  {currentVolumeAdded.toFixed(2)} <span className="text-base text-slate-400">mL</span>
                </span>
              </div>
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 font-medium block">ปริมาตรเริ่มต้น:</span>
                <span className="text-3xl font-extrabold text-slate-300 font-mono mt-1 block">
                  0.00 <span className="text-base text-slate-400">mL</span>
                </span>
              </div>
            </div>

            {/* Slider Control for Smooth Volume Adjustment */}
            <div className="space-y-1.5 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-sky-400" /> แถบเลื่อนปรับปริมาตรบิวเรตต์:
                </span>
                <span className="font-mono text-sky-400">{currentVolumeAdded.toFixed(2)} / 50.00 mL</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="0.05"
                value={currentVolumeAdded}
                onChange={(e) => {
                  try { sound.playDrop(); } catch (err) { }
                  setCurrentVolumeAdded(parseFloat(e.target.value));
                }}
                className="w-full accent-sky-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Drop buttons (ACTIVE & ULTRA-RESPONSIVE) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-300">
                  คลิกปุ่มด้านล่างเพื่อหยดสารละลาย NaOH:
                </label>
                <button
                  type="button"
                  onClick={handleToggleAutoDrip}
                  className={`text-xs px-3 py-1 rounded-lg border flex items-center gap-1 font-semibold transition-all ${isAutoDripping
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                    }`}
                >
                  {isAutoDripping ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isAutoDripping ? 'หยุดหยดอัตโนมัติ' : 'เปิดก๊อกหยดต่อเนื่อง'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleAddDrop(5.0)}
                  className="bg-slate-900 hover:bg-slate-800 active:bg-sky-600/30 text-white p-3 rounded-xl border border-slate-700 font-mono font-bold text-sm transition-all shadow-sm flex flex-col items-center justify-center text-center cursor-pointer hover:border-sky-400"
                >
                  <span className="text-sky-400 text-base font-bold">+ 5.0 mL</span>
                  <span className="text-[10px] text-slate-400 font-sans font-normal mt-0.5">เติมเร็วมาก</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddDrop(1.0)}
                  className="bg-slate-900 hover:bg-slate-800 active:bg-sky-600/30 text-white p-3 rounded-xl border border-slate-700 font-mono font-bold text-sm transition-all shadow-sm flex flex-col items-center justify-center text-center cursor-pointer hover:border-sky-400"
                >
                  <span className="text-sky-400 text-base font-bold">+ 1.0 mL</span>
                  <span className="text-[10px] text-slate-400 font-sans font-normal mt-0.5">เติมเร็ว</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddDrop(0.5)}
                  className="bg-slate-900 hover:bg-slate-800 active:bg-sky-600/30 text-white p-3 rounded-xl border border-slate-700 font-mono font-bold text-sm transition-all shadow-sm flex flex-col items-center justify-center text-center cursor-pointer hover:border-sky-400"
                >
                  <span className="text-sky-400 text-base font-bold">+ 0.50 mL</span>
                  <span className="text-[10px] text-slate-400 font-sans font-normal mt-0.5">ปานกลาง</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddDrop(0.1)}
                  className="bg-slate-900 hover:bg-slate-800 active:bg-sky-600/30 text-white p-3 rounded-xl border border-slate-700 font-mono font-bold text-sm transition-all shadow-sm flex flex-col items-center justify-center text-center cursor-pointer hover:border-sky-400"
                >
                  <span className="text-sky-400 text-base font-bold">+ 0.10 mL</span>
                  <span className="text-[10px] text-slate-400 font-sans font-normal mt-0.5">ประณีต</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddDrop(0.05)}
                  className="bg-slate-900 hover:bg-slate-800 active:bg-sky-600/30 text-white p-3 rounded-xl border border-slate-700 font-mono font-bold text-sm transition-all shadow-sm flex flex-col items-center justify-center text-center cursor-pointer hover:border-sky-400"
                >
                  <span className="text-sky-400 text-base font-bold">+ 0.05 mL</span>
                  <span className="text-[10px] text-slate-400 font-sans font-normal mt-0.5">ทีละหยด</span>
                </button>
              </div>
            </div>

            {/* Action Bar (Spacious, No Text Clipping) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={handleResetTrial}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold px-5 py-3 rounded-xl flex items-center justify-center gap-2 text-sm border border-slate-700 shrink-0 whitespace-nowrap cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>รีเซ็ต Trial นี้</span>
              </button>

              <button
                type="button"
                disabled={currentVolumeAdded === 0}
                onClick={handleRecordEndpoint}
                className="w-full sm:w-auto btn-primary text-white font-bold px-7 py-3 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md disabled:opacity-40 whitespace-nowrap cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>บันทึกผล {trial.name} ({currentVolumeAdded.toFixed(2)} mL)</span>
              </button>
            </div>

            {trial.completed && (
              <div className="card-success p-3.5 rounded-xl text-emerald-300 text-sm font-semibold flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>บันทึกผลการไทเทรต {trial.name}: {trial.recordedVol.toFixed(2)} mL สำเร็จ! (เลือกแท็บด้านบนเพื่อทดลองต่อ)</span>
              </div>
            )}
          </div>

          {/* Official Ledger Table */}
          <div className="glass-card rounded-2xl p-5 space-y-3 border border-slate-700/70">
            <h4 className="font-bold text-sm md:text-base text-white">ตารางบันทึกการไทเทรต 3 ซ้ำ (Official Titration Ledger)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm text-left">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800">
                    <th className="pb-2 font-semibold">Trial</th>
                    <th className="pb-2 font-semibold">ปริมาตรเริ่มต้น (mL)</th>
                    <th className="pb-2 font-semibold">ปริมาตรที่บันทึก (mL)</th>
                    <th className="pb-2 font-semibold">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {trials.map((t) => (
                    <tr key={t.id} className="text-slate-200">
                      <td className="py-2.5 font-sans font-medium">{t.name}</td>
                      <td className="py-2.5 text-slate-400">0.00</td>
                      <td className="py-2.5 text-sky-400 font-bold">
                        {t.recordedVol !== null && t.recordedVol > 0 ? `${t.recordedVol.toFixed(2)} mL` : '-'}
                      </td>
                      <td className="py-2.5">
                        {t.completed || t.recordedVol > 0 ? (
                          <span className="text-emerald-400 font-sans font-semibold">✓ บันทึกแล้ว</span>
                        ) : (
                          <span className="text-slate-500 font-sans">รอดำเนินการ</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
