"use client";
import React, { useEffect } from "react";
import SheetDisplay from "../SideBar/MenuGeneral";
import { useTemplate } from "@/app/hook/useTemplate";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSearchArticles } from "@/store/store";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import AlertElement from "../AlertElement";
import { usePathname } from "next/navigation";

type Inputs = {
  search: string;
};

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const { data } = useTemplate();
  const { setFilteredData } = useSearchArticles();

  const { register, handleSubmit, watch } = useForm<Inputs>();

  const searchTerm = watch("search");

  useEffect(() => {
    if (data) {
      setFilteredData(data, searchTerm);
    }
  }, [data, searchTerm, setFilteredData]);

  const onSubmit: SubmitHandler<Inputs> = () => {};

  return (
    <nav className="w-full bg-black text-white  py-4">
      {/* Ligne du haut : logo à gauche, profil + menu à droite */}
      <div className="flex items-center justify-between mb-4">
        {/* Logo */}
        <Link href="/">
          <p className="font-extrabold text-xl md:text-2xl">
            SofaChic<span className="text-red-700"> ./</span>
          </p>
        </Link>

        {/* Droite : nom + photo + menu */}
        <div className="flex items-center gap-4">
          <AlertElement />
          {session && (
            <div className="flex items-center gap-2">
              <span className="hidden lg:block">{session.user?.name}</span>
              <Image
                src={session.user?.image ?? "/default.png"}
                alt="Profil"
                className="w-8 h-8 rounded-full object-cover"
                width={32}
                height={32}
              />
            </div>
          )}
          <SheetDisplay />
        </div>
      </div>

      {/* Ligne du dessous : search visible uniquement sur "/" */}
      {pathname === "/" && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex justify-center md:-mt-12 md:mb-12"
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-md py-2 border border-white bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("search")}
          />
        </form>
      )}
    </nav>
  );
}
