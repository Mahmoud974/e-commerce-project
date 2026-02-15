"use client";

import React, { useState, useEffect } from "react";
import PageLayoutBanner from "@/components/Layouts/PageLayoutBanner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle, XCircle, X } from "lucide-react";

const contactSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse e-mail valide"),
  phone: z.string().min(10, "Veuillez entrer un numéro de téléphone valide"),
  postalCode: z.string().min(5, "Le code postal doit contenir 5 chiffres"),
  city: z.string().min(2, "Veuillez entrer une ville valide"),
  comments: z
    .string()
    .min(10, "Votre message doit contenir au moins 10 caractères"),
  newsletter: z.boolean().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

type Toast = { type: "success" | "error"; message: string } | null;

export default function ContactPage() {
  const [toast, setToast] = useState<Toast>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      postalCode: "",
      city: "",
      comments: "",
      newsletter: false,
    },
  });

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Données soumises:", data);
      return data;
    },
    onSuccess: () => {
      reset();
      setToast({
        type: "success",
        message: "Votre message a été envoyé avec succès !",
      });
    },
    onError: () => {
      setToast({
        type: "error",
        message: "Une erreur est survenue. Veuillez réessayer plus tard.",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    submitMutation.mutate(data);
  };

  return (
    <PageLayoutBanner
      title="Contactez-nous"
      description="Nous nous réjouissons de vous rencontrer bientôt."
      bannerImage={"service-img.png"}
    >
      {toast && (
        <div
          role="alert"
          className={`fixed top-20 left-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border min-w-[280px] max-w-[90vw] -translate-x-1/2 animate-in fade-in slide-in-from-top-4 duration-300 ${
            toast.type === "success"
              ? "bg-black border-green-500 text-white"
              : "bg-black border-red-500 text-white"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle className="w-6 h-6 flex-shrink-0 text-green-500" />
          ) : (
            <XCircle className="w-6 h-6 flex-shrink-0 text-red-500" />
          )}
          <p className="flex-1 text-sm font-medium">{toast.message}</p>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="p-1 rounded hover:bg-white/10 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <main className="relative">
        <article className="container mt-6 mx-auto">
          <header>
            <div
              className="bg-red-700 w-1/3 h-3 my-8 mx-auto"
              role="presentation"
            ></div>
          
          </header>

          <section className="mb-12">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-3xl min-w-0 mx-auto p-6 bg-black shadow-lg overflow-hidden space-y-5"
              aria-labelledby="contact-form"
            >
              <fieldset className="flex flex-col sm:flex-row sm:gap-4">
                <legend className="sr-only">Informations personnelles</legend>
                <div className="flex-1 min-w-0">
                  <label htmlFor="firstName" className="block font-bold mb-2 text-white">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName")}
                    className="w-full min-w-0 px-3 py-2 border border-white bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-invalid={errors.firstName ? "true" : "false"}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <label htmlFor="lastName" className="block font-bold mb-2 text-white">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                    className="w-full min-w-0 px-3 py-2 border border-white bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-invalid={errors.lastName ? "true" : "false"}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </fieldset>

              <fieldset className="flex flex-col sm:flex-row sm:gap-4">
                <legend className="sr-only">Coordonnées</legend>
                <div className="flex-1 min-w-0">
                  <label htmlFor="email" className="block font-bold mb-2 text-white">
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className="w-full min-w-0 px-3 py-2 border border-white bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <label htmlFor="phone" className="block font-bold mb-2 text-white">
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    className="w-full min-w-0 px-3 py-2 border border-white bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-invalid={errors.phone ? "true" : "false"}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </fieldset>

              <fieldset className="flex flex-col sm:flex-row sm:gap-4">
                <legend className="sr-only">Localisation</legend>
                <div className="flex-1 min-w-0">
                  <label htmlFor="postalCode" className="block font-bold mb-2 text-white">
                    Code postal
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    {...register("postalCode")}
                    className="w-full min-w-0 px-3 py-2 border border-white bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-invalid={errors.postalCode ? "true" : "false"}
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <label htmlFor="city" className="block font-bold mb-2 text-white">
                    Ville
                  </label>
                  <input
                    type="text"
                    id="city"
                    {...register("city")}
                    className="w-full min-w-0 px-3 py-2 border border-white bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-invalid={errors.city ? "true" : "false"}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </fieldset>

              <div className="min-w-0">
                <label htmlFor="comments" className="block font-bold mb-2 text-white">
                  Commentaire
                </label>
                <textarea
                  id="comments"
                  {...register("comments")}
                  rows={4}
                  className="w-full min-w-0 max-w-full box-border px-3 py-2 border border-white bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white resize-y"
                  aria-invalid={errors.comments ? "true" : "false"}
                />
                {errors.comments && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.comments.message}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="newsletter"
                  {...register("newsletter")}
                  className="w-4 h-4 border-2 border-white bg-black rounded-sm accent-red-600 focus:ring-white"
                />
                <label htmlFor="newsletter" className="font-bold text-white cursor-pointer">
                  Recevez les dernières actualités
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-black py-3 px-4 font-bold bg-white border border-white hover:bg-red-700 hover:text-white hover:border-red-700 focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-300"
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer"}
              </button>
            </form>
          </section>
        </article>
      </main>
    </PageLayoutBanner>
  );
}
