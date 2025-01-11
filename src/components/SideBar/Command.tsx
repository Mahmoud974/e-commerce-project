import Image from "next/image";
import { Trash } from "lucide-react";

export function Command({
  selectedItems,
  removeItems,
  session,
  signIn,
  signOut,
}) {
  return (
    <div className="p-2   text-white  space-y-6">
      <p>Historique commande</p>
    </div>
  );
}
