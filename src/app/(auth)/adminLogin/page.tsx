"use client";

import React, { useState } from "react";
import AnimatedContainer from "@/components/AnimatedContainer";
import { Toast } from "@/components/Toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const API = process.env.NEXT_PUBLIC_API_URL;
      if (!API) throw new Error("API URL not found");

      const res = await fetch(`${API}/adminLogin`, {
        cache: "no-store",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json().catch(() => null); // جلوگیری از خطای JSON parse

      if (res.status === 200) {
        Toast.fire({ icon: "success", title: "ورود موفقیت‌آمیز بود!" });
        localStorage.setItem("tokan", data?.token || "");
        router.push("/dashboard");
      } else if (res.status === 404) {
        Toast.fire({ icon: "error", title: "همچین کاربری وجود ندارد!" });
      } else if (res.status === 409) {
        Toast.fire({ icon: "error", title: "شماره یا رمز اشتباه است!" });
      } else {
        Toast.fire({ icon: "error", title: "مشکلی در ورود پیش آمد!" });
      }
    } catch (err) {
      Toast.fire({ icon: "error", title: "خطا در ارتباط با سرور!" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* موج بالا */}
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
            onSubmit={handleSubmit}
            className="rounded-2xl py-8 px-5 sm:px-10 w-[90%] sm:w-[27rem] border border-zinc-200 shadow-xl shadow-zinc-200 z-20 bg-white"
          >
            <div className="text-center w-full">
              <h2 className="text-[1.5rem] sm:text-[2rem] Morabba">
                ورود به ویزیت می
              </h2>

              <div className="flex items-start flex-col mt-5">
                <label>شماره تلفن</label>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  inputMode="numeric"
                  style={{ direction: "rtl" }}
                  className="border w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                  placeholder="شماره تلفن خود را وارد کنید..."
                />
              </div>

              <div className="flex items-start flex-col mt-5">
                <label>گذرواژه</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ direction: "rtl" }}
                  className="border w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                  placeholder="گذرواژه خود را وارد کنید..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full cursor-pointer flex items-center justify-center gap-2 mt-5 py-2 rounded-sm duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-[#adb5bd] hover:bg-[#6c757d] hover:text-white"
                }`}
              >
                {loading ? "در حال ورود..." : "ورود ادمین"}
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
          fill="#adb5bd"
          fillOpacity="1"
          d="M0,288L120,293.3C240,299,480,309,720,282.7C960,256,1200,192,1320,160L1440,128L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
        ></path>
      </svg>
    </>
  );
}
