"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { loginWithGoogle } from "@/lib/store";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const GOOGLE_ACCOUNTS = [
  { email: "fatimazahrais037@gmail.com", name: "Fatima Zahra" },
  { email: "marie.dupont@gmail.com", name: "Marie Dupont" },
  { email: "thomas.dev@gmail.com", name: "Thomas Dev" },
];

export function GoogleAuthModal({ open, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState<string | null>(null);

  if (!open) return null;

  const pick = (email: string, name: string) => {
    setLoading(email);
    setTimeout(() => {
      loginWithGoogle(email, name);
      setLoading(null);
      onSuccess();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            <span className="font-semibold text-gray-700">Se connecter avec Google</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <p className="px-6 pt-4 text-sm text-gray-500">Choisissez un compte pour continuer vers TalentLoop</p>
        <div className="p-4 space-y-2">
          {GOOGLE_ACCOUNTS.map(acc => (
            <button key={acc.email} onClick={() => pick(acc.email, acc.name)} disabled={!!loading}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#BF00FF] hover:bg-[#BF00FF]/5 transition-all text-left disabled:opacity-60">
              <div className="w-10 h-10 rounded-full bg-[#BF00FF] text-white font-bold flex items-center justify-center">
                {acc.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-black">{acc.name}</p>
                <p className="text-xs text-gray-400 truncate">{acc.email}</p>
              </div>
              {loading === acc.email && (
                <div className="w-5 h-5 border-2 border-[#BF00FF] border-t-transparent rounded-full animate-spin" />
              )}
            </button>
          ))}
        </div>
        <p className="px-6 pb-4 text-[10px] text-gray-400 text-center">
          Mode démo — aucune connexion Google réelle. Vos données restent en local.
        </p>
      </div>
    </div>
  );
}
