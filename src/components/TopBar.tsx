"use client";

import React, { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "@/hooks/useMyProfile";
import Image from "next/image";

export interface ISideBarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const roles: Record<string, string> = {
  admin: "ادمین",
  doctor: "دکتر",
  secratary: "منشی",
  sick: "بیمار",
};

export default function TopBar({ isOpen, setIsOpen }: ISideBarProps) {
  const [token, setToken] = useState<string | null>(null);

  // ✅ گرفتن توکن از localStorage فقط یک بار
  useEffect(() => {
    const t = localStorage.getItem("tokan");
    if (t) setToken(t);
  }, []);

  // ✅ واکشی پروفایل فقط وقتی توکن آماده است
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getMyProfile(token as string),
    enabled: !!token, // اجرا فقط وقتی توکن موجود است
  });

  // ✅ اگر توکن بعد از mount آماده شد، مجدداً refetch کن
  useEffect(() => {
    if (token) refetch();
  }, [token, refetch]);

  console.log(data);

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="h-[6rem] flex items-center gap-5 p-5">
      <HiMenu
        onClick={() => setIsOpen(!isOpen)}
        className="bg-zinc-200 p-1 rounded-lg text-[2rem] cursor-pointer hover:scale-110 duration-150 "
      />
      <div className="flex items-center gap-3 ">
        {data?.user?.image ? (
          <div className="w-13 h-13 relative rounded-full overflow-hidden">
            <Image
              src={data?.user?.image || "/images/images.png"}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <img
            src={`/images/images.png`}
            className="size-[3rem] rounded-full object-cover "
          />
        )}
        <div>
          <div className="flex items-center gap-2 ">
            <p className="text-[1.1rem]">
              {data?.user?.nameFamily || "بدون نام"}
            </p>
          </div>
          <p className="text-[.8rem] text-zinc-500 ">
            نقش شما : {roles[data?.user?.role ?? ""] ?? ""}
          </p>
        </div>
      </div>
    </div>
  );
}
