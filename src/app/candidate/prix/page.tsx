"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Star, Shield } from "lucide-react";
import { pricingPage } from "@/lib/app-content";
import { content } from "@/lib/content";

export default function CandidatePrixPage() {
  const [billing, setBilling] = useState<"week" | "month" | "annual">("month");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const getPrice = (plan: (typeof pricingPage.plans)[number]) => {
    if (billing === "week") return { amount: plan.weekly, label: "€/semaine" };
    if (billing === "annual") return { amount: String(plan.annualMonthly), label: "€/mois (annuel)" };
    return { amount: String(plan.monthly), label: "€/mois" };
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-[#BF00FF] to-[#9900CC] rounded-2xl px-6 py-4 text-white text-center mb-8">
        <p className="text-sm font-bold">⚡ OFFRE DE LANCEMENT — 1000 crédits offerts (~5 candidatures)</p>
        <p className="text-xs opacity-90 mt-1">Sans carte bancaire · Annulation en 1 clic</p>
      </div>

      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-[#00B67A] text-[#00B67A]" />)}
          <span className="text-xs text-gray-500 font-medium">Trustpilot · Excellent</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#BF00FF] to-[#14B8A6] bg-clip-text text-transparent">
          {content.pricing.title}
        </h1>
        <p className="text-gray-500 mt-2">{content.pricing.subtitle}</p>
        <p className="text-sm text-gray-400 mt-1">{content.pricing.priceNote}</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-1 bg-white rounded-full p-1 border border-gray-100 shadow-sm">
          {([
            { id: "week" as const, label: "Semaine" },
            { id: "month" as const, label: "Mois" },
            { id: "annual" as const, label: "Annuel", badge: pricingPage.annualBadge },
          ]).map(opt => (
            <button key={opt.id} onClick={() => setBilling(opt.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                billing === opt.id ? "bg-[#BF00FF] text-white shadow" : "text-gray-500 hover:text-black"
              }`}>
              {opt.label}
              {opt.badge && billing === opt.id && (
                <span className="ml-1 text-[9px] bg-white/20 px-1.5 py-0.5 rounded-full">{opt.badge}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {pricingPage.plans.map(plan => {
          const price = getPrice(plan);
          const base = plan.variant === "gradient"
            ? "bg-gradient-to-br from-[#BF00FF] to-[#9900CC] text-white shadow-xl shadow-[#BF00FF]/20 lg:-translate-y-2"
            : plan.variant === "dark"
            ? "bg-[#0A0A0A] text-white"
            : "bg-white border border-gray-100 text-black";
          const isSelected = selectedPlan === plan.name;
          return (
            <div key={plan.name}
              onClick={() => setSelectedPlan(plan.name)}
              className={`rounded-2xl p-6 relative cursor-pointer transition-all ${base} ${isSelected ? "ring-4 ring-[#BF00FF]/40 scale-[1.02]" : ""}`}>
              {plan.tag && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black bg-white text-[#BF00FF] px-3 py-1 rounded-full shadow">
                  ✨ {plan.tag}
                </span>
              )}
              <h3 className={`text-xl font-black ${plan.variant === "white" ? "text-[#BF00FF]" : ""}`}>{plan.name}</h3>
              <p className={`text-sm mt-1 font-medium ${plan.variant === "white" ? "text-gray-600" : "opacity-90"}`}>{plan.headline}</p>
              <p className={`text-xs mt-2 ${plan.variant === "white" ? "text-gray-500" : "opacity-80"}`}>{plan.candidaturesLabel}</p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-black">{price.amount}</span>
                <span className={`text-sm ${plan.variant === "white" ? "text-gray-500" : "opacity-80"}`}>{price.label}</span>
              </div>
              {billing === "month" && (
                <p className={`text-xs mt-1 ${plan.variant === "white" ? "text-gray-400" : "opacity-70"}`}>
                  soit {plan.weekly}€/semaine
                </p>
              )}

              <button
                className={`w-full mt-5 py-3 rounded-xl text-sm font-bold transition-all ${
                  plan.variant === "gradient" ? "bg-white text-[#BF00FF] hover:bg-gray-50"
                  : plan.variant === "dark" ? "bg-white text-black hover:bg-gray-100"
                  : "bg-gradient-to-r from-[#BF00FF] to-[#9900CC] text-white hover:opacity-90"
                }`}>
                {isSelected ? "✓ Plan sélectionné" : plan.cta}
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

      <div className="mt-16">
        <h2 className="text-2xl font-black text-center text-black mb-2">Recharges de crédits</h2>
        <p className="text-sm text-center text-gray-500 mb-8">Les crédits n&apos;expirent jamais · Pas d&apos;abonnement requis</p>
        <div className="grid md:grid-cols-3 gap-5">
          {content.pricing.creditPacks.map(pack => (
            <div key={pack.name} className="bg-white rounded-2xl p-6 border border-gray-100 card-lift">
              {pack.tag && <span className="text-[10px] font-black bg-[#BF00FF] text-white px-3 py-1 rounded-full">{pack.tag}</span>}
              <h3 className="text-lg font-black mt-3 text-black">{pack.name}</h3>
              <p className="text-xs text-gray-500 mt-2">{pack.desc}</p>
              <p className="text-3xl font-black mt-4 text-black">{pack.price}€</p>
              <p className="text-sm mt-1 text-[#BF00FF] font-semibold">{pack.candidatures}</p>
              <p className="text-xs text-gray-400">{pack.credits}</p>
              <Link href="/inscription"
                className="block w-full mt-5 py-3 rounded-xl text-sm font-bold text-center border border-gray-200 hover:border-[#BF00FF] hover:text-[#BF00FF] transition-all">
                Acheter {pack.name}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 bg-green-50 border border-green-100 rounded-xl p-5 flex items-start gap-3">
        <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
        <div>
          <p className="text-sm font-bold text-green-800">{content.pricing.footer}</p>
          <p className="text-xs text-green-700 mt-1">{pricingPage.refundText}</p>
          <p className="text-xs text-green-600 mt-1">{pricingPage.stripe}</p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-black text-black mb-4">Questions fréquentes</h3>
        {pricingPage.faqs.map((f, i) => (
          <div key={i} className="border-b border-gray-100 bg-white rounded-xl mb-2 overflow-hidden">
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full flex justify-between items-center px-5 py-4 text-left text-sm font-semibold text-black">
              {f.q} <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
            </button>
            {openFaq === i && <p className="px-5 pb-4 text-sm text-gray-500">{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
