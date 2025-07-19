"use client";
import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import dynamic from "next/dynamic";
import ErrorDebugger from "./ErrorDebugger";

const DetailsCard = dynamic(() => import("./DetailsCard"), {
  //Lazy loading using next/dynamic
  loading: () => <p className="text-white">Loading details...</p>,
  ssr: false,
});

interface Props {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  isMovie?: boolean; // Using this so that we are also able to render in TV shows eventually.
}

export default function MovieCard({ id, title, poster_path, release_date, isMovie }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  // Close modal on ESC

  useEffect(() => {
    if (!showDetails) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowDetails(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showDetails]); //My dependency list here is showDetails thus, any change in it will call the useEffect

  // Close modal on click outside
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setShowDetails(false);
    }
  }, []);

  const handleClick = () => {
    console.log("MovieCard clicked:", { id, title, isMovie });
    try {
      setShowDetails(true);
    } catch (error) {
      console.error("Error opening movie details:", error);
    }
  };

  useEffect(() => {
    if (!showDetails) return;
    document.body.style.overflow = "auto";
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDetails, handleClickOutside]);
  //handling scrolling ^
  return (
    <>
      <div
        onClick={handleClick}
        className="relative border rounded  overflow-hidden shadow hover:shadow-lg hover:opacity-80 cursor-pointer bg-zinc-900 text-white transition-transform hover:scale-105"
      >
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Prevents infinite loop

            target.src =
              "https://www.subtraction.com/wp-content/uploads/2018/01/2018-01-04-2017-movies-watched.jpg";
          }} //Work on
          alt={title}
          className="w-full h-full object-cover"
        />

        <div className="p-2 absolute bottom-0 left-0 ">
          <h2 className="text-lg text-white font-semibold line-clamp-2 z-20">
            {title}{" "}
            {release_date ? `(${release_date.split("-")[0]})` : ""}
          </h2>
          {/* Here I am trying to avoid an error when the release_date undefined or null therefore, causing an error when we run .split() on it */}

          
        </div>
      </div>

      {/* Conditional rendering to lazy load the component of details card when we click on it. Instead of navigating to a seperate page.*/}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm transition-all">
          <div
            ref={modalRef}
            className="relative w-full  max-w-2xl mx-2 bg-zinc-900 rounded-lg shadow-lg p-4 animate-fadeIn"
          >
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-2 right-2 w-5 h-5 flex justify-center items-center text-gray-300 hover:text-red-500   font-bold focus:outline-none"
              aria-label="Close details"
            >
              &times;
            </button>
            <Suspense fallback={<div className="text-white">Loading details...</div>}>
              <ErrorDebugger>
                <DetailsCard id={id} isMovie={isMovie} />
              </ErrorDebugger>
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
}
