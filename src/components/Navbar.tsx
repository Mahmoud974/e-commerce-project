"use client";
import React, { useEffect } from "react";
import { ShoppingCart, CircleUser } from "lucide-react";
import { Button } from "./ui/button";
import SheetDisplay from "./SheetDisplay";
import { useTemplate } from "@/hook/useTemplate";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNewData } from "@/store/store";

type Inputs = {
  search: string;
};

export default function Navbar({ selectedItems }) {
  const { data } = useTemplate();
  const { filteredData, setFilteredData } = useNewData();

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
    <section className="">
      <nav className="flex justify-between items-center mb-12">
        <div>
          <ul>
            <li>
              <h1 className="font-bold text-xl">Podd</h1>
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

        <ul className="flex space-x-4">
          <li>
            <Button>
              <ShoppingCart />
            </Button>
          </li>
          <li>
            <Button>
              <CircleUser />
            </Button>
          </li>
          <li>
            <SheetDisplay selectedItems={selectedItems} />
          </li>
        </ul>
      </nav>
    </section>
  );
}
