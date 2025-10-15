"use client";

import SideBar, { ILinks } from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import { Eye } from "lucide-react";
import { useState } from "react";
import { CiGrid41 } from "react-icons/ci";
import { FaRegChartBar } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { LiaUserNurseSolid, LiaUserSolid } from "react-icons/lia";
import { PiFaceMask, PiUser } from "react-icons/pi";
import { TbEyeShare, TbNurse, TbUserShield } from "react-icons/tb";

export const ownerLinks: ILinks[] = [
  { id: 1, title: "داشبورد", link: "/dashboard", icon: <CiGrid41 /> },
  { id: 2, title: "پروفایل من", link: "/dashboard/profile", icon: <PiUser /> },
  {
    id: 3,
    title: "دکتر ها",
    link: "/dashboard/doctors",
    icon: <LiaUserNurseSolid />,
  },
  { id: 4, title: "بیماران", link: "/dashboard/sicks", icon: <PiFaceMask /> },
  {
    id: 6,
    title: "منشی ها",
    link: "/dashboard/secratary",
    icon: <TbNurse  />,
  },
  { id: 7, title: "بازدید ها", link: "/dashboard/views", icon: <TbEyeShare /> },
  {
    id: 8,
    title: "فعالیت ها",
    link: "/dashboard/activities",
    icon: <FaRegChartBar />,
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
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} links={ownerLinks} />
      <div className={`${isOpen ? "w-[100%] ms:w-[80%]" : "w-[100%]"}`}>
        <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="p-5 text-black">{children}</div>
      </div>
    </div>
  );
}
