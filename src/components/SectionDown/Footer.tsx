import { FaTiktok, FaInstagram, FaFacebookSquare } from "react-icons/fa";
import Link from "next/link";

const links = {
  informations: [
    { href: "/policy-credential", label: "Politique de confidentialité" },
    { href: "/conditions-utilisation", label: "Conditions d'utilisation" },
  ],
  utiles: [
    { href: "/", label: "Accueil" },
    { href: "/conditions-guarantee", label: "Conditions de la garantie" },
    { href: "/product-interviews", label: "Entretien du produit" },
    { href: "/about", label: "À propos SofaChic" },
    { href: "/contact", label: "Contact" },
    { href: "/delivery", label: "Livraison" },
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

const Footer = () => {
  return (
    <footer className="text-white w-full py-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Sections dynamiques */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h5 className="text-lg font-bold mb-4 capitalize">
                {title.replace("-", " ")}
              </h5>
              <ul className="space-y-2">
                {items.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Service client et réseaux sociaux */}
          <div>
            <h5 className="text-lg font-bold mb-4">Service client</h5>
            <p className="mb-2 w-3/4 mx-auto md:mx-0">
              Nos équipes sont à votre écoute du lundi au vendredi de 9h à 12h
              et de 13h30 à 17h30.
            </p>
            <p className="text-gray-400">Email : contact@sofachic.com</p>
            <p className="text-gray-400 mb-4">Téléphone : +123 456 7890</p>

            {/* Icônes réseaux sociaux */}
            <div className="flex justify-center md:justify-start space-x-6">
              {socialLinks.map(({ href, icon, label }, index) => (
                <Link
                  key={index}
                  href={href}
                  target="_blank"
                  aria-label={label}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} SofaChic. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
