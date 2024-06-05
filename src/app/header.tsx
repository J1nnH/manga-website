import React from "react";
import Image from "next/image";
import Search from "./(components)/search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";

const LoginRegister = dynamic(
  () => import("./(components)/login-register-nav"),
  {
    ssr: false,
  }
);

const navigation = ["manga", "ranking", "favourites", "login", "about"];

export default function Header() {
  return (
    <header className="flex flex-col bg-gray-800 text-white p-4 justify-between items-center w-full">
      <div className="flex align-middle justify-center items-center w-full">
        <a href="/">
          <Image
            src="/manga.png"
            alt="Logo"
            width={100}
            height={100}
            priority={true}
          />
        </a>
        <nav className="flex-grow m-2 w-[30%] overflow-auto scrollbar ml-20">
          <ul className="flex text-lg uppercase space-x-2">
            {navigation.map((title) => {
              let path = `/${title}`;
              if (title == "manga") {
                path = "/";
              } else if (title == "login") {
                path = `/${title}-manga`;
              }

              return (
                <a href={path}>
                  <li className="relative min-w-[fit-content] py-10 px-5 transition-all cursor-pointer group hover:text-gray-400 active:bg-gray-700 rounded-lg">
                    <span className="absolute inset-x-0 bottom-0 h-1 bg-transparent group-hover:bg-gray-400 transition-all"></span>
                    {title}
                  </li>
                </a>
              );
            })}
          </ul>
        </nav>

        <Search />

        <div className="flex justify-center py-2 text-white gap-3 flex-wrap w-[15%] max-w-[250px]">
          <Select defaultValue="en">
            <SelectTrigger>
              <Image
                src="/language.png"
                alt="language icon"
                width={32}
                height={32}
              />
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ms">Bahasa Melayu</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* <ul className="divide-y divide-gray-300 flex gap-5">
        <li className="flex justify-center py-2">
          <Search />
        </li>
      </ul> */}
    </header>
  );
}
