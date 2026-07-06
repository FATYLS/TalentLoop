"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid, User, Search, CheckSquare, Send, CreditCard, Settings,
  FileUp, LogOut, ChevronRight, Menu, X,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { logout, getUser } from "@/lib/store";
import { appNav } from "@/lib/app-content";
import { brand } from "@/lib/brand";
import { User as UserType } from "@/lib/types";

const icons: Record<string, React.ElementType> = {
  home: LayoutGrid, cv: User, search: Search, cart: CheckSquare,
  send: Send, credits: CreditCard, settings: Settings,
};

const mobilePrimary = [
  { href: "/dashboard", label: "Accueil", icon: LayoutGrid },
  { href: "/candidate/recherche", label: "Candidatures", icon: Search },
  { href: "/candidate/entretien", label: "Entretien", icon: Send },
  { href: "/credits", label: "Crédits", icon: CreditCard },
];

export function AppSidebar() {
  const path = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setUser(getUser());
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [path]);

  const handleLogout = () => {
    logout();
    router.push("/connexion");
  };

  const sidebarContent = (
    <>
      <div className="flex-shrink-0 p-5">
        <div className="flex items-center justify-between lg:block">
          <Logo size="sm" />
          <button type="button" className="lg:hidden p-2 -mr-2" onClick={() => setMobileOpen(false)} aria-label="Fermer">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-[11px] font-semibold text-green-700">
          Gratuit · {user?.credits ?? 1000} crédits {brand.name}
        </div>
        <Link href="/profile"
          className="group mt-4 flex w-full items-center gap-3 rounded-xl border border-[#BF00FF]/20 bg-[#BF00FF]/5 px-4 py-3 transition-colors hover:bg-[#BF00FF]/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#BF00FF]/10">
            <FileUp className="h-4 w-4 text-[#BF00FF]" />
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p className="text-sm font-bold text-black">Importer mon CV</p>
            <p className="text-[10px] text-gray-500">Commencer l&apos;analyse IA</p>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[#BF00FF]" />
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-1">
        {appNav.map(item => {
          const Icon = icons[item.icon];
          const active = path === item.href || (item.href !== "/dashboard" && path.startsWith(item.href));
          if (item.highlight) {
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#BF00FF] to-[#9900CC] px-3 py-3 text-sm font-semibold text-white shadow-md shadow-[#BF00FF]/20 ${active ? "ring-2 ring-[#BF00FF]/40" : ""}`}>
                <Icon className="h-4 w-4 flex-shrink-0" />
                <div className="min-w-0">
                  <p>{item.label}</p>
                  <p className="text-[10px] font-normal opacity-80">{item.sub}</p>
                </div>
              </Link>
            );
          }
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                active ? "border border-[#BF00FF]/30 bg-[#BF00FF]/5 text-[#BF00FF]" : "text-gray-600 hover:bg-gray-50"
              }`}>
              {item.step ? (
                <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                  active ? "bg-[#BF00FF] text-white" : "bg-gray-100 text-gray-500"
                }`}>{item.step}</span>
              ) : (
                <Icon className="h-4 w-4 flex-shrink-0" />
              )}
              <div className="min-w-0">
                <p className={`truncate font-semibold ${active ? "text-[#BF00FF]" : "text-black"}`}>{item.label}</p>
                {item.sub && <p className="truncate text-[10px] text-gray-400">{item.sub}</p>}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="flex-shrink-0 border-t border-gray-100 bg-white p-4">
        <div className="mb-3 hidden sm:flex flex-wrap gap-x-2 gap-y-1 text-[9px] text-gray-400">
          <span>Confidentialité</span><span>·</span><span>CGU</span><span>·</span><span>Mentions légales</span>
        </div>
        {user && (
          <div className="mb-3 flex items-center gap-2 rounded-xl bg-gray-50 p-2">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#BF00FF] text-xs font-bold text-white">
              {user.name[0]?.toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] text-gray-600">{user.email}</p>
              <p className="text-[10px] font-medium text-green-600">Compte actif</p>
            </div>
          </div>
        )}
        <button type="button" onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100">
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white border-b border-gray-100 px-4 h-14 safe-top">
        <Logo size="sm" />
        <button type="button" onClick={() => setMobileOpen(true)} aria-label="Menu"
          className="p-2 rounded-lg hover:bg-gray-100">
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[55] bg-black/40" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 z-[60] flex h-screen w-[min(100vw,280px)] flex-col border-r border-gray-100 bg-white transition-transform duration-300 lg:translate-x-0 lg:w-[260px] ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:flex`}>
        {sidebarContent}
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 safe-bottom flex justify-around">
        {mobilePrimary.map(item => {
          const Icon = item.icon;
          const active = path === item.href || path.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] ${active ? "text-[#BF00FF]" : "text-gray-400"}`}>
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-bold">{item.label}</span>
            </Link>
          );
        })}
        <button type="button" onClick={() => setMobileOpen(true)}
          className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] text-gray-400">
          <Menu className="w-5 h-5" />
          <span className="text-[9px] font-bold">Plus</span>
        </button>
      </nav>
    </>
  );
}
