"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getFavourite } from "../../api/get-favourite";

// Custom hook for user favourited manga id
export const useFavourites = <T>(
  userId: string,
  initialState: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [favourites, setFavourites] = useState<T>(initialState);

  useEffect(() => {
    const fetchFavourite = async () => {
      const data = await getFavourite(userId);

      if (data.status === "Success") {
        setFavourites(data.message);
      } else {
        console.log(data.message);
      }
    };

    fetchFavourite();
  }, [userId]);

  return [favourites, setFavourites];
};
