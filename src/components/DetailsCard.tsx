// components/DetailsCard.tsx
"use client";
import { useEffect, useState } from "react";
import { getMovieById, getShowById } from "../lib/api";
import AddFavourite from "./AddFavourite";
import RemoveFavourite from "./RemoveFavourite";
import Link from "next/link";

interface Props {
  id: number;
  isMovie?:boolean;
}

export default function DetailsCard({ id, isMovie }: Props) {
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = isMovie 
          ? await getMovieById(String(id)) 
          : await getShowById(String(id));
        
        if (data) {
          setMovie(data);
        } else {
          setError('Failed to load movie details');
        }
      } catch (err) {
        console.error('Error fetching movie:', err);
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovie();
  }, [id, isMovie]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="text-center p-8">
        <p className="text-red-400">{error || 'Movie not found'}</p>
      </div>
    );
  }

  return (
    <div className="mt-10 text-white max-h-fit">
      {movie.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          className="w-full rounded"
          alt={movie.title || movie.name}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      )}

      <h1 className="text-2xl font-bold mt-2">{movie.title || movie.name}</h1>
      <p className="text-sm text-gray-400">{movie.release_date || movie.first_air_date}</p>
      <p className="mt-2 text-gray-300">{movie.overview}</p>
      
      {movie.genres && movie.genres.length > 0 && (
        <ul className="mt-2 text-gray-300 flex flex-row mr-3">
          Genres: {movie.genres.map((element: any, index: any) => (
            <li key={index} className="mr-2 ml-2 text-gray-300 flex flex-row">
              {element.name}
            </li>
          ))}
        </ul>
      )}
      
      <p className="mt-2 text-gray-300">Rating: {movie.vote_average?.toFixed(1)} / 10</p>
      
      {/* Display runtime for movies or shows */}
      {movie.runtime && <p className="mt-2 text-gray-300">Runtime: {movie.runtime} min</p>}
      {movie.episode_run_time && movie.episode_run_time.length > 0 && (
        <p className="mt-2 text-gray-300">Episode Runtime: {movie.episode_run_time[0]} min</p>
      )}

      <div className="flex flex-row mt-1">
        <AddFavourite movie={movie}/>
        <RemoveFavourite id={movie.id}/>
      </div>
      
      <div className="mt-2">
        <Link href={`/movie/${movie.id}/cast`}>
          <button className="text-white font-bold py-2 px-4 rounded mt-2">
            View Cast
          </button>
        </Link>
      </div>
    </div>
  );
}
