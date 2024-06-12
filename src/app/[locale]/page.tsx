import Link from "next/link";
import MangaGrid from "./(components)/manga-grid";
import { mangadex } from "./(components)/mangaDexInstance";
import initTranslations from "../i18n";
import TranslationProvider from "./(components)/TranslationProvider";
import { unstable_cache } from "next/cache";
import TrendingItem from "./(components)/trendingItem";

const i18nNamespaces = ["home", "common"];

export default async function Home({ params }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(
    params.locale,
    i18nNamespaces
  );

  // Cache the latest updates and popular manga
  const latestUpdates = await unstable_cache(
    () => mangadex.fetchLatestUpdates(),
    ["latest-updates"],
    { tags: ["latest-updates"], revalidate: 3600 }
  )();

  const popular = await unstable_cache(
    () => mangadex.fetchPopular(1, 8),
    ["popular"],
    { tags: ["popular"], revalidate: 3600 }
  )();

  return (
    <TranslationProvider
      resources={resources}
      locale={params.locale}
      namespaces={i18nNamespaces}
    >
      <main className="overflow-hidden min-h-screen flex flex-col md:flex-row bg-slate-900 text-white">
        {/* Latest Updates */}
        <div className="p-6 w-full md:w-2/3 relative md:border-r md:border-r-gray-500">
          <div className="my-4">
            <h1 className="text-xl md:text-3xl font-bold inline">
              {/* Subtitle 1 = Latest Updates */}
              {t("subtitle1")}
            </h1>
            <Link
              href={`/manga`}
              className="inline absolute right-0 py-2 px-4 bg-yellow-500 rounded-l-lg text-black text-xs"
            >
              {/* Subtitle 2 = All Updates */}
              {t("subtitle2")} {">>"}
            </Link>
          </div>
          {/* Grid of latest updates */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {latestUpdates.results.map(async (manga) => {
              const mangaInfo = await unstable_cache(
                () => mangadex.fetchMangaInfo(manga.id),
                [manga.id],
                { tags: ["manga-info"], revalidate: 3600 }
              )();
              return mangaInfo ? (
                <MangaGrid mangaInfo={mangaInfo} key={mangaInfo.id} />
              ) : null;
            })}
          </div>
        </div>

        {/* Trending Now */}
        <div className="flex flex-col py-6 px-4 w-full md:w-1/3 gap-8">
          <h1 className="font-bold text-2xl md:text-3xl mt-2">
            {/* Subtitle 3 = Trending Now */}
            {t("subtitle3")}
          </h1>
          {popular.results.map(async (manga, index) => {
            const mangaInfo = await unstable_cache(
              () => mangadex.fetchMangaInfo(manga.id),
              [manga.id],
              { tags: ["manga-info"], revalidate: 3600 }
            )();
            return (
              <TrendingItem mangaInfo={mangaInfo} index={index} manga={manga} />
            );
          })}
        </div>
      </main>
    </TranslationProvider>
  );
}
