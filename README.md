# เบนซ์ & โปร — การ์ดเชิญงานแต่งงาน

เว็บไซต์ภาษาไทย Next.js + Tailwind CSS แบบ Front-End เท่านั้น ไม่มีฐานข้อมูล ไม่มี API และไม่มี RSVP

## เริ่มใช้งาน

ใช้ Node.js 22.18 ขึ้นไป (พัฒนาและทดสอบด้วย Node.js 24) เพื่อสร้างไฟล์ปฏิทินจากข้อมูล TypeScript ได้โดยตรง

```powershell
npm install
npm run dev
```

เปิด http://localhost:3000

```powershell
npm run lint
npm test
npm run build
```

ตั้งค่า `output: "export"` แล้ว `npm run build` จะสร้างเว็บสแตติกใน `out/` นำโฟลเดอร์นี้ไปวางบนโฮสติ้งที่รองรับ HTML/CSS/JavaScript ได้โดยไม่ต้องรัน Next.js server

`npm start` ใช้สำหรับ preview ไฟล์ใน `out/` หลัง build

## สิ่งที่มี

- ซองเบอร์กานดี้ ลูกไม้ ดอกไม้ และลายเส้นล้านนา พร้อมแอนิเมชันเปิดฝาซอง ดึงการ์ด หมุนและขยายเข้าสู่คำเชิญ
- ปุ่มอ่านคำเชิญเพื่อข้ามแอนิเมชัน, รองรับ prefers-reduced-motion, คีย์บอร์ด, focus management และกลับมาเปิดซองใหม่ได้
- ชื่อคู่บ่าวสาวและครอบครัวตามข้อมูลที่ยืนยัน, นับถอยหลังเวลาไทย, กำหนดการ, ธีมสีแต่งกาย
- ลิงก์ Google Maps ไปยัง 8G3C+XPF, Mueang Lampang District, Lampang 52000
- ดาวน์โหลดไฟล์ .ics สำหรับเพิ่มวันงานลงปฏิทิน (08.30 น. เขตเวลาไทย โดยไม่สมมติเวลาเลิกงาน)
- รองรับมือถือและเดสก์ท็อป, ฟอนต์ Charmonman / Sarabun / Cormorant Garamond
- ฟอนต์ถูกดาวน์โหลดและ self-host โดย next/font ในขั้นตอน build

## เปลี่ยนข้อมูล รูป และวิดีโอ

ข้อมูลหลักรวมอยู่ใน `src/data/wedding.ts` ไฟล์เดียว

สำหรับภาพ ให้ใส่ไฟล์ใน `public/images` แล้วตั้งค่า:

```ts
media: {
  type: "image",
  src: "/images/couple.jpg",
  alt: "ภาพพรีเวดดิ้งของเบนซ์และโปร",
}
```

สำหรับวิดีโอ ให้ใส่ไฟล์ใน `public/videos` แล้วตั้งค่า:

```ts
media: {
  type: "video",
  src: "/videos/our-story.mp4",
  poster: "/images/video-cover.jpg",
  alt: "วิดีโอของเบนซ์และโปร",
}
```

วิดีโอมี controls และ playsInline ไม่เล่นเอง เพื่อให้ผู้ชมควบคุมได้ และจะหยุดเพลงพื้นหลังเมื่อกดเล่นวิดีโอ ภาพปัจจุบันเป็นภาพประกอบ Placeholder ที่สร้างขึ้น ไม่ใช่ภาพสถานที่จัดงานจริง

## เพลง

เลือกตัวเลือก `scoore romantic1` โดย Chomnai_TH จาก Pixabay ไว้แล้ว แต่ยังไม่สามารถรับ/ตรวจฟังไฟล์ MP3 ในสภาพแวดล้อมนี้ จึงยังไม่ใส่เสียงจริงและซ่อนปุ่มเล่นไว้ ตั้งค่า `music.src` เมื่อมีไฟล์แล้ว ระบบเสียงจะทำงานทันที

ดูรายละเอียดและขั้นตอนที่ `docs/music.md`

## ไฟล์สำคัญ

- `src/components/wedding-invitation.tsx` — พฤติกรรมเปิดซอง, การ์ด, สื่อ, เพลง, ปฏิทิน
- `src/components/ornaments.tsx` — ลายดอกไม้และไอคอน SVG
- `src/app/globals.css` — สี เลย์เอาต์ แอนิเมชัน และ responsive
- `src/data/wedding.ts` — เนื้อหาที่แก้ไขได้
- `docs/asset-generation.md` — Prompt และที่มาของภาพที่สร้างด้วย image_gen
- `docs/source-assets/` — ภาพ PNG ต้นฉบับ
- `public/images/` — ภาพ WebP ที่ใช้ในเว็บ

ยังไม่ได้เผยแพร่ขึ้นโฮสติ้ง และตั้ง robots noindex ไว้สำหรับช่วงออกแบบ เปลี่ยนได้ใน `src/app/layout.tsx` เมื่อต้องการให้ค้นเจอในเสิร์ชเอนจิน
