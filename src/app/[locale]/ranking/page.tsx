import { mangadex } from "../(components)/mangaDexInstance";
import MangaItem from "./mangaItem";
import { IMangaResult } from "@consumet/extensions";
import initTranslations from "../../i18n";
import TranslationProvider from "../(components)/TranslationProvider";
import { unstable_cache } from "next/cache";

const i18nNamespaces = ["ranking-page", "common"];
// Limit the data fetching perform at most once every 3600 sec for this page

export default async function Ranking({
  params,
}: {
  params: { locale: string };
}) {
  // Fetching the manga from the API mangadex provider
  const popular = await unstable_cache(
    () => mangadex.fetchPopular(),
    ["popular"],
    { tags: ["popular"], revalidate: 3600 }
  )();

  const { t, resources } = await initTranslations(
    params.locale,
    i18nNamespaces
  );

  return (
    <TranslationProvider
      resources={resources}
      locale={params.locale}
      namespaces={i18nNamespaces}
    >
      <main className="min-h-screen  bg-slate-900 text-white p-10">
        {/* The title of the page */}
        <h1 className="text-2xl font-bold inline mb-6">{t("most-popular")}</h1>

        {/* Looping through each each manga, then return the manga */}
        <ul className="grid gap-5 grid-cols-1">
          {popular?.results.map(async (manga: IMangaResult, index: number) => {
            // Fetching manga info from the API base on the manga id
            const mangaInfo = await unstable_cache(
              () => mangadex.fetchMangaInfo(manga.id),
              [manga.id],
              { tags: ["manga-info"], revalidate: 3600 }
            )();

            // Pass the manga information to the MangaItem tag as parameter
            return (
              <MangaItem
                mangaInfo={mangaInfo}
                index={index}
                manga={manga}
                key={mangaInfo.id}
              />
            );
          })}
        </ul>
      </main>
    </TranslationProvider>
    // The main container
  );
}
