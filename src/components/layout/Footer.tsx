import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Shield } from "lucide-react";
import { brand } from "@/lib/brand";

const fonctionnalites = [
  { label: "Analyse de CV", href: "/profile" },
  { label: "Recherche entreprises", href: "/prospects" },
  { label: "Campagnes d'envoi", href: "/campaigns" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tarifs & crédits", href: "/tarifs" },
];

const ressources = [
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "#" },
  { label: "Données & Performances", href: "#" },
  { label: `${brand.name} & RGPD`, href: "#" },
];

const legal = [
  "Politique de confidentialité", "Conditions d'utilisation",
  "Mentions légales", "Politique de remboursement",
];

export function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-10">
        <div>
          <div className="[&_span]:!text-white">
            <Logo light />
          </div>
          <p className="text-gray-400 text-sm mt-4">{brand.tagline}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Fonctionnalités</h3>
          <div className="space-y-2 text-sm text-gray-400">
            {fonctionnalites.map(l => <Link key={l.href} href={l.href} className="block hover:text-[#BF00FF]">{l.label}</Link>)}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Ressources</h3>
          <div className="space-y-2 text-sm text-gray-400">
            {ressources.map(l => <Link key={l.label} href={l.href} className="block hover:text-[#BF00FF]">{l.label}</Link>)}
          </div>
          <h3 className="font-semibold mb-4 mt-8">Légal</h3>
          <div className="space-y-2 text-sm text-gray-400">
            {legal.map(l => <p key={l}>{l}</p>)}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Sécurité</h3>
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <Shield className="w-4 h-4 text-[#BF00FF]" /> Données chiffrées AES-256
          </div>
          <p className="text-sm text-gray-400">Conforme RGPD</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        © 2026 {brand.name}, Tous droits réservés
      </div>
    </footer>
  );
}
