import { FaTiktok, FaInstagram, FaFacebookSquare } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-white">
      <div className="mx-auto py-8  ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h5 className="text-lg font-bold mb-4">Informations</h5>
            <ul>
              <li>
                <a
                  href="/PolicyCredential"
                  className="text-gray-400 hover:text-white"
                >
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a
                  href="/Conditions"
                  className="text-gray-400 hover:text-white"
                >
                  {`Conditions d'utilisation`}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-4">Liens utiles</h5>
            <ul>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Accueil
                </Link>
              </li>
              <li>
                <a href="/guarantee" className="text-gray-400 hover:text-white">
                  Conditions de la garantie
                </a>
              </li>
              <li>
                <a
                  href="/entretienproduit"
                  className="text-gray-400 hover:text-white"
                >
                  Entretien du produit
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  À propos SofaChic./
                </a>
              </li>

              <li>
                <a href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="/delivery" className="text-gray-400 hover:text-white">
                  Livraison
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-4">Service client</h5>
            <p>
              Nos équipes sont à votre écoute du lundi au vendredi de 9h à 12h
              et de 13h30 à 17h30.
            </p>
            <p className="text-gray-400">Email : contact@sofachic.com</p>
            <p className="text-gray-400">Téléphone : +123 456 7890</p>

            {/* Ajout des icônes des réseaux sociaux */}
            <div className="mt-4 flex space-x-6">
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

        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} SofaChic./. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
