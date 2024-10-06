"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

// Custom hook for user favourited manga id
export const useFavourites = (): {
  favourites: string[];
  setFavourites: Dispatch<SetStateAction<string[]>>;
  fetchLoading: boolean;
} => {
  const [favourites, setFavourites] = useState<string[]>([]);
  const [cookie, setCookie, removeCookie] = useCookies(["userId"]);
  const [fetchLoading, setFetchLoading] = useState(true);

  const userId = cookie.userId;

  useEffect(() => {
    setFetchLoading(true);
    const fetchFavourite = async () => {
        try {
            if (!userId) return;
            const res = await fetch(`/api/get-favourite?userId=${userId}`, {
                method: "GET",
            });

            const data = await res.json();

            if (data.status === "Success") {
                setFavourites(data.message);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setFetchLoading(false);
        }
    }

    fetchFavourite();
  }, [userId]);
  return { favourites, setFavourites, fetchLoading };
};
