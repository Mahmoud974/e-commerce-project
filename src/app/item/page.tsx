import Navbar from "@/components/Navbar";
import React from "react";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <main className="container mx-auto mt-6 flex-grow">
        <Navbar />
        <section className="flex justify-between items-center">
          <Image
            src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="product image"
            width={400}
            height={400}
            className="object-cover" // Conserver le style d'objet
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (min-width: 769px) 400px"
          />
          <div>
            <h1 className="text-4xl font-bold">Titre du produit</h1>
            <p className="text-lg">Description du produit</p>
            <div className="flex items-center mt-4">
              <span className="mr-2">Prix : 123,45 €</span>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Commander
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
