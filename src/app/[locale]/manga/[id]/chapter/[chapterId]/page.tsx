import Image from "next/image";
import Link from "next/link";
import { mangadex } from "@/app/[locale]/(components)/mangaDexInstance";
import initTranslations from "@/app/i18n";
import { unstable_cache } from "next/cache";
import { Key } from "react";

const i18nNamespaces = ["chapter", "common"];

export default async function ChapterPage({
  params,
}: {
  params: { id: string; chapterId: string; locale: string };
}) {
  const { t } = await initTranslations(params.locale, i18nNamespaces);

  // chapter is an array of pages
  const chapter = await unstable_cache(
    () => mangadex.fetchChapterPages(params.chapterId),
    [params.chapterId],
    {
      tags: ["chapter-pages"],
      revalidate: false,
    }
  )();

  // Fetching mangaInfo from API
  const mangaInfo = await unstable_cache(
    () => mangadex.fetchMangaInfo(params.id),
    [params.id],
    { tags: ["manga-info"], revalidate: 86400 }
  )();

  // Note that latest chapter is at index 0
  const currentChapterIndex = mangaInfo.chapters?.findIndex(
    (chapter: { id: string }) => chapter.id === params.chapterId
  );

  const previousChapterIndex = (currentChapterIndex ?? -1) + 1;
  const nextChapterIndex = (currentChapterIndex ?? 1) - 1;
  return (
    <main className="min-h-screen bg-slate-900 text-white p-6 flex place-items-center flex-col">
      {/** Navigation */}
      <div className="fixed bottom-0 bg-gradient-to-t from-black w-full p-6 pt-10 grid place-items-center">
        <span className="flex gap-4 flex-shrink">
          <Link
            href={`/manga/${params.id}/chapter/${
              mangaInfo.chapters?.[previousChapterIndex].id ??
              mangaInfo.chapters?.[0].id
            }`}
          >
            <button className="border-indigo-500 border-2 rounded-md py-2 px-4 bg-black/50 transition-all hover:bg-indigo-500 hover:scale-105">
              {t("prev")}
            </button>
          </Link>
          <Link href={`/manga/${params.id}`}>
            <button className="border-indigo-500 border-2 rounded-md py-2 px-4 bg-black/50 transition-all hover:bg-indigo-500 hover:scale-105">
              {t("back")}
            </button>
          </Link>
          {nextChapterIndex >= 0 && (
            <Link
              href={`/manga/${params.id}/chapter/${
                mangaInfo.chapters?.[nextChapterIndex].id ??
                mangaInfo.chapters?.[0].id
              }`}
            >
              <button className="border-indigo-500 border-2 rounded-md py-2 px-4 bg-black/50 transition-all hover:bg-indigo-500 hover:scale-105">
                {t("next")}
              </button>
            </Link>
          )}
        </span>
      </div>

      {/** Manga Information */}
      <div className="my-4">
        <h1 className="font-bold text-xl border-indigo-400 border-l-4 pl-4 mb-4">
          {mangaInfo.title as string}
        </h1>
        <p className="text-md">
          Chapter{" "}
          {(mangaInfo.chapters?.find(
            (chapter: { id: string }) => chapter.id === params.chapterId
          )?.chapterNumber as string) ?? "N/A"}{" "}
          -{" "}
          {mangaInfo.chapters?.find(
            (chapter: { id: string }) => chapter.id === params.chapterId
          )?.title ?? "N/A"}
        </p>
      </div>

      {/** Manga Pages */}
      <div className="grid grid-cols-1">
        {chapter.map(
          (
            ChapterPage: { img: string; page: { toString: () => string } },
            index: Key | null | undefined
          ) => {
            return (
              <Image
                unoptimized
                key={index}
                width={700}
                height={1500}
                src={ChapterPage.img as string}
                alt={ChapterPage.page.toString() as string}
                style={{ height: "auto" }} // Ensure aspect ratio is maintained
              />
            );
          }
        )}
      </div>
    </main>
  );
}
