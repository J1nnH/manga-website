"use client";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex gap-3 text-center justify-center items-center">
          <Image
            src="/magnifier.png"
            alt="search"
            width={32}
            height={32}
            className="self-center"
          />
          <span className="hidden md:block">Search</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search Anime by title</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              defaultValue=""
              className="col-span-3"
              value={searchMangaTitle}
              onChange={(e) => handleChangeTitle(e)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Search</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
