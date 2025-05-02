import { ReactNode } from "react";
import Head from "next/head";
import Navbar from "@/components/Header/Navbar";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export const Layout = ({ children, title, description }: LayoutProps) => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content={
            description ||
            "Conditions d'utilisation de notre site de vente eCommerce."
          }
        />
        {title && <title>{title}</title>}
      </Head>

      <header className="container mt-6 mx-auto">
        <Navbar />
      </header>

      <main className="max-w-3xl mx-auto p-6" role="main">
        {children}
      </main>
    </>
  );
};
