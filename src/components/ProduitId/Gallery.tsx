import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProductGallery({ data }) {
  const media = data && Array.isArray(data.images) ? data.images : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (data && data.images) {
      setCurrentIndex(0);
    }
  }, [data?.images]);

  const selectedSrc = media[currentIndex];
  const handlePrev = () =>
    setCurrentIndex((idx) => (idx === 0 ? media.length - 1 : idx - 1));
  const handleNext = () =>
    setCurrentIndex((idx) => (idx === media.length - 1 ? 0 : idx + 1));
  const openModal = (idx) => {
    setCurrentIndex(idx);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!media.length) return null;

  if (media.length === 1) {
    return (
      <div className="mb-12">
        <div
          className="relative cursor-pointer overflow-hidden bg-white"
          onClick={() => openModal(0)}
        >
          <Image
            src={media[0]}
            alt={data.title || "Image produit"}
            width={1000}
            height={1000}
            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            unoptimized
          />
        </div>

        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <div className="relative bg-white p-4">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-black text-3xl"
                aria-label="Fermer la fenêtre"
              >
                &times;
              </button>
              <Image
                src={media[0]}
                alt={data.title || "Image produit"}
                width={1200}
                height={1200}
                className="object-cover transition-transform duration-300 hover:scale-110"
                unoptimized
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="hidden md:grid mb-12 grid-cols-2 gap-3 max-w-3xl">
        {media.map((src, idx) => (
          <div
            key={idx}
            onClick={() => openModal(idx)}
            className="relative cursor-pointer overflow-hidden bg-white"
          >
            <Image
              src={src}
              alt={`${data.title} vue ${idx + 1}`}
              width={700}
              height={700}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              unoptimized
            />
          </div>
        ))}
      </div>

      <div className="block md:hidden relative">
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 shadow-lg rounded-full p-2 z-20 hover:bg-white"
          aria-label="Image précédente"
        >
          <CircleChevronLeft size={40} className="text-black" />
        </button>
        <div className="overflow-hidden bg-white">
          <Image
            src={selectedSrc}
            alt={`${data.title} vue ${currentIndex + 1}`}
            width={700}
            height={700}
            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-110"
            unoptimized
          />
        </div>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 shadow-lg rounded-full p-2 z-20 hover:bg-white"
          aria-label="Image suivante"
        >
          <CircleChevronRight size={40} className="text-black" />
        </button>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="relative bg-white p-4">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-black text-3xl"
              aria-label="Fermer la fenêtre"
            >
              &times;
            </button>
            <Image
              src={selectedSrc}
              alt={`${data.title} vue ${currentIndex + 1}`}
              width={800}
              height={800}
              className="object-cover transition-transform duration-300 hover:scale-110"
              unoptimized
            />
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 shadow-lg rounded-full p-2 hover:bg-white"
              aria-label="Image précédente"
            >
              <CircleChevronLeft size={40} className="text-black" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 shadow-lg rounded-full p-2 hover:bg-white"
              aria-label="Image suivante"
            >
              <CircleChevronRight size={40} className="text-black" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
