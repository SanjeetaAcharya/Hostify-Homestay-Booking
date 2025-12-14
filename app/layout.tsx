import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const roboto = Roboto({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '700', '900']
});

export const metadata: Metadata = {
  title: "Hostify - Find Your Perfect Stay",
  description: "Book unique homes and experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        <main className="min-h-screen bg-white">
          {children}
        </main>
      </body>
    </html>
  );
}