"use client";
import React from "react";
import NavBar from "./NavBar";
import { usePathname } from "next/navigation";

interface Genre {
  id: number;
  name: string;
}

export default function NavBarWrapper({ genres }: { genres: Genre[] }) {
  const pathname = usePathname();
  // We can add logic here to conditionally render the NavBar
  // For example, not rendering it on a login page


  return <NavBar genres={genres} />;
} 