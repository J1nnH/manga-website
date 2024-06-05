// It has to be a client component as there are between user and browser

"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";

export default function Search() {
  // Use to store the manga title for searching
  const [searchMangaTitle, setSearchMangaTitle] = useState<string>("");

  // Update the manga title when there is a change in the user input
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMangaTitle(e.target.value);
  };

  return (
    <form
      className="flex gap-5 mr-50"
      action={`/search-result/${searchMangaTitle}`}
    >
      <label htmlFor="searchManga" className="flex w-[64px]">
        <Image
          src="/magnifier.png"
          alt="search"
          width={32}
          height={32}
          className="self-center"
        />
      </label>
      <Input
        id="searchManga"
        type="text"
        placeholder="Search for manga.."
        className="bg-transparent text-md"
        value={searchMangaTitle}
        onChange={(e) => handleChangeTitle(e)}
      />
      <Button type="submit" variant="secondary">
        Search
      </Button>
    </form>
  );
}
