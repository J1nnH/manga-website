"use client";

import React from "react";
import { mangadex } from "@/components/mangaDexInstance";
import MangaGrid from "@/components/manga-grid";
import { useState, useEffect } from "react";
import { IMangaInfo, IMangaResult, ISearch } from "@consumet/extensions";
import { Button } from "@/components/ui/button";

export default function UserSearchPage({
  params,
}: {
  params: { searchTitle: string };
}) {
  // Convert into readable title
  const searchTitle = params.searchTitle.split("%20").join(" ");

  const [pageNum, setPageNum] = useState<number>(1);

  const [mangaDetails, setMangaDetails] = useState<{
    [mangaId: string]: IMangaInfo;
  }>({});

  useEffect(() => {
    const fetchSearchResult = async () => {
      const res = await mangadex.search(searchTitle, pageNum, 18);

      setMangaDetails({});

      res.results.map(async (manga) => {
        const details = await mangadex.fetchMangaInfo(manga.id);
        setMangaDetails((prev) => {
          return { ...prev, [manga.id]: details };
        });
      });
    };

    fetchSearchResult();
  }, [pageNum, searchTitle]);

  const mangaDetailsArr = Object.keys(mangaDetails);

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 text-white">
        {mangaDetailsArr.length !== 0 ? (
          mangaDetailsArr.map((mangaDetailKey) => {
            return (
              <MangaGrid
                key={mangaDetailKey}
                mangaInfo={mangaDetails[mangaDetailKey]}
              />
            );
          })
        ) : (
          <div className="text-black">
            You have reached the maximum contents
          </div>
        )}
      </div>
      <div className="flex gap-3 justify-center items-center mt-5">
        <Button
          onClick={() => setPageNum((prev) => (prev === 1 ? prev : prev - 1))}
        >
          Previous Page
        </Button>
        <Button
          onClick={() => setPageNum((prev) => prev + 1)}
          disabled={mangaDetailsArr.length === 0}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
}
