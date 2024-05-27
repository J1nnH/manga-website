import { mangadex } from "@/components/mangaDexInstance";
import Image from "next/image";
import Link from "next/link";

export default async function Ranking() {
  const popular = await mangadex.fetchPopular();

  return (
    <main className="min-h-screen  bg-slate-900 text-white">
      <h1 className="text-xl font-bold inline">Most Popular</h1>
      <ul>
        {popular.results.map(async (manga, index) => {
          const mangaInfo = await mangadex.fetchMangaInfo(manga.id);
          return (
            <li
              className="py-5 m-5 bg-black border border-gray-500"
              key={manga.id}
            >
              <Link href={`manga/${manga.id}`}>
                <div className="flex space-x-4">
                  <div className="items-center">{index + 1}</div>
                  <Image
                    src={mangaInfo.image as string}
                    width={200}
                    height={400}
                    alt="cover image"
                  />
                  <div>
                    <p>Title: {manga.title as string}</p>
                    <p>Status: {manga.status}</p>
                    <p>Year: {manga.releaseDate}</p>
                    <p>Genre: {mangaInfo.genres}</p>
                    <hr />
                    <br />
                    <p>Description: </p>
                    <p>{manga.description as string}</p>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
