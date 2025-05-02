import Navbar from "@/components/Header/Navbar";
import Banner from "@/components/BannerImage";
import React from "react";

interface LayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  bannerImage: string;
}

const PageLayoutBanner: React.FC<LayoutProps> = ({
  title,
  description,
  children,
  bannerImage,
}) => {
  return (
    <section className="relative">
      <div className="container my-8 mx-auto">
        <Navbar />
        <Banner
          title={title}
          description={description}
          imageSrc={bannerImage}
        />
        {children}
      </div>
    </section>
  );
};

export default PageLayoutBanner;
