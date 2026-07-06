"use client";
import Link from "next/link";
import { Mail, FileText, Sparkles } from "lucide-react";
import { content as c } from "@/lib/content";

const companies = ["TotalEnergies", "BNP Paribas", "Decathlon"];

export function FeatureShowcaseSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-5">
        {/* Envoi automatique */}
        <div className="rounded-3xl border border-gray-100 bg-[#fafafa] p-6 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#BF00FF]/10 flex items-center justify-center">
                <Mail className="w-4 h-4 text-[#BF00FF]" />
              </div>
              <h3 className="font-black text-black text-sm leading-tight">
                {c.sending.title}<sup className="text-gray-400 text-[10px]">(2)</sup>
              </h3>
            </div>
            <span className="text-[10px] font-bold bg-black text-white px-2 py-1 rounded-full whitespace-nowrap">{c.sending.badge}</span>
          </div>
          <div className="space-y-2 flex-1">
            {c.sending.items.map((item, i) => (
              <div key={item.role} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#BF00FF]/20 to-[#BF00FF]/5 flex items-center justify-center text-[9px] font-black text-[#BF00FF] flex-shrink-0">
                  {item.company?.slice(0, 2) || companies[i]?.[0] || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-black truncate">{item.role}</p>
                  <p className="text-[10px] text-gray-400">{item.sector} · {item.time}</p>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {item.tags.map(t => <span key={t} className="text-[9px] bg-gray-100 px-1.5 py-0.5 rounded">{t}</span>)}
                  </div>
                </div>
                <span className={`text-[9px] font-bold px-2 py-1 rounded-full flex-shrink-0 ${
                  item.status === "Envoyé" ? "bg-green-100 text-green-700"
                  : item.status === "Envoi en cours..." ? "bg-[#BF00FF]/10 text-[#BF00FF]"
                  : "bg-orange-100 text-orange-600"
                }`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lettres */}
        <div className="rounded-3xl border border-gray-100 bg-[#fafafa] p-6 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <FileText className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="font-black text-black text-sm">{c.letter.title}</h3>
            </div>
            <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">{c.letter.badge}</span>
          </div>
          <div className="flex-1 rounded-xl bg-white border border-gray-100 p-4 shadow-sm overflow-hidden">
            <div className="h-full overflow-y-auto text-[10px] text-gray-600 leading-relaxed whitespace-pre-line max-h-64">
              {c.letter.text.split("\n").slice(0, 12).join("\n")}...
            </div>
          </div>
        </div>

        {/* Analyse CV */}
        <div className="rounded-3xl border border-gray-100 bg-[#fafafa] p-6 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#BF00FF]/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#BF00FF]" />
              </div>
              <h3 className="font-black text-black text-sm">{c.cvAnalysis.label}</h3>
            </div>
            <span className="text-[10px] font-bold bg-[#BF00FF]/10 text-[#BF00FF] px-2 py-1 rounded-full">{c.cvAnalysis.sublabel}</span>
          </div>
          <div className="flex-1 rounded-xl bg-white border border-gray-100 p-4 text-[10px] shadow-sm">
            <p className="font-black text-sm text-black">{c.cv.demo.name}</p>
            <p className="text-gray-400">{c.cv.demo.city}</p>
            <p className="text-[9px] font-bold text-gray-400 uppercase mt-3 tracking-widest">Summary</p>
            <p className="text-gray-600 mt-1 line-clamp-3 leading-relaxed">{c.cv.demo.summary}</p>
            <p className="text-[9px] font-bold text-gray-400 uppercase mt-3 tracking-widest">Experience</p>
            {c.cv.demo.experiences.slice(0, 2).map(e => (
              <p key={e.title} className="text-gray-700 mt-1"><span className="font-bold">{e.title}</span> | {e.company}</p>
            ))}
            <p className="text-[9px] font-bold text-gray-400 uppercase mt-3 tracking-widest">Skills</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {c.cv.demo.skills.map(s => <span key={s} className="bg-gray-100 px-1.5 py-0.5 rounded text-[9px]">{s}</span>)}
            </div>
            <div className="flex gap-1.5 mt-4">
              {c.cv.demo.styles.map(s => (
                <span key={s} className={`text-[9px] font-bold px-2 py-1 rounded-full ${s === "Modern" ? "bg-[#BF00FF] text-white" : "bg-gray-100 text-gray-500"}`}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
