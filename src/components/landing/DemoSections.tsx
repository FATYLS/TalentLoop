"use client";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { content as c } from "@/lib/content";
import { DEMO_CV_PROFILE } from "@/lib/cv-demo";

export function CvScoreSection() {
  const score = 87;
  return (
    <section className="py-20 px-4 bg-[#0A0A0A] text-white">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#BF00FF]">Analyse CV par IA</p>
          <h2 className="text-3xl font-black mt-3 leading-tight">Votre CV, noté et corrigé en temps réel</h2>
          <p className="text-gray-400 mt-4 text-sm leading-relaxed">
            Score sur 100. Suggestions concrètes. Red flags détectés. Vous savez exactement quoi améliorer avant de candidater.
          </p>
          <Link href="/candidate/recherche"
            className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-[#BF00FF] hover:gap-3 transition-all">
            Lancer ma première candidature <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-6 text-black shadow-2xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Profil analysé</p>
              <p className="font-black text-xl mt-1">{DEMO_CV_PROFILE.firstName} {DEMO_CV_PROFILE.lastName}</p>
              <p className="text-sm text-gray-400">{DEMO_CV_PROFILE.city}</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-black text-[#BF00FF]">{score}</p>
              <p className="text-xs text-gray-400">/100</p>
              <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1 inline-block">Bon potentiel</span>
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full mt-5 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#BF00FF] to-[#14B8A6]" style={{ width: `${score}%` }} />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-5">
            {[
              ["Headline", 82], ["Expérience", 90], ["Compétences", 88], ["ATS", 85],
            ].map(([label, val]) => (
              <div key={label as string}>
                <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                  <span>{label}</span><span className="font-bold">{val}%</span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full"><div className="h-full bg-[#BF00FF] rounded-full" style={{ width: `${val}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-2">
            {["Ajouter des mots-clés ATS pour React", "Détailler les résultats chiffrés"].map(s => (
              <p key={s} className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#BF00FF]" /> {s}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SendingTrackerSection() {
  return (
    <section className="py-20 px-4 bg-[#fafafa]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#BF00FF]">Suivi en temps réel</p>
          <h2 className="text-2xl font-black text-black mt-2">{c.sending.title}</h2>
          <span className="inline-block text-xs font-bold bg-black text-white px-3 py-1 rounded-full mt-3">{c.sending.badge}</span>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            <span className="col-span-2">Entreprise / Poste</span>
            <span>Secteur</span>
            <span>Statut</span>
            <span className="text-right">Heure</span>
          </div>
          {c.sending.items.map(item => (
            <div key={item.role} className="grid grid-cols-5 gap-4 px-6 py-4 border-t border-gray-50 items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-2">
                <p className="font-bold text-sm text-black">{item.company}</p>
                <p className="text-xs text-gray-500">{item.role}</p>
              </div>
              <p className="text-xs text-gray-500">{item.sector}</p>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full w-fit ${
                item.status === "Envoyé" ? "bg-green-100 text-green-700"
                : item.status === "Envoi en cours..." ? "bg-[#BF00FF]/10 text-[#BF00FF]"
                : "bg-orange-100 text-orange-600"
              }`}>{item.status}</span>
              <p className="text-xs text-gray-400 text-right">{item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
