"use client";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { getUser, getSettings, saveSettings } from "@/lib/store";
import { SearchCriteria } from "@/lib/types";
import { Search, Mail, Download, AlertTriangle, Save } from "lucide-react";
import { brand } from "@/lib/brand";

export default function ParametresPage() {
  const [user, setUser] = useState(getUser());
  const [newsletter, setNewsletter] = useState(getSettings().newsletter);
  const [criteria, setCriteria] = useState<SearchCriteria>(getSettings().searchCriteria);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setUser(getUser()); }, []);

  const saveCriteria = () => {
    saveSettings({ searchCriteria: criteria, newsletter });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const exportData = () => {
    const data = localStorage.getItem("talentloop_data") || localStorage.getItem("dcstart_data") || "{}";
    const blob = new Blob([data], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "talentloop-donnees.json";
    a.click();
  };

  return (
    <AppShell>
      <div className="p-6 md:p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-black text-black">Paramètres</h1>
        <p className="text-gray-500 text-sm mt-1">Gérez vos préférences, votre sécurité et vos données personnelles.</p>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mt-8">
          <div className="flex items-center gap-2 mb-2">
            <Search className="w-5 h-5 text-[#BF00FF]" />
            <h2 className="font-black text-black">Mes critères de recherche</h2>
          </div>
          <p className="text-xs text-gray-500 mb-4">Ces critères pilotent les pré-sélections d&apos;entreprises et les recommandations de l&apos;outil.</p>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500">Poste recherché</label>
              <input value={criteria.job} onChange={e => setCriteria({ ...criteria, job: e.target.value })}
                placeholder="Ex : Développeur Python, Data analyst..."
                className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BF00FF]" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500">Ville</label>
                <input value={criteria.city} onChange={e => setCriteria({ ...criteria, city: e.target.value })}
                  placeholder="Ex : Paris" className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">Code postal</label>
                <input value={criteria.zip} onChange={e => setCriteria({ ...criteria, zip: e.target.value })}
                  placeholder="Ex : 75001" className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500">Rayon de mobilité</label>
                <select value={criteria.radius} onChange={e => setCriteria({ ...criteria, radius: e.target.value })}
                  className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm">
                  <option value="">Non précisé</option>
                  <option value="10">10 km</option>
                  <option value="30">30 km</option>
                  <option value="50">50 km</option>
                  <option value="100">100 km</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">Niveau d&apos;expérience</label>
                <select value={criteria.experience} onChange={e => setCriteria({ ...criteria, experience: e.target.value })}
                  className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm">
                  <option value="">Non précisé</option>
                  <option value="junior">Junior</option>
                  <option value="mid">Confirmé</option>
                  <option value="senior">Senior</option>
                </select>
              </div>
            </div>
          </div>
          <button onClick={saveCriteria}
            className="mt-4 ml-auto flex items-center gap-2 bg-[#BF00FF]/10 text-[#BF00FF] font-semibold px-4 py-2 rounded-xl text-sm hover:bg-[#BF00FF]/20">
            <Save className="w-4 h-4" /> {saved ? "Enregistré ✓" : "Enregistrer mes critères"}
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mt-4">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-[#BF00FF]" />
            <h2 className="font-black text-black">Préférences email</h2>
          </div>
          <p className="text-xs text-gray-500 mb-4">Les emails transactionnels (factures, sécurité) sont toujours envoyés.</p>
          <label className="flex items-center justify-between p-4 border rounded-xl cursor-pointer">
            <div>
              <p className="text-sm font-semibold">Promos, astuces emploi et nouveautés {brand.name}</p>
              <p className="text-xs text-gray-400">Conseils pratiques et offres exclusives</p>
            </div>
            <input type="checkbox" checked={newsletter} onChange={e => setNewsletter(e.target.checked)} className="accent-[#BF00FF] w-5 h-5" />
          </label>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Download className="w-5 h-5 text-[#BF00FF]" />
            <h2 className="font-black text-black">Export des données (Portabilité)</h2>
          </div>
          <p className="text-xs text-gray-500 mb-4">Conformément au RGPD, téléchargez une copie de vos données personnelles.</p>
          <button onClick={exportData} className="flex items-center gap-2 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-semibold hover:border-[#BF00FF]">
            <Download className="w-4 h-4" /> Télécharger mes données (JSON)
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-red-100 p-6 mt-4">
          <div className="flex items-center gap-2 mb-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="font-black">Zone de danger</h2>
          </div>
          <p className="text-xs text-gray-500 mb-4">Actions irréversibles relatives à la suppression de votre compte.</p>
          <div className="flex justify-between items-center p-4 border border-red-100 rounded-xl">
            <div>
              <p className="text-sm font-semibold">Supprimer mon compte définitivement</p>
              <p className="text-xs text-gray-400">Efface toutes vos données (CV, historique, campagnes)</p>
            </div>
            <button onClick={() => alert("Mode démo — suppression désactivée.")}
              className="bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-600">Supprimer</button>
          </div>
        </div>

        {user && (
          <div className="mt-6 text-center text-xs text-gray-400">
            {user.email} · {user.credits} crédits {brand.name} · Compte {user.provider === "google" ? "Google" : "email"}
          </div>
        )}
      </div>
    </AppShell>
  );
}
