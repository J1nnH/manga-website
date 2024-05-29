import { MANGA } from "@consumet/extensions";
import Image from "next/image";
import Link from "next/link";

export default async function ChapterPage({
  params,
}: {
  params: { id: string; chapterId: string };
}) {
  const mangadex = new MANGA.MangaDex();
  const chapter = await mangadex.fetchChapterPages(params.chapterId);
  const mangaInfo = await mangadex.fetchMangaInfo(params.id);
  // Note that latest chapter is at index 0
  const currentChapterIndex = mangaInfo.chapters?.findIndex(
    (chapter) => chapter.id === params.chapterId
  );
  const previousChapterIndex = (currentChapterIndex ?? -1) + 1;
  const nextChapterIndex = (currentChapterIndex ?? 1) - 1;
  console.log(currentChapterIndex);
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
              Previous
            </button>
          </Link>
          <Link href={`/manga/${params.id}`}>
            <button className="border-indigo-500 border-2 rounded-md py-2 px-4 bg-black/50 transition-all hover:bg-indigo-500 hover:scale-105">
              Back
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
                Next
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
            (chapter) => chapter.id === params.chapterId
          )?.chapterNumber as string) ?? "N/A"}{" "}
          -{" "}
          {mangaInfo.chapters?.find(
            (chapter) => chapter.id === params.chapterId
          )?.title ?? "N/A"}
        </p>
      </div>

      {/** Manga Pages */}
      <div className="grid grid-cols-1 gap-4">
        {chapter.map((ChapterPage, index) => {
          return (
            <Image
              unoptimized
              key={index}
              width={500}
              height={700}
              src={ChapterPage.img as string}
              alt={ChapterPage.page.toString() as string}
            />
          );
        })}
      </div>
    </main>
  );
}
