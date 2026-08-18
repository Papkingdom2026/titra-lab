// Chemistry & Adaptive Hint System Data for TITRA (GDD Aligned)

export const CHEMISTRY_CONSTANTS = {
  khpMolarMass: 204.22, // g/mol
  khpMassUsed: 0.5106, // grams
  khpVolumeUsed: 25.00, // mL
  standardNaohTargetMolarity: 0.1000, // M
  sampleVolume: 25.00, // mL
  targetAscorbicAcidMolarity: 0.0993, // M (True concentration after removing outlier)
};

// 6-Level Adaptive Hint System per GDD Section 3.5 & 4.9
export const HINT_SYSTEM_6_LEVELS = {
  1: {
    level: 1,
    title: "Level 1: Concept Hint (ชี้แนวคิด)",
    desc: "ลองพิจารณาหลักการพื้นฐานทางเคมีของปัญหาที่กำลังเผชิญ"
  },
  2: {
    level: 2,
    title: "Level 2: Scientific Principle Hint (เชื่อมโยงหลักเคมี)",
    desc: "สมบัติทางเคมีของสารและการวัดปริมาตรที่มีผลต่อความน่าเชื่อถือ"
  },
  3: {
    level: 3,
    title: "Level 3: Investigation Guidance Hint (คำแนะนำสถานการณ์สืบสวน)",
    desc: "คำแนะนำขั้นตอนปฏิบัติเฉพาะในห้องปฏิบัติการนิติเคมี"
  },
  4: {
    level: 4,
    title: "Level 4: Notebook Reference (ระบบเปิดสมุดบันทึกอัตโนมัติ)",
    desc: "นำทางเข้าสู่หน้าสมุดบันทึกเคมี (Laboratory Notebook) ในหัวข้อที่เกี่ยวข้อง"
  },
  5: {
    level: 5,
    title: "Level 5: Worked Example (แสดงตัวอย่างที่ใกล้เคียง)",
    desc: "แสดงตัวอย่างการคำนวณหรือการตัดสินใจในสถานการณ์อ้างอิงคล้ายกัน"
  },
  6: {
    level: 6,
    title: "Level 6: Explanation & Reveal (เฉลยพร้อมคำอธิบายเหตุผล)",
    desc: "เฉลยคำตอบพร้อมคำอธิบายกลไกเชิงวิทยาศาสตร์อย่างละเอียด"
  }
};

