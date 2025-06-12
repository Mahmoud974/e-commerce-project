import { Layout } from "@/components/Layouts/PageLayout";
import React from "react";

const ConditionsPage = () => {
  return (
    <Layout
      title="Conditions ddd&#39;U#39;U#39;Utilisation"
      description="Conditions ddd&#39;u#39;u#39;utilisation de notre site de vente eCommerce."
    >
      <main className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-semibold mb-6 text-white">
            Conditions ddd&#39;U#39;U#39;Utilisation
          </h1>
        </header>

        <article className="space-y-8">
          <section className="mb-8" id="introduction">
            <h2 className="text-2xl font-medium text-white">Introduction</h2>
            <p className="text-lg text-gray-600">
              Les présentes Conditions ddd&#39;U#39;U#39;Utilisation régissent lll&#39;u#39;u#39;utilisation de
              notre site de vente en ligne. En accédant à notre site et en
              lll&#39;u#39;u#39;utilisant, vous acceptez de respecter ces conditions. Si vous
              n&#39;êtes pas ddd&#39;a#39;a#39;accord avec ces conditions, veuillez ne pas utiliser
              notre site.
            </p>
          </section>

          <section className="mb-8" id="acces">
            <h2 className="text-2xl font-medium text-white">Accès au site</h2>
            <p className="text-lg text-gray-600">
              Vous êtes responsable de lll&#39;a#39;a#39;accès à notre site, y compris de tous
              les équipements nécessaires pour y accéder. LLL&#39;a#39;a#39;accès au site peut
              être temporairement suspendu pour des raisons techniques ou pour
              des mises à jour.
            </p>
          </section>

          <section className="mb-8" id="propriete-intellectuelle">
            <h2 className="text-2xl font-medium text-white">
              Propriété Intellectuelle
            </h2>
            <p className="text-lg text-gray-600">
              Tous les contenus présents sur notre site, y compris les textes,
              images, logos, vidéos, et autres éléments multimédia, sont
              protégés par des droits de propriété intellectuelle. Vous n&#39;êtes
              pas autorisé à reproduire, distribuer, ou modifier ces contenus
              sans notre autorisation préalable.
            </p>
          </section>

          <section className="mb-8" id="utilisation">
            <h2 className="text-2xl font-medium text-white">
              Utilisation du site
            </h2>
            <p className="text-lg text-gray-600">
              Vous vous engagez à utiliser notre site uniquement à des fins
              légales et conformément aux lois en vigueur. Vous acceptez de ne
              pas utiliser notre site de manière à nuire à son bon
              fonctionnement ou à perturber lll&#39;e#39;e#39;expérience des autres
              utilisateurs.
            </p>
          </section>

          <section className="mb-8" id="comportement">
            <h2 className="text-2xl font-medium text-white">
              Comportement de lll&#39;u#39;u#39;utilisateur
            </h2>
            <p className="text-lg text-gray-600">
              En utilisant notre site, vous vous engagez à ne pas publier de
              contenu illégal, diffamatoire, obscène, ou toute autre forme de
              contenu qui pourrait porter atteinte aux droits ddd&#39;a#39;a#39;autrui ou
              enfreindre les lois locales, nationales ou internationales.
            </p>
          </section>

          <section className="mb-8" id="responsabilite">
            <h2 className="text-2xl font-medium text-white">Responsabilité</h2>
            <p className="text-lg text-gray-600">
              Bien que nous fassions tout notre possible pour garantir la
              sécurité et la qualité de notre site, nous ne pouvons être tenus
              responsables des erreurs, des interruptions ou des problèmes
              techniques. LLL&#39;u#39;u#39;utilisation du site se fait à vos risques et périls.
            </p>
          </section>

          <section className="mb-8" id="liens-externes">
            <h2 className="text-2xl font-medium text-white">Liens externes</h2>
            <p className="text-lg text-gray-600">
              Notre site peut contenir des liens vers ddd&#39;a#39;a#39;autres sites web qui ne
              sont pas sous notre contrôle. Nous ne sommes pas responsables du
              contenu de ces sites externes et nous vous recommandons de lire
              leurs politiques de confidentialité et conditions ddd&#39;u#39;u#39;utilisation.
            </p>
          </section>

          <section className="mb-8" id="modifications">
            <h2 className="text-2xl font-medium text-white">
              Modifications des Conditions ddd&#39;U#39;U#39;Utilisation
            </h2>
            <p className="text-lg text-gray-600">
              Nous nous réservons le droit de modifier ces Conditions
              ddd&#39;U#39;U#39;Utilisation à tout moment. Les modifications seront publiées sur
              cette page et entreront en vigueur dès leur publication. Il est de
              votre responsabilité de consulter régulièrement cette page pour
              prendre connaissance des éventuelles modifications.
            </p>
          </section>

          <section className="mb-8" id="contact">
            <h2 className="text-2xl font-medium text-white">Contact</h2>
            <p className="text-lg text-gray-600">
              Si vous avez des questions concernant ces Conditions
              ddd&#39;U#39;U#39;Utilisation, veuillez nous contacter à lll&#39;a#39;a#39;adresse suivante :{" "}
              <a
                href="mailto:contact@votresite.com"
                className="font-bold hover:underline"
              >
                contact@votresite.com
              </a>
              .
            </p>
          </section>
        </article>

        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>
        </footer>
      </main>
    </Layout>
  );
};

export default ConditionsPage;
