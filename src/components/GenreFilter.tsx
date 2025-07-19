"use client";

import { useRouter, useSearchParams } from 'next/navigation';

interface Genre {
  id: number;
  name: string;
}

interface Props {
  genres: Genre[];
}

export default function GenreFilter({ genres }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentGenre = searchParams.get('genre');

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = event.target.value;
    if (genreId) {
      router.push(`/?genre=${genreId}`);
    } else {
      router.push('/');
    }
  };

  // Safety check to ensure genres is an array
  const safeGenres = Array.isArray(genres) ? genres : [];

  return (
    <div className="mb-0">
      <select
        onChange={handleGenreChange}
        value={currentGenre || ''}
        className="bg-zinc-800  text-white p-2 rounded-md border text-sm border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500 py-0.5"
      >
        <option value="">All Genres</option>
        {safeGenres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
} 