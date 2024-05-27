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

  const [mangaSearchResults, setMangaSearchResults] =
    useState<ISearch<IMangaResult>>();

  const [pageNum, setPageNum] = useState<number>(1);

  const [mangaDetails, setMangaDetails] = useState<{
    [mangaId: string]: IMangaInfo;
  }>();

  useEffect(() => {
    const fetchSearchResult = () => {
      mangadex.search(searchTitle, pageNum, 18).then((data) => {
        setMangaSearchResults(data);
      });
    };

    const fetchMangaDetails = () => {
      mangaSearchResults?.results.forEach((manga) => {
        mangadex.fetchMangaInfo(manga.id).then((data) => {
          setMangaDetails((prev) => {
            return { ...prev, [manga.id]: data };
          });
        });
      });
    };

    fetchSearchResult();
    fetchMangaDetails();
  }, [pageNum, searchTitle, mangaSearchResults]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 text-white">
        {mangaSearchResults?.results.map((manga) => {
          return (
            <MangaGrid
              key={manga.id}
              mangaInfo={mangaDetails ? mangaDetails[manga.id] : null}
            />
          );
        })}
      </div>
      <div>
        <Button
          onClick={() => setPageNum((prev) => (prev === 1 ? prev : prev - 1))}
        >
          Prevoious Page
        </Button>
        <Button onClick={() => setPageNum((prev) => prev + 1)}>
          Next Page
        </Button>
      </div>
    </div>
  );
}
