'use client';
import { useFavouritesStores } from '../../store/useFavouritesStore';
import MovieCard from '@/components/MovieCard';

export default function FavoritesPage() {
  const { favourites } = useFavouritesStores();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Favorite Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {favourites.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
            isMovie={true}
          />
        ))}
      </div>
    </div>
  );
}
