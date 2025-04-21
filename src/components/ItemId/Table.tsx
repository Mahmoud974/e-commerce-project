import { Truck } from "lucide-react";

function Table() {
  // Obtenir la date actuelle
  const currentDate = new Date();

  // Ajouter 3 semaines à la date actuelle
  const deliveryDate = new Date(currentDate);
  deliveryDate.setDate(currentDate.getDate() + 30);

  // Formater les dates pour l'affichage
  const formattedCurrentDate = currentDate.toLocaleDateString("fr-FR");
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("fr-FR");

  const options = [
    {
      type: "Livraison",
      price: "79,00 €",
      description:
        "Livraison au pied de votre habitation ou en bas de votre immeuble",
      deliveryPeriod: `Entre le ${formattedCurrentDate} et le ${formattedDeliveryDate}`,
    },
    {
      type: "Livraison",
      price: "79,00 €",
      description:
        "Livraison au pied de votre habitation ou en bas de votre immeuble avec reprise",
      deliveryPeriod: `Entre le ${formattedCurrentDate} et le ${formattedDeliveryDate}`,
    },
    {
      type: "Livraison",
      price: "188,00 €",
      description: "Livraison dans la pièce",
      deliveryPeriod: `Entre le ${formattedCurrentDate} et le ${formattedDeliveryDate}`,
    },
  ];

  return (
    <div className="flex justify-center items-center bg-black">
      <div className="p-6 w-full max-w-3xl border border-white rounded-lg">
        <table className="w-full text-left text-white table-auto">
          <thead>
            <tr className="bg-black border-b border-white">
              <th colSpan={3} className="text-center py-4">
                <div className="flex items-center  ">
                  <Truck />
                  <p className="ml-2">
                    Délai de livraison environ de 4 semaines
                  </p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {options.map((option, index) => (
              <tr key={index} className="border-b border-white">
                <td className="py-2 px-4 text-green-600 font-bold">
                  {option.deliveryPeriod}
                </td>
                <td className="py-2 px-2 font-semibold">{option.price}</td>
                <td className="py-2 px-4">{option.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
