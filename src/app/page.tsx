import Image from "next/image";
import { MANGA } from "@consumet/extensions";
import Link from "next/link";

export const revalidate = 3600;

export default async function Home() {
  const mangadex = new MANGA.MangaDex();
  const latestUpdates = await mangadex.fetchLatestUpdates();
  const popular = await mangadex.fetchPopular();
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-slate-900 text-white">
      {/* Latest Updates */}
      <div className="p-6 w-full md:w-2/3 relative">
        <div className="my-4">
          <h1 className="text-xl font-bold inline">Latest Updates</h1>
          <div className="inline absolute right-0 py-2 px-4 bg-yellow-500 rounded-l-lg text-black text-xs">
            All Updates {">>"}
          </div>
        </div>
        {/* Grid of latest updates */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {latestUpdates.results.map(async (manga) => {
            const mangaInfo = await mangadex.fetchMangaInfo(manga.id);
            return (
              <Link href={`manga/${manga.id}`} className="relative" key={manga.id}>
                <Image
                  unoptimized
                  width={200}
                  height={400}
                  src={mangaInfo.image as string}
                  alt={manga.title as string}
                  className="aspect-[3/4] object-cover w-full"
                />
                <div className="absolute bottom-0 bg-gradient-to-t from-black/75 via-black/70 from-30% w-full p-2 h-[30%]" />
                <div className="absolute bottom-0 m-2">
                  <h1 className="text-sm line-clamp-1 font-semibold">
                    {manga.title as string}
                  </h1>
                  <p className="text-xs capitalize">Status: {manga.status}</p>
                  <p className="text-xs">
                    Latest:{" "}
                    {(mangaInfo?.chapters?.[0]?.chapterNumber as string) ??
                      "N/A"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {/* Popular Manga */}
      <div className="flex flex-col py-6 px-4 w-full md:w-1/3 gap-2">
        <h1 className="font-bold texte-xl my-4">Trending Now</h1>
        {popular.results.map((manga, index) => {
          return (
            <Link href={`manga/${manga.id}`} className="bg-orange-400 px-1" key={manga.id}>
              <h1 className="line-clamp-1">
                {index + 1}. {manga.title as string}
              </h1>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
