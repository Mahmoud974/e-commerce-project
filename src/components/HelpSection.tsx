import Image from "next/image";
import React from "react";

export default function HelpSection() {
  const helpItems = [
    {
      title: "Nous contacter",
      image: "/banners/logo-mockup.png",
      link: "/contact",
    },
    {
      title: "Délai de livraison",
      image: "/banners/delivery1.png",
      link: "/delivery",
    },
    {
      title: "Entretien des meubles",
      image: "/banners/cleanSofa2.jpg",
      link: "/entretienproduit",
    },
    {
      title: "Instructions d’assemblage",
      image: "/banners/instruction.jpg",
      link: "/instruction",
    },
    {
      title: "Garantie",
      image: "/banners/guarantie.jpg",
      link: "/guarantee",
    },
  ];

  return (
    <section className="py-12">
      <h2 className="text-center text-2xl font-bold mb-8 lg:px-0 px-5">
        Comment pouvons-nous vous aider ?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto px-4">
        {helpItems.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="flex cursor-pointer flex-col lg:px-0 px-5 items-center text-center"
          >
            <Image
              width={500}
              height={500}
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
            />
            <h3 className="text-lg font-semibold">{item.title}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}
