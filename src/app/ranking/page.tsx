import { mangadex } from "@/components/mangaDexInstance";
import MangaItem from "./mangaItem";
import { IMangaResult } from "@consumet/extensions";
export const revalidate = 3600;

export default async function Ranking() {
  const popular = await mangadex.fetchPopular();
  return (
    <main className="min-h-screen  bg-slate-900 text-white pt-10 pl-10 pr-10">
      <h1 className="text-xl font-bold inline pl-6">Most Popular</h1>
      <ul>
        {popular?.results.map(async (manga: IMangaResult, index: number) => {
          const mangaInfo = await mangadex.fetchMangaInfo(manga.id);
          return <MangaItem mangaInfo={mangaInfo} index={index} />;
        })}
      </ul>
    </main>
  );
}
