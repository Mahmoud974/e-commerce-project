import React from "react";
import ProductLayout from "@/components/Layouts/ProductLayout";
import ClientComponent from "../../components/ClientComponents/ClientProduitEntretien";

export default async function NettoyantsProduits() {
  let products = [];
  let error = null;

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/produits-entretien",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    products = await response.json();
    console.log("Données brutes de lll&#39;A#39;A#39;API (côté serveur):", products);
  } catch (err) {
    console.error("Erreur lors du chargement des produits:", err);
    error = err.message;
  }

  const adaptedProducts = products.map((product) => {
    let finalPrice = product.price;
    if (product.discount && product.discount !== "null") {
      try {
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

    const formattedPrice = parseFloat(finalPrice.toFixed(2));

    const cleanedImages = product.images?.map((img) =>
      img.replace(/["'`]/g, "").trim()
    ) || ["/placeholder-image.jpg"];

    let descriptiveTitle = product.title;

    if (/^\d+$/.test(product.title)) {
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
      brand: product.brand || "Produit ddd&#39;e#39;e#39;entretien",
      ecoMobilier: product.ecoMobilier || 0.25,
      quantity: product.quantity || 1,
      disponibilite: product.disponibilite || true,
    };
  });

  if (error) {
    return (
      <ProductLayout
        title="Produits ddd&#39;e#39;e#39;entretien pour canapés en cuir"
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
      title="Produits ddd&#39;e#39;e#39;entretien pour canapés"
      description="Découvrez notre sélection de produits spécialement conçus pour nettoyer, entretenir et protéger vos canapés."
      breadcrumbs={[
        { label: "Accueil", href: "/home" },
        { label: "Produits ddd&#39;e#39;e#39;entretien" },
      ]}
    >
      {/* Utilisation du composant client pour les fonctionnalités interactives */}
      <ClientComponent products={adaptedProducts} />
    </ProductLayout>
  );
}
