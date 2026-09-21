export type WeddingMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster: string; alt: string };

// Edit wedding details and replace the image/video here; no database is needed.
export const wedding = {
  bride: {
    name: "นางสาวสุชานันท์ เนียรวิชัย",
    nickname: "เบนซ์",
    parents: ["นายคมสันต์ เนียรวิชัย", "นางนิศารัตน์ ชาร์แมน"],
  },
  groom: {
    name: "นายญาณกิตติ์ พรมปัญญา",
    nickname: "โปร",
    parents: ["นายมิตร ตันตน", "นางญาดา พรมปัญญา"],
  },
  dateISO: "2027-01-30T08:30:00+07:00",
  dateLabel: "วันเสาร์ที่ 30 มกราคม 2570",
  venue: "เฮือนคำหลวง",
  address: "อำเภอเมืองลำปาง จังหวัดลำปาง 52000",
  plusCode: "8G3C+XPF",
  mapsUrl: "https://maps.app.goo.gl/36pKmcde9dYpLxaU7",
  media: {
    type: "image",
    src: "/images/gallery/benz-pro-portrait.webp",
    alt: "ภาพพรีเวดดิ้งเบนซ์และโปรในชุดล้านนา สร้างจากภาพอ้างอิงของคู่บ่าวสาว",
  } as WeddingMedia,
  music: {
    // Add the downloaded/licensed file to public/audio, then set its URL here.
    // Empty means the site intentionally renders without audio controls.
    src: "" as string,
    title: "scoore romantic1",
    artist: "Chomnai_TH",
    creditUrl:
      "https://pixabay.com/music/modern-classical-scoore-romantic1-356101/",
  },
  schedule: [
    {
      time: "08.30",
      title: "ต้อนรับแขกผู้มีเกียรติ",
      description: "พบกันในเช้าวันแห่งความสุข",
      icon: "welcome",
    },
    {
      time: "09.09",
      title: "พิธีแห่ขันหมาก",
      description: "ร่วมขบวนแห่งความยินดี",
      icon: "procession",
    },
    {
      time: "09.29",
      title: "พิธีสวมแหวน",
      description: "คำมั่นสัญญาของสองเรา",
      icon: "rings",
    },
    {
      time: "10.09",
      title: "พิธีผูกข้อมือ",
      description: "รับพรและความปรารถนาดี",
      icon: "blessing",
    },
    {
      time: "11.30",
      title: "รับประทานอาหาร",
      description: "ร่วมอิ่มอร่อยและฉลองด้วยกัน",
      icon: "dining",
    },
  ],
} as const;
