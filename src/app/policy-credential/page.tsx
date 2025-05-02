import Footer from "@/components/SectionDown/Footer";
import HelpSection from "@/components/SectionDown/HelpSection";
import Informations from "@/components/SectionDown/Informations";
import Navbar from "@/components/Header/Navbar";
import Newsletter from "@/components/SectionDown/Newsletter";
import Head from "next/head";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="container mt-6 mx-auto">
        <Navbar />
      </div>
      <Head>
        <title>Politique de Confidentialité</title>
        <meta
          name="description"
          content="Politique de confidentialité de notre site de vente eCommerce."
        />
      </Head>

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-semibold mb-6 text-white">
          Politique de Confidentialité
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-medium text-white">Introduction</h2>
          <p className="text-lg text-gray-600">
            Cette politique de confidentialité décrit comment nous collectons,
            utilisons et protégeons vos informations personnelles lorsque vous
            utilisez notre site de vente en ligne. En utilisant notre site, vous
            acceptez les termes de cette politique.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-medium text-white">
            Informations collectées
          </h2>
          <p className="text-lg text-gray-600">
            Nous collectons des informations personnelles lorsque vous effectuez
            un achat, vous inscrivez sur notre site ou nous contactez pour toute
            question. Les informations collectées peuvent inclure votre nom,
            adresse e-mail, adresse de livraison, et informations de paiement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-medium text-white">
            Utilisation des informations
          </h2>
          <p className="text-lg text-gray-600">
            Nous utilisons vos informations personnelles pour traiter vos
            commandes, répondre à vos demandes, et améliorer notre service. Nous
            ne vendons ni ne louons vos informations à des tiers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-medium text-white">
            Protection des données
          </h2>
          <p className="text-lg text-gray-600">
            {`Nous prenons des mesures de sécurité pour protéger vos informations
            personnelles contre toute divulgation non autorisée. Cependant,
            aucune méthode de transmission sur Internet ou de stockage
            électronique n'est totalement sécurisée.`}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-medium text-white">
            Droits des utilisateurs
          </h2>
          <p className="text-lg text-gray-600">
            {`  Conformément à la législation sur la protection des données, vous
            avez le droit d'accéder à vos données personnelles, de les rectifier
            ou de les supprimer. Vous pouvez également vous opposer à leur
            traitement dans certains cas.`}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-medium text-white">Cookies</h2>
          <p className="text-lg text-gray-600">
            {`Nous utilisons des cookies pour améliorer l'expérience utilisateur
            sur notre site. Vous pouvez choisir de désactiver les cookies via
            les paramètres de votre navigateur.`}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-medium text-white">
            Modifications de la politique
          </h2>
          <p className="text-lg text-gray-600">
            Nous nous réservons le droit de modifier cette politique de
            confidentialité à tout moment. Les modifications seront publiées sur
            cette page avec une date de révision mise à jour.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-medium text-white">Contact</h2>
          <p className="text-lg text-gray-600">
            {` Si vous avez des questions concernant cette politique de
            confidentialité, n'hésitez pas à nous contacter à l'adresse suivante`}
            : <strong>contact@votresite.com</strong>.
          </p>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;
