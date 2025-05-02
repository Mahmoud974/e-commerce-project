// app/guarantee/page.tsx
import React from "react";
import { AccordionGuarantee } from "@/components/ConditionsGuarantee/Accordion";
import HelpSection from "@/components/SectionDown/HelpSection";
import PageLayoutBanner from "@/components/Layouts/PageLayoutBanner";

export default function GuaranteePage() {
  return (
    <PageLayoutBanner
      title="CONDITIONS de la garanties"
      description="Profitez de notre garantie exceptionnelle pour une tranquillité d’esprit totale : des meubles conçus pour durer, avec un support qui vous accompagne à chaque étape."
      imageSrc="https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/sign/element-page-img/guarantie.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzFjMmFkYWJkLTY5YWYtNGI0ZC04MmJiLTRiMWNjZWJhM2Y2NSJ9.eyJ1cmwiOiJlbGVtZW50LXBhZ2UtaW1nL2d1YXJhbnRpZS5qcGciLCJpYXQiOjE3NDYxODQwMzUsImV4cCI6MjA2MTU0NDAzNX0.wVbETnU6-fvATwogSXRU_tBcesdsMSU49wasnqHXddY"
    >
      <div className="mt-12 text-center px-4 mb-12">
        <p className="text-white text-xl font-semibold mt-4 max-w-3xl mx-auto">
          Chez Sofachic., nous sommes fiers de concevoir des meubles intemporels
          en utilisant les meilleurs matériaux pour garantir leur qualité et
          leur durabilité. Pour refléter notre engagement, nous offrons une
          garantie de 5 ans sur tous les produits achetés après le 1er janvier
          2022. Cette garantie s’ajoute à vos droits prévus par la loi et
          témoigne de notre volonté de vous fournir un service exceptionnel.
        </p>

        <p className="text-white text-lg mt-6 max-w-3xl mx-auto">
          Que vous choisissiez des meubles pour vivre, travailler ou jouer,
          notre expertise de plus de 70 ans dans le design danois vous garantit
          des produits modulaires, fonctionnels et de qualité supérieure.
          Inspirés par la créativité et l’artisanat danois, nos designs
          iconiques vous offrent joie et inspiration pour embellir votre
          quotidien.
        </p>

        <p className="text-white text-lg mt-4 max-w-3xl mx-auto">
          Nous nous efforçons d’améliorer la vie de chacun avec le design
          danois, et cette mission inspire notre devise :{" "}
          <span className="font-semibold italic">Live Ekstraordinær</span>
        </p>
      </div>

      <div>
        <div className="bg-red-700 w-1/3 h-3 mb-8 mx-auto"></div>
        <p className="text-white text-lg max-w-3xl mx-auto mb-8 lg:px-0 px-6">
          Chez SofaChic, nous concevons nos produits avec des matériaux
          robustes, durables et innovants. Pour les cadres de canapé, nous
          faisons un pas de plus en proposant une garantie de 10 ans couvrant
          les défauts de fabrication et de structure.
        </p>
        <h2 className="font-bold text-3xl text-left sm:text-center mb-4 sm:mb-0">
          Questions fréquentes
        </h2>
        <div className="flex flex-col lg:px-0 px-6 sm:flex-row my-12 max-w-2xl mx-auto items-start sm:items-center">
          <AccordionGuarantee />
        </div>
      </div>
    </PageLayoutBanner>
  );
}
