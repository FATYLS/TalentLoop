"use client";
import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { deductCredits, setCV } from "@/lib/store";
import { buildDemoCV } from "@/lib/cv-demo";
import { Upload, ChevronDown, FileText, X } from "lucide-react";

const CONTRACTS = ["Stage", "Alternance", "CDI", "CDD", "Freelance"];
const ANALYSIS_COST = 108;

export default function ProfilePage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [job, setJob] = useState("Développeur Web");
  const [contract, setContract] = useState("CDI");
  const [showContracts, setShowContracts] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const pickFile = (f: File) => {
    const ok = ["application/pdf", "image/jpeg", "image/png", "image/jpg"].includes(f.type) || f.name.endsWith(".pdf");
    if (!ok) { alert("Format non supporté. Utilisez PDF, JPG ou PNG."); return; }
    if (f.size > 5 * 1024 * 1024) { alert("Fichier trop volumineux (max 5 Mo)."); return; }
    setFile(f);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) pickFile(f);
  }, []);

  const formatSize = (n: number) => n < 1024 * 1024 ? `${(n / 1024).toFixed(2)} KB` : `${(n / 1024 / 1024).toFixed(2)} MB`;

  const analyze = () => {
    if (!job.trim()) { alert("Indiquez l'intitulé du poste recherché."); return; }
    if (!file) { alert("Sélectionnez un fichier CV."); return; }
    if (!consent) { alert("Acceptez le traitement de vos données pour continuer."); return; }
    if (!deductCredits(ANALYSIS_COST)) { alert("Crédits insuffisants. Il vous faut 108 crédits."); return; }
    setAnalyzing(true);
    setTimeout(() => {
      setCV(buildDemoCV(job, contract, file.name, formatSize(file.size)));
      setAnalyzing(false);
      router.push("/profile/verification");
    }, 2000);
  };

  return (
    <AppShell>
      <div className="p-6 md:p-8 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-black">Analysez votre CV</h1>
          <p className="text-gray-500 mt-2">Obtenez un score sur 100, des suggestions de corrections et découvrez vos vrais débouchés.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
          <h2 className="font-black text-black">Upload de votre CV</h2>
          <p className="text-sm text-gray-500 mt-1">Uploadez votre CV pour une analyse automatique par IA</p>

          <div className="mt-6 bg-[#BF00FF]/5 border border-[#BF00FF]/20 rounded-xl p-5">
            <p className="text-sm text-gray-600">L&apos;IA évaluera votre CV en fonction de ce poste pour des conseils personnalisés.</p>
            <div className="mt-4">
              <label className="text-sm font-semibold text-black">Intitulé du poste *</label>
              <input value={job} onChange={e => setJob(e.target.value)} placeholder="Ex: Développeur Web Full-Stack, Chef de projet..."
                className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#BF00FF]" />
            </div>
            <div className="mt-4 relative">
              <label className="text-sm font-semibold text-black">Type de contrat</label>
              <button type="button" onClick={() => setShowContracts(!showContracts)}
                className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm text-left flex justify-between items-center focus:outline-none focus:border-[#BF00FF]">
                {contract} <ChevronDown className="w-4 h-4" />
              </button>
              {showContracts && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
                  {CONTRACTS.map(c => (
                    <button key={c} type="button" onClick={() => { setContract(c); setShowContracts(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#BF00FF]/5 ${contract === c ? "text-[#BF00FF] font-semibold" : ""}`}>
                      {c} {contract === c && "✓"}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) pickFile(f); }} />

          {!file ? (
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => fileRef.current?.click()}
              className={`mt-6 border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                dragOver ? "border-[#BF00FF] bg-[#BF00FF]/10" : "border-gray-200 hover:border-[#BF00FF] hover:bg-[#BF00FF]/5"
              }`}>
              <Upload className="w-10 h-10 text-gray-300 mx-auto" />
              <p className="font-semibold text-black mt-4">Glissez-déposez votre CV ici ou parcourir</p>
              <p className="text-xs text-gray-400 mt-2">Formats acceptés : PDF, JPG, PNG (Max 5 MB)</p>
              <span className="inline-block mt-4 px-6 py-2.5 bg-gray-100 hover:bg-[#BF00FF]/10 text-sm font-semibold rounded-xl">
                Parcourir les fichiers
              </span>
            </div>
          ) : (
            <div className="mt-6 border border-gray-200 rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#BF00FF]/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#BF00FF]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{file.name}</p>
                <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
              </div>
              <button type="button" onClick={() => fileRef.current?.click()} className="text-xs text-[#BF00FF] font-semibold">Changer</button>
              <button type="button" onClick={() => setFile(null)} className="p-1 hover:bg-gray-100 rounded"><X className="w-4 h-4 text-gray-400" /></button>
            </div>
          )}

          <label className="flex items-start gap-3 mt-6 cursor-pointer">
            <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1 accent-[#BF00FF]" />
            <span className="text-xs text-gray-500">
              J&apos;accepte que mes données personnelles (CV) soient traitées par TalentLoop pour l&apos;analyse et la génération de candidatures. En cochant cette case, vous acceptez notre Politique de confidentialité.
            </span>
          </label>

          <button type="button" onClick={analyze} disabled={analyzing}
            className="w-full mt-6 bg-gradient-to-r from-[#BF00FF] to-[#9900CC] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 hover:opacity-90 transition-opacity">
            {analyzing ? (
              <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Analyse en cours...</>
            ) : (
              <>✓ Analyser le CV · {ANALYSIS_COST} crédits</>
            )}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
