import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { CharacterDialogueCard } from '../common/CharacterDialogueCard';
import { sound } from '../../utils/audio';
import { BookOpen, Plus, Clock, Bookmark, Tag, StickyNote, PenTool, Sparkles } from 'lucide-react';

export const NotebookWorkstation = () => {
  const { notebookEntries, addNotebookEntry } = useGameStore();

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("ทั้งหมด");

  const categories = ["ทั้งหมด", "ข้อมูลคดี", "สูตรและทฤษฎี", "เฟส 1", "เฟส 2", "เฟส 3", "เฟส 4", "เฟส 5", "บันทึกส่วนตัว"];

  const handleAddNote = (e) => {
    e.preventDefault();
    sound.playClick();
    if (!newTitle.trim() || !newContent.trim()) return;
    addNotebookEntry(newTitle.trim(), newContent.trim(), "บันทึกส่วนตัว");
    sound.playSuccess();
    setNewTitle("");
    setNewContent("");
  };

  const handleCategoryClick = (cat) => {
    sound.playClick();
    setActiveCategoryFilter(cat);
  };

  const filteredEntries = activeCategoryFilter === "ทั้งหมด" 
    ? notebookEntries 
    : notebookEntries.filter(entry => entry.category === activeCategoryFilter);

  return (
    <div className="space-y-6 pb-12 font-sans">
      
      {/* Header Banner - Warm Paper Binder Style */}
      <div className="bg-gradient-to-r from-amber-100 via-amber-50 to-orange-50 rounded-3xl p-6 md:p-8 border-2 border-amber-300 shadow-xl text-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-amber-900 bg-amber-200/80 border border-amber-400 px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
              <StickyNote className="w-4 h-4 text-amber-800" />
              FORENSIC LAB FIELD NOTEBOOK (สมุดบันทึกภาคสนาม)
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-amber-950 font-sans mt-2">
              สมุดบันทึกการสืบสวนและคู่มือทฤษฎีเคมี
            </h2>
            <p className="text-sm md:text-base text-amber-900/90 mt-1 font-medium">
              รวบรวมหลักฐาน ตัวเลขการทดลอง สูตรเคมีนิติวิทยาศาสตร์ และบันทึกข้อสังเกตส่วนตัว
            </p>
          </div>
          <div className="bg-amber-200/90 border border-amber-400 px-5 py-2.5 rounded-2xl text-sm font-bold text-amber-950 shadow-sm shrink-0 flex items-center gap-2">
            <PenTool className="w-4 h-4 text-amber-800" />
            <span>📝 บันทึกทั้งหมด: {notebookEntries.length} รายการ</span>
          </div>
        </div>
      </div>

      {/* Character Dialogue Chat Box */}
      <CharacterDialogueCard 
        characterId="maya"
        title="คำแนะนำสมุดบันทึกจาก Dr. Maya"
        text="สมุดบันทึกเล่มนี้คือคลังองค์ความรู้ของนักวิเคราะห์เคมีครับ! คุณสามารถเปิดสลับดูสูตรคำนวณ ตารางดรรชนีฟีนอล์ฟทาเลอีน หรือเพิ่มบันทึกข้อสังเกตส่วนตัวได้ตลอดเวลา ข้อมูลจะถูกบันทึกจริงลงในระบบครับ"
      />

      {/* Main Grid - Paper Theme */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Quick Reference Cheatsheet (Paper Card Style) */}
        <div className="lg:col-span-4 bg-amber-50/95 rounded-3xl p-5 md:p-6 space-y-4 border-2 border-amber-200 shadow-lg text-slate-900">
          <h3 className="font-extrabold text-base md:text-lg text-amber-950 flex items-center gap-2 border-b-2 border-amber-200 pb-3">
            <Bookmark className="w-5 h-5 text-amber-700" />
            <span>คู่มืออ้างอิงด่วน (Quick Reference)</span>
          </h3>

          <div className="space-y-4 text-sm text-slate-800">
            
            {/* Standardization Formula */}
            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm space-y-1.5">
              <span className="font-bold text-amber-900 text-xs uppercase tracking-wider block">
                สูตรการปรับมาตรฐาน (Standardization):
              </span>
              <div className="font-mono text-sky-900 font-extrabold bg-amber-100/60 p-3 rounded-xl border border-amber-200 text-xs md:text-sm">
                M_NaOH = (g_KHP / 204.22) × (1000 / V_NaOH)
              </div>
              <p className="text-xs text-amber-800">KHP บริสุทธิ์สูง &gt; 99.9% ไม่ดูดความชื้น</p>
            </div>

            {/* Stoichiometry Formula */}
            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm space-y-1.5">
              <span className="font-bold text-amber-900 text-xs uppercase tracking-wider block">
                สูตรปฏิกิริยาสะเทิน (Neutralization):
              </span>
              <div className="font-mono text-sky-900 font-extrabold bg-amber-100/60 p-3 rounded-xl border border-amber-200 text-xs md:text-sm">
                C₁V₁ = C₂V₂
              </div>
              <p className="text-xs text-amber-800">C₁ = ความเข้มข้นกรด, V₁ = 25.00 mL</p>
            </div>

            {/* Indicator Chart */}
            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm space-y-2">
              <span className="font-bold text-pink-800 text-xs uppercase tracking-wider block">
                Phenolphthalein Color Chart:
              </span>
              <ul className="space-y-2 text-xs md:text-sm">
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-slate-300 border border-slate-400 shrink-0"></span>
                  <span className="text-slate-700">pH &lt; 8.2 : ไม่มีสี (Colorless)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-pink-400 border border-pink-500 shrink-0"></span>
                  <span className="font-bold text-pink-700">pH 8.2 - 10.0 : ชมพูระเรื่อ (จุดยุติ)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-pink-600 border border-pink-700 shrink-0"></span>
                  <span className="text-pink-900 font-medium">pH &gt; 10.0 : ชมพูเข้ม (หยดเกิน)</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Right Column: Note Creator & Entries (Paper Lined Style) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Form */}
          <div className="bg-amber-50/95 rounded-3xl p-5 md:p-6 space-y-3.5 border-2 border-amber-200 shadow-lg text-slate-900">
            <h3 className="font-extrabold text-base text-amber-950 flex items-center gap-2 border-b-2 border-amber-200 pb-3">
              <Plus className="w-5 h-5 text-amber-700" />
              <span>เพิ่มบันทึกการสังเกตส่วนตัว (Add Personal Note)</span>
            </h3>

            <form onSubmit={handleAddNote} className="space-y-3">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="หัวข้อบันทึก (เช่น ข้อสังเกตสีจุดยุติ Trial 2)"
                className="w-full bg-white border-2 border-amber-200 rounded-xl px-4 py-2.5 text-sm md:text-base text-slate-900 focus:outline-none focus:border-amber-500 font-semibold placeholder:text-slate-400 shadow-sm"
              />
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={3}
                placeholder="รายละเอียดข้อสังเกต ผลการทดลอง หรือข้อสันนิษฐานส่วนตัว..."
                className="w-full bg-white border-2 border-amber-200 rounded-xl px-4 py-2.5 text-sm md:text-base text-slate-900 focus:outline-none focus:border-amber-500 placeholder:text-slate-400 shadow-sm"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newTitle.trim() || !newContent.trim()}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 disabled:opacity-40 shadow-md transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>บันทึกโน้ตลงสมุด</span>
                </button>
              </div>
            </form>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                  activeCategoryFilter === cat
                    ? 'bg-amber-500 text-amber-950 shadow-md ring-2 ring-amber-400'
                    : 'bg-amber-100/80 text-amber-900 hover:bg-amber-200 border border-amber-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Note Feed - Paper Sticky Note Style */}
          <div className="space-y-3.5">
            {filteredEntries.map((entry) => (
              <div 
                key={entry.id}
                className="bg-white rounded-2xl p-5 space-y-2 border-2 border-amber-200 shadow-md transition-all hover:border-amber-400"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold px-3 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                      {entry.category}
                    </span>
                    <h4 className="font-extrabold text-base text-amber-950">{entry.title}</h4>
                  </div>
                  <span className="text-xs text-amber-800 flex items-center gap-1 font-mono font-semibold">
                    <Clock className="w-3.5 h-3.5 text-amber-700" /> {entry.timestamp}
                  </span>
                </div>
                <p className="text-sm md:text-base text-slate-800 leading-relaxed font-sans whitespace-pre-line bg-amber-50/70 p-4 rounded-xl border border-amber-100 font-normal">
                  {entry.content}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
