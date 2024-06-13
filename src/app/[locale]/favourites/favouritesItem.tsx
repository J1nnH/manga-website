"use client";

import { useFavourites } from "../(components)/useFavouritesHook";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { IMangaInfo } from "@consumet/extensions";
import MangaGrid from "../(components)/manga-grid";
import { useTranslation } from "react-i18next";
import { fetchFavourite } from "./fetchFavourite";

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
        // Wait for manga infos to fetch
        const mangaInfos = await fetchFavourite(favourites);
        // Save the manga info in state
        setMangaInfos(mangaInfos);
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
    <div className="p-4 bg-slate-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">{t("favourites")}</h1>
      {
        // Contents is still loading
        isLoading ? (
          <div>{t("prompt1")}</div>
        ) : // Contents finished loading
        favourites.length !== 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
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
