"use client";

import React from "react";
import PageLayoutBanner from "@/components/Layouts/PageLayoutBanner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

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

export default function ContactPage() {
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

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Données soumises:", data);
      return data;
    },
    onSuccess: () => {
      alert("Votre message a été envoyé avec succès!");
      reset();
    },
    onError: () => {
      alert("Une erreur est survenue. Veuillez réessayer plus tard.");
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
      <main className="relative">
        <article className="container mt-6 mx-auto">
          <header>
            <div
              className="bg-red-700 w-1/3 h-3 my-8 mx-auto"
              role="presentation"
            ></div>
            <h2 className="text-2xl font-bold text-center mb-8">
              Contactez-nous
            </h2>
          </header>

          <section className="mb-12">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-3xl mx-auto p-6 bg-black shadow-lg"
              aria-labelledby="contact-form"
            >
              <fieldset className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
                <legend className="sr-only">Informations personnelles</legend>

                <div className="w-full mb-4 sm:mb-0">
                  <label htmlFor="firstName" className="block font-bold mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName")}
                    className="w-full px-3 py-2 border border-gray-300 bg-black focus:outline-none focus:ring focus:ring-red-300"
                    aria-invalid={errors.firstName ? "true" : "false"}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <label htmlFor="lastName" className="block font-bold mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                    className="w-full px-3 py-2 border border-gray-300 bg-black focus:outline-none focus:ring focus:ring-red-300"
                    aria-invalid={errors.lastName ? "true" : "false"}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </fieldset>

              <fieldset className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
                <legend className="sr-only">Coordonnées</legend>

                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label htmlFor="email" className="block font-bold mb-2">
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className="w-full px-3 py-2 border border-gray-300 bg-black focus:outline-none focus:ring focus:ring-red-300"
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="w-full sm:w-1/2">
                  <label htmlFor="phone" className="block font-bold mb-2">
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    className="w-full px-3 py-2 border border-gray-300 bg-black focus:outline-none focus:ring focus:ring-red-300"
                    aria-invalid={errors.phone ? "true" : "false"}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </fieldset>

              <fieldset className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
                <legend className="sr-only">Localisation</legend>

                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label htmlFor="postalCode" className="block font-bold mb-2">
                    Code postal
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    {...register("postalCode")}
                    className="w-full px-3 py-2 border border-gray-300 bg-black focus:outline-none focus:ring focus:ring-red-300"
                    aria-invalid={errors.postalCode ? "true" : "false"}
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>

                <div className="w-full sm:w-1/2">
                  <label htmlFor="city" className="block font-bold mb-2">
                    Ville
                  </label>
                  <input
                    type="text"
                    id="city"
                    {...register("city")}
                    className="w-full px-3 py-2 border border-gray-300 bg-black focus:outline-none focus:ring focus:ring-red-300"
                    aria-invalid={errors.city ? "true" : "false"}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </fieldset>

              <div className="mb-4">
                <label htmlFor="comments" className="block font-bold mb-2">
                  Commentaire
                </label>
                <textarea
                  id="comments"
                  {...register("comments")}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 bg-black focus:outline-none focus:ring focus:ring-red-300"
                  aria-invalid={errors.comments ? "true" : "false"}
                ></textarea>
                {errors.comments && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.comments.message}
                  </p>
                )}
              </div>

              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="newsletter"
                  {...register("newsletter")}
                  className="mr-2"
                />
                <label htmlFor="newsletter" className="font-bold">
                  Recevez les dernières actualités
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-black py-2 px-4 font-bold bg-white hover:bg-red-700 hover:text-white focus:outline-none focus:ring focus:ring-red-300 transition-colors duration-300"
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
