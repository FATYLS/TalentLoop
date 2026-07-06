"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { brand } from "@/lib/brand";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [feat, setFeat] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/80">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-1">
          <div className="relative">
            <button onClick={() => setFeat(!feat)}
              className="flex items-center gap-1 text-sm font-semibold text-black hover:text-[#BF00FF] px-4 py-2 rounded-full hover:bg-[#BF00FF]/5 transition-all">
              Fonctionnalités <ChevronDown className={`w-4 h-4 transition-transform ${feat ? "rotate-180" : ""}`} />
            </button>
            {feat && (
              <div className="absolute top-12 left-0 bg-white border border-gray-100 rounded-2xl shadow-2xl p-3 w-60 space-y-1">
                {[
                  ["Analyse de CV", "/profile"], ["Recherche & Candidatures", "/candidate/recherche"],
                  ["Simulateur d'entretien IA", "/candidate/entretien"], ["Campagnes d'envoi", "/campaigns"],
                  ["Tarifs", "/candidate/prix"], ["Dashboard", "/dashboard"],
                ].map(([l, h]) => (
                  <Link key={h} href={h} onClick={() => setFeat(false)}
                    className="block text-sm text-gray-600 hover:text-[#BF00FF] hover:bg-[#BF00FF]/5 px-4 py-2.5 rounded-xl transition-all font-medium">{l}</Link>
                ))}
              </div>
            )}
          </div>
          {[
            ["Blog", "#"], ["FAQ", "/faq"], ["Tarifs", "/candidate/prix"],
          ].map(([l, h]) => (
            <Link key={l} href={h} className="text-sm font-semibold text-black hover:text-[#BF00FF] px-4 py-2 rounded-full hover:bg-[#BF00FF]/5 transition-all">{l}</Link>
          ))}
          <Link href="/connexion"
            className="text-sm font-semibold text-black border-2 border-black rounded-full px-5 py-2 hover:bg-black hover:text-white transition-all ml-2">
            Connexion
          </Link>
          <Button href="/candidate/recherche" variant="primary" className="!py-2 !px-5 !text-sm ml-2 violet-glow">
            Tester {brand.name}
          </Button>
        </nav>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t p-4 space-y-2">
          {["Blog", "FAQ", "Tarifs"].map((l, i) => (
            <Link key={l} href={i === 0 ? "#" : `/${l.toLowerCase()}`} className="block text-sm font-semibold py-2">{l}</Link>
          ))}
          <Link href="/connexion" className="block text-sm font-semibold py-2">Connexion</Link>
          <Button href="/candidate/recherche" variant="primary" className="w-full">Tester {brand.name}</Button>
        </div>
      )}
    </header>
  );
}
