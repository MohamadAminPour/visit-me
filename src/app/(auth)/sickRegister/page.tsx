"use client";

import { Toast } from "@/components/Toast";
import AnimatedContainer from "@/components/AnimatedContainer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!API) {
      Toast.fire({
        icon: "error",
        title: "آدرس سرور تنظیم نشده است!",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API}/sickRegister`, {
        cache: "no-store",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (res.status === 201) {
        Toast.fire({
          icon: "success",
          title: "ثبت نام موفقیت‌آمیز بود!",
        });
        localStorage.setItem("tokan", data.token ?? "");
        router.push("/sick/profile");
      } else if (res.status === 404) {
        Toast.fire({
          icon: "error",
          title: "لطفا شماره تلفن صحیح وارد کنید!",
        });
      } else if (res.status === 409) {
        Toast.fire({
          icon: "error",
          title: "این شماره قبلاً ثبت شده است!",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "خطایی رخ داده است!",
        });
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "ارتباط با سرور برقرار نشد!",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* SVG بالایی */}
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
        <div className="h-screen flex items-center justify-center flex-col w-full">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl py-8 px-5 sm:px-10 w-[90%] sm:w-[27rem] border-1 border-zinc-200 shadow-xl shadow-zinc-200 z-20 bg-white"
          >
            <div className="text-center w-full">
              <h2 className="text-[1.5rem] sm:text-[2rem] Morabba">عضویت در ویزیت می</h2>
              <p className="text-zinc-500 text-[.8rem] sm:text-[.9rem]">
                قبلاً ثبت‌نام کرده‌اید؟
                <Link href="/sickLogin" className="text-secondry mr-1">
                  ورود
                </Link>
              </p>

              <div className="flex items-start flex-col mt-5">
                <label htmlFor="phone" className="text-[.8rem] sm:text-[.9rem]">
                  شماره تلفن
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  style={{ direction: "rtl" }}
                  className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.7rem] sm:placeholder:text-[.8rem]"
                  placeholder="شماره تلفن خود را وارد کنید..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full cursor-pointer flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-zinc-400 cursor-not-allowed"
                    : "hover:bg-secondry hover:text-white bg-secondryLight"
                } py-2 mt-3 rounded-sm duration-300`}
              >
                <p className="text-[.8rem] sm:text-[.9rem]">
                  {loading ? "صبر کنید..." : "ثبت نام بیمار"}
                </p>
              </button>

              <div className="flex items-center justify-center gap-3 my-4">
                <p className="w-full h-[.1rem] bg-zinc-200"></p>
                <p>یا</p>
                <p className="w-full h-[.1rem] bg-zinc-200"></p>
              </div>

              <button className="w-full flex items-center justify-center gap-3 border-1 border-zinc-200 cursor-pointer py-2 hover:bg-zinc-200 mt-3 rounded-sm duration-300 ">
                <p className="text-[.8rem] sm:text-[.9rem]">عضویت با حساب گوگل</p>
                <img src="/images/Google.png" alt="" className="w-[1.3rem] sm:w-[1.8rem]" />
              </button>
            </div>
          </form>
        </div>
      </AnimatedContainer>

      {/* SVG پایینی */}
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
