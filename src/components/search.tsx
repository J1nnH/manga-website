"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";

export default function Search() {
  const [searchMangaTitle, setSearchMangaTitle] = useState<string>("");

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMangaTitle(e.target.value);
  };

  return (
    <form className="flex gap-5" action="">
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
        placeholder="Search for anime ..."
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
