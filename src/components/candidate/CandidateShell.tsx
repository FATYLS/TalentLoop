"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, CreditCard, Mic, Home, Building2, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { brand } from "@/lib/brand";

const nav = [
  { href: "/candidate/recherche", label: "Candidatures", short: "Campagne", icon: Search },
  { href: "/candidate/prix", label: "Tarifs", short: "Tarifs", icon: CreditCard },
  { href: "/candidate/entretien", label: "Entretien IA", short: "Entretien", icon: Mic },
];

export function CandidateShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="min-h-screen bg-[#f4f6f9]">
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white border-b border-gray-100 px-4 h-14 safe-top">
        <Logo size="sm" />
        <button type="button" onClick={() => setMenuOpen(true)} aria-label="Menu"
          className="p-2 rounded-lg hover:bg-gray-100">
          <Menu className="w-5 h-5 text-black" />
        </button>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-black/40" onClick={() => setMenuOpen(false)} />
      )}

      {/* Mobile slide menu */}
      <aside className={`lg:hidden fixed top-0 right-0 bottom-0 z-[70] w-[min(100vw,280px)] bg-white shadow-2xl flex flex-col transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <p className="text-sm font-bold text-black">Menu</p>
          <button type="button" onClick={() => setMenuOpen(false)} aria-label="Fermer">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-1 flex-1 overflow-y-auto">
          {nav.map(item => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold ${isActive(item.href) ? "bg-[#BF00FF] text-white" : "text-gray-600 hover:bg-gray-50"}`}>
                <Icon className="w-4 h-4" /> {item.label}
              </Link>
            );
          })}
        </div>
        <div className="p-4 border-t border-gray-100 space-y-2">
          <Link href="/recruiter/dashboard" onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-50">
            <Building2 className="w-4 h-4" /> Espace Recruteur
          </Link>
          <Link href="/" onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-50">
            <Home className="w-4 h-4" /> Accueil {brand.name}
          </Link>
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[260px] bg-white border-r border-gray-100 flex-col z-40">
        <div className="p-5 border-b border-gray-100">
          <Logo size="sm" />
          <p className="text-[10px] text-gray-400 mt-2 font-semibold uppercase tracking-widest">Espace Candidat</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map(item => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive(item.href) ? "bg-[#BF00FF] text-white shadow-lg shadow-[#BF00FF]/20" : "text-gray-600 hover:bg-gray-50"
                }`}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-100 space-y-2">
          <Link href="/recruiter/dashboard"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-50">
            <Building2 className="w-4 h-4" /> Espace Recruteur
          </Link>
          <Link href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-50">
            <Home className="w-4 h-4" /> Accueil {brand.name}
          </Link>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 safe-bottom flex justify-around items-stretch px-1">
        {nav.map(item => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2 px-1 min-h-[56px] ${active ? "text-[#BF00FF]" : "text-gray-400"}`}>
              <Icon className={`w-5 h-5 ${active ? "text-[#BF00FF]" : ""}`} />
              <span className="text-[10px] font-bold text-center leading-tight">{item.short}</span>
            </Link>
          );
        })}
      </nav>

      <main className="min-h-screen pt-14 pb-[72px] lg:pt-0 lg:pb-0 lg:pl-[260px]">
        {children}
      </main>
    </div>
  );
}
