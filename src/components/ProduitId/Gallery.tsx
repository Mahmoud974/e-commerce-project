import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const media = [
  { type: "image", src: "/produit/5.png" },
  { type: "image", src: "/produit/2.png" },
  { type: "image", src: "/produit/3.png" },
  { type: "image", src: "/produit/4.png" },
  { type: "image", src: "/produit/1.png" },
  { type: "image", src: "/produit/6.png" },
];

export default function ProductGallery({ data }) {
  const [selected, setSelected] = useState(media[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? media.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelected(media[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex === media.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelected(media[newIndex]);
  };

  const openModal = (index) => {
    setSelected(media[index]);
    setCurrentIndex(index);
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
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div>
      <div className="md:flex hidden mb-12 flex-col md:flex-row">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
          {media.map((item, index) => (
            <div
              key={index}
              onClick={() => openModal(index)}
              className="relative cursor-pointer overflow-hidden w-auto"
            >
              <Image
                src={item.src}
                alt="Canapé"
                width={700}
                height={700}
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      <div className="block md:hidden relative">
        <div className="flex items-center justify-center space-x-2 overflow-hidden">
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-4xl p-2 z-10"
          >
            <CircleChevronLeft />
          </button>

          <div className="overflow-hidden">
            <Image
              src={media[currentIndex].src}
              alt="Canapé"
              width={700}
              height={700}
              className="w-full h-auto object-cover transform transition-transform duration-300 hover:scale-110"
              unoptimized
            />
          </div>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-4xl p-2 z-10"
          >
            <CircleChevronRight />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={handleModalClick}
        >
          <div className="relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-3xl p-2"
            >
              &times;
            </button>
            <div className="relative overflow-hidden">
              <Image
                src={selected.src}
                alt="Image sélectionnée"
                width={800}
                height={800}
                className="w-auto h-auto object-cover transform transition-transform duration-300 hover:scale-110"
                unoptimized
              />
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 text-black text-4xl p-2"
              >
                <CircleChevronLeft />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-black text-4xl p-2"
              >
                <CircleChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
