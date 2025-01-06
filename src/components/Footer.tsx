import { FaTiktok, FaInstagram, FaFacebookSquare } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-white w-full py-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Section Informations */}
          <div>
            <h5 className="text-lg font-bold mb-4">Informations</h5>
            <ul>
              <li>
                <Link
                  href="/PolicyCredential"
                  className="text-gray-400 hover:text-white"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/Conditions"
                  className="text-gray-400 hover:text-white"
                >
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>

          {/* Section Liens utiles */}
          <div>
            <h5 className="text-lg font-bold mb-4">Liens utiles</h5>
            <ul>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/guarantee"
                  className="text-gray-400 hover:text-white"
                >
                  Conditions de la garantie
                </Link>
              </li>
              <li>
                <Link
                  href="/entretienproduit"
                  className="text-gray-400 hover:text-white"
                >
                  Entretien du produit
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  À propos SofaChic
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/delivery"
                  className="text-gray-400 hover:text-white"
                >
                  Livraison
                </Link>
              </li>
            </ul>
          </div>

          {/* Section Service client et réseaux sociaux */}
          <div>
            <h5 className="text-lg font-bold mb-4">Service client</h5>
            <p className="mb-2">
              Nos équipes sont à votre écoute du lundi au vendredi de 9h à 12h
              et de 13h30 à 17h30.
            </p>
            <p className="text-gray-400">Email : contact@sofachic.com</p>
            <p className="text-gray-400 mb-4">Téléphone : +123 456 7890</p>

            {/* Icônes réseaux sociaux */}
            <div className="flex justify-center md:justify-start space-x-6">
              <Link
                href="https://www.instagram.com"
                target="_blank"
                aria-label="Instagram"
              >
                <FaInstagram className="h-6 w-6 text-gray-400 hover:text-white" />
              </Link>
              <Link
                href="https://www.facebook.com"
                target="_blank"
                aria-label="Facebook"
              >
                <FaFacebookSquare className="h-6 w-6 text-gray-400 hover:text-white" />
              </Link>
              <Link
                href="https://www.tiktok.com"
                target="_blank"
                aria-label="TikTok"
              >
                <FaTiktok className="h-6 w-6 text-gray-400 hover:text-white" />
              </Link>
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
