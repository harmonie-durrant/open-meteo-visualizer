import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Open Météo Visualizer",
  description: "A project to visialize weather data from the open-meteo api.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        cz-shortcut-listen="true"
        className="min-h-screen flex flex-col bg-gray-100 text-gray-900"
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
