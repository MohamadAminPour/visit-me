"use client";

import { ISick } from "@/app/api/(auth)/sickRegister/route";
import { IDoctor } from "@/app/api/doctors/route";
import { IExpertisies } from "@/app/api/expertisies/route";
import { IViews } from "@/app/api/views/route";
import Loader from "@/components/Loader";
import { getDoctors } from "@/hooks/useDoctors";
import { getuseExpertise } from "@/hooks/useExpertise";
import { getSecrataries } from "@/hooks/useSecrataries";
import { getSicks } from "@/hooks/useSicks";
import { getViews } from "@/hooks/useViews";
import { useQuery } from "@tanstack/react-query";
import { Trash, User } from "lucide-react";
import Link from "next/link";
import { CiGrid41 } from "react-icons/ci";
import { FiEye } from "react-icons/fi";
import { GoShieldCheck } from "react-icons/go";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { LiaUserNurseSolid } from "react-icons/lia";
import { PiFaceMask } from "react-icons/pi";
import { TbNurse } from "react-icons/tb";

export default function UserInfo() {
  //doctorData
  const { data: doctorsData, isPending: doctorsIsPending } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
  //sicksData
  const { data: sicksData, isPending: sicksIsPending } = useQuery({
    queryKey: ["sicks"],
    queryFn: getSicks,
  });
  //secratariesData
  const { data: secratariesData, isPending: secratariesIsPending } = useQuery({
    queryKey: ["secrataries"],
    queryFn: getSecrataries,
  });
  //expertisiesData
  const { data: expertisiesData, isPending: expertisiesIsPending } = useQuery({
    queryKey: ["expertisies"],
    queryFn: getuseExpertise,
  });
//ViewsData
  const { data: ViewsData, isPending: ViewsIsPending } = useQuery({
    queryKey: ["views"],
    queryFn: getViews,
  });

  // بازدیدهای امروز
  const now = new Date();
  const todayISO = now.toISOString().split("T")[0];
  const todayViews =
    ViewsData?.filter((d: IViews) => {
      const date = new Date(d.created_at);
      return date.toISOString().split("T")[0] === todayISO;
    }).length || 0;

  if (
    doctorsIsPending ||
    sicksIsPending ||
    secratariesIsPending ||
    expertisiesIsPending ||
    ViewsIsPending
  ) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col bg-white p-4 gap-7 rounded-xl shadow-[0_11px_50px_1px_rgba(0,0,0,0.1)]">
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
                {sicksData?.length}{" "}
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
                {doctorsData?.length}{" "}
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
            <TbNurse className="text-[3rem] bg-red-500 text-white p-3 rounded-md " />
            <div>
              <p className="text-[1rem] lg:text-[1.1rem]">تعداد منشی ها</p>
              <p className="text-[1rem] lg:text-[1.2rem]">
                {secratariesData?.length}{" "}
                <span className="text-zinc-500 text-[.8rem] lg:text-[1rem] ">
                  نفر
                </span>
              </p>
            </div>
            <Link
              href="/dashboard/secrataries"
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
              {todayViews}{" "}
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
              {sicksData?.map((sick: ISick) => (
                <li key={sick.id}>
                  <div className="flex items-center gap-2">
                    <div className="bg-secondry flex items-center justify-center rounded-lg size-[2.5rem] text-white">
                      <User />
                    </div>
                    <div>
                      <p>{sick.nameFamily || "بدون نام"}</p>
                      <p className="text-[.8rem] text-zinc-500">
                        شماره : {sick.phone} - کدملی : {sick.meli_code}
                      </p>
                    </div>
                  </div>
                  <p className="text-zinc-500 text-[.8rem] ">
                    {new Intl.DateTimeFormat("fa-IR").format(
                      new Date(sick.created_at)
                    )}
                  </p>
                </li>
              ))}
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
              {doctorsData?.map((doctor: IDoctor) => (
                <li key={doctor.id}>
                  <div className="flex items-center gap-2">
                    <img
                      src={doctor.image}
                      alt=""
                      className="size-[2.5rem] rounded-lg object-cover"
                    />
                    <div>
                      <p>{doctor.nameFamily}</p>
                      <p className="text-[.8rem] text-zinc-500">
                        تخصص :{" "}
                        {
                          expertisiesData?.find(
                            (exp: IExpertisies) =>
                              exp.id === doctor.expertise_id
                          ).name
                        }{" "}
                        - شماره تلفن : {doctor.phone}
                      </p>
                    </div>
                  </div>
                  <p className="text-zinc-500 text-[.8rem] ">
                    {new Intl.DateTimeFormat("fa-IR").format(
                      new Date(doctor.created_at)
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/*activities*/}
        {/* <div className="mt-5 grid grid-cols-1 gap-5">
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
                    <p className="text-[.9rem] md:text-[1rem] ">
                      محمد امین پور
                    </p>
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
        </div> */}
      </div>
    </div>
  );
}
