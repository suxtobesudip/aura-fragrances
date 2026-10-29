import type { Metadata, Viewport } from 'next';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import BackgroundOrbs from '@/components/BackgroundOrbs';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import Footer from '@/components/Footer';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EFE7DA" },
    { media: "(prefers-color-scheme: dark)", color: "#14101A" },
  ],
};

export const metadata: Metadata = {
  title: 'AURA Parfums — Liquid Glass Haute Parfumerie',
  description:
    'Calm, luminous, editorial fragrances blended in small batches. 28% Extrait de Parfum, French borosilicate crystal parfums, and scents that survive hot weather.',
  keywords: [
    'luxury perfume',
    'niche fragrance',
    'extrait de parfum',
    'borosilicate crystal perfume',
    'Velvet Peony',
    'Smoked Amber',
    'Salt & Fig',
    'Indian luxury perfumery',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#E8D3A8]/40 selection:text-black">
        <StoreProvider>
          {/* Ambient Drifting Liquid Glass Color Orbs & Grain */}
          <BackgroundOrbs />

          {/* Floating Pill Glass Navbar */}
          <Navbar />

          {/* Main Page Content */}
          <main className="flex-1 relative z-10 pt-20 sm:pt-24">{children}</main>

          {/* Global Cart Slide-Out Drawer */}
          <CartDrawer />

          {/* Global Product Quick View Modal */}
          <QuickViewModal />

          {/* Footer */}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
