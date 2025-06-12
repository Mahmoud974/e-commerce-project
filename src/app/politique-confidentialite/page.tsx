import { Layout } from "@/components/Layouts/PageLayout";
import Head from "next/head";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <Head>
        <title>Politique de Confidentialité</title>
        <meta
          name="description"
          content="Politique de confidentialité de notre site de vente eCommerce."
        />
      </Head>

      <h1 className="text-4xl font-semibold mb-6 text-neutral-900 dark:text-white">
        Politique de Confidentialité
      </h1>

      <section className="mb-8" aria-labelledby="intro">
        <h2
          id="intro"
          className="text-2xl font-medium text-neutral-800 dark:text-white"
        >
          Introduction
        </h2>
        <p className="text-lg text-gray-600 ">
          Cette politique de confidentialité décrit comment nous collectons,
          utilisons et protégeons vos informations personnelles lorsque vous
          utilisez notre site de vente en ligne. En utilisant notre site, vous
          acceptez les termes de cette politique.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="info">
        <h2
          id="info"
          className="text-2xl font-medium text-neutral-800 dark:text-white"
        >
          Informations collectées
        </h2>
        <p className="text-lg text-gray-600 ">
          Nous collectons des informations personnelles lorsque vous effectuez
          un achat, vous inscrivez sur notre site ou nous contactez pour toute
          question. Les informations collectées peuvent inclure votre nom,
          adresse e-mail, adresse de livraison, et informations de paiement.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="usage">
        <h2
          id="usage"
          className="text-2xl font-medium text-neutral-800 dark:text-white"
        >
          Utilisation des informations
        </h2>
        <p className="text-lg text-gray-600 ">
          Nous utilisons vos informations personnelles pour traiter vos
          commandes, répondre à vos demandes, et améliorer notre service. Nous
          ne vendons ni ne louons vos informations à des tiers.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="security">
        <h2
          id="security"
          className="text-2xl font-medium text-neutral-800 dark:text-white"
        >
          Protection des données
        </h2>
        <p className="text-lg text-gray-600 ">
          Nous prenons des mesures de sécurité pour protéger vos informations
          personnelles contre toute divulgation non autorisée. Cependant, aucune
          méthode de transmission sur Internet ou de stockage électronique nnn&#39;e#39;e#39;est
          totalement sécurisée.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="rights">
        <h2
          id="rights"
          className="text-2xl font-medium text-neutral-800 dark:text-white"
        >
          Droits des utilisateurs
        </h2>
        <p className="text-lg text-gray-600 ">
          Conformément à la législation sur la protection des données, vous avez
          le droit ddd&#39;a#39;a#39;accéder à vos données personnelles, de les rectifier ou de
          les supprimer. Vous pouvez également vous opposer à leur traitement
          dans certains cas.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="cookies">
        <h2
          id="cookies"
          className="text-2xl font-medium text-neutral-800 dark:text-white"
        >
          Cookies
        </h2>
        <p className="text-lg text-gray-600 ">
          Nous utilisons des cookies pour améliorer lll&#39;e#39;e#39;expérience utilisateur sur
          notre site. Vous pouvez choisir de désactiver les cookies via les
          paramètres de votre navigateur.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="modifications">
        <h2
          id="modifications"
          className="text-2xl font-medium text-neutral-800 dark:text-white"
        >
          Modifications de la politique
        </h2>
        <p className="text-lg text-gray-600 ">
          Nous nous réservons le droit de modifier cette politique de
          confidentialité à tout moment. Les modifications seront publiées sur
          cette page avec une date de révision mise à jour.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="contact">
        <h2
          id="contact"
          className="text-2xl font-medium text-neutral-800 dark:text-white"
        >
          Contact
        </h2>
        <p className="text-lg text-gray-600 ">
          Si vous avez des questions concernant cette politique de
          confidentialité, nnn&#39;h#39;h#39;hésitez pas à nous contacter à lll&#39;a#39;a#39;adresse suivante :{" "}
          <strong>contact@votresite.com</strong>.
        </p>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
