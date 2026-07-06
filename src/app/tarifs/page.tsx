import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { PricingCards, PricingTable } from "@/components/landing/PricingCards";
import { content } from "@/lib/content";

export default function TarifsPage() {
  return (
    <>
      <Navbar />
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#BF00FF] font-bold text-xs uppercase tracking-widest">{content.pricing.label}</p>
          <h1 className="text-4xl font-black text-black mt-3">Passez à la vitesse supérieure</h1>
          <p className="text-gray-600 mt-3">{content.pricing.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-gray-500">
            <span>Sans engagement</span>
            <span>·</span>
            <span>Paiement sécurisé Stripe</span>
            <span>·</span>
            <span>Crédits illimités dans le temps</span>
            <span>·</span>
            <span>Remboursement possible sous 7 jours</span>
          </div>

          <h2 className="text-xl font-black text-black mt-16 mb-2">Plans d&apos;abonnement</h2>
          <p className="text-sm text-gray-500 mb-10">Crédits rechargés chaque mois · Annulez à tout moment</p>

          <PricingCards showPacks />
          <PricingTable />

          <div className="mt-16 bg-[#fafafa] rounded-2xl p-8 border border-gray-100">
            <p className="text-gray-600 text-sm">
              Pas encore prêt à vous abonner ? Testez gratuitement avec <strong>1 000 crédits offerts</strong> (~5 candidatures) et l&apos;analyse CV offerte.
            </p>
            <Button href="/inscription" variant="primary" className="mt-4">Essai gratuit</Button>
          </div>

          <p className="text-xs text-gray-400 mt-10">{content.pricing.footer}</p>
        </div>
      </section>
      <Footer />
    </>
  );
}
