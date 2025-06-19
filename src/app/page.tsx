import { NuqsAdapter } from "nuqs/adapters/next/app";
import CanapesClient from "../components/ClientComponents/ClientCanapes";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`, {
    cache: "force-cache",
  });
 
  

  if (!res.ok) {
    throw new Error(`Failed to fetch articles: ${res.status}`);
  }

  const data = await res.json();

  return (
    <NuqsAdapter>
      <CanapesClient data={data} />
    </NuqsAdapter>
  );
}
