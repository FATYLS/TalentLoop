"use client";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { getUser, getProspects, getCampaigns } from "@/lib/store";
import { Coins, Users, Send, Target, ChevronRight } from "lucide-react";

export default function DashboardPage() {
  const user = getUser();
  const prospects = getProspects().length;
  const campaigns = getCampaigns();
  const sent = campaigns.reduce((a, c) => a + c.sent, 0);
  const credits = user?.credits ?? 1000;
  const name = user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : "Candidat";

  const stats = [
    { label: "Crédits disponibles", value: credits, sub: "Aucun crédit utilisé", icon: Coins, color: "text-[#BF00FF]", href: "/credits" },
    { label: "Prospects", value: prospects, sub: prospects ? `${prospects} entreprises` : "Aucun prospect", icon: Users, color: "text-purple-500", href: "/prospects/panier" },
    { label: "Candidatures", value: sent, sub: sent ? `${sent} envoyées` : "Aucune candidature envoyée", icon: Send, color: "text-green-500", href: "/campaigns" },
    { label: "Campagnes", value: campaigns.length, sub: campaigns.length ? "En cours" : "Aucune campagne pour l'instant", icon: Target, color: "text-pink-500", href: "/campaigns" },
  ];

  const steps = [
    { n: 1, title: "Optimiser mon CV", desc: "Améliorez votre CV avec notre analyse IA. Score, suggestions et codes NAF pour cibler les bons secteurs.", href: "/profile", cta: "Accéder au profil" },
    { n: 2, title: "Rechercher & sélectionner", desc: "Trouvez des entreprises par rayon km, enrichissez vos prospects et ajoutez-les à votre sélection.", href: "/prospects", cta: "Commencer" },
    { n: 3, title: "Envoyer mes candidatures", desc: "Générez vos lettres par IA, envoyez via Gmail et suivez ouvertures et réponses.", href: "/campaigns", cta: "Voir mes campagnes" },
  ];

  return (
    <AppShell>
      <div className="p-6 md:p-8 max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-black text-black">
          Bonjour, <span className="text-[#BF00FF]">{name}</span> 👋
        </h1>
        <p className="text-gray-500 mt-2">Uploadez votre CV pour commencer et découvrir vos secteurs cibles.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {stats.map(s => (
            <Link key={s.label} href={s.href} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-[#BF00FF]/30 transition-all group relative">
              <s.icon className={`w-5 h-5 ${s.color}`} />
              <p className="text-3xl font-black text-black mt-3">{s.value}</p>
              <p className="text-sm font-semibold text-gray-700 mt-1">{s.label}</p>
              <p className="text-xs text-gray-400">{s.sub}</p>
              {s.label === "Crédits disponibles" && (
                <span className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-[#BF00FF]/10 text-[#BF00FF] text-lg flex items-center justify-center">+</span>
              )}
            </Link>
          ))}
        </div>

        <h2 className="text-lg font-black text-black mt-10 mb-4">Votre parcours candidature</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {steps.map(s => (
            <div key={s.n} className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black text-white mb-4 ${
                s.n === 1 ? "bg-[#BF00FF]" : s.n === 2 ? "bg-purple-500" : "bg-black"
              }`}>{s.n}</div>
              <h3 className="font-black text-black">{s.title}</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">{s.desc}</p>
              <Link href={s.href} className="inline-flex items-center gap-1 text-sm font-bold text-[#BF00FF] mt-4 hover:gap-2 transition-all">
                {s.cta} <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
