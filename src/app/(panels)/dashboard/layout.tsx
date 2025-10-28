"use client";

import SideBar, { ILinks } from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import { useState } from "react";
import { CiGrid41 } from "react-icons/ci";
import { LiaUserNurseSolid } from "react-icons/lia";
import { PiFaceMask, PiUser } from "react-icons/pi";
import { TbEyeShare, TbNurse, TbUserShield } from "react-icons/tb";

export const ownerLinks: ILinks[] = [
  { id: 1, title: "داشبورد", link: "/dashboard", icon: <CiGrid41 /> },
  {
    id: 2,
    title: "دکتر ها",
    link: "/dashboard/doctors",
    icon: <LiaUserNurseSolid />,
  },
  { id: 3, title: "بیماران", link: "/dashboard/sicks", icon: <PiFaceMask /> },
  {
    id: 4,
    title: "منشی ها",
    link: "/dashboard/secrataries",
    icon: <TbNurse  />,
  },
  { id: 5, title: "بازدید ها", link: "/dashboard/views", icon: <TbEyeShare /> },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(true); 

  return (
    <div className="flex bg-white">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} links={ownerLinks} />
      <div className={`${isOpen ? "w-[100%] ms:w-[80%]" : "w-[100%]"}`}>
        <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="p-5 text-black">{children}</div>
      </div>
    </div>
  );
}
