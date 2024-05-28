import React from "react";
import Image from "next/image";
import Search from "@/components/search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Header() {
  return (
    <header className="flex flex-col bg-gray-800 text-white p-4 justify-between items-center w-full">
      <div className="flex align-middle justify-center items-center w-full">
        <a href="/">
          <Image src="/manga.png" alt="Logo" width={100} height={100} />
        </a>
        <nav className="flex-grow m-2 w-[30%] overflow-auto scrollbar">
          <ul className="flex space-x-10 text-lg uppercase">
            <li className="min-w-[fit-content]">
              <a
                href="/"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                updates
              </a>
            </li>
            <li className="min-w-[fit-content]">
              <a
                href="/"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                featured
              </a>
            </li>
            <li className="min-w-[fit-content]">
              <a
                href="/ranking"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                ranking
              </a>
            </li>
            <li className="min-w-[fit-content]">
              <a
                href="/"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                manga
              </a>
            </li>
            <li className="min-w-[fit-content]">
              <a
                href="/"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                creators
              </a>
            </li>
            <li className="min-w-[fit-content]">
              <a
                href="/"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                favorites
              </a>
            </li>
            <li className="min-w-[fit-content]">
              <a
                href="/"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                about
              </a>
            </li>
          </ul>
        </nav>
        <li className="flex justify-center py-2 text-white gap-3 flex-wrap w-[15%] max-w-[250px]">
          <Image
            src="/language.png"
            alt="language icon"
            width={32}
            height={32}
          />
          <Select defaultValue="en">
            <SelectTrigger>
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ms">Bahasa Melayu</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
            </SelectContent>
          </Select>
        </li>
      </div>
      <ul className="divide-y divide-gray-300 flex gap-5">
        <li className="flex ustify-center py-2">
          <Search />
        </li>
      </ul>
    </header>
  );
}
