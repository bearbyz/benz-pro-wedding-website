export type GalleryPhoto = { id: string; src: string; alt: string; title: string; collection: "ล้านนา" | "โรแมนติก" | "คลาสสิก" | "ชุดขาว & สูท"; width: number; height: number; };
// Generated from the real couple's references; originals are preserved.
const lannaPhotos: GalleryPhoto[] = [
  { id: "portrait", title: "จุดเริ่มต้นของคำว่าเรา", collection: "คลาสสิก", width: 1024, height: 1536 },
  { id: "walk", title: "เคียงข้างในทุกก้าว", collection: "ล้านนา", width: 1024, height: 1536 },
  { id: "temple", title: "ความฮัก ณ วัดต้นเกว๋น", collection: "ล้านนา", width: 1536, height: 1024 },
  { id: "close", title: "ที่ตรงนี้ มีเธอ", collection: "โรแมนติก", width: 1536, height: 1024 },
  { id: "framed", title: "ในกรอบแห่งความทรงจำ", collection: "คลาสสิก", width: 1024, height: 1536 },
  { id: "seated", title: "ช่วงเวลาที่เรียบง่าย", collection: "โรแมนติก", width: 1536, height: 1024 },
  { id: "parasol", title: "ใต้ร่มแห่งรัก", collection: "ล้านนา", width: 1024, height: 1536 },
  { id: "hands", title: "สัญญาว่าจะจับมือกัน", collection: "โรแมนติก", width: 1536, height: 1024 },
].map(photo => ({ ...photo, collection: photo.collection as GalleryPhoto["collection"], src: `/images/gallery/benz-pro-${photo.id}.webp`, alt: `${photo.title} — ภาพพรีเวดดิ้งสร้างด้วย AI จากภาพอ้างอิงของเบนซ์และโปร ในชุดล้านนา ณ วัดต้นเกว๋น` }));

const whitePhotos: GalleryPhoto[] = [
  {
    "id": "white-park-wide",
    "title": "แสงเย็นและเราสองคน",
    "width": 1536,
    "height": 1024,
    "location": "บรรยากาศสวน อบจ.เชียงใหม่"
  },
  {
    "id": "white-park-walk",
    "title": "ก้าวไปด้วยกัน",
    "width": 1024,
    "height": 1536,
    "location": "บรรยากาศสวน อบจ.เชียงใหม่"
  },
  {
    "id": "white-park-close",
    "title": "รอยยิ้มที่คุ้นเคย",
    "width": 1536,
    "height": 1024,
    "location": "บรรยากาศสวน อบจ.เชียงใหม่"
  },
  {
    "id": "white-park-overlook",
    "title": "ปลายทางเดียวกัน",
    "width": 1024,
    "height": 1536,
    "location": "บรรยากาศสวน อบจ.เชียงใหม่"
  },
  {
    "id": "white-studio-embrace",
    "title": "อ้อมกอดของวันพิเศษ",
    "width": 1024,
    "height": 1536,
    "location": "สตูดิโอ"
  },
  {
    "id": "white-studio-full",
    "title": "สง่างามในความเรียบง่าย",
    "width": 1024,
    "height": 1536,
    "location": "สตูดิโอ"
  },
  {
    "id": "white-studio-mono",
    "title": "รักในแสงและเงา",
    "width": 1536,
    "height": 1024,
    "location": "สตูดิโอ"
  },
  {
    "id": "white-studio-seated",
    "title": "ความสุขข้างกัน",
    "width": 1536,
    "height": 1024,
    "location": "สตูดิโอ"
  }
].map(({ location, ...photo }) => ({
  ...photo,
  collection: "ชุดขาว & สูท",
  src: `/images/gallery/benz-pro-${photo.id}.webp`,
  alt: `${photo.title} — ภาพพรีเวดดิ้งสร้างด้วย AI จากภาพอ้างอิงของเบนซ์และโปร ในชุดขาวและสูท ${location}`,
}));

export const galleryPhotos: GalleryPhoto[] = [...lannaPhotos, ...whitePhotos];
