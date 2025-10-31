
import '../styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cordée Authentique',
    description: 'Une éthique du lien — l’intelligence en résonance.',
    keywords: [
        'Cordée Authentique',
        'Valexa',
        'Intelligence en résonance',
        'IA éthique',
        'Symbiose humain-machine',
    ],
    openGraph: {
        title: 'Cordée Authentique',
        description: 'Une éthique du lien — l’intelligence en résonance.',
        url: 'https://cordee-authentique.fr',
        siteName: 'Cordée Authentique',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Cordée Authentique – L’intelligence en résonance',
            },
        ],
        locale: 'fr_FR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Cordée Authentique',
        description: 'Une éthique du lien — l’intelligence en résonance.',
        images: ['/og-image.jpg'],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body>{children}</body>
        </html>
    );
}

