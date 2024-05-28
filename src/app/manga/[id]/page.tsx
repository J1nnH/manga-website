import { MANGA } from "@consumet/extensions";
import Image from "next/image";
import Link from "next/link";

export default async function MangaPage({
  params,
}: {
  params: { id: string };
}) {
  const mangadex = new MANGA.MangaDex();
  const mangaInfo = await mangadex.fetchMangaInfo(params.id);
  console.log(mangaInfo); //TODO: Remove this line
  return (
    <main className="min-h-screen bg-slate-900 text-white p-6">
      {/** Manga Info */}
      <div className="flex">
        <Image
          src={mangaInfo.image as string}
          width={400}
          height={300}
          alt={mangaInfo.title as string}
        />
        <div>
          <h1 className="font-bold text-xl">{mangaInfo.title as string}</h1>
          <p>{(mangaInfo.description as { [lang: string]: string }).en}</p>
        </div>
      </div>
      {/** Chapter List */}
      <div>
        <h1 className="font-bold text-xl">Chapters</h1>
        <div>
          {mangaInfo.chapters?.map((chapter) => {
            return (
              <Link
                key={chapter.id}
                href={`manga/${mangaInfo.id}/chapter/${chapter.id}`}
              >
                <h1>{chapter.chapterNumber + ") " + chapter.title}</h1>
                <h1>
                  {"Volume " +
                    chapter.volumeNumber +
                    " Chapter " +
                    chapter.chapterNumber}
                </h1>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
