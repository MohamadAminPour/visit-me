"use client"

import React, { useContext } from "react";
import { HiMenu } from "react-icons/hi";
import { LuBadgeCheck } from "react-icons/lu";
import { ISideBarProps } from "./SideBar";
// import { IsLoginContext } from "../context/IsLoginContext";

export default function TopBar({ isOpen, setIsOpen }:any) {
  const profile = "" as any

  const API_PATH = "http://127.0.0.1:8000";

  return (
    <div className="h-[6rem] flex items-center gap-5 p-5">
      <HiMenu
        onClick={() => setIsOpen(!isOpen)}
        className="bg-zinc-200 p-1 rounded-lg text-[2rem] cursor-pointer hover:scale-110 duration-150 "
      />
      <div className="flex items-center gap-3 ">
        {profile.profile_photo_url ? (
          <img
            src={`${API_PATH}/storage/${profile.profile_photo_url}`}
            className="size-[3.5rem] rounded-full object-cover "
          />
        ) : (
          <img
            src={`/images/images.png`}
            className="size-[3rem] rounded-full object-cover "
          />
        )}
        <div>
          <div className="flex items-center gap-2 ">
            <p className="text-[1.1rem]">
             mohammad
            </p>
            {/* <div className="flex items-center gap-1 bg-primary/20 rounded-lg px-3 p-1">
              <LuBadgeCheck className="text-[.9rem] text-primary" />
              <p className="text-[.7rem] text-primary">
                {profile.role === "supervisor"
                  ? "مالک"
                  : profile.role === "admin"
                  ? "ادمین"
                  : profile.role === "developer"
                  ? "توسعه دهنده"
                  : profile.role === "user"
                  ? "کاربر"
                  : ""}
              </p>
            </div> */}
          </div>
          <p className="text-[.8rem] text-zinc-500 ">maminpour37@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
