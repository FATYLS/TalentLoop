"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getUser } from "@/lib/store";
import { AppSidebar } from "@/components/layout/AppSidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<"loading" | "ready" | "unauth">("loading");
  const router = useRouter();

  useEffect(() => {
    const u = getUser();
    if (!u) {
      router.replace("/connexion");
      setStatus("unauth");
      return;
    }
    setStatus("ready");
  }, [router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#f8f9fb]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#BF00FF] border-t-transparent" />
        <p className="text-sm text-gray-400">Chargement...</p>
      </div>
    );
  }

  if (status === "unauth") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#f8f9fb]">
        <p className="text-sm text-gray-500">Vous devez être connecté pour accéder à cette page.</p>
        <Link href="/connexion" className="rounded-xl bg-[#BF00FF] px-6 py-3 text-sm font-bold text-white">
          Se connecter
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <AppSidebar />
      {/* Contenu décalé à droite du menu fixe (260px) */}
      <main className="min-h-screen w-full pl-[260px]">
        <div className="min-h-screen w-full max-w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
