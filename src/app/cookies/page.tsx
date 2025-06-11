"use client";

import React, { useState, useEffect } from "react";
import PageLayoutBanner from "@/components/Layouts/PageLayoutBanner";

export default function CookiesPage() {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedPreferences = localStorage.getItem("cookiePreferences");
    if (savedPreferences) {
      setCookiePreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setCookiePreferences((prev) => ({
      ...prev,
      [name]: checked,
    }));
    setSaved(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify(cookiePreferences)
    );

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setCookiePreferences(allAccepted);
    localStorage.setItem("cookiePreferences", JSON.stringify(allAccepted));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <PageLayoutBanner
      title="Gestion des Cookies"
      description="Contrôlez comment nous utilisons les cookies sur notre site"
      bannerImage="service-img.png"
    >
      <main className="relative">
        <article className="container mt-6 mx-auto">
          <header>
            <div
              className="bg-red-700 w-1/3 h-3 my-8 mx-auto"
              role="presentation"
            ></div>
            <h2 className="text-2xl font-bold text-center mb-8">
              Paramètres des Cookies
            </h2>
          </header>

          <section className="mb-12 max-w-3xl mx-auto">
            <div className="bg-black p-6 shadow-lg">
              <p className="mb-6 text-gray-300">
                Nous utilisons des cookies pour améliorer votre expérience sur
                notre site, personnaliser le contenu et les publicités, fournir
                des fonctionnalités de médias sociaux et analyser notre trafic.
                Vous pouvez gérer vos préférences ci-dessous.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 border border-gray-700">
                  <div>
                    <h3 className="font-bold">Cookies nécessaires</h3>
                    <p className="text-sm text-gray-400">
                      Ces cookies sont indispensables au fonctionnement du site
                      et ne peuvent pas être désactivés.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    name="necessary"
                    checked={cookiePreferences.necessary}
                    disabled
                    className="h-5 w-5 accent-red-600"
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-700">
                  <div>
                    <h3 className="font-bold">Cookies fonctionnels</h3>
                    <p className="text-sm text-gray-400">
                      Ces cookies permettent d'améliorer les fonctionnalités et
                      la personnalisation de votre expérience.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    name="functional"
                    checked={cookiePreferences.functional}
                    onChange={handleChange}
                    className="h-5 w-5 accent-red-600"
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-700">
                  <div>
                    <h3 className="font-bold">Cookies analytiques</h3>
                    <p className="text-sm text-gray-400">
                      Ces cookies nous aident à comprendre comment les visiteurs
                      interagissent avec notre site.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    name="analytics"
                    checked={cookiePreferences.analytics}
                    onChange={handleChange}
                    className="h-5 w-5 accent-red-600"
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-700">
                  <div>
                    <h3 className="font-bold">Cookies marketing</h3>
                    <p className="text-sm text-gray-400">
                      Ces cookies sont utilisés pour suivre les visiteurs sur
                      les sites Web afin d'afficher des publicités pertinentes.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    name="marketing"
                    checked={cookiePreferences.marketing}
                    onChange={handleChange}
                    className="h-5 w-5 accent-red-600"
                  />
                </div>
              </div>

              {saved && (
                <div className="bg-green-700 text-white p-3 mb-4 text-center">
                  Vos préférences ont été enregistrées avec succès !
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleSavePreferences}
                  className="px-6 py-3 bg-white text-black font-bold hover:bg-gray-200 transition-colors"
                >
                  Enregistrer mes préférences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-3 bg-red-700 text-white font-bold hover:bg-red-800 transition-colors"
                >
                  Accepter tous les cookies
                </button>
              </div>
            </div>
          </section>
        </article>
      </main>
    </PageLayoutBanner>
  );
}
