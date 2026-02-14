import ProductPageClient from "@/components/ClientComponents/ClientProductID";
import { getArticles, getProduitsEntretien } from "@/lib/data";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug?: string;
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;  

 
  if (!slug) {
    console.error("Slug manquant");
    notFound();
  }

  const slugNumber = Number(slug);

  if (isNaN(slugNumber)) {
    console.error("Slug invalide:", slug);
    notFound();
  }

  try {
    const articles = await getArticles();
    const produitsEntretien = await getProduitsEntretien();

    const allProducts = [...articles, ...produitsEntretien];

    const product = allProducts.find(
      (item) => Number(item.id) === slugNumber
    );

    if (!product) {
      console.error(`Produit avec ID ${slug} introuvable`);
      notFound();
    }

    return (
      <ProductPageClient
        product={product}
        relatedProducts={allProducts.slice(0, 5)}
      />
    );

  } catch (error) {
    console.error("Erreur serveur:", error);
    notFound();
  }
}
