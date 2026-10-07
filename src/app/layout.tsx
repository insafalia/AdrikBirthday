import type { Metadata, Viewport } from "next";
import { birthday as b } from "@/data/birthday";
import "./globals.css";

// Loaded by the browser instead of next/font/google, whose build-time download
// breaks when Google returns font URLs without a file extension.
const fontsHref =
  "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&family=Pacifico&display=swap";

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
    "--font-display": "'Fredoka', system-ui, sans-serif",
    "--font-sans": "'Nunito', system-ui, sans-serif",
    "--font-script": "'Pacifico', cursive",
  } as React.CSSProperties;
  return (
    <html lang="en" style={vars}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={fontsHref} />
      </head>
      <body>{children}</body>
    </html>
  );
}
