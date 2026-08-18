// Case & World Data for TITRA: The Chemical Investigation (GDD Aligned)

export const GAME_INFO = {
  title: "TITRA: The Chemical Investigation",
  tagline: "Every Drop Reveals the Truth (ทุกหยดที่หยดลงไป เปิดเผยความจริง)",
  version: "1.0.0",
  center: "National Food Safety Investigation Center (NFSIC)",
  centerThai: "ศูนย์วิเคราะห์ผลิตภัณฑ์อาหารแห่งชาติ",
  unit: "Special Investigation Unit",
  year: "2045"
};

export const CHARACTERS = {
  director: {
    id: "director",
    name: "Director Alan",
    role: "ผู้อำนวยการศูนย์ NFSIC",
    trait: "สุขุม เด็ดขาด ยึดหลักฐานเป็นสำคัญ",
    avatarBg: "from-blue-600 to-indigo-900"
  },
  maya: {
    id: "maya",
    name: "Dr. Maya",
    role: "Senior Chemical Analyst (Mentor)",
    trait: "ใจเย็น ชวนคิด ไม่เฉลยคำตอบทันที ช่วยตั้งคำถาม",
    avatarBg: "from-cyan-600 to-teal-900"
  },
  leo: {
    id: "leo",
    name: "Leo",
    role: "Laboratory Technician",
    trait: "เป็นกันเอง ช่วยอธิบายเครื่องมือและ Lab Safety",
    avatarBg: "from-amber-600 to-orange-900"
  },
  ai: {
    id: "ai",
    name: "Data AI",
    role: "AI Assistantประจำศูนย์ NFSIC",
    trait: "รวบรวมข้อมูล แสดงตารางและกราฟเชิงสถิติ",
    avatarBg: "from-emerald-600 to-cyan-900"
  }
};

export const CASE_FILE_01 = {
  caseId: "Case File 01",
  title: "The Vitamin Boost Investigation",
  titleThai: "คดีสืบสวนผลิตภัณฑ์เครื่องดื่มเสริมวิตามินซี Vitamin Boost",
  urgency: "URGENT / HIGH PRIORITY",
  date: "17 สิงหาคม 2045",
  location: "ศูนย์วิเคราะห์ผลิตภัณฑ์อาหารแห่งชาติ (NFSIC)",

  description: `ในปี ค.ศ. 2045 ศูนย์ NFSIC ได้รับรายงานด่วนจากกระทรวงสาธารณสุขว่า มีประชาชนจำนวนมากเข้ารับการรักษาโรงพยาบาลหลังบริโภคเครื่องดื่มเสริมวิตามินซียี่ห้อ "Vitamin Boost" ที่อ้างว่ามีปริมาณวิตามินซีสูงเสริมภูมิคุ้มกัน 
  
  อย่างไรก็ตาม ผลการตรวจวิเคราะห์ปริมาณกรดแอสคอร์บิก (Vitamin C) จากห้องปฏิบัติการภายนอก 3 แห่งกลับให้ผลคลาดเคลื่อนไม่ตรงกันอย่างสิ้นเชิง! บางแห่งแจ้งว่าต่ำกว่าฉลาก บางแห่งแจ้งว่าได้มาตรฐาน 
  
  Director Alan จึงแต่งตั้งท่านในฐานะ Junior Chemical Analyst เพื่อสืบสวนความจริงทั้งหมดโดยใช้กระบวนการไทเทรตทางเคมีแบบนิติวิทยาศาสตร์`,

  breakingNews: {
    source: "สำนักข่าวบันทึกสาธารณสุขด่วน (Breaking Health News)",
    headline: "เตือนภัย! ประชาชนล้มป่วยหลังดื่ม 'Vitamin Boost' ผลแล็บภายนอกส่งข้อมูลขัดแย้งกัน",
    details: [
      { id: "patients", label: "จำนวนผู้ป่วยสะสม", value: "48 ราย เข้ารับการรักษาด้วยอาการระคายเคืองกระเพาะอาหารและอ่อนเพลีย" },
      { id: "product", label: "ชื่อผลิตภัณฑ์สืบสวน", value: "เครื่องดื่มเสริมวิตามินซี 'Vitamin Boost' (ขนาดบรรจุ 250 mL)" },
      { id: "conflict", label: "ความขัดแย้งของข้อมูล", value: "แล็บ A แจ้งว่าวิตามินซีต่ำกว่าฉลาก 50%, แล็บ B แจ้งว่าผ่านมาตรฐาน, แล็บ C แจ้งว่าเกินมาตรฐาน" },
      { id: "unknown", label: "สาเหตุที่ยังสรุปไม่ได้", value: "ยังไม่ทราบว่าเกิดจากตัวผลิตภัณฑ์ ความผิดพลาดของวิธีตรวจ หรือสารมาตรฐานที่ไม่แม่นยำ" }
    ]
  },

  productLabel: {
    productName: "Vitamin Boost C-2000",
    claimedVitaminC: "1000 mg / 250 mL (0.0227 M AsA)",
    fdaNumber: "FDA-10-1-2045-889",
    batchNo: "LOT-2045-08A",
    mfgDate: "10/08/2045",
    suspiciousPoints: [
      { id: "claim_conc", text: "ระบุปริมาณ Vitamin C สูงถึง 1,000 mg ต่อขวด (ต้องพิสูจน์ด้วยการไทเทรต)", isSuspicious: true },
      { id: "fda_reg", text: "เลขสารบบอาหาร อย. 10-1-2045-889 (ต้องตรวจสอบความถูกต้อง)", isSuspicious: false },
      { id: "batch_var", text: "เลขล็อต LOT-2045-08A มีตัวอย่าง Sample A, B, C ที่ผลตรวจไม่เท่ากัน", isSuspicious: true }
    ]
  },

  objectives: [
    { phase: 1, text: "Phase 1: Emergency Activation - รวบรวมข้อมูลข่าวสาร ตรวจฉลาก และเลือกอุปกรณ์ห้องปฏิบัติการที่แม่นยำ" },
    { phase: 2, text: "Phase 2: Evidence Collection - เปรียบเทียบผลแล็บ 3 แห่ง เลือก Primary Standard ปรับมาตรฐาน NaOH ให้เป็นสารละลายอ้างอิง" },
    { phase: 3, text: "Phase 3: Laboratory Analysis - เลือกอินดิเคเตอร์ Phenolphthalein และไทเทรตตัวอย่าง Sample A, B, C 3 ซ้ำ" },
    { phase: 4, text: "Phase 4: Evidence Interpretation - ตรวจหาค่า Outlier (Trial 3 ฟองอากาศ) คำนวณความเข้มข้น C1V1=C2V2" },
    { phase: 5, text: "Phase 5: Final Verdict - สร้างรายงาน CER (Claim-Evidence-Reasoning) ยื่นต่อ Director Alan และปิดคดี" }
  ]
};

