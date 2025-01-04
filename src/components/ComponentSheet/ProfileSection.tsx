export function ProfileSection({
  session,
  signIn,
  signOut,
  handleFacebookLogin,
  isProcessing,
}) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex flex-col space-y-2">
        {!session || !session.user ? (
          <>
            <button
              onClick={() => signIn("google")}
              className="bg-red-500 text-white py-2 px-4 rounded-full w-64"
              disabled={isProcessing}
            >
              {isProcessing ? "Chargement..." : "Se connecter avec Google"}
            </button>
            {/* <button
              onClick={handleFacebookLogin}
              className="bg-blue-600 text-white py-2 px-4 rounded-full w-64"
              disabled={isProcessing}
            >
              {isProcessing ? "Chargement..." : "Se connecter avec Facebook"}
            </button> */}
          </>
        ) : (
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white py-2 px-4 rounded-full w-64"
          >
            Déconnecter
          </button>
        )}
      </div>
      <h2 className="font-bold">Mes informations</h2>
      <form className="flex flex-col space-y-2  ">
        <label htmlFor="firstName">Prénom *</label>
        <input
          type="text"
          id="firstName"
          className="border p-2 bg-black"
          required
        />

        <label htmlFor="lastName">Nom *</label>
        <input
          type="text"
          id="lastName"
          className="border p-2 bg-black"
          required
        />

        <label htmlFor="email">E-mail *</label>
        <input
          type="email"
          id="email"
          className="border p-2 bg-black"
          required
        />

        <label htmlFor="password">Mot de passe *</label>
        <input
          type="password"
          id="password"
          className="border p-2 bg-black"
          required
        />

        <label htmlFor="birthdate">Date de naissance (optionnel)</label>
        <input type="date" id="birthdate" className="border p-2 bg-black" />

        <label>
          <input type="checkbox" id="newsletter" />
          Recevoir notre newsletter
        </label>

        <label>
          <input type="checkbox" id="terms" required />
          J'ai lu et j'accepte la politique d'utilisation des données
        </label>

        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Sauvegarder
        </button>
      </form>
    </div>
  );
}
