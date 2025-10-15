"use client";

import { LiaUserSolid } from "react-icons/lia";

export default function page() {
  return (
    <div className="flex flex-col bg-white py-6 px-10 gap-2 rounded-xl shadow-[0_11px_50px_1px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-1">
        <LiaUserSolid className="size-7" />
        <p className="font-IranYekanBold text-[1rem]">اطلاعات فردی</p>
      </div>

      <form>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
          <div className="flex items-start flex-col mt-5">
            <label htmlFor="">نام</label>
            <input
              type="text"
              className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
              placeholder="نام خود را وارد کنید..."
            />
          </div>
          <div className="flex items-start flex-col mt-5">
            <label htmlFor="">نام خانوادگی</label>
            <input
              type="text"
              className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
              placeholder="نام خانوادگی خود را وارد کنید..."
            />
          </div>
          <div className="flex items-start flex-col mt-5">
            <label htmlFor="">شماره تلفن</label>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              style={{ direction: "rtl" }}
              className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
              placeholder="شماره تلفن خود را وارد کنید..."
            />
          </div>
          <div className="flex items-start flex-col mt-5">
            <label htmlFor="">کدملی</label>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              style={{ direction: "rtl" }}
              className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
              placeholder="کدملی خود را وارد کنید..."
            />
          </div>
          <div className="flex items-start flex-col mt-5">
            <label htmlFor="">کدپستی</label>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              style={{ direction: "rtl" }}
              className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
              placeholder="کدپستی خود را وارد کنید..."
            />
          </div>
          <div className="flex items-start flex-col mt-5">
            <label htmlFor="">عکس پروفایل</label>
            <input
              type="file"
              className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
            />
          </div>
        </div>
          <div className="flex items-center gap-1">
            <button className="flex items-center justify-center gap-2 bg-yellow-500/80 cursor-pointer duration-300 hover:bg-yellow-500 p-2 px-5 rounded-lg text-white text-[.9rem] mt-5 ">
              ویرایش
            </button>
          </div>
      </form>
    </div>
  );
}
