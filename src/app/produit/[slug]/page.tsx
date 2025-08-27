import ProductPageClient from "../../../components/ClientComponents/ClientProductID";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const slug = params.slug;
  console.log(slug);
  let res;
  try {
    const slugNumber = Number(slug);

    if (slugNumber > 67 && slugNumber < 86) {
      res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/produits-entretien/`,
        {
          cache: "no-cache",
        }
      );
    } else if (slugNumber > 1 && slugNumber < 55) {
      res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/`, {
        cache: "no-cache",
      });
    } else {
      res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/`, {
        cache: "no-cache",
      });

      if (!res.ok) {
        res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/produits-entretien/`,
          {
            cache: "no-cache",
          }
        );
      }
    }

    if (!res || !res.ok) {
      throw new Error(`Échec du chargement de lll&#39;a#39;a#39;article ${slug}`);
    }

    const data = await res.json();

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
