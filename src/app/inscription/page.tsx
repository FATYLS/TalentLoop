"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { register } from "@/lib/store";
import { content } from "@/lib/content";
import { Shield, Zap, Mail } from "lucide-react";

import { GoogleAuthModal } from "@/components/auth/GoogleAuthModal";

export default function InscriptionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [googleOpen, setGoogleOpen] = useState(false);
  const router = useRouter();
  const a = content.auth.signup;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) { register(email, password); router.push("/credits"); }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="bg-black text-white p-12 flex flex-col justify-center">
        <Logo />
        <p className="text-[#BF00FF] text-sm font-semibold mt-8">{a.credits}</p>
        <h1 className="text-4xl font-bold mt-4">{a.title}<br /><span className="text-[#BF00FF]">{a.titleAccent}</span></h1>
        <p className="text-gray-400 mt-4">{a.desc}</p>
        <div className="space-y-6 mt-10">
          {[
            { icon: Zap, title: "Lettres uniques par IA", desc: "Personnalisées pour chaque entreprise en 30 secondes" },
            { icon: Mail, title: "Envoi automatique Gmail", desc: "CV + lettre envoyés directement depuis votre compte" },
            { icon: Shield, title: "Analyse de CV", desc: "Score ATS + suggestions pour optimiser votre profil" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#BF00FF]/20 flex items-center justify-center"><Icon className="w-5 h-5 text-[#BF00FF]" /></div>
              <div><p className="font-semibold">{title}</p><p className="text-sm text-gray-400">{desc}</p></div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-8">+1k {a.social}</p>
        <div className="flex gap-4 mt-6 text-xs text-gray-500">
          <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Chiffrement AES-256</span>
          <span>Conforme RGPD</span>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <p className="text-[#BF00FF] text-sm font-semibold">{a.credits}</p>
          <h2 className="text-2xl font-bold text-black mt-2">Créer un compte</h2>
          <p className="text-gray-500 text-sm mt-4">{a.cta}</p>
          <div className="flex gap-2 mt-4 text-xs">
            {["Lettres IA", "Envoi auto", "Analyse CV"].map(t => (
              <span key={t} className="bg-gray-100 px-3 py-1 rounded-full text-gray-600">{t}</span>
            ))}
          </div>
          <button type="button" onClick={() => setGoogleOpen(true)} className="w-full mt-6 border border-gray-200 rounded-xl py-3 text-sm font-medium hover:border-[#BF00FF]">Continuer avec Google</button>
          <div className="flex items-center gap-4 my-6"><div className="flex-1 h-px bg-gray-200" /><span className="text-xs text-gray-400">Ou avec email</span><div className="flex-1 h-px bg-gray-200" /></div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Adresse email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#BF00FF]" />
            </div>
            <div>
              <label className="text-sm font-medium">Mot de passe</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#BF00FF]" />
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500">{a.newsletter}</p>
              <label className="flex items-start gap-3 mt-3 cursor-pointer">
                <input type="checkbox" checked={newsletter} onChange={e => setNewsletter(e.target.checked)} className="mt-1 accent-[#BF00FF]" />
                <div>
                  <p className="text-sm font-medium text-black">{a.newsletterLabel}</p>
                  <p className="text-xs text-gray-400">{a.newsletterSub}</p>
                </div>
              </label>
            </div>
            <Button type="submit" variant="primary" className="w-full">Créer mon compte</Button>
          </form>
          <p className="text-xs text-gray-400 mt-4 text-center">{a.legal}</p>
          <p className="text-center text-sm mt-6 text-gray-500">
            Déjà un compte ? <Link href="/connexion" className="text-[#BF00FF] font-medium">Se connecter</Link>
          </p>
          <div className="flex justify-center gap-4 mt-4 text-xs text-gray-400">
            <span>Chiffré</span><span>RGPD</span>
          </div>
        </div>
      </div>
      <GoogleAuthModal open={googleOpen} onClose={() => setGoogleOpen(false)} onSuccess={() => router.push("/credits")} />
    </div>
  );
}
