"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, CreditCard, Mic, Home, Building2, LogOut } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { brand } from "@/lib/brand";

const nav = [
  { href: "/candidate/recherche", label: "Campagne & Candidatures", icon: Search },
  { href: "/candidate/prix", label: "Tarifs", icon: CreditCard },
  { href: "/candidate/entretien", label: "Simulateur d'entretien IA", icon: Mic },
];

export function CandidateShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f4f6f9]">
      <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-white border-r border-gray-100 flex flex-col z-40">
        <div className="p-5 border-b border-gray-100">
          <Logo size="sm" />
          <p className="text-[10px] text-gray-400 mt-2 font-semibold uppercase tracking-widest">Espace Candidat</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {nav.map(item => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  active ? "bg-[#BF00FF] text-white shadow-lg shadow-[#BF00FF]/20" : "text-gray-600 hover:bg-gray-50"
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
          <Link href="/dashboard"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50">
            <LogOut className="w-4 h-4" /> Dashboard complet
          </Link>
        </div>
      </aside>

      <main className="pl-[260px] min-h-screen">
        {children}
      </main>
    </div>
  );
}
