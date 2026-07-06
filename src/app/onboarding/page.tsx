"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { brand } from "@/lib/brand";
import {
  OnboardingType, profileToType, onboardingIntro, jobQuestion, jobPlaceholder,
  durationOptions, sectors, salaryOptions, startOptions, sizeOptions,
} from "@/lib/onboarding";
import { saveSettings } from "@/lib/store";
import { ChevronLeft, ArrowRight } from "lucide-react";

const STEPS = ["intro", "job", "duration", "sectors", "location", "salary", "start", "size", "analyzing", "stats", "done"] as const;

function OnboardingWizard() {
  const router = useRouter();
  const params = useSearchParams();
  const type = (params.get("type") as OnboardingType) || "stage";
  const intro = onboardingIntro[type] || onboardingIntro.stage;

  const [step, setStep] = useState(0);
  const [job, setJob] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [salary, setSalary] = useState("");
  const [start, setStart] = useState("");
  const [size, setSize] = useState("");
  const [progress, setProgress] = useState(0);

  const current = STEPS[step];
  const questionSteps = STEPS.indexOf("analyzing");
  const pct = step < questionSteps ? Math.round(((step) / (questionSteps - 1)) * 100) : 100;

  useEffect(() => {
    if (current === "analyzing") {
      let p = 0;
      const t = setInterval(() => {
        p += 8;
        setProgress(p);
        if (p >= 100) { clearInterval(t); setTimeout(() => setStep(s => s + 1), 500); }
      }, 200);
      return () => clearInterval(t);
    }
  }, [current]);

  const next = () => {
    if (current === "size") {
      saveSettings({
        searchCriteria: { job, city, zip, radius: "30", experience: "" },
        newsletter: true,
      });
    }
    if (step < STEPS.length - 1) setStep(step + 1);
    else router.push("/inscription");
  };

  const back = () => step > 0 ? setStep(step - 1) : router.push("/");

  const toggleSector = (s: string) => {
    setSelectedSectors(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex flex-col">
      <div className="p-4 flex items-center justify-between max-w-2xl mx-auto w-full">
        <button onClick={back} className="flex items-center gap-1 text-sm text-gray-500 hover:text-black">
          <ChevronLeft className="w-4 h-4" /> Retour
        </button>
        <Logo size="sm" />
        <div className="w-16" />
      </div>

      {step > 0 && step < questionSteps && (
        <div className="max-w-xl mx-auto w-full px-4 mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Question {step} sur {questionSteps - 1}</span>
            <span>{pct}%</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#BF00FF] to-[#14B8A6] rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center px-4 pb-12">
        <div className="max-w-xl w-full">
          {current === "intro" && (
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#BF00FF] to-[#14B8A6] flex items-center justify-center text-4xl mb-6">
                {intro.icon}
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-black">{intro.title}</h1>
              <p className="text-gray-500 mt-4 leading-relaxed">{intro.desc}</p>
              <button onClick={next} className="mt-10 w-full max-w-xs mx-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#BF00FF] to-[#14B8A6] text-white font-bold py-4 rounded-full hover:opacity-90">
                Commencer <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {current === "job" && (
            <div>
              <h2 className="text-2xl font-black text-black text-center">{jobQuestion[type]}</h2>
              <p className="text-sm text-gray-500 text-center mt-3">Veuillez saisir un intitulé clair et précis pour des opportunités pertinentes.</p>
              <input value={job} onChange={e => setJob(e.target.value)} placeholder={jobPlaceholder[type]}
                className="w-full mt-8 border-2 border-[#BF00FF]/30 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[#BF00FF]" />
              <button onClick={next} disabled={!job.trim()}
                className="mt-6 w-full bg-gradient-to-r from-[#BF00FF] to-[#14B8A6] text-white font-bold py-4 rounded-full disabled:opacity-40">
                Continuer →
              </button>
            </div>
          )}

          {current === "duration" && (
            <div>
              <h2 className="text-2xl font-black text-black text-center">
                {type === "stage" ? "Quelle est la durée souhaitée pour votre stage ?" : "Quelle durée de contrat recherchez-vous ?"}
              </h2>
              <div className="grid grid-cols-2 gap-3 mt-8">
                {durationOptions.map(d => (
                  <button key={d} onClick={() => { setDuration(d); setTimeout(next, 200); }}
                    className={`p-4 rounded-2xl border-2 text-left text-sm font-semibold transition-all ${duration === d ? "border-[#BF00FF] bg-[#BF00FF]/5" : "border-gray-200 bg-white hover:border-[#BF00FF]/50"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
          )}

          {current === "sectors" && (
            <div>
              <h2 className="text-2xl font-black text-black text-center">Quels secteurs vous intéressent ?</h2>
              <div className="grid grid-cols-2 gap-2 mt-6 max-h-80 overflow-y-auto">
                {sectors.map(s => (
                  <button key={s.label} onClick={() => toggleSector(s.label)}
                    className={`p-3 rounded-xl border text-left text-xs font-medium flex items-center gap-2 ${selectedSectors.includes(s.label) ? "border-[#BF00FF] bg-[#BF00FF]/5" : "border-gray-200 bg-white"}`}>
                    <span>{s.icon}</span> {s.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={next} className="flex-1 border rounded-full py-3 text-sm font-semibold">Passer</button>
                <button onClick={next} className="flex-1 bg-gradient-to-r from-[#BF00FF] to-[#14B8A6] text-white font-bold py-3 rounded-full">Continuer →</button>
              </div>
            </div>
          )}

          {current === "location" && (
            <div>
              <h2 className="text-2xl font-black text-black text-center">
                {type === "stage" ? "Où souhaitez-vous faire votre stage ?" : "Où souhaitez-vous travailler ?"}
              </h2>
              <p className="text-sm text-gray-500 text-center mt-2">Code postal obligatoire. Ville facultative.</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <div>
                  <label className="text-xs font-semibold text-gray-500">Ville (facultatif)</label>
                  <input value={city} onChange={e => setCity(e.target.value)} placeholder="Ex: Paris, Lyon..."
                    className="w-full mt-1 border rounded-xl px-4 py-3 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500">Code postal *</label>
                  <input value={zip} onChange={e => setZip(e.target.value)} placeholder="Ex: 75001"
                    className="w-full mt-1 border rounded-xl px-4 py-3 text-sm" maxLength={5} />
                </div>
              </div>
              <button onClick={next} disabled={zip.length < 5}
                className="mt-6 w-full bg-gradient-to-r from-[#BF00FF] to-[#14B8A6] text-white font-bold py-4 rounded-full disabled:opacity-40">
                Continuer →
              </button>
            </div>
          )}

          {current === "salary" && (
            <div>
              <h2 className="text-2xl font-black text-black text-center">Quelle est votre préférence concernant la rémunération ?</h2>
              <div className="space-y-3 mt-8">
                {salaryOptions.map(s => (
                  <button key={s.label} onClick={() => { setSalary(s.label); setTimeout(next, 200); }}
                    className={`w-full p-4 rounded-2xl border-2 text-left ${salary === s.label ? "border-[#BF00FF] bg-[#BF00FF]/5" : "border-gray-200 bg-white"}`}>
                    <p className="font-semibold text-sm">{s.label}</p>
                    <p className="text-xs text-gray-400">{s.sub}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {current === "start" && (
            <div>
              <h2 className="text-2xl font-black text-black text-center">Quand souhaitez-vous commencer ?</h2>
              <div className="grid grid-cols-2 gap-3 mt-8">
                {startOptions.map(s => (
                  <button key={s} onClick={() => { setStart(s); setTimeout(next, 200); }}
                    className={`p-4 rounded-2xl border-2 text-sm font-semibold ${start === s ? "border-[#BF00FF] bg-[#BF00FF]/5" : "border-gray-200 bg-white"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {current === "size" && (
            <div>
              <h2 className="text-2xl font-black text-black text-center">Quelle taille d&apos;entreprise préférez-vous ?</h2>
              <div className="space-y-3 mt-8">
                {sizeOptions.map(s => (
                  <button key={s} onClick={() => { setSize(s); setTimeout(next, 200); }}
                    className={`w-full p-4 rounded-2xl border-2 text-sm font-semibold text-left ${size === s ? "border-[#BF00FF] bg-[#BF00FF]/5" : "border-gray-200 bg-white"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {current === "analyzing" && (
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-[#BF00FF] border-t-transparent rounded-full animate-spin mx-auto" />
              <h2 className="text-2xl font-black text-black mt-8">Analyse de vos informations</h2>
              <p className="text-gray-500 mt-2">Nous personnalisons votre expérience en fonction de vos réponses...</p>
              <div className="h-2 bg-gray-200 rounded-full mt-8 max-w-xs mx-auto overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#BF00FF] to-[#14B8A6] rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-[#BF00FF] font-bold mt-2">{progress}%</p>
            </div>
          )}

          {current === "stats" && (
            <div className="text-center">
              <h2 className="text-2xl font-black text-black">Au cours des 3 derniers jours :</h2>
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <p className="text-4xl font-black text-[#BF00FF]">287</p>
                  <p className="text-sm text-gray-600 mt-2">personnes ont reçu des invitations à des entretiens</p>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <p className="text-4xl font-black text-[#BF00FF]">18</p>
                  <p className="text-sm text-gray-600 mt-2">personnes ont trouvé un emploi</p>
                </div>
              </div>
              <button onClick={next} className="mt-8 w-full bg-gradient-to-r from-[#BF00FF] to-[#14B8A6] text-white font-bold py-4 rounded-full">
                Continuer →
              </button>
            </div>
          )}

          {current === "done" && (
            <div className="text-center">
              <h2 className="text-2xl font-black text-black">Boostez votre carrière avec le matching d&apos;emploi IA</h2>
              <p className="text-gray-500 mt-4">+14 200 utilisateurs ont rejoint {brand.name} pour accélérer leur recherche.</p>
              <Link href="/inscription" className="mt-8 inline-flex w-full max-w-sm items-center justify-center gap-2 bg-gradient-to-r from-[#BF00FF] to-[#14B8A6] text-white font-bold py-4 rounded-full">
                Tester {brand.name} gratuitement <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>

      <p className="text-center text-[10px] text-gray-400 pb-6 px-4">
        {brand.name} utilise vos réponses pour personnaliser votre expérience et maximiser vos résultats.
      </p>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <OnboardingWizard />
    </Suspense>
  );
}
