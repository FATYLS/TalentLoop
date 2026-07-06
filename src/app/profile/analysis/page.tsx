"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { getCV } from "@/lib/store";
import { CVData } from "@/lib/types";
import { Star, AlertCircle, Rocket, RefreshCw, Briefcase } from "lucide-react";

const TITLES = ["Vos Points Forts", "Points à Améliorer", "Corrections Recommandées"];

export default function AnalysisPage() {
  const router = useRouter();
  const [cv, setCv] = useState<CVData | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const data = getCV();
    if (!data) { router.push("/profile"); return; }
    setCv(data);
  }, [router]);

  if (!cv) return null;

  const progress = Math.round(((step + 1) / 3) * 100);

  const severityColor = (s: string) =>
    s === "CRITICAL" ? "bg-red-100 text-red-700" : s === "HIGH" ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700";

  return (
    <AppShell>
      <div className="p-6 md:p-8 max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-black">Analyse détaillée</h1>
          <p className="text-gray-500 text-sm mt-1">Étape {step + 1} sur 3</p>
        </div>

        <div className="h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
          <div className="h-full bg-[#BF00FF] rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-center text-xs text-gray-400 mb-6">{progress}%</p>

        <h2 className="text-lg font-black text-black mb-4 flex items-center gap-2">
          {step === 0 && <><Star className="w-5 h-5 text-green-500" /> {TITLES[0]}</>}
          {step === 1 && <><AlertCircle className="w-5 h-5 text-red-500" /> {TITLES[1]}</>}
          {step === 2 && <><Rocket className="w-5 h-5 text-[#BF00FF]" /> {TITLES[2]}</>}
        </h2>

        {step === 1 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800 mb-4 flex gap-2">
            <span>⚠️</span>
            <span>Ces suggestions sont générées par IA — prenez ce qui vous semble pertinent. L&apos;IA peut se tromper. Votre jugement prime.</span>
          </div>
        )}

        <div className="space-y-4">
          {step === 0 && cv.strengths.map(item => (
            <div key={item.title} className="bg-white rounded-xl border border-green-200 border-l-4 border-l-green-500 p-5">
              <p className="font-bold text-black flex items-center gap-2">✓ {item.title}</p>
              <p className="text-sm text-gray-600 mt-2">{item.text}</p>
            </div>
          ))}
          {step === 1 && cv.improvements.map(item => (
            <div key={item.title} className="bg-white rounded-xl border border-red-200 border-l-4 border-l-red-400 p-5">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${severityColor(item.severity)}`}>{item.severity}</span>
                <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{item.section}</span>
                {item.points && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">+{item.points} pts</span>}
              </div>
              <p className="font-bold text-black">{item.title}</p>
              <p className="text-sm text-gray-600 mt-2">{item.text}</p>
              {item.before && (
                <div className="mt-3 bg-gray-50 rounded-lg p-3 text-xs space-y-2">
                  <p><span className="font-bold text-gray-400">AVANT :</span> {item.before}</p>
                  <p><span className="font-bold text-green-600">APRÈS :</span> {item.after}</p>
                </div>
              )}
            </div>
          ))}
          {step === 2 && cv.corrections.map(item => (
            <div key={item.title} className="bg-white rounded-xl border border-[#BF00FF]/30 border-l-4 border-l-[#BF00FF] p-5">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${severityColor(item.severity)}`}>{item.severity}</span>
                <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">{item.section}</span>
                {item.points && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">+{item.points} pts</span>}
              </div>
              <p className="font-bold text-black">{item.title}</p>
              <p className="text-sm text-gray-600 mt-2">{item.text}</p>
              {item.before && (
                <div className="mt-3 bg-gray-50 rounded-lg p-3 text-xs space-y-2">
                  <p><span className="font-bold text-gray-400">AVANT :</span> {item.before}</p>
                  <p><span className="font-bold text-green-600">APRÈS :</span> {item.after}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button type="button" onClick={() => step > 0 ? setStep(step - 1) : router.push("/profile/results")}
            className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-semibold">Précédent</button>
          {step < 2 ? (
            <button type="button" onClick={() => setStep(step + 1)}
              className="flex-1 px-6 py-3 bg-[#BF00FF] text-white rounded-xl text-sm font-bold">Suivant →</button>
          ) : (
            <>
              <button type="button" onClick={() => router.push("/profile")}
                className="flex-1 px-4 py-3 bg-green-500 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4" /> Réanalyser mon CV
              </button>
              <Link href="/prospects"
                className="flex-1 px-4 py-3 bg-[#BF00FF] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2">
                <Briefcase className="w-4 h-4" /> Trouver des entreprises
              </Link>
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}
