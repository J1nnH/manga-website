"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { IMangaInfo, IMangaResult } from "@consumet/extensions";
import LoveBtn from "../(components)/love-btn";

export default function MangaItem({
  mangaInfo,
  index,
  manga,
}: {
  mangaInfo: IMangaInfo;
  index: number;
  manga: IMangaResult;
}) {
  // Initialize 2 variables using useState, default value for isExpanded is false, setIsExpanded is a setter
  const [isExpanded, setIsExpanded] = useState(false);

  // Return a manga section
  return (
    <li
      className="pb-5 m-5 bg-black border border-gray-500 rounded-lg relative hover:scale-105 transition-all"
      key={mangaInfo.id}
    >
      <div className="flex space-y-4 md:space-x-4 md:flex-row flex-col justify-center items-center">
        {/* The numbering for the manga */}
        <div className="self-start md:self-center pl-5 pr-2 font-bold text-3xl">
          {index + 1}
        </div>

        {/* Making only the image of manga is clickable, to watch the manga */}
        <Link href={`manga/${mangaInfo.id}`}>
          <Image
            className="aspect-[3/4]"
            src={mangaInfo.image as string}
            width={200}
            height={400}
            alt="cover image"
          />
        </Link>

        {/* Listing the information of the manga */}
        <div className="w-3/4">
          <p>Title: {manga.title as string}</p>
          <p>Year: {mangaInfo.releaseDate}</p>
          <p>Status: {mangaInfo.status}</p>
          <p>
            Genre:{" "}
            {mangaInfo.genres?.map((genre) => {
              return (
                <span className="px-2 rounded-md bg-gray-600 m-1" key={genre}>
                  {genre}
                </span>
              );
            })}
          </p>
          <br />
          <hr />

          {/* Making Read more and Read less function for the long description */}
          <p>Description: </p>
          <section
            className={`${
              isExpanded ? "overflow-y-scroll" : "line-clamp-1"
            } h-20`}
          >
            {(mangaInfo.description as { en: string })?.en}
          </section>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 hover:text-blue-700"
          >
            {isExpanded ? "Disable scroll" : "Enable scroll"}
          </button>
        </div>
      </div>
      <div className="absolute top-[15px] right-[15px] hover:opacity-75 transition-opacity">
        <LoveBtn mangaId={mangaInfo.id} />
      </div>
    </li>
  );
}
