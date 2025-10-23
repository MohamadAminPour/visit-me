"use client";

import AnimatedContainer from "@/components/AnimatedContainer";
import Loader from "@/components/Loader";
import { getMyProfile } from "@/hooks/useMyProfile";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { LiaUserSolid } from "react-icons/lia";

export default function Page() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("tokan"); // ✅ اصلاح شد (tokan ❌)
    setToken(t);
  }, []);

  const { data, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getMyProfile(token as string),
    enabled: !!token,
  });

  const [formData, setFormData] = useState({
    nameFamily: "",
    phone: "",
    meli_code: "",
    image: "",
  });

  // ✅ وقتی data لود شد، state رو با اون مقداردهی کن
  useEffect(() => {
    if (data?.user) {
      setFormData({
        nameFamily: data.user.nameFamily || "",
        phone: data.user.phone || "",
        meli_code: data.user.meli_code || "",
        image: data.user.image || "",
      });
    }
  }, [data]);

  function submitHandle(e: any) {
    e.preventDefault();
    console.log("📤 فرم ارسال شد:", formData);
  }

  if (isPending) return <Loader />;

  return (
    <AnimatedContainer>
      <div className="w-full flex flex-col bg-white py-6 px-5 gap-2 rounded-xl shadow-xl shadow-zinc-200/30 border border-zinc-200">
        <div className="flex items-center gap-1">
          <LiaUserSolid className="size-7" />
          <p className="font-IranYekanBold text-[1rem]">اطلاعات فردی</p>
        </div>

        <form onSubmit={submitHandle}>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
            {/* نام و نام خانوادگی */}
            <div className="flex items-start flex-col mt-5">
              <label>نام و نام خانوادگی</label>
              <input
                type="text"
                name="nameFamily"
                value={formData.nameFamily}
                onChange={(e) =>
                  setFormData({ ...formData, nameFamily: e.target.value })
                }
                className="border w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem] text-[.9rem]"
                placeholder="نام و نام خانوادگی خود را وارد کنید..."
              />
            </div>

            {/* شماره تلفن */}
            <div className="flex items-start flex-col mt-5">
              <label>شماره تلفن</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                inputMode="numeric"
                pattern="[0-9]*"
                style={{ direction: "rtl" }}
                className="border w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem] text-[.9rem]"
                placeholder="شماره تلفن خود را وارد کنید..."
              />
            </div>

            {/* کدملی */}
            <div className="flex items-start flex-col mt-5">
              <label>کدملی</label>
              <input
                type="tel"
                name="meli_code"
                value={formData.meli_code}
                onChange={(e) =>
                  setFormData({ ...formData, meli_code: e.target.value })
                }
                inputMode="numeric"
                pattern="[0-9]*"
                style={{ direction: "rtl" }}
                className="border w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem] text-[.9rem]"
                placeholder="کدملی خود را وارد کنید..."
              />
            </div>

            {/* عکس پروفایل */}
            <div className="flex items-start flex-col mt-5">
              <label>عکس پروفایل</label>
              <input
                type="file"
                name="image"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.files?.[0]?.name || "",
                  })
                }
                className="border w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem] text-[.9rem]"
              />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-primary/80 cursor-pointer duration-300 hover:bg-primary p-2 px-5 rounded-lg text-white text-[.9rem] mt-5"
            >
              ویرایش
            </button>
          </div>
        </form>
      </div>
    </AnimatedContainer>
  );
}
