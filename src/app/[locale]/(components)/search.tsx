// It has to be a client component as there are between user and browser

"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Search({placeholder, lbl} : {placeholder:string; lbl:string}) {

  // Use to store the manga title for searching
  const [searchMangaTitle, setSearchMangaTitle] = useState<string>("");

  // Update the manga title when there is a change in the user input
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMangaTitle(e.target.value);
  };

  return (
    <form className="flex gap-5" action={`/search-result/${searchMangaTitle}`}>
      <Input
        id="searchManga"
        type="text"
        placeholder={placeholder}
        className="bg-transparent text-md"
        value={searchMangaTitle}
        onChange={(e) => handleChangeTitle(e)}
      />
      <Button type="submit" variant="secondary">
        <label htmlFor="searchManga" className="aspect-square w-4 mr-2">
          {/* Search icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </label>
        {lbl}
      </Button>
    </form>
  );
}
