import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import QueryProvider from "@/app/hook/__provider";
import SessionWrapper from "./SessionWrapper";
import Informations from "@/components/BottomSection/Informations";
import HelpSection from "@/components/BottomSection/HelpSection";
import Newsletter from "@/components/BottomSection/Newsletter";
import Footer from "@/components/BottomSection/Footer";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
  title: "SOFA CHIC | Découvrez Notre Collection Exclusive de Canapés",
  description: "Des canapés design, confortables et personnalisables pour tous les intérieurs. Plongez dans le confort moderne.",
  keywords: ["canapé", "sofa", "meuble", "design", "confortable", "personnalisable", "salon"],
  openGraph: {
    title: 'SOFA CHIC: Canapés Design Exclusifs',
    description: 'Découvrez notre collection unique de canapés modernes.',
    siteName: 'SOFA CHIC',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={` antialiased`}>
          <QueryProvider>
            <Suspense fallback={<div className="min-h-screen" />}>
              <NuqsAdapter>{children}</NuqsAdapter>
            </Suspense>
          </QueryProvider>
          <Informations />
          <Newsletter />
          <HelpSection />
          <div className="container mx-auto">
            <Footer />
          </div>
        </body>
      </html>
    </SessionWrapper>
  );
}
