import React, { useState } from 'react';
import { useFavouritesStores } from '../store/useFavouritesStore';
import {DislikeFilled} from "@ant-design/icons"
interface RemoveFavouriteProps {
  id: number;
}

export default function RemoveFavourite({ id }: RemoveFavouriteProps) {
    const removefavourite = useFavouritesStores((state) => state.removeFavourite);
  const [showHeart, setShowHeart] = useState(false);
    const handleClick = () => {
    setShowHeart(true);
    // Remove from favourites after animation starts
    setTimeout(() => {
      removefavourite(id);
    }, 100); // Small delay to let animation start
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setShowHeart(false);
    }, 800); // Match animation duration
  };
  return (<>
    <button
      onClick={handleClick}
      className="relative w-10 h-10 bg-red-500 text-white flex justify-center items-center rounded-full shadow hover:scale-110 transition"
      aria-label="Remove from favourites"
    >
      <DislikeFilled/>
      {showHeart && (
        <div className="dislike-burst">
          <DislikeFilled />
        </div>
      )}
    </button>
    </>
  );
}