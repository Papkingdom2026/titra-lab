import React, { useState, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { POST_LAB_QUIZ } from '../../data/chemistryData';
import { CharacterDialogueCard } from '../common/CharacterDialogueCard';
import { sound } from '../../utils/audio';
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  HelpCircle, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  Check, 
  Zap,
  AlertCircle
} from 'lucide-react';

export const QuizWorkstation = () => {
  const { 
    quizAnswers, 
    quizScore, 
    quizSubmitted, 
    isPhase6Complete, 
    submitQuiz, 
    triggerPhaseTransition,
    addXp 
  } = useGameStore();

  const [answers, setAnswers] = useState(quizAnswers || {});
  const [feedback, setFeedback] = useState(null);
  const feedbackRef = useRef(null);

  const handleSelectMCQ = (questionId, optionId) => {
    if (quizSubmitted) return;
    sound.playClick();
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleShortAnswerChange = (questionId, val) => {
    if (quizSubmitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playClick();

    // Check if at least some questions are answered
    const answeredCount = Object.keys(answers).filter(k => String(answers[k]).trim() !== '').length;
    if (answeredCount < POST_LAB_QUIZ.length) {
      const confirmSubmit = window.confirm(`คุณตอบคำถามไป ${answeredCount} จาก 10 ข้อ ต้องการส่งคำตอบและตรวจคะแนนเลยหรือไม่?`);
      if (!confirmSubmit) return;
    }

    const res = submitQuiz(answers);
    setFeedback(res);
    if (res.score >= 7) {
      sound.playSuccess();
    } else {
      sound.playClick();
    }

    setTimeout(() => {
      feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleAutoFillPerfect = () => {
    sound.playClick();
    addXp(-20);
    const perfectAnswers = {
      1: 'c',
      2: 'c',
      3: 'c',
      4: 'c',
      5: 'b',
      6: 'c',
      7: '2.84',
      8: '50.0',
      9: '500',
      10: '99.6'
    };
    setAnswers(perfectAnswers);
    const res = submitQuiz(perfectAnswers);
    setFeedback({
      ...res,
      message: "✨ ผู้ช่วยได้เติมคำตอบที่ถูกต้องครบทั้ง 10 ข้อให้แล้ว (-20 XP) กดยืนยันเพื่อรับเกียรติบัตรทันที!"
    });
  };

  const handleGoToCertificate = () => {
    sound.playPhaseUnlock();
    triggerPhaseTransition(7, 'certificate', 'CONFERMENT In Progress... Generating Official 5-Star Forensic Certificate');
  };

  return (
    <div className="space-y-6 pb-16 font-sans">
      
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-5 md:p-6 border border-slate-700/70">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-500/30 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              CASE PHASE 6 : POST-LAB SCIENTIFIC ASSESSMENT
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-2">
              แบบทดสอบท้ายบทเรียน: การไทเทรตหาปริมาณกรดแอสคอร์บิก (10 ข้อ)
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              วัดความเข้าใจรวบยอดด้านสารมาตรฐาน การเลือกเครื่องแก้ว การตรวจจับ Outlier และการคำนวณทางปริมาณสัมพันธ์
            </p>
          </div>

          {!quizSubmitted && (
            <button
              type="button"
              onClick={handleAutoFillPerfect}
              className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all self-start md:self-center cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>ผู้ช่วยทำแบบทดสอบ (-20 XP)</span>
            </button>
          )}
        </div>
      </div>

      {/* Mentor Guidance */}
      <CharacterDialogueCard 
        characterId="maya"
        title="คำแนะนำจาก Senior Analyst Dr. Maya"
        text={
          quizSubmitted 
            ? (quizScore >= 8 
                ? `ยอดเยี่ยมมากค่ะ! คุณทำแบบทดสอบได้ ${quizScore}/10 คะแนน แสดงถึงความเข้าใจเคมีวิเคราะห์และปริมาณสัมพันธ์ในระดับสูงมาก ขอเชิญกดรับใบประกาศเกียรติคุณได้เลยค่ะ!` 
                : `คุณทำแบบทดสอบได้ ${quizScore}/10 คะแนนค่ะ ลองอ่านคำอธิบายเฉลยทางวิทยาศาสตร์ใต้ข้อที่ผิดเพื่อความแม่นยำยิ่งขึ้นนะคะ จากนั้นสามารถกดรับใบประกาศเกียรติคุณได้เลยค่ะ!`)
            : "ขอแสดงความยินดีที่คุณทำการทดลองและสรุปรายงาน CER คดี Vitamin Boost สำเร็จลุล่วง! ก่อนจะได้รับมอบเกียรติบัตรอย่างเป็นทางการ ขอให้ทำแบบทดสอบ 10 ข้อนี้เพื่อประเมินความเข้าใจรวบยอดด้านสารมาตรฐาน การตัด Outlier และการคำนวณปริมาณสัมพันธ์ค่ะ สู้ๆ นะคะ!"
        }
      />

      {/* Feedback Banner */}
      {feedback && (
        <div 
          ref={feedbackRef} 
          className={`p-5 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in ${
            feedback.score >= 7 ? 'card-success text-emerald-200' : 'card-warning text-amber-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/20 rounded-xl">
              <Award className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <h4 className="font-bold text-lg text-white">
                ผลการประเมินแบบทดสอบ: ได้ {feedback.score} / 10 คะแนน
              </h4>
              <p className="text-sm text-slate-300 mt-0.5">{feedback.message}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoToCertificate}
            className="w-full md:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold px-7 py-3 rounded-xl flex items-center justify-center gap-2 text-sm md:text-base shadow-lg cursor-pointer"
          >
            <span>รับเกียรติบัตรและผลประเมิน 5 ดาว</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Quiz Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {POST_LAB_QUIZ.map((q) => {
          const userAnswer = (answers[q.id] || '').trim();
          let isCorrect = false;
          if (quizSubmitted) {
            if (q.type === 'mcq') {
              isCorrect = userAnswer.toLowerCase() === q.correctAnswer.toLowerCase();
            } else {
              isCorrect = q.acceptedAnswers.some(
                ans => userAnswer.toLowerCase() === ans.toLowerCase() || 
                       parseFloat(userAnswer) === parseFloat(ans)
              );
            }
          }

          return (
            <div 
              key={q.id}
              className={`glass-card p-5 md:p-6 rounded-2xl border transition-all ${
                quizSubmitted
                  ? isCorrect 
                    ? 'border-emerald-500/50 bg-emerald-950/10' 
                    : 'border-rose-500/50 bg-rose-950/10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Context if available */}
              {q.context && (
                <div className="mb-3 p-3 bg-sky-950/40 rounded-xl border border-sky-800/40 text-xs md:text-sm text-sky-200 font-medium">
                  {q.context}
                </div>
              )}

              {/* Question Title */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-base md:text-lg text-white leading-relaxed">
                  {q.question}
                </h3>
                {quizSubmitted && (
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 shrink-0 ${
                    isCorrect ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}>
                    {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {isCorrect ? '+30 XP' : '0 XP'}
                  </span>
                )}
              </div>

              {/* MCQ Options */}
              {q.type === 'mcq' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                  {q.options.map(opt => {
                    const isSelected = answers[q.id] === opt.id;
                    let optionStyle = "bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700";

                    if (quizSubmitted) {
                      if (opt.id === q.correctAnswer) {
                        optionStyle = "bg-emerald-500/20 border-emerald-400 text-white font-bold ring-1 ring-emerald-400";
                      } else if (isSelected && opt.id !== q.correctAnswer) {
                        optionStyle = "bg-rose-500/20 border-rose-400 text-rose-200 line-through";
                      }
                    } else if (isSelected) {
                      optionStyle = "bg-sky-500/20 border-sky-400 text-white font-bold ring-1 ring-sky-400";
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={quizSubmitted}
                        onClick={() => handleSelectMCQ(q.id, opt.id)}
                        className={`p-3.5 rounded-xl border text-left text-sm md:text-base transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${optionStyle}`}
                      >
                        <span>{opt.label}</span>
                        {isSelected && !quizSubmitted && (
                          <span className="w-5 h-5 rounded-full bg-sky-400 text-slate-950 flex items-center justify-center text-xs font-bold shrink-0 ml-2">
                            ✓
                          </span>
                        )}
                        {quizSubmitted && opt.id === q.correctAnswer && (
                          <span className="w-5 h-5 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center text-xs font-bold shrink-0 ml-2">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Short Answer Input */}
              {q.type === 'short' && (
                <div className="mt-4 max-w-md">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      disabled={quizSubmitted}
                      value={answers[q.id] || ''}
                      onChange={(e) => handleShortAnswerChange(q.id, e.target.value)}
                      placeholder={`พิมพ์ตัวเลขคำตอบ (${q.unit})...`}
                      className={`w-full bg-slate-900 border rounded-xl pl-4 pr-16 py-3 text-base text-white focus:outline-none font-mono disabled:opacity-90 ${
                        quizSubmitted 
                          ? isCorrect 
                            ? 'border-emerald-500 bg-emerald-950/20 text-emerald-200' 
                            : 'border-rose-500 bg-rose-950/20 text-rose-200'
                          : 'border-slate-700 focus:border-sky-400'
                      }`}
                    />
                    <span className="absolute right-3 text-xs font-mono font-bold text-sky-400 bg-slate-800 px-2.5 py-1 rounded border border-slate-700 pointer-events-none">
                      {q.unit}
                    </span>
                  </div>
                  {quizSubmitted && !isCorrect && (
                    <p className="text-xs text-rose-300 mt-1.5 font-mono">
                      คำตอบที่ถูกต้องคือ: <b>{q.correctAnswer} {q.unit}</b>
                    </p>
                  )}
                </div>
              )}

              {/* Scientific Explanation when submitted */}
              {quizSubmitted && q.explanation && (
                <div className="mt-3.5 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs md:text-sm text-slate-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300">
                    <BookOpen className="w-4 h-4" />
                    <span>คำอธิบายเฉลยทางวิทยาศาสตร์:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-sans">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}

        {/* Submit or Proceed Action */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
          <div className="text-xs md:text-sm text-slate-400">
            {quizSubmitted ? (
              <span className="text-emerald-400 font-semibold">
                ✓ ตรวจคำตอบครบทั้ง 10 ข้อแล้ว คะแนนรวม {quizScore} / 10
              </span>
            ) : (
              <span>ตอบคำถามให้ครบทุกข้อก่อนกดยืนยันตรวจคะแนน (+30 XP ต่อข้อที่ถูกต้อง)</span>
            )}
          </div>

          {!quizSubmitted ? (
            <button
              type="submit"
              className="w-full sm:w-auto btn-primary text-white font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 text-base shadow-lg cursor-pointer"
            >
              <Check className="w-5 h-5" />
              <span>ส่งคำตอบและตรวจผลประเมิน</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGoToCertificate}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 text-base shadow-lg cursor-pointer animate-pulse"
            >
              <Award className="w-5 h-5 text-amber-300" />
              <span>ไปที่หน้าเกียรติบัตร (Certificate)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

    </div>
  );
};
