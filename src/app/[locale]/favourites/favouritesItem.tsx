"use client";

import { useFavourites } from "../(components)/useFavouritesHook";
import { useCookies } from "react-cookie";
import { mangadex } from "../(components)/mangaDexInstance";
import { useEffect, useState } from "react";
import { IMangaInfo } from "@consumet/extensions";
import MangaGrid from "../(components)/manga-grid";
import { useTranslation } from "react-i18next";

export default function FavouritesPage() {
  const { t } = useTranslation();

  // Retrieve user id from browser cookie
  const [cookie, setCookie, removeCookie] = useCookies(["userId"]);

  const [isLoading, setIsLoading] = useState(true);

  // Store all user favourited manga
  const [favourites, setFavourites] = useFavourites<string[]>(
    cookie.userId ?? null,
    []
  );

  // Store favourited mangas' info
  const [mangaInfos, setMangaInfos] = useState<IMangaInfo[]>([]);

  useEffect(() => {
    // Set loading to true
    setIsLoading(true);

    const fetchMangaInfo = async () => {
      try {
        // Map thru all favourited manga to fetch their info
        const mangaInfos = favourites.map(async (fav) => {
          const mangaInfo = await mangadex.fetchMangaInfo(fav);
          return mangaInfo;
        });

        // Wait for all manga info to finish fetching
        const finishedFetched = await Promise.all(mangaInfos);

        // Save the manga info in state
        setMangaInfos(finishedFetched);
      } catch (error) {
        console.log(error);
      } finally {
        // Set loading to false
        setIsLoading(false);
      }
    };

    fetchMangaInfo();
  }, [favourites]);

  return (
    <div>
      {
        // Contents is still loading
        isLoading ? (
          <div>{t("prompt1")}</div>
        ) : // Contents finished loading
        favourites.length !== 0 ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 text-white p-5 bg-slate-900 min-h-screen">
            {mangaInfos.map((mangaInfo) => {
              return <MangaGrid mangaInfo={mangaInfo} key={mangaInfo.id} />;
            })}
          </div>
        ) : (
          // User does not have any favourites
          <div>{t("prompt2")}</div>
        )
      }
    </div>
  );
}
