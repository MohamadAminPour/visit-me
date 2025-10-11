"use client";

import SideBar, { ILinks } from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import { useState } from "react";
import { LiaUserSolid } from "react-icons/lia";

const links: ILinks[] = [
  { id: 1, title: "داشبورد", link: "/dashboard" },
  { id: 2, title: "پروفایل من", link: "/dashboard/profile" },
  { id: 3, title: "دکتر ها", link: "/dashboard/doctors" },
  { id: 4, title: "بیماران", link: "/dashboard/sicks" },
  { id: 5, title: "درخواست دکتر", link: "/dashboard/drRequests" },
];

export default function UserInfo() {
  const [isOpen, setIsOpen] = useState(1);
  const [profile, setProfile] = useState(null);

  return (
    <div className="flex bg-white">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} links={links} />
      <div className={`${isOpen ? "w-[80%]" : "w-[100%]"}`}>
        <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="p-5 text-black">
          <div className="flex flex-col bg-white py-6 px-10 gap-7 rounded-xl shadow-[0_11px_50px_1px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-1">
              <LiaUserSolid className="size-7" />
              <p className="font-IranYekanBold text-[1rem]">اطلاعات فردی</p>
            </div>

            <form className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5"></form>
          </div>
        </div>
      </div>
    </div>
  );
}
