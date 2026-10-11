import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WELCOME ITZFIZZ | Scroll Hero",
  description: "High performance scroll-driven hero experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#1F2316] text-white selection:bg-[#50EF7E] selection:text-black">
        {children}
      </body>
    </html>
  );
}
