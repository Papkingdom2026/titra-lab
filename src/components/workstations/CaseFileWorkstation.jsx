import React, { useState, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { CASE_FILE_01, LAB_EQUIPMENT_LIST } from '../../data/caseData';
import { EquipmentIllustration } from '../common/EquipmentIllustration';
import { CharacterDialogueCard } from '../common/CharacterDialogueCard';
import { StudentProfileModal } from '../common/StudentProfileModal';
import { sound } from '../../utils/audio';
import {
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  User,
  Edit3,
  Newspaper,
  FileSearch,
  Lock,
  Image as ImageIcon,
  ZoomIn,
  X
} from 'lucide-react';

export const CaseFileWorkstation = () => {
  const {
    selectedEquipment,
    toggleEquipment,
    validatePhase1,
    isEquipmentValidated,
    triggerPhaseTransition,
    newsHighlights,
    toggleNewsHighlight,
    labelHighlights,
    toggleLabelHighlight,
    studentInfo,
    isStudentInfoSubmitted
  } = useGameStore();

  const [feedback, setFeedback] = useState(null);
  const [profileModalOpen, setProfileModalOpen] = useState(!isStudentInfoSubmitted);
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false);
  const feedbackRef = useRef(null);

  const handleEquipmentClick = (id) => {
    if (isEquipmentValidated) return; // locked if already validated
    sound.playSelect();
    toggleEquipment(id);
  };

  const handleValidation = () => {
    sound.playClick();
    if (!isStudentInfoSubmitted || !studentInfo.name) {
      setProfileModalOpen(true);
      return;
    }

    if (newsHighlights.length === 0 || labelHighlights.length === 0) {
      setFeedback({
        success: false,
        message: "โปรดคลิกวิเคราะห์ข่าวสาร (Activity 1) และตรวจสอบฉลากผลิตภัณฑ์ (Activity 2) ให้ครบถ้วนก่อนยืนยันอุปกรณ์ (-10 XP)"
      });
      sound.playError();
      setTimeout(() => {
        feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    }

    const res = validatePhase1();
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

  const handleGoToPhase2 = () => {
    sound.playClick();
    triggerPhaseTransition(2, 'evidence', 'CASE FILE Updating... Evidence Collection Unlocked');
  };

  const requiredIds = ["burette", "pipette", "flask", "indicator", "stand", "wash_bottle"];
  const selectedRequiredCount = requiredIds.filter(id => selectedEquipment.includes(id)).length;
  const progressPercent = Math.round((selectedRequiredCount / 6) * 100);

  return (
    <div className="space-y-6 pb-12 font-sans">

      {/* Student Investigator Profile Card */}
      <div className="glass-card rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-700/70 shadow-md">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl shrink-0 shadow-inner">
            <span>{studentInfo.avatar || '👨‍🔬'}</span>
          </div>
          <div>
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
              เจ้าหน้าที่ผู้สืบสวนคดี (INVESTIGATOR PROFILE)
            </span>
            <h4 className="font-bold text-lg md:text-xl text-white">
              {studentInfo.name ? `Analyst ${studentInfo.name} ${studentInfo.surname}` : 'ยังไม่ได้ระบุชื่อเจ้าหน้าที่'}
            </h4>
            <p className="text-sm text-slate-300 font-medium">
              {studentInfo.grade ? `ชั้นเรียน: ${studentInfo.grade} • เลขที่: ${studentInfo.studentNo}` : 'โปรดคลิกปุ่มเพื่อระบุชื่อ-นามสกุล สำหรับแสดงบนเกียรติบัตร'}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            sound.playClick();
            setProfileModalOpen(true);
          }}
          className="btn-primary text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm shrink-0"
        >
          <Edit3 className="w-4 h-4" />
          <span>{studentInfo.name ? 'แก้ไขข้อมูล' : 'ระบุข้อมูลประจำตัว'}</span>
        </button>
      </div>

      {/* Director Alan Dialogue in Chat Box format */}
      <CharacterDialogueCard
        characterId="director"
        title="ภารกิจด่วนจากผู้อำนวยการศูนย์ NFSIC"
        text="ยินดีต้อนรับนักวิเคราะห์! คดี Case File 01 : Vitamin Boost Investigation เป็นกรณีฉุกเฉินระดับชาติ มีประชาชนเข้ารักษาในโรงพยาบาล 48 ราย แต่ผลตรวจแล็บภายนอก 3 แห่งกลับขัดแย้งกัน ขอให้ท่านวิเคราะห์ข่าว ตรวจฉลาก และเตรียมอุปกรณ์ไทเทรตเพื่อค้นหาความจริง!"
      />

      {/* Locked Status Banner if Phase 1 is already completed */}
      {isEquipmentValidated && (
        <div className="card-success p-4 rounded-xl flex items-center justify-between text-sm text-emerald-300 font-semibold animate-fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>✓ ผ่านด่านที่ 1 แล้ว (โหมดดูข้อมูลย้อนหลัง - ไม่สามารถแก้ไขได้)</span>
          </div>
          <span className="text-xs text-slate-400 font-normal hidden sm:inline">
            เพื่อความถูกต้องตามระเบียบพิสูจน์หลักฐาน
          </span>
        </div>
      )}

      {/* Case Overview & Large Evidence Image Container */}
      <div className="glass-card rounded-2xl p-5 md:p-7 border border-slate-700/70 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold text-rose-300 bg-rose-500/15 border border-rose-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
                {CASE_FILE_01.caseId} • {CASE_FILE_01.urgency}
              </span>
              <span className="text-xs text-slate-400 font-mono">📅 {CASE_FILE_01.date}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-sans">{CASE_FILE_01.titleThai}</h2>
            <p className="text-sm text-sky-400 font-medium">📍 {CASE_FILE_01.location}</p>
          </div>

          {isEquipmentValidated && (
            <div className="card-success px-5 py-2.5 rounded-xl text-emerald-300 flex items-center gap-2 text-sm font-bold shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Phase 1 ภารกิจสำเร็จแล้ว!</span>
            </div>
          )}
        </div>

        {/* Story Text + Larger Local Evidence Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-800 text-slate-200 text-base leading-relaxed items-center">
          <div className="lg:col-span-7 space-y-3">
            <p className="text-base text-slate-200 leading-relaxed font-normal">{CASE_FILE_01.description}</p>
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-sm text-slate-300">
              📌 <span className="font-semibold text-amber-300">เป้าหมายการสืบสวน:</span> ตรวจสอบว่าปริมาณกรดแอสคอร์บิก (Vitamin C) ในขวด มีจริง 1000 mg ตามฉลากหรือไม่ ด้วยการไทเทรตนิติวิทยาศาสตร์
            </div>
          </div>

          {/* Larger Evidence Image Card with Zoom Feature */}
          <div className="lg:col-span-5 bg-slate-900/90 p-3.5 rounded-2xl border border-slate-700/80 text-center space-y-2">
            <div
              onClick={() => setIsImageZoomOpen(true)}
              className="group relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 aspect-video flex items-center justify-center cursor-pointer shadow-lg hover:border-sky-400 transition-all"
            >
              <img
                src="/evidence_case01.png"
                alt="Case Exhibit"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://lh3.googleusercontent.com/d/17kdUbe_upuWf-Kf6edy-2zLjeWQC_4TE";
                }}
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="bg-sky-600/90 text-white text-xs px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow-md">
                  <ZoomIn className="w-4 h-4" /> คลิกเพื่อขยายดูภาพใหญ่
                </span>
              </div>
              <div className="absolute bottom-2 right-2 bg-slate-950/90 text-sky-300 text-xs px-2.5 py-1 rounded font-mono border border-slate-700">
                EXHIBIT #A
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-0.5">
              <span>ภาพหลักฐานประจำคดี Vitamin Boost</span>
              <button
                onClick={() => setIsImageZoomOpen(true)}
                className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
              >
                <ZoomIn className="w-3.5 h-3.5" /> ดูภาพขยาย
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Activity 1: Breaking News Analysis */}
      <div className="glass-card rounded-2xl p-5 md:p-6 space-y-4 border border-slate-700/70">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-lg md:text-xl text-white flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-sky-400" />
            <span>Activity 1: Breaking News Analysis (วิเคราะห์รายงานข่าวสารด่วน)</span>
          </h3>
          <span className="text-xs font-semibold text-sky-400 bg-sky-500/10 px-3.5 py-1 rounded-full border border-sky-500/30">
            ไฮไลต์ {newsHighlights.length} / 4 รายการ
          </span>
        </div>

        <p className="text-sm text-slate-300 font-normal">
          คำสั่ง: คลิกที่การ์ดข้อมูลข่าวสารด้านล่างเพื่อ 'ไฮไลต์' ข้อมูลสำคัญที่ส่งผลต่อการตั้งสมมติฐานทางคดี
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CASE_FILE_01.breakingNews.details.map((item) => {
            const isHighlighted = newsHighlights.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => {
                  if (isEquipmentValidated) return;
                  sound.playClick();
                  toggleNewsHighlight(item.id);
                }}
                className={`p-4 rounded-xl border transition-all ${isEquipmentValidated ? 'cursor-default opacity-90' : 'cursor-pointer'
                  } ${isHighlighted
                    ? 'bg-sky-500/15 border-sky-400/80 text-white shadow-sm ring-1 ring-sky-400/40'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-400 uppercase font-mono">{item.label}</span>
                  <span className="text-xs font-medium text-sky-300">{isHighlighted ? '✓ ไฮไลต์แล้ว' : '+ กดเพื่อเลือก'}</span>
                </div>
                <p className="text-base font-semibold mt-1.5 leading-relaxed text-slate-100">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity 2: Product Label Investigation */}
      <div className="glass-card rounded-2xl p-5 md:p-6 space-y-4 border border-slate-700/70">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-lg md:text-xl text-white flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-sky-400" />
            <span>Activity 2: Product Label Investigation (ตรวจสอบฉลากผลิตภัณฑ์ Vitamin Boost)</span>
          </h3>
          <span className="text-xs font-semibold text-sky-400 bg-sky-500/10 px-3.5 py-1 rounded-full border border-sky-500/30">
            ไฮไลต์ {labelHighlights.length} / 3 รายการ
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Label Graphic Container */}
          <div className="lg:col-span-5 bg-amber-500/10 p-5 rounded-2xl border border-amber-500/30 text-center space-y-3">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest bg-amber-500/20 px-3 py-1 rounded-md border border-amber-400/40">
              OFFICIAL EVIDENCE EXHIBIT #A
            </span>
            <h4 className="text-2xl font-bold text-white font-sans">{CASE_FILE_01.productLabel.productName}</h4>
            <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 text-left text-sm font-mono space-y-1.5 text-slate-200">
              <p>• Claimed Vitamin C: <span className="text-amber-300 font-bold">{CASE_FILE_01.productLabel.claimedVitaminC}</span></p>
              <p>• FDA Reg No: <span className="text-sky-300">{CASE_FILE_01.productLabel.fdaNumber}</span></p>
              <p>• Batch Lot: <span className="text-emerald-400 font-bold">{CASE_FILE_01.productLabel.batchNo}</span></p>
            </div>
          </div>

          {/* Suspicious Points Selection */}
          <div className="lg:col-span-7 space-y-3">
            <p className="text-sm font-semibold text-slate-300">
              คลิกเพื่อเลือกประเด็นน่าสงสัยบนฉลากที่ต้องนำไปพิสูจน์ด้วยการไทเทรต:
            </p>
            {CASE_FILE_01.productLabel.suspiciousPoints.map((pt) => {
              const isSelected = labelHighlights.includes(pt.id);
              return (
                <div
                  key={pt.id}
                  onClick={() => {
                    if (isEquipmentValidated) return;
                    sound.playClick();
                    toggleLabelHighlight(pt.id);
                  }}
                  className={`p-4 rounded-xl border transition-all flex items-center justify-between ${isEquipmentValidated ? 'cursor-default opacity-90' : 'cursor-pointer'
                    } ${isSelected
                      ? 'bg-amber-500/15 border-amber-400/80 text-white shadow-sm ring-1 ring-amber-400/40'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                >
                  <p className="text-sm md:text-base font-medium">{pt.text}</p>
                  <div className={`w-6 h-6 rounded-md border flex items-center justify-center text-xs font-bold shrink-0 ml-3 ${isSelected ? 'bg-amber-400 border-amber-400 text-slate-950' : 'border-slate-700 bg-slate-900 text-slate-500'
                    }`}>
                    {isSelected && '✓'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Leo Chat Card */}
      <CharacterDialogueCard
        characterId="leo"
        title="คำแนะนำเตรียมเครื่องมือจาก Leo (Lab Technician)"
        text="สวัสดีครับ Analyst! ในห้องปฏิบัติการนิติวิทยาศาสตร์ เราต้องเลือกเฉพาะเครื่องแก้วตวงที่มีความแม่นยำสูง (Volumetric Glassware) เช่น บิวเรตต์ ปิเปตต์ปริมาตร 25 mL และขวดรูปชมพู่ หลีกเลี่ยงอุปกรณ์ตวงระดับหยาบนะครับ!"
      />

      {/* Activity 3: Laboratory Equipment Selection */}
      <div className="glass-card rounded-2xl p-5 md:p-6 space-y-5 border border-slate-700/70">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3.5">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-400" />
              <span>Activity 3: Laboratory Equipment Selection (เลือกอุปกรณ์ห้องปฏิบัติการ 6 ชิ้น)</span>
            </h3>
            <p className="text-sm text-slate-300 mt-1 font-normal">
              เลือกอุปกรณ์ที่จำเป็นสำหรับการไทเทรตนิติวิทยาศาสตร์ที่มีความแม่นยำสูง (6 ชิ้น)
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 shrink-0">
            <span className="text-sm text-slate-400 font-medium">อุปกรณ์จำเป็น:</span>
            <span className="text-sm font-bold text-sky-400 font-mono">{selectedRequiredCount} / 6 ชิ้น ({progressPercent}%)</span>
          </div>
        </div>

        {/* Error Feedback Message Box with Auto-scroll ref */}
        {feedback && (
          <div ref={feedbackRef} className={`p-4 rounded-xl border flex items-center gap-3 animate-fade-in text-base font-medium ${feedback.success
            ? 'card-success text-emerald-300'
            : 'card-warning text-amber-300'
            }`}>
            {feedback.success ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />}
            <p>{feedback.message}</p>
          </div>
        )}

        {/* Equipment Option Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LAB_EQUIPMENT_LIST.map((item) => {
            const isSelected = selectedEquipment.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => handleEquipmentClick(item.id)}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${isEquipmentValidated ? 'cursor-default opacity-90' : 'cursor-pointer'
                  } ${isSelected
                    ? 'bg-sky-500/15 border-sky-400/80 shadow-md ring-1 ring-sky-400/40'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${item.isRequired ? 'bg-sky-500/15 text-sky-300 border-sky-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                    {item.isRequired ? 'จำเป็น' : 'อุปกรณ์เสริม'}
                  </span>

                  <div className={`w-6 h-6 rounded-md border flex items-center justify-center text-xs font-bold transition-all ${isSelected ? 'bg-sky-400 border-sky-400 text-slate-950' : 'border-slate-700 bg-slate-900 text-slate-500'
                    }`}>
                    {isSelected && '✓'}
                  </div>
                </div>

                <div className="flex items-center justify-center py-3 bg-slate-950/70 rounded-xl border border-slate-800">
                  <EquipmentIllustration id={item.id} className="w-24 h-28" />
                </div>

                <div>
                  <h4 className="font-semibold text-base text-white">{item.name}</h4>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Validation & Next Phase Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
          <p className="text-sm text-slate-300">
            💡 ทำกิจกรรมทั้ง 3 ส่วนครบถ้วนแล้ว กดเพื่อยืนยันอุปกรณ์และเข้าสู่ Phase 2
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!isEquipmentValidated ? (
              <button
                onClick={handleValidation}
                className="w-full sm:w-auto btn-primary text-white font-semibold px-7 py-3 rounded-xl flex items-center justify-center gap-2 text-sm md:text-base shadow-md"
              >
                <span>ยืนยันการวิเคราะห์และอุปกรณ์ Phase 1</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleGoToPhase2}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-7 py-3 rounded-xl flex items-center justify-center gap-2 text-sm md:text-base shadow-md transition-all"
              >
                <span>เข้าสู่ Phase 2: Evidence Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* FULLSCREEN IMAGE ZOOM LIGHTBOX MODAL */}
      {isImageZoomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg animate-fade-in font-sans">
          <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-3xl p-5 md:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-sky-400" />
                <h3 className="font-bold text-lg text-white">ภาพหลักฐานประจำคดีฉบับเต็ม (Official Evidence Exhibit)</h3>
              </div>
              <button
                onClick={() => setIsImageZoomOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
              <img
                src="/evidence_case01.png"
                alt="Case Exhibit Fullscreen"
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>
            <p className="text-xs text-slate-400 text-center font-mono">
              NFSIC Forensic Chemistry Laboratory • Case File 01: Vitamin Boost Investigation
            </p>
          </div>
        </div>
      )}

      <StudentProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

    </div>
  );
};
