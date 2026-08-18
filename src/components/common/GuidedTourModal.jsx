import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../utils/audio';
import { 
  Compass, 
  User, 
  Award, 
  FlaskConical, 
  BookOpen, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2,
  Sparkles,
  FileText
} from 'lucide-react';

export const GuidedTourModal = ({ isOpen, onClose }) => {
  const { setActiveWorkstation } = useGameStore();
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const tourSteps = [
    {
      step: 1,
      title: "ยินดีต้อนรับสู่ห้องปฏิบัติการ TITRA LABS!",
      icon: Sparkles,
      iconColor: "text-amber-400 bg-amber-500/15 border border-amber-500/30",
      headline: "คู่มือแนะนำระบบการสืบสวนนิติวิทยาศาสตร์เคมี",
      description: "ยินดีต้อนรับเจ้าหน้าที่! เกมนี้จะนำท่านเข้าสู่การสืบสวนคดีปนเปื้อนสารในผลิตภัณฑ์ Vitamin Boost ด้วยกระบวนการไทเทรตกรด-เบส 5 เฟส ระบบจะพาเรียนรู้ผ่านการลงมือปฏิบัติจริงโดยไม่มีวันแพ้ (Learning Loop)",
      highlightPill: "การสืบสวนนิติวิทยาศาสตร์เคมี"
    },
    {
      step: 2,
      title: "1. แถบเมนูด้านซ้าย (Floating Sidebar 5 Phases)",
      icon: FlaskConical,
      iconColor: "text-sky-400 bg-sky-500/15 border border-sky-500/30",
      headline: "ลำดับด่านการสืบสวนจากเฟส 1 ถึงเฟส 5",
      description: "• 1. ไฟล์คดี (Case File): ตรวจฉลาก & เลือกอุปกรณ์ 6 ชิ้น\n• 2. สารมาตรฐาน (Standard): ปรับมาตรฐาน NaOH ด้วย KHP\n• 3. การไทเทรต (Analysis): ควบคุมบิวเรตต์หยดสาร 3 ซ้ำ\n• 4. การคำนวณ (Calculation): คัด Outlier & คำนวณ C1V1=C2V2\n• 5. รายงาน CER: สรุป Claim, Evidence, Reasoning & รับเกียรติบัตร",
      highlightPill: "เมนูด้านซ้าย"
    },
    {
      step: 3,
      title: "2. สมุดบันทึกและคู่มือเคมี (Lab Notebook)",
      icon: BookOpen,
      iconColor: "text-amber-400 bg-amber-500/15 border border-amber-500/30",
      headline: "ปุ่มสีส้มเด่นชัด บันทึกข้อมูลได้จริง",
      description: "กดปุ่มสีส้ม '📖 สมุดบันทึกเคมี & สูตร' ด้านซ้ายได้ตลอดเวลาเพื่อดูสูตรคำนวณ ตารางสีอินดิเคเตอร์ หรือพิมพ์จดบันทึกส่วนตัว ซึ่งข้อมูลจะถูกบันทึกจริงลงในระบบ",
      highlightPill: "ปุ่มสีส้มด้านซ้าย"
    },
    {
      step: 4,
      title: "3. ระบบคะแนน XP และเหรียญรางวัล",
      icon: Award,
      iconColor: "text-amber-400 bg-amber-500/15 border border-amber-500/30",
      headline: "คะแนน XP, การหักคะแนน และระดับตำแหน่ง",
      description: "• คะแนน XP จะเพิ่มขึ้นเมื่อตอบถูกและลดลงเมื่อทำผิดหรือขอคำใบ้ลึก\n• เมื่อจบเฟส 5 จะได้รับเกียรติบัตรพร้อมระบุระดับความสามารถ (Master / Senior / Investigator) และสามารถสั่งพิมพ์ A4 ได้ทันที",
      highlightPill: "มุมขวาบนของหน้าจอ"
    }
  ];

  const stepData = tourSteps[currentStep];
  const IconComponent = stepData.icon;

  const handleNext = () => {
    sound.playClick();
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      sound.playSuccess();
      onClose();
    }
  };

  const handleBack = () => {
    sound.playClick();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    sound.playClick();
    onClose();
  };

  const handleOpenFullManual = () => {
    sound.playClick();
    onClose();
    setActiveWorkstation('manual');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in no-print font-sans">
      <div className="relative w-full max-w-xl glass-card rounded-2xl p-5 md:p-7 shadow-2xl border border-slate-700/80 space-y-5 text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className={`p-2.5 rounded-xl ${stepData.iconColor}`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                GUIDED TOUR • {currentStep + 1} / {tourSteps.length}
              </span>
              <h3 className="font-bold text-base md:text-lg text-white mt-0.5">{stepData.title}</h3>
            </div>
          </div>

          <button
            onClick={handleSkip}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            title="ข้ามคำแนะนำ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Highlight Banner */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-sky-400">{stepData.headline}</h4>
            <span className="text-[11px] font-medium text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30">
              📍 {stepData.highlightPill}
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal whitespace-pre-line pt-1">
            {stepData.description}
          </p>
        </div>

        {/* PROMINENT BUTTON TO VIEW FULL INFOGRAPHIC USER MANUAL */}
        <div className="bg-sky-500/10 border border-sky-500/30 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="text-xs text-sky-200 flex items-center gap-2 text-center sm:text-left">
            <FileText className="w-4 h-4 text-sky-400 shrink-0" />
            <span>ต้องการอ่านคู่มือการเล่นและขั้นตอนทั้ง 6 ด่านแบบละเอียด?</span>
          </div>
          <button
            onClick={handleOpenFullManual}
            className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-3.5 py-1.5 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-sm transition-transform hover:scale-[1.03] shrink-0"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>📖 เปิดคู่มือฉบับเต็ม</span>
          </button>
        </div>

        {/* Tour Progress Dots */}
        <div className="flex items-center justify-center gap-2 pt-1">
          {tourSteps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                sound.playClick();
                setCurrentStep(idx);
              }}
              className={`h-2.5 rounded-full transition-all ${
                idx === currentStep 
                  ? 'w-8 bg-sky-400' 
                  : 'w-2.5 bg-slate-800 hover:bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            onClick={handleSkip}
            className="text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg transition-colors"
          >
            ข้ามคำแนะนำ
          </button>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-3.5 py-1.5 rounded-xl flex items-center gap-1 text-xs border border-slate-700 transition-all"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>ย้อนกลับ</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="btn-primary text-white font-semibold px-4 py-1.5 rounded-xl flex items-center gap-1.5 text-xs shadow-sm"
            >
              <span>{currentStep === tourSteps.length - 1 ? 'เริ่มการสืบสวน!' : 'ถัดไป'}</span>
              {currentStep === tourSteps.length - 1 ? <CheckCircle2 className="w-4 h-4" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
