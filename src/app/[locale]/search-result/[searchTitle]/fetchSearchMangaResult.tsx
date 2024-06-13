"use server";

import { IMangaInfo } from "@consumet/extensions";
import { mangadex } from "../../(components)/mangaDexInstance";

export const fetchSearchMangaResult = async (
  searchTitle: string,
  pageNum: number,
  limit: number
): Promise<{
  [mangaId: string]: IMangaInfo;
}> => {
  const mangaDetails: {
    [mangaId: string]: IMangaInfo;
  } = {};
  try {
    // Fetch the manga based on the search title
    const res = await mangadex.search(searchTitle, pageNum, limit);
    // Map thru all the retrieved manga array
    const fetchDetailsPromise = res.results.map(async (manga) => {
      // Fetch the manga detail of each individual manga
      const details = await mangadex.fetchMangaInfo(manga.id);
      // Updates the manga details
      mangaDetails[manga.id] = details;
    });
    // Wait for fetching manga details to complete
    await Promise.all(fetchDetailsPromise);
  } catch (error) {
    console.log(error);
  } finally {
    return mangaDetails;
  }
};
