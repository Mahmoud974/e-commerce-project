import HomeClient from "../../components/ClientComponents/HomeClient";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`, {
    cache: "no-cache",
  });

  const data = await res.json();

  const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 5);

  return <HomeClient data={shuffled} />;
}
