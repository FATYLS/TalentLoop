"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { login } from "@/lib/store";
import { content } from "@/lib/content";
import { Shield, Zap, Mail } from "lucide-react";

import { GoogleAuthModal } from "@/components/auth/GoogleAuthModal";

export default function ConnexionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleOpen, setGoogleOpen] = useState(false);
  const router = useRouter();
  const a = content.auth.login;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) { login(email, password); router.push("/credits"); }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="bg-black text-white p-12 flex flex-col justify-center">
        <Logo />
        <h1 className="text-4xl font-bold mt-12">{a.title}</h1>
        <p className="text-gray-400 mt-4">{a.desc}</p>
        <div className="space-y-6 mt-10">
          {[
            { icon: Zap, title: "Candidatures automatisées", desc: "Lettres personnalisées par IA + envoi automatique Gmail" },
            { icon: Mail, title: "Suivi en temps réel", desc: "Tableaux de bord, statistiques et gestion de vos prospects" },
            { icon: Shield, title: "Analyse de CV par IA", desc: "Score ATS + recommandations pour optimiser votre profil" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#BF00FF]/20 flex items-center justify-center"><Icon className="w-5 h-5 text-[#BF00FF]" /></div>
              <div><p className="font-semibold">{title}</p><p className="text-sm text-gray-400">{desc}</p></div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-10 text-xs text-gray-500">
          <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Chiffrement AES-256</span>
          <span>Conforme RGPD</span>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-black">Connexion</h2>
          <p className="text-gray-500 text-sm mt-1">Accédez à votre espace candidatures</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="text-sm font-medium text-black">Adresse email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#BF00FF]" />
            </div>
            <div>
              <label className="text-sm font-medium text-black">Mot de passe</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#BF00FF]" />
            </div>
            <Button type="submit" variant="primary" className="w-full">Se connecter</Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-500">ou continuer avec</div>
          <button type="button" onClick={() => setGoogleOpen(true)} className="w-full mt-3 border border-gray-200 rounded-xl py-3 text-sm font-medium hover:border-[#BF00FF]">Continuer avec Google</button>
          <p className="text-center text-sm mt-6 text-gray-500">
            Pas encore de compte ? <Link href="/inscription" className="text-[#BF00FF] font-medium">Commencer gratuitement</Link>
          </p>
          <p className="text-center text-sm mt-2"><Link href="#" className="text-gray-400">Mot de passe oublié ?</Link></p>
          <div className="flex justify-center gap-4 mt-4 text-xs text-gray-400">
            <span>Données chiffrées</span><span>RGPD</span>
          </div>
        </div>
      </div>
      <GoogleAuthModal open={googleOpen} onClose={() => setGoogleOpen(false)} onSuccess={() => router.push("/credits")} />
    </div>
  );
}
