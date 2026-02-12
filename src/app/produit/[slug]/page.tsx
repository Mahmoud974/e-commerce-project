import ProductPageClient from "../../../components/ClientComponents/ClientProductID";
import { getArticles, getProduitsEntretien } from "@/lib/data";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const slug = params.slug;
  try {
    const slugNumber = Number(slug);
    let data: Awaited<ReturnType<typeof getArticles>> | Awaited<ReturnType<typeof getProduitsEntretien>>;

    if (slugNumber > 67 && slugNumber < 86) {
      data = await getProduitsEntretien();
    } else if (slugNumber > 1 && slugNumber < 55) {
      data = await getArticles();
    } else {
      data = await getArticles();
      const articleExists = data.some(
        (a: { id: number }) => Number(a.id) === Number(slug)
      );
      if (!articleExists) {
        data = await getProduitsEntretien();
      }
    }

    const articleExists = data.some(
      (article:any) => Number(article.id) === Number(slug)
    );

    if (!articleExists) {
      console.error(`Article avec ID ${slug} non trouvé dans les données`);
    }

    return <ProductPageClient data={data} slug={slug} />;
  } catch (error) {
    console.error("Erreur lors du chargement de la page produit:", error);
    return <div>Erreur lors du chargement du produit</div>;
  }
}
