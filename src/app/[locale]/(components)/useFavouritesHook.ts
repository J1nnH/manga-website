"use client";

import { useCookies } from "react-cookie";
import useSWR from "swr";

// Custom hook for user favourited manga id
export const useFavourites = (): {
  favourites: string[];
  favouriteLoading: boolean;
  error: any; 
} => {
  const [cookie, _, __] = useCookies(["userId"]);

  const userId = cookie.userId;

  const fetchData = async(url: string | null, userId: string) => {
    if(!url || !userId) return [];

    try {
       const fetchedFavourite = await fetch(url, { method: "GET" });
       const data = await fetchedFavourite.json();

       if(data.status === "Success") {
            return data.message;
       } else {
            return [];
       }
    } catch (error) {
        console.log(error);
        return [];
    }
  }

  const { data, isLoading, error } = useSWR([ userId ? `/api/get-favourite?userId=${userId}` : null, userId ], ([url, userId]) => fetchData(url, userId));

  return { favourites: data as string[], favouriteLoading: isLoading, error };
};
