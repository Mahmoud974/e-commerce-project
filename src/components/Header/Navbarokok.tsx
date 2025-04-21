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
  const mySession = useSession().data?.user;
  const { data } = useTemplate();
  const { setFilteredData } = useSearchArticles();
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const searchTerm = watch("search");

  useEffect(() => {
    if (data) {
      setFilteredData(data, searchTerm);
    }
  }, [data, searchTerm, setFilteredData]);

  const onSubmit: SubmitHandler<Inputs> = () => {};

  return (
    <nav className="w-full px-4 py-4 bg-black text-white">
      {/* MOBILE: Logo + Profile + Menu */}
      <div className="flex lg:hidden justify-between items-center">
        <Link href="/">
          <p className="font-extrabold text-xl">
            SofaChic<span className="text-red-700"> ./</span>
          </p>
        </Link>

        <div className="flex items-center gap-3">
          {mySession && (
            <Image
              src={mySession?.image}
              alt="Profil"
              className="w-8 h-8 rounded-full"
              width={40}
              height={40}
            />
          )}
          <SheetDisplay />
        </div>
      </div>

      {/* MOBILE: Search bar visible en-dessous */}
      {pathname === "/" && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 lg:hidden w-full"
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-white bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("search")}
          />
        </form>
      )}

      {/* DESKTOP: Full navbar */}
      <div className="hidden lg:flex justify-between items-center mt-4">
        {/* Left - Logo */}
        <Link href="/">
          <p className="font-extrabold text-2xl">
            SofaChic<span className="text-red-700"> ./</span>
          </p>
        </Link>

        {/* Center - Searchbar (only on homepage) */}
        {pathname === "/" && (
          <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 max-w-xl">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-white bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("search")}
            />
          </form>
        )}

        {/* Right - Profile + Menu */}
        <div className="flex items-center gap-3">
          {mySession && (
            <>
              <Image
                src={mySession?.image}
                alt="Profil"
                className="w-8 h-8 rounded-full"
                width={40}
                height={40}
              />
              <p className="hidden lg:block cursor-pointer hover:underline">
                {mySession?.name}
              </p>
            </>
          )}
          <SheetDisplay />
        </div>
      </div>

      {/* Alert en dessous */}
      <div className="mt-4">
        <AlertElement />
      </div>
    </nav>
  );
}
