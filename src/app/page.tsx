import CanapesClient from "../components/ClientComponents/ClientCanapes";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`, {
    cache: "force-cache",
  });

  const data = await res.json();
  console.log(data);

  return <CanapesClient data={data} />;
}