export const PHASE_HINTS_6 = {
  1: {
    1: "การไทเทรตระดับนิติวิทยาศาสตร์ต้องการเครื่องแก้วที่มีความแม่นยำสูง (Volumetric Glassware) เพื่อวัดปริมาตรแน่นอน",
    2: "เครื่องแก้วตวงชนิดที่มีขีดบอกปริมาตรตำแหน่งเดียว (เช่น บิวเรตต์ ปิเปตต์) มีความคลาดเคลื่อนต่ำกว่าเครื่องแก้วตวงแบบหยาบ",
    3: "บิวเรตต์ใช้บรรจุสารมาตรฐาน ปิเปตต์ใช้ตวงสารตัวอย่าง 25.00 mL และขวดรูปชมพู่ใช้ผสมสาร",
    4: "เปิด Laboratory Notebook หน้า 'Laboratory Equipment' เพื่อดูคุณสมบัติเครื่องแก้ว",
    5: "ตัวอย่าง: การเตรียมไทเทรตมาตรฐาน ใช้อุปกรณ์ 6 ชิ้น (Burette, Volumetric Pipette, Erlenmeyer Flask, Phenolphthalein, Stand, Wash Bottle)",
    6: "เฉลย: อุปกรณ์จำเป็น 6 ชิ้นคือ บิวเรตต์ ปิเปตต์ ขวดรูปชมพู่ ฟีนอล์ฟทาเลอีน ขาตั้งบิวเรตต์ และขวดฉีดน้ำกลั่น"
  },
  2: {
    1: "สารมาตรฐานปฐมภูมิ (Primary Standard) ต้องมีสมบัติบริสุทธิ์สูง มวลโมเลกุลสูง และไม่ดูดความชื้นจากอากาศ",
    2: "NaOH ดูดความชื้นและทำปฏิกิริยากับ CO2 ในอากาศได้ง่าย จึงเป็นสารมาตรฐานทุติยภูมิ (Secondary Standard) ต้องปรับมาตรฐานด้วย KHP ก่อนเสมอ",
    3: "เลือก KHP (Potassium Hydrogen Phthalate) เป็นสารมาตรฐานปฐมภูมิสำหรับปรับมาตรฐาน NaOH",
    4: "เปิด Laboratory Notebook หน้า 'Primary Standard' เพื่อเปรียบเทียบสารละลาย KHP",
    5: "ตัวอย่าง: การชั่ง KHP 0.5106 g (204.22 g/mol) ละลายในน้ำ แล้วไทเทรตด้วย NaOH 25.00 mL จะได้ NaOH = 0.1000 M",
    6: "เฉลย: KHP คือสารมาตรฐานปฐมภูมิที่เหมาะสมที่สุด เพราะมีความบริสุทธิ์สูงและมวลโมเลกุลแน่นอน"
  },
  3: {
    1: "อินดิเคเตอร์กรด-เบสต้องเปลี่ยนสีในช่วง pH ที่ตรงกับจุดสมดุลของการไทเทรตกรดแอสคอร์บิกด้วย NaOH",
    2: "การไทเทรตกรดอ่อน (Vitamin C) ด้วยเบสแก่ (NaOH) จุดสมดุลจะมี pH เป็นเบสอ่อน (pH 8-9)",
    3: "ฟีนอล์ฟทาเลอีน (Phenolphthalein) เปลี่ยนสีจากไม่มีสีเป็นชมพูระเรื่อในช่วง pH 8.2 - 10.0 เหมาะสมที่สุด",
    4: "เปิด Laboratory Notebook หน้า 'Indicator Selection' เพื่อดูตารางช่วง pH",
    5: "ตัวอย่าง: Methyl Orange เปลี่ยนสีช่วง pH 3.1 - 4.4 (เปลี่ยนสีเร็วกว่าจุดสมดุล), Phenolphthalein เปลี่ยนสีช่วง pH 8.2 - 10.0",
    6: "เฉลย: เลือก Phenolphthalein เพราะเปลี่ยนสีเป็นชมพูระเรื่อตรงจุดยุติพอดี"
  },
  4: {
    1: "ลองสังเกตผลการไทเทรตทั้ง 3 Trial ว่ามี Trial ใดที่ค่าปริมาตรเบี่ยงเบนออกไปจากกลุ่มอย่างชัดเจนหรือไม่",
    2: "ข้อมูลที่มีค่าต่างจากกลุ่มเนื่องจากข้อผิดพลาดในการทดลอง (เช่น มีฟองอากาศในปลายบิวเรตต์) เรียกว่า Outlier หากผลทั้ง 3 ซ้ำใกล้เคียงกันอาจไม่มี Outlier",
    3: "หากพบว่าค่าใดกระโดดผิดปกติ (เช่น Trial 3 มีปริมาตรสูงกว่ากลุ่มเกิน 1.0 mL) ให้ตัดค่านั้นออกแล้วเฉลี่ยค่าที่เหลือ",
    4: "เปิด Laboratory Notebook หน้า 'Outlier & Data Reliability' เพื่อดูวิธีคำนวณ",
    5: "ตัวอย่าง: นำค่าที่น่าเชื่อถือมาเฉลี่ย แล้วใช้สูตร C1V1 = C2V2 คำนวณหา C1 และมวลวิตามินซี",
    6: "เฉลย: หาก Trial 3 ผิดปกติ ให้คัดออก ปริมาตรเฉลี่ยคือ 24.825 mL ความเข้มข้นกรดเท่ากับ 0.0993 M คิดเป็น 0.496 g (496 mg)"
  },
  5: {
    1: "รายงาน CER ประกอบด้วย Claim (ข้อกล่าวอ้าง), Evidence (หลักฐานเชิงประจักษ์) และ Reasoning (เหตุผลทางเคมี)",
    2: "หลักฐานที่ดีต้องสอดคล้องโดยตรงกับ Claim และมีข้อมูลตัวเลขจากการทดลองที่ผ่านการปรับมาตรฐานแล้ว",
    3: " Claim: ปริมาณวิตามินซีใน Vitamin Boost ต่ำกว่าฉลากระบุ 50% | Evidence: ผลไทเทรต C1=0.0993 M | Reasoning: สูตร C1V1=C2V2 และปฏิกิริยาสะเทิน",
    4: "เปิด Laboratory Notebook หน้า 'Claim-Evidence-Reasoning (CER)'",
    5: "ตัวอย่าง: การอ้างอิงหลักฐาน KHP standardization + Outlier removal + C1V1=C2V2 เพื่อหักล้างฉลากผู้ผลิต",
    6: "เฉลย: สรุปรายงาน CER ว่าผลิตภัณฑ์ Vitamin Boost มีปริมาณวิตามินซีต่ำกว่าฉลากอย่างมีนัยสำคัญ"
  }
};

