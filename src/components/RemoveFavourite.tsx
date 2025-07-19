import React, { useState } from 'react';
import { useFavouritesStores } from '../store/useFavouritesStore';
import {DislikeFilled} from "@ant-design/icons"
interface RemoveFavouriteProps {
  id: number;
}

export default function RemoveFavourite({ id }: RemoveFavouriteProps) {
   const favourites=useFavouritesStores ((state)=> state.favourites);
    const removefavourite = useFavouritesStores((state) => state.removeFavourite);
  const [showDislike, setShowDislike] = useState(false);
    const handleClick = () => {
    setShowDislike(true);
    // Remove from favourites after animation starts
    setTimeout(() => {
      removefavourite(id);    // Reset animation state after animation completes
    }, 100); // Small delay to let animation start
    

    setTimeout(() => {
      setShowDislike(false);
    }, 800); // Match animation duration
  };
  return (<>
    <button
      onClick={handleClick}
      className="relative w-10 h-10 bg-red-500 text-white flex justify-center items-center rounded-full shadow hover:scale-110 transition"
      aria-label="Remove from favourites"
    >
      <DislikeFilled/>
      {showDislike && (
        <div className="dislike-burst">
          <DislikeFilled />
        </div>
      )}
    </button>
    </>
  );
}