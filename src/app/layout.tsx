import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Accedemia",
  description: "Plataforma de aprendizaje para las Pautas de Accesibilidad Web (WCAG)",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/dark-favicon.ico",
        href: "/images/dark-favicon.ico",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/icon.png",
        href: "/images/light-favicon.ico",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`
        ${geistSans.variable}
        ${geistMono.variable}
        antialiased
      `}>
        <div className={`
          bg-base-200 flex flex-col
          lg:h-screen lg:w-screen
        `}>
          <Navbar />
          <div className="flex flex-1 flex-col overflow-hidden">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
