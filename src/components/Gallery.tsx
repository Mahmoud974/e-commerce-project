import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const media = [
  { type: "image", src: "/item/5.png" },
  { type: "image", src: "/item/2.png" },
  { type: "image", src: "/item/3.png" },
  { type: "image", src: "/item/4.png" },
  { type: "image", src: "/item/1.png" },
  { type: "image", src: "/item/6.png" },
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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex]);

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div>
      <div className="md:flex hidden mb-12 flex-col md:flex-row">
        {/* Galerie pour desktop (sans carrousel) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
          {media.map((item, index) => (
            <div
              key={index}
              onClick={() => openModal(index)}
              className="relative cursor-pointer w-auto"
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt="Canapé"
                  width={700}
                  height={700}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <div className="relative w-full h-full bg-black object-cover text-white">
                  <img
                    src="/video-placeholder.jpg"
                    className="absolute inset-0 w-full h-full opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                    ▶
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Carrousel avec flèches seulement en version mobile */}
      <div className="block md:hidden relative">
        <div className="flex items-center justify-center space-x-2 overflow-hidden">
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-4xl p-2"
          >
            <CircleChevronLeft />
          </button>

          <Image
            src={media[currentIndex].src}
            alt="Canapé"
            width={700}
            height={700}
            className="w-full h-auto object-cover"
            unoptimized
          />

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-4xl p-2"
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
            <div className="relative">
              <Image
                src={selected.src}
                alt="Image sélectionnée"
                width={800}
                height={800}
                className="w-auto h-auto object-cover"
                unoptimized
              />
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 text-black  text-4xl p-2"
              >
                <CircleChevronLeft />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-black  text-4xl p-2"
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
