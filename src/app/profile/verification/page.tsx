"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { getCV, setCV } from "@/lib/store";
import { CVData } from "@/lib/types";
import { User, FileText, Briefcase, GraduationCap, Award, Globe, Heart, Plus, Trash2 } from "lucide-react";

const STEPS = [
  { icon: User, label: "Identité" },
  { icon: FileText, label: "Résumé" },
  { icon: Briefcase, label: "Expériences" },
  { icon: GraduationCap, label: "Formations" },
  { icon: Award, label: "Compétences" },
  { icon: Globe, label: "Langues" },
  { icon: Heart, label: "Intérêts" },
];

export default function VerificationPage() {
  const router = useRouter();
  const [cv, setCv] = useState<CVData | null>(null);
  const [step, setStep] = useState(0);
  const [skillInput, setSkillInput] = useState("");
  const [interestInput, setInterestInput] = useState("");

  useEffect(() => {
    const data = getCV();
    if (!data) { router.push("/profile"); return; }
    setCv(data);
  }, [router]);

  if (!cv) return null;

  const progress = Math.round(((step + 1) / STEPS.length) * 100);
  const p = cv.profile;

  const update = (patch: Partial<CVData["profile"]>) => {
    const next = { ...cv, profile: { ...p, ...patch } };
    setCv(next);
    setCV(next);
  };

  const saveAndNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else {
      setCV({ ...cv, verified: true });
      router.push("/profile/results");
    }
  };

  return (
    <AppShell>
      <div className="p-6 md:p-8 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-black">Vérifiez vos informations</h1>
          <p className="text-gray-500 text-sm mt-2">L&apos;IA a extrait ces informations de votre CV. Vérifiez et corrigez si nécessaire.</p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>{step + 1}/{STEPS.length}</span>
            <span>{progress}% complété</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#BF00FF] rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between mt-4 gap-1">
            {STEPS.map((s, i) => (
              <button key={s.label} type="button" onClick={() => setStep(i)}
                className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                  i === step ? "bg-[#BF00FF]/10 border border-[#BF00FF]" : i < step ? "bg-green-50" : "bg-gray-50"
                }`}>
                <s.icon className={`w-4 h-4 ${i === step ? "text-[#BF00FF]" : i < step ? "text-green-600" : "text-gray-400"}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          {step === 0 && (
            <div className="space-y-4">
              <h3 className="font-bold flex items-center gap-2"><User className="w-4 h-4 text-[#BF00FF]" /> Informations personnelles</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-xs font-semibold text-gray-500">Prénom</label>
                  <input value={p.firstName} onChange={e => update({ firstName: e.target.value })} className="w-full mt-1 border rounded-xl px-3 py-2 text-sm" /></div>
                <div><label className="text-xs font-semibold text-gray-500">Nom</label>
                  <input value={p.lastName} onChange={e => update({ lastName: e.target.value })} className="w-full mt-1 border rounded-xl px-3 py-2 text-sm" /></div>
                <div><label className="text-xs font-semibold text-gray-500">Email</label>
                  <input value={p.email} onChange={e => update({ email: e.target.value })} className="w-full mt-1 border rounded-xl px-3 py-2 text-sm" /></div>
                <div><label className="text-xs font-semibold text-gray-500">Téléphone</label>
                  <input value={p.phone} onChange={e => update({ phone: e.target.value })} className="w-full mt-1 border rounded-xl px-3 py-2 text-sm" /></div>
              </div>
            </div>
          )}
          {step === 1 && (
            <div>
              <h3 className="font-bold flex items-center gap-2 mb-4"><FileText className="w-4 h-4 text-[#BF00FF]" /> Résumé professionnel</h3>
              <textarea value={p.summary} onChange={e => update({ summary: e.target.value })} rows={5}
                className="w-full border rounded-xl px-3 py-2 text-sm" />
            </div>
          )}
          {step === 2 && (
            <div>
              <h3 className="font-bold flex items-center gap-2 mb-4"><Briefcase className="w-4 h-4 text-[#BF00FF]" /> Expériences</h3>
              {p.experiences.map((exp, i) => (
                <div key={exp.id} className="border rounded-xl p-4 mb-3">
                  <input value={exp.title} onChange={e => { const ex = [...p.experiences]; ex[i] = { ...exp, title: e.target.value }; update({ experiences: ex }); }}
                    className="w-full font-semibold text-sm border-b pb-2 mb-2" placeholder="Poste" />
                  <input value={exp.company} onChange={e => { const ex = [...p.experiences]; ex[i] = { ...exp, company: e.target.value }; update({ experiences: ex }); }}
                    className="w-full text-sm text-gray-500 mb-2" placeholder="Entreprise" />
                  <textarea value={exp.description} onChange={e => { const ex = [...p.experiences]; ex[i] = { ...exp, description: e.target.value }; update({ experiences: ex }); }}
                    rows={2} className="w-full text-sm border rounded-lg px-2 py-1" />
                </div>
              ))}
            </div>
          )}
          {step === 3 && (
            <div>
              <h3 className="font-bold flex items-center gap-2 mb-4"><GraduationCap className="w-4 h-4 text-[#BF00FF]" /> Formations</h3>
              {p.education.map((edu, i) => (
                <div key={edu.id} className="border rounded-xl p-4 mb-3 relative">
                  <button type="button" onClick={() => update({ education: p.education.filter((_, j) => j !== i) })}
                    className="absolute top-3 right-3 text-red-400"><Trash2 className="w-4 h-4" /></button>
                  <input value={edu.degree} onChange={e => { const ed = [...p.education]; ed[i] = { ...edu, degree: e.target.value }; update({ education: ed }); }}
                    className="w-full font-semibold text-sm mb-2" placeholder="Diplôme *" />
                  <input value={edu.school} onChange={e => { const ed = [...p.education]; ed[i] = { ...edu, school: e.target.value }; update({ education: ed }); }}
                    className="w-full text-sm text-gray-500" placeholder="Établissement *" />
                </div>
              ))}
            </div>
          )}
          {step === 4 && (
            <div>
              <h3 className="font-bold flex items-center gap-2 mb-2"><Award className="w-4 h-4 text-[#BF00FF]" /> Compétences</h3>
              <p className="text-xs text-gray-500 mb-4">Vos compétences techniques et soft skills</p>
              <div className="flex gap-2 mb-4">
                <input value={skillInput} onChange={e => setSkillInput(e.target.value)} placeholder="Ajouter une compétence"
                  className="flex-1 border rounded-xl px-3 py-2 text-sm" onKeyDown={e => {
                    if (e.key === "Enter" && skillInput.trim()) {
                      update({ skills: [...p.skills, skillInput.trim()] });
                      setSkillInput("");
                    }
                  }} />
                <button type="button" onClick={() => { if (skillInput.trim()) { update({ skills: [...p.skills, skillInput.trim()] }); setSkillInput(""); } }}
                  className="px-4 py-2 bg-[#BF00FF] text-white text-sm font-semibold rounded-xl">Ajouter</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.skills.map(s => (
                  <span key={s} className="bg-gray-100 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                    {s} <button type="button" onClick={() => update({ skills: p.skills.filter(x => x !== s) })} className="text-gray-400 hover:text-red-500">×</button>
                  </span>
                ))}
              </div>
            </div>
          )}
          {step === 5 && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold flex items-center gap-2"><Globe className="w-4 h-4 text-[#BF00FF]" /> Langues</h3>
                <button type="button" onClick={() => update({ languages: [...p.languages, { id: Date.now().toString(), name: "", level: "Intermédiaire" }] })}
                  className="text-xs text-[#BF00FF] font-semibold flex items-center gap-1"><Plus className="w-3 h-3" /> Ajouter</button>
              </div>
              {p.languages.map((lang, i) => (
                <div key={lang.id} className="flex gap-3 mb-3 items-end">
                  <div className="flex-1"><label className="text-xs text-gray-500">Langue</label>
                    <input value={lang.name} onChange={e => { const ls = [...p.languages]; ls[i] = { ...lang, name: e.target.value }; update({ languages: ls }); }}
                      className="w-full border rounded-xl px-3 py-2 text-sm mt-1" /></div>
                  <div className="flex-1"><label className="text-xs text-gray-500">Niveau</label>
                    <select value={lang.level} onChange={e => { const ls = [...p.languages]; ls[i] = { ...lang, level: e.target.value }; update({ languages: ls }); }}
                      className="w-full border rounded-xl px-3 py-2 text-sm mt-1">
                      {["Débutant", "Intermédiaire", "Courant", "Natif"].map(l => <option key={l}>{l}</option>)}
                    </select></div>
                  <button type="button" onClick={() => update({ languages: p.languages.filter((_, j) => j !== i) })} className="text-red-400 p-2"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          )}
          {step === 6 && (
            <div>
              <h3 className="font-bold flex items-center gap-2 mb-4"><Heart className="w-4 h-4 text-[#BF00FF]" /> Centres d&apos;intérêt</h3>
              <div className="flex gap-2 mb-4">
                <input value={interestInput} onChange={e => setInterestInput(e.target.value)} placeholder="Ajouter un centre d'intérêt"
                  className="flex-1 border rounded-xl px-3 py-2 text-sm" />
                <button type="button" onClick={() => { if (interestInput.trim()) { update({ interests: [...p.interests, interestInput.trim()] }); setInterestInput(""); } }}
                  className="px-4 py-2 bg-[#BF00FF] text-white text-sm font-semibold rounded-xl">Ajouter</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.interests.map(intr => (
                  <span key={intr} className="bg-[#BF00FF]/10 text-[#BF00FF] text-sm px-4 py-2 rounded-full flex items-center gap-1">
                    {intr} <button type="button" onClick={() => update({ interests: p.interests.filter(x => x !== intr) })}>×</button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6 gap-3">
          <button type="button" onClick={() => step > 0 ? setStep(step - 1) : router.push("/profile")}
            className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-semibold">Précédent</button>
          <button type="button" onClick={saveAndNext}
            className="flex-1 px-6 py-3 bg-[#BF00FF] text-white rounded-xl text-sm font-bold">
            {step < STEPS.length - 1 ? "Suivant →" : "Voir mon analyse et les corrections →"}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
