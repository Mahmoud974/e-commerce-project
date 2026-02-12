import HomeClient from "@/components/ClientComponents/HomeClient";
import { getArticles } from "@/lib/data";

export default async function Page() {
  const data = await getArticles();
  const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 5);

  return <HomeClient data={shuffled} />;
}
