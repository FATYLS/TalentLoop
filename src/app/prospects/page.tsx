"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { searchProspects, addProspect, getProspects, getSettings } from "@/lib/store";
import { Prospect } from "@/lib/types";
import { Search, MapPin, Building2, ChevronDown, Plus, Users, Mail } from "lucide-react";

export default function ProspectsPage() {
  const [query, setQuery] = useState("développeur web");
  const [ville, setVille] = useState("Paris");
  const [rayon, setRayon] = useState(30);
  const [results, setResults] = useState<Prospect[]>([]);
  const [searched, setSearched] = useState(false);
  const [added, setAdded] = useState<string[]>([]);
  const [sizes, setSizes] = useState({ small: true, medium: true, large: true });

  useEffect(() => {
    const c = getSettings().searchCriteria;
    if (c.job) setQuery(c.job);
    if (c.city) setVille(c.city);
    setAdded(getProspects().map(p => p.id));
    const r = searchProspects(c.job || "développeur web", c.city || "Paris", { small: true, medium: true, large: true }, 30);
    setResults(r.length ? r : searchProspects("", "", { small: true, medium: true, large: true }));
    setSearched(true);
  }, []);

  const runSearch = () => {
    const r = searchProspects(query, ville, sizes, rayon);
    setResults(r.length ? r : searchProspects("", "", { small: true, medium: true, large: true }));
    setSearched(true);
  };

  const handleAdd = (p: Prospect) => {
    addProspect(p);
    setAdded(prev => [...prev, p.id]);
  };

  return (
    <AppShell>
      <div className="p-6 md:p-8 max-w-5xl mx-auto">
        <div className="flex justify-end mb-4">
          <Link href="/parametres" className="text-xs text-[#BF00FF] font-medium">Modifier mes critères de recherche enregistrés</Link>
        </div>

        <div className="text-center mb-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Comment ça marche</p>
          <div className="flex flex-wrap justify-center items-center gap-2 mt-2 text-xs text-gray-500">
            <span className="font-semibold text-[#BF00FF]">1. Recherchez vos cibles</span><span>→</span>
            <span>2. Sélectionnez les entreprises qui vous intéressent</span><span>→</span>
            <span>3. Ma Sélection</span>
          </div>
          <button className="mt-3 text-xs text-gray-500 border border-gray-200 rounded-full px-4 py-1.5 flex items-center gap-1 mx-auto">
            Regarder le tutoriel <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="grid md:grid-cols-4 gap-3">
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-gray-500">Secteur, Poste ou Entreprise</label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && runSearch()}
                  placeholder="Ex. développeur web, marketing..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#BF00FF]" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500">Ville ou Code Postal</label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input value={ville} onChange={e => setVille(e.target.value)} onKeyDown={e => e.key === "Enter" && runSearch()}
                  placeholder="Ex. Paris, Lyon, 75001..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#BF00FF]" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500">Rayon : +{rayon}km</label>
              <input type="range" min={0} max={100} value={rayon} onChange={e => setRayon(+e.target.value)} className="w-full mt-3 accent-[#BF00FF]" />
            </div>
          </div>
          <button onClick={runSearch}
            className="w-full mt-4 bg-[#BF00FF] hover:bg-[#9900CC] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
            <Search className="w-4 h-4" /> Rechercher
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 items-center text-xs">
          <span className="font-semibold text-gray-500">Taille :</span>
          {[["small", "Très petite entreprise"], ["medium", "Petite et moyenne entreprise"], ["large", "Grande entreprise"]].map(([k, l]) => (
            <label key={k} className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={sizes[k as keyof typeof sizes]}
                onChange={e => setSizes({ ...sizes, [k]: e.target.checked })} className="accent-[#BF00FF]" />{l}
            </label>
          ))}
          <button onClick={() => { setQuery(""); setVille(""); setSizes({ small: true, medium: true, large: true }); }}
            className="ml-auto text-gray-400 hover:text-[#BF00FF]">Effacer</button>
        </div>

        {searched && (
          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-4">
              <strong className="text-black">{results.length}</strong> entreprises trouvées dans un rayon de {rayon}km ·{" "}
              <Link href="/prospects/panier" className="text-[#BF00FF] font-semibold">Ma Sélection ({added.length})</Link>
            </p>
            <p className="text-[10px] text-gray-400 mb-3 bg-yellow-50 border border-yellow-100 rounded-lg px-3 py-2">
              Mode démo — entreprises fictives pour tester. En production, connexion API Sirene / LinkedIn / offres d&apos;emploi.
            </p>
            <div className="space-y-2">
              {results.map(p => (
                <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between hover:border-[#BF00FF]/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#BF00FF]/20 to-[#BF00FF]/5 rounded-xl flex items-center justify-center font-bold text-sm text-[#BF00FF]">{p.name[0]}</div>
                    <div>
                      <p className="font-semibold text-sm">{p.name}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
                        <Building2 className="w-3 h-3" />{p.sector} · {p.city} · {p.size}
                      </p>
                      {p.employees && <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5"><Users className="w-3 h-3" />{p.employees}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.email && <span className="hidden sm:flex text-[10px] text-gray-400 items-center gap-1"><Mail className="w-3 h-3" />{p.status === "enriched" ? "Email trouvé" : ""}</span>}
                    {added.includes(p.id) ? (
                      <span className="text-xs text-[#BF00FF] font-semibold bg-[#BF00FF]/10 px-3 py-1.5 rounded-lg">Ajouté ✓</span>
                    ) : (
                      <button onClick={() => handleAdd(p)} className="flex items-center gap-1 text-xs font-semibold text-white bg-[#BF00FF] px-3 py-1.5 rounded-lg hover:bg-[#9900CC]">
                        <Plus className="w-3 h-3" /> Ajouter
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
