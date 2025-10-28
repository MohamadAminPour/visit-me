"use client";

import SideBar, { ILinks } from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import { useState } from "react";
import { HiOutlineNewspaper } from "react-icons/hi";
import { LiaUserNurseSolid } from "react-icons/lia";
import { PiUser } from "react-icons/pi";

export const sickLinks: ILinks[] = [
  { id: 1, title: "پروفایل من", link: "/sick/profile", icon: <PiUser /> },
  {
    id: 2,
    title: "دکتر های مجموعه",
    link: "/sick/doctors",
    icon: <LiaUserNurseSolid />,
  },
  {
    id: 3,
    title: "نوبت های من",
    link: "/sick/myVisits",
    icon: <HiOutlineNewspaper />,
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(true); 

  return (
    <div className="flex bg-white">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} links={sickLinks} />
      <div className={`${isOpen ? "w-[100%] ms:w-[80%]" : "w-[100%]"}`}>
        <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="p-5 text-black">{children}</div>
      </div>
    </div>
  );
}
