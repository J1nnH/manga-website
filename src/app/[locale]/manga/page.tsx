import { mangadex } from "../(components)/mangaDexInstance";
import MangaGrid from "../(components)/manga-grid";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import initTranslations from "@/app/i18n";

const i18nNamespaces = ["home", "chapter"];

export default async function AllMangaPage({
  searchParams,
  params,
}: {
  searchParams: { page: string; limit: string };
  params: { locale: string };
}) {
  const { t } = await initTranslations(params.locale, i18nNamespaces);
  const { page, limit } = searchParams;

  const latestUpdates = await unstable_cache(
    () => mangadex.fetchLatestUpdates(Number(page) || 1, Number(limit) || 20),
    [page || "1"],
    { tags: ["latest-updates"], revalidate: 86400 }
  )();

  const hasPrevPage =
    latestUpdates.currentPage && latestUpdates.currentPage > 1;

  const prevPage =
    latestUpdates.currentPage && latestUpdates.currentPage > 1
      ? Number(latestUpdates.currentPage) - 1
      : 1;

  const nextPage = latestUpdates.currentPage
    ? 1 + Number(latestUpdates.currentPage)
    : 2;
  return (
    <main className="min-h-screen bg-slate-900">
      <div className="mx-auto p-4 max-w-7xl">
        <h1 className="text-2xl font-bold text-white mb-4">{t("subtitle1")}</h1>

        {/** Grid of latest updates */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          {latestUpdates.results.map(async (manga) => {
            const mangaInfo = await unstable_cache(
              () => mangadex.fetchMangaInfo(manga.id),
              [manga.id],
              { tags: ["manga-info"], revalidate: 3600 }
            )();
            return <MangaGrid mangaInfo={mangaInfo} key={manga.id} />;
          })}
        </div>

        {/** Navigation */}
        <div className="w-full flex flex-row justify-center my-4">
          <Link
            href={`/manga?page=${prevPage}`}
            className={`px-4 py-2 rounded-l-lg bg-gray-300 text-black ${
              hasPrevPage
                ? "hover:bg-gray-400"
                : "opacity-50 pointer-events-none"
            }`}
          >
            {t("prev")}
          </Link>

          <Link
            href={`/manga?page=${nextPage}`}
            className="px-4 py-2 rounded-r-lg bg-gray-300 text-black hover:bg-gray-400"
          >
            {t("next")}
          </Link>
        </div>
      </div>
    </main>
  );
}
