"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { content as c } from "@/lib/content";

export function PrepareTargetSection() {
  return (
    <section className="py-20 px-4 bg-[#f4f6f9]">
      <div className="max-w-6xl mx-auto">
        {/* Time save header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#BF00FF] bg-[#BF00FF]/10 px-4 py-1.5 rounded-full">
            {c.timeSave.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-black mt-6 leading-tight">
            {c.timeSave.title}<br />
            <span className="text-[#BF00FF]">{c.timeSave.title2}</span>
          </h2>
          <p className="text-gray-500 mt-3">{c.timeSave.desc}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* PREPARE */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#BF00FF] mb-2">PREPARE</p>
            <h3 className="text-2xl font-black text-black">{c.cv.title}</h3>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">{c.cv.desc}</p>
            <Link href="/onboarding?type=cdi" className="inline-flex items-center gap-2 mt-5 text-sm font-bold text-black border border-gray-200 rounded-full px-5 py-2.5 hover:border-[#BF00FF] hover:text-[#BF00FF] transition-colors">
              {c.cv.cta} <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-gray-400 mt-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#BF00FF]/20 flex items-center justify-center text-[10px]">👤</span>
              {c.cv.social}
            </p>
            {/* CV mockup */}
            <div className="mt-8 rounded-2xl bg-gradient-to-br from-[#BF00FF] to-[#14B8A6] p-4 shadow-lg">
              <div className="bg-white rounded-xl p-5 text-xs shadow-inner relative">
                <div className="absolute -top-3 left-4 bg-white border border-[#BF00FF]/30 rounded-full px-3 py-1 text-[10px] font-semibold text-[#BF00FF] shadow">
                  {c.cv.hint}|
                </div>
                <p className="font-black text-sm text-black mt-2">{c.cv.demo.name}</p>
                <p className="text-gray-400">{c.cv.demo.city}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase mt-4 tracking-widest">Summary</p>
                <p className="text-gray-600 mt-1 leading-relaxed line-clamp-3">{c.cv.demo.summary}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase mt-3 tracking-widest">Experience</p>
                {c.cv.demo.experiences.slice(0, 2).map(e => (
                  <div key={e.title} className="mt-2">
                    <p className="font-bold text-gray-800">{e.title} <span className="font-normal text-gray-400">| {e.company}</span></p>
                    <p className="text-gray-400">{e.period}</p>
                  </div>
                ))}
                <div className="flex gap-1.5 mt-4">
                  {c.cv.demo.styles.map(s => (
                    <span key={s} className={`text-[9px] font-bold px-2 py-1 rounded-full ${s === "Modern" ? "bg-[#BF00FF] text-white" : "bg-gray-100 text-gray-500"}`}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* TARGET */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#BF00FF] mb-2">TARGET</p>
            <h3 className="text-2xl font-black text-black">{c.target.title}</h3>
            <p className="text-gray-500 text-sm mt-3">{c.target.desc}</p>
            <Link href="/onboarding?type=cdi" className="inline-flex items-center gap-2 mt-5 text-sm font-bold text-black border border-gray-200 rounded-full px-5 py-2.5 hover:border-[#BF00FF] hover:text-[#BF00FF] transition-colors">
              {c.target.cta} <ArrowRight className="w-4 h-4" />
            </Link>
            {/* Search mockup */}
            <div className="mt-8 rounded-2xl bg-gradient-to-br from-[#BF00FF] to-[#14B8A6] p-4 shadow-lg">
              <div className="bg-white rounded-xl overflow-hidden shadow-inner text-xs">
                <div className="bg-gradient-to-r from-[#BF00FF] to-[#14B8A6] text-white px-4 py-3 font-bold">Recherche d&apos;entreprises</div>
                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-[9px] text-gray-400 font-semibold">Poste / Entreprise / Secteur</p>
                    <p className="border rounded-lg px-3 py-2 mt-1 text-gray-700">Data Analyst</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-semibold">Ville ou code postal</p>
                    <p className="border rounded-lg px-3 py-2 mt-1 text-gray-700">Lyon</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-semibold">Rayon 20 km</p>
                    <div className="h-1.5 bg-gray-100 rounded-full mt-2"><div className="h-full w-2/3 bg-[#BF00FF] rounded-full" /></div>
                  </div>
                  <p className="text-[#BF00FF] font-bold">1 850 entreprises trouvées</p>
                  {["DataInsights, Lyon", "Capgemini, Lyon", "Alan, Paris"].map(n => (
                    <div key={n} className="flex justify-between border-b border-gray-50 pb-2">
                      <span className="text-gray-700">{n}</span>
                      <span className="text-green-600 font-semibold">+</span>
                    </div>
                  ))}
                  <button className="w-full bg-[#BF00FF] text-white font-bold py-2.5 rounded-lg">🔍 Rechercher</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
