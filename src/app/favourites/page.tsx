"use client";

import { useFavourites } from "../(components)/useFavouritesHook";
import { useCookies } from "react-cookie";
import { mangadex } from "../(components)/mangaDexInstance";
import { useEffect, useState } from "react";
import { IMangaInfo } from "@consumet/extensions";
import MangaGrid from "../(components)/manga-grid";

export default function FavouritesPage() {
  const [cookie, setCookie, removeCookie] = useCookies(["userId"]);

  const [favourites, setFavourites] = useFavourites<string[]>(
    cookie.userId ?? null,
    []
  );

  const [mangaInfos, setMangaInfos] = useState<IMangaInfo[]>([]);

  useEffect(() => {
    const fetchMangaInfo = async () => {
      const mangaInfos = favourites.map(async (fav) => {
        const mangaInfo = await mangadex.fetchMangaInfo(fav);
        return mangaInfo;
      });

      const finishedFetched = await Promise.all(mangaInfos);

      setMangaInfos(finishedFetched);
    };

    fetchMangaInfo();
  }, [favourites]);

  console.log(favourites);

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 text-white">
      {mangaInfos.map((mangaInfo) => {
        return <MangaGrid mangaInfo={mangaInfo} key={mangaInfo.id} />;
      })}
    </div>
  );
}
