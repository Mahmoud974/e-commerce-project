import ProductPageClient from "../../../components/ClientComponents/ClientProductID";

export default async function Page({ params }: { params: { slug: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`, {
    cache: "force-cache",
  });

  const data = await res.json();

  return <ProductPageClient data={data} slug={params.slug} />;
}
