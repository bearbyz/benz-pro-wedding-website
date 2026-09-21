import type { Metadata } from "next";
import WeddingInvitation from "@/components/wedding-invitation";

export const metadata: Metadata = { title: "รายละเอียดวันงาน — เบนซ์ & โปร" };
export default function InvitationPage() { return <WeddingInvitation initialStage="open"/>; }
