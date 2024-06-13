"use server";

import { IMangaInfo } from "@consumet/extensions";
import { mangadex } from "../(components)/mangaDexInstance";

export const fetchFavourite = async (
  favourites: string[]
): Promise<IMangaInfo[]> => {
  try {
    // Map thru all favourited manga to fetch their info
    const mangaInfos = favourites.map(async (fav) => {
      const mangaInfo = await mangadex.fetchMangaInfo(fav);
      return mangaInfo;
    });

    // Wait for all manga info to finish fetching
    const finishedFetched = await Promise.all(mangaInfos);

    console.log(finishedFetched);

    // Return the fetched manga infos
    return finishedFetched;
  } catch (error) {
    console.log(error);
    return [];
  }
};
