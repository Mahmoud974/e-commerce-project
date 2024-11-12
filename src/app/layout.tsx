import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import QueryProvider from "@/hook/__provider";
import SessionWrapper from "./SessionWrapper";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={` antialiased`}>
          <QueryProvider>{children}</QueryProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
