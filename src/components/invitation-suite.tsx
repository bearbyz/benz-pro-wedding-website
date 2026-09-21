"use client";

import Image from "next/image";
import Link from "next/link";
import { wedding } from "@/data/wedding";
import { galleryPhotos } from "@/data/gallery";
import { Botanical, Flourish, Icon } from "./ornaments";
import { TiltCard, useScrollReveal, ScrollProgress } from "./motion-details";

export default function InvitationSuite() {
  const root = useScrollReveal();
  return <main ref={root} className="suite-page">
    <ScrollProgress/>
    <nav className="suite-nav" aria-label="เมนูชุดการ์ดเชิญ"><Link className="brand" href="/" aria-label="กลับไปที่ซองจดหมาย">B<span>&</span>P</Link><span className="eyebrow">A LITTLE WORLD OF OUR LOVE</span><Link href="/invitation" className="suite-nav-next">อ่านคำเชิญ <Icon name="arrow"/></Link></nav>
    <header className="suite-heading"><span className="section-index">WITH LOVE, BENZ & PRO</span><h1>ความรัก…ในจดหมายของเรา</h1><p>ค่อย ๆ เปิดเรื่องราว แล้วมาพบกันในวันสำคัญ</p></header>
    <div className="stationery-scene">
      <Botanical className="suite-botanical suite-botanical-one"/><Botanical className="suite-botanical suite-botanical-two"/>
      <div className="suite-envelope" data-reveal>
        <Image src="/images/open-envelope.webp" alt="ซองจดหมายเบอร์กานดี้เปิดออกพร้อมการ์ดลูกไม้และดอกไม้" width={1024} height={1536} priority sizes="(max-width: 700px) 85vw, 440px"/>
        <div className="suite-envelope-writing"><span>งานมงคลสมรส</span><strong>เบนซ์</strong><i>&</i><strong>โปร</strong><Flourish/></div>
      </div>

      <div className="suite-frame" data-reveal><TiltCard><Link href="/gallery" className="heirloom-photo" aria-label="ชมแกลเลอรีภาพของเรา"><Image className="framed-portrait" src={galleryPhotos[0].src} alt={galleryPhotos[0].alt} width={1024} height={1536} sizes="(max-width: 700px) 48vw, 300px"/><Image className="heirloom-frame-image" src="/images/heirloom-frame.webp" alt="" width={1024} height={1536} sizes="(max-width: 700px) 55vw, 365px"/><span className="frame-photo-hint">ภาพของเรา <Icon name="arrow"/></span></Link></TiltCard></div>

      <div className="suite-calendar" data-reveal><TiltCard><div className="calendar-paper"><span className="calendar-kicker">SAVE OUR DATE</span><h2>มกราคม <span>๒๕๗๐</span></h2><div className="mini-calendar" aria-label="ปฏิทินมกราคม 2570 วันงานวันเสาร์ที่ 30"><div className="calendar-weekdays">{["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"].map(day=><span key={day}>{day}</span>)}</div><div className="calendar-days">{Array.from({length:5},(_,i)=><span key={`blank-${i}`}/>)}{Array.from({length:31},(_,i)=><span key={i} className={i===29 ? "our-date" : ""}>{i+1}{i===29&&<svg viewBox="0 0 45 45" aria-hidden="true"><path d="M34 5C10-2-2 13 6 32c8 18 38 7 35-13C40 8 31 2 20 4"/></svg>}</span>)}</div></div><div className="calendar-ribbon" aria-hidden="true"/><span className="wax-seal" aria-hidden="true">B<i>&</i>P</span><div className="calendar-venue"><p>วันเสาร์ · 08.30 น.</p><strong>{wedding.venue}</strong><span>จังหวัดลำปาง</span></div><a className="calendar-download" href="/benz-pro-wedding.ics" download>บันทึกวันของเรา <Icon name="calendar"/></a></div></TiltCard></div>

      <div className="suite-ribbon" aria-hidden="true"><svg viewBox="0 0 650 500" fill="none"><path d="M530 5C585 115 235 59 237 174c2 82 220-3 210 117C434 404 129 260 98 432"/></svg></div>

      <div className="suite-details" data-reveal><TiltCard><Link href="/invitation" className="lace-keepsake"><span className="keepsake-edge" aria-hidden="true"/><span className="keepsake-content"><span className="eyebrow">YOU ARE INVITED</span><strong>คำเชิญ<br/>จากใจ</strong><Flourish/><span className="keepsake-cta">รายละเอียดวันงาน <Icon name="arrow"/></span></span></Link></TiltCard></div>

      <div className="suite-polaroid" data-reveal><TiltCard><Link href="/gallery" className="polaroid-card"><div className="polaroid-image"><Image src={galleryPhotos[1].src} alt={galleryPhotos[1].alt} width={1024} height={1536} sizes="(max-width: 700px) 45vw, 280px"/></div><span>เรื่องราวของเรา</span><small>OUR LITTLE FOREVER <Icon name="arrow"/></small></Link></TiltCard></div>

      <div className="suite-final-invite" data-reveal><TiltCard><Link href="/invitation" className="burgundy-invite"><span className="burgundy-invite-lace" aria-hidden="true"/><span className="eyebrow">THE CELEBRATION</span><strong>วันของเรา<br/>อยากให้มีคุณ</strong><span>เปิดอ่านรายละเอียด <Icon name="arrow"/></span><Botanical className="invite-gold-botanical"/></Link></TiltCard></div>
      <span className="suite-petal petal-one" aria-hidden="true"/><span className="suite-petal petal-two" aria-hidden="true"/><span className="suite-petal petal-three" aria-hidden="true"/>
    </div>
    <footer className="suite-footer" data-reveal><Flourish/><p>ด้วยรักและความยินดี</p><span>เบนซ์ <i>&</i> โปร</span><small>๓๐ · ๐๑ · ๒๕๗๐</small><Link href="/" className="outline-button"><Icon name="envelope"/> กลับไปที่ซองจดหมาย</Link></footer>
  </main>;
}
