import React, { useRef, useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { BADGES } from '../../data/caseData';
import { CharacterDialogueCard } from '../common/CharacterDialogueCard';
import { sound } from '../../utils/audio';
import { 
  Award, 
  Printer, 
  Download, 
  Star, 
  Flame, 
  BadgeCheck, 
  CheckCircle2, 
  RotateCcw,
  Sparkles,
  BookOpen,
  Share2
} from 'lucide-react';

export const CertificateWorkstation = () => {
  const { studentInfo, xp, unlockedBadges, isPhase5Complete, resetGame } = useGameStore();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const certRef = useRef(null);

  // 5-Star Dynamic Performance Rating based on XP & Accuracy
  const getPerformanceRating = () => {
    if (xp >= 900) {
      return {
        stars: 5,
        title: 'ระดับยอดเยี่ยม 5 ดาว: หัวหน้านักวิเคราะห์นิติเคมีเกียรตินิยมเหรียญทอง (Master Forensic Expert)',
        subtext: 'ปฏิบัติภารกิจได้อย่างแม่นยำสูงสุด ไร้ข้อผิดพลาดทางข้อมูล มีความซื่อสัตย์ต่อหลักฐาน สมควรได้รับเกียรตินิยมเหรียญทอง',
        color: 'text-amber-400',
        starClass: 'text-amber-400 fill-amber-400',
        tierName: '5-Star Gold Honor'
      };
    }
    if (xp >= 750) {
      return {
        stars: 4,
        title: 'ระดับดีเด่น 4 ดาว: นักวิเคราะห์เคมีชำนาญการพิเศษ (Senior Forensic Analyst)',
        subtext: 'ปฏิบัติภารกิจได้ถูกต้องตามมาตรฐานวิชาชีพ มีความรอบคอบและวิเคราะห์ข้อมูลได้อย่างดีเยี่ยม',
        color: 'text-sky-300',
        starClass: 'text-amber-400 fill-amber-400',
        tierName: '4-Star Silver Honor'
      };
    }
    if (xp >= 600) {
      return {
        stars: 3,
        title: 'ระดับดี 3 ดาว: เจ้าหน้าที่นิติเคมีชำนาญการ (Professional Chemical Investigator)',
        subtext: 'ปฏิบัติการทดลองและคำนวณผ่านเกณฑ์มาตรฐาน สามารถสรุปรายงานปิดคดีได้อย่างถูกต้อง',
        color: 'text-emerald-300',
        starClass: 'text-amber-400 fill-amber-400',
        tierName: '3-Star Bronze Honor'
      };
    }
    if (xp >= 450) {
      return {
        stars: 2,
        title: 'ระดับผ่านเกณฑ์ 2 ดาว: ผู้ช่วยนักวิเคราะห์นิติเคมี (Assistant Forensic Analyst)',
        subtext: 'ผ่านการทดสอบตามเกณฑ์พื้นฐาน มีการใช้ตัวช่วยและปรับปรุงแก้ไขจนสำเร็จภารกิจ',
        color: 'text-slate-300',
        starClass: 'text-amber-400 fill-amber-400',
        tierName: '2-Star Standard Pass'
      };
    }
    return {
      stars: 1,
      title: 'ระดับฝึกหัด 1 ดาว: นักวิเคราะห์เคมีฝึกหัด (Trainee Forensic Analyst)',
      subtext: 'สำเร็จการสืบสวนคดีขั้นต้น ควรทบทวนทักษะการคำนวณและการทดลองเพิ่มเติม',
      color: 'text-slate-400',
      starClass: 'text-amber-400 fill-amber-400',
      tierName: '1-Star Trainee'
    };
  };

  const rating = getPerformanceRating();

  const handlePrintCertificate = () => {
    sound.playClick();

    const studentFullName = studentInfo.name 
      ? `${studentInfo.name} ${studentInfo.surname}`
      : 'เจ้าหน้าที่ผู้สืบสวนนักเคมีรุ่นเยาว์';

    const badgesHtml = unlockedBadges.map((bId) => {
      const b = BADGES.find(x => x.id === bId) || { name: bId, icon: '🏆' };
      return `<span style="display:inline-block; border:1px solid #cbd5e1; padding:5px 12px; border-radius:8px; font-size:13px; margin:3px 4px; background:#f8fafc; font-weight:600;">${b.icon} ${b.name}</span>`;
    }).join(' ');

    const starsHtml = '⭐'.repeat(rating.stars);

    const printWin = window.open('', '_blank', 'width=1150,height=800');
    if (!printWin) {
      window.print();
      return;
    }

    printWin.document.write(`
      <!DOCTYPE html>
      <html lang="th">
      <head>
        <meta charset="UTF-8" />
        <title>ใบประกาศเกียรติคุณ - TITRA Forensic Chemistry</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          @page { size: A4 landscape; margin: 8mm; }
          * { box-sizing: border-box; font-family: 'IBM Plex Sans Thai', sans-serif; }
          body {
            margin: 0; padding: 25px; background: #ffffff; color: #0f172a;
            display: flex; align-items: center; justify-content: center; min-height: 95vh;
          }
          .cert-container {
            width: 100%; max-width: 1020px; border: 8px double #0284c7; border-radius: 18px;
            padding: 35px 45px; text-align: center; background: #ffffff;
            box-shadow: 0 0 15px rgba(0,0,0,0.06);
          }
          .inst-title { font-size: 13px; font-weight: 700; color: #0284c7; letter-spacing: 2.5px; text-transform: uppercase; }
          h1 { font-size: 34px; font-weight: 800; color: #0f172a; margin: 10px 0 2px 0; text-transform: uppercase; letter-spacing: 1px; }
          .sub-title { font-size: 13px; font-weight: 600; color: #64748b; font-family: monospace; }
          .divider { width: 120px; height: 3px; background: #0284c7; border: none; margin: 15px auto; border-radius: 2px; }
          .cert-name { font-size: 30px; font-weight: 700; color: #0369a1; margin: 12px 0 4px 0; }
          .cert-class { font-size: 16px; font-weight: 600; color: #475569; }
          .cert-desc { font-size: 15px; color: #334155; line-height: 1.7; max-width: 780px; margin: 16px auto; padding: 14px 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; }
          .badge-row { margin: 14px 0; }
          .rating-box { font-size: 15px; font-weight: 700; color: #b45309; margin: 8px 0; }
          .sig-row { display: flex; justify-content: space-around; margin-top: 32px; font-size: 14px; }
          .sig-box { width: 220px; text-align: center; }
          .sig-line { border-top: 1px solid #94a3b8; padding-top: 8px; }
          .footer-note { font-size: 11.5px; color: #94a3b8; font-family: monospace; margin-top: 22px; }
        </style>
      </head>
      <body>
        <div class="cert-container">
          <div class="inst-title">NATIONAL FOOD SAFETY INVESTIGATION CENTER (NFSIC)</div>
          <h1>ใบประกาศเกียรติคุณ</h1>
          <div class="sub-title">CERTIFICATE OF FORENSIC CHEMICAL ANALYSIS EXCELLENCE</div>
          <div class="divider"></div>

          <div style="font-size: 14.5px; color: #64748b;">มอบให้ไว้เพื่อแสดงว่า</div>
          <div class="cert-name">${studentFullName}</div>
          <div class="cert-class">ชั้นมัธยมศึกษาปีที่ ${studentInfo.grade || '5'} • เลขที่ ${studentInfo.studentNo || '1'} ${studentInfo.avatar || '👨‍🔬'}</div>

          <p class="cert-desc">
            ได้ปฏิบัติภารกิจการสืบสวนนิติวิทยาศาสตร์เคมีในคดี <b>Case File 01: The Vitamin Boost Investigation</b> สำเร็จลุล่วง ด้วยความเที่ยงตรง ความซื่อสัตย์ต่อข้อมูล และสามารถสร้างรายงานสรุปเชิงประจักษ์ (Claim-Evidence-Reasoning) ตามมาตรฐานระดับชาติ
          </p>

          <div class="rating-box">
            ผลการประเมิน: ${starsHtml} (${rating.title}) • คะแนนรวม ${xp} XP
          </div>

          <div class="badge-row">
            ${badgesHtml}
          </div>

          <div class="sig-row">
            <div class="sig-box">
              <div class="sig-line"><b>Director Alan</b><br><span style="color:#64748b; font-size:12.5px;">ผู้อำนวยการศูนย์ NFSIC</span></div>
            </div>
            <div class="sig-box">
              <div class="sig-line"><b>Dr. Maya</b><br><span style="color:#64748b; font-size:12.5px;">Senior Chemical Analyst</span></div>
            </div>
          </div>

          <div class="footer-note">
            ออกโดยระบบ TITRA Forensic Chemistry Simulator • พัฒนาระบบโดย นายธนพล สติแน่ และ นายโพธิศักดิ์ โพธิเสน โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย พิษณุโลก • วันที่ออกเอกสาร: ${new Date().toLocaleDateString('th-TH')}
          </div>
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
      </html>
    `);
    printWin.document.close();
  };

  // Direct High-Resolution HTML5 Canvas PNG Generator & Downloader
  const handleDownloadImage = () => {
    sound.playSuccess();
    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 1100;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 1600, 1100);

    // Border (Outer & Inner Double Blue)
    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 14;
    ctx.strokeRect(40, 40, 1520, 1020);
    ctx.strokeStyle = '#0369A1';
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 60, 1480, 980);

    // Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#0284C7';
    ctx.font = 'bold 24px "IBM Plex Sans Thai", sans-serif';
    ctx.fillText('NATIONAL FOOD SAFETY INVESTIGATION CENTER (NFSIC)', 800, 140);

    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 54px "IBM Plex Sans Thai", sans-serif';
    ctx.fillText('ใบประกาศเกียรติคุณ', 800, 220);

    ctx.fillStyle = '#64748B';
    ctx.font = '600 20px monospace';
    ctx.fillText('CERTIFICATE OF FORENSIC CHEMICAL ANALYSIS EXCELLENCE', 800, 260);

    // Blue line
    ctx.fillStyle = '#0284C7';
    ctx.fillRect(720, 285, 160, 4);

    // Recipient text
    ctx.fillStyle = '#64748B';
    ctx.font = '22px "IBM Plex Sans Thai", sans-serif';
    ctx.fillText('มอบให้ไว้เพื่อแสดงว่า', 800, 340);

    // Student Name
    const studentFullName = studentInfo.name ? `${studentInfo.name} ${studentInfo.surname}` : 'เจ้าหน้าที่ผู้สืบสวนนักเคมีรุ่นเยาว์';
    ctx.fillStyle = '#0369A1';
    ctx.font = 'bold 46px "IBM Plex Sans Thai", sans-serif';
    ctx.fillText(studentFullName, 800, 410);

    // Grade & Class
    ctx.fillStyle = '#475569';
    ctx.font = '600 24px "IBM Plex Sans Thai", sans-serif';
    ctx.fillText(`ชั้นมัธยมศึกษาปีที่ ${studentInfo.grade || '5'} • เลขที่ ${studentInfo.studentNo || '1'}`, 800, 460);

    // Description text box
    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(250, 500, 1100, 140);
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 2;
    ctx.strokeRect(250, 500, 1100, 140);

    ctx.fillStyle = '#334155';
    ctx.font = '20px "IBM Plex Sans Thai", sans-serif';
    ctx.fillText('ได้ปฏิบัติภารกิจการสืบสวนนิติวิทยาศาสตร์เคมีในคดี Case File 01: The Vitamin Boost Investigation สำเร็จลุล่วง', 800, 555);
    ctx.fillText('ด้วยความเที่ยงตรง ความซื่อสัตย์ต่อข้อมูล และสามารถสร้างรายงานสรุปเชิงประจักษ์ (CER) ตามมาตรฐานระดับชาติ', 800, 595);

    // Stars & Score
    ctx.fillStyle = '#B45309';
    ctx.font = 'bold 24px "IBM Plex Sans Thai", sans-serif';
    const starsText = '⭐'.repeat(rating.stars);
    ctx.fillText(`ผลการประเมิน: ${starsText} (${rating.title}) • คะแนนสะสม ${xp} XP`, 800, 690);

    // Signatures
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(350, 880);
    ctx.lineTo(590, 880);
    ctx.moveTo(1010, 880);
    ctx.lineTo(1250, 880);
    ctx.stroke();

    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 22px "IBM Plex Sans Thai", sans-serif';
    ctx.fillText('Director Alan', 470, 920);
    ctx.fillText('Dr. Maya', 1130, 920);

    ctx.fillStyle = '#64748B';
    ctx.font = '18px "IBM Plex Sans Thai", sans-serif';
    ctx.fillText('ผู้อำนวยการศูนย์ NFSIC', 470, 950);
    ctx.fillText('Senior Chemical Analyst', 1130, 950);

    // Footer
    ctx.fillStyle = '#94A3B8';
    ctx.font = '15px "IBM Plex Sans Thai", sans-serif';
    ctx.fillText(`ออกโดยระบบ TITRA Forensic Chemistry Simulator • พัฒนาระบบโดย นายธนพล สติแน่ และ นายโพธิศักดิ์ โพธิเสน รร.จ.ภ.พิษณุโลก • ${new Date().toLocaleDateString('th-TH')}`, 800, 1020);

    // Trigger local download
    const link = document.createElement('a');
    link.download = `TITRA_Certificate_${studentInfo.name || 'Analyst'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <div className="space-y-8 pb-16 font-sans">
      
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-5 md:p-6 border border-slate-700/70">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
              OFFICIAL CONFERMENT : FORENSIC CERTIFICATE OF EXCELLENCE
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-sans mt-1.5">
              ใบประกาศเกียรติคุณนักวิเคราะห์นิติเคมีดีเด่น
            </h2>
            <p className="text-sm text-slate-300 mt-1 font-normal">
              ออกโดยศูนย์วิเคราะห์ผลิตภัณฑ์อาหารแห่งชาติ (NFSIC) เพื่อเป็นเกียรติประวัติในการปิดคดีประวัติศาสตร์
            </p>
          </div>
          <div className="card-success px-5 py-2.5 rounded-xl text-emerald-300 flex items-center gap-2 text-sm font-bold shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>ภารกิจสืบสวนเสร็จสมบูรณ์ 100%</span>
          </div>
        </div>
      </div>

      {/* Character Dialogue Chat Box */}
      <CharacterDialogueCard 
        characterId="director"
        title="คำกล่าวแสดงความยินดีจาก Director Alan"
        text="ขอแสดงความยินดีกับคุณด้วยความจริงใจ! คุณได้พิสูจน์แล้วว่าการสืบสวนทางวิทยาศาสตร์ที่แท้จริง ต้องยึดถือหลักฐาน ความแม่นยำ และความซื่อสัตย์ต่อข้อมูลเสมอ ขอให้ใบประกาศเกียรติคุณนี้เป็นเกียรติประวัติอันน่าภาคภูมิใจของคุณครับ!"
      />

      {/* 5-STAR RATING & SCORE CARD */}
      <div className="glass-card rounded-3xl p-6 md:p-8 border-2 border-amber-500/50 bg-gradient-to-b from-slate-900/90 to-slate-950 text-center space-y-4 shadow-2xl animate-fade-in">
        <span className="text-xs font-bold text-amber-400 bg-amber-500/20 px-3.5 py-1 rounded-full uppercase tracking-widest border border-amber-400/40">
          MISSION EVALUATION SUMMARY (ระดับผลการประเมิน 5 ดาว)
        </span>
        
        {/* Animated 5 Stars */}
        <div className="flex items-center justify-center gap-2.5 py-1">
          {[1, 2, 3, 4, 5].map((starNum) => (
            <div key={starNum} className={`transition-all ${starNum <= rating.stars ? 'animate-star-pop' : 'opacity-25'}`}>
              <Star className={`w-8 h-8 md:w-11 md:h-11 ${starNum <= rating.stars ? rating.starClass : 'text-slate-600'}`} />
            </div>
          ))}
        </div>

        <div className="space-y-1">
          <h3 className={`text-2xl md:text-3xl font-extrabold ${rating.color}`}>
            {rating.title}
          </h3>
          <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            {rating.subtext}
          </p>
        </div>

        {/* Score & Badges Counter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <div className="bg-slate-900 px-5 py-2.5 rounded-2xl border border-slate-700 text-amber-300 font-mono font-bold text-base flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <span>คะแนน XP สะสม: {xp} XP</span>
          </div>
          <div className="bg-slate-900 px-5 py-2.5 rounded-2xl border border-slate-700 text-sky-300 font-mono font-bold text-base flex items-center gap-2">
            <BadgeCheck className="w-5 h-5 text-sky-400" />
            <span>เหรียญเกียรติยศ: {unlockedBadges.length} / 5 Badges</span>
          </div>
        </div>
      </div>

      {/* HIGH-DEFINITION CERTIFICATE FRAME (ON SCREEN) */}
      <div ref={certRef} className="bg-white text-slate-900 rounded-3xl p-6 md:p-10 shadow-2xl border-8 double border-sky-700 space-y-6 text-center animate-fade-in">
        
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-sky-800 bg-sky-100 px-3.5 py-1 rounded-full uppercase tracking-widest border border-sky-300 inline-block font-mono">
            NATIONAL FOOD SAFETY INVESTIGATION CENTER (NFSIC)
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 uppercase tracking-wide">
            ใบประกาศเกียรติคุณ
          </h2>
          <p className="text-xs md:text-sm font-semibold text-slate-600 font-mono">
            CERTIFICATE OF FORENSIC CHEMICAL ANALYSIS EXCELLENCE
          </p>
        </div>

        <div className="w-28 h-1 bg-sky-600 mx-auto rounded-full" />

        <div className="space-y-2 py-2">
          <p className="text-sm md:text-base text-slate-600">มอบให้ไว้เพื่อแสดงว่า</p>
          <h3 className="text-2xl md:text-3xl font-extrabold text-sky-900">
            {studentInfo.name ? `${studentInfo.name} ${studentInfo.surname}` : 'เจ้าหน้าที่ผู้สืบสวนนักเคมีรุ่นเยาว์'}
          </h3>
          <p className="text-sm md:text-base font-semibold text-slate-700 font-mono">
            ชั้นมัธยมศึกษาปีที่ {studentInfo.grade || '5'} • เลขที่ {studentInfo.studentNo || '1'} {studentInfo.avatar || '👨‍🔬'}
          </p>
        </div>

        <div className="max-w-2xl mx-auto text-sm md:text-base text-slate-800 leading-relaxed font-sans px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl">
          ได้ปฏิบัติภารกิจการสืบสวนนิติวิทยาศาสตร์เคมีในคดี <span className="font-bold text-sky-900 font-mono">Case File 01: The Vitamin Boost Investigation</span> สำเร็จลุล่วง ด้วยความเที่ยงตรง ความซื่อสัตย์ต่อข้อมูล และสามารถสร้างรายงานสรุปเชิงประจักษ์ (CER) ตามมาตรฐานระดับชาติ
        </div>

        {/* Badges Display */}
        <div className="py-1 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
            เหรียญเกียรติยศประจำตัวเจ้าหน้าที่:
          </span>
          <div className="flex items-center justify-center gap-2.5 flex-wrap">
            {unlockedBadges.map((bId) => {
              const b = BADGES.find(x => x.id === bId) || { name: bId, icon: '🏆' };
              return (
                <span key={bId} className="px-3.5 py-1.5 bg-amber-50 border border-amber-300 text-amber-900 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm">
                  <span>{b.icon}</span>
                  <span>{b.name}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Signatures */}
        <div className="pt-4 grid grid-cols-2 gap-8 max-w-lg mx-auto text-center text-xs md:text-sm">
          <div className="space-y-1 border-t border-slate-400 pt-2">
            <p className="font-bold text-slate-900 text-base">Director Alan</p>
            <p className="text-slate-600">ผู้อำนวยการศูนย์ NFSIC</p>
          </div>
          <div className="space-y-1 border-t border-slate-400 pt-2">
            <p className="font-bold text-slate-900 text-base">Dr. Maya</p>
            <p className="text-slate-600">Senior Chemical Analyst</p>
          </div>
        </div>

        {/* Print & Download Buttons Bar */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleDownloadImage}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-3.5 rounded-2xl flex items-center justify-center gap-2.5 text-base shadow-xl cursor-pointer transition-all"
          >
            <Download className="w-5 h-5" />
            <span>📥 ดาวน์โหลดภาพเกียรติบัตร (HD PNG)</span>
          </button>

          <button
            type="button"
            onClick={handlePrintCertificate}
            className="w-full sm:w-auto btn-primary text-white font-bold px-7 py-3.5 rounded-2xl flex items-center justify-center gap-2.5 text-base shadow-xl cursor-pointer"
          >
            <Printer className="w-5 h-5" />
            <span>🖨️ สั่งพิมพ์หรือบันทึกเป็น PDF ขนาด A4 แนวนอน</span>
          </button>
        </div>

        {downloadSuccess && (
          <div className="card-success p-3 rounded-xl text-emerald-700 text-xs font-semibold animate-fade-in max-w-md mx-auto">
            ✓ ดาวน์โหลดภาพเกียรติบัตร HD ลงในเครื่องสำเร็จแล้ว!
          </div>
        )}

      </div>

    </div>
  );
};
