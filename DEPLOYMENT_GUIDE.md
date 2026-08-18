# 🚀 คู่มือการนำเกม TITRA ขึ้นเว็บไซต์จริง (Web Deployment Guide)
### สำหรับเผยแพร่ผลงานโครงงาน / สื่อการสอน ให้ทุกคนและคณะกรรมการเข้าเล่นได้ทั่วโลก

---

## 📌 สรุปเบื้องต้น: "ทำยากไหม?"
**ตอบ: ง่ายมากครับ! ใช้เวลาเพียง 1 - 3 นาที** และ **ฟรี 100%** ไม่มีค่าใช้จ่าย โดยผลลัพธ์ที่ได้จะเป็นลิงก์เว็บไซต์แบบมี HTTPS (เช่น `https://titra-forensic-chem.vercel.app` หรือ `https://yourname.github.io/gamechem/`) ที่เปิดเล่นได้ทั้งบนคอมพิวเตอร์ แท็บเล็ต และสมาร์ตโฟน

---

## 🌟 แนะนำ 3 วิธีที่นิยมและสะดวกที่สุด

```mermaid
graph TD
    A["โครงการเกม TITRA (Vite + React)"] --> B["รันคำสั่ง npm run build (ได้โฟลเดอร์ dist)"]
    B --> C1["วิธีที่ 1: Vercel (แนะนำที่สุด 👑)"]
    B --> C2["วิธีที่ 2: Netlify Drop (ลากวางได้เว็บใน 10 วิ ⚡)"]
    B --> C3["วิธีที่ 3: GitHub Pages (ผูกกับ Git Repo 📂)"]
    
    C1 --> D1["ได้ URL: https://titra-chem.vercel.app"]
    C2 --> D2["ได้ URL: https://titra-chem.netlify.app"]
    C3 --> D3["ได้ URL: https://username.github.io/gamechem"]
```

---

## 🏆 วิธีที่ 1: นำขึ้นผ่าน Vercel (แนะนำที่สุด สวย เร็ว เสถียรสูง 👑)

Vercel เป็นแพลตฟอร์ม Cloud โฮสติ้งชั้นนำสำหรับ React/Vite ที่ได้รับความนิยมสูงสุดทั่วโลก

### ขั้นตอนการทำ (ผ่านหน้าเว็บ Vercel):
1. **สร้างไฟล์ Build**:
   เปิด Terminal ในโฟลเดอร์โปรเจกต์แล้วรัน:
   ```bash
   npm run build
   ```
   *(จะได้โฟลเดอร์ `dist` ที่รวมไฟล์ทั้งหมดไว้เรียบร้อย)*
2. **อัปโหลดขึ้น GitHub** (ถ้ามี Repo อยู่แล้ว):
   - ไปที่เว็บไซต์ [https://vercel.com](https://vercel.com) สมัคร/ล็อกอินด้วย GitHub
   - คลิกปุ่ม **"Add New..."** ➔ เลือก **"Project"**
   - เลือก Repository `gamechem` ของท่าน ➔ คลิก **"Import"**
   - ในช่อง **Build and Output Settings** ค่าเริ่มต้นจะตรวจพบว่าเป็น **Vite** อัตโนมัติ:
     - Framework Preset: `Vite`
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - คลิกปุ่ม **"Deploy"** 
   - รอ 30 วินาที จะมีเอฟเฟกต์พลุขึ้น 🎉 และได้ URL เว็บไซต์พร้อมใช้งานทันที!

---

## ⚡ วิธีที่ 2: นำขึ้นผ่าน Netlify Drop (ง่ายที่สุด ไม่ต้องลงโปรแกรม แค่ "ลากแล้ววาง" 10 วินาทีได้เว็บ!)

วิธีนี้เหมาะมากถ้าต้องการได้ลิงก์เว็บไซต์แบบด่วนที่สุดโดยไม่ต้องใช้ Git หรือพิมพ์คำสั่งซับซ้อน:

1. **สร้างโฟลเดอร์ `dist`**:
   รันคำสั่งในเครื่อง:
   ```bash
   npm run build
   ```
2. เปิดเบราว์เซอร์ไปที่: [https://app.netlify.com/drop](https://app.netlify.com/drop)
3. เข้าสู่ระบบด้วย Email หรือ Google Account
4. เปิดโฟลเดอร์ในเครื่อง `e:\Pap\web\gamechem` แล้ว **ลากโฟลเดอร์ `dist` ไปหย่อนลงในกรอบสี่เหลี่ยมบนหน้าเว็บ Netlify**
5. เว็บไซต์จะออนไลน์ทันที! ท่านสามารถกด **Site configuration ➔ Change site name** เพื่อตั้งชื่อโดเมนสวยๆ ได้ เช่น `titra-forensic.netlify.app`

---

## 📂 วิธีที่ 3: นำขึ้นผ่าน GitHub Pages (ฟรี ผูกกับ GitHub ตลอดชีพ)

หากต้องการให้เว็บไซต์อยู่บน GitHub Pages เพื่อแนบในรายงานการแข่งขัน:

1. **ติดตั้ง package gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```
2. **ตั้งค่า `vite.config.js`**:
   เพิ่ม `base: './'` หรือ `base: '/gamechem/'` เพื่อให้ดึงไฟล์ CSS/JS ได้ถูกต้อง:
   ```javascript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: './' // ให้ Path เป็น Relative เพื่อเปิดได้ทุกที่
   })
   ```
3. **เพิ่ม script ใน `package.json`**:
   ในส่วน `"scripts"`:
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "preview": "vite preview",
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. **สั่ง Deploy ขึ้น GitHub**:
   ```bash
   npm run deploy
   ```
5. ไปที่ GitHub Repo ของท่าน ➔ เมนู **Settings** ➔ **Pages** ➔ เลือก Branch เป็น `gh-pages` ➔ จะได้ลิงก์ `https://<ชื่อผู้ใช้>.github.io/gamechem/`

---

## 📋 เช็คลิสต์ก่อนส่งผลงาน / นำเสนอคณะกรรมการ
- [x] ทดสอบเปิดลิงก์บนสมาร์ตโฟนและแท็บเล็ต เพื่อดูความลื่นไหล
- [x] ตรวจสอบระบบออกเกียรติบัตร (ดาวน์โหลดรูปภาพ HD PNG และพิมพ์ A4 แนวนอน)
- [x] สร้าง **QR Code** จากลิงก์เว็บไซต์ เพื่อนำไปแปะในโปสเตอร์ หรือเอกสารรายงานคู่มือ ให้คณะกรรมการใช้มือถือสแกนเข้าเล่นได้ทันที!
