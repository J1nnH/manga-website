"use client";

import { mangadex } from "@/components/mangaDexInstance";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Ranking() {
  mangadex
    .fetchPopular()
    .then((popular) => {
      const [isExpanded, setIsExpanded] = useState(false);
      return (
        <main className="min-h-screen  bg-slate-900 text-white pt-10 pl-10 pr-10">
          <h1 className="text-xl font-bold inline pl-6">Most Popular</h1>
          <ul>
            {popular.results.map(async (manga, index) => {
              const mangaInfo = await mangadex.fetchMangaInfo(manga.id);

              const MAX_LENGTH = 100;
              function toggleReadMore() {
                setIsExpanded(!isExpanded);
              }

              return (
                <li
                  className="py-5 m-5 bg-black border border-gray-500 rounded-md"
                  key={manga.id}
                >
                  <Link href={`manga/${manga.id}`}>
                    <div className="flex space-x-4">
                      <div className="items-center pt-32 pl-5 pr-2 font-bold">
                        {index + 1}
                      </div>
                      <Image
                        src={mangaInfo.image as string}
                        width={200}
                        height={400}
                        alt="cover image"
                      />
                      <div>
                        <p>Title: {manga.title as string}</p>
                        <p>Genre: {mangaInfo.genres?.join(", ")}</p>
                        <p>Year: {manga.releaseDate}</p>
                        <p>Status: {manga.status}</p>
                        <br />
                        <hr />
                        <br />
                        <p>Description: </p>
                        <p>{manga.description as string}</p>
                        <p>
                          {isExpanded
                            ? (manga.description as string)
                            : (manga.description as string).slice(
                                0,
                                MAX_LENGTH
                              )}
                        </p>
                        <button
                          onClick={toggleReadMore}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          {isExpanded ? "Read less" : "Read more"}
                        </button>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </main>
      );
    })
    .catch((err) => {
      console.log("this is the ERROR(by jh):" + err);
    });
}
