export const dynamic = 'force-dynamic'

import { Suspense } from "react";
import CanapesClient from "@/components/ClientComponents/ClientCanapes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { getArticles } from "@/lib/data";

function CanapesFallback() {
  return (
    <div className="container mx-auto min-h-[400px] flex items-center justify-center">
      <p className="text-lg">Chargement…</p>
    </div>
  );
}

export default async function Page() {
  const data = await getArticles();

  return (
    <Suspense fallback={<CanapesFallback />}>
      <NuqsAdapter>
        <CanapesClient data={data} />
      </NuqsAdapter>
    </Suspense>
  );
}