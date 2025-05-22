import React from "react";
import Navbar from "@/components/Header/Navbar";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ProductLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  showNavbar?: boolean;
}

export default function ProductLayout({
  children,
  title,
  description,
  breadcrumbs,
  showNavbar = true,
}: ProductLayoutProps) {
  return (
    <section className="flex flex-col min-h-screen">
      <div className="container mx-auto mt-8 mb-12">
        {showNavbar && <Navbar />}

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight className="w-4 h-4" />}
              {item.href ? (
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <p className="mb-8 text-gray-600">{description}</p>

        {children}
      </div>
    </section>
  );
}
