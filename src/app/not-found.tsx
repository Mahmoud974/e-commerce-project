import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center max-w-sm w-full">
        <Image
          src="/error-img.png"
          alt="Error 404"
          width={1000}
          height={1000}
          className="w-96 h-auto object-cover  shadow-lg"
        />
        <p className="text-7xl font-bold mt-4">ERROR</p>
        <div className="mt-6">
          <Link href="/" className="text-blue-500 text-lg hover:underline">
            <Button variant="outline" className="text-black">
              {`Retour à l'accueil`}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
