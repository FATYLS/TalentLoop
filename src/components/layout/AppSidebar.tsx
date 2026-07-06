"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid, User, Search, CheckSquare, Send, CreditCard, Settings,
  FileUp, LogOut, ChevronRight,
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

export function AppSidebar() {
  const path = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/connexion");
  };

  return (
    <aside className="fixed top-0 left-0 z-40 flex h-screen w-[260px] flex-col border-r border-gray-100 bg-white">
      {/* Header */}
      <div className="flex-shrink-0 p-5">
        <Logo size="sm" />
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

      {/* Navigation scrollable */}
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

      {/* Footer fixe en bas — déconnexion toujours visible */}
      <div className="flex-shrink-0 border-t border-gray-100 bg-white p-4">
        <div className="mb-3 flex flex-wrap gap-x-2 gap-y-1 text-[9px] text-gray-400">
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
    </aside>
  );
}
