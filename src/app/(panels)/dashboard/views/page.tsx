"use client";

import { IViews } from "@/app/api/views/route";
import Loader from "@/components/Loader";
import { PersianDate } from "@/components/PersianDate";
import { getViews } from "@/hooks/useViews";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import jalaali from "jalaali-js";

export default function Page() {
  const { data, isPending } = useQuery({
    queryKey: ["views"],
    queryFn: getViews,
  });

  let nowDate = PersianDate(new Date()).split("-");
  console.log(data);

  const now = new Date();

  const todayISO = now.toISOString().split("T")[0]; // مثل 2025-10-27
  const thisMonth = now.getMonth(); // 0 تا 11
  const thisYear = now.getFullYear();

  // بازدیدهای امروز
  const todayViews =
    data?.filter((d: IViews) => {
      const date = new Date(d.created_at);
      return date.toISOString().split("T")[0] === todayISO;
    }).length || 0;

  // بازدیدهای این ماه
  const monthViews =
    data?.filter((d: IViews) => {
      const date = new Date(d.created_at);
      return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
    }).length || 0;

  // بازدیدهای امسال
  const yearViews =
    data?.filter(
      (d: IViews) => new Date(d.created_at).getFullYear() === thisYear
    ).length || 0;

  const [filterView, setFilterView] = useState<"d" | "m" | "y">("d");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const filtered = data.filter((d: IViews) => {
      const jDate = jalaali.toJalaali(new Date(d.created_at));
      const jMonthName = months[jDate.jm - 1]; // مثل "آبان"

      if (filterView === "d") {
        return (
          jDate.jd === Number(day) &&
          jMonthName === month &&
          jDate.jy === Number(year)
        );
      } else if (filterView === "m") {
        return jMonthName === month && jDate.jy === Number(year);
      } else {
        return jDate.jy === Number(year);
      }
    });

    setResult(filtered.length);
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-50 flex items-center justify-center flex-col">
      <p className="text-[1.1rem] md:text-[1.3rem] text-center">
        بازدید های ویزیت می
      </p>
      <p className="text-[.8rem] md:text-[1rem] text-zinc-500 text-center">
        بازدید های متغیر را میتوانید مشاهده کنید !
      </p>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-1 md:gap-3 w-full max-w-6xl mt-5">
        <li className="bg-white *:text-center rounded-xl shadow-xl shadow-zinc-200 border-1 border-zinc-200 px-2 py-5 flex flex-col items-center justify-center border-t-4 border-t-[#3490dc]">
          <h2 className="text-[.8rem] md:text-[1.3rem] font-semibold text-gray-700">
            بازدید امروز
          </h2>
          <p className="text-[1.1rem] md:text-[2rem] font-bold text-[#3490dc] my-2">
            {todayViews}
          </p>
          <p className="text-gray-500 text-[.8r em] md:text-[1.1rem] ">
            {nowDate[0]}
          </p>
        </li>
        <li className="bg-white *:text-center rounded-xl shadow-xl shadow-zinc-200 border-1 border-zinc-200 px-2 py-5 flex flex-col items-center justify-center border-t-4 border-t-[#3490dc]">
          <h2 className="text-[.8rem] md:text-[1.3rem] font-semibold text-gray-700">
            بازدید این ماه
          </h2>
          <p className="text-[1.1rem] md:text-[2rem] font-bold text-[#3490dc] my-2">
            {monthViews}
          </p>
          <p className="text-gray-500 text-[.8r em] md:text-[1.1rem] ">
            {nowDate[1]}
          </p>
        </li>
        <li className="bg-white *:text-center rounded-xl shadow-xl shadow-zinc-200 border-1 border-zinc-200 px-2 py-5 flex flex-col items-center justify-center border-t-4 border-t-[#3490dc]">
          <h2 className="text-[.8rem] md:text-[1.3rem] font-semibold text-gray-700">
            بازدید این سال
          </h2>
          <p className="text-[1.1rem] md:text-[2rem] font-bold text-[#3490dc] my-2">
            {yearViews}
          </p>
          <p className="text-gray-500 text-[.8r em] md:text-[1.1rem] ">
            {nowDate[2]}
          </p>
        </li>
      </ul>
      <div className="w-full">
        <div className="mt-10 text-center">
          <p className="text-[1.1rem] md:text-[1.3rem] ">بازه بازدید دلخواه</p>
          <p className="text-[.8rem] md:text-[1rem] text-zinc-500 ">
            میتوانید بازه زمانی دلخواهی برای مشاهده بازدید انتخاب کنید !
          </p>
        </div>

        <div className="flex items-center flex-col">
          {/* انتخاب نوع فیلتر */}
          <ul className="flex items-center justify-center gap-2 my-4 *:border-1 *:border-zinc-200 *:px-6 *:py-2 *:cursor-pointer *:rounded-md *:hover:bg-primary *:hover:text-white *:duration-300 *:text-[.9rem] ">
            <li
              className={`${filterView == "d" && "bg-primary text-white"} `}
              onClick={() => setFilterView("d")}
            >
              بر اساس روز
            </li>
            <li
              className={`${filterView == "m" && "bg-primary text-white"} `}
              onClick={() => setFilterView("m")}
            >
              بر اساس ماه
            </li>
            <li
              className={`${filterView == "y" && "bg-primary text-white"} `}
              onClick={() => setFilterView("y")}
            >
              بر اساس سال
            </li>
          </ul>

          {/* فرم فیلتر */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center flex-col w-full max-w-lg"
          >
            {filterView === "d" && (
              <div className="grid grid-cols-3 gap-2 mt-3 w-full">
                <input
                  type="text"
                  placeholder="روز | مثال 5"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="border-1 w-full text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                />
                <input
                  type="text"
                  placeholder="ماه | مثال آبان"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="border-1 w-full text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                />
                <input
                  type="text"
                  placeholder="سال | مثال 1404"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="border-1 w-full text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                />
              </div>
            )}

            {filterView === "m" && (
              <div className="grid grid-cols-2 gap-2 mt-3 w-full">
                <input
                  type="text"
                  placeholder="ماه | مثال آبان"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="border-1 w-full text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                />
                <input
                  type="text"
                  placeholder="سال | مثال 1404"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="border-1 w-full text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                />
              </div>
            )}

            {filterView === "y" && (
              <div className="grid grid-cols-1 gap-2 mt-3 w-full">
                <input
                  type="text"
                  placeholder="سال | مثال 1404"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="border-1 w-full text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                />
              </div>
            )}

            <button className="w-[10rem] flex items-center justify-center gap-2 bg-green-600 cursor-pointer duration-300 hover:bg-green-500 p-2 px-5 rounded-lg text-white text-[.9rem] mt-5 ">
              تایید
            </button>
          </form>

          {/* نتیجه */}
          {result !== null && (
            <div className="mt-6 text-center">
              <p className="text-[1rem] text-zinc-600">
                تعداد بازدیدهای یافت‌شده:
              </p>
              <p className="text-[1.8rem] font-bold text-[#3490dc]">
                {result.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
