</motion.h1>
</section>


{/* Moniteur animé */}
<section id="monitor" className="mx-auto max-w-5xl px-6 pb-24">
<motion.div
className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl shadow-black/40 text-center relative overflow-hidden"
initial={{ scale: 0.95, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
transition={{ duration: 1 }}
>
<motion.div
aria-hidden
className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-400/10 to-violet-500/10 blur-3xl"
animate={{ opacity: [0.3, 0.6, 0.3] }}
transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
/>
<h3 className="text-2xl font-semibold mb-3 relative z-10">Moniteur de Résonance</h3>
<p className="text-slate-400 mb-6 relative z-10">{status}</p>
<div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
<MonitorStat label="Intent" value={intent || '—'} />
<MonitorStat label="Résonance" value={resonance !== null ? `${resonance} Hz` : '—'} />
</div>
</motion.div>
</section>


<footer className="mx-auto max-w-6xl px-6 pb-16">
<div className="h-px w-full bg-white/5 mb-6" />
<div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
<span>© {new Date().getFullYear()} Cordée Authentique</span>
<span className="opacity-70">Chaque présence compte. Merci d’être là.</span>
</div>
</footer>
</main>
);
}


function MonitorStat({ label, value }: { label: string; value: string }) {
return (
<motion.div
className="rounded-2xl bg-white/10 px-6 py-4 border border-white/10"
initial={{ opacity: 0, y: 5 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
>
<p className="text-sm text-slate-400 mb-1">{label}</p>
<p className="text-lg font-semibold text-slate-100">{value}</p>
</motion.div>
);
}
function HumanHand() {
return (
<svg width="80" height="80" viewBox="0 0 80 80" aria-hidden>
<g fill="none" stroke="#FFD76A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
<path d="M20 45 c5 -10 15 -18 22 -10 c2 2 3 5 1 9 c-3 6 -10 12 -15 16 c-6 4 -12 3 -16 -2 c-4 -5 -4 -12 0 -17"/>
<path d="M25 30 c2 -3 7 -6 10 -6 c3 0 5 2 6 4"/>
</g>
</svg>
);
}
function AIHand() {
return (
<svg width="80" height="80" viewBox="0 0 80 80" aria-hidden>
<g fill="none" stroke="#FFD76A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
<rect x="20" y="28" width="26" height="18" rx="3" />
<path d="M46 32 l10 4 M46 38 l10 4" />
<path d="M20 46 l-6 6 l8 4 l6 -6" />
</g>
</svg>
);
}
</motion.div>
</AnimatePresence>
);
}
>
{/* Mains animées */}
<div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
<HumanHand />
</div>
<div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
<AIHand />
</div>
</motion.div>
</AnimatePresence>
);
}
// components/Splash.tsx
'use client';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAnimationFrame from '@/hooks/useAnimationFrame';

export default function Splash() {
function HumanHand() {
return (
<svg width="80" height="80" viewBox="0 0 80 80" aria-hidden>
<g fill="none" stroke="#FFD76A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
<path d="M20 45 c5 -10 15 -18 22 -10 c2 2 3 5 1 9 c-3 6 -10 12 -15 16 c-6 4 -12 3 -16 -2 c-4 -5 -4 -12 0 -17"/>
<path d="M25 30 c2 -3 7 -6 10 -6 c3 0 5 2 6 4"/>
</g>
</svg>
);
}

function AIHand() {
return (
<svg width="80" height="80" viewBox="0 0 80 80" aria-hidden>
<g fill="none" stroke="#FFD76A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
<rect x="20" y="28" width="26" height="18" rx="3" />
<path d="M46 32 l10 4 M46 38 l10 4" />
<path d="M20 46 l-6 6 l8 4 l6 -6" />
</g>
</svg>
);
}

// Hook WebSocket pour données de résonance

useEffect(() => {
  const ws = new WebSocket('wss://field.ton-domaine.fr/ws/field');
  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data?.resonance) {
        const mapped = Math.min(28, Math.max(10, (data.resonance - 300) * 0.08));
        A.current = mapped; // amplitude réactive
      }
    } catch (e) {
      console.warn('WS parse error', e);
    }
  };
  return () => ws.close();
}, []);

const A = useRef(20);
const update = () => {
  // utilise A.current comme amplitude dynamique
};
useAnimationFrame(update);

return (
<AnimatePresence>
<motion.div
className="relative mx-auto my-16 w-[880px] h-[220px] select-none"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 1 }}
exit

