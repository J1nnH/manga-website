import Link from "next/link";
import MangaGrid from "./(components)/manga-grid";
import { mangadex } from "./(components)/mangaDexInstance";

export const revalidate = 3600;

export default async function Home() {
  const latestUpdates = await mangadex.fetchLatestUpdates();
  const popular = await mangadex.fetchPopular();
  return (
    <main className="overflow-hidden min-h-screen flex flex-col md:flex-row bg-slate-900 text-white">
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
            return mangaInfo ? (
              <MangaGrid mangaInfo={mangaInfo} key={mangaInfo.id} />
            ) : null;
          })}
        </div>
      </div>
      {/* Popular Manga */}
      <div className="flex flex-col py-6 px-4 w-full md:w-1/3 gap-2">
        <h1 className="font-bold texte-xl my-4">Trending Now</h1>
        {popular.results.map((manga, index) => {
          return (
            <Link
              href={`manga/${manga.id}`}
              className="border-2 border-indigo-300 rounded-lg py-1 px-2 hover:scale-105 transition-all"
              key={manga.id}
            >
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
