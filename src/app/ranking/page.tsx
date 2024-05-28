import { MANGA } from '@consumet/extensions';
import Link from 'next/link';

export default async function Ranking(){
    const mangadex = new MANGA.MangaDex();
    const popular = await mangadex.fetchPopular();


    return (
        <main className="min-h-screen  bg-slate-900 text-white pt-10 pl-10 pr-10">
           
            <h1 className="text-xl font-bold inline pl-6">Most Popular</h1>
            <ul >
                {popular.results.map(async (manga,index) =>{
                    const mangaInfo = await mangadex.fetchMangaInfo(manga.id);
                    return(
                        <li className="py-5 m-5 bg-black border border-gray-500 rounded-md">
                            <Link href={`manga/${manga.id}`}>
                                <div className="flex space-x-4">
                                    <div className="items-center pt-32 pl-5 pr-2 font-bold">{index + 1}</div>
                                    <img src={mangaInfo.image as string} width={200} height={400} className="rounded-md"></img>
                                    <div>
                                        <p>Title: {manga.title as string}</p>
                                        <p>Status: {manga.status}</p>
                                        <p>Year: {manga.releaseDate}</p>
                                        <p>Genre: {mangaInfo.genres}</p>
                                        <hr/>
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