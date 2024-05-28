import React from "react";
import { IMangaInfo } from "@consumet/extensions";
import Image from "next/image";
import Link from "next/link";

export default function MangaGrid({
  mangaInfo,
}: {
  mangaInfo: IMangaInfo | null;
}) {
  return (
    <Link
      href={`manga/${mangaInfo?.id}`}
      className="relative"
      key={mangaInfo?.id}
    >
      <Image
        unoptimized
        width={200}
        height={400}
        src={mangaInfo?.image as string}
        alt={mangaInfo?.title as string}
        className="aspect-[3/4] object-cover w-full"
      />
      <div className="absolute bottom-0 bg-gradient-to-t from-black/75 via-black/70 from-30% w-full p-2 h-[30%]" />
      <div className="absolute bottom-0 m-2">
        <h1 className="text-sm line-clamp-1 font-semibold">
          {mangaInfo?.title as string}
        </h1>
        <p className="text-xs capitalize">Status: {mangaInfo?.status}</p>
        <p className="text-xs">
          Latest: {(mangaInfo?.chapters?.[0]?.chapterNumber as string) ?? "N/A"}
        </p>
      </div>
    </Link>
  );
}
