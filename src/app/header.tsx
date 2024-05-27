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
    <header className="flex bg-gray-800 text-white p-4 justify-between items-center fixed top-0 left-0 w-full">
      <a href="/">
        <Image src="/skull.avif" alt="Logo" width={100} height={100} />
      </a>
      <nav className="flex-grow m-2 w-[30%] overflow-x-scroll custom-scrollbar">
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
              href="/"
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
              favorited
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
      <ul className="divide-y divide-gray-300 w-[15%]">
        <li className="flex md:justify-start justify-center py-2">
          <Search />
        </li>
        <li className="flex md:justify-start justify-center py-2 text-black">
          <Select defaultValue="en">
            <SelectTrigger className="max-w-[180px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ms">Bahasa Melayu</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
            </SelectContent>
          </Select>
        </li>
      </ul>
    </header>
  );
}
