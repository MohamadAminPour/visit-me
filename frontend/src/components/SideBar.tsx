"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";
import { LuLogOut, LuUserRound } from "react-icons/lu";

export interface ISideBarProps {
  isOpen: number;
  setIsOpen: any;
  links: ILinks[];
}

export interface ILinks {
  id: number;
  title: string;
  link: string;
  icon: JSX.Element;
}

export default function SideBar({ isOpen, setIsOpen, links }: ISideBarProps) {
  const path = usePathname();
  console.log(path);

  function sidebarHandler() {
    if (window.innerWidth <= 766) {
      setIsOpen(false);
    }
  }

  return (
    <div
      className={`h-screen ${
        isOpen ? "w-[17rem] lg:w-[20%] xl:w-[17%] " : "w-0 hidden"
      } fixed md:sticky top-0 z-50 p-3 duration-500 bg-[#fff] border-l-2 border-zinc-200 text-black`}
    >
      <div className="flex items-center justify-between mb-3 pb-3 border-b-1 border-b-zinc-200">
          <p className="text-[1.1rem] md:text-[1.5rem] Morabba text-primary">
            ویزیت می
          </p>
        <p
          className="text-2xl cursor-pointer"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          ×
        </p>
      </div>

      <ul className="*:mb-2 *:rounded-sm *:hover:bg-primaryLight *:duration-200 **:flex **:items-center **:gap-2 *:w-full  ">
        {links?.map((item: ILinks) => (
          <li key={item.id} onClick={sidebarHandler}>
            <Link
              href={item.link}
              className={`${
                path === item.link && path.includes(item.link) && "bg-primary text-white"
              } p-2 rounded-md text-[.9rem] w-full flex items-center gap-2`}
            >
              <div className="text-xl">{item.icon}</div>
              <p>{item.title}</p>
            </Link>
          </li>
        ))}

        <li onClick={sidebarHandler}>
          <button
            // onClick={logoutHandle}
            className="p-2 text-[.9rem] w-full cursor-pointer"
          >
            <LuLogOut className="text-xl" />
            <p>خروج از حساب</p>
          </button>
        </li>
      </ul>
    </div>
  );
}
