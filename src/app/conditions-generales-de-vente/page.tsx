import React from "react";
import PageLayoutBanner from "@/components/Layouts/PageLayoutBanner";
import { generalSalesConditionsItems } from "@/components/Accordions/generalSalesConditionsItems";

export default function GuaranteePage() {
  return (
    <PageLayoutBanner
      title="conditions generales de vente"
      description="Nos conditions générales de vente détaillent les termes et conditions applicables à toutes vos commandes sur SofaChic, assurant clarté et transparence pour une expérience d'achat en toute confiance."
      bannerImage={"service-img.png"}
    >
      <main className="relative">
        <article className="container mx-auto">
          <header className="mt-12 text-center px-4 mb-12">
            <div
              className="bg-red-700 w-1/3 h-3 mb-8 mx-auto"
              role="presentation"
            ></div>
            <p className="text-white text-lg max-w-3xl mx-auto mb-8 lg:px-0 px-6">
            {`  Bienvenue chez SofaChic. Nous sommes ravis de vous compter parmi
              nos clients. Les présentes Conditions Générales de Vente (CGV)
              régissent les relations contractuelles entre SofaChic et ses
              clients pour toutes les commandes passées sur notre site
              e-commerce. Nous vous invitons à les lire attentivement avant
              toute transaction. Elles définissent les modalités de commande,
              de paiement, de livraison et de garantie, ainsi que nos
              engagements et vos droits en tant qu'acheteur. Votre confiance
              est notre priorité, c&apos;est pourquoi nous nous engageons à vous
              offrir des produits de qualité et un service client impeccable.`}
            </p>
          </header>

          <section className="mb-12 lg:px-0 px-6 max-w-3xl mx-auto">
            <h2 className="font-bold text-3xl text-left sm:text-center mb-12">
              Conditions Générales de Vente
            </h2>
            {
              generalSalesConditionsItems.map((item) => (
                <div key={item.value} className="mb-8">
                  <h3 id={item.value} className="font-semibold text-xl mb-4">{item.trigger}</h3>
                  <div>{item.content}</div>
                </div>
              ))
            }
          </section>
        </article>
      </main>
    </PageLayoutBanner>
  );
}
