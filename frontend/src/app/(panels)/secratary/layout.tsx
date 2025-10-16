"use client";

import SideBar, { ILinks } from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import { useState } from "react";
import { HiOutlineNewspaper } from "react-icons/hi";
import { ImLab } from "react-icons/im";
import { LiaUserNurseSolid } from "react-icons/lia";

export const secrataryLinks: ILinks[] = [
  {
    id: 1,
    title: "نوبت ها",
    link: "/secratary/visits",
    icon: <HiOutlineNewspaper />,
  },
  {
    id: 2,
    title: "دکتر ها",
    link: "/secratary/doctors",
    icon: <LiaUserNurseSolid />,
  },
   {
    id: 3,
    title: "تخصص ها",
    link: "/secratary/expertise",
    icon: <ImLab/>,
  },
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
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} links={secrataryLinks} />
      <div className={`${isOpen ? "w-[100%] ms:w-[80%]" : "w-[100%]"}`}>
        <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="p-5 text-black">{children}</div>
      </div>
    </div>
  );
}
