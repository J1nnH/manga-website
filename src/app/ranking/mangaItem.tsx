"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { IMangaInfo } from "@consumet/extensions";
export default function MangaItem({
  mangaInfo,
  index,
}: {
  mangaInfo: IMangaInfo;
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li
      className="py-5 m-5 bg-black border border-gray-500 rounded-md"
      key={mangaInfo.id}
    >
      <div className="flex space-x-4 md:flex-row flex-col justify-center items-center">
        <div className="self-start md:self-center pl-5 pr-2 font-bold">
          {index + 1}
        </div>
        <Link href={`manga/${mangaInfo.id}`}>
          <Image
            className="aspect-[3/4]"
            src={mangaInfo.image as string}
            width={200}
            height={400}
            alt="cover image"
          />
        </Link>
        <div>
          <p>Title: {mangaInfo.title as string}</p>
          <p>Genre: {mangaInfo.genres?.join(", ")}</p>
          <p>Year: {mangaInfo.releaseDate}</p>
          <p>Status: {mangaInfo.status}</p>
          <br />
          <hr />
          <br />
          <p>Description: </p>
          <p className={isExpanded ? "" : "line-clamp-1"}>
            {(mangaInfo.description as { en: string })?.en}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 hover:text-blue-700"
          >
            {isExpanded ? "Read less" : "Read more"}
          </button>
        </div>
      </div>
    </li>
  );
}
