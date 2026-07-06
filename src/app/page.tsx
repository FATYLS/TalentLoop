"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Zap, Target, FileText, Send, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { SectionTag, SectionTitle } from "@/components/landing/LandingUI";
import { HeroSection } from "@/components/landing/HeroSection";
import { PrepareTargetSection } from "@/components/landing/PrepareTargetSection";
import { FeatureShowcaseSection } from "@/components/landing/FeatureShowcaseSection";
import { FeaturesMockupSection } from "@/components/landing/FeaturesMockupSection";
import { CompanyLogosSection } from "@/components/landing/CompanyLogosSection";
import { CvScoreSection, SendingTrackerSection } from "@/components/landing/DemoSections";
import { PricingCards } from "@/components/landing/PricingCards";
import { content as c } from "@/lib/content";
import { profileToType } from "@/lib/onboarding";

const stepIcons = [Sparkles, Target, FileText, Send];

function profileCardType(job: string): string {
  if (/stage/i.test(job)) return "stage";
  if (/alternance/i.test(job)) return "alternance";
  return "cdi";
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeProfile, setActiveProfile] = useState<number | null>(null);

  return (
    <div className="overflow-x-hidden">
      <Navbar />

      <HeroSection />

      <CompanyLogosSection />

      {/* ── PROFILES ── */}
      <section className="py-24 px-4 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 landing-dots opacity-30" />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <SectionTag>{c.profiles.title}</SectionTag>
            <SectionTitle className="text-white mt-4">{c.profiles.title}</SectionTitle>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">{c.profiles.subtitle}</p>
            <p className="text-sm text-gray-500 mt-2">{c.profiles.note}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {c.profiles.items.map((p, i) => {
              const type = profileToType[p] || "cdi";
              return (
              <Link key={p} href={`/onboarding?type=${type}`}
                className={`group text-left rounded-2xl px-6 py-5 text-sm font-medium transition-all duration-300 border block ${
                  activeProfile === i
                    ? "bg-[#BF00FF] border-[#BF00FF] text-white violet-glow-strong"
                    : "bg-white/5 border-white/10 text-gray-200 hover:border-[#BF00FF]/50 hover:bg-white/10"
                }`}
                onClick={() => setActiveProfile(i)}>
                <span className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${activeProfile === i ? "bg-white" : "bg-[#BF00FF]"}`} />
                  {p}
                </span>
              </Link>
            );})}
          </div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section id="etapes" className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <SectionTag>Workflow</SectionTag>
            <SectionTitle className="mt-4">{c.steps.title}</SectionTitle>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">{c.steps.subtitle}</p>
          </div>

          <div className="hidden md:flex items-center justify-between mt-12 px-8">
            {c.steps.labels.map((l, i) => (
              <div key={l} className="flex items-center flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#BF00FF] whitespace-nowrap">{l}</span>
                {i < c.steps.labels.length - 1 && <div className="step-connector flex-1 mx-3" />}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-10">
            {c.steps.items.map((s, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={s.n} className="group card-lift relative bg-[#fafafa] rounded-2xl p-7 border border-gray-100 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#BF00FF]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[#BF00FF]/10 transition-colors" />
                  <div className="flex items-start gap-4 relative">
                    <div className="w-12 h-12 rounded-2xl bg-black text-[#BF00FF] flex items-center justify-center font-black text-lg flex-shrink-0 group-hover:bg-[#BF00FF] group-hover:text-white transition-colors">
                      {s.n}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-[#BF00FF]" />
                        <h3 className="text-lg font-black text-black">{s.title}</h3>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center mt-10">
            <Link href="/onboarding?type=cdi" className="inline-flex items-center gap-2 text-sm font-bold text-[#BF00FF] hover:gap-3 transition-all">
              {c.steps.workflow} <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </section>

      <PrepareTargetSection />
      <CvScoreSection />
      <FeatureShowcaseSection />
      <SendingTrackerSection />

      {/* ── PRICING ── */}
      <section className="py-24 px-4 bg-black text-white">
        <div className="max-w-6xl mx-auto text-center">
          <SectionTag>{c.pricing.label}</SectionTag>
          <SectionTitle className="text-white mt-4">{c.pricing.title}</SectionTitle>
          <p className="text-gray-400 mt-3">{c.pricing.subtitle}</p>
          <p className="text-gray-500 text-sm mt-1">{c.pricing.priceNote}</p>
          <div className="mt-14">
            <PricingCards dark />
          </div>
          <Button href="/tarifs" variant="outline" className="mt-12 !border-[#BF00FF] !text-[#BF00FF] hover:!bg-[#BF00FF] hover:!text-white">{c.pricing.cta}</Button>
          <p className="text-[10px] text-gray-600 mt-6 uppercase tracking-wider">{c.pricing.footer}</p>
        </div>
      </section>

      <FeaturesMockupSection />

      {/* ── CTA ── */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-[#BF00FF]/10 rounded-3xl blur-3xl" />
          <div className="relative bg-black rounded-3xl py-16 px-8 dark-mesh border border-[#BF00FF]/20">
            <Zap className="w-10 h-10 text-[#BF00FF] mx-auto" />
            <h2 className="text-3xl md:text-4xl font-black text-white mt-6">{c.cta.title}</h2>
            <p className="text-gray-400 mt-4 max-w-lg mx-auto">{c.cta.desc}</p>
            <Button href="/onboarding?type=cdi" variant="primary" className="mt-8 violet-glow-strong">{c.cta.button}</Button>
            <p className="text-[10px] text-gray-500 mt-5 uppercase tracking-widest">{c.cta.note}</p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 overflow-hidden bg-white border-y border-gray-100">
        <h2 className="text-3xl font-black text-center text-black mb-12 px-4">{c.testimonials.title}</h2>
        <div className="flex animate-marquee gap-5 w-max">
          {[...c.testimonials.items, ...c.testimonials.items].map((t, i) => (
            <div key={i} className="w-80 flex-shrink-0 rounded-2xl p-6 bg-black text-white relative overflow-hidden">
              <div className="absolute top-4 right-4 text-6xl font-black text-[#BF00FF]/10 leading-none">&ldquo;</div>
              {t.trustpilot && <span className="text-[10px] font-bold text-[#00B67A] uppercase tracking-widest">Trustpilot</span>}
              <p className="text-sm text-gray-300 mt-3 leading-relaxed relative">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 mt-5 pt-5 border-t border-white/10">
                <div className="w-8 h-8 rounded-full bg-[#BF00FF] flex items-center justify-center text-xs font-black">{t.author[0]}</div>
                <div>
                  <p className="font-bold text-sm">{t.author}</p>
                  <p className="text-xs text-gray-500">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROFILE CARDS ── */}
      <section className="py-24 px-4 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <SectionTag>Profils</SectionTag>
            <SectionTitle className="mt-4">{c.profileCards.title}</SectionTitle>
            <p className="text-gray-500 mt-3">{c.profileCards.subtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.profileCards.items.map(p => (
              <Link key={p.name} href={`/onboarding?type=${profileCardType(p.job)}`}
                className="card-lift bg-white rounded-2xl p-6 border border-gray-100 group hover:border-[#BF00FF]/30 block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#BF00FF] to-black flex items-center justify-center text-white text-sm font-black">
                    {p.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-black text-black">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.role}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.skills.slice(0, 4).map(s => (
                    <span key={s} className="text-[10px] font-semibold bg-black text-white px-2 py-1 rounded-md">{s}</span>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <h4 className="font-black text-sm text-[#BF00FF]">{p.job}</h4>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">{c.profileCards.contract}</p>
                  <p className="text-[10px] text-gray-400 mt-2">{p.updated}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-10">{c.profileCards.footer}</p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <SectionTag>FAQ</SectionTag>
            <SectionTitle className="mt-4">{c.faq.title}</SectionTitle>
          </div>
          <div className="space-y-3">
            {c.faq.items.map((f, i) => (
              <div key={i} className={`rounded-2xl border border-gray-100 overflow-hidden transition-all ${openFaq === i ? "faq-open" : ""}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left font-bold text-black hover:text-[#BF00FF] gap-4 transition-colors">
                  <span className="text-sm">{f.q}</span>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${openFaq === i ? "bg-[#BF00FF] text-white" : "bg-gray-100 text-gray-500"}`}>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-500 text-sm leading-relaxed border-t border-[#BF00FF]/10 pt-4">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-14 space-y-4 text-[10px] text-gray-400 leading-relaxed">
            <p>{c.footnotes.n1}</p>
            <p>{c.footnotes.n2}</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
