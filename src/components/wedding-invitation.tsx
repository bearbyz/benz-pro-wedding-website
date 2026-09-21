"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { wedding } from "@/data/wedding";
import { Botanical, Flourish, Icon } from "./ornaments";

type Stage = "closed" | "opening" | "open";

function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setRemaining(Math.max(0, new Date(wedding.dateISO).getTime() - Date.now()));
    const first = window.setTimeout(update, 0);
    const interval = window.setInterval(update, 1000);
    return () => { window.clearTimeout(first); window.clearInterval(interval); };
  }, []);
  const values = remaining === null ? [null, null, null, null] : [
    Math.floor(remaining / 86400000), Math.floor(remaining / 3600000) % 24,
    Math.floor(remaining / 60000) % 60, Math.floor(remaining / 1000) % 60,
  ];
  return <div className="countdown" aria-label="เวลาที่เหลือก่อนวันงาน">
    {values.map((value, i) => <div className="countdown-unit" key={i}>
      <span className="countdown-number">{value === null ? "—" : String(value).padStart(2, "0")}</span>
      <span>{["วัน", "ชั่วโมง", "นาที", "วินาที"][i]}</span>
    </div>)}
  </div>;
}

function WeddingMedia({ onVideoPlay }: { onVideoPlay: () => void }) {
  const media = wedding.media;
  if (media.type === "video") {
    return <video className="wedding-media" controls playsInline preload="metadata" poster={media.poster} onPlay={onVideoPlay} aria-label={media.alt}>
      <source src={media.src} />เบราว์เซอร์นี้ไม่รองรับวิดีโอ <a href={media.src}>เปิดวิดีโอ</a>
    </video>;
  }
  return <Image className="wedding-media" src={media.src} alt={media.alt} width={1024} height={1536} sizes="(max-width: 700px) 85vw, 440px" />;
}

