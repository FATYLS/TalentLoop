"use client";
import Link from "next/link";
import { content as c } from "@/lib/content";
import { ArrowRight } from "lucide-react";

function MockScreen({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br from-[#BF00FF] to-[#14B8A6] p-3 shadow-lg ${className}`}>
      <div className="bg-white rounded-xl p-4 text-[10px] shadow-inner min-h-[180px]">{children}</div>
    </div>
  );
}

const screens: Record<string, React.ReactNode> = {
  "Analyse de CV intelligente": (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-sm">Score CV</span>
        <span className="text-2xl font-black text-green-600">92/100</span>
      </div>
      <p className="text-green-700 font-semibold text-[9px] bg-green-50 px-2 py-1 rounded inline-block">Excellent · Développeur Senior</p>
      {["Headline", "Expériences", "Compétences", "ATS"].map((l, i) => (
        <div key={l} className="mt-2">
          <div className="flex justify-between text-gray-500"><span>{l}</span><span>{[92, 88, 95, 90][i]}%</span></div>
          <div className="h-1 bg-gray-100 rounded-full mt-0.5"><div className="h-full bg-[#BF00FF] rounded-full" style={{ width: `${[92, 88, 95, 90][i]}%` }} /></div>
        </div>
      ))}
      <p className="mt-3 text-red-600 bg-red-50 p-2 rounded text-[9px]">⚠ Red flag : période d&apos;inactivité non justifiée</p>
    </div>
  ),
  "Lettres de motivation personnalisées": (
    <div className="space-y-2">
      {[{ n: "LVMH", s: "✓ Lettre Générée" }, { n: "Airbus", s: "✓ Lettre Générée" }, { n: "Danone", s: "✓ Lettre Générée" }].map(x => (
        <div key={x.n} className="flex justify-between items-center border-b border-gray-50 pb-2">
          <span className="font-bold">{x.n}</span>
          <span className="text-green-600 font-semibold">{x.s}</span>
        </div>
      ))}
      <p className="text-gray-500 mt-2 italic line-clamp-3">Objet : Candidature au poste de Développeur Full-Stack — Sophie Martin...</p>
    </div>
  ),
  "Envoi automatique par email": (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-bold">Campagne Full-Stack</span>
        <span className="text-gray-400">Gmail ✉</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full mb-2"><div className="h-full w-1/2 bg-[#BF00FF] rounded-full" /></div>
      <p className="text-[#BF00FF] font-bold mb-2">15/30 envoyés</p>
      {[{ n: "TechCorp", s: "✓ Envoyé" }, { n: "Innovatech", s: "👁 Ouvert" }, { n: "DataSystems", s: "⏳ En attente" }].map(x => (
        <div key={x.n} className="flex justify-between py-1 border-b border-gray-50"><span>{x.n}</span><span className="text-gray-500">{x.s}</span></div>
      ))}
    </div>
  ),
  "Ma Sélection": (
    <div>
      <div className="flex gap-1 flex-wrap mb-2">
        {["Lancer", "Enrichir", "Emails", "CSV"].map(b => <span key={b} className="bg-gray-100 px-2 py-0.5 rounded text-[8px]">{b}</span>)}
      </div>
      {[{ n: "Carrefour", c: "Massy", e: "320k" }, { n: "Capgemini", c: "Paris", e: "340k" }, { n: "VINCI", c: "Nanterre", e: "220k" }].map(x => (
        <div key={x.n} className="border-b border-gray-50 py-1.5">
          <p className="font-bold">{x.n}</p>
          <p className="text-gray-400">{x.c} · {x.e} effectif</p>
        </div>
      ))}
    </div>
  ),
  "Campagnes de candidatures": (
    <div className="space-y-2">
      {[{ n: "Développeur Full-Stack", p: "70/70" }, { n: "Data Scientist", p: "45/50" }, { n: "Chef de Projet", p: "30/30" }].map(x => (
        <div key={x.n} className="border border-gray-100 rounded-lg p-2">
          <p className="font-bold">{x.n}</p>
          <p className="text-[#BF00FF]">{x.p} Lettres générées</p>
        </div>
      ))}
      <button className="w-full bg-[#BF00FF] text-white font-bold py-1.5 rounded mt-1">Envoyer groupé</button>
    </div>
  ),
  "Dashboard de suivi": (
    <div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {[["150", "Envoyées"], ["112", "Ouverts 75%"], ["45", "Réponses"], ["30%", "Taux"]].map(([v, l]) => (
          <div key={l} className="bg-gray-50 rounded p-2 text-center">
            <p className="font-black text-[#BF00FF]">{v}</p>
            <p className="text-[8px] text-gray-400">{l}</p>
          </div>
        ))}
      </div>
      <div className="h-12 bg-gradient-to-r from-[#BF00FF]/20 to-green-200 rounded flex items-end gap-0.5 px-1 pb-1">
        {[40, 60, 45, 80, 55, 90, 70].map((h, i) => <div key={i} className="flex-1 bg-[#BF00FF] rounded-t" style={{ height: `${h}%` }} />)}
      </div>
    </div>
  ),
};

export function FeatureScreensSection() {
  return (
    <section className="py-20 px-4 bg-[#f4f6f9]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-center text-black mb-14">{c.features.title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {c.features.items.map(f => (
            <div key={f.title}>
              <h3 className="font-black text-black text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">{f.desc}</p>
              <MockScreen>{screens[f.title]}</MockScreen>
              <Link href={f.href} className="inline-flex items-center gap-1 mt-3 text-sm font-bold text-[#BF00FF] hover:gap-2 transition-all">
                En savoir plus <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
