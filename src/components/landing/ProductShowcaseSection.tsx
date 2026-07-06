"use client";
import { Mail, User, FileText } from "lucide-react";
import { content as c } from "@/lib/content";

const logos = ["TotalEnergies", "BNP Paribas", "Decathlon"];
const statusStyle: Record<string, string> = {
  "Envoi en cours...": "bg-blue-100 text-blue-700",
  "Envoyé": "bg-green-100 text-green-700",
  "En attente": "bg-orange-100 text-orange-700",
};

export function ProductShowcaseSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
        {/* Envoi */}
        <div className="rounded-3xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#BF00FF] flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-black text-black text-sm">{c.sending.title}<sup className="text-gray-400">(2)</sup></h3>
            </div>
            <span className="text-[10px] font-bold bg-pink-100 text-pink-600 px-2 py-1 rounded-full">{c.sending.badge}</span>
          </div>
          <div className="space-y-3">
            {c.sending.items.map((item, i) => (
              <div key={item.role} className="border border-gray-100 rounded-xl p-3">
                <div className="flex justify-between items-start">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                      {logos[i]?.[0]}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-black">{item.role}</p>
                      <p className="text-[10px] text-gray-400">{item.sector} · {item.time}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${statusStyle[item.status]}`}>{item.status}</span>
                </div>
                <div className="flex gap-1 mt-2">
                  {item.tags.map(t => <span key={t} className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lettres */}
        <div className="rounded-3xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#BF00FF] flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-black text-black text-sm">{c.letter.title}</h3>
            </div>
            <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">{c.letter.badge}</span>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-[11px] text-gray-600 leading-relaxed max-h-72 overflow-hidden relative">
            <p className="whitespace-pre-line line-clamp-[14]">{c.letter.text}</p>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
          </div>
        </div>

        {/* Analyse CV */}
        <div className="rounded-3xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#BF00FF] flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-black text-black text-sm">{c.cvAnalysis.label}</h3>
                <p className="text-[10px] text-gray-400">{c.cvAnalysis.sublabel}</p>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Base de tout</span>
          </div>
          <div className="border border-gray-100 rounded-xl p-4 text-xs">
            <p className="font-black">{c.cv.demo.name}</p>
            <p className="text-gray-400">{c.cv.demo.city}</p>
            <div className="flex justify-center my-4">
              <div className="w-16 h-16 rounded-full border-4 border-[#BF00FF] flex items-center justify-center">
                <span className="text-xl font-black text-[#BF00FF]">{c.cv.demo.score}</span>
              </div>
            </div>
            <p className="text-[9px] font-bold text-gray-400 uppercase">Skills</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {c.cv.demo.skills.map(s => <span key={s} className="bg-gray-100 px-2 py-0.5 rounded text-[10px]">{s}</span>)}
            </div>
            <div className="flex gap-1 mt-3">
              {c.cv.demo.styles.map(s => (
                <span key={s} className={`flex-1 text-center text-[9px] font-bold py-1 rounded ${s === "Classic" ? "bg-[#BF00FF] text-white" : "bg-gray-100"}`}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
