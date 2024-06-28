// It has to be a client component as there are between user and browser

"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";

export default function Search({
  placeholder,
  lbl,
}: {
  placeholder: string;
  lbl: string;
}) {
  // Use to store the manga title for searching
  const [searchMangaTitle, setSearchMangaTitle] = useState<string>("");

  // Update the manga title when there is a change in the user input
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMangaTitle(e.target.value);
  };

  return (
    <form
      className="flex gap-2 items-center mr-2"
      action={`/search-result/${searchMangaTitle}`}
    >
      <Input
        id="searchManga"
        type="text"
        placeholder={placeholder}
        className="bg-transparent text-md"
        value={searchMangaTitle}
        onChange={(e) => handleChangeTitle(e)}
        required
      />
      <Button
        type="submit"
        variant="secondary"
        className="aspect-square md:aspect-auto rounded-full md:rounded-lg"
      >
        <label htmlFor="searchManga" className="md:mr-2">
          <SearchIcon strokeWidth={3} className="h-5 w-5" />
        </label>
        <p className="hidden md:block">{lbl}</p>
      </Button>
    </form>
  );
}
