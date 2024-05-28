import { mangadex } from "@/components/mangaDexInstance";
import MangaItem from "./mangaItem";
import { IMangaResult } from "@consumet/extensions";
export const revalidate = 3600;

// This function will retry fetching the popular manga list n times with an exponential backoff delay
async function fetchWithRetry(
  fetchFunction: Function,
  retries: number,
  delay: number
) {
  try {
    return await fetchFunction();
  } catch (err) {
    if (retries === 1) throw err;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return fetchWithRetry(fetchFunction, retries - 1, delay * 2);
  }
}

export default async function Ranking() {
  const popular = await fetchWithRetry(() => mangadex.fetchPopular(), 3, 1000);
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
