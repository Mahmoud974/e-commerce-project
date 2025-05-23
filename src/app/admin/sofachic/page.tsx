"use client";
import Navbar from "@/components/Header/Navbar";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Page() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    setError("");
    // Place authentication logic here
    alert("Connexion admin envoyée !");
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center  ">
        <form
          onSubmit={handleSubmit}
          className="  p-8 rounded shadow-md w-full max-w-sm flex flex-col gap-4"
        >
          <Link href="/home">
            <Image
              src={`${process.env.NEXT_PUBLIC_BANNER_IMAGE}/logo.png`}
              alt="Logo"
              width={180}
              height={180}
              className="w-auto mx-auto"
            />
          </Link>

          <label className="block">
            <span className="text-gray-700">Adresse mail</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full border text-black border-gray-300 rounded px-3 py-2"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Mot de passe</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </label>
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            className="bg-red-700 text-white py-2 rounded hover:bg-red-800 transition"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
