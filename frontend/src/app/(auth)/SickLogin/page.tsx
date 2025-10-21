import AnimatedContainer from "@/components/AnimatedContainer";
import Link from "next/link";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

export default function page() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute top-0"
      >
        <path
          fill="#00a693"
          fillOpacity="1"
          d="M0,224L120,186.7C240,149,480,75,720,53.3C960,32,1200,64,1320,80L1440,96L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
        ></path>
      </svg>
      <Link
        href="/"
        className="absolute top-[1rem] right-[1rem] bg-zinc-200/50 px-4 py-1 rounded-sm text-[.8rem] hover:bg-zinc-300 duration-300"
      >
        خروج
      </Link>
      <AnimatedContainer>
        <div className="h-screen flex items-center justify-center flex-col ">
          <form className="rounded-2xl py-8 px-10 border-1 border-zinc-200 w-[27rem] shadow-xl shadow-zinc-200 z-20 bg-white">
            <div className="text-center w-full">
              <h2 className="text-[2rem] Morabba">ورود به ویزیت می</h2>
              <p className="text-zinc-500 text-[.9rem]">
                حسابی برای ورود ندارید؟
                <Link href="/sickRegister" className="text-secondry mr-1">
                  ثبت نام
                </Link>
              </p>
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
              {/* <div className="flex items-start flex-col mt-2">
              <label htmlFor="">رمز عبور</label>
              <input
                type="password"
                className="border-1 w-full mt-2 outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                placeholder="رمز عبور خود را وارد کنید..."
              />
            </div> */}
              <button className="w-full flex items-center justify-center gap-2 hover:bg-secondry hover:text-white bg-secondryLight cursor-pointer py-2 mt-3 rounded-sm duration-300 ">
                <p className="text-[.9rem]">ورود بیمار</p>
                <BiArrowBack className="mt-[.1rem]" />
              </button>
              <div className="flex items-center justify-center gap-3 my-4">
                <p className="w-full h-[.1rem] bg-zinc-200"></p>
                <p>یا</p>
                <p className="w-full h-[.1rem] bg-zinc-200"></p>
              </div>
              <button className="w-full flex items-center justify-center gap-3 border-1 border-zinc-200 cursor-pointer py-2 hover:bg-zinc-200 mt-3 rounded-sm duration-300 ">
                <p className="text-[.9rem]">ورود با حساب گوگل</p>
                <img src="/images/Google.png" alt="" className="w-[1.8rem]" />
              </button>
            </div>
          </form>
        </div>
      </AnimatedContainer>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute bottom-0"
      >
        <path
          fill="#00a693"
          fillOpacity="1"
          d="M0,288L120,293.3C240,299,480,309,720,282.7C960,256,1200,192,1320,160L1440,128L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
        ></path>
      </svg>
    </>
  );
}
