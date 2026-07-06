"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { getCampaigns, createCampaign, getProspects } from "@/lib/store";
import { Campaign } from "@/lib/types";
import { DEMO_LETTER } from "@/lib/cv-demo";
import { Send, Plus, ChevronDown, FileDown, Eye } from "lucide-react";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => { setCampaigns(getCampaigns()); }, []);

  const handleCreate = () => {
    const prospects = getProspects();
    if (!prospects.length) { alert("Ajoutez des entreprises à votre sélection d'abord."); return; }
    const c = createCampaign(`Campagne ${new Date().toLocaleDateString("fr")}`, prospects.length, DEMO_LETTER);
    setCampaigns([...campaigns, c]);
  };

  const exportLetter = (letter: string, name: string) => {
    const blob = new Blob([letter], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `lettre-${name.replace(/\s/g, "-")}.txt`;
    a.click();
  };

  const exportPdf = (letter: string, name: string) => {
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Lettre - ${name}</title>
      <style>body{font-family:Georgia,serif;max-width:600px;margin:40px auto;line-height:1.6;padding:20px}
      h1{font-size:14px;color:#666;margin-bottom:30px}</style></head><body>
      <h1>Lettre de motivation générée par TalentLoop</h1>
      <pre style="white-space:pre-wrap;font-family:Georgia,serif">${letter}</pre></body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `lettre-${name.replace(/\s/g, "-")}.html`;
    a.click();
  };

  return (
    <AppShell>
      <div className="p-6 md:p-8 max-w-4xl mx-auto">
        <button className="mb-6 text-xs text-gray-500 border border-gray-200 rounded-full px-4 py-1.5 flex items-center gap-1 mx-auto">
          Regarder le tutoriel pour cette étape <ChevronDown className="w-3 h-3" />
        </button>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-black text-black">Mes candidatures</h1>
            <p className="text-sm text-gray-500 mt-1">Générez vos lettres par IA et suivez vos envois</p>
          </div>
          <button onClick={handleCreate} className="flex items-center gap-2 bg-[#BF00FF] text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-[#9900CC]">
            <Plus className="w-4 h-4" /> Nouvelle campagne
          </button>
        </div>

        {campaigns.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <Send className="w-16 h-16 text-gray-200 mx-auto" />
            <h2 className="text-xl font-black text-black mt-6">Aucune candidature</h2>
            <p className="text-sm text-gray-500 mt-3">Ajoutez des entreprises à votre sélection puis créez une campagne.</p>
            <Link href="/prospects/panier" className="inline-block mt-6 bg-[#BF00FF] text-white font-bold px-6 py-3 rounded-xl text-sm">Ma Sélection</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {campaigns.map(c => (
              <div key={c.id} className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <p className="font-bold text-black">{c.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{c.prospects} prospects · {c.sent} envoyées · {c.status === "draft" ? "Brouillon" : c.status}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {c.letter && (
                      <>
                        <button onClick={() => setPreview(c.letter!)} className="text-xs font-semibold border px-3 py-1.5 rounded-lg flex items-center gap-1 hover:border-[#BF00FF]">
                          <Eye className="w-3 h-3" /> Voir lettre
                        </button>
                        <button onClick={() => exportLetter(c.letter!, c.name)} className="text-xs font-semibold border px-3 py-1.5 rounded-lg flex items-center gap-1 hover:border-[#BF00FF]">
                          <FileDown className="w-3 h-3" /> Export TXT
                        </button>
                        <button onClick={() => exportPdf(c.letter!, c.name)} className="text-xs font-semibold bg-[#BF00FF] text-white px-3 py-1.5 rounded-lg flex items-center gap-1">
                          <FileDown className="w-3 h-3" /> Export PDF
                        </button>
                      </>
                    )}
                    <button className="text-xs font-bold text-[#BF00FF] border border-[#BF00FF]/30 px-3 py-1.5 rounded-lg">Lancer l&apos;envoi</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setPreview(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-auto p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-black text-black mb-4">Lettre de motivation (IA)</h3>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{preview}</pre>
            <button onClick={() => setPreview(null)} className="mt-4 w-full py-3 border rounded-xl text-sm font-semibold">Fermer</button>
          </div>
        </div>
      )}
    </AppShell>
  );
}
