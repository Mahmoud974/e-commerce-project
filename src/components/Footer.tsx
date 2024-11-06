const Footer = () => {
  return (
    <footer className="  text-white  ">
      <div className="max-w-screen-xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h5 className="text-lg font-bold mb-4">Liens utiles</h5>
            <ul>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Produits
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-4">Informations</h5>
            <ul>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  {`Conditions d'utilisation`}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Retours
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-4">Contactez-nous</h5>
            <p className="text-gray-400">Email : contact@votresite.com</p>
            <p className="text-gray-400">Téléphone : +123 456 7890</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Votre Société. Tous droits
            réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
