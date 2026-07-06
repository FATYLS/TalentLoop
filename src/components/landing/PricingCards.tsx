import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { content } from "@/lib/content";

type Plan = (typeof content.pricing.plans)[number];

function PlanCard({ plan, dark = false }: { plan: Plan; dark?: boolean }) {
  const base = dark
    ? `card-lift rounded-2xl p-7 border transition-all text-left ${plan.tag ? "border-[#BF00FF] bg-[#BF00FF]/10 violet-glow-strong md:-translate-y-4" : "border-white/10 bg-white/5"}`
    : `rounded-2xl p-8 border-2 text-left relative ${plan.tag ? "border-[#BF00FF] bg-[#BF00FF]/5" : "border-gray-100 bg-white"}`;

  return (
    <div className={base}>
      {plan.tag && (
        <span className={`text-[10px] font-black uppercase tracking-widest bg-[#BF00FF] text-white px-3 py-1 rounded-full ${!dark ? "absolute -top-3 left-1/2 -translate-x-1/2" : ""}`}>
          {plan.tag}
        </span>
      )}
      <p className={`text-[10px] font-bold uppercase tracking-widest ${dark ? "text-[#BF00FF]" : "text-[#BF00FF]"}`}>{plan.candidatures}</p>
      <h3 className={`text-xl font-black mt-2 ${dark ? "text-white" : "text-black"}`}>{plan.name}</h3>
      <p className={`text-sm mt-1 font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>{plan.desc}</p>
      <p className={`text-xs mt-2 ${dark ? "text-gray-500" : "text-gray-500"}`}>{plan.subtitle}</p>

      <div className="mt-6 flex items-end gap-1">
        <span className={`text-4xl font-black ${dark ? "text-white" : "text-black"}`}>{plan.price}€</span>
        <span className={`text-sm mb-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>{plan.period}</span>
      </div>
      <p className={`text-xs mt-1 ${dark ? "text-gray-500" : "text-gray-400"}`}>{plan.weekly} · facturé {plan.price}€/mois</p>
      <p className={`text-xs font-semibold mt-2 ${dark ? "text-[#BF00FF]" : "text-[#BF00FF]"}`}>{plan.credits}</p>

      <ul className="mt-6 space-y-2.5">
        {plan.features.map(f => (
          <li key={f} className={`flex items-start gap-2 text-xs leading-relaxed ${dark ? "text-gray-400" : "text-gray-600"}`}>
            <Check className="w-3.5 h-3.5 text-[#BF00FF] flex-shrink-0 mt-0.5" />{f}
          </li>
        ))}
      </ul>

      <p className={`text-[10px] mt-4 ${dark ? "text-gray-600" : "text-gray-400"}`}>{content.pricing.refund}</p>
      <Button href="/inscription" variant={plan.tag ? "primary" : "outline"}
        className={`w-full mt-5 ${dark && !plan.tag ? "!border-white/20 !text-white hover:!bg-white hover:!text-black" : ""}`}>
        Choisir {plan.slug === "pro" ? "Pro" : plan.slug === "premium" ? "Premium" : "Intensif"}
      </Button>
    </div>
  );
}

export function PricingCards({ dark = false, showPacks = false }: { dark?: boolean; showPacks?: boolean }) {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-5">
        {content.pricing.plans.map(p => <PlanCard key={p.name} plan={p} dark={dark} />)}
      </div>

      {showPacks && (
        <div className="mt-20">
          <h2 className={`text-2xl font-black text-center mb-2 ${dark ? "text-white" : "text-black"}`}>Recharges de crédits</h2>
          <p className={`text-sm text-center mb-10 ${dark ? "text-gray-400" : "text-gray-500"}`}>Les crédits n&apos;expirent jamais · Pas d&apos;abonnement requis</p>
          <div className="grid md:grid-cols-3 gap-5">
            {content.pricing.creditPacks.map(pack => (
              <div key={pack.name} className={`rounded-2xl p-6 border ${dark ? "border-white/10 bg-white/5" : "border-gray-100 bg-white"}`}>
                {pack.tag && <span className="text-[10px] font-black bg-[#BF00FF] text-white px-3 py-1 rounded-full">{pack.tag}</span>}
                <h3 className={`text-lg font-black mt-3 ${dark ? "text-white" : "text-black"}`}>{pack.name}</h3>
                <p className={`text-xs mt-2 ${dark ? "text-gray-400" : "text-gray-500"}`}>{pack.desc}</p>
                <p className={`text-3xl font-black mt-4 ${dark ? "text-white" : "text-black"}`}>{pack.price}€</p>
                <p className={`text-sm mt-1 ${dark ? "text-[#BF00FF]" : "text-[#BF00FF]"}`}>{pack.candidatures}</p>
                <p className={`text-xs mt-1 ${dark ? "text-gray-500" : "text-gray-400"}`}>{pack.credits}</p>
                <Button href="/inscription" variant="outline" className={`w-full mt-5 ${dark ? "!border-white/20 !text-white" : ""}`}>
                  S&apos;inscrire pour en profiter
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export function PricingTable() {
  const rows = [
    { label: "Crédits / mois", pro: "9 500", premium: "23 500", intensif: "47 000" },
    { label: "Candidatures / mois", pro: "~100", premium: "~250", intensif: "~500" },
    { label: "Toutes les fonctionnalités", pro: "✓", premium: "✓", intensif: "✓" },
    { label: "Résultats de recherche illimités", pro: "✓", premium: "✓", intensif: "✓" },
    { label: "Suivi & analytics", pro: "✓", premium: "✓", intensif: "✓" },
    { label: "Traitement prioritaire", pro: "—", premium: "✓", intensif: "✓" },
    { label: "Export PDF illimité", pro: "—", premium: "✓", intensif: "✓" },
    { label: "Support", pro: "Email", premium: "Prioritaire", intensif: "VIP 12h" },
    { label: "Account manager dédié", pro: "—", premium: "—", intensif: "✓" },
  ];

  return (
    <div className="overflow-x-auto mt-16">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 pr-4 font-bold text-black">Fonctionnalité</th>
            <th className="py-3 px-4 font-bold text-black text-center">Pro<br /><span className="text-[#BF00FF] text-xs">24€/mois</span></th>
            <th className="py-3 px-4 font-bold text-black text-center">Premium<br /><span className="text-[#BF00FF] text-xs">35€/mois</span></th>
            <th className="py-3 px-4 font-bold text-black text-center">Intensif<br /><span className="text-[#BF00FF] text-xs">55€/mois</span></th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.label} className="border-b border-gray-100">
              <td className="py-3 pr-4 text-gray-600">{r.label}</td>
              <td className="py-3 px-4 text-center text-gray-700">{r.pro}</td>
              <td className="py-3 px-4 text-center text-gray-700">{r.premium}</td>
              <td className="py-3 px-4 text-center text-gray-700">{r.intensif}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
