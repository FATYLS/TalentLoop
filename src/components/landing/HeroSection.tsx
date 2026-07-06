"use client";
import Link from "next/link";
import { ArrowRight, Check, Star, Send, FileText, Building2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { content as c } from "@/lib/content";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col bg-[#0A0A0A] overflow-hidden">
      {/* fond décoratif */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#BF00FF]/20 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#BF00FF]/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(#BF00FF 1px, transparent 1px), linear-gradient(90deg, #BF00FF 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="relative flex-1 max-w-7xl mx-auto w-full px-4 pt-28 pb-16 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Colonne gauche — texte */}
        <div>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8">
            <span className="text-xs font-semibold text-white">{c.hero.trust}</span>
            <div className="flex gap-0.5">
              {[1,2,3,4].map(i => <Star key={i} className="w-3 h-3 fill-[#00B67A] text-[#00B67A]" />)}
              <Star className="w-3 h-3 fill-[#00B67A]/40 text-[#00B67A]" />
            </div>
            <span className="text-[10px] font-bold text-[#00B67A]">Trustpilot</span>
          </div>

          <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-white leading-[1.08] tracking-tight">
            {c.hero.title}
          </h1>
          <p className="text-xl md:text-2xl font-bold text-[#BF00FF] mt-5 leading-snug">
            {c.hero.subtitle}
          </p>
          <p className="text-gray-400 mt-6 text-base leading-relaxed max-w-lg">
            {c.hero.desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <Button href="/candidate/recherche" variant="primary" className="!px-8 !py-4 violet-glow-strong">
              {c.hero.cta1} <ArrowRight className="w-4 h-4" />
            </Button>
            <Link href="#etapes"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white text-sm font-bold hover:border-[#BF00FF] hover:text-[#BF00FF] transition-all">
              {c.hero.cta2}
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-10">
            {c.hero.badges.map(b => (
              <span key={b} className="flex items-center gap-2 text-[11px] text-gray-400 font-medium">
                <Check className="w-3.5 h-3.5 text-[#BF00FF] flex-shrink-0" />{b}
              </span>
            ))}
          </div>
        </div>

        {/* Colonne droite — bento dashboard */}
        <div className="relative hidden lg:block">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 bg-white rounded-2xl p-5 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Analyse CV</p>
                  <p className="font-black text-black text-lg">Marie Dupont</p>
                </div>
                <div className="text-3xl font-black text-[#BF00FF]">87<span className="text-sm text-gray-300">/100</span></div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[87%] bg-gradient-to-r from-[#BF00FF] to-[#E066FF] rounded-full" />
              </div>
              <p className="text-xs text-gray-500 mt-3 line-clamp-2">Développeuse Full Stack — React, Node.js, Python</p>
            </div>

            <div className="bg-[#BF00FF] rounded-2xl p-5 text-white">
              <Building2 className="w-5 h-5 mb-3 opacity-80" />
              <p className="text-3xl font-black">+500</p>
              <p className="text-xs opacity-80 mt-1">entreprises contactées</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <Send className="w-5 h-5 text-[#BF00FF] mb-3" />
              <p className="text-2xl font-black text-black">47</p>
              <p className="text-xs text-gray-400 mt-1">candidatures envoyées</p>
            </div>

            <div className="col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#BF00FF]/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-[#BF00FF]" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Envoi en cours...</p>
                  <p className="text-gray-500 text-xs">Capgemini · Développeur Full Stack</p>
                </div>
                <span className="ml-auto text-[10px] font-bold text-[#BF00FF] bg-[#BF00FF]/10 px-2 py-1 rounded-full">Live</span>
              </div>
            </div>

            <div className="col-span-2 flex items-center gap-3 bg-white rounded-2xl p-4">
              <FileText className="w-5 h-5 text-[#BF00FF]" />
              <p className="text-xs text-gray-600 flex-1 line-clamp-2">Lettre personnalisée générée — 0% ChatGPT générique</p>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">Prête</span>
            </div>
          </div>

          <div className="absolute -z-10 -inset-4 border border-[#BF00FF]/20 rounded-3xl" />
        </div>
      </div>

      {/* bandeau entreprises */}
      <div className="relative border-t border-white/10 bg-black/50 backdrop-blur-sm py-6 px-4">
        <p className="text-center text-[10px] uppercase tracking-widest text-gray-500 mb-3">
          {c.hero.companiesNote}<sup>(1)</sup> · {c.hero.companiesSub}
        </p>
        <p className="text-center text-xs text-gray-600 max-w-5xl mx-auto leading-relaxed opacity-60">
          {c.hero.companies}
        </p>
      </div>
    </section>
  );
}
