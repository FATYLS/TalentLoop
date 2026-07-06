"use client";
import { content as c } from "@/lib/content";

const COMPANIES = c.hero.companies.split("·");

export function CompanyLogosSection() {
  return (
    <section className="py-16 px-4 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">
          {c.hero.companiesNote}<sup>(1)</sup>
        </p>
        <p className="text-sm text-gray-500 mb-10">{c.hero.companiesSub}</p>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-3">
          {COMPANIES.map(name => (
            <div key={name}
              className="flex items-center justify-center bg-[#fafafa] border border-gray-100 rounded-xl px-2 py-4 hover:border-[#BF00FF]/30 hover:bg-[#BF00FF]/5 transition-all">
              <span className="text-[10px] sm:text-xs font-black text-gray-700 text-center leading-tight">{name.trim()}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
