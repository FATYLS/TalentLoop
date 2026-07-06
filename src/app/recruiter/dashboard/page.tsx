"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Building2, Plus, Briefcase, MapPin, CheckCircle2, ArrowLeft } from "lucide-react";
import { JobOffer } from "@/lib/mock-jobs";
import { addRecruiterJob, getRecruiterJobs } from "@/lib/candidate-store";
import { Logo } from "@/components/ui/Logo";

export default function RecruiterDashboardPage() {
  const [jobs, setJobs] = useState<JobOffer[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "",
    company: "",
    city: "",
    contract: "CDI",
    description: "",
    skills: "",
    salary: "",
  });

  useEffect(() => {
    setJobs(getRecruiterJobs());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const job: JobOffer = {
      id: `recruiter-${Date.now()}`,
      title: form.title,
      company: form.company,
      city: form.city,
      contract: form.contract,
      description: form.description,
      skills: form.skills.split(",").map(s => s.trim()).filter(Boolean),
      salary: form.salary || undefined,
      postedAt: new Date().toISOString().split("T")[0],
      source: "Recruteur TalentLoop",
    };
    addRecruiterJob(job);
    setJobs(getRecruiterJobs());
    setSubmitted(true);
    setShowForm(false);
    setForm({ title: "", company: "", city: "", contract: "CDI", description: "", skills: "", salary: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9]">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo size="sm" />
          <div>
            <p className="text-xs font-bold text-[#BF00FF] uppercase tracking-widest">Espace Recruteur</p>
            <p className="text-sm text-gray-500">Publiez vos offres — visibles côté candidat</p>
          </div>
        </div>
        <Link href="/candidate/recherche"
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#BF00FF]">
          <ArrowLeft className="w-4 h-4" /> Espace candidat
        </Link>
      </header>

      <div className="max-w-4xl mx-auto p-6 md:p-8">
        {submitted && (
          <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-5 py-4">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="font-bold text-green-800">Offre publiée ! Visible immédiatement dans l&apos;espace candidat.</p>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-black">Mes offres d&apos;emploi</h1>
            <p className="text-sm text-gray-500 mt-1">{jobs.length} offre{jobs.length !== 1 ? "s" : ""} publiée{jobs.length !== 1 ? "s" : ""}</p>
          </div>
          <button onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-[#BF00FF] text-white font-bold px-5 py-3 rounded-xl hover:opacity-90">
            <Plus className="w-4 h-4" /> {showForm ? "Annuler" : "Publier une offre"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 space-y-4">
            <h2 className="font-black text-lg text-black flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#BF00FF]" /> Nouvelle offre
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500">Intitulé du poste *</label>
                <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="Ex: Développeur Full Stack"
                  className="w-full mt-1 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#BF00FF]" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">Entreprise *</label>
                <input required value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
                  placeholder="Ex: Ma Startup SAS"
                  className="w-full mt-1 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#BF00FF]" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">Ville *</label>
                <input required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}
                  placeholder="Ex: Paris"
                  className="w-full mt-1 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#BF00FF]" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">Type de contrat</label>
                <select value={form.contract} onChange={e => setForm({ ...form, contract: e.target.value })}
                  className="w-full mt-1 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#BF00FF]">
                  {["CDI", "CDD", "Alternance", "Stage", "Freelance"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500">Description *</label>
              <textarea required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                rows={4} placeholder="Décrivez le poste, les missions et l'environnement..."
                className="w-full mt-1 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#BF00FF] resize-none" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500">Compétences (séparées par des virgules)</label>
                <input value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })}
                  placeholder="React, Node.js, TypeScript"
                  className="w-full mt-1 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#BF00FF]" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">Rémunération</label>
                <input value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })}
                  placeholder="Ex: 38 000 € brut/an"
                  className="w-full mt-1 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#BF00FF]" />
              </div>
            </div>
            <button type="submit"
              className="w-full bg-gradient-to-r from-[#BF00FF] to-[#14B8A6] text-white font-bold py-3 rounded-xl hover:opacity-90">
              Publier l&apos;offre
            </button>
          </form>
        )}

        {jobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
            <Building2 className="w-12 h-12 text-gray-200 mx-auto" />
            <p className="font-bold text-gray-400 mt-4">Aucune offre publiée</p>
            <p className="text-sm text-gray-400 mt-1">Cliquez sur « Publier une offre » pour commencer</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map(job => (
              <div key={job.id} className="bg-white rounded-2xl border border-gray-100 p-5 card-lift">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-black text-black">{job.title}</p>
                    <p className="text-sm text-[#BF00FF] font-semibold">{job.company}</p>
                  </div>
                  <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{job.contract}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {job.city} {job.salary && `· ${job.salary}`}
                </p>
                <p className="text-sm text-gray-500 mt-3 line-clamp-2">{job.description}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {job.skills.map(s => (
                    <span key={s} className="text-[9px] bg-[#BF00FF]/10 text-[#BF00FF] px-2 py-0.5 rounded-full font-semibold">{s}</span>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 mt-3">Publié le {job.postedAt} · Visible côté candidat</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
