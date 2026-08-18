import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CASE_FILE_01, LAB_EQUIPMENT_LIST, BADGES, CASE_TRANSMISSIONS } from '../data/caseData';
import { CHEMISTRY_CONSTANTS, HINT_SYSTEM_6_LEVELS, PHASE_HINTS_6, TRIALS_DATA } from '../data/chemistryData';

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

        const t1 = trials?.[0]?.recordedVol && trials[0].recordedVol > 0 ? trials[0].recordedVol : 24.80;
        const t2 = trials?.[1]?.recordedVol && trials[1].recordedVol > 0 ? trials[1].recordedVol : 24.85;
        const t3 = trials?.[2]?.recordedVol && trials[2].recordedVol > 0 ? trials[2].recordedVol : 28.50;

        // Determine true statistical outlier dynamically
        const maxV = Math.max(t1, t2, t3);
        const minV = Math.min(t1, t2, t3);
        const isAllClose = (maxV - minV) <= 0.60;

        let expectedOutlier = 'none';
        let expectedAvgVol = (t1 + t2 + t3) / 3;

        if (!isAllClose) {
          const diff3 = Math.abs(t3 - (t1 + t2) / 2);
          const diff2 = Math.abs(t2 - (t1 + t3) / 2);
          const diff1 = Math.abs(t1 - (t2 + t3) / 2);

          if (diff3 > 0.8 && diff3 > diff1 && diff3 > diff2) {
            expectedOutlier = '2';
            expectedAvgVol = (t1 + t2) / 2;
          } else if (diff2 > 0.8 && diff2 > diff1 && diff2 > diff3) {
            expectedOutlier = '1';
            expectedAvgVol = (t1 + t3) / 2;
          } else if (diff1 > 0.8 && diff1 > diff2 && diff1 > diff3) {
            expectedOutlier = '0';
            expectedAvgVol = (t2 + t3) / 2;
          }
        }

        const expectedConc = (0.1000 * expectedAvgVol) / 25.00;

        const isOutlierCorrect = String(outlierId) === String(expectedOutlier) || (expectedOutlier === '2' && String(outlierId) === '2');
        const parsedAvg = parseFloat(avgVol);
        const parsedConc = parseFloat(conc);
        const parsedMass = parseFloat(mass);

        const isAvgCorrect = !isNaN(parsedAvg) && Math.abs(parsedAvg - expectedAvgVol) < 0.25;
        const isConcCorrect = !isNaN(parsedConc) && Math.abs(parsedConc - expectedConc) < 0.015;
        const isMassCorrect = mass.trim() === '' || (!isNaN(parsedMass) && (
          (parsedMass >= 300 && parsedMass <= 700) || // if entered in mg (e.g. 496 or 500)
          (parsedMass >= 0.3 && parsedMass <= 0.7) ||   // if entered in grams (e.g. 0.496 or 0.50)
          Math.abs(parsedMass - 496) < 100
        ));

        if (isOutlierCorrect && isAvgCorrect && isConcCorrect && isMassCorrect) {
          const finalMassStr = mass.trim() 
            ? (parsedMass > 10 ? (parsedMass/1000).toFixed(3) : parsedMass.toFixed(3)) 
            : "0.496";

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
            message: `ยอดเยี่ยมมาก! วิเคราะห์ Outlier ได้ถูกต้อง (${outlierId === 'none' ? 'ไม่พบ Outlier' : `Trial ${parseInt(outlierId)+1}`}) ปริมาตรเฉลี่ย = ${parsedAvg.toFixed(3)} mL, ความเข้มข้น = ${parsedConc.toFixed(4)} M และมวลวิตามินซี = ${finalMassStr} g (+200 XP)`
          };
        } else {
          addXp(-15);
          if (!isOutlierCorrect) {
            return {
              success: false,
              message: expectedOutlier === 'none' 
                ? "การเลือก Outlier ยังไม่ถูกต้อง! ผลการทดลองทั้ง 3 ซ้ำใกล้เคียงกัน จึงควรเลือก 'ไม่พบ Outlier' (-15 XP)"
                : `การเลือก Outlier ยังไม่ถูกต้อง! โปรดสังเกตค่าที่กระโดดแตกต่างจากกลุ่มอย่างชัดเจน (-15 XP)`
            };
          } else if (!isAvgCorrect) {
            return {
              success: false,
              message: `ปริมาตรเฉลี่ยคลาดเคลื่อน! โปรดคำนวณค่าเฉลี่ยจาก Trial ที่น่าเชื่อถือ (${expectedAvgVol.toFixed(3)} mL) (-15 XP)`
            };
          } else if (!isConcCorrect) {
            return {
              success: false,
              message: `ความเข้มข้นกรดคลาดเคลื่อน! จากสูตร C1 = (0.1000 × ปริมาตรเฉลี่ย) / 25.00 (ได้ประมาณ ${expectedConc.toFixed(4)} M) (-15 XP)`
            };
          } else {
            return {
              success: false,
              message: "ปริมาณมวลวิตามินซีคลาดเคลื่อน! คำนวณจากความเข้มข้น C1 ใน 250 mL (ประมาณ 496 mg หรือ 0.496 g) (-15 XP)"
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
            phase: 5
          });
          addXp(300);
          unlockBadge('detective');
          return {
            success: true,
            message: "การยื่นรายงาน CER ปิดคดีสำเร็จสมบูรณ์! คุณได้พิสูจน์แล้วว่า Vitamin Boost มีปริมาณวิตามินซีเพียง 50% ของที่ระบุบนฉลาก (+300 XP)"
          };
        } else {
          addXp(-20);
          return {
            success: false,
            message: "ข้อสรุป CER ยังไม่สมบูรณ์! ข้อกล่าวอ้างและหลักฐานต้องอ้างอิงผลไทเทรต NaOH 0.1000 M และความเข้มข้นจริง C1 = 0.0993 M (-20 XP)"
          };
        }
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
      name: 'titra-game-storage-v8' // fresh storage version key
    }
  )
);
