import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <main className="flex flex-col min-h-screen bg-black">
      <section className="flex items-center justify-center flex-grow">
        <article className="text-center max-w-md w-full px-4">
          <header>
            <h1 className="sr-only">Page non trouvée</h1>
          </header>

          <figure className="mb-8">
            <Image
              src="/error.webp"
              alt="Erreur 404 - Page non trouvée"
              width={1000}
              height={1000}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              priority
            />

            <figcaption className="sr-only">
              Image illustrant l'erreur 404
            </figcaption>
          </figure>
          <Card />

          <p className="text-white text-xl mb-6">
            Oups ! La page que vous recherchez semble introuvable.
          </p>

          <nav aria-label="Navigation de secours">
            <Link href="/home" className="inline-block">
              <Button className="flex items-center gap-2 px-6 py-3 text-lg transition-all hover:scale-105">
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                <span>Retour à l'accueil</span>
              </Button>
            </Link>
          </nav>
        </article>
      </section>

      <footer className="py-4 text-center text-white/60 text-sm">
        <p>&copy; {new Date().getFullYear()} - Votre Boutique E-commerce</p>
      </footer>
    </main>
  );
}