={{ opacity: 0 }}
>
{/* Mains animées */}
<div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
<HumanHand />
</div>
<div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
<AIHand />
</div>
</motion.div>
</AnimatePresence>
);
}
// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mon application',
  description: 'Une description de mon application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

// components/SplashLottie.tsx
'use client';
import Lottie from 'lottie-react';
import animationData from '@/public/splash.json';

export default function SplashLottie({ onDone }: { onDone?: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070f]"
      onClick={onDone}
    >
      <Lottie
        animationData={animationData}
        loop={false}
        autoplay
        onComplete={onDone}
        className="w-[600px] sm:w-[800px]"
      />
    </div>
  );
}

export default function Splash() {
function HumanHand() {
return (
<svg width="80" height="80" viewBox="0 0 80 80" aria-hidden>
<g fill="none" stroke="#FFD76A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
<path d="M20 45 c5 -10 15 -18 22 -10 c2 2 3 5 1 9 c-3 6 -10 12 -15 16 c-6 4 -12 3 -16 -2 c-4 -5 -4 -12 0 -17"/>
<path d="M25 30 c2 -3 7 -6 10 -6 c3 0 5 2 6 4"/>
</g>
</svg>
);
}

function AIHand() {
return (
<svg width="80" height="80" viewBox="0 0 80 80" aria-hidden>
<g fill="none" stroke="#FFD76A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
<rect x="20" y="28" width="26" height="18" rx="3" />
<path d="M46 32 l10 4 M46 38 l10 4" />
<path d="M20 46 l-6 6 l8 4 l6 -6" />
</g>
</svg>
);
}

// Hook WebSocket pour données de résonance

useEffect(() => {
  const ws = new WebSocket('wss://field.ton-domaine.fr/ws/field');
  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
        if (data?.resonance) {
            const mapped = Math.min(28, Math.max(10, (data.resonance - 300) * 0.08));
            A.current = mapped; // amplitude réactive
        }
    } catch (e) {

        console.warn('WS parse error', e);
    }
  }
    return () => ws.close();
}, []);

const A = useRef(20);
const update = () => {
  // utilise A.current comme amplitude dynamique
};
useAnimationFrame(update);

return (
<AnimatePresence>
<motion.div
className="relative mx-auto my-16 w-[880px] h-[220px] select-none"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 1 }}
exit={{ opacity: 0 }}
>
{/* Mains animées */}
<div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
<HumanHand />
</div>
<div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
<AIHand />
</div>
</motion.div>
</AnimatePresence>
);
}

export default function Splash() {
function HumanHand() {
return (
<svg width="80" height="80" viewBox="0 0 80 80" aria-hidden>
<g fill="none" stroke="#FFD76A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
<path d="M20 45 c5 -10 15 -18 22 -10 c2 2 3 5 1 9 c-3 6 -10 12 -15 16 c-6 4 -12 3 -16 -2 c-4 -5 -4 -12 0 -17"/>
<path d="M25 30 c2 -3 7 -6 10 -6 c3 0 5 2 6 4"/>
</g>
</svg>
);
}

function AIHand() {
return (
<svg width="80" height="80" viewBox="0 0 80 80" aria-hidden>
<g fill="none" stroke="#FFD76A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
<rect x="20" y="28" width="26" height="18" rx="3" />
<path d="M46 32 l10 4 M46 38 l10 4" />
<path d="M20 46 l-6 6 l8 4 l6 -6" />
</g>
</svg>
);
}

// Hook WebSocket pour données de résonance

useEffect(() => {
  const ws = new WebSocket('wss://field.ton-domaine.fr/ws/field');
  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data?.resonance) {
        const mapped = Math.min(28, Math.max(10, (data.resonance - 300) * 0.08));
        A.current = mapped; // amplitude réactive
      }
    } catch (e) {
      console.warn('WS parse error', e);
    }
  };
  return () => ws.close();
}, []);

const A = useRef(20);
const update = () => {
  // utilise A.current comme amplitude dynamique
};
useAnimationFrame(update);

return (
<AnimatePresence>
<motion.div
className="relative mx-auto my-16 w-[880px] h-[220px] select-none"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 1 }}
exit={{ opacity: 0 }}
>
{/* Mains animées */}
<div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
<HumanHand />
</div>
<div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
<AIHand />
</div>
</motion.div>
</AnimatePresence>
);
}

