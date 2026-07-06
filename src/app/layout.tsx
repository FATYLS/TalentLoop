import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/brand";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: `${brand.tagline} - ${brand.name}`,
  description: "TalentLoop analyse votre CV, cible les entreprises et envoie vos candidatures automatiquement.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
