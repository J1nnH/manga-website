import { MANGA } from "@consumet/extensions";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600;

export default async function MangaPage({
  params,
}: {
  params: { id: string };
}) {
  const mangadex = new MANGA.MangaDex();
  const mangaInfo = await mangadex.fetchMangaInfo(params.id);

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6">
      {/** Manga Info */}
      <div className="flex flex-col border-white border-b-4 md:flex-row place-items-center gap-4 pb-6">
        <Image
          src={mangaInfo.image as string}
          width={250}
          height={150}
          alt={mangaInfo.title as string}
        />
        <div>
          <h1 className="font-bold text-xl border-indigo-400 border-l-4 pl-4 mb-2">
            {mangaInfo.title as string}
          </h1>
          <p>{(mangaInfo.description as { [lang: string]: string }).en}</p>
          <div className="mt-4 border-gray-400 border-t-2 pt-2">
            <p>
              Genres:{" "}
              {mangaInfo.genres?.length ?? 0 > 0
                ? mangaInfo.genres?.map((genre) => (
                    <div className="px-4 py-2 rounded-md bg-gray-400 mx-2">
                      {genre}
                    </div>
                  ))
                : "N/A"}
            </p>
            <p>Released: {mangaInfo.releaseDate}</p>
            <p>Status: {mangaInfo.status}</p>
            <p>Total chapters: {mangaInfo.chapters?.length}</p>
          </div>
        </div>
      </div>

      {/** Chapter List */}
      <div className="my-4">
        <h1 className="font-bold text-xl mb-4">Chapters</h1>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {mangaInfo.chapters?.map((chapter) => {
            return (
              <Link
                className="flex border border-gray-500 p-2 bg-black gap-2 rounded-lg"
                key={chapter.id}
                href={`manga/${mangaInfo.id}/chapter/${chapter.id}`}
              >
                <h1 className="pr-2 border-r-4">
                  {chapter.chapterNumber as string}
                </h1>
                <div>
                  <h1>
                    {"Volume " +
                      chapter.volumeNumber +
                      " Chapter " +
                      chapter.chapterNumber}
                  </h1>
                  <h1>{chapter.title}</h1>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
