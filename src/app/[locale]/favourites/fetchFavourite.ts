"use server";

import { IMangaInfo } from "@consumet/extensions";
import { mangadex } from "../(components)/mangaDexInstance";
import { unstable_cache } from "next/cache";

export const fetchFavourite = async (
  favourites: string[]
): Promise<IMangaInfo[]> => {
  try {
    // Map thru all favourited manga to fetch their info
      const mangaInfos = favourites.map(async (fav) => {
      const mangaInfo = await unstable_cache(
        async () => mangadex.fetchMangaInfo(fav),
        [fav],
        { tags: ["manga-info"], revalidate: 86400 }
      )();
      return mangaInfo;
    });

    // Wait for all manga info to finish fetching
    const finishedFetched = await Promise.all(mangaInfos);

    // Return the fetched manga infos
    return finishedFetched;
  } catch (error) {
    console.log(error);
    return [];
  }
};
