import { DoorOpen } from "lucide-react";
import { Button } from "../ui/button";
import Address from "./Adress";

export function ProfileSection({
  session,
  signIn,
  signOut,

  isProcessing,
}) {
  console.log(Boolean(session?.expires));

  return (
    <div className="flex flex-col  space-y-4">
      <div className="flex flex-col space-y-2">
        {!session || !session.user ? (
          <>
            <Button
              onClick={() => signIn("google")}
              className="mt-3 bg-red-600"
            >
              {isProcessing ? "Chargement..." : "Se connecter avec Google"}
            </Button>

            <Button
              onClick={() => signIn("facebook")}
              className="mt-3 bg-blue-600"
            >
              {isProcessing ? "Chargement..." : "Se connecter avec Facebook"}
            </Button>
          </>
        ) : (
          <Button
            onClick={() => signOut()}
            variant="destructive"
            className="mt-3 bg-red-700 rounded-none"
          >
            <DoorOpen /> Déconnecter
          </Button>
        )}
      </div>
      {Boolean(!session?.expires) ? (
        <>
          <h2 className="font-bold">ou</h2>
          <form className="flex flex-col space-y-2  ">
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
              className="bg-white  text-black py-2 px-4 rounded"
            >
              Se connecter
            </button>
          </form>
        </>
      ) : (
        <>
          <Address />
        </>
      )}
    </div>
  );
}
