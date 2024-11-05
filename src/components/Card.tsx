import Image from "next/image";
import Link from "next/link";

const ProductCard: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div className="relative  pt-12   flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md h-80 mx-2 my-4">
      {" "}
      {/* Hauteur fixée ici */}
      <Link href="#" className="relative flex h-60 overflow-hidden rounded-xl">
        <Image
          src="/img/ok.webp"
          alt="product image"
          className="object-contain px-3"
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          39% OFF
        </span>
      </Link>
      <div className="mt-4 px-5 pb-5 flex flex-col justify-between h-full">
        <Link href="#">
          <h5 className="text-xl tracking-tight text-slate-900 font-bold">
            {item.nom}
          </h5>
        </Link>
        <div className="mb-5 flex items-center justify-between">
          <p>
            <span className="text-lg font-bold text-red-600">{item.prix}€</span>
          </p>
        </div>
        <div className="flex justify-end space-x-3">
          <Link
            href="#"
            className="flex items-center justify-center rounded-md bg-slate-900 p-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </Link>
          <Link
            href="#"
            className="flex items-center justify-center rounded-md bg-slate-900 p-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
