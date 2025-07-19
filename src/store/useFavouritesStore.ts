import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

interface FavouritesState {
  favourites: Movie[];
  addFavourite: (movie: Movie) => void;
  removeFavourite: (id: number) => void;
}

export const useFavouritesStores = create<FavouritesState>()(
  persist(
    (set) => ({
      favourites: [],
      addFavourite: (movie) => set((state) => ({ favourites: [...state.favourites, movie] })),
      removeFavourite: (id) => set((state) => ({ favourites: state.favourites.filter((m) => m.id !== id) }))
    }),
    {
      name: 'favourites-storage', // name of item in storage
    }
  )
);
