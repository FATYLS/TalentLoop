"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { getCV } from "@/lib/store";
import { CVData } from "@/lib/types";
import { Trophy, Target, Camera, Building2, ArrowRight } from "lucide-react";

export default function ResultsPage() {
  const router = useRouter();
  const [cv, setCv] = useState<CVData | null>(null);

  useEffect(() => {
    const data = getCV();
    if (!data) { router.push("/profile"); return; }
    setCv(data);
  }, [router]);

  if (!cv) return null;

  return (
    <AppShell>
      <div className="p-6 md:p-8 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-black">Vos résultats</h1>
          <p className="text-gray-500 text-sm mt-2">Découvrez votre score, les points à améliorer et les secteurs qui vous correspondent</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <h2 className="font-black text-black">Analyse de votre CV</h2>
            </div>
            <div className="text-right">
              <p className="text-4xl font-black text-green-600">{cv.score}/100</p>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">Prêt pour les candidatures</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Type de profil : {cv.profileType}</p>
          <div className="h-3 bg-gray-100 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: `${cv.score}%` }} />
          </div>
          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-gray-600">
            {cv.suggestions[0]}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#BF00FF]/20 p-6 shadow-sm mb-6 border-l-4 border-l-[#BF00FF]">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-[#BF00FF]" />
            <h3 className="font-black text-black">Votre Objectif de Recherche</h3>
            <span className="text-xs bg-[#BF00FF]/10 text-[#BF00FF] px-2 py-0.5 rounded-full font-bold">{cv.contract}</span>
          </div>
          <p className="text-sm text-gray-600">Vous êtes à la recherche d&apos;un poste de <strong>{cv.jobTitle}</strong> en {cv.contract}. Votre CV montre une bonne maîtrise des technologies clés du développement web.</p>
          <div className="mt-4 bg-gray-50 rounded-xl p-4 flex gap-3">
            <BriefcaseIcon />
            <div>
              <p className="font-bold text-sm">{cv.jobTitle}</p>
              <p className="text-xs text-gray-500 mt-1">{cv.profile.summary.slice(0, 150)}...</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-teal-200 p-6 shadow-sm mb-6 border-l-4 border-l-teal-400">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-teal-500" />
              <div>
                <h3 className="font-black text-black">Évaluation de la Photo</h3>
                <p className="text-xs text-gray-400">Critères de professionnalisme</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-[#BF00FF]">{cv.photoScore}/11</p>
              <span className="text-xs bg-[#BF00FF] text-white px-2 py-0.5 rounded-full font-bold">CORRECT</span>
            </div>
          </div>
          <div className="mt-4 bg-teal-50 rounded-xl p-4 text-sm text-gray-600">
            💡 Votre photo est correcte mais pourrait être optimisée. Essayez de sourire avec les yeux (sourire de Duchenne), assurez-vous que votre visage est bien éclairé.
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-[#BF00FF]" />
            <h3 className="font-black text-black">Les secteurs où tu peux travailler</h3>
            <span className="text-xs bg-[#BF00FF]/10 text-[#BF00FF] px-2 py-0.5 rounded-full">{cv.sectors.length} secteurs</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {cv.sectors.map(s => (
              <span key={s} className="text-xs border border-[#BF00FF]/30 text-[#BF00FF] px-3 py-1.5 rounded-full">{s}</span>
            ))}
          </div>
        </div>

        <Link href="/profile/analysis"
          className="block w-full text-center bg-gradient-to-r from-[#BF00FF] to-[#9900CC] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity">
          Voir l&apos;analyse détaillée <ArrowRight className="w-4 h-4 inline ml-1" />
        </Link>
      </div>
    </AppShell>
  );
}

function BriefcaseIcon() {
  return <div className="w-8 h-8 bg-[#BF00FF]/10 rounded-lg flex items-center justify-center text-[#BF00FF] text-sm">💼</div>;
}
