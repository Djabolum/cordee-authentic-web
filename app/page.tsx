"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Splash from '../components/SplashLottie';

export default function Page() {
  const [resonance, setResonance] = useState<number | null>(null);
  const [intent, setIntent] = useState<string>('');
  const [status, setStatus] = useState<string>('En attente de connexion...');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch('https://field.ton-domaine.fr/field/last');
        if (!res.ok) throw new Error('Erreur serveur');
        const data = await res.json();
        setResonance(data.resonance);
        setIntent(data.intent);
        setStatus('Champ actif');
      } catch (err) {
        setStatus('Hors ligne');
      }
    };
    fetchFeedback();

  }, []);

  return (
    <>
      {showSplash && <Splash resonance={resonance ?? 432} onDone={() => setShowSplash(false)} />}
      <main className="min-h-screen bg-[#05070f] text-slate-100">
        <header className="mx-auto max-w-6xl px-6 pt-20 pb-12 text-center">
          <h1 className="text-4xl font-bold">Cordée Authentique</h1>
          <p className="mt-4 text-slate-300">Une présence connectée</p>
        </header>

        <section className="mx-auto max-w-6xl px-6 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <MonitorStat label="Résonance" value={resonance ? String(resonance) : '—'} />
            <MonitorStat label="Intention" value={intent || '—'} />
            <MonitorStat label="Status field" value={status} />
          </div>
        </section>

        <footer className="mx-auto max-w-6xl px-6 pb-16">
          <div className="h-px w-full bg-white/5 mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <span>© {new Date().getFullYear()} Cordée Authentique</span>
            <span className="opacity-70">Chaque présence compte. Merci d’être là.</span>
          </div>
        </footer>
      </main>
    </>
  );
}

function MonitorStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 px-6 py-4 border border-white/10">
      <p className="text-sm text-slate-400 mb-1">{label}</p>
      <p className="text-lg font-semibold text-slate-100">{value}</p>
    </div>
  );
}