export const TRIALS_DATA = [
  { id: 1, name: "Trial 1 (ซ้ำที่ 1)", initialVol: 0.00, recordedVol: 0.00, completed: false, targetEndpoint: 24.80, note: "การไทเทรตซ้ำที่ 1" },
  { id: 2, name: "Trial 2 (ซ้ำที่ 2)", initialVol: 0.00, recordedVol: 0.00, completed: false, targetEndpoint: 24.85, note: "การไทเทรตซ้ำที่ 2" },
  { id: 3, name: "Trial 3 (ซ้ำที่ 3)", initialVol: 0.00, recordedVol: 0.00, completed: false, targetEndpoint: 28.50, note: "การไทเทรตซ้ำที่ 3" }
];

export const PRIMARY_STANDARD_OPTIONS = [
  {
    id: 'khp',
    name: 'KHP (Potassium Hydrogen Phthalate)',
    formula: 'KHC8H4O4',
    molarMass: '204.22 g/mol',
    isCorrect: true,
    reason: 'เป็นสารมาตรฐานปฐมภูมิ (Primary Standard) บริสุทธิ์สูง > 99.9% มวลโมเลกุลสูง และไม่ดูดความชื้นจากอากาศ'
  },
  {
    id: 'naoh',
    name: 'NaOH (Sodium Hydroxide)',
    formula: 'NaOH',
    molarMass: '40.00 g/mol',
    isCorrect: false,
    reason: 'เป็นสารมาตรฐานทุติยภูมิ (Secondary Standard) เนื่องจากดูดความชื้นในอากาศและทำปฏิกิริยาเกิด Na2CO3 ได้ง่าย'
  },
  {
    id: 'hcl',
    name: 'HCl (Hydrochloric Acid)',
    formula: 'HCl',
    molarMass: '36.46 g/mol',
    isCorrect: false,
    reason: 'เป็นกรดเข้มข้นที่ระเหยง่าย ควบคุมความเข้มข้นแน่นอนไม่ได้ ไม่สามารถใช้เป็นสารมาตรฐานปฐมภูมิได้'
  },
  {
    id: 'oxalic',
    name: 'Oxalic Acid (กรดออกซาลิก)',
    formula: 'H2C2O4·2H2O',
    molarMass: '126.07 g/mol',
    isCorrect: false,
    reason: 'สูญเสียน้ำผลึกได้ง่ายเมื่อตั้งทิ้งไว้ ทำให้มวลโมเลกุลคลาดเคลื่อน KHP จึงเหมาะสมกว่าสำหรับการปรับมาตรฐาน NaOH'
  }
];

export const CER_OPTIONS = {
  claims: [
    { id: 'c1', text: 'ผลิตภัณฑ์ Vitamin Boost มีปริมาณวิตามินซี ต่ำกว่าที่ระบุบนฉลากอย่างมีนัยสำคัญ (เพียง 50% ของฉลาก)', isCorrect: true },
    { id: 'c2', text: 'ผลิตภัณฑ์ Vitamin Boost มีปริมาณวิตามินซี ผ่านเกณฑ์มาตรฐานตามที่ฉลากระบุทุกประการ', isCorrect: false },
    { id: 'c3', text: 'ไม่สามารถสรุปผลการวิเคราะห์ได้เนื่องจากข้อมูลจากห้องปฏิบัติการคลาดเคลื่อนเกินไป', isCorrect: false }
  ],
  evidences: [
    { id: 'e1', text: 'ผลการไทเทรตด้วย NaOH ที่ปรับมาตรฐานด้วย KHP (0.1000 M) ได้ปริมาตรเฉลี่ย 24.825 mL (หลังตัด Outlier Trial 3 ออก)', isCorrect: true },
    { id: 'e2', text: 'คำนวณความเข้มข้นวิตามินซีได้ C1 = 0.0993 M ซึ่งคิดเป็น 0.496 g ต่อ 250 mL (ฉลากระบุ 1.000 g)', isCorrect: true },
    { id: 'e3', text: 'รายงานข่าว Breaking News จากกระทรวงสาธารณสุขเกี่ยวกับจำนวนผู้ป่วย 48 ราย', isCorrect: false }
  ],
  reasonings: [
    { id: 'r1', text: 'จากปฏิกิริยาสะเทิน 1:1 และสูตร C1V1 = C2V2 เมื่อใช้ NaOH ความเข้มข้นอ้างอิงที่แม่นยำ ปริมาตรกรดแอสคอร์บิกจริงมีเพียงครึ่งหนึ่งของฉลาก', isCorrect: true },
    { id: 'r2', text: 'การตัด Trial 3 (28.50 mL) ออกเนื่องจากมีฟองอากาศทำให้ค่าเฉลี่ยมีความน่าเชื่อถือทางนิติเคมีสูงที่สุด', isCorrect: true },
    { id: 'r3', text: 'เนื่องจากผู้ป่วยมีอาการระคายเคืองกระเพาะอาหาร จึงสรุปว่าวิตามินซีต้องมีความเข้มข้นสูงเกินไป', isCorrect: false }
  ]
};
