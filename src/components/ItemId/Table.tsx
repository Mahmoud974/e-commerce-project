import { Truck } from "lucide-react";

function Table() {
  const options = [
    {
      type: "Livraison",
      price: "79,00 €",
      description:
        "Livraison au pied de votre habitation ou en bas de votre immeuble",
      deliveryPeriod: "Entre le 16/04 et le 22/04",
    },
    {
      type: "Livraison",
      price: "79,00 €",
      description:
        "Livraison au pied de votre habitation ou en bas de votre immeuble avec reprise",
      deliveryPeriod: "Entre le 16/04 et le 22/04",
    },
    {
      type: "Livraison",
      price: "188,00 €",
      description: "Livraison dans la pièce",
      deliveryPeriod: "Entre le 16/04 et le 22/04",
    },
  ];

  return (
    <div className="  flex justify-center items-center bg-black">
      <div className="p-6 w-full max-w-3xl border border-white rounded-lg">
        <table className="w-full text-left table-auto text-white">
          <thead>
            <tr className="bg-black border-b border-white">
              <th className=" text-center flex items-center pb-4">
                <Truck />
                <p className="ml-1">Délai de livraison estimé 4 à 6 semaines</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {options.map((option, index) => (
              <tr key={index} className="border-b flex flex-col  border-white">
                <div className="flex justify-between">
                  <td className="py-2 px-4 text-green-600 font-bold ">
                    {option.deliveryPeriod}
                  </td>
                  <td className="py-2 px-4">{option.price}</td>
                </div>
                <td className="  px-4">{option.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
