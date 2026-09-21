"use client";

import Image from "./site-image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { galleryPhotos, type GalleryPhoto } from "@/data/gallery";
import { Botanical, Flourish, Icon } from "./ornaments";
import { ScrollProgress } from "./motion-details";

const filters = ["ทั้งหมด", "ล้านนา", "โรแมนติก", "คลาสสิก"] as const;

export default function WeddingGallery() {
  const [filter,setFilter] = useState<string>("ทั้งหมด");
  const [active,setActive] = useState<string|null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement|null>(null);
  const touch = useRef<{x:number;y:number}|null>(null);
  const visible = galleryPhotos.filter(photo=>filter === "ทั้งหมด" || photo.collection === filter);
  const photo = galleryPhotos.find(item=>item.id === active);
  const position = visible.findIndex(item=>item.id === active);

  function show(photo: GalleryPhoto) {
    opener.current = document.activeElement as HTMLElement;
    setActive(photo.id);
  }
  const close = useCallback(() => {
    setActive(null);
    dialog.current?.close();
    opener.current?.focus({preventScroll:true});
  }, []);
  const step = useCallback((direction:number) => {
    setActive(current => {
      const index = visible.findIndex(item=>item.id === current);
      return visible[(index + direction + visible.length) % visible.length].id;
    });
  }, [visible]);

  useEffect(()=>{
    const id = window.location.hash.slice(1);
    if (!galleryPhotos.some(item=>item.id === id)) return;
    const timer = window.setTimeout(()=>{ opener.current = document.getElementById(`photo-${id}`); setActive(id); },0);
    return ()=>window.clearTimeout(timer);
  },[]);

  useEffect(()=>{
    if (!active || !dialog.current) return;
    if (!dialog.current.open) dialog.current.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return ()=>{ document.body.style.overflow = previousOverflow; };
  },[active]);

  return <main className="gallery-page">
    <ScrollProgress/>
    <nav className="gallery-nav" aria-label="เมนูแกลเลอรี"><Link href="/suite" className="brand" aria-label="กลับไปหน้าชุดการ์ด">B<span>&</span>P</Link><Link href="/invitation" className="gallery-back"><Icon name="arrow"/> กลับไปหน้ารายละเอียด</Link><span className="eyebrow">OUR VISUAL LOVE LETTER</span></nav>
    <header className="gallery-heading"><Botanical className="gallery-heading-botanical"/><span className="section-index">THE ART OF BEING TOGETHER</span><h1>ทุกภาพ…มีเรา</h1><p>บางช่วงเวลา ไม่ต้องการคำบรรยายมากไปกว่าความรัก</p><Flourish/><span className="gallery-placeholder-note">ภาพพรีเวดดิ้งของเราสองคน</span></header>
    <div className="gallery-filter-bar"><div className="gallery-filters" role="group" aria-label="เลือกหมวดภาพ">{filters.map(item=><button key={item} onClick={()=>setFilter(item)} className={filter === item ? "selected" : ""} aria-pressed={filter === item}>{item}</button>)}</div><span aria-live="polite">{String(visible.length).padStart(2,"0")} ภาพแห่งความทรงจำ</span></div>
    <div className="gallery-grid" key={filter}>{visible.map((item,index)=><button id={`photo-${item.id}`} key={item.id} className={`gallery-tile ${item.width>item.height ? "landscape" : "portrait"}`} style={{animationDelay:`${index*75}ms`}} onClick={()=>show(item)} aria-label={`เปิดภาพ ${item.title}`}><div className="gallery-tile-image"><Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 700px) 46vw, (max-width: 1000px) 44vw, 30vw" priority={index<2}/><span className="gallery-image-open" aria-hidden="true">ดูภาพเต็ม <span>↗</span></span></div><div className="gallery-tile-caption"><span>{item.title}</span><small>{item.collection}</small></div></button>)}</div>
    <footer className="gallery-page-footer"><Flourish/><h2>และยังมีอีกหลายความทรงจำ<br/>ที่เราอยากสร้างไปด้วยกัน</h2><Link href="/invitation" className="outline-button">กลับไปอ่านคำเชิญ <Icon name="arrow"/></Link><span>WITH LOVE, BENZ & PRO</span></footer>

    <dialog ref={dialog} className="photo-lightbox" aria-label="ภาพพรีเวดดิ้งขนาดเต็ม" onCancel={event=>{event.preventDefault();close();}} onClick={event=>{if(event.target===event.currentTarget)close();}} onKeyDown={event=>{if(event.key==="ArrowRight"){event.preventDefault();step(1);}if(event.key==="ArrowLeft"){event.preventDefault();step(-1);}}}>
      {photo&&<><div className="lightbox-topbar"><span>BENZ & PRO <i>—</i> {photo.collection}</span><button onClick={close} className="lightbox-close" aria-label="ปิดภาพใหญ่" autoFocus><span aria-hidden="true">×</span></button></div><div className="lightbox-stage" onTouchStart={event=>{touch.current={x:event.touches[0].clientX,y:event.touches[0].clientY};}} onTouchEnd={event=>{if(!touch.current)return;const dx=event.changedTouches[0].clientX-touch.current.x;const dy=event.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))step(dx<0?1:-1);touch.current=null;}}><button className="lightbox-prev" aria-label="ภาพก่อนหน้า" onClick={()=>step(-1)}><Icon name="arrow"/></button><figure key={photo.id} className="lightbox-figure"><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="90vw" priority/><figcaption>{photo.title}</figcaption></figure><button className="lightbox-next" aria-label="ภาพถัดไป" onClick={()=>step(1)}><Icon name="arrow"/></button></div><div className="lightbox-bottom"><span aria-live="polite">{String(position+1).padStart(2,"0")} / {String(visible.length).padStart(2,"0")}</span><div className="lightbox-thumbnails">{visible.map(item=><button key={item.id} onClick={()=>setActive(item.id)} aria-label={`ดูภาพ ${item.title}`} aria-pressed={photo.id===item.id}><Image src={item.src} alt="" width={60} height={72}/></button>)}</div><span className="lightbox-hint">← → เปลี่ยนภาพ · Esc ปิด</span></div></>}
    </dialog>
  </main>;
}
