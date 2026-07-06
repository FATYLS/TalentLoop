"use client";
import Link from "next/link";
import { content as c } from "@/lib/content";
import { ArrowRight } from "lucide-react";

function CvAnalysisMockup() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#BF00FF] to-[#14B8A6] p-3 shadow-lg">
      <div className="bg-white rounded-xl p-4 text-xs">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase">Analyse de votre CV</p>
            <p className="font-black text-black">Marie Dupont</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-green-600">92<span className="text-sm text-gray-300">/100</span></p>
            <span className="text-[9px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Excellent</span>
          </div>
        </div>
        <p className="text-[9px] text-gray-500 mt-2">Type : Développeur Senior</p>
        <div className="h-1.5 bg-gray-100 rounded-full mt-2"><div className="h-full w-[92%] bg-green-500 rounded-full" /></div>
        <p className="text-[9px] font-bold text-gray-400 mt-3">Suggestions principales</p>
        <p className="text-[10px] text-gray-600 mt-1">• Ajouter des mots-clés ATS pour Python</p>
        <p className="text-[10px] text-gray-600">• Détailler les résultats chiffrés</p>
        <p className="text-[9px] font-bold text-red-500 mt-2">⚠ Red flags détectés</p>
      </div>
    </div>
  );
}

function LetterMockup() {
  const companies = ["LVMH", "Airbus", "Danone"];
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#BF00FF] to-[#14B8A6] p-3 shadow-lg">
      <div className="bg-white rounded-xl p-4 text-xs space-y-2">
        {companies.map(co => (
          <div key={co} className="flex justify-between items-center border-b border-gray-50 pb-2">
            <div>
              <p className="font-bold text-black">{co}</p>
              <p className="text-[9px] text-green-600 font-semibold">✓ Lettre générée</p>
            </div>
            <button className="text-[9px] text-[#BF00FF] font-bold">Voir la lettre</button>
          </div>
        ))}
        <p className="text-[9px] text-gray-500 pt-1">Objet : Candidature Développeur Full-Stack — Sophie Martin</p>
      </div>
    </div>
  );
}

function EmailMockup() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#BF00FF] to-[#14B8A6] p-3 shadow-lg">
      <div className="bg-white rounded-xl p-4 text-xs">
        <p className="font-bold text-black">Campagne Développeur Full-Stack</p>
        <p className="text-[9px] text-gray-400 mt-1">jean.dupont@gmail.com</p>
        <div className="h-1.5 bg-gray-100 rounded-full mt-3"><div className="h-full w-1/2 bg-[#BF00FF] rounded-full" /></div>
        <p className="text-[9px] text-[#BF00FF] font-bold mt-1">15 / 30 envoyés</p>
        {[
          ["TechCorp", "Envoyé le 12/01"],
          ["Innovatech", "Ouvert le 13/01"],
          ["DataSystems", "En attente"],
        ].map(([n, s]) => (
          <div key={n} className="flex justify-between mt-2 text-[10px]">
            <span className="text-gray-700">{n}</span>
            <span className="text-gray-400">{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SelectionMockup() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#BF00FF] to-[#14B8A6] p-3 shadow-lg">
      <div className="bg-white rounded-xl p-4 text-xs space-y-2">
        {[
          ["Carrefour", "Grande Distribution", "320 000"],
          ["Capgemini", "Conseil IT", "rh@capgemini.com"],
          ["VINCI", "Construction", "recrutement@vinci.com"],
        ].map(([n, s, e]) => (
          <div key={n} className="flex justify-between border-b border-gray-50 pb-2">
            <div><p className="font-bold">{n}</p><p className="text-[9px] text-gray-400">{s}</p></div>
            <p className="text-[9px] text-gray-500">{e}</p>
          </div>
        ))}
        <div className="flex gap-1 flex-wrap pt-1">
          {["Lancer Campagne", "Enrichir", "Exporter CSV"].map(b => (
            <span key={b} className="text-[8px] bg-[#BF00FF]/10 text-[#BF00FF] px-2 py-0.5 rounded font-semibold">{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CampaignMockup() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#BF00FF] to-[#14B8A6] p-3 shadow-lg">
      <div className="bg-white rounded-xl p-4 text-xs">
        <p className="font-bold">Campagne Développeur Full-Stack</p>
        <p className="text-[9px] text-green-600 font-semibold mt-1">70/73 Lettres générées</p>
        {["LVMH", "Airbus", "Danone"].map(c => (
          <p key={c} className="text-[10px] text-gray-600 mt-1">• {c}</p>
        ))}
        <button className="w-full mt-3 bg-[#BF00FF] text-white text-[10px] font-bold py-2 rounded-lg">Envoyer groupé</button>
      </div>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#BF00FF] to-[#14B8A6] p-3 shadow-lg">
      <div className="bg-white rounded-xl p-4 text-xs">
        <div className="grid grid-cols-2 gap-2">
          {[["150", "Envoyées"], ["112", "Ouverts 75%"], ["45", "Réponses"], ["30%", "Taux"]].map(([v, l]) => (
            <div key={l} className="bg-gray-50 rounded-lg p-2 text-center">
              <p className="text-lg font-black text-[#BF00FF]">{v}</p>
              <p className="text-[8px] text-gray-500">{l}</p>
            </div>
          ))}
        </div>
        <div className="h-12 bg-gradient-to-t from-[#BF00FF]/20 to-transparent rounded-lg mt-3 flex items-end px-2 gap-1">
          {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
            <div key={i} className="flex-1 bg-[#BF00FF] rounded-t opacity-70" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

const mockups = [CvAnalysisMockup, LetterMockup, EmailMockup, SelectionMockup, CampaignMockup, DashboardMockup];

export function FeaturesMockupSection() {
  return (
    <section className="py-20 px-4 bg-[#f4f6f9]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-black text-center mb-14">{c.features.title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {c.features.items.map((f, i) => {
            const Mockup = mockups[i];
            return (
              <Link key={f.title} href={f.href} className="group block">
                <h3 className="font-black text-black text-base mb-2 group-hover:text-[#BF00FF] transition-colors">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{f.desc}</p>
                <Mockup />
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#BF00FF] mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  Découvrir <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
