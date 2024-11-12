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
  console.log(useSession());
  const { data } = useTemplate();
  const { setFilteredData } = useSearchArticles();

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

  const onSubmit: SubmitHandler<Inputs> = (formData) => {};

  return (
    <nav className="">
      <div className="flex justify-between items-center mb-12">
        <div>
          <ul>
            <li>
              <Link href="/">
                <p className="font-[800] text-2xl">
                  SofaChic<span className="text-red-700 font-bold"> ./</span>{" "}
                </p>
              </Link>
            </li>
          </ul>
        </div>

        <form
          className="flex-grow mx-4 px-52"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-white bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("search")}
          />
        </form>
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
    </nav>
  );
}
