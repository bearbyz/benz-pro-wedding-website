import type { Metadata } from "next";
import WeddingGallery from "@/components/wedding-gallery";

export const metadata: Metadata = { title: "ทุกภาพ…มีเรา — แกลเลอรี เบนซ์ & โปร" };
export default function GalleryPage() { return <WeddingGallery/>; }
