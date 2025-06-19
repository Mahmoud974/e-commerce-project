import { Truck } from "lucide-react";

function Table() {
  const currentDate = new Date();

  const deliveryDate = new Date(currentDate);
  deliveryDate.setDate(currentDate.getDate() + 30);

  const formattedCurrentDate = currentDate.toLocaleDateString("fr-FR");
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("fr-FR");

  const options = [
    {
      type: "Livraison",
      price: "39€",
      description:
        "Livraison au pied de votre habitation ou en bas de votre immeuble",
      deliveryPeriod: `Entre le ${formattedCurrentDate} & le ${formattedDeliveryDate}`,
    },
    {
      type: "Livraison",
      price: "79€",
      description:
        "Livraison au pied de votre habitation ou en bas de votre immeuble avec reprise",
      deliveryPeriod: `Entre le ${formattedCurrentDate} & le ${formattedDeliveryDate}`,
    },
    {
      type: "Livraison",
      price: "100€",
      description: "Livraison dans la pièce",
      deliveryPeriod: `Entre le ${formattedCurrentDate} & le ${formattedDeliveryDate}`,
    },
  ];

  return (
    <div className="flex justify-center items-center bg-black">
      <div className="p-6 w-full max-w-5xl border border-white rounded-lg">
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
                <td className="py-2 px-9 text-green-600 font-bold">
                  {option.deliveryPeriod}
                </td>
                <td className="py-4 font-semibold">{option.price}</td>
                <td className="py-5 px-4">{option.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