export const CASE_TRANSMISSIONS = {
  1: {
    from: "Director Alan (ผู้อำนวยการศูนย์ NFSIC)",
    phaseName: "Case Phase 1 : Emergency Activation",
    priority: "URGENT",
    message: `นักวิเคราะห์ Analyst! กระทรวงสาธารณสุขเพิ่งส่งแฟ้มคดีด่วน Case File 01 เกี่ยวกับผลิตภัณฑ์ 'Vitamin Boost' เข้ามา ขอให้ท่านศึกษารายงานข่าว ตรวจสอบฉลากผลิตภัณฑ์ และจัดเตรียมอุปกรณ์ห้องปฏิบัติการสำหรับการสืบสวนทันที`
  },
  2: {
    from: "Director Alan (ผู้อำนวยการศูนย์ NFSIC)",
    phaseName: "Case Phase 2 : Evidence Collection & Standardization",
    priority: "HIGH PRIORITY",
    message: `จากการตรวจสอบแล็บภายนอก 3 แห่ง พบว่าผลตรวจที่ไม่ตรงกันเกิดจากการใช้ NaOH ที่ไม่ได้ปรับมาตรฐาน (Unstandardized NaOH)! หน้าที่ของท่านคือเลือกสารมาตรฐานปฐมภูมิ Primary Standard และปรับมาตรฐาน NaOH ให้ได้ความเข้มข้นอ้างอิงที่แท้จริงก่อนตรวจสารตัวอย่าง`
  },
  3: {
    from: "Dr. Maya (Senior Analyst)",
    phaseName: "Case Phase 3 : Laboratory Analysis",
    priority: "LAB OPERATIONAL",
    message: `เราได้รับตัวอย่างเครื่องดื่มจริง Sample A, Sample B และ Sample C ส่งตรงถึงห้องปฏิบัติการแล้ว ขอให้ท่านเลือกอินดิเคเตอร์ที่เหมาะสม ควบคุมบิวเรตต์ไทเทรตหาจุดยุติ 3 ซ้ำอย่างประณีต ทุกหยดที่หยดลงไปคือหลักฐานทางคดี!`
  },
  4: {
    from: "Dr. Maya (Senior Analyst)",
    phaseName: "Case Phase 4 : Evidence Interpretation",
    priority: "STATISTICAL ANALYSIS",
    message: `การทดลองที่ดีไม่ได้จบแค่การเก็บข้อมูล แต่จบเมื่อเรารู้ว่าข้อมูลใดน่าเชื่อถือ! ขอให้ท่านประเมินข้อมูล 3 Trials ตรวจหาค่า Outlier จากความผิดพลาดในการทดลอง แล้วคำนวณหาความเข้มข้นเฉลี่ยที่แท้จริงด้วยสูตร C1V1=C2V2`
  },
  5: {
    from: "Director Alan (ผู้อำนวยการศูนย์ NFSIC)",
    phaseName: "Case Phase 5 : Final Verdict (CER Assessment)",
    priority: "EXECUTIVE CASE CLOSING",
    message: `ถึงเวลาที่ท่านจะทำหน้าที่ในฐานะนักวิเคราะห์เคมีอย่างสมบูรณ์แล้ว! ขอให้สรุปข้อกล่าวอ้าง (Claim) หลักฐาน (Evidence) และเหตุผลทางเคมี (Reasoning) เพื่อยื่นรายงาน CER ปิดคดีประวัติศาสตร์นี้!`
  }
};

