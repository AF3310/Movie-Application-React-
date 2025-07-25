import React, { useState } from 'react';
import { LikeFilled } from '@ant-design/icons';
import {useFavouritesStores}  from '../store/useFavouritesStore';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

interface Props{
    movie: Movie;
}
const AddFavourite = ({movie}:Props) => {
  const [showHeart, setShowHeart] = useState(false);
  const favourites=useFavouritesStores ((state)=> state.favourites);
  const addFavourite = useFavouritesStores((state) => state.addFavourite);
//   const removeFavourite= useFavouritesStores((state)=> state.removeFavourite)

  // Check if movie is already in favourites
  const isAlreadyFavourited = favourites.some((fav: Movie) => fav.id === movie.id);

  const handleClick = () => {
    // Only add if not already favourited
    if (!isAlreadyFavourited) {
      addFavourite(movie);
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800); // match animation duration
    }
  };

  return (
    <div className="relative w-10 h-10 mr-5 ">
      <button
        onClick={handleClick}
        className={`w-10 h-10 text-white flex justify-center items-center rounded-full shadow hover:scale-110 transition ${
          isAlreadyFavourited ? 'bg-green-500' : 'bg-red-500'
        }`}
        disabled={isAlreadyFavourited}
      >
        <LikeFilled />
      </button>

      {showHeart && (
        <div className="heart-burst">
          <LikeFilled />
        </div>
      )}
    </div>
  );
};

export default AddFavourite;
