"use client";

import SideBar, { ILinks } from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import { useState } from "react";
import { CiGrid41 } from "react-icons/ci";
import { LiaUserNurseSolid, LiaUserSolid } from "react-icons/lia";
import { PiFaceMask, PiUser } from "react-icons/pi";
import { TbNurse } from "react-icons/tb";

export const ownerLinks: ILinks[] = [
  { id: 1, title: "داشبورد", link: "/dashboard" ,icon:<CiGrid41 />},
  { id: 2, title: "پروفایل من", link: "/dashboard/profile" ,icon:<PiUser  />},
  { id: 3, title: "دکتر ها", link: "/dashboard/doctors" ,icon:<LiaUserNurseSolid  />},
  { id: 4, title: "بیماران", link: "/dashboard/sicks",icon:<PiFaceMask  /> },
  { id: 5, title: "درخواست دکتر", link: "/dashboard/drRequests" ,icon:<TbNurse  />},
];

export default function UserInfo({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(1);
  const [profile, setProfile] = useState(null);

  return (
    <div className="flex bg-white">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} links={ownerLinks} />
      <div className={`${isOpen ? "w-[80%]" : "w-[100%]"}`}>
        <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="p-5 text-black">
        {children}
        </div>
      </div>
    </div>
  );
}
