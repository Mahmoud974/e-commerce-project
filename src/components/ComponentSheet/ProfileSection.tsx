export function ProfileSection({
  session,
  signIn,
  signOut,
  handleFacebookLogin,
  isProcessing,
}) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div>
        <div className="text-white">
          Profil utilisateur (fonctionnalité en cours de développement)
        </div>
      </div>

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
    </div>
  );
}
