import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito, Pacifico } from "next/font/google";
import { birthday as b } from "@/data/birthday";
import "./globals.css";

const display = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const sans = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});
const script = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: b.seo.title,
  description: b.seo.description,
  openGraph: {
    title: b.seo.title,
    description: b.seo.description,
    images: [{ url: b.seo.image, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: b.seo.title,
    description: b.seo.description,
    images: [b.seo.image],
  },
};
export const viewport: Viewport = {
  themeColor: b.theme.background,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const t = b.theme;
  const vars = {
    "--color-background": t.background,
    "--color-surface": t.surface,
    "--color-primary": t.primary,
    "--color-accent": t.accent,
    "--color-gold": t.accent,
    "--color-rose": t.rose,
    "--color-sage": t.sage,
    "--color-text": t.text,
    "--color-muted": t.muted,
  } as React.CSSProperties;
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${script.variable}`} style={vars}>
      <body>{children}</body>
    </html>
  );
}