export const LAB_EQUIPMENT_LIST = [
  {
    id: 'burette',
    name: 'บิวเรตต์ 50 mL (Burette 50 mL)',
    description: 'ใช้วัดปริมาตรสารละลายมาตรฐาน (Titrant) ที่หยดลงมาอย่างแม่นยำระดับ 0.01 mL',
    isRequired: true,
    category: 'volumetric'
  },
  {
    id: 'pipette',
    name: 'ปิเปตต์ปริมาตร 25 mL (Volumetric Pipette 25 mL)',
    description: 'ใช้ตวงตัวอย่างสารละลายกรด (Analyte) ปริมาตรแน่นอน 25.00 mL เพียงค่าเดียว',
    isRequired: true,
    category: 'volumetric'
  },
  {
    id: 'flask',
    name: 'ขวดรูปชมพู่ 250 mL (Erlenmeyer Flask 250 mL)',
    description: 'ภาชนะสำหรับบรรจุสารตัวอย่างเพื่อทำไทเทรต กวนสารง่าย สังเกตการเปลี่ยนสีชัดเจน',
    isRequired: true,
    category: 'container'
  },
  {
    id: 'indicator',
    name: 'อินดิเคเตอร์ฟีนอล์ฟทาลีน”(Phenolphthalein Indicator)',
    description: 'อินดิเคเตอร์เปลี่ยนสีจากไม่มีสีเป็นชมพูระเรื่อในช่วง pH 8.2 - 10.0 (จุดยุติ)',
    isRequired: true,
    category: 'reagent'
  },
  {
    id: 'stand',
    name: 'ขาตั้งและที่จับบิวเรตต์ (Ring Stand & Clamp)',
    description: 'ยึดบิวเรตต์ให้อยู่ในแนวตั้งดิ่งอย่างมั่นคงตลอดการทดลองไทเทรต',
    isRequired: true,
    category: 'support'
  },
  {
    id: 'wash_bottle',
    name: 'ขวดฉีดน้ำกลั่น (Wash Bottle with Distilled Water)',
    description: 'ใช้ล้างปลายบิวเรตต์และข้างขวดรูปชมพู่เพื่อความแม่นยำนิติวิทยาศาสตร์',
    isRequired: true,
    category: 'cleaning'
  },
  {
    id: 'graduated_cylinder',
    name: 'กระบอกตวง 100 mL (Graduated Cylinder)',
    description: 'ความแม่นยำต่ำเกินไป ไม่เหมาะสมกับการไทเทรตระดับนิติวิทยาศาสตร์',
    isRequired: false,
    category: 'rough_measuring'
  },
  {
    id: 'thermometer',
    name: 'เทอร์โมมิเตอร์วัดอุณหภูมิ (Thermometer)',
    description: 'ไม่จำเป็นสำหรับไทเทรตกรด-เบสทั่วไปในอุณหภูมิห้องนี้',
    isRequired: false,
    category: 'measurement'
  }
];

export const BADGES = [
  { id: 'rookie', name: 'Lab Rookie', desc: 'ผ่านภารกิจฉุกเฉิน Case Phase 1 สำเร็จ', icon: '🧪', minPhase: 1 },
  { id: 'precision', name: 'Precision Master', desc: 'ผ่านการปรับมาตรฐานสาร NaOH ใน Case Phase 2', icon: '📏', minPhase: 2 },
  { id: 'analyst', name: 'Precision Analyst', desc: 'อ่านค่าบิวเรตต์และไทเทรตสำเร็จใน Case Phase 3', icon: '🎯', minPhase: 3 },
  { id: 'outlier', name: 'Critical Thinker', desc: 'ตรวจจับและแยกค่า Outlier ได้ถูกต้องใน Case Phase 4', icon: '🧠', minPhase: 4 },
  { id: 'detective', name: 'Chief Investigator', desc: 'เขียนรายงาน CER ปิดคดี Vitamin Boost ได้สมบูรณ์', icon: '🏆', minPhase: 5 }
];
