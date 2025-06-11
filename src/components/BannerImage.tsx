import Image from "next/image";

const Banner = ({ title, description, imageSrc }) => {
  return (
    <div className="relative w-full h-[400px] mt-12">
      <Image
        src={imageSrc || "/banners/default-banner.jpg"}
        alt="banner"
        fill
        className="object-cover brightness-50"
        priority
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <p className="text-white text-3xl font-black uppercase text-center sm:text-4xl">
          {title}
        </p>
        <p className="text-white w-3/4 sm:w-2/3 md:w-1/2 text-center mt-4 px-4">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Banner;
