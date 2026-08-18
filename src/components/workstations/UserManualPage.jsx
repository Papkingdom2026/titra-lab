import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../utils/audio';
import { 
  FlaskConical, 
  ArrowLeft, 
  Printer, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  BookOpen, 
  HelpCircle, 
  Compass, 
  ShieldCheck, 
  Pipette, 
  Calculator, 
  FileText, 
  Star,
  Users,
  Search,
  Zap
} from 'lucide-react';

export const UserManualPage = () => {
  const { setActiveWorkstation } = useGameStore();

  const handleBackToGame = () => {
    sound.playClick();
    setActiveWorkstation('casefile');
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleDownloadInfographic = () => {
    sound.playSuccess();
    const link = document.createElement('a');
    link.href = '/infographic_user_manual.jpg';
    link.download = 'TITRA_User_Manual_Infographic.jpg';
    link.click();
  };

  return (
    <div className="bg-slate-100 min-h-screen text-slate-900 py-6 md:py-10 px-3 md:px-6 font-sans">
      
      {/* Top Floating Control Bar (No Print) */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl shadow-md border border-slate-200 no-print">
        <button
          onClick={handleBackToGame}
          className="w-full sm:w-auto btn-primary text-white font-bold px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer hover:scale-[1.02] transition-transform"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>🔙 กลับสู่ห้องแล็บสืบสวน (Back to Lab Game)</span>
        </button>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            onClick={handleDownloadInfographic}
            className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs md:text-sm shadow-sm cursor-pointer transition-all"
          >
            <Download className="w-4 h-4" />
            <span>📥 ดาวน์โหลดภาพสรุป (Infographic)</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-initial bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs md:text-sm shadow-sm cursor-pointer transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>🖨️ สั่งพิมพ์คู่มือ (Print A4)</span>
          </button>
        </div>
      </div>

      {/* Main White Infographic Poster Container */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl p-6 md:p-10 shadow-2xl border-4 border-sky-600 space-y-8">
        
        {/* ========================================================================= */}
        {/* HEADER & BRAND BANNER */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-b-4 border-sky-500 pb-6">
          
          {/* Left / Center Title */}
          <div className="lg:col-span-8 flex items-center gap-4 md:gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg border-2 border-amber-300 shrink-0">
              <FlaskConical className="w-10 h-10 text-white stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                คู่มือการใช้งานสื่อจำลองการสืบสวนนิติเคมี
              </h1>
              <h2 className="text-2xl md:text-4xl font-extrabold text-sky-700 uppercase tracking-wide mt-0.5">
                TITRA: The Chemical Investigation
              </h2>
              <p className="text-sm md:text-base font-semibold text-slate-600 mt-1">
                (ทุกหยดที่หยดลงไป เปิดเผยความจริง)
              </p>
            </div>
          </div>

          {/* Right Concept Box */}
          <div className="lg:col-span-4 bg-sky-50 border-2 border-sky-300 rounded-2xl p-4 space-y-1.5 shadow-sm">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-sm md:text-base">
              <span className="p-1 bg-rose-100 rounded-lg">🎯</span>
              <span>เกี่ยวกับสื่อการเรียนรู้นี้</span>
            </div>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
              <b>TITRA: The Chemical Investigation</b> เป็นเกมจำลองห้องปฏิบัติการสืบสวนนิติวิทยาศาสตร์เคมี ผู้เรียนจะได้รับบทบาทเป็น <b>เจ้าหน้าที่นักวิเคราะห์เคมี (Forensic Chemical Analyst)</b> เพื่อคลี่คลายคดี <b>Case File 01: The Vitamin Boost Investigation</b> ผ่านการไทเทรต การปรับมาตรฐานสารละลาย การคัดแยก Outlier และการเขียนรายงานสรุปเชิงประจักษ์ (CER) เพื่อรับใบประกาศเกียรติคุณ
            </p>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: GETTING STARTED */}
        {/* ========================================================================= */}
        <div className="bg-sky-900 text-white rounded-2xl p-4 flex items-center gap-2.5 shadow-md">
          <span className="text-xl">🚀</span>
          <h3 className="font-extrabold text-lg md:text-xl">ขั้นตอนการเข้าใช้งานตั้งแต่เริ่มต้น</h3>
        </div>

        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-sky-600 text-white font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <div className="space-y-1">
                <h4 className="font-bold text-base md:text-lg text-slate-900">
                  หน้าลงทะเบียนเจ้าหน้าที่ (Investigator Registration)
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  เมื่อเปิดเว็บไซต์ขึ้นมาเป็นครั้งแรก ให้กรอกข้อมูลผู้เรียน:
                </p>
                <ul className="text-xs md:text-sm text-slate-700 space-y-1 pl-2 font-medium">
                  <li>• <b>ชื่อจริง (First Name)</b> และ <b>นามสกุล (Surname)</b></li>
                  <li>• <b>ชั้นมัธยมศึกษา (Grade)</b> (เช่น ม.5/1)</li>
                  <li>• <b>เลขที่ (Student No.)</b></li>
                  <li>• <b>เลือกรูปประจำตัวนักวิทยาศาสตร์ (Avatar)</b></li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <span className="w-8 h-8 rounded-xl bg-sky-600 text-white font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <h4 className="font-bold text-sm md:text-base text-slate-900">
                  คลิกปุ่ม "ถัดไป: อ่านสถานการณ์ฉุกเฉิน"
                </h4>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-sky-600 text-white font-bold flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <h4 className="font-bold text-sm md:text-base text-slate-900">
                  อ่านบทสรุปสถานการณ์คดีและภาพหลักฐาน แล้วคลิก "เริ่มการสืบสวนคดีทันที! (Begin Investigation)"
                </h4>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 bg-white p-4 rounded-xl border border-slate-300 shadow-inner space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <Users className="w-4 h-4 text-sky-600" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">ตัวอย่างแบบฟอร์มลงทะเบียน</span>
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div className="bg-slate-100 p-2 rounded border border-slate-200 text-slate-600">ชื่อ: สมชาย • นามสกุล: ใจดี</div>
              <div className="bg-slate-100 p-2 rounded border border-slate-200 text-slate-600">ชั้น: ม.5/1 • เลขที่: 1</div>
              <div className="flex items-center justify-center gap-3 pt-1 text-2xl">
                <span>👨‍🔬</span><span>👩‍🔬</span><span>🔬</span><span>🧬</span>
              </div>
            </div>
            <button
              onClick={handleBackToGame}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 rounded-lg text-xs shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>เริ่มการสืบสวนคดีทันที!</span>
            </button>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: 6 WORKSTATIONS WALKTHROUGH */}
        {/* ========================================================================= */}
        <div className="bg-sky-900 text-white rounded-2xl p-4 flex items-center gap-2.5 shadow-md">
          <span className="text-xl">🔬</span>
          <h3 className="font-extrabold text-lg md:text-xl">คู่มือการปฏิบัติการทั้ง 6 ด่าน (Workstations Walkthrough)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Card 1: Phase 1 */}
          <div className="bg-white border-2 border-sky-300 rounded-2xl p-5 shadow-md flex flex-col justify-between space-y-3 hover:border-sky-500 transition-colors">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-sky-100 rounded-xl text-sky-700">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 uppercase">Phase 1</span>
                  <h4 className="font-extrabold text-base text-slate-900">ไฟล์คดี (Case File)</h4>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium">
                <b>ภารกิจ:</b> รวบรวมข้อมูลข่าวสาร ตรวจสอบฉลากขวด และเลือกอุปกรณ์ห้องปฏิบัติการที่แม่นยำสูง
              </p>

              <div className="space-y-1 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900">ขั้นตอนปฏิบัติ:</p>
                <p>1. <b>Activity 1 (วิเคราะห์ข่าว):</b> คลิกการ์ดข่าวสารเพื่อไฮไลต์ประเด็นสำคัญ (ผู้ป่วย 48 ราย, แล็บขัดแย้ง)</p>
                <p>2. <b>Activity 2 (ตรวจฉลาก):</b> คลิกเลือกข้อสงสัยบนฉลาก (วิตามินซี 1,000 mg/ขวด)</p>
                <p>3. <b>Activity 3 (เลือกอุปกรณ์):</b> เลือกเครื่องแก้วแม่นยำ 6 ชิ้น:</p>
                <div className="pl-2 space-y-0.5 text-[11px] text-slate-600">
                  <p>✅ บิวเรตต์ 50 mL • ปิเปตต์ 25 mL</p>
                  <p>✅ ขวดรูปชมพู่ 250 mL • ฟีนอล์ฟทาลีน</p>
                  <p>✅ ขาตั้งบิวเรตต์ • ขวดฉีดน้ำกลั่น</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold bg-sky-50 p-2.5 rounded-xl text-sky-800 border border-sky-200">
              <span className="flex items-center gap-1">🧪 Lab Rookie</span>
              <span className="font-mono bg-sky-200 px-2 py-0.5 rounded text-sky-900">+100 XP</span>
            </div>
          </div>

          {/* Card 2: Phase 2 */}
          <div className="bg-white border-2 border-emerald-300 rounded-2xl p-5 shadow-md flex flex-col justify-between space-y-3 hover:border-emerald-500 transition-colors">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-100 rounded-xl text-emerald-700">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">Phase 2</span>
                  <h4 className="font-extrabold text-base text-slate-900">สารมาตรฐาน (Standard)</h4>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium">
                <b>ภารกิจ:</b> แก้ปัญหาผลตรวจแล็บขัดแย้งกัน โดยเลือกสารมาตรฐานปฐมภูมิปรับมาตรฐาน NaOH ให้ได้ความเข้มข้นที่แม่นยำ 0.1000 M
              </p>

              <div className="space-y-1 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900">ขั้นตอนปฏิบัติ:</p>
                <p>1. ศึกษาตารางเปรียบเทียบผลแล็บภายนอก 3 แห่ง</p>
                <p>2. ใน Activity 2 คลิกเลือก <b>"KHP (Potassium Hydrogen Phthalate)"</b></p>
                <p>3. คลิกปุ่ม <b>"ยืนยันการเลือกสารมาตรฐานปฐมภูมิ KHP"</b> เพื่อสร้างค่าอ้างอิงแน่นอน 0.1000 M</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold bg-emerald-50 p-2.5 rounded-xl text-emerald-800 border border-emerald-200">
              <span className="flex items-center gap-1">📏 Precision Master</span>
              <span className="font-mono bg-emerald-200 px-2 py-0.5 rounded text-emerald-900">+150 XP</span>
            </div>
          </div>

          {/* Card 3: Phase 3 */}
          <div className="bg-white border-2 border-purple-300 rounded-2xl p-5 shadow-md flex flex-col justify-between space-y-3 hover:border-purple-500 transition-colors">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-purple-100 rounded-xl text-purple-700">
                  <Pipette className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 uppercase">Phase 3</span>
                  <h4 className="font-extrabold text-base text-slate-900">การไทเทรต (Analysis)</h4>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium">
                <b>ภารกิจ:</b> ควบคุมบิวเรตต์หยด NaOH ไทเทรตตัวอย่างเครื่องดื่ม Vitamin Boost ครบ 3 ซ้ำ (3 Trials)
              </p>

              <div className="space-y-1 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900">ขั้นตอนปฏิบัติ:</p>
                <p>1. <b>Trial 1 (ซ้ำที่ 1):</b> จุดยุติสีชมพูระเรื่อที่ <b>2.82 mL</b></p>
                <p>2. <b>Trial 2 (ซ้ำที่ 2):</b> จุดยุติสีชมพูระเรื่อที่ <b>2.84 mL</b></p>
                <p>3. <b>Trial 3 (ซ้ำที่ 3):</b> จุดยุติสีชมพูระเรื่อที่ <b>3.56 mL</b></p>
                <p>4. บันทึกผลครบทั้ง 3 ซ้ำ แล้วคลิกปุ่ม <i>"ไปต่อ Phase 4: การคำนวณ"</i></p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold bg-purple-50 p-2.5 rounded-xl text-purple-800 border border-purple-200">
              <span className="flex items-center gap-1">🎯 Precision Analyst</span>
              <span className="font-mono bg-purple-200 px-2 py-0.5 rounded text-purple-900">+100 XP</span>
            </div>
          </div>

          {/* Card 4: Phase 4 */}
          <div className="bg-white border-2 border-amber-300 rounded-2xl p-5 shadow-md flex flex-col justify-between space-y-3 hover:border-amber-500 transition-colors">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-100 rounded-xl text-amber-700">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase">Phase 4</span>
                  <h4 className="font-extrabold text-base text-slate-900">การคำนวณ (Calculation)</h4>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium">
                <b>ภารกิจ:</b> ตรวจหาค่า Outlier คัดแยกข้อมูลที่ผิดพลาด และคำนวณความเข้มข้นและมวลวิตามินซี
              </p>

              <div className="space-y-1 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900">ขั้นตอนปฏิบัติ:</p>
                <p>1. <b>ข้อ 1 (เลือก Outlier):</b> เลือก Trial 3 (3.56 mL)</p>
                <p>2. <b>ข้อ 2 (ปริมาตรเฉลี่ย):</b> V̄ = (2.82 + 2.84)/2 = <b>2.84 mL</b></p>
                <p>3. <b>ข้อ 3 (ความเข้มข้นกรด):</b> C₁ = (0.1000 × 2.84)/25.00 = <b>0.01136 M</b></p>
                <p>4. <b>ข้อ 4 (มวลวิตามินซี):</b> คำนวณใน 250 mL ➔ <b>500 mg (หรือ 0.500 g)</b></p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold bg-amber-50 p-2.5 rounded-xl text-amber-800 border border-amber-200">
              <span className="flex items-center gap-1">🧠 Critical Thinker</span>
              <span className="font-mono bg-amber-200 px-2 py-0.5 rounded text-amber-900">+200 XP</span>
            </div>
          </div>

          {/* Card 5: Phase 5 */}
          <div className="bg-white border-2 border-rose-300 rounded-2xl p-5 shadow-md flex flex-col justify-between space-y-3 hover:border-rose-500 transition-colors">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-rose-100 rounded-xl text-rose-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 uppercase">Phase 5</span>
                  <h4 className="font-extrabold text-base text-slate-900">รายงาน CER (Verdict)</h4>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium">
                <b>ภารกิจ:</b> สรุปคำตัดสินคดีเพื่อยื่นต่อผู้อำนวยการ Director Alan ตามหลัก Claim-Evidence-Reasoning
              </p>

              <div className="space-y-1 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900">ขั้นตอนปฏิบัติ:</p>
                <p>1. <b>Claim:</b> เลือกข้อกล่าวอ้างที่ถูกต้อง</p>
                <p>2. <b>Evidence:</b> เลือกหลักฐาน NaOH 0.1000 M และ C1 = 0.01136 M</p>
                <p>3. <b>Reasoning:</b> เลือกเหตุผลทางเคมีนิติวิทยาศาสตร์</p>
                <p>4. คลิกปุ่ม <b>"ยื่นรายงาน CER สรุปผลการสืบสวน"</b></p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold bg-rose-50 p-2.5 rounded-xl text-rose-800 border border-rose-200">
              <span className="flex items-center gap-1">🏆 Chief Investigator</span>
              <span className="font-mono bg-rose-200 px-2 py-0.5 rounded text-rose-900">+300 XP</span>
            </div>
          </div>

          {/* Card 6: Phase 6 - Quiz */}
          <div className="bg-white border-2 border-sky-300 rounded-2xl p-5 shadow-md flex flex-col justify-between space-y-3 hover:border-sky-500 transition-colors">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-sky-100 rounded-xl text-sky-700">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 uppercase">Phase 6</span>
                  <h4 className="font-extrabold text-base text-slate-900">แบบทดสอบ (Quiz 10 ข้อ)</h4>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium">
                <b>ภารกิจ:</b> ทำแบบทดสอบท้ายบทเรียน 10 ข้อ (ปรนัย 6 ข้อ และอัตนัยคำนวณสั้น 4 ข้อ)
              </p>

              <div className="space-y-1 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900">รายละเอียดแบบทดสอบ:</p>
                <p>• ข้อ 1-6: ปรนัยเลือกตอบ ก-ง</p>
                <p>• ข้อ 7-10: อัตนัยคำนวณสั้น (2.84 mL, 50.0 mg, 500 mg, 99.6%)</p>
                <p>• มีเฉลยพร้อมคำอธิบายหลักการวิทยาศาสตร์ทุกข้อ</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold bg-sky-50 p-2.5 rounded-xl text-sky-800 border border-sky-200">
              <span className="flex items-center gap-1">🎓 Forensic Scholar</span>
              <span className="font-mono bg-sky-200 px-2 py-0.5 rounded text-sky-900">+300 XP</span>
            </div>
          </div>

          {/* Card 7: Certificate */}
          <div className="bg-white border-2 border-yellow-400 rounded-2xl p-5 shadow-md flex flex-col justify-between space-y-3 hover:border-yellow-500 transition-colors bg-gradient-to-b from-yellow-50/30 to-white">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-100 rounded-xl text-amber-700">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase">Phase 7</span>
                  <h4 className="font-extrabold text-base text-slate-900">เกียรติบัตร (Certificate)</h4>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium">
                <b>สิ่งที่ได้รับ:</b> การประเมินผลคะแนนดาว 5 ระดับ ⭐⭐⭐⭐⭐ รวมผลสอบ และใบประกาศเกียรติคุณ
              </p>

              <div className="space-y-1 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900">การสั่งพิมพ์และดาวน์โหลด:</p>
                <p>• <b>📥 ดาวน์โหลดภาพเกียรติบัตร (HD PNG):</b> บันทึกไฟล์ภาพคมชัด 1600x1100 px</p>
                <p>• <b>🖨️ สั่งพิมพ์หรือบันทึกเป็น PDF:</b> พิมพ์ออกกระดาษ A4 แนวนอน พร้อมส่งครูผู้สอน</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold bg-amber-50 p-2.5 rounded-xl text-amber-800 border border-amber-200">
              <span className="flex items-center gap-1">⭐⭐⭐⭐⭐ 5-Star System</span>
              <span className="font-mono bg-amber-200 px-2 py-0.5 rounded text-amber-900">1100+ XP & 9+ ข้อ Gold</span>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: ADDITIONAL HELP TOOLS */}
        {/* ========================================================================= */}
        <div className="bg-sky-900 text-white rounded-2xl p-4 flex items-center gap-2.5 shadow-md">
          <span className="text-xl">💡</span>
          <h3 className="font-extrabold text-lg md:text-xl">เครื่องมือช่วยเหลือเพิ่มเติม</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
              <BookOpen className="w-5 h-5 text-amber-700" />
              <span>1. สมุดบันทึกเคมี & สูตร</span>
            </div>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
              คลิกที่ปุ่มสีทอง <b>"📖 สมุดบันทึกเคมี & สูตร"</b> ด้านซ้ายมือเพื่อเปิดดูสูตรคำนวณ ตารางสีฟีนอล์ฟทาเลอีน และพิมพ์บันทึกส่วนตัว
            </p>
          </div>

          <div className="bg-sky-50 border-2 border-sky-300 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-sky-900 font-bold text-base">
              <HelpCircle className="w-5 h-5 text-sky-700" />
              <span>2. ระบบคำแนะนำ (Hints)</span>
            </div>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
              คลิกปุ่ม <b>"คำแนะนำ"</b> ด้านบนขวาเพื่อขอคำชี้แนะทีละระดับ (Level 1-6) จาก Dr. Maya เมื่อเกิดข้อสงสัย
            </p>
          </div>

          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
              <Compass className="w-5 h-5 text-emerald-700" />
              <span>3. สอนใช้งาน (Tour)</span>
            </div>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
              คลิกปุ่ม <b>"สอนใช้งาน (Tour)"</b> เพื่อเปิดดูภาพรวมของหน้าจอ ปุ่มควบคุม และขั้นตอนการสืบสวนคดีได้ตลอดเวลา
            </p>
          </div>

        </div>

        {/* Bottom Back Button */}
        <div className="pt-4 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
          <p className="text-xs text-slate-500 font-mono">
            TITRA LABS • National Food Safety Investigation Center (NFSIC-2045)
          </p>
          <button
            onClick={handleBackToGame}
            className="w-full sm:w-auto btn-primary text-white font-bold px-8 py-3 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับสู่ห้องแล็บสืบสวน (Back to Lab Game)</span>
          </button>
        </div>

      </div>

    </div>
  );
};
