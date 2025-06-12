import HelpSection from "@/components/BottomSection/HelpSection";
import React from "react";
import PageLayoutBanner from "@/components/Layouts/PageLayoutBanner";

export default function Page() {
  return (
    <PageLayoutBanner
      title="Moyen de paiement"
      description="Simplifiez vos achats en toute sérénité : choisissez parmi nos
              options de paiement flexibles, sécurisées et adaptées à vos
              besoins."
      bannerImage={"paiement.jpg"}
    >
      <main className="relative">
        <div className="container mt-6 mx-auto">
          <article>
            <header>
              <div className="bg-red-700 w-1/3 h-3 my-8"></div>
            </header>
            <p>
              {`Chez SofaChic, nous mettons un point ddd&#39;h#39;h#39;honneur à utiliser des
            matériaux robustes et durables. CCC&#39;e#39;e#39;est pourquoi nous proposons une
            garantie de 10 ans pour les cadres de canapé, couvrant les défauts
            de fabrication et de structure.`}
            </p>

            <section className="mt-12" aria-labelledby="payment-methods">
              <h2 id="payment-methods" className="font-bold text-3xl text-left">
                Moyens de paiement
              </h2>
              <p className="mt-4">
                Vous pouvez régler vos achats en toute sérénité grâce à nos
                options de paiement sécurisé.
              </p>

              <section className="mt-8" aria-labelledby="card-payment">
                <h3 id="card-payment" className="font-semibold text-xl">
                  Paiement par carte bancaire
                </h3>
                <p className="mt-2">
                  Payez en ligne en toute sécurité avec votre carte bancaire.
                  Nous acceptons les cartes CB, VISA et MASTERCARD, valides en
                  France, Belgique et Luxembourg.
                </p>
                <p className="mt-4">
                  {` Le paiement par carte bancaire est totalement sécurisé grâce au
                protocole 3D Secure. Votre banque sera uniquement impliquée dans
                la transaction pour garantir sa sécurité, et nous nnn&#39;e#39;e#39;enregistrons
                aucune donnée bancaire.`}
                </p>
                <p className="mt-4">
                  {` En cas ddd&#39;u#39;u#39;utilisation frauduleuse de la carte, vous avez la
                possibilité de demander lll&#39;a#39;a#39;annulation du paiement et le
                remboursement.`}
                </p>
              </section>

              <section className="mt-8" aria-labelledby="installment-payment">
                <h3 id="installment-payment" className="font-semibold text-xl">
                  Paiement en plusieurs fois
                </h3>
                <p className="mt-2">
                  Pour faciliter vos achats, nous vous proposons des solutions
                  de paiement en plusieurs fois :
                </p>
                <div className="mt-4 overflow-x-auto">
                  <table className="table-auto w-full text-left border-collapse">
                    <caption className="sr-only">
                      Options de paiement en plusieurs fois
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" className="border px-4 py-2">
                          Option de paiement
                        </th>
                        <th scope="col" className="border px-4 py-2">
                          Durée
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2">
                          Paiement en 3 ou 4 fois
                        </td>
                        <td className="border px-4 py-2">Avec Alma</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">
                          Paiement en 10 ou 12 fois
                        </td>
                        <td className="border px-4 py-2">Avec Alma</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </section>

            <footer className="mt-12">
              <HelpSection />
            </footer>
          </article>
        </div>
      </main>
    </PageLayoutBanner>
  );
}
