import CanapesClient from "@/components/ClientComponents/ClientCanapes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { getArticles } from "@/lib/data";

export default async function Page() {
  const data = await getArticles();

  return (
    <NuqsAdapter>
      <CanapesClient data={data} />
    </NuqsAdapter>
  );
}