function saveCalendar() {
  const lines = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Benz and Pro//Wedding Invitation//TH", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
    "BEGIN:VEVENT", "UID:benz-pro-20270130@wedding.local", "DTSTAMP:20260921T000000Z",
    "DTSTART:20270130T013000Z", "SUMMARY:งานแต่งงาน เบนซ์ & โปร",
    `LOCATION:${wedding.venue} ${wedding.address}`,
    "DESCRIPTION:ร่วมงานมงคลสมรส เบนซ์ สุชานันท์ และ โปร ญาณกิตติ์\\nธีมสี แดง ครีม น้ำตาล (ล้านนา)\\n" + wedding.mapsUrl,
    `URL:${wedding.mapsUrl}`, "END:VEVENT", "END:VCALENDAR",
  ];
  // Fold by UTF-8 octets as required by RFC 5545, preserving Thai code points.
  const encoder = new TextEncoder();
  const folded = lines.map((line) => {
    let output = "", length = 0;
    for (const char of line) {
      const bytes = encoder.encode(char).length;
      if (length + bytes > 73) { output += "\r\n "; length = 1; }
      output += char; length += bytes;
    }
    return output;
  }).join("\r\n") + "\r\n";
  const url = URL.createObjectURL(new Blob([folded], { type: "text/calendar;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url; anchor.download = "benz-pro-wedding.ics";
  document.body.appendChild(anchor); anchor.click(); anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function WeddingInvitation() {
  const [stage, setStage] = useState<Stage>("closed");
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const detailsRef = useRef<HTMLElement>(null);
  const openGuard = useRef(false);

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  useEffect(() => {
    if (stage !== "open") return;
    titleRef.current?.focus({ preventScroll: true });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    detailsRef.current?.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [stage]);

  function playMusic() {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.3;
    void audioRef.current.play().then(() => setAudioError(false)).catch(() => setPlaying(false));
  }

  function openLetter(skipAnimation = false) {
    if (openGuard.current) return;
    openGuard.current = true;
    window.scrollTo({ top: 0, behavior: "instant" });
    playMusic();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (skipAnimation || reduceMotion) { setStage("open"); return; }
    setStage("opening");
    timeoutRef.current = setTimeout(() => setStage("open"), 3400);
  }

  function closeLetter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    audioRef.current?.pause();
    openGuard.current = false;
    setStage("closed");
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => openButtonRef.current?.focus({ preventScroll: true }));
  }

  return <div className={`wedding-site stage-${stage}`}>
    <audio ref={audioRef} src={wedding.music.src} loop preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setAudioError(true); setPlaying(false); }} />

    {stage !== "open" && <section className="envelope-screen" aria-label="จดหมายเชิญงานแต่งงาน">
      <div className="intro-border" aria-hidden="true" />
      <Botanical className="intro-botanical botanical-left" />
      <Botanical className="intro-botanical botanical-right" />
      <header className="intro-top"><span className="brand">B<span>&</span>P</span><span className="eyebrow">A LETTER, WITH LOVE</span><span className="intro-edition">LAMPANG · 2027</span></header>
      <div className="intro-heading">
        <p className="intro-kicker">จดหมายฉบับนี้…มีความรักอยู่ข้างใน</p>
        <h1>เบนซ์ <span>&</span> โปร</h1>
        <p className="intro-subtitle">ขอเรียนเชิญร่วมเป็นส่วนหนึ่งในวันสำคัญของเรา</p>
      </div>

      <button ref={openButtonRef} className="envelope-button" onClick={() => openLetter()} disabled={stage === "opening"} aria-label="เปิดซองจดหมายเชิญงานแต่งงาน" aria-busy={stage === "opening"}>
        <span className="envelope-scene" aria-hidden="true">
          <span className="envelope-interior" />
          <span className="emerging-letter">
            <span className="letter-inner"><span className="letter-kicker">เรากำลังจะแต่งงาน</span><span className="letter-names">เบนซ์ <i>&</i> โปร</span><Flourish /><span className="letter-date">๓๐ · ๐๑ · ๒๕๗๐</span><span className="letter-venue">เฮือนคำหลวง · ลำปาง</span></span>
          </span>
          <Image className="envelope-base" src="/images/envelope.webp" alt="" width={1536} height={1024} priority sizes="(max-width: 700px) 100vw, 740px" />
          <span className="envelope-flap"><Image src="/images/envelope.webp" alt="" width={1536} height={1024} sizes="(max-width: 700px) 100vw, 740px" priority /><span className="seal-monogram">B<span>&</span>P</span></span>
        </span>
      </button>
      <div className="open-prompt"><span className="prompt-line"/><p>{stage === "opening" ? "กำลังเปิดจดหมายแห่งความรัก…" : "แตะที่ซอง เพื่อเปิดคำเชิญ"}</p><span className="prompt-line"/></div>
      <p className="sound-note"><Icon name="music"/> เปิดพร้อมเสียงเพลงเบา ๆ</p>
      <footer className="intro-bottom"><span>30 . 01 . 2027</span><span className="tiny-diamond">✧</span><span>เฮือนคำหลวง · ลำปาง</span></footer>
      <button className="skip-button" onClick={() => { if (stage === "opening") { if (timeoutRef.current) clearTimeout(timeoutRef.current); setStage("open"); } else openLetter(true); }}>อ่านคำเชิญ <Icon name="arrow" /></button>
    </section>}

    <main ref={detailsRef} id="invitation" className="invitation-content" hidden={stage !== "open"}>
      <nav className="wedding-nav" aria-label="เมนูการ์ดเชิญ">
        <button className="brand" onClick={closeLetter} aria-label="กลับไปที่ซองจดหมาย">B<span>&</span>P</button>
        <div className="nav-links"><a href="#our-day">วันของเรา</a><a href="#schedule">กำหนดการ</a><a href="#location">สถานที่</a></div>
        <span className="nav-date">30.01.2027</span>
      </nav>

      <section className="hero-letter section-wrap" id="our-day">
        <Botanical className="hero-botanical" />
        <div className="hero-copy">
          <p className="eyebrow">THE WEDDING OF</p>
          <h2 ref={titleRef} tabIndex={-1} className="couple-heading">เบนซ์ <span>&</span> โปร</h2>
          <p className="lanna-heading">ออกเหย้า ออกเฮือน</p>
          <Flourish className="hero-flourish" />
          <p className="invitation-intro">ด้วยความยินดีอย่างยิ่ง<br/>ขอเรียนเชิญท่านร่วมเป็นเกียรติ<br/>และเป็นส่วนหนึ่งในงานมงคลสมรสของเรา</p>
          <div className="full-names"><p>{wedding.bride.name} <span>(เบนซ์)</span></p><span className="name-connector">และ</span><p>{wedding.groom.name} <span>(โปร)</span></p></div>
          <div className="hero-date"><span>วันเสาร์</span><strong>30</strong><span>มกราคม<br/>2570</span></div>
          <p className="hero-place">เวลา 08.30 น. · ณ {wedding.venue} จังหวัดลำปาง</p>
          <a className="text-link" href="#schedule">รายละเอียดวันแห่งความสุข <Icon name="down" /></a>
        </div>
        <figure className="hero-photo">
          <div className="photo-arch"><WeddingMedia onVideoPlay={() => audioRef.current?.pause()} /></div>
          <span className="photo-label">a little beginning of forever</span>
          <div className="date-stamp" aria-hidden="true"><span>JANUARY</span><strong>30</strong><span>2027</span></div>
          <figcaption>สองหัวใจ · หนึ่งการเดินทาง</figcaption>
        </figure>
      </section>

      <section className="family-section section-wrap reveal">
        <Flourish />
        <p className="section-small-title">พร้อมด้วยความรักจากครอบครัว</p>
        <div className="families"><div><span className="family-label">ครอบครัวเจ้าสาว</span>{wedding.bride.parents.map(name=><p key={name}>{name}</p>)}</div><span className="families-and">&</span><div><span className="family-label">ครอบครัวเจ้าบ่าว</span>{wedding.groom.parents.map(name=><p key={name}>{name}</p>)}</div></div>
        <p className="family-invite">มีความยินดีขอเรียนเชิญท่านร่วมเป็นเกียรติ<br className="mobile-break"/> เนื่องในพิธีมงคลสมรสของบุตรทั้งสอง</p>
      </section>

      <section className="countdown-section">
        <Botanical className="countdown-botanical" />
        <div className="section-wrap countdown-inner reveal"><div><p className="eyebrow">COUNTING THE MOMENTS</p><h2 className="script-heading">นับวัน…ให้ถึงวันของเรา</h2><p>อีกไม่นาน เราจะได้พบกัน</p></div><Countdown /></div>
      </section>

      <section className="schedule-section section-wrap reveal" id="schedule">
        <div className="section-heading"><span className="section-index">01 / THE CELEBRATION</span><h2 className="script-heading">ลำดับความสุข</h2><p>{wedding.dateLabel}</p></div>
        <ol className="timeline">{wedding.schedule.map((event)=><li key={event.time}><div className="event-icon"><Icon name={event.icon}/></div><span className="timeline-dot"/><p className="event-time">{event.time}<span> น.</span></p><h3>{event.title}</h3><p className="event-description">{event.description}</p></li>)}</ol>
        <button className="outline-button" onClick={saveCalendar}><Icon name="calendar"/> บันทึกวันสำคัญลงปฏิทิน</button>
      </section>

      <section className="dress-section reveal" id="dress-code">
        <div className="dress-inner section-wrap"><div className="dress-copy"><span className="section-index">02 / DRESS WITH LOVE</span><h2 className="script-heading">แต่งแต้มวันแห่งรัก</h2><p>ร่วมเติมสีสันให้วันของเรา<br/>ด้วยชุดโทนสีแดง ครีม หรือน้ำตาล<br/><span className="dress-note">กลิ่นอายล้านนา ในแบบที่เป็นคุณ</span></p></div>
          <div className="color-palette"><div className="color-swatch"><span style={{background:"#761f32"}}/><p>แดงเบอร์กานดี้</p><small>BURGUNDY</small></div><div className="color-swatch"><span style={{background:"#eedfc5"}}/><p>ครีม</p><small>CREAM</small></div><div className="color-swatch"><span style={{background:"#88502f"}}/><p>น้ำตาล</p><small>WARM BROWN</small></div></div>
        </div>
      </section>

      <section className="location-section section-wrap reveal" id="location">
        <div className="venue-art" aria-hidden="true"><Botanical className="venue-botanical"/><svg viewBox="0 0 400 260" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M30 238h340M54 225h292M80 220V130m240 90V130M60 143 200 57l140 86H60Zm21-12 119-71 119 71M180 67V46l20-27 20 27v21M183 46h34M200 19v32M103 125h194M106 132v88m188-88v88M124 220v-76h56v76m40 0v-76h56v76M137 145v66m30-66v66m66-66v66m30-66v66M103 182h194M80 207h240M82 196h236M187 144h26v76M170 89h60M151 101h99M129 113h142M50 143c-9-8-13-22-12-29 10 10 18 10 26 14m272 0c8-4 16-4 26-14 1 7-3 21-12 29"/><path d="M30 238c-9-29-14-60 3-72 13 18 11 37-3 72Zm340 0c9-29 14-60-3-72-13 18-11 37 3 72Z"/></svg><span>เฮือนแห่งความฮัก</span><span className="venue-art-sub">LAMPANG, THAILAND</span></div>
        <div className="location-copy"><span className="section-index">03 / MEET US HERE</span><h2 className="script-heading">พบกันที่…</h2><h3>{wedding.venue}</h3><p>{wedding.address}</p><div className="location-date"><Icon name="calendar"/><span>{wedding.dateLabel}<br/>เริ่มต้อนรับเวลา 08.30 น.</span></div><a className="solid-button" href={wedding.mapsUrl} target="_blank" rel="noopener noreferrer"><Icon name="map"/> เปิดแผนที่ Google Maps <Icon name="arrow"/></a><p className="plus-code">ตำแหน่งสถานที่ · {wedding.plusCode}</p></div>
      </section>

      <footer className="wedding-footer"><Botanical className="footer-botanical"/><Icon className="footer-heart" name="heart"/><p>ขอบคุณที่เป็นส่วนหนึ่งในเรื่องราวของเรา</p><h2>แล้วพบกันในวันแห่งความรัก</h2><span className="footer-names">เบนซ์ <i>&</i> โปร</span><span className="footer-date">๓๐ · ๐๑ · ๒๕๗๐</span><Flourish/><p className="footer-apology">ขออภัยหากมิได้มาเรียนเชิญด้วยตนเอง</p><button className="back-envelope" onClick={closeLetter}><Icon name="envelope"/> กลับไปที่ซองจดหมาย</button><a className="music-credit" href={wedding.music.creditUrl} target="_blank" rel="noopener noreferrer">เพลง {wedding.music.title} · {wedding.music.artist} / Pixabay</a></footer>
    </main>

    {stage === "open" && <div className="music-control"><button className={`music-toggle ${playing ? "is-playing" : ""}`} onClick={() => { if (playing) audioRef.current?.pause(); else playMusic(); }} aria-label={playing ? "ปิดเพลงประกอบ" : "เปิดเพลงประกอบ"} aria-pressed={playing}><Icon name={playing ? "music" : "mute"}/><span>{playing ? "เพลงกำลังบรรเลง" : "เปิดเสียงเพลง"}</span>{playing && <span className="equalizer" aria-hidden="true"><i/><i/><i/></span>}</button>{audioError && <span className="audio-message" role="status">ยังเล่นเพลงไม่ได้ ลองเปิดอีกครั้ง</span>}</div>}
    <noscript><div className="noscript-invitation"><h1>งานมงคลสมรส เบนซ์ & โปร</h1><p>{wedding.bride.name} และ {wedding.groom.name}</p><p>{wedding.dateLabel} เวลา 08.30 น.</p><p>{wedding.venue} {wedding.address}</p><a href={wedding.mapsUrl}>เปิดแผนที่ Google Maps</a><p>เปิด JavaScript เพื่อชมแอนิเมชันและรายละเอียดทั้งหมด</p></div></noscript>
  </div>;
}
