"use client";

import adminLoginAction, { LoginState } from "@/actions/adminLoginAction";
import AnimatedContainer from "@/components/AnimatedContainer";
import { Toast } from "@/components/Toast";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";

export default function Page() {
  const router = useRouter();
  const [state, formAction] = useActionState<LoginState, FormData>(
    adminLoginAction,
    { status: 0, token: "" }
  );

  useEffect(() => {
    if (state?.status === 200) {
      Toast.fire({
        icon: "success",
        title: "ورود موفقیت آمیز بود !",
      });
      router.push("/dashboard");
      localStorage.setItem("tokan", state?.token ?? "");
    }
    if (state?.status === 409) {
      Toast.fire({
        icon: "error",
        title: "لطفا یک شماره تلفن صحیح وارد کنید !",
      });
    }
    if (state?.status === 404) {
      Toast.fire({
        icon: "error",
        title: "همچین شماره تلفنی ورود ندارد !",
      });
    }
  }, [state]);
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute top-0"
      >
        <path
          fill="#adb5bd"
          fillOpacity="1"
          d="M0,224L120,186.7C240,149,480,75,720,53.3C960,32,1200,64,1320,80L1440,96L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
        ></path>
      </svg>
      <AnimatedContainer>
        <div className="h-screen flex items-center justify-center flex-col w-full">
          <form
            action={formAction}
            className="rounded-2xl py-8 px-5 sm:px-10 w-[90%] sm:w-[27rem] border-1 border-zinc-200 shadow-xl shadow-zinc-200 z-20 bg-white"
          >
            <div className="text-center w-full">
              <h2 className="text-[1.5rem] sm:text-[2rem] Morabba">
                ورود به ویزیت می
              </h2>
              <div className="flex items-start flex-col mt-5">
                <label htmlFor="">شماره تلفن</label>
                <input
                  type="tel"
                  name="phone"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  style={{ direction: "rtl" }}
                  className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.7rem] sm:placeholder:text-[.8rem]"
                  placeholder="شماره تلفن خود را وارد کنید..."
                />
              </div>
              <div className="flex items-start flex-col mt-5">
                <label htmlFor="">گذرواژه</label>
                <input
                  type="password"
                  name="password"
                  style={{ direction: "rtl" }}
                  className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.7rem] sm:placeholder:text-[.8rem]"
                  placeholder="شماره تلفن خود را وارد کنید..."
                />
              </div>
              <Button />
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
          fill="#adb5bd"
          fillOpacity="1"
          d="M0,288L120,293.3C240,299,480,309,720,282.7C960,256,1200,192,1320,160L1440,128L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
        ></path>
      </svg>
    </>
  );
}

export function Button() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <button
          disabled
          className="w-full flex items-center justify-center gap-2 hover:bg-[#6c757d] hover:text-white bg-[#adb5bd] cursor-pointer py-2 mt-3 rounded-sm duration-300 "
        >
          <p className="text-[.8rem] sm:text-[.9rem]">صبر کنید...</p>
        </button>
      ) : (
        <button className="w-full flex items-center justify-center gap-2 hover:bg-[#6c757d] hover:text-white bg-[#adb5bd] cursor-pointer py-2 mt-3 rounded-sm duration-300 ">
          <p className="text-[.8rem] sm:text-[.9rem]">ورود ادمین</p>
        </button>
      )}
    </>
  );
}
