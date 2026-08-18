import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../utils/audio';
import { UserCheck, X, Save, Sparkles, User } from 'lucide-react';

export const StudentProfileModal = ({ isOpen, onClose }) => {
  const { studentInfo, setStudentInfo } = useGameStore();

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

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playClick();

    if (!name.trim() || !surname.trim()) {
      setErrorMsg('กรุณาระบุชื่อและนามสกุลให้ครบถ้วนเพื่อพิมพ์ลงบนเกียรติบัตร');
      sound.playError();
      return;
    }

    setStudentInfo({
      name: name.trim(),
      surname: surname.trim(),
      grade: grade.trim() || 'ม.5/1',
      studentNo: studentNo.trim() || '1',
      avatar
    });

    sound.playSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in no-print font-sans">
      <div className="relative w-full max-w-lg glass-card rounded-2xl p-6 md:p-7 shadow-2xl border border-slate-700/80 space-y-5 text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/15 text-sky-400 rounded-xl border border-sky-500/30">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                INVESTIGATOR CREDENTIALS
              </span>
              <h3 className="font-bold text-lg text-white">
                ข้อมูลผู้สืบสวนนักเคมี
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Note banner */}
        <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <p>
            ข้อมูลนี้จะถูกนำไปพิมพ์ลงบน <span className="font-bold text-sky-300">ใบประกาศเกียรติคุณ (Certificate)</span> อย่างเป็นทางการเมื่อท่านปิดคดีสำเร็จ
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-500/15 border border-rose-400/40 text-rose-300 rounded-xl text-sm font-medium text-center">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Avatar Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              เลือกรูปประจำตัวนักวิทยาศาสตร์ (Scientist Avatar):
            </label>
            <div className="grid grid-cols-4 gap-2">
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
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
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
                ชื่อจริง: *
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
                นามสกุล: *
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
                ชั้นเรียน: *
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
                เลขที่: *
              </label>
              <input
                type="text"
                required
                value={studentNo}
                onChange={(e) => setStudentNo(e.target.value)}
                placeholder="เช่น 1"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2.5 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-4 py-2 rounded-xl text-xs transition-all"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="btn-primary text-white font-semibold px-5 py-2 rounded-xl flex items-center gap-1.5 text-xs shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>บันทึกข้อมูล</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
