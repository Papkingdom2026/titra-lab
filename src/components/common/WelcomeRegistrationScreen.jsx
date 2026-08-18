import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { CASE_FILE_01, GAME_INFO } from '../../data/caseData';
import { sound } from '../../utils/audio';
import { 
  FlaskConical, 
  UserCheck, 
  ArrowRight, 
  Sparkles,
  Building2,
  Image as ImageIcon
} from 'lucide-react';

export const WelcomeRegistrationScreen = () => {
  const { studentInfo, completeWelcomeOnboarding } = useGameStore();

  const [step, setStep] = useState(1); // 1 = Registration Form, 2 = Situation Briefing
  const [name, setName] = useState(studentInfo.name || '');
  const [surname, setSurname] = useState(studentInfo.surname || '');
  const [grade, setGrade] = useState(studentInfo.grade || 'ม.5/1');
  const [studentNo, setStudentNo] = useState(studentInfo.studentNo || '1');
  const [avatar, setAvatar] = useState(studentInfo.avatar || '👨‍🔬');
  const [errorMsg, setErrorMsg] = useState('');

  const scientistAvatars = [
    { emoji: '👨‍🔬', label: 'นักวิเคราะห์เคมีชาย' },
    { emoji: '👩‍🔬', label: 'นักวิเคราะห์เคมีหญิง' },
    { emoji: '🧬', label: 'นักวิจัยนิติโมเลกุล' },
    { emoji: '🧪', label: 'ผู้เชี่ยวชาญการไทเทรต' }
  ];

  const handleStep1Submit = (e) => {
    e.preventDefault();
    sound.playClick();
    if (!name.trim() || !surname.trim()) {
      setErrorMsg('กรุณาระบุชื่อและนามสกุลให้ครบถ้วนเพื่อพิมพ์บนเกียรติบัตร');
      sound.playError();
      return;
    }
    setErrorMsg('');
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartInvestigation = () => {
    sound.playSuccess();
    completeWelcomeOnboarding({
      name: name.trim(),
      surname: surname.trim(),
      grade: grade.trim() || 'ม.5/1',
      studentNo: studentNo.trim() || '1',
      avatar
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 md:p-6 font-sans relative">
      
      {/* Background ambient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-4xl glass-card rounded-3xl p-6 md:p-9 shadow-2xl border border-slate-700/80 space-y-7">
        
        {/* Top Brand Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-5 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
              <FlaskConical className="w-7 h-7 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {GAME_INFO.center}
              </span>
              <h1 className="text-xl md:text-2xl font-bold text-white font-sans mt-0.5">
                {GAME_INFO.title}
              </h1>
              <p className="text-xs md:text-sm text-slate-400 font-medium">
                "{GAME_INFO.tagline}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs font-semibold text-slate-300">
            <span>ขั้นตอนเริ่มต้น: {step} / 2</span>
          </div>
        </div>

        {/* STEP 1: Student Investigator Registration */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-xl mx-auto space-y-1.5">
              <div className="inline-flex p-3 bg-sky-500/15 text-sky-400 rounded-2xl border border-sky-500/30 mb-1">
                <UserCheck className="w-7 h-7" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white font-sans">
                ลงทะเบียนข้อมูลเจ้าหน้าที่ผู้สืบสวนนักเคมี
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                โปรดระบุข้อมูลส่วนตัวและเลือกรูปประจำตัว ข้อมูลนี้จะถูกพิมพ์ลงบน <span className="font-semibold text-sky-300">"ใบประกาศเกียรติคุณ"</span> เมื่อปิดคดีสำเร็จ
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 bg-rose-500/15 border border-rose-400/40 text-rose-300 rounded-xl text-sm font-medium text-center">
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={handleStep1Submit} className="max-w-xl mx-auto space-y-4">
              
              {/* Scientist Avatar Selection */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  เลือกรูปประจำตัวนักวิทยาศาสตร์ (Scientist Avatar):
                </label>
                <div className="grid grid-cols-4 gap-2.5">
                  {scientistAvatars.map((item) => (
                    <button
                      key={item.emoji}
                      type="button"
                      onClick={() => {
                        sound.playSelect();
                        setAvatar(item.emoji);
                      }}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                        avatar === item.emoji
                          ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-400/40 text-white'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <span className="text-[10px] font-medium truncate w-full">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-300">
                    ชื่อจริง (First Name): *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="เช่น วิทยา"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-300">
                    นามสกุล (Surname): *
                  </label>
                  <input
                    type="text"
                    required
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="เช่น ศรีนิติเคมี"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-300">
                    ชั้นมัธยมศึกษา (Grade): *
                  </label>
                  <input
                    type="text"
                    required
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    placeholder="เช่น ม.5/1"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-300">
                    เลขที่ (Student No.): *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentNo}
                    onChange={(e) => setStudentNo(e.target.value)}
                    placeholder="เช่น 12"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-primary text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-base shadow-md"
                >
                  <span>ถัดไป: อ่านสถานการณ์ฉุกเฉิน</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: Situation Briefing & Scene Illustration */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Situation Graphic & Story Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-900/70 p-5 md:p-6 rounded-2xl border border-slate-800">
              
              {/* Evidence Graphic Image Container (Using Local Asset /evidence_case01.png) */}
              <div className="lg:col-span-5 bg-slate-950 p-3 rounded-xl border border-slate-800 text-center space-y-2">
                <div className="relative rounded-lg overflow-hidden border border-slate-700/60 bg-slate-900 aspect-video flex items-center justify-center">
                  <img 
                    src="/evidence_case01.png" 
                    alt="Case File 01 Evidence"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://lh3.googleusercontent.com/d/17kdUbe_upuWf-Kf6edy-2zLjeWQC_4TE";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-[11px] font-mono text-sky-300 font-semibold flex items-center gap-1">
                      <ImageIcon className="w-3.5 h-3.5" /> ภาพหลักฐานประจำคดี (EXHIBIT #A)
                    </span>
                  </div>
                </div>

                <div className="text-left text-xs text-slate-300 px-1 pt-1 space-y-0.5">
                  <p className="font-semibold text-white">NFSIC Forensic Chemistry Lab</p>
                  <p className="text-slate-400">สถานการณ์: ผู้ป่วยสะสม 48 ราย • ตัวอย่าง Vitamin Boost</p>
                </div>
              </div>

              {/* Story Narrative */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-rose-300 bg-rose-500/15 border border-rose-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {CASE_FILE_01.caseId} • {CASE_FILE_01.urgency}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white font-sans">
                  {CASE_FILE_01.titleThai}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  มีรายงานฉุกเฉินจากกระทรวงสาธารณสุขว่า ประชาชนเข้ารับการรักษาหลังดื่มเครื่องดื่มเสริมวิตามินซี <span className="text-sky-300 font-semibold">'Vitamin Boost'</span> แต่ผลตรวจจากแล็บภายนอก 3 แห่งกลับขัดแย้งกันอย่างสิ้นเชิง!
                </p>
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed">
                  <p className="text-sky-400 font-semibold">👤 ผู้อำนวยการ Director Alan มอบหมายภารกิจ:</p>
                  <p className="italic text-slate-300">"ยินดีต้อนรับ Analyst {name} ({avatar})! ขอให้ท่านใช้ทักษะการไทเทรตเพื่อค้นหาความจริงจากหลักฐานทางนิติวิทยาศาสตร์!"</p>
                </div>
              </div>

            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setStep(1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium px-5 py-2.5 rounded-xl text-xs border border-slate-700 transition-all"
              >
                ย้อนกลับแก้ไขข้อมูล
              </button>

              <button
                type="button"
                onClick={handleStartInvestigation}
                className="w-full sm:w-auto btn-primary text-white font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 text-base shadow-lg"
              >
                <Sparkles className="w-5 h-5" />
                <span>เริ่มการสืบสวนคดีทันที! (Begin Investigation)</span>
              </button>
            </div>

          </div>
        )}

        {/* Credit Note */}
        <div className="pt-2 text-center text-xs text-slate-400 font-sans border-t border-slate-800/80 mt-6">
          <p>
            พัฒนาระบบโดย <span className="text-slate-200 font-semibold">นายธนพล สติแน่</span> และ <span className="text-slate-200 font-semibold">นายโพธิศักดิ์ โพธิเสน</span> โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย พิษณุโลก
          </p>
        </div>

      </div>
    </div>
  );
};
