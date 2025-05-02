import Footer from "@/components/SectionDown/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ErrorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex items-center justify-center flex-grow">
        <div className="text-center max-w-sm w-full">
          <Image
            src="/error.webp"
            alt="Error 404"
            width={1000}
            height={1000}
            className="w-[100%] h-auto object-cover shadow-lg"
          />

          <div className="mt-6">
            <Link href="/home" className="  text-lg hover:underline">
              <Button>
                <p className="text-3xl">{`Retour à l'accueil`}</p>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
