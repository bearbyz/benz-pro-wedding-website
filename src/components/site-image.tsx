import Image, { type ImageProps } from "next/image";
import { assetPath } from "@/lib/asset-path";

export default function SiteImage({ src, alt, ...props }: ImageProps) {
  return <Image {...props} alt={alt} src={typeof src === "string" ? assetPath(src) : src} />;
}
