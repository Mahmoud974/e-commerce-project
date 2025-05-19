"use client";

import React, { useState, useEffect } from "react";
import { useLikeData } from "@/store/store";
import ProductCard from "@/components/ProduitId/Card";
import ProductLayout from "@/components/Layout/ProductLayout";

export default function NettoyantsProduits() {
  const { addItems } = useLikeData();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/produits-entretien");

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("Données brutes de l'API:", data);
        setProducts(data);
      } catch (err) {
        console.error("Erreur lors du chargement des produits:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Adapter les produits au format attendu par ProductCard
  const adaptedProducts = products.map((product) => {
    // Calculer le prix avec réduction si disponible
    let finalPrice = product.price;
    if (product.discount && product.discount !== "null") {
      try {
        // Enlever le signe % et convertir en nombre
        const discountValue = parseFloat(
          product.discount.replace("%", "").replace("-", "")
        );
        if (!isNaN(discountValue)) {
          finalPrice = product.price * (1 - discountValue / 100);
        }
      } catch (e) {
        console.error("Erreur lors du calcul du prix réduit:", e);
      }
    }

    // Formater le prix avec 2 décimales maximum APRÈS tous les calculs
    const formattedPrice = parseFloat(finalPrice.toFixed(2));

    // Nettoyer les URLs des images (enlever les guillemets supplémentaires)
    const cleanedImages = product.images?.map((img) =>
      img.replace(/["'`]/g, "").trim()
    ) || ["/placeholder-image.jpg"];

    // Générer un titre descriptif basé sur la description ou d'autres propriétés
    let descriptiveTitle = product.title;

    // Si le titre est juste un numéro, essayer d'extraire un meilleur titre de la description
    if (/^\d+$/.test(product.title)) {
      // Extraire les premiers mots de la description pour créer un titre
      const descriptionWords = product.description.split(" ");
      const firstFewWords = descriptionWords.slice(0, 3).join(" ");

      if (product.description.toLowerCase().includes("détachant")) {
        descriptiveTitle = "Détachant Tissus";
      } else if (product.description.toLowerCase().includes("nettoyeur")) {
        descriptiveTitle = "Nettoyeur Multi-surfaces";
      } else if (product.description.toLowerCase().includes("brosse")) {
        descriptiveTitle = "Brosse de Nettoyage";
      } else {
        descriptiveTitle = firstFewWords;
      }
    }

    return {
      id: product.id,
      title: descriptiveTitle,
      description: product.description || "Aucune description disponible",
      price: formattedPrice,
      images: cleanedImages,
      brand: product.brand || "Produit d'entretien",
      ecoMobilier: product.ecoMobilier || 0.25,
      quantity: product.quantity || 1,
      disponibilite: product.disponibilite || true,
    };
  });

  if (loading) {
    return (
      <ProductLayout
        title="Produits d'entretien pour canapés en cuir"
        description="Découvrez notre sélection de produits spécialement conçus pour nettoyer, entretenir et protéger vos canapés en cuir."
        breadcrumbs={[
          { label: "Accueil", href: "/home" },
          { label: "Produits nettoyants pour cuir" },
        ]}
      >
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-xl">Chargement des produits...</p>
        </div>
      </ProductLayout>
    );
  }

  if (error) {
    return (
      <ProductLayout
        title="Produits d'entretien pour canapés en cuir"
        description="Découvrez notre sélection de produits spécialement conçus pour nettoyer, entretenir et protéger vos canapés en cuir."
        breadcrumbs={[
          { label: "Accueil", href: "/home" },
          { label: "Produits nettoyants pour cuir" },
        ]}
      >
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-xl text-red-500">Erreur: {error}</p>
        </div>
      </ProductLayout>
    );
  }

  return (
    <ProductLayout
      title="Produits d'entretien pour canapés"
      description="Découvrez notre sélection de produits spécialement conçus pour nettoyer, entretenir et protéger vos canapés."
      breadcrumbs={[
        { label: "Accueil", href: "/home" },
        { label: "Produits d'entretien" },
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {adaptedProducts.length > 0 ? (
          adaptedProducts.map((item) => (
            <ProductCard key={item.id} item={item} addItems={addItems} />
          ))
        ) : (
          <p className="col-span-full text-center text-lg">
            Aucun produit trouvé
          </p>
        )}
      </div>
    </ProductLayout>
  );
}
