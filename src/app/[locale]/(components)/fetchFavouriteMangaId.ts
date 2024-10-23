"use server";
import { revalidateTag, unstable_cache } from "next/cache";

export const fetchFavouriteMangaId = unstable_cache(async(userId: string) => {
  try {
    const res = await fetch(
      `http:localhost:3000/api/get-favourite?userId=${userId}`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    if (data.status === "Success") {
      return data.message;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}, ["favourite"], { revalidate: 3600, tags: ["favourite"] })

