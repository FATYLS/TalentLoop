"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { getProspects, removeProspect, importDemoProspects } from "@/lib/store";
import { Prospect } from "@/lib/types";
import { CheckSquare, Upload, ChevronDown, X, Download, FileSpreadsheet } from "lucide-react";

export default function PanierPage() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [csvOpen, setCsvOpen] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setProspects(getProspects()); }, []);

  const refresh = () => setProspects(getProspects());

  const handleImport = () => {
    if (csvFile) {
      const names = ["Orange", "BNP Paribas", "L'Oréal", "Carrefour", "SNCF"];
      importDemoProspects(names);
      refresh();
      setCsvOpen(false);
      setCsvFile(null);
    }
  };

  const downloadTemplate = () => {
    const csv = "Nom,Description,Secteur,Ville,Site Web,Effectif,Emails\nExemple SAS,Description,IT,Paris,exemple.fr,50,rh@exemple.fr";
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "modele-talentloop.csv";
    a.click();
  };

  return (
    <AppShell>
      <div className="p-6 md:p-8 max-w-3xl mx-auto">
        <button className="mb-6 text-xs text-gray-500 border border-gray-200 rounded-full px-4 py-1.5 flex items-center gap-1 mx-auto">
          Regarder le tutoriel pour cette étape <ChevronDown className="w-3 h-3" />
        </button>

        {prospects.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <CheckSquare className="w-16 h-16 text-gray-200 mx-auto" />
            <h2 className="text-xl font-black text-black mt-6">Votre sélection est vide</h2>
            <p className="text-sm text-gray-500 mt-3 max-w-md mx-auto">
              Ajoutez des entreprises depuis la recherche ou importez votre propre liste pour commencer à prospecter.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link href="/prospects" className="bg-[#BF00FF] text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-[#9900CC]">
                Aller à la recherche
              </Link>
              <button onClick={() => setCsvOpen(true)} className="border border-gray-200 text-black font-semibold px-6 py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:border-[#BF00FF]">
                <Upload className="w-4 h-4" /> Importer un CSV
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-black text-black">Ma Sélection ({prospects.length})</h2>
              <button onClick={() => setCsvOpen(true)} className="text-xs text-[#BF00FF] font-semibold flex items-center gap-1"><Upload className="w-3 h-3" /> Importer CSV</button>
            </div>
            <div className="space-y-2">
              {prospects.map(p => (
                <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-sm">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.sector} · {p.city} {p.email && `· ${p.email}`}</p>
                  </div>
                  <button onClick={() => { removeProspect(p.id); refresh(); }} className="text-xs text-red-400 hover:text-red-600">Retirer</button>
                </div>
              ))}
            </div>
            <Link href="/campaigns" className="block mt-6 text-center bg-[#BF00FF] text-white font-bold py-3 rounded-xl text-sm hover:bg-[#9900CC]">
              Créer une campagne de candidatures
            </Link>
          </div>
        )}
      </div>

      {csvOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setCsvOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-[#BF00FF]" />
                <h3 className="font-black text-black">Importer des prospects</h3>
              </div>
              <button onClick={() => setCsvOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-500">Importez vos entreprises depuis un fichier CSV. Seul le champ &apos;Nom&apos; est obligatoire.</p>
              <div className="mt-4 bg-gray-50 border rounded-xl p-4 flex justify-between items-center">
                <span className="text-xs text-gray-600">Téléchargez notre modèle CSV</span>
                <button onClick={downloadTemplate} className="text-xs font-semibold border px-3 py-1.5 rounded-lg flex items-center gap-1 hover:border-[#BF00FF]">
                  <Download className="w-3 h-3" /> Modèle CSV
                </button>
              </div>
              <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={e => setCsvFile(e.target.files?.[0] || null)} />
              <div onClick={() => fileRef.current?.click()}
                className="mt-4 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-[#BF00FF]">
                <Upload className="w-8 h-8 text-gray-300 mx-auto" />
                <p className="text-sm font-semibold mt-2">{csvFile ? csvFile.name : "Glissez-déposez un CSV ou cliquez"}</p>
              </div>
            </div>
            <div className="flex gap-3 p-5 border-t">
              <button onClick={() => setCsvOpen(false)} className="flex-1 py-3 border rounded-xl text-sm font-semibold">Annuler</button>
              <button onClick={handleImport} disabled={!csvFile}
                className="flex-1 py-3 bg-[#BF00FF] text-white rounded-xl text-sm font-bold disabled:opacity-50">
                Importer {csvFile ? "5 entreprises" : "0 entreprise"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
