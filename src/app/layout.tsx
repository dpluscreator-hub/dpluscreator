import type { Metadata } from "next";
import { Inter, Space_Grotesk, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dpluscreator.com"),
  title: {
    default: "DPLUS Creator - Creative Digital Agency",
    template: "%s | DPLUS Creator",
  },
  description: "A creative social media agency focused on helping brands grow and stand out online. Branding, Content Creation, Social Media Strategy, Ads & Marketing.",
  keywords: ["digital agency", "branding", "web design", "social media", "marketing", "content creation", "graphic design", "video editing"],
  authors: [{ name: "DPLUS Creator" }],
  creator: "DPLUS Creator",
  publisher: "DPLUS Creator",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dpluscreator.com",
    siteName: "DPLUS Creator",
    title: "DPLUS Creator - Creative Digital Agency",
    description: "A creative social media agency focused on helping brands grow and stand out online.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DPLUS Creator - Growth Over Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DPLUS Creator - Creative Digital Agency",
    description: "A creative social media agency focused on helping brands grow and stand out online.",
    images: ["/og-image.png"],
    creator: "@dpluscreator",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${poppins.variable} font-sans antialiased text-dark`}>
        <SmoothScroll />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#fff',
              border: '1px solid rgba(245, 166, 35, 0.2)',
            },
          }}
        />
        <div id="modal-root" />
      </body>
    </html>
  );
}
