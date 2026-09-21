import Image from "next/image";
import Link from "next/link";
import { galleryPhotos } from "@/data/gallery";
import { Flourish, Icon } from "./ornaments";

export default function GalleryPreview() {
  return <section className="gallery-preview reveal" id="gallery">
    <div className="section-wrap"><header className="gallery-preview-heading"><span className="section-index">04 / MOMENTS TO KEEP</span><h2 className="script-heading">ทุกภาพ…มีความรัก</h2><p>เรื่องราวเล็ก ๆ ที่อยากเก็บไว้ด้วยกัน</p><Flourish/></header>
      <div className="preview-photo-row">{galleryPhotos.slice(0,3).map((photo,index)=><Link href={`/gallery#${photo.id}`} className={`preview-polaroid preview-polaroid-${index}`} key={photo.id} aria-label={`ชมภาพ ${photo.title}`}><div><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 700px) 30vw, 310px"/></div><span>{photo.title}</span><small>0{index+1} <Icon name="arrow"/></small></Link>)}</div>
      <Link href="/gallery" className="solid-button gallery-more">ชมแกลเลอรีทั้งหมด <Icon name="arrow"/></Link>
      <p className="placeholder-caption">เบนซ์ & โปร · พรีเวดดิ้งล้านนา</p>
    </div>
  </section>;
}
