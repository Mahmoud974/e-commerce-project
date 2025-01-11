import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionGuarantee() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {/* Que couvre la garantie ? */}
      <AccordionItem value="coverage">
        <AccordionTrigger>Que couvre la garantie ?</AccordionTrigger>
        <AccordionContent>
          La garantie couvre les défauts matériels et de fabrication sur tous
          les produits de notre collection. Pendant la période de garantie, tout
          défaut constaté sera corrigé ou le produit sera remplacé.
        </AccordionContent>
      </AccordionItem>

      {/* Quelle est la durée de la garantie ? */}
      <AccordionItem value="duration">
        <AccordionTrigger>
          Quelle est la durée de la garantie ?
        </AccordionTrigger>
        <AccordionContent>
          La garantie s’applique aux produits achetés après le 1er janvier 2022
          et est valable pendant 5 ans, à compter de la date d’achat en magasin
          ou de la livraison effectuée par Sofachic./.
        </AccordionContent>
      </AccordionItem>

      {/* Comment faire une réclamation ? */}
      <AccordionItem value="claim">
        <AccordionTrigger>
          Comment faire une réclamation au titre de la garantie ?
        </AccordionTrigger>
        <AccordionContent>
          Les réclamations doivent être adressées au magasin Sofachic./ où le
          produit a été acheté, dans un délai raisonnable après la découverte du
          défaut et avant la fin de la période de garantie. Assurez-vous de
          fournir une preuve d’achat ou de livraison, ainsi que des documents
          illustrant le défaut (photographies, etc.). Si nécessaire, le produit
          peut être renvoyé pour une inspection approfondie.
        </AccordionContent>
      </AccordionItem>

      {/* Qu'est-ce qui n'est pas couvert ? */}
      <AccordionItem value="exclusions">
        <AccordionTrigger>
          Qu’est-ce qui n’est pas couvert par la garantie ?
        </AccordionTrigger>
        <AccordionContent>
          La garantie ne couvre pas l’usure normale, les marques causées par des
          accidents ou une mauvaise utilisation, ni les dommages dus à un
          entretien inadéquat ou à une exposition inappropriée (lumière directe
          du soleil, humidité, etc.). Elle exclut également les produits
          modifiés ou mal stockés.
        </AccordionContent>
      </AccordionItem>

      {/* Que fait Sofachic./ en cas de défaut ? */}
      <AccordionItem value="resolution">
        <AccordionTrigger>
          Que fait Sofachic./ en cas de défaut ?
        </AccordionTrigger>
        <AccordionContent>
          En cas de réclamation acceptée, Sofachic./ décidera si le défaut peut
          être corrigé ou si le produit doit être remplacé. Si le produit n’est
          plus disponible, un produit équivalent sera proposé. Toutes les
          réparations ou remplacements nécessaires seront effectués sans frais,
          mais aucune réduction de prix ou autre compensation supplémentaire ne
          sera accordée.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
