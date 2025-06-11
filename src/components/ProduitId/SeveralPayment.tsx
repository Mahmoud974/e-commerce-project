import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SeveralPayment() {
  return (
    <Dialog>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white text-black">
        <DialogHeader>
          <DialogTitle className="text-black">
            Payez en plusieurs fois par carte bancaire avec Alma
          </DialogTitle>
          <DialogDescription className="text-gray-700">
            Choisissez Alma au moment du paiement. Laissez-vous guider et
            validez votre paiement en 2 minutes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Étape 1: Choisir le mode de paiement */}
          <div className="grid grid-cols-4 gap-4 items-center">
            <Label htmlFor="payment-method" className="text-right text-black">
              Choisissez votre paiement
            </Label>
            <Input
              id="payment-method"
              defaultValue="Carte bancaire"
              className="col-span-3 text-black border-gray-300"
              disabled
            />
          </div>

          {/* Étape 2: Choisir le nombre d'échéances */}
          <div className="grid grid-cols-4 gap-4 items-center">
            <Label htmlFor="installments" className="text-right text-black">
              Nombre d'échéances
            </Label>
            <div className="flex col-span-3 gap-4">
              <Button
                variant="outline"
                className="text-black bg-gray-200 hover:bg-gray-300"
              >
                3x
              </Button>
              <Button
                variant="outline"
                className="text-black bg-gray-200 hover:bg-gray-300"
              >
                4x
              </Button>
              <Button
                variant="outline"
                className="text-black bg-gray-200 hover:bg-gray-300"
              >
                10x
              </Button>
              <Button
                variant="outline"
                className="text-black bg-gray-200 hover:bg-gray-300"
              >
                12x
              </Button>
            </div>
          </div>

          {/* Étape 3: Affichage des montants */}
          <div className="grid grid-cols-4 gap-4 items-center">
            <Label htmlFor="amount-today" className="text-right text-black">
              {`Aujourd'hui`}
            </Label>
            <div className="col-span-3 text-black">99,68 €</div>
          </div>
          <div className="grid grid-cols-4 gap-4 items-center">
            <Label htmlFor="amount-february" className="text-right text-black">
              2 février 2025
            </Label>
            <div className="col-span-3 text-black">99,66 €</div>
          </div>
          <div className="grid grid-cols-4 gap-4 items-center">
            <Label htmlFor="amount-march" className="text-right text-black">
              2 mars 2025
            </Label>
            <div className="col-span-3 text-black">99,66 €</div>
          </div>

          {/* Étape 4: Total */}
          <div className="grid grid-cols-4 gap-4 items-center font-bold text-black">
            <Label htmlFor="total" className="text-right">
              Total
            </Label>
            <div className="col-span-3">299,00 €</div>
          </div>
          <div className="grid grid-cols-4 gap-4 items-center text-black">
            <Label htmlFor="fees" className="text-right">
              Dont frais (TTC)
            </Label>
            <div className="col-span-3">0,00 €</div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-600"
          >
            Valider le paiement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
