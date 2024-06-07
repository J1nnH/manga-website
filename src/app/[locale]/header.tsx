"use client";
import React, { useState } from "react";
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
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

const LoginRegister = dynamic(
  () => import("./(components)/login-register-nav"),
  {
    ssr: false,
  }
);

const navigation = [
  { path: "/", key: "nav1", title: "manga" },
  { path: "/ranking", key: "nav2", title: "ranking" },
  { path: "/favourites", key: "nav3", title: "favourites" },
  { path: "/login-manga", key: "nav4", title: "login" },
  { path: "/", key: "nav6", title: "logout" },
  { path: "/about", key: "nav5", title: "about" },
];

export default function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(["userId"]);
  const router = useRouter();

  const handleLogout = () => {
    removeCookie("userId");
    router.push("/");
  };

  return (
    <header className="flex flex-col bg-gray-800 text-white px-2 w-full">
      <div className="flex w-full items-center">
        {/** Hamburger menu Icon */}
        <svg
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="h-6 fill-white aspect-square mx-4 md:hidden"
        >
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
        <a href="/">
          <Image
            src="/manga.png"
            alt="Logo"
            width={100}
            height={100}
            priority={true}
          />
        </a>
        <nav className="flex-grow m-2 w-[30%] overflow-auto scrollbar hidden md:block">
          <ul className="text-lg uppercase space-x-2 flex">
            {navigation.map((nav) => {
              if (
                (nav.key === "nav4" && !cookie.userId) ||
                (nav.key !== "nav4" && nav.key !== "nav6")
              ) {
                return (
                  <li key={nav.key}>
                    <Link
                      href={nav.path}
                      className="relative min-w-[fit-content] py-0 px-2 transition-all cursor-pointer group hover:text-gray-400 active:bg-gray-700 rounded-lg"
                    >
                      <span className="absolute inset-x-0 bottom-0 h-1 bg-transparent group-hover:bg-gray-400 transition-all"></span>
                      {t(nav.key)}
                    </Link>
                  </li>
                );
              } else if (nav.key === "nav6" && cookie.userId) {
                return (
                  <li
                    key={nav.key}
                    className="relative min-w-[fit-content] py-0 px-2 transition-all cursor-pointer group hover:text-gray-400 active:bg-gray-700 rounded-lg uppercase"
                  >
                    <button onClick={handleLogout} className="uppercase">
                      <span className="absolute inset-x-0 bottom-0 h-1 bg-transparent group-hover:bg-gray-400 transition-all"></span>
                      {t(nav.key)}
                    </button>
                  </li>
                );
              }
            })}
          </ul>
        </nav>

        {/** Search bar */}
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

      {/** Sidebar Menu on Mobile View */}
      {isMenuOpen && (
        <>
          <div
            onClick={() => setIsMenuOpen(false)}
            className="z-10 fixed h-screen w-screen backdrop-blur	"
          />
          <nav className="z-10 md:hidden fixed h-full left-0 w-[70vw] bg-black p-6 justify-center">
            <div className="w-full mb-8 justify-between flex">
              <h1 className="font-bold text-2xl uppercase">Menu</h1>
              {/** Close icon */}
              <svg
                onClick={() => setIsMenuOpen(false)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="aspect-square w-8 fill-white"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>

            <ul className="gap-4 grid grid-cols-1">
              {navigation.map((nav) => {
                if (nav.key === "nav4" && !cookie.userId) {
                  return (
                    <Link
                      href={nav.path}
                      onClick={() => setIsMenuOpen(false)}
                      key={nav.key}
                    >
                      <li className="text-xl uppercase border-l-indigo-500 border-l-4 pl-2">
                        {t(nav.key)}
                      </li>
                    </Link>
                  );
                } else if (nav.key === "nav6" && cookie.userId) {
                  return (
                    <button
                      key={nav.key}
                      className="text-xl uppercase border-l-indigo-500 border-l-4 pl-2 text-justify"
                      onClick={handleLogout}
                    >
                      {t(nav.key)}
                    </button>
                  );
                } else if (nav.key !== "nav4" && nav.key !== "nav6") {
                  return (
                    <Link
                      href={nav.path}
                      onClick={() => setIsMenuOpen(false)}
                      key={nav.key}
                    >
                      <li className="text-xl uppercase border-l-indigo-500 border-l-4 pl-2">
                        {t(nav.key)}
                      </li>
                    </Link>
                  );
                }
              })}
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}
