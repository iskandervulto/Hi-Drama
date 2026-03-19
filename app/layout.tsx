import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { JsonLd, organizationSchema } from "@/lib/schema";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://hi-drama.org"
  ),
  title: {
    default: "Hi! Drama — Theater Reviews",
    template: "%s | Hi! Drama",
  },
  description:
    "Theater reviews by Hi! Drama — watch the video review, read the review, and discover your next night out at the theater.",
  openGraph: {
    siteName: "Hi! Drama",
    type: "website",
    images: [
      {
        url: "/theater-masks.jpg",
        width: 1200,
        height: 630,
        alt: "Hi! Drama — Theater Reviews",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/theater-masks.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className="min-h-screen flex flex-col">
        <JsonLd data={organizationSchema()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
