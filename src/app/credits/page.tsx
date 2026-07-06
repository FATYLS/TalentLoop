"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, Star, Shield } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { pricingPage } from "@/lib/app-content";
import { getUser } from "@/lib/store";

export default function CreditsPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const router = useRouter();
  const user = getUser();
  const credits = user?.credits ?? 1000;

  return (
    <AppShell>
      <div className="p-6 md:p-8 max-w-6xl mx-auto">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#BF00FF] to-[#9900CC] rounded-2xl px-6 py-4 text-white text-center mb-8">
          <p className="text-sm font-bold">⚡ OFFRE DE LANCEMENT LIMITÉE</p>
          <p className="text-xs opacity-90 mt-1">Profitez des prix réduits avant qu&apos;ils ne reviennent au tarif normal</p>
        </div>

        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-[#00B67A] text-[#00B67A]" />)}
            <span className="text-xs text-gray-500 font-medium">Trustpilot</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#BF00FF] to-[#14B8A6] bg-clip-text text-transparent">
            {pricingPage.title}
          </h1>
          <p className="text-gray-500 mt-2">{pricingPage.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-gray-500">
            {["Sans engagement", "Annulation en 1 clic", "Paiement Stripe sécurisé", "Crédits sans expiration", "14 200+ candidats actifs"].map(t => (
              <span key={t} className="flex items-center gap-1"><Check className="w-3 h-3 text-[#BF00FF]" />{t}</span>
            ))}
          </div>
        </div>

        {/* Credits status */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 grid md:grid-cols-2 gap-6 mb-10">
          <div>
            <p className="text-sm text-gray-500">Crédits disponibles</p>
            <p className="text-4xl font-black text-[#BF00FF] mt-1">{credits.toLocaleString("fr-FR")}</p>
            <p className="text-xs text-gray-400 mt-1">0 utilisés · {credits.toLocaleString("fr-FR")} total</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Candidatures complètes possibles</p>
            <p className="text-4xl font-black text-[#BF00FF] mt-1">~{Math.floor(credits / 94)}</p>
            <p className="text-xs text-gray-400 mt-1">avec vos crédits actuels</p>
          </div>
        </div>

        {/* Toggle */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-black text-black">Plans d&apos;abonnement</h2>
          <p className="text-sm text-gray-500 mt-1">Crédits rechargés chaque mois · Annulez à tout moment</p>
          <div className="inline-flex items-center gap-2 mt-4 bg-gray-100 rounded-full p-1">
            <button onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${annual ? "bg-white shadow text-black" : "text-gray-500"}`}>
              Annuel <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full ml-1">{pricingPage.annualBadge}</span>
            </button>
            <button onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${!annual ? "bg-white shadow text-black" : "text-gray-500"}`}>
              Mensuel
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid lg:grid-cols-3 gap-5">
          {pricingPage.plans.map(plan => {
            const price = annual ? plan.annualMonthly : plan.monthly;
            const base = plan.variant === "gradient"
              ? "bg-gradient-to-br from-[#BF00FF] to-[#9900CC] text-white shadow-xl shadow-[#BF00FF]/20 lg:-translate-y-2"
              : plan.variant === "dark"
              ? "bg-[#0A0A0A] text-white"
              : "bg-white border border-gray-100 text-black";
            return (
              <div key={plan.name} className={`rounded-2xl p-6 relative ${base}`}>
                {plan.tag && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black bg-white text-[#BF00FF] px-3 py-1 rounded-full shadow">
                    ✨ {plan.tag}
                  </span>
                )}
                <h3 className={`text-xl font-black ${plan.variant === "white" ? "text-[#BF00FF]" : ""}`}>{plan.name}</h3>
                <p className={`text-sm mt-1 font-medium ${plan.variant === "white" ? "text-gray-600" : "opacity-90"}`}>{plan.headline}</p>
                <p className={`text-xs mt-2 ${plan.variant === "white" ? "text-gray-500" : "opacity-80"}`}>{plan.candidaturesLabel}</p>
                <span className={`inline-block text-[10px] font-bold mt-3 px-2 py-1 rounded-full ${
                  plan.variant === "white" ? "bg-gray-100 text-gray-600" : "bg-white/20"
                }`}>{plan.badge}</span>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-black">{plan.weekly}</span>
                  <span className={`text-sm ${plan.variant === "white" ? "text-gray-500" : "opacity-80"}`}>€/semaine</span>
                </div>
                <p className={`text-xs mt-1 ${plan.variant === "white" ? "text-gray-400" : "opacity-70"}`}>
                  facturé {price}€/mois{annual ? " (annuel)" : ""}
                </p>

                <p className={`text-xs mt-3 flex items-center gap-1 ${plan.variant === "white" ? "text-green-600" : ""}`}>
                  <Check className="w-3 h-3" /> {pricingPage.guarantee}
                </p>

                <button onClick={() => router.push("/dashboard")}
                  className={`w-full mt-5 py-3 rounded-xl text-sm font-bold transition-all ${
                    plan.variant === "gradient" ? "bg-white text-[#BF00FF] hover:bg-gray-50"
                    : plan.variant === "dark" ? "bg-white text-black hover:bg-gray-100"
                    : "bg-gradient-to-r from-[#BF00FF] to-[#9900CC] text-white hover:opacity-90"
                  }`}>
                  {plan.cta}
                </button>

                <ul className="mt-6 space-y-2">
                  {plan.features.map(f => (
                    <li key={f} className={`flex items-start gap-2 text-xs ${plan.variant === "white" ? "text-gray-600" : "opacity-90"}`}>
                      <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />{f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Free trial banner */}
        <div className="mt-10 bg-white rounded-2xl border border-gray-100 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-black">{pricingPage.freeTrialBanner}</p>
            <p className="text-xs text-gray-500 mt-1">{pricingPage.freeTrialSub}</p>
          </div>
          <Link href="/dashboard" className="text-sm font-bold text-[#BF00FF] hover:underline whitespace-nowrap">
            {pricingPage.freeTrialCta} →
          </Link>
        </div>

        {/* Testimonials */}
        <div className="mt-12">
          <h3 className="text-lg font-black text-center text-black mb-6">{pricingPage.testimonialsTitle}</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {pricingPage.testimonials.map(t => (
              <div key={t.author} className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex gap-0.5 mb-2">{[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-[#00B67A] text-[#00B67A]" />)}</div>
                <p className="text-sm text-gray-600">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-7 h-7 rounded-full bg-[#BF00FF]/10 text-[#BF00FF] text-xs font-bold flex items-center justify-center">{t.author[0]}</div>
                  <div><p className="text-xs font-bold">{t.author}</p><p className="text-[10px] text-gray-400">{t.city}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee + FAQ */}
        <div className="mt-10 bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-green-800">Badge vérifié — {pricingPage.guarantee}</p>
            <p className="text-xs text-green-700 mt-1">{pricingPage.refundText}</p>
            <p className="text-xs text-green-600 mt-1">{pricingPage.stripe}</p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-black text-black mb-4">Questions fréquentes</h3>
          {pricingPage.faqs.map((f, i) => (
            <div key={i} className="border-b border-gray-100">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex justify-between items-center py-4 text-left text-sm font-semibold text-black">
                {f.q} <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && <p className="pb-4 text-sm text-gray-500">{f.a}</p>}
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">Paiement garanti sûr et sécurisé · Propulsé par Stripe.</p>
      </div>
    </AppShell>
  );
}
