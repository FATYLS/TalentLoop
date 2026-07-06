import { clsx } from "clsx";
import Link from "next/link";

type Variant = "primary" | "outline" | "ghost" | "black";

export function Button({ children, variant = "primary", href, className, onClick, type = "button", disabled }: {
  children: React.ReactNode; variant?: Variant; href?: string; className?: string;
  onClick?: () => void; type?: "button" | "submit"; disabled?: boolean;
}) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 active:scale-95";
  const styles: Record<Variant, string> = {
    primary: "bg-[#BF00FF] text-white hover:bg-[#9900CC] hover:shadow-[0_8px_30px_rgba(191,0,255,0.4)]",
    outline: "border-2 border-black text-black hover:bg-black hover:text-white",
    ghost: "text-gray-500 hover:text-[#BF00FF]",
    black: "bg-black text-white hover:bg-[#1a1a1a] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]",
  };
  const cls = clsx(base, styles[variant], disabled && "opacity-50 cursor-not-allowed", className);
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button type={type} onClick={onClick} disabled={disabled} className={cls}>{children}</button>;
}
