import { IMangaInfo, IMangaResult } from "@consumet/extensions";
import Image from "next/image";
import Link from "next/link";
import { CLOUDINARY_BASE_URL } from "./constants";

export default function TrendingItem({
  mangaInfo,
  index,
  manga,
}: {
  mangaInfo: IMangaInfo;
  index: number;
  manga: IMangaResult;
}) {
  const title = mangaInfo.title
    ? mangaInfo.title
    : Object.values(mangaInfo.altTitles?.[0] ?? {})[0];
  return (
    <Link
      href={`manga/${mangaInfo.id}`}
      className="relative border-2 p-6 md:p-0 border-indigo-300 rounded-lg hover:scale-105 transition-all flex flex-col items-center md:items-start md:flex-row md:max-h-32"
      key={mangaInfo.id}
    >
      <div className="absolute top-0 -translate-y-1/2 rounded-full p-2 bg-gray-700 text-amber-300 w-8 h-8 flex items-center justify-center font-semibold">
        {index + 1}
      </div>
      <div className="overflow-clip h-full">
        <Image
          className="object-cover object-center"
          src={CLOUDINARY_BASE_URL + mangaInfo?.image}
          height={300}
          width={200}
          alt={manga.title as string}
        />
      </div>
      <div className="md:w-2/3 h-full pt-4 md:pl-4 md:pt-0 justify-center flex flex-col w-full">
        <h1 className="line-clamp-2 text-white font-bold">
          {manga.title as string}
        </h1>
        <p className="text-white text-sm line-clamp-2">
          {(mangaInfo.description as { en: string })?.en}
        </p>
      </div>
    </Link>
  );
}
