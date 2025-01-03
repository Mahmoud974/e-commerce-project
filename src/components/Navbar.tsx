"use client";
import React, { useEffect } from "react";

import SheetDisplay from "./SheetDisplay";
import { useTemplate } from "@/hook/useTemplate";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSearchArticles } from "@/store/store";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

type Inputs = {
  search: string;
};

export default function Navbar() {
  let mySession = useSession().data?.user;

  const { data } = useTemplate();
  const { setFilteredData } = useSearchArticles();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const searchTerm = watch("search");

  console.log(window.location.pathname === "/");

  useEffect(() => {
    if (data) {
      setFilteredData(data, searchTerm);
      console.log(setFilteredData(data, searchTerm));
    }
  }, [data, searchTerm, setFilteredData]);

  const onSubmit: SubmitHandler<Inputs> = (formData) => {};

  return (
    <nav className="md:mx-0  ">
      <div className="flex justify-between items-center mb-12">
        <div>
          <ul>
            <li>
              <Link href="/">
                <p className="font-[800] md:text-2xl">
                  SofaChic<span className="text-red-700 font-bold"> ./</span>{" "}
                </p>
              </Link>
            </li>
          </ul>
        </div>
        {window.location.pathname === "/" && (
          <form className="flex-grow mx-28  " onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-white bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("search")}
            />
          </form>
        )}

        <div className="flex items-center">
          {mySession && (
            <>
              <Image
                src={mySession?.image}
                alt={`Photo de profil `}
                className="  w-8 mr-2 rounded-full cursor-pointer"
                width={100}
                height={100}
                priority
              />
              {/*  */}
              <p className="mr-2 cursor-pointer hover:underline">
                {mySession?.name}
              </p>
            </>
          )}

          <SheetDisplay />
        </div>
      </div>
    </nav>
  );
}
