import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBarWrapper from "../components/NavBarWrapper";
import { getMovieGenres } from "@/lib/api";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie App",
  description: "Created by Next",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let genres = [];
  try {
    genres = await getMovieGenres();
  } catch (error) {
    console.error('Error fetching genres in layout:', error);
    genres = []; // Fallback to empty array
  }
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen`}>
           {/*Using antialiased to make smoother.  */}
           <Suspense>
           <NavBarWrapper genres={genres} />
           </Suspense>

        <main className="pt-8">{children}</main>
      </body>
    </html>
  );
}
