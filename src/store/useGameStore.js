import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CASE_FILE_01, LAB_EQUIPMENT_LIST, BADGES, CASE_TRANSMISSIONS } from '../data/caseData';
import { CHEMISTRY_CONSTANTS, HINT_SYSTEM_6_LEVELS, PHASE_HINTS_6, TRIALS_DATA, POST_LAB_QUIZ } from '../data/chemistryData';

export const useGameStore = create(
  persist(
    (set, get) => ({
      // Student Credentials & Welcome Screen Onboarding State
      studentInfo: {
        name: '',
        surname: '',
        grade: 'ม.5/1',
        studentNo: '1',
        avatar: '👨‍🔬'
      },
      isStudentInfoSubmitted: false,
      isWelcomeComplete: false,

      setStudentInfo: (info) => set({ 
        studentInfo: { ...get().studentInfo, ...info }, 
        isStudentInfoSubmitted: true 
      }),

      completeWelcomeOnboarding: (info) => set({
        studentInfo: { ...get().studentInfo, ...info },
        isStudentInfoSubmitted: true,
        isWelcomeComplete: true,
        transmissionOpen: true,
        currentTransmission: CASE_TRANSMISSIONS[1]
      }),

      // Phase & Workstation Navigation State
      phase: 1, // 1 to 5
      activeWorkstation: 'casefile',
      isTransitioning: false,
      transitionText: 'CASE FILE Updating...',

      // Incoming Case Brief Transmission Modal
      transmissionOpen: true,
      currentTransmission: CASE_TRANSMISSIONS[1],
      closeTransmission: () => set({ transmissionOpen: false }),
      openTransmission: (phaseNum) => set({ 
        currentTransmission: CASE_TRANSMISSIONS[phaseNum] || CASE_TRANSMISSIONS[1],
        transmissionOpen: true 
      }),

      // Gamification: XP & Badges
      xp: 200,
      xpDelta: null, // { amount: 50, key: 12345, type: 'add' | 'deduct' }
      unlockedBadges: ['rookie'],

      addXp: (amount) => set((state) => {
        const nextXp = Math.max(0, state.xp + amount);
        return {
          xp: nextXp,
          xpDelta: {
            amount: Math.abs(amount),
            type: amount >= 0 ? 'add' : 'deduct',
            key: Date.now()
          }
        };
      }),

      unlockBadge: (badgeId) => set((state) => {
        if (!state.unlockedBadges.includes(badgeId)) {
          return { unlockedBadges: [...state.unlockedBadges, badgeId] };
        }
        return {};
      }),

      // 6-Level Adaptive Hint System State
      isHintModalOpen: false,
      currentHintLevel: 1,
      openHintModal: () => set({ isHintModalOpen: true, currentHintLevel: 1 }),
      closeHintModal: () => set({ isHintModalOpen: false }),
      setHintLevel: (level) => set({ currentHintLevel: Math.min(6, Math.max(1, level)) }),

      getHintContent: () => {
        const { phase, currentHintLevel } = get();
        const validPhase = phase || 1;
        const validLevel = currentHintLevel || 1;
        const hintsForPhase = PHASE_HINTS_6[validPhase] || PHASE_HINTS_6[1];
        const text = hintsForPhase[validLevel] || "คำแนะนำกำลังประมวลผล...";
        const metadata = HINT_SYSTEM_6_LEVELS[validLevel] || { title: `Level ${validLevel}`, desc: 'คำแนะนำ' };
        return {
          level: validLevel,
          title: metadata.title,
          desc: metadata.desc,
          text: text
        };
      },

      // Phase 1 State (Starts Clean / Unselected)
      newsHighlights: [],
      toggleNewsHighlight: (id) => {
        if (get().isEquipmentValidated) return; // locked if phase 1 already complete
        set((state) => {
          const current = state.newsHighlights || [];
          const updated = current.includes(id) ? current.filter(x => x !== id) : [...current, id];
          return { newsHighlights: updated };
        });
      },

      labelHighlights: [],
      toggleLabelHighlight: (id) => {
        if (get().isEquipmentValidated) return; // locked if phase 1 already complete
        set((state) => {
          const current = state.labelHighlights || [];
          const updated = current.includes(id) ? current.filter(x => x !== id) : [...current, id];
          return { labelHighlights: updated };
        });
      },

      selectedEquipment: [], // clean start
      isEquipmentValidated: false,
      toggleEquipment: (id) => {
        if (get().isEquipmentValidated) return; // locked if phase 1 already complete
        set((state) => {
          const current = state.selectedEquipment || [];
          const exists = current.includes(id);
          const updated = exists ? current.filter(item => item !== id) : [...current, id];
          return { selectedEquipment: updated };
        });
      },

      validatePhase1: () => {
        const { selectedEquipment = [], unlockBadge, addXp, isEquipmentValidated } = get();
        if (isEquipmentValidated) return { success: true, message: "Phase 1 ผ่านแล้ว" };

        const required = ['burette', 'pipette', 'flask', 'indicator', 'stand', 'wash_bottle'];
        const hasAllRequired = required.every(id => selectedEquipment.includes(id));
        const hasNoExtras = selectedEquipment.length === required.length;

        if (hasAllRequired && hasNoExtras) {
          set({ isEquipmentValidated: true });
          unlockBadge('rookie');
          addXp(100);
          return {
            success: true,
            message: "การเลือกอุปกรณ์ถูกต้องสมบูรณ์! คุณได้รับเหรียญ Lab Rookie และปลดล็อก Phase 2 (+100 XP)"
          };
        } else if (hasAllRequired && !hasNoExtras) {
          addXp(-10);
          return {
            success: false,
            message: "คุณเลือกอุปกรณ์จำเป็นครบ 6 ชิ้นแล้ว แต่ยังมีอุปกรณ์บางชิ้นที่ไม่จำเป็นสำหรับการไทเทรตระดับนิติวิทยาศาสตร์ โปรดเอาอุปกรณ์ที่ไม่จำเป็นออก (-10 XP)"
          };
        } else {
          addXp(-10);
          return {
            success: false,
            message: "อุปกรณ์ยังไม่ครบถ้วน! คุณต้องการ บิวเรตต์, ปิเปตต์ปริมาตร 25 mL, ขวดรูปชมพู่, ฟีนอล์ฟทาเลอีน, ขาตั้งบิวเรตต์ และขวดฉีดน้ำกลั่น (-10 XP)"
          };
        }
      },

      // Phase 2 State (Starts Clean / Unselected)
      selectedPrimaryStandard: null,
      setSelectedPrimaryStandard: (id) => {
        if (get().isPhase2Complete) return; // locked if completed
        set({ selectedPrimaryStandard: id });
      },
      isPhase2Complete: false,
      calculatedNaohMolarity: "0.1000",
      
      submitPhase2: (stdId) => {
        const { addXp, unlockBadge, isPhase2Complete } = get();
        if (isPhase2Complete) return { success: true, message: "Phase 2 ผ่านแล้ว" };

        if (stdId === 'khp') {
          set({ 
            selectedPrimaryStandard: 'khp',
            isPhase2Complete: true,
            calculatedNaohMolarity: "0.1000",
            phase: Math.max(get().phase, 2)
          });
          addXp(150);
          unlockBadge('precision');
          return {
            success: true,
            message: "ถูกต้อง! KHP (Potassium Hydrogen Phthalate) คือสารมาตรฐานปฐมภูมิที่มีความบริสุทธิ์สูง ไม่ดูดความชื้น ทำให้ปรับมาตรฐาน NaOH ได้ความเข้มข้นอ้างอิงแน่นอน = 0.1000 M (+150 XP)"
          };
        } else {
          addXp(-15);
          return {
            success: false,
            message: "สารชนิดนี้ไม่เหมาะสม! สารมาตรฐานปฐมภูมิ (Primary Standard) ต้องมีความบริสุทธิ์สูง มวลโมเลกุลแน่นอน และไม่ดูดความชื้นจากอากาศ เช่น KHP (-15 XP)"
          };
        }
      },

      // Phase 3 State (PREVENT REPEATED XP EXPLOIT)
      selectedIndicator: 'phenolphthalein',
      setSelectedIndicator: (ind) => set({ selectedIndicator: ind }),
      trials: TRIALS_DATA,
      currentTrialIndex: 0,
      isPhase3Complete: false,

      recordTrialResult: (index, vol) => {
        const state = get();
        const newTrials = [...(state.trials || TRIALS_DATA)];
        const wasAlreadyCompleted = newTrials[index]?.completed;

        newTrials[index] = {
          ...newTrials[index],
          recordedVol: parseFloat(vol.toFixed(2)),
          completed: true
        };

        const allDone = newTrials.every(t => t.completed);
        const nextIndex = Math.min(newTrials.length - 1, index + 1);

        // Award XP ONLY if this trial was not completed before!
        if (!wasAlreadyCompleted) {
          state.addXp(50); // 50 XP per new trial recorded
        }

        if (allDone && !state.isPhase3Complete) {
          state.addXp(100); // 100 XP bonus for finishing all 3 trials
          state.unlockBadge('analyst');
        }

        set({
          trials: newTrials,
          currentTrialIndex: allDone ? index : nextIndex,
          isPhase3Complete: allDone,
          phase: allDone ? Math.max(state.phase, 3) : state.phase
        });
      },

      // Phase 4 State (Dynamic Outlier & Full Stoichiometric Calculations)
      outlierTrialId: null,
      avgVolume: '',
      calculatedAscorbicMolarity: '',
      calculatedAscorbicMass: '',
      isPhase4Complete: false,

      submitPhase4: (outlierId, avgVol, conc, mass = '') => {
        const { addXp, unlockBadge, isPhase4Complete, trials } = get();
        if (isPhase4Complete) return { success: true, message: "Phase 4 ผ่านแล้ว" };

        const t1 = trials?.[0]?.recordedVol && trials[0].recordedVol > 0 ? parseFloat(trials[0].recordedVol) : 2.82;
        const t2 = trials?.[1]?.recordedVol && trials[1].recordedVol > 0 ? parseFloat(trials[1].recordedVol) : 2.84;
        const t3 = trials?.[2]?.recordedVol && trials[2].recordedVol > 0 ? parseFloat(trials[2].recordedVol) : 3.56;

        // Calculate pairwise differences
        const d12 = Math.abs(t1 - t2);
        const d23 = Math.abs(t2 - t3);
        const d13 = Math.abs(t1 - t3);
        const spread = Math.max(t1, t2, t3) - Math.min(t1, t2, t3);
        const minPairDist = Math.min(d12, d23, d13);

        // Determine true statistical outlier
        let expectedOutlier = 'none';
        if (spread > 0.25) {
          if (minPairDist === d12) expectedOutlier = '2'; // t1 & t2 are closest -> t3 is the true outlier
          else if (minPairDist === d13) expectedOutlier = '1'; // t1 & t3 are closest -> t2 is the true outlier
          else if (minPairDist === d23) expectedOutlier = '0'; // t2 & t3 are closest -> t1 is the true outlier
        }

        // Strict Outlier Check
        const isOutlierCorrect = String(outlierId) === String(expectedOutlier);

        // Expected average volume strictly from the non-outlier trials
        let selectedAvgVol = 2.84;
        if (expectedOutlier === '2') {
          selectedAvgVol = (t1 + t2) / 2;
        } else if (expectedOutlier === '0') {
          selectedAvgVol = (t2 + t3) / 2;
        } else if (expectedOutlier === '1') {
          selectedAvgVol = (t1 + t3) / 2;
        } else {
          selectedAvgVol = (t1 + t2 + t3) / 3;
        }

        const parsedAvg = parseFloat(avgVol);
        const parsedConc = parseFloat(conc);
        const parsedMass = parseFloat(mass);

        // Check Average Volume (allow rounding within 0.08 mL)
        const isAvgCorrect = !isNaN(parsedAvg) && (
          Math.abs(parsedAvg - selectedAvgVol) <= 0.08 ||
          (selectedAvgVol > 0 && Math.abs(parsedAvg - selectedAvgVol) / selectedAvgVol <= 0.03)
        );

        // Expected concentration from average volume: C1 = (0.1000 * V_avg) / 25.00
        const refAvg = !isNaN(parsedAvg) ? parsedAvg : selectedAvgVol;
        const expectedConc = (0.1000 * refAvg) / 25.00;

        // Check concentration C1
        const isConcCorrect = !isNaN(parsedConc) && (
          Math.abs(parsedConc - expectedConc) <= 0.0006 ||
          (expectedConc > 0 && Math.abs(parsedConc - expectedConc) / expectedConc <= 0.05)
        );

        // Expected mass of Vitamin C in 250 mL
        const refConc = !isNaN(parsedConc) ? parsedConc : expectedConc;
        const expectedMassMg250 = refConc * 0.250 * 176.12 * 1000;
        const expectedMassG250 = refConc * 0.250 * 176.12;
        const expectedMassMg25 = refConc * 0.025 * 176.12 * 1000;

        // Check Mass (accept mg in 250 mL, g in 250 mL, or mg in 25 mL)
        const isMassCorrect = mass.trim() === '' || (!isNaN(parsedMass) && (
          Math.abs(parsedMass - expectedMassMg250) <= 25 ||
          Math.abs(parsedMass - expectedMassG250) <= 0.03 ||
          Math.abs(parsedMass - expectedMassMg25) <= 5 ||
          (expectedMassMg250 > 0 && Math.abs(parsedMass - expectedMassMg250) / expectedMassMg250 <= 0.08)
        ));

        if (isOutlierCorrect && isAvgCorrect && isConcCorrect && isMassCorrect) {
          const finalMassStr = mass.trim() 
            ? (parsedMass > 10 ? (parsedMass > 100 ? (parsedMass/1000).toFixed(3) : (parsedMass*10/1000).toFixed(3)) : parsedMass.toFixed(3)) 
            : (expectedMassG250.toFixed(3) || "0.500");

          set({
            outlierTrialId: outlierId,
            avgVolume: avgVol,
            calculatedAscorbicMolarity: conc,
            calculatedAscorbicMass: finalMassStr,
            isPhase4Complete: true,
            phase: Math.max(get().phase, 4)
          });
          addXp(200);
          unlockBadge('outlier');
          return {
            success: true,
            message: `ยอดเยี่ยมมาก! วิเคราะห์ Outlier ถูกต้อง (${expectedOutlier === 'none' ? 'ไม่พบ Outlier' : `Trial ${parseInt(expectedOutlier)+1}`}) ปริมาตรเฉลี่ย V̄ = ${parsedAvg.toFixed(2)} mL, ความเข้มข้น C₁ = ${parsedConc.toFixed(5)} M และมวลวิตามินซี = ${(parseFloat(finalMassStr)*1000).toFixed(0)} mg (${finalMassStr} g) (+200 XP)`
          };
        } else {
          addXp(-15);
          if (!isOutlierCorrect) {
            const outlierName = expectedOutlier === 'none' 
              ? "'ไม่พบ Outlier' (เนื่องจากผลทั้ง 3 ซ้ำใกล้เคียงกัน)" 
              : `Trial ${parseInt(expectedOutlier)+1} (ปริมาตร ${(expectedOutlier === '0' ? t1 : expectedOutlier === '1' ? t2 : t3).toFixed(2)} mL)`;
            return {
              success: false,
              message: `การเลือก Outlier ยังไม่ถูกต้อง! สังเกตค่าที่กระโดดแตกต่างจากกลุ่มมากที่สุด ควรเลือก ${outlierName} (-15 XP)`
            };
          } else if (!isAvgCorrect) {
            return {
              success: false,
              message: `ปริมาตรเฉลี่ยคลาดเคลื่อน! คำนวณจาก Trial ที่น่าเชื่อถือได้ ${selectedAvgVol.toFixed(2)} mL (-15 XP)`
            };
          } else if (!isConcCorrect) {
            return {
              success: false,
              message: `ความเข้มข้นกรดคลาดเคลื่อน! จากสูตร C₁ = (0.1000 M × ${refAvg.toFixed(2)} mL) / 25.00 mL = ${expectedConc.toFixed(5)} M (-15 XP)`
            };
          } else {
            return {
              success: false,
              message: `ปริมาณมวลวิตามินซีคลาดเคลื่อน! จากสูตร มวล = C₁ × 0.250 L × 176.12 g/mol ได้ ${expectedMassMg250.toFixed(1)} mg (${(expectedMassG250).toFixed(3)} g) (-15 XP)`
            };
          }
        }
      },

      // Phase 5 State (Starts Clean / Unselected)
      cerState: {
        claim: '',
        evidence: [],
        reasoning: ''
      },
      isPhase5Complete: false,

      submitCER: (claim, evidence = [], reasoning) => {
        const { addXp, unlockBadge, isPhase5Complete } = get();
        if (isPhase5Complete) return { success: true, message: "Phase 5 ผ่านแล้ว" };

        const isClaimValid = claim === 'c1';
        const isEvidValid = evidence.includes('e1') && evidence.includes('e2');
        const isReasValid = reasoning === 'r1' || reasoning === 'r2';

        if (isClaimValid && isEvidValid && isReasValid) {
          set({
            cerState: { claim, evidence, reasoning },
            isPhase5Complete: true,
            phase: Math.max(get().phase, 5)
          });
          addXp(300);
          unlockBadge('detective');
          return {
            success: true,
            message: "การยื่นรายงาน CER ปิดคดีสำเร็จสมบูรณ์! ท่านได้พิสูจน์ด้วยหลักฐานเชิงประจักษ์ว่า Vitamin Boost มีปริมาณวิตามินซีจริงเพียง 500 mg (50% ของฉลาก 1,000 mg) ซึ่งเป็นการหลอกลวงผู้บริโภค (+300 XP)"
          };
        } else {
          addXp(-20);
          return {
            success: false,
            message: "ข้อสรุป CER ยังไม่สมบูรณ์! โปรดเลือก Claim, Evidence และ Reasoning ให้สอดคล้องกัน (-20 XP)"
          };
        }
      },

      // Phase 6 State (Post-Lab 10-Question Comprehensive Quiz)
      quizAnswers: {},
      quizScore: 0,
      quizTotalQuestions: 10,
      isPhase6Complete: false,
      quizSubmitted: false,

      submitQuiz: (answers) => {
        const { addXp, unlockBadge, isPhase6Complete } = get();
        let score = 0;
        
        POST_LAB_QUIZ.forEach((q) => {
          const userAns = (answers[q.id] || '').trim();
          if (q.type === 'mcq') {
            if (userAns.toLowerCase() === q.correctAnswer.toLowerCase()) {
              score += 1;
            }
          } else {
            const cleanUserAns = userAns.replace(/[^0-9.]/g, '');
            const parsedUser = parseFloat(cleanUserAns);
            const isMatch = q.acceptedAnswers.some(ans => {
              const cleanAns = ans.replace(/[^0-9.]/g, '');
              const parsedAns = parseFloat(cleanAns);
              return userAns.toLowerCase() === ans.toLowerCase() ||
                     (!isNaN(parsedUser) && !isNaN(parsedAns) && Math.abs(parsedUser - parsedAns) < 0.05);
            });
            if (isMatch) {
              score += 1;
            }
          }
        });

        const earnedXp = score * 30; // 30 XP per question (up to 300 XP)
        set({
          quizAnswers: answers,
          quizScore: score,
          quizSubmitted: true,
          isPhase6Complete: true,
          phase: Math.max(get().phase, 6)
        });

        addXp(earnedXp);
        if (score >= 8) {
          unlockBadge('scholar');
        }

        return {
          success: true,
          score,
          total: POST_LAB_QUIZ.length,
          earnedXp,
          message: `คุณทำแบบทดสอบได้ ${score} / 10 คะแนน (+${earnedXp} XP)`
        };
      },

      // Notebook Entries
      notebookEntries: [
        {
          id: 1,
          title: "ข้อมูลสืบสวนคดี Case File 01",
          content: "เครื่องดื่ม Vitamin Boost (250 mL) มีประชาชนป่วย 48 ราย ผลตรวจจาก 3 แล็บภายนอกไม่ตรงกันเนื่องจาก NaOH ไม่ได้มาตรฐาน",
          timestamp: "08:30 น.",
          category: "ข้อมูลคดี"
        },
        {
          id: 2,
          title: "หลักการสารมาตรฐานปฐมภูมิ (Primary Standard)",
          content: "KHP (Potassium Hydrogen Phthalate) บริสุทธิ์สูง > 99.9% มวลโมเลกุล 204.22 g/mol ไม่ดูดความชื้น เหมาะใช้ปรับมาตรฐาน NaOH",
          timestamp: "09:15 น.",
          category: "เฟส 2"
        },
        {
          id: 3,
          title: "การเลือก Phenolphthalein Indicator",
          content: "เปลี่ยนสีจากไม่มีสีเป็นชมพูระเรื่อช่วง pH 8.2 - 10.0 ตรงกับจุดสมดุลของการไทเทรตกรดแอสคอร์บิกด้วย NaOH",
          timestamp: "10:00 น.",
          category: "เฟส 3"
        }
      ],

      addNotebookEntry: (title, content, category = "บันทึกส่วนตัว") => set((state) => ({
        notebookEntries: [
          {
            id: Date.now(),
            title,
            content,
            timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
            category
          },
          ...(state.notebookEntries || [])
        ]
      })),

      // Phase Progress & Navigation (with auto-scroll to top)
      setPhase: (phaseNum) => {
        set({ phase: phaseNum });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      setActiveWorkstation: (ws) => {
        set({ activeWorkstation: ws });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },

      triggerPhaseTransition: (nextPhase, nextWorkstation, text = 'CASE FILE Updating...') => {
        set({ isTransitioning: true, transitionText: text });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          set({
            phase: Math.max(get().phase, nextPhase),
            activeWorkstation: nextWorkstation,
            isTransitioning: false,
            currentTransmission: CASE_TRANSMISSIONS[nextPhase] || CASE_TRANSMISSIONS[1],
            transmissionOpen: true
          });
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1200);
      },

      // Reset
      resetGame: () => set({
        phase: 1,
        activeWorkstation: 'casefile',
        xp: 200,
        xpDelta: null,
        unlockedBadges: ['rookie'],
        selectedEquipment: [],
        isEquipmentValidated: false,
        selectedPrimaryStandard: null,
        isPhase2Complete: false,
        currentTrialIndex: 0,
        trials: TRIALS_DATA,
        isPhase3Complete: false,
        isPhase4Complete: false,
        isPhase5Complete: false,
        isPhase6Complete: false,
        quizAnswers: {},
        quizScore: 0,
        quizSubmitted: false,
        outlierTrialId: null,
        avgVolume: '',
        calculatedAscorbicMolarity: '',
        calculatedAscorbicMass: '',
        cerState: { claim: '', evidence: [], reasoning: '' },
        newsHighlights: [],
        labelHighlights: [],
        isWelcomeComplete: false,
        transmissionOpen: true,
        currentTransmission: CASE_TRANSMISSIONS[1]
      })
    }),
    {
      name: 'titra-game-storage-v10' // fresh storage version key
    }
  )
);
