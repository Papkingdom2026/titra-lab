# Walkthrough - TITRA Feature Update: Student Profile, Printable Certificate & Readability

## 🌟 Summary of New Enhancements

### 1. 👤 ระบบระบุตัวตนเจ้าหน้าที่สืบสวน (Student Credentials Profile System)
- **หน้าแรกก่อนเริ่มเกม (Phase 1 / Case File Workstation)**:
  - เพิ่มหน้าต่างแบบฟอร์มลงทะเบียน ([StudentProfileModal.jsx](file:///e:/Pap/web/gamechem/src/components/common/StudentProfileModal.jsx)) สำหรับระบุ:
    - **ชื่อ - นามสกุล**
    - **ชั้นเรียน** (เช่น ม.5/1)
    - **เลขที่** (เช่น 12)
  - ข้อมูลจะถูกบันทึกใน Zustand Global State ([useGameStore.js](file:///e:/Pap/web/gamechem/src/store/useGameStore.js)) และซิงค์ลงใน LocalStorage
  - แสดง ป้ายชื่อเจ้าหน้าที่ บนแถบเมนูด้านบน (Header HUD) สามารถกดแก้ไขข้อมูลได้ตลอดเวลา

---

### 2. 📜 ใบประกาศเกียรติคุณ และระบบพิมพ์ใบประกาศมาตรฐาน (Printable Official Certificate)
- **การแสดงผลบนหน้าจอ (Phase 5 / Report Workstation)**:
  - เมื่อปิดคดีสำเร็จ 100% ใบประกาศเกียรติคุณจะแสดง ชื่อ-นามสกุล, ชั้นเรียน, เลขที่, วันที่อนุมัติ, คะแนน XP รวม และเหรียญรางวัลครบถ้วน
- **ระบบการพิมพ์ใบประกาศจริง (Official Print Styles - `@media print`)**:
  - แก้ไขปัญหาเดิมที่ปุ่มพิมพ์สั่งพิมพ์ทั้งหน้าเว็บ
  - ด้วยระบบ CSS `@media print` ([index.css](file:///e:/Pap/web/gamechem/src/index.css)):
    - **ซ่อน**: แถบเมนูด้านบน (Header), ปุ่มกด, เมนูสลับหน้า, และพื้นหลังหน้าเว็บมืด
    - **แสดงเฉพาะ**: ใบประกาศเกียรติคุณทางการกรอบสองชั้นสีน้ำเงินทอง (Double Blue/Gold Border) บนพื้นกระดาษขาว A4 สะอาด ตาประทับ Seal of Excellence พร้อมช่องเซ็นชื่อผู้บังคับบัญชา และข้อมูลผู้เรียนครบถ้วน

---

### 3. 🔍 การปรับปรุงขนาดฟอนต์และความคมชัด (Typography & Font Legibility)
- **ปรับขนาดตัวอักษรพื้นฐาน (Base Font Size)**: เพิ่มจาก 12px เป็น 15px / 16px ช่วยให้อ่านรายละเอียดได้สบายตาขึ้น
- **ลดความแตกต่างระหว่างหัวข้อและรายละเอียด**: ปรับขนาดรายละเอียดจาก `text-[10px]` และ `text-xs` เล็กๆ เป็น `text-sm` และ `text-base` ในทุกเวิร์กสเตชัน ([CaseFileWorkstation.jsx](file:///e:/Pap/web/gamechem/src/components/workstations/CaseFileWorkstation.jsx), [EvidenceWorkstation.jsx](file:///e:/Pap/web/gamechem/src/components/workstations/EvidenceWorkstation.jsx), [ReportWorkstation.jsx](file:///e:/Pap/web/gamechem/src/components/workstations/ReportWorkstation.jsx))

---

## 🛠️ Verification & Build Status
- **Build Execution**: `npm run build` สำเร็จ 100% ไร้ข้อผิดพลาด (built in 3.72s)
- **Dev Server**: ทำงานปกติบน `http://localhost:3000/`
