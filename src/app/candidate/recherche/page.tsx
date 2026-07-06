"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Search, MapPin, Loader2, Link2, Send, FileText, Sparkles,
  CheckCircle2, Building2, ArrowRight, Mic,
} from "lucide-react";
import { MOCK_JOB_OFFERS, JobOffer, parseJobFromUrl } from "@/lib/mock-jobs";
import { searchProspects } from "@/lib/store";
import { generateCoverLetter, generateCVAdaptations, getAdaptedSummary } from "@/lib/ai-simulator";
import { addCustomJob, getCustomJobs, getRecruiterJobs, saveApplication, getApplications } from "@/lib/candidate-store";
import { DEMO_CV_PROFILE } from "@/lib/cv-demo";

type Tab = "spontanee" | "offre";

export default function RecherchePage() {
  const [tab, setTab] = useState<Tab>("offre");
  const [jobTitle, setJobTitle] = useState("");
  const [city, setCity] = useState("");
  const [radius, setRadius] = useState(30);
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchProspects>>([]);
  const [searched, setSearched] = useState(false);

  const [jobs, setJobs] = useState<JobOffer[]>(MOCK_JOB_OFFERS);
  const [selectedJob, setSelectedJob] = useState<JobOffer | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [urlLoading, setUrlLoading] = useState(false);

  const [applying, setApplying] = useState(false);
  const [letter, setLetter] = useState("");
  const [adaptations, setAdaptations] = useState<ReturnType<typeof generateCVAdaptations>>([]);
  const [adaptedSummary, setAdaptedSummary] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [applications, setApplications] = useState<ReturnType<typeof getApplications>>([]);
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const refreshJobs = useCallback(() => {
    const custom = getCustomJobs();
    const recruiter = getRecruiterJobs();
    const all = [...recruiter, ...custom, ...MOCK_JOB_OFFERS];
    const unique = all.filter((j, i, arr) => arr.findIndex(x => x.id === j.id) === i);
    setJobs(unique);
  }, []);

  useEffect(() => {
    refreshJobs();
    setApplications(getApplications());
  }, [refreshJobs]);

  useEffect(() => {
    if (showResult && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [showResult]);

  const handleSpontaneeSearch = () => {
    const results = searchProspects(jobTitle, city, { small: true, medium: true, large: true }, radius);
    setSearchResults(results);
    setSearched(true);
  };

  const handleUrlImport = async () => {
    if (!urlInput.trim()) return;
    setUrlLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    const job = parseJobFromUrl(urlInput.trim());
    addCustomJob(job);
    refreshJobs();
    setSelectedJob(job);
    setUrlLoading(false);
    setUrlInput("");
  };

  const handleCandidater = async (job: JobOffer) => {
    setSelectedJob(job);
    setApplyingJobId(job.id);
    setApplying(true);
    setShowResult(false);
    try {
      await new Promise(r => setTimeout(r, 1200));
      const generatedLetter = generateCoverLetter(job);
      const cvAdapt = generateCVAdaptations(job);
      const summary = getAdaptedSummary(job);
      setLetter(generatedLetter);
      setAdaptations(cvAdapt);
      setAdaptedSummary(summary);
      saveApplication({
        id: `app-${Date.now()}`,
        jobId: job.id,
        job,
        letter: generatedLetter,
        appliedAt: new Date().toISOString(),
        status: "generated",
      });
      setApplications(getApplications());
      setShowResult(true);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la génération. Réessayez.");
    } finally {
      setApplying(false);
      setApplyingJobId(null);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-black">Campagne de candidatures</h1>
        <p className="text-gray-500 mt-1 text-sm">Ciblez des entreprises ou répondez à une offre — l&apos;IA génère lettre et CV adaptés en temps réel.</p>
      </div>

      <div className="flex gap-2 mb-8 bg-white rounded-2xl p-1.5 border border-gray-100 w-fit">
        {([
          { id: "spontanee" as Tab, label: "Candidature spontanée", icon: MapPin },
          { id: "offre" as Tab, label: "Répondre à une offre", icon: FileText },
        ]).map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setShowResult(false); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              tab === t.id ? "bg-[#BF00FF] text-white shadow-md" : "text-gray-500 hover:text-black"
            }`}>
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      {applying && (
        <div className="mb-6 flex items-center gap-3 bg-[#BF00FF]/10 border border-[#BF00FF]/30 rounded-2xl px-5 py-4">
          <Loader2 className="w-5 h-5 text-[#BF00FF] animate-spin flex-shrink-0" />
          <div>
            <p className="font-bold text-black text-sm">Génération IA en cours...</p>
            <p className="text-xs text-gray-500">Lettre personnalisée + CV adapté pour {selectedJob?.company}</p>
          </div>
        </div>
      )}

      {showResult && selectedJob && (
        <div ref={resultRef} className="mb-8 space-y-6 scroll-mt-8">
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-5 py-4">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-black text-green-800">Candidature générée pour {selectedJob.title} — {selectedJob.company}</p>
              <p className="text-sm text-green-700">Lettre et CV adaptés par l&apos;IA en temps réel</p>
            </div>
            <Link href="/candidate/entretien"
              className="ml-auto flex items-center gap-2 text-sm font-bold text-[#BF00FF] whitespace-nowrap hover:underline">
              Préparer l&apos;entretien <Mic className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-[#BF00FF]" />
                <h3 className="font-black text-black">Lettre de motivation générée</h3>
                <span className="ml-auto text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">0% générique</span>
              </div>
              <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line max-h-96 overflow-y-auto border-l-2 border-[#BF00FF] pl-4">
                {letter}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#BF00FF]" />
                <h3 className="font-black text-black">CV adapté par l&apos;IA</h3>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 bg-[#fafafa] text-xs">
                <p className="font-black text-base text-black">{DEMO_CV_PROFILE.firstName} {DEMO_CV_PROFILE.lastName}</p>
                <p className="text-gray-400">{DEMO_CV_PROFILE.city}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {adaptations.map(a => (
                    <span key={a.label} className="flex items-center gap-1 text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> {a.label}
                    </span>
                  ))}
                </div>
                <p className="text-[9px] font-bold text-gray-400 uppercase mt-4 tracking-widest">Summary (adapté)</p>
                <p className="text-gray-600 mt-1 leading-relaxed">{adaptedSummary}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase mt-3 tracking-widest">Compétences ciblées</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedJob.skills.map(s => (
                    <span key={s} className="bg-[#BF00FF]/10 text-[#BF00FF] px-2 py-0.5 rounded text-[10px] font-semibold">{s}</span>
                  ))}
                </div>
              </div>
              <div className="mt-3 space-y-2">
                {adaptations.map(a => (
                  <div key={a.label} className="flex items-start gap-2 text-xs text-gray-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-gray-700">{a.label}</strong> — {a.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "spontanee" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-black text-lg text-black">Recherche par rayon (km)</h2>
            <p className="text-sm text-gray-500 mt-1">Poste + ville + rayon pour cibler les entreprises qui recrutent.</p>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div>
                <label className="text-xs font-semibold text-gray-500">Poste recherché</label>
                <input value={jobTitle} onChange={e => setJobTitle(e.target.value)}
                  placeholder="Ex: Développeur Full Stack"
                  className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#BF00FF]" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">Ville ou code postal</label>
                <input value={city} onChange={e => setCity(e.target.value)}
                  placeholder="Ex: Lyon, 69000"
                  className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#BF00FF]" />
              </div>
            </div>
            <div className="mt-5">
              <label className="text-xs font-semibold text-gray-500">Rayon : <span className="text-[#BF00FF] font-black">{radius} km</span></label>
              <input type="range" min={5} max={100} step={5} value={radius}
                onChange={e => setRadius(Number(e.target.value))}
                className="w-full mt-2 accent-[#BF00FF]" />
            </div>
            <button onClick={handleSpontaneeSearch}
              className="mt-6 flex items-center gap-2 bg-gradient-to-r from-[#BF00FF] to-[#9900CC] text-white font-bold px-6 py-3 rounded-full hover:opacity-90">
              <Search className="w-4 h-4" /> Rechercher des entreprises
            </button>
          </div>

          {searched && (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <p className="font-black text-black">{searchResults.length} entreprises trouvées</p>
                <span className="text-xs text-gray-400">Rayon {radius} km · {city || "France"}</span>
              </div>
              <div className="divide-y divide-gray-50">
                {searchResults.slice(0, 8).map(p => (
                  <div key={p.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#BF00FF]/10 flex items-center justify-center text-[#BF00FF] font-black text-sm">
                        {p.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-black">{p.name}</p>
                        <p className="text-xs text-gray-400">{p.sector} · {p.city} · {p.size}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCandidater({
                        id: `spont-${p.id}-${Date.now()}`,
                        title: jobTitle || "Candidature spontanée",
                        company: p.name,
                        city: p.city,
                        contract: "CDI",
                        description: `Candidature spontanée pour un poste de ${jobTitle || "collaborateur"} au sein de ${p.name}, entreprise du secteur ${p.sector}.`,
                        skills: jobTitle ? jobTitle.split(/\s+/).filter(Boolean) : ["Motivation", "Adaptabilité", "Esprit d'équipe"],
                        postedAt: new Date().toISOString().split("T")[0],
                      })}
                      disabled={applying}
                      className="text-xs font-bold text-[#BF00FF] border border-[#BF00FF]/30 px-4 py-2 rounded-full hover:bg-[#BF00FF] hover:text-white transition-all disabled:opacity-50 min-w-[100px]">
                      {applying && selectedJob?.company === p.name
                        ? <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                        : "Candidater"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "offre" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-black text-lg text-black flex items-center gap-2">
              <Link2 className="w-5 h-5 text-[#BF00FF]" /> Importer une offre par URL
            </h2>
            <p className="text-sm text-gray-500 mt-1">Collez un lien LinkedIn, Indeed ou site carrière — l&apos;IA analyse et génère l&apos;offre.</p>
            <div className="flex gap-3 mt-4">
              <input value={urlInput} onChange={e => setUrlInput(e.target.value)}
                placeholder="https://www.linkedin.com/jobs/view/..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#BF00FF]" />
              <button onClick={handleUrlImport} disabled={urlLoading || !urlInput.trim()}
                className="flex items-center gap-2 bg-black text-white font-bold px-5 py-3 rounded-xl disabled:opacity-40 whitespace-nowrap">
                {urlLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyse...</> : "Importer"}
              </button>
            </div>
          </div>

          <div>
            <h2 className="font-black text-lg text-black mb-4">Offres disponibles ({jobs.length})</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {jobs.map(job => (
                <div key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`bg-white rounded-2xl border-2 p-5 cursor-pointer transition-all card-lift ${
                    selectedJob?.id === job.id ? "border-[#BF00FF] shadow-lg shadow-[#BF00FF]/10" : "border-gray-100 hover:border-[#BF00FF]/40"
                  }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-black text-black">{job.title}</p>
                      <p className="text-sm text-[#BF00FF] font-semibold mt-0.5">{job.company}</p>
                    </div>
                    <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{job.contract}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {job.city} {job.salary && `· ${job.salary}`}
                  </p>
                  <p className="text-xs text-gray-500 mt-3 line-clamp-2 leading-relaxed">{job.description}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {job.skills.slice(0, 4).map(s => (
                      <span key={s} className="text-[9px] bg-[#BF00FF]/10 text-[#BF00FF] px-2 py-0.5 rounded-full font-semibold">{s}</span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); handleCandidater(job); }}
                    disabled={applying}
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#BF00FF] to-[#14B8A6] text-white font-bold py-3 rounded-xl hover:opacity-90 disabled:opacity-50">
                    {applying && applyingJobId === job.id
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> Génération IA...</>
                      : <><Send className="w-4 h-4" /> Candidater avec l&apos;IA</>}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {applications.length > 0 && (
        <div className="mt-10 bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-black text-black flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#BF00FF]" /> Mes candidatures ({applications.length})
          </h3>
          <div className="mt-4 space-y-2">
            {applications.slice(0, 5).map(app => (
              <div key={app.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-bold text-black">{app.job.title} — {app.job.company}</p>
                  <p className="text-xs text-gray-400">{new Date(app.appliedAt).toLocaleString("fr-FR")}</p>
                </div>
                <Link href="/candidate/entretien" className="text-xs font-bold text-[#BF00FF] flex items-center gap-1">
                  Entretien IA <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
