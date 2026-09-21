import type { Metadata } from "next";
import { Charmonman, Sarabun, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const bodyFont = Sarabun({
  variable: "--font-body",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});
const thaiScript = Charmonman({
  variable: "--font-thai-script",
  subsets: ["thai", "latin"],
  weight: ["400", "700"],
  display: "swap",
});
const serifFont = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "เบนซ์ & โปร — จดหมายเชิญงานแต่งงาน | 30 มกราคม 2570",
  description:
    "ขอเชิญร่วมเป็นส่วนหนึ่งในวันสำคัญของ เบนซ์ สุชานันท์ และ โปร ญาณกิตติ์ วันเสาร์ที่ 30 มกราคม 2570 ณ เฮือนคำหลวง จังหวัดลำปาง",
  openGraph: {
    title: "เบนซ์ & โปร — ออกเหย้า ออกเฮือน",
    description: "30 มกราคม 2570 เวลา 08.30 น. ณ เฮือนคำหลวง จังหวัดลำปาง",
    locale: "th_TH",
    type: "website",
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      className={`${bodyFont.variable} ${thaiScript.variable} ${serifFont.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
