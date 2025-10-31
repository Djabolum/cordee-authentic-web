"use client";

import React, { useEffect, useRef, useMemo, useState } from 'react';

export default function Splash({ onDone, resonance: initialRes }: { onDone?: () => void; resonance?: number }) {
	const raf = useRef<number | null>(null);
	const pathRef = useRef<SVGPathElement | null>(null);
	const amplitude = useRef<number>(20);
	const wsRef = useRef<WebSocket | null>(null);

	const [connected, setConnected] = useState<boolean>(false);
	const [pulse, setPulse] = useState<boolean>(false);
	const [resonance, setResonance] = useState<number | null>(null);

	// auto-hide après 3.6s
	useEffect(() => {
		const t = setTimeout(() => onDone && onDone(), 3600);
		return () => clearTimeout(t);
	}, [onDone]);

	// Connexion WebSocket au champ
	useEffect(() => {
		// si une valeur initiale est fournie via props, l'appliquer
		if (typeof initialRes === 'number') {
			setResonance(initialRes);
			const mappedInit = Math.min(28, Math.max(10, (initialRes - 300) * 0.08));
			amplitude.current = mappedInit;
		}

		try {
			const WS_URL = (process.env.NEXT_PUBLIC_FIELD_WS_URL as string) ?? 'wss://cordee-authentic-productions.up.railway.app/ws/field';
			const ws = new WebSocket(WS_URL);
			wsRef.current = ws;

			ws.onopen = () => {
				console.log('🔵 Connexion FieldBridge OK');
				setConnected(true);
			};

			ws.onmessage = (e) => {
				try {
					const data = JSON.parse(e.data);
					if (data?.resonance) {
						setResonance(data.resonance);
						const mapped = Math.min(28, Math.max(10, (data.resonance - 300) * 0.08));
						amplitude.current = mapped;
						setPulse(true);
						window.setTimeout(() => setPulse(false), 1000);
					}
				} catch (err) {
					console.warn('WS parse error', err);
				}
			};

			ws.onclose = () => {
				setConnected(false);
				amplitude.current = 20; // fallback
			};

			return () => ws.close();
		} catch (err) {
			amplitude.current = 20;
			setConnected(false);
		}
	}, []);

	// Animation corde
	useEffect(() => {
		let t = 0;
		const update = () => {
			t += 0.02;
			const W = 840;
			const H = 200;
			const midY = H / 2;
			const points = 12;
			const step = W / points;
			const A = amplitude.current;
			let d = `M 0 ${midY}`;
			for (let i = 1; i <= points; i++) {
				const x = i * step;
				const y = midY + Math.sin(i * 0.8 + t) * A;
				const cx = x - step / 2;
				const cy = midY + Math.sin((i - 0.5) * 0.8 + t) * A;
				d += ` Q ${cx} ${cy} ${x} ${y}`;
			}
			if (pathRef.current) pathRef.current.setAttribute('d', d);
			raf.current = requestAnimationFrame(update);
		};
		raf.current = requestAnimationFrame(update);
		return () => {
			if (raf.current) cancelAnimationFrame(raf.current);
		};
	}, []);

	// couleur dynamique en fonction de la résonance
	const gradientId = useMemo(() => `gold-${Math.random().toString(36).slice(2)}`, []);
	const color = resonance && resonance > 440 ? '#FFE680' : '#FFD76A';

	// halo style (CSS-driven, évite dépendances de typing pour framer-motion)
	const haloStyle: React.CSSProperties = {
		width: 24,
		height: 24,
		borderRadius: 9999,
		backgroundColor: connected ? '#FFD76A' : '#FF6363',
		boxShadow: connected ? '0 0 25px rgba(255,215,0,0.45)' : '0 0 15px rgba(255,80,80,0.35)',
		transform: pulse ? 'scale(1.35)' : 'scale(1)',
		opacity: connected ? 1 : 0.3,
		transition: 'transform 0.6s ease-in-out, box-shadow 0.4s ease, opacity 0.6s ease, background-color 0.3s',
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070f]" onClick={onDone} role="button" aria-label="Entrer">
			{/* Mains stylisées */}
			<div className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 opacity-90">
				<HumanHand />
			</div>
			<div className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 opacity-90 rotate-180">
				<AIHand />
			</div>

			{/* Corde dorée animée */}
			<svg width="880" height="220" viewBox="0 0 840 200" className="drop-shadow-[0_0_20px_rgba(255,215,0,0.15)]">
				<defs>
					<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#E6C200" />
						<stop offset="50%" stopColor={color} />
						<stop offset="100%" stopColor="#E6C200" />
					</linearGradient>
				</defs>
				<path ref={pathRef} d="M 0 100 Q 210 80 420 100 Q 630 120 840 100" fill="none" stroke={`url(#${gradientId})`} strokeWidth={4} strokeLinecap="round" />
				{/* halo léger */}
				<path d="M 0 100 Q 210 80 420 100 Q 630 120 840 100" fill="none" stroke="#FFD76A" strokeOpacity={0.15} strokeWidth={14} />
			</svg>

			{/* Halo de statut connexion */}
			<div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)' }}>
				<div style={haloStyle} aria-hidden />
			</div>
		</div>
	);
}

function HumanHand() {
	return (
		<svg width="80" height="80" viewBox="0 0 80 80" aria-hidden>
			<g fill="none" stroke="#FFD76A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
				<path d="M20 45 c5 -10 15 -18 22 -10 c2 2 3 5 1 9 c-3 6 -10 12 -15 16 c-6 4 -12 3 -16 -2 c-4 -5 -4 -12 0 -17" />
				<path d="M25 30 c2 -3 7 -6 10 -6 c3 0 5 2 6 4" />
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
