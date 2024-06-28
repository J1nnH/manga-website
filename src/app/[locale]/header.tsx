"use client";
import React, { useState } from "react";
import Image from "next/image";
import Search from "./(components)/search";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { useRouter, usePathname } from "next/navigation";
import LanguageChanger from "./(components)/LanguageChanger";
import {
  ArrowLeftFromLine,
  BadgeInfo,
  BookOpenText,
  Crown,
  Heart,
  LogIn,
  LogOut,
  Menu,
} from "lucide-react";

interface NavigationItem {
  path: string;
  key: string;
  title: string;
  icon?: JSX.Element; // Optional icon property
}

const navigation: NavigationItem[] = [
  {
    path: "/manga",
    key: "nav1",
    title: "manga",
    icon: (
      <BookOpenText className="stroke-white group-[.is-active]:stroke-black group-hover:stroke-black xl:group-hover:stroke-white" />
    ),
  },
  {
    path: "/ranking",
    key: "nav2",
    title: "ranking",
    icon: (
      <Crown className="stroke-white group-[.is-active]:stroke-yellow-500 group-hover:stroke-yellow-600" />
    ),
  },
  {
    path: "/favourites",
    key: "nav3",
    title: "favourites",
    icon: (
      <Heart className="stroke-white group-[.is-active]:stroke-red-500 group-hover:stroke-red-400" />
    ),
  },
  {
    path: "/login-manga",
    key: "nav4",
    title: "login",
    icon: (
      <LogIn className="stroke-white group-[.is-active]:stroke-black group-hover:stroke-black xl:group-hover:stroke-white" />
    ),
  },
  {
    path: "/about",
    key: "nav5",
    title: "about",
    icon: (
      <BadgeInfo className="stroke-white group-[.is-active]:stroke-blue-400 group-hover:stroke-blue-400" />
    ),
  },
  {
    path: "/",
    key: "nav6",
    title: "logout",
    icon: <LogOut className="stroke-white group-hover:stroke-red-600" />,
  },
];

export default function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(["userId"]);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    removeCookie("userId");
    router.push("/");
  };

  /**
   * Render navigation item for mobile view sidebar menu
   *
   * @param {NavigationItem} nav
   */
  const renderNavItem = (nav: NavigationItem, pathname: string) => {
    const isActive = pathname === nav.path && pathname !== "/";
    // If logged in, skip login button, else skip logout button
    const loggedIn = cookie.userId;
    if ((nav.key === "nav4" && loggedIn) || (nav.key === "nav6" && !loggedIn))
      return;

    return (
      <Link
        href={nav.path}
        onClick={() => setIsMenuOpen(false)}
        key={nav.key}
        className={`flex items-center group p-2 hover:bg-opacity-80 hover:scale-105 transition-all rounded-md hover:bg-white xl:hover:bg-transparent xl:hover:border-b-2 border-b-indigo-600 ${
          isActive && "bg-white is-active"
        }`}
      >
        {nav.icon && nav.icon}
        <button
          className="text-xl text-white uppercase pl-2 group-hover:text-black group-[.is-active]:text-black xl:group-hover:text-white"
          onClick={nav.key === "nav6" ? handleLogout : () => {}}
        >
          {t(nav.key)}
        </button>
      </Link>
    );
  };

  return (
    <header className="flex flex-col bg-gray-800 text-white px-2 w-full">
      <div className="flex w-full items-center">
        <Menu
          strokeWidth={3}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="h-8 w-8 mr-2 xl:hidden"
        />
        <a href="/" title="page logo">
          <Image
            src="/manga.png"
            alt="Logo"
            width={100}
            height={100}
            priority={true}
          />
        </a>

        <nav className="m-2 scrollbar hidden xl:block">
          <ul className="text-base uppercase space-x-2 flex">
            {navigation.map((nav) => renderNavItem(nav, pathname))}
          </ul>
        </nav>
        <div className="ml-auto flex flex-row">
          {/** Search bar */}
          <Search placeholder={t("searchPlace")} lbl={t("search")} />
          <LanguageChanger />
        </div>
      </div>

      {/** Sidebar Menu on Mobile View */}
      {/** Blur Backdrop */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`z-10 h-screen w-screen backdrop-blur transition-all ${
          isMenuOpen ? "fixed" : "hidden"
        }`}
      />
      {/** Sidebar Menu */}
      {/** Sidebar Menu */}
      <nav
        className={`z-10 fixed h-full left-0 w-[70vw] bg-gray-800 flex flex-col transition-all duration-300 xl:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <img
          src="https://placewaifu.com/image/300"
          alt="waifu"
          className="max-h-64 pb-8"
        />
        <div className="p-4">
          <div className="w-full mb-8 justify-between flex">
            <h1 className="font-bold text-2xl uppercase">Menu</h1>
            <ArrowLeftFromLine
              onClick={() => setIsMenuOpen(false)}
              className="h-8 w-8"
            />
          </div>

          <ul className="gap-4 grid grid-cols-1">
            {navigation.map((nav) => renderNavItem(nav, pathname))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
