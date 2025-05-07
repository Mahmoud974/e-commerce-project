import ProductPageClient from "../../../components/ClientComponents/ClientProductID";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const slug = params.slug;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error(`Échec du chargement de l'article ${slug}`);
  }

  const data = await res.json();

  return <ProductPageClient data={data} slug={slug} />;
}
