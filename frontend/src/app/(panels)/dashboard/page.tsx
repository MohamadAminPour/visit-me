"use client";

import { Trash } from "lucide-react";
import Link from "next/link";
import { CiGrid41 } from "react-icons/ci";
import { FiEye } from "react-icons/fi";
import { GoShieldCheck } from "react-icons/go";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { LiaUserNurseSolid } from "react-icons/lia";
import { PiFaceMask } from "react-icons/pi";
import { TbNurse } from "react-icons/tb";

export default function UserInfo() {
  return (
    <div className="flex flex-col bg-white py-6 px-3 gap-7 rounded-xl shadow-[0_11px_50px_1px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-1">
        <CiGrid41 className="size-7" />
        <p className="font-IranYekanBold text-[1rem]">داشبورد</p>
      </div>
      <div>
        {/*count of sections*/}
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 *:p-3 *:rounded-lg *:shadow-xl *:shadow-zinc-200 *:border-1 *:border-zinc-200">
          <li className="flex items-center justify-start gap-3 relative">
            <PiFaceMask className="text-[3rem] bg-secondry text-white p-3 rounded-md " />
            <div>
              <p className="text-[1rem] lg:text-[1.1rem]">تعداد بیماران</p>
              <p className="text-[1rem] lg:text-[1.2rem]">
                1,642{" "}
                <span className="text-zinc-500 text-[.8rem] lg:text-[1rem] ">
                  نفر
                </span>
              </p>
            </div>
            <Link
              href="/dashboard/sicks"
              className="text-[.7rem] text-primary hover:bg-primary hover:text-white duration-300 absolute bottom-3 left-3 border-1 border-zinc-200 px-3 py-1 rounded-full"
            >
              مشاهده
            </Link>
          </li>
          <li className="flex items-center justify-start gap-3 relative">
            <LiaUserNurseSolid className="text-[3rem] bg-primary text-white p-3 rounded-md " />
            <div>
              <p className="text-[1rem] lg:text-[1.1rem]">تعداد دکتر ها</p>
              <p className="text-[1rem] lg:text-[1.2rem]">
                12{" "}
                <span className="text-zinc-500 text-[.8rem] lg:text-[1rem] ">
                  نفر
                </span>
              </p>
            </div>
            <Link
              href="/dashboard/doctors"
              className="text-[.7rem] text-primary hover:bg-primary hover:text-white duration-300 absolute bottom-3 left-3 border-1 border-zinc-200 px-3 py-1 rounded-full"
            >
              مشاهده
            </Link>
          </li>
          <li className="flex items-center justify-start gap-3 relative">
            <GoShieldCheck className="text-[3rem] bg-red-500 text-white p-3 rounded-md " />
            <div>
              <p className="text-[1rem] lg:text-[1.1rem]">تعداد ادمین ها</p>
              <p className="text-[1rem] lg:text-[1.2rem]">
                3{" "}
                <span className="text-zinc-500 text-[.8rem] lg:text-[1rem] ">
                  نفر
                </span>
              </p>
            </div>
            <Link
              href="/dashboard/admins"
              className="text-[.7rem] text-primary hover:bg-primary hover:text-white duration-300 absolute bottom-3 left-3 border-1 border-zinc-200 px-3 py-1 rounded-full"
            >
              مشاهده
            </Link>
          </li>
          <li className="flex items-center justify-start gap-3 relative">
            <FiEye className="text-[3rem] bg-yellow-500 text-white p-3 rounded-md " />
            <div>
              <p className="text-[1rem] lg:text-[1.1rem]">بازدید امروز</p>
              <p className="text-[1rem] lg:text-[1.2rem]">
                14,200{" "}
                <span className="text-zinc-500 text-[.8rem] lg:text-[1rem] ">
                  تا
                </span>
              </p>
            </div>
            <Link
              href="/dashboard/views"
              className="text-[.7rem] text-primary hover:bg-primary hover:text-white duration-300 absolute bottom-3 left-3 border-1 border-zinc-200 px-3 py-1 rounded-full"
            >
              مشاهده
            </Link>
          </li>
        </ul>
        {/*last doctors and sicks*/}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/*sicks*/}
          <div className="p-3 rounded-lg shadow-xl shadow-zinc-200 border-1 border-zinc-200">
            <div className="flex items-center justify-between">
              <p>بیماران اخیر</p>
              <Link
                href="/dashboard/sicks"
                className="text-[.7rem] text-primary hover:bg-primary hover:text-white duration-300 border-1 border-zinc-200 px-3 py-1 rounded-full"
              >
                مشاهده بیشتر
              </Link>
            </div>
            <ul className="*:mb-3 *:flex *:items-end *:justify-between mt-3 h-[20rem] overflow-y-scroll *:pl-2 ">
              <li>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/img.png"
                    alt=""
                    className="size-[2.5rem] rounded-lg object-cover"
                  />
                  <div>
                    <p>mohammad</p>
                    <p className="text-[.8rem] text-zinc-500">
                      maminpour37@gmail.com
                    </p>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">13 مهر 1404</p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/img.png"
                    alt=""
                    className="size-[2.5rem] rounded-lg object-cover"
                  />
                  <div>
                    <p>mohammad</p>
                    <p className="text-[.8rem] text-zinc-500">
                      maminpour37@gmail.com
                    </p>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">13 مهر 1404</p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/img.png"
                    alt=""
                    className="size-[2.5rem] rounded-lg object-cover"
                  />
                  <div>
                    <p>mohammad</p>
                    <p className="text-[.8rem] text-zinc-500">
                      maminpour37@gmail.com
                    </p>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">13 مهر 1404</p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/img.png"
                    alt=""
                    className="size-[2.5rem] rounded-lg object-cover"
                  />
                  <div>
                    <p>mohammad</p>
                    <p className="text-[.8rem] text-zinc-500">
                      maminpour37@gmail.com
                    </p>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">13 مهر 1404</p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/img.png"
                    alt=""
                    className="size-[2.5rem] rounded-lg object-cover"
                  />
                  <div>
                    <p>mohammad</p>
                    <p className="text-[.8rem] text-zinc-500">
                      maminpour37@gmail.com
                    </p>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">13 مهر 1404</p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/img.png"
                    alt=""
                    className="size-[2.5rem] rounded-lg object-cover"
                  />
                  <div>
                    <p>mohammad</p>
                    <p className="text-[.8rem] text-zinc-500">
                      maminpour37@gmail.com
                    </p>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">13 مهر 1404</p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/img.png"
                    alt=""
                    className="size-[2.5rem] rounded-lg object-cover"
                  />
                  <div>
                    <p>mohammad</p>
                    <p className="text-[.8rem] text-zinc-500">
                      maminpour37@gmail.com
                    </p>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">13 مهر 1404</p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/img.png"
                    alt=""
                    className="size-[2.5rem] rounded-lg object-cover"
                  />
                  <div>
                    <p>mohammad</p>
                    <p className="text-[.8rem] text-zinc-500">
                      maminpour37@gmail.com
                    </p>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">13 مهر 1404</p>
              </li>
            </ul>
          </div>
          {/*doctors*/}
          <div className="p-3 rounded-lg shadow-xl shadow-zinc-200 border-1 border-zinc-200">
            <div className="flex items-center justify-between">
              <p>دکتر های اخیر</p>
              <Link
                href="/dashboard/doctors"
                className="text-[.7rem] text-primary hover:bg-primary hover:text-white duration-300 border-1 border-zinc-200 px-3 py-1 rounded-full"
              >
                مشاهده بیشتر
              </Link>
            </div>
            <ul className="*:mb-3 *:flex *:items-end *:justify-between mt-3 h-[20rem] overflow-y-scroll *:pl-2 ">
              <li>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/img.png"
                    alt=""
                    className="size-[2.5rem] rounded-lg object-cover"
                  />
                  <div>
                    <p>mohammad</p>
                    <p className="text-[.8rem] text-zinc-500">
                      maminpour37@gmail.com
                    </p>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">13 مهر 1404</p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/img.png"
                    alt=""
                    className="size-[2.5rem] rounded-lg object-cover"
                  />
                  <div>
                    <p>mohammad</p>
                    <p className="text-[.8rem] text-zinc-500">
                      maminpour37@gmail.com
                    </p>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">13 مهر 1404</p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/img.png"
                    alt=""
                    className="size-[2.5rem] rounded-lg object-cover"
                  />
                  <div>
                    <p>mohammad</p>
                    <p className="text-[.8rem] text-zinc-500">
                      maminpour37@gmail.com
                    </p>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">13 مهر 1404</p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/img.png"
                    alt=""
                    className="size-[2.5rem] rounded-lg object-cover"
                  />
                  <div>
                    <p>mohammad</p>
                    <p className="text-[.8rem] text-zinc-500">
                      maminpour37@gmail.com
                    </p>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">13 مهر 1404</p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/img.png"
                    alt=""
                    className="size-[2.5rem] rounded-lg object-cover"
                  />
                  <div>
                    <p>mohammad</p>
                    <p className="text-[.8rem] text-zinc-500">
                      maminpour37@gmail.com
                    </p>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">13 مهر 1404</p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/img.png"
                    alt=""
                    className="size-[2.5rem] rounded-lg object-cover"
                  />
                  <div>
                    <p>mohammad</p>
                    <p className="text-[.8rem] text-zinc-500">
                      maminpour37@gmail.com
                    </p>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">13 مهر 1404</p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/img.png"
                    alt=""
                    className="size-[2.5rem] rounded-lg object-cover"
                  />
                  <div>
                    <p>mohammad</p>
                    <p className="text-[.8rem] text-zinc-500">
                      maminpour37@gmail.com
                    </p>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">13 مهر 1404</p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/img.png"
                    alt=""
                    className="size-[2.5rem] rounded-lg object-cover"
                  />
                  <div>
                    <p>mohammad</p>
                    <p className="text-[.8rem] text-zinc-500">
                      maminpour37@gmail.com
                    </p>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">13 مهر 1404</p>
              </li>
            </ul>
          </div>
        </div>
        {/*activities*/}
        <div className="mt-5 grid grid-cols-1 gap-5">
          <div className="p-3 rounded-lg shadow-xl shadow-zinc-200 border-1 border-zinc-200">
            <div className="flex items-center justify-between">
              <p>فعالیت های اخیر</p>
              <Link
                href="/dashboard/activities"
                className="text-[.7rem] text-primary hover:bg-primary hover:text-white duration-300 border-1 border-zinc-200 px-3 py-1 rounded-full"
              >
                مشاهده بیشتر
              </Link>
            </div>
            <ul className="*:mb-5 *:flex md:*:items-end *:items-start *:justify-between *:flex-col md:*:flex-row *:gap-2 mt-3 h-[20rem] overflow-y-scroll *:pl-2 ">
              <li>
                <div className="flex items-center gap-2">
                  <HiOutlineShieldCheck className="bg-red-500 size-[2rem] p-2 rounded-md text-white " />
                  <div className="flex items-center gap-1">
                    <p className="text-[.9rem] md:text-[1rem] ">محمد امین پور</p>
                    <p>:</p>
                    <p className="text-[.9rem] md:text-[1rem] text-zinc-500">
                      ادمین جدیدی اضافه کرد
                    </p>
                    <span className="text-[.8rem] md:text-[1rem] text-black">
                      (علی حسینی) .
                    </span>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">
                  13 مهر 1404 - ساعت 12:32
                </p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <PiFaceMask className="bg-secondry size-[2rem] p-2 rounded-md text-white " />
                  <div className="flex items-center gap-1">
                    {/* <p>علی سعیدی</p>
                    <p>:</p> */}
                    <p className="text-[.9rem] text-zinc-500">
                      بیمار جدید عضو شد
                    </p>
                    <span className="text-[1rem] text-black">
                      (مهدی صالحی) .
                    </span>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">
                  13 مهر 1404 - ساعت 12:32
                </p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <Trash className="bg-gray-500 size-[2rem] p-2 rounded-md text-white " />
                  <div className="flex items-center gap-1">
                    <p>علی سعیدی</p>
                    <p>:</p>
                    <p className="text-[.9rem] text-zinc-500">
                      بیماری را بن کرد
                    </p>
                    <span className="text-[1rem] text-black">
                      (مهدی صالحی) .
                    </span>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">
                  13 مهر 1404 - ساعت 12:32
                </p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <PiFaceMask className="bg-secondry size-[2rem] p-2 rounded-md text-white " />
                  <div className="flex items-center gap-1">
                    {/* <p>علی سعیدی</p>
                    <p>:</p> */}
                    <p className="text-[.9rem] text-zinc-500">
                      بیمار جدید عضو شد
                    </p>
                    <span className="text-[1rem] text-black">
                      (زهرا خسروی) .
                    </span>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">
                  13 مهر 1404 - ساعت 12:32
                </p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <LiaUserNurseSolid className="bg-primary size-[2rem] p-2 rounded-md text-white " />
                  <div className="flex items-center gap-1">
                    <p className="text-[.9rem] text-zinc-500">
                      دکتر جدید عضو شد
                    </p>
                    <span className="text-[1rem] text-black">
                      (زهرا محمدی) .
                    </span>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">
                  13 مهر 1404 - ساعت 12:32
                </p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <TbNurse className="bg-yellow-500 size-[2rem] p-2 rounded-md text-white " />
                  <div className="flex items-center gap-1">
                    <p className="text-[.9rem] text-zinc-500">
                      درخواست جدید ارسال شد .
                    </p>
                    <span className="text-[1rem] text-black">
                      (زهرا محمدی) .
                    </span>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">
                  13 مهر 1404 - ساعت 12:32
                </p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <TbNurse className="bg-green-500 size-[2rem] p-2 rounded-md text-white " />
                  <div className="flex items-center gap-1">
                    <p>محمد امین پور</p>
                    <p>:</p>
                    <p className="text-[.9rem] text-zinc-500">
                      دکتری را تایید کرد
                    </p>
                    <span className="text-[1rem] text-black">
                      (زهرا محمدی) .
                    </span>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">
                  13 مهر 1404 - ساعت 12:32
                </p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <PiFaceMask className="bg-secondry size-[2rem] p-2 rounded-md text-white " />
                  <div className="flex items-center gap-1">
                    {/* <p>علی سعیدی</p>
                    <p>:</p> */}
                    <p className="text-[.9rem] text-zinc-500">
                      بیمار جدید عضو شد
                    </p>
                    <span className="text-[1rem] text-black">
                      (کیوان بابایی) .
                    </span>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">
                  13 مهر 1404 - ساعت 12:32
                </p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <PiFaceMask className="bg-secondry size-[2rem] p-2 rounded-md text-white " />
                  <div className="flex items-center gap-1">
                    {/* <p>علی سعیدی</p>
                    <p>:</p> */}
                    <p className="text-[.9rem] text-zinc-500">
                      بیمار جدید عضو شد
                    </p>
                    <span className="text-[1rem] text-black">
                      (فاطمه عزیزی) .
                    </span>
                  </div>
                </div>
                <p className="text-zinc-500 text-[.8rem] ">
                  13 مهر 1404 - ساعت 12:32
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
