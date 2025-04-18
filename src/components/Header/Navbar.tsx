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

  useEffect(() => {
    if (data) {
      setFilteredData(data, searchTerm);
    }
  }, [data, searchTerm, setFilteredData]);

  const onSubmit: SubmitHandler<Inputs> = (formData) => {};

  return (
    <nav className="md:mx-0 f  ">
      <div className=" flex justify-between items-center mb-12">
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
        <AlertElement />
        {window.location.pathname === "/" && (
          <form
            className="flex-grow lg:mx-28  "
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              placeholder="Search..."
              className="lg:w-full  w-3/3 mx-auto   px-4 py-2 border border-white bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("search")}
            />
          </form>
        )}

        <div className="flex  items-center">
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
              <p className="mr-2 lg:flex hidden   cursor-pointer hover:underline">
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
