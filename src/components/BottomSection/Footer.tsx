import { FaTiktok, FaInstagram, FaFacebookSquare } from "react-icons/fa";
import { FaCcVisa, FaPaypal } from "react-icons/fa"; // Icônes de paiement
import Link from "next/link";
import { HandCoins } from "lucide-react";

const links = {
  utiles: [
    { href: "/home", label: "Accueil" },
    { href: "/conditions-garantie", label: "Conditions de la garantie" },
    { href: "/produits-entretien", label: "Entretien du produit" },
    { href: "a-propos", label: "À propos SofaChic" },
    { href: "/contactez-nous", label: "Contact" },
    { href: "/infos-livraison", label: "Livraison" },
    { href: "/inspiration", label: "Inspiration" },
    { href: "/eco-mobilier", label: "Eco-mobilier" },
  ],
  informations: [
    { href: "/moyen-de-paiement", label: "Les moyens de paiements" },
    {
      href: "/politique-confidentialite",
      label: "Politique de confidentialité",
    },
    { href: "/conditions-utilisation", label: "Conditions ddd&#39;u#39;u#39;utilisation" },
  ],
};

const socialLinks = [
  {
    href: "https://www.instagram.com",
    icon: <FaInstagram />,
    label: "Instagram",
  },
  {
    href: "https://www.facebook.com",
    icon: <FaFacebookSquare />,
    label: "Facebook",
  },
  { href: "https://www.tiktok.com", icon: <FaTiktok />, label: "TikTok" },
];

const paymentMethods = [
  { icon: <FaCcVisa />, label: "Visa" },
  { icon: <FaPaypal />, label: "PayPal" },
  { icon: <HandCoins />, label: "Espèces" },
];

const Footer = () => {
  return (
    <footer
      className="text-white w-full py-8 px-4"
      role="contentinfo"
      aria-label="Pied de page"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Sections dynamiques */}
          {Object.entries(links).map(([title, items]) => (
            <div
              key={title}
              className="space-y-4"
              role="region"
              aria-label={title.replace("-", " ")}
            >
              <h5 className="text-lg font-bold mb-4 capitalize text-white">
                {title.replace("-", " ")}
              </h5>
              <ul className="space-y-2" role="list">
                {items.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                      aria-label={`Aller à ${item.label}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Moyens de paiement sous les informations */}
              {title === "informations" && (
                <div
                  className="mt-4"
                  role="region"
                  aria-label="Moyens de paiement"
                >
                  <h5 className="text-lg font-bold mb-4 text-white">
                    Moyens de paiement
                  </h5>
                  <div className="flex space-x-8 text-gray-400" role="list">
                    {paymentMethods.map((method, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2"
                        role="listitem"
                      >
                        {method.icon && (
                          <span aria-hidden="true">{method.icon}</span>
                        )}
                        <span>{method.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Service client et réseaux sociaux */}
          <div className="space-y-4" role="region" aria-label="Service client">
            <h5 className="text-lg font-bold mb-4 text-white">
              Service client
            </h5>
            <p className="mb-2 w-3/4 mx-auto md:mx-0 text-gray-400">
              Nos équipes sont à votre écoute du lundi au vendredi de 9h à 12h
              et de 13h30 à 17h30.
            </p>
            <p className="text-gray-400">
              <span className="sr-only">Email : </span>
              <a
                href="mailto:contact@sofachic.com"
                className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
              >
                contact@sofachic.com
              </a>
            </p>
            <p className="text-gray-400 mb-4">
              <span className="sr-only">Téléphone : </span>
              <a
                href="tel:+33780123456"
                className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
              >
                07.80.12.34.56
              </a>
            </p>

            {/* Icônes réseaux sociaux */}
            <div
              className="flex justify-center md:justify-start space-x-6"
              role="list"
              aria-label="Réseaux sociaux"
            >
              {socialLinks.map(({ href, icon, label }, index) => (
                <Link
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  aria-label={`${label} (nouvelle fenêtre)`}
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400"
          role="contentinfo"
          aria-label="Copyright"
        >
          &copy; {new Date().getFullYear()} SofaChic. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
