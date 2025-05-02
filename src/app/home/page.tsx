"use client";
import ProductCard from "@/components/ItemId/Card";
import Footer from "@/components/SectionDown/Footer";
import Navbar from "@/components/Header/Navbar";
import { useTemplate } from "@/app/hook/useTemplate";
import React, { useState } from "react";
import { useSearchArticles, useLikeData } from "@/store/store";
import Filter from "@/components/Header/Filter";
import Newsletter from "@/components/SectionDown/Newsletter";
import HelpSection from "@/components/SectionDown/HelpSection";
import Informations from "@/components/SectionDown/Informations";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const { data } = useTemplate();
  const { filteredData } = useSearchArticles();
  const { addItems } = useLikeData();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const allProducts = filteredData.length > 0 ? filteredData : data || [];
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  const paginatedData = allProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const colorProduct = [...new Set(data?.map((item) => item.color) || [])];
  const seatProduct = [...new Set(data?.map((item) => item.seat) || [])];

  return (
    <section className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center my-6   w-full container mx-auto">
        <Image
          src="https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/sign/element-page-img/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzFjMmFkYWJkLTY5YWYtNGI0ZC04MmJiLTRiMWNjZWJhM2Y2NSJ9.eyJ1cmwiOiJlbGVtZW50LXBhZ2UtaW1nL2xvZ28ucG5nIiwiaWF0IjoxNzQ2MTY1MDI5LCJleHAiOjIwNjE1MjUwMjl9.qJtgB6xhSlaFabNGTlv13XMRW0MbPYs_Rj1sgoW0o_E"
          alt="Profil"
          className=" object-cover"
          width={220}
          height={220}
        />
      </div>
      <div className="relative w-full h-[700px]   mb-16 overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/furniture.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center">
            Découvrez notre collection exclusive
          </h1>
        </div>
      </div>
      <div className="container mx-auto mb-12">
        <h2 className="font-bold text-3xl">Plongez dans le confort moderne</h2>
        <section className="grid grid-cols-1 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mx-auto w-full">
          {[...paginatedData]
            .sort(() => Math.random() - 0.5)
            .slice(0, 5)
            .map((item: any) => (
              <ProductCard key={item.id} item={item} addItems={addItems} />
            ))}
        </section>
        <Link href="/">
          <Button className="flex justify-center mx-auto border px-20 mt-6">
            <p>Découvrez tous les fauteuils </p>
            <ArrowRight />
          </Button>
        </Link>
      </div>

      <Informations />
      <Newsletter />
      <HelpSection />
      <div className="container mx-auto">
        <Footer />
      </div>
    </section>
  );
}
