"use client";

import React from "react";
import { mangadex } from "@/app/[locale]/(components)/mangaDexInstance";
import MangaGrid from "@/app/[locale]/(components)/manga-grid";
import { useState, useEffect } from "react";
import { IMangaInfo } from "@consumet/extensions";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";


export default function UserSearchPage({
  params,
}: {
  params: { searchTitle: string };
}) {
    const {t} = useTranslation();

    // Convert into readable title
    const searchTitle = params.searchTitle.split("%20").join(" ");

    const [isLoading, setIsLoading] = useState(true);

    // Store curr page number
    const [pageNum, setPageNum] = useState<number>(1);

    // Store all manga details
    const [mangaDetails, setMangaDetails] = useState<{
        [mangaId: string]: IMangaInfo;
    }>({});

    // This function will execute when the page number and search title have changed
    useEffect(() => {
        // Content is loading
        setIsLoading(true);
        // Clear the manga details for previous page
        setMangaDetails({});

        const fetchSearchResult = async () => {
        try {
            // Fetch the manga based on the search title
            const res = await mangadex.search(searchTitle, pageNum, 18);

            // Map thru all the retrieved manga array
            const fetchDetailsPromise = res.results.map(async (manga) => {
            // Fetch the manga detail of each individual manga
            const details = await mangadex.fetchMangaInfo(manga.id);

            // Updates the manga details
            setMangaDetails((prev) => {
                return { ...prev, [manga.id]: details };
            });
            });

            // Wait for fetching manga details to complete
            await Promise.all(fetchDetailsPromise);
        } catch (error) {
            console.log(t("errMsg"));
        } finally {
            // Content has finished loading
            setIsLoading(false);
        }
        };

        fetchSearchResult();
    }, [pageNum, searchTitle]);

    // Getting an array with all the fetched manga id
    const mangaDetailsArr = Object.keys(mangaDetails);

    return (
        <div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 text-white">
            {
            // Contents is still loading
            isLoading ? (
                <div>{t("prompt")}</div>
            ) : // Contents finished loading
            mangaDetailsArr.length !== 0 ? (
                // Each manga is associated with a different component
                mangaDetailsArr.map((mangaDetailKey) => {
                return (
                    <MangaGrid
                    key={mangaDetailKey}
                    mangaInfo={mangaDetails[mangaDetailKey]}
                    />
                );
                })
            ) : (
                // There are no more contents
                <div className="text-black text-nowrap">
                {t("prompt2")}
                </div>
            )
            }
        </div>
        {/* Increase and decrease button for page number */}
        <div className="flex gap-3 justify-center items-center mt-5">
            <Button
            onClick={() => setPageNum((prev) => (prev === 1 ? prev : prev - 1))}
            >
            {t("prevBtn")}
            </Button>
            <Button
            onClick={() => setPageNum((prev) => prev + 1)}
            disabled={mangaDetailsArr.length === 0}
            >
            {t("nextBtn")}
            </Button>
        </div>
        </div>
    );
}
