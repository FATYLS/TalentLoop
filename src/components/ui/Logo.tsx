import Link from "next/link";
import { brand } from "@/lib/brand";

export function Logo({ size = "md", light = false }: { size?: "sm" | "md" | "lg"; light?: boolean }) {
  const s = size === "sm" ? 28 : size === "lg" ? 44 : 36;
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="relative">
        <svg width={s} height={s} viewBox="0 0 40 40" fill="none" className="transition-transform group-hover:scale-105">
          <rect width="40" height="40" rx="11" fill={light ? "#FFFFFF" : "#0A0A0A"} />
          <rect x="1" y="1" width="38" height="38" rx="10" stroke="#BF00FF" strokeWidth="1" strokeOpacity="0.5" />
          <path d="M8 30V10h7c4.5 0 8 3 8 7.5S19.5 25 15 25h-3v5H8zm5-10h3c2 0 3.5-1.5 3.5-3.5S18 13 16 13h-3v7z" fill="#BF00FF" />
          <path d="M21 30l5-20h3.5l5 20h-4.5l-1-4h-6l-1 4H21zm5.5-8h4.5L27 14.5 26.5 22z" fill={light ? "#0A0A0A" : "#FFFFFF"} />
        </svg>
        <div className="absolute inset-0 rounded-xl bg-[#BF00FF]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
      </div>
      <span className={`font-black tracking-tight ${light ? "text-white" : "text-black"} ${size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-lg"}`}>
        {brand.name}
      </span>
    </Link>
  );
}
