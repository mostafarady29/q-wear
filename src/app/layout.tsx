import type { Metadata } from 'next';
import './globals.css';
import ClientShell from '@/components/layout/ClientShell';

export const metadata: Metadata = {
  title: 'Q // ARCHIVAL WEAR & BRUTALIST ATELIER',
  description: 'Ultra-heavyweight 520 GSM loopback cotton, Okayama raw selvedge denim, and modular utilitarian wear crafted between Tokyo and Milan.',
  keywords: ['streetwear', 'luxury fashion', '520 GSM hoodie', 'selvedge denim', 'Q wear', 'brutalist clothing', 'minimalist aesthetic'],
  icons: {
    icon: '/favicon.png',
    apple: '/icon-192.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-white min-h-screen antialiased">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
