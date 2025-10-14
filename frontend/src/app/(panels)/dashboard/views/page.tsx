"use client"

import React, { useState } from "react";

const stats = [
  { id: 1, views: 542, description: "بازدید امروز", date: "دوشنبه" },
  { id: 2, views: 12450, description: "بازدید این ماه", date: "مهر ماه" },
  { id: 3, views: 152300, description: "بازدید کل", date: "سال 1404" },
];

export default function page() {

  const [filterView,setFilterView] = useState("d")
  
  return (
    <div className="bg-gray-50 flex items-center justify-center flex-col">
      <p className="text-[1.1rem] md:text-[1.3rem] text-center">
        بازدید های ویزیت می
      </p>
      <p className="text-[.8rem] md:text-[1rem] text-zinc-500 text-center">
        بازدید های متغیر را میتوانید مشاهده کنید !
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 md:gap-3 w-full max-w-6xl mt-5">
        {stats.map((stat) => (
          <div
            key={stat?.id}
            className="bg-white *:text-center rounded-xl shadow-xl shadow-zinc-200 border-1 border-zinc-200 px-2 py-5 flex flex-col items-center justify-center border-t-4 border-t-[#3490dc]"
          >
            <h2 className="text-[.8rem] md:text-[1.3rem] font-semibold text-gray-700">
              {stat.description}
            </h2>
            <p className="text-[1.1rem] md:text-[2rem] font-bold text-[#3490dc] my-2">
              {stat.views}
            </p>
            <p className="text-gray-500 text-[.8r em] md:text-[1.1rem] ">
              {stat.date}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full">
        <div className="mt-10 text-center">
          <p className="text-[1.1rem] md:text-[1.3rem] ">بازه بازدید دلخواه</p>
          <p className="text-[.8rem] md:text-[1rem] text-zinc-500 ">
            میتوانید بازه زمانی دلخواهی برای مشاهده بازدید انتخاب کنید !
          </p>
        </div>
        <div className="flex items-center flex-col">
          <ul className="flex items-center justify-center gap-2 my-4 *:border-1 *:border-zinc-200 *:px-6 *:py-2 *:cursor-pointer *:rounded-md *:hover:bg-primary *:hover:text-white *:duration-300 *:text-[.9rem] ">
            <li className={`${filterView=="d"&&"bg-primary text-white"} `} onClick={()=>{setFilterView("d")}}>بر اساس روز</li>
            <li className={`${filterView=="m"&&"bg-primary text-white"} `} onClick={()=>{setFilterView("m")}}>بر اساس ماه</li>
            <li className={`${filterView=="y"&&"bg-primary text-white"} `} onClick={()=>{setFilterView("y")}}>بر اساس سال</li>
          </ul>
          {filterView==="d"?(
          <form className="flex items-center flex-col">
            <div className="grid grid-cols-3 gap-2 mt-3">
              <input
                type="text"
                name=""
                id=""
                placeholder="روز | دوشنبه"
                className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
              />
              <input
                type="text"
                name=""
                id=""
                placeholder="ماه | مثال مهر"
                className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
              />
              <input
                type="text"
                name=""
                id=""
                placeholder="سال | مثال 1404"
                className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
              />
            </div>
            <button className="w-[10rem] flex items-center justify-center gap-2 bg-green-600 cursor-pointer duration-300 hover:bg-green-500 p-2 px-5 rounded-lg text-white text-[.9rem] mt-5 ">
              تایید
            </button>
          </form>
          ):filterView==="m"?(
          <form className="flex items-center flex-col">
            <div className="grid grid-cols-2 gap-2 mt-3">
              <input
                type="text"
                name=""
                id=""
                placeholder="ماه | مثال مهر"
                className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
              />
              <input
                type="text"
                name=""
                id=""
                placeholder="سال | مثال 1404"
                className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
              />
            </div>
            <button className="w-[10rem] flex items-center justify-center gap-2 bg-green-600 cursor-pointer duration-300 hover:bg-green-500 p-2 px-5 rounded-lg text-white text-[.9rem] mt-5 ">
              تایید
            </button>
          </form>
          ):(
          <form className="flex items-center flex-col">
            <div className="grid grid-cols-1 gap-2 mt-3">
              <input
                type="text"
                name=""
                id=""
                placeholder="سال | مثال 1404"
                className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
              />
            </div>
            <button className="w-[10rem] flex items-center justify-center gap-2 bg-green-600 cursor-pointer duration-300 hover:bg-green-500 p-2 px-5 rounded-lg text-white text-[.9rem] mt-5 ">
              تایید
            </button>
          </form>
          )}
          {/* <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 md:gap-3 w-full max-w-6xl mt-5">
            {stats.map((stat) => (
              <div
                key={stat?.id}
                className="bg-white *:text-center rounded-xl shadow-xl shadow-zinc-200 border-1 border-zinc-200 px-2 py-5 flex flex-col items-center justify-center border-t-4 border-t-[#3490dc]"
              >
                <h2 className="text-[.8rem] md:text-[1.3rem] font-semibold text-gray-700">
                  {stat.description}
                </h2>
                <p className="text-[1.1rem] md:text-[2rem] font-bold text-[#3490dc] my-2">
                  {stat.views.toLocaleString()}
                </p>
                <p className="text-gray-500 text-[.8r em] md:text-[1.1rem] ">
                  {stat.date}
                </p>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}
