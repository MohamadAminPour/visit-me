"use client";

import AnimatedContainer from "@/components/AnimatedContainer";
import { Toast } from "@/components/Toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL; // حواست باشه env باید با NEXT_PUBLIC شروع بشه

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!API) {
      console.error("API_URL is not defined!");
      Toast.fire({ icon: "error", title: "API تنظیم نشده است!" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/secrataryLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json().catch(() => null);

      if (res.status === 200) {
        Toast.fire({ icon: "success", title: "ورود موفقیت‌آمیز بود!" });
        localStorage.setItem("tokan", data?.token ?? "");
        router.push("/secratary/visits");
      } else if (res.status === 409) {
        Toast.fire({ icon: "error", title: "لطفا شماره تلفن معتبر وارد کنید!" });
      } else if (res.status === 404) {
        Toast.fire({ icon: "error", title: "همچین شماره‌ای وجود ندارد!" });
      } else {
        Toast.fire({ icon: "error", title: "خطای غیرمنتظره!" });
      }
    } catch (err) {
      console.error(err);
      Toast.fire({ icon: "error", title: "ارتباط با سرور برقرار نشد!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* موج بالا */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute top-0"
      >
        <path
          fill="#3490dc"
          d="M0,224L120,186.7C240,149,480,75,720,53.3C960,32,1200,64,1320,80L1440,96L1440,0L0,0Z"
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
            className="rounded-2xl py-8 px-5 sm:px-10 w-[90%] sm:w-[27rem] border border-zinc-200 shadow-xl shadow-zinc-200 z-20 bg-white"
          >
            <div className="text-center w-full">
              <h2 className="text-[1.5rem] sm:text-[2rem] Morabba">
                ورود به ویزیت می
              </h2>
              <p className="text-zinc-500 text-[.8rem] sm:text-[.9rem]">
                دکتر این مجموعه هستید؟
                <Link href="/drLogin" className="text-primary mr-1">
                  ورود
                </Link>
              </p>

              <div className="flex items-start flex-col mt-5">
                <label>شماره تلفن</label>
                <input
                  type="tel"
                  name="phone"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  style={{ direction: "rtl" }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                  placeholder="شماره تلفن خود را وارد کنید..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full cursor-pointer flex items-center justify-center gap-2 py-2 mt-5 rounded-sm duration-300 ${
                  loading
                    ? "bg-primaryLight text-gray-600 cursor-not-allowed"
                    : "hover:bg-primary hover:text-white bg-primaryLight"
                }`}
              >
                {loading ? "صبر کنید..." : "ورود منشی"}
              </button>

              <div className="flex items-center justify-center gap-3 my-4">
                <p className="w-full h-[.1rem] bg-zinc-200"></p>
                <p>یا</p>
                <p className="w-full h-[.1rem] bg-zinc-200"></p>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 border border-zinc-200 cursor-pointer py-2 hover:bg-zinc-200 mt-3 rounded-sm duration-300 "
              >
                <p className="text-[.8rem] sm:text-[.9rem]">ورود با حساب گوگل</p>
                <img
                  src="/images/Google.png"
                  alt="Google Login"
                  className="w-[1.3rem] sm:w-[1.8rem]"
                />
              </button>
            </div>
          </form>
        </div>
      </AnimatedContainer>

      {/* موج پایین */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute bottom-0"
      >
        <path
          fill="#3490dc"
          d="M0,288L120,293.3C240,299,480,309,720,282.7C960,256,1200,192,1320,160L1440,128L1440,320L0,320Z"
        ></path>
      </svg>
    </>
  );
}
