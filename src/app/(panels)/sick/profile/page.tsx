"use client";

import { getMyProfile } from "@/hooks/useMyProfile";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AnimatedContainer from "@/components/AnimatedContainer";
import Loader from "@/components/Loader";
import { LiaUserSolid } from "react-icons/lia";
import { Toast } from "@/components/Toast";

interface IUser {
  nameFamily: string;
  phone: string;
  meli_code: string;
  complete_profile: boolean;
}

interface IProfile {
  user: IUser;
}

interface IFormData {
  nameFamily: string;
  phone: string;
  meli_code: string;
}

export default function Page() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [token, setToken] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // ✅ گرفتن توکن از localStorage فقط یک بار
  useEffect(() => {
    const t = localStorage.getItem("tokan");
    if (t) setToken(t);
  }, []);

  // ✅ واکشی پروفایل فقط وقتی توکن آماده است
  const { data, isPending, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getMyProfile(token as string),
    enabled: !!token, // اجرا فقط وقتی توکن موجود است
  });

  // ✅ اگر توکن بعد از mount آماده شد، مجدداً refetch کن
  useEffect(() => {
    if (token) refetch();
  }, [token, refetch]);

  const [formData, setFormData] = useState<IFormData>({
    nameFamily: "",
    phone: "",
    meli_code: "",
  });

  // ✅ ست کردن اطلاعات وقتی پروفایل آماده شد
  useEffect(() => {
    if (data?.user) {
      setFormData({
        nameFamily: data.user.nameFamily || "",
        phone: data.user.phone || "",
        meli_code: data.user.meli_code || "",
      });
    }
  }, [data]);

  async function handleCompleteProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.nameFamily || !formData.meli_code) {
      Toast.fire({
        icon: "error",
        title: "لطفا نام و کد ملی را وارد کنید",
      });
      return;
    }

    const res = await fetch(`${API}/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nameFamily: formData.nameFamily,
        meli_code: formData.meli_code,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      Toast.fire({
        icon: "success",
        title: `پروفایل با موفقیت ${
          data?.user.complete_profile ? "ویرایش" : "تکمیل"
        } شد`,
      });

      queryClient.setQueryData<IProfile>(["profile"], (old) => {
        if (!old) return 
        return {
          ...old,
          user: {
            ...old.user,
            nameFamily: formData.nameFamily,
            meli_code: formData.meli_code,
            complete_profile: true,
          },
        };
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "خطا در بروزرسانی اطلاعات",
      });
    }
  }

  if (isPending) return <Loader />;

  return (
    <AnimatedContainer>
      <div className="w-full flex flex-col bg-white py-6 px-5 gap-2 rounded-xl shadow-xl border border-zinc-200">
        <div className="flex items-center gap-1">
          <LiaUserSolid className="size-7" />
          <p className="font-IranYekanBold text-[1rem]">اطلاعات فردی</p>
        </div>

        <form onSubmit={handleCompleteProfile}>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
            <div className="flex flex-col mt-5">
              <label>نام و نام خانوادگی</label>
              <input
                type="text"
                value={formData.nameFamily}
                onChange={(e) =>
                  setFormData({ ...formData, nameFamily: e.target.value })
                }
                className="border w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.9rem] "
                placeholder="نام و نام خانوادگی خود را وارد کنید..."
              />
            </div>

            <div className="flex flex-col mt-5">
              <label>شماره تلفن</label>
              <input
                type="tel"
                value={formData.phone}
                disabled
                className="border w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm bg-zinc-100"
              />
            </div>

            <div className="flex flex-col mt-5">
              <label>کدملی</label>
              <input
                type="tel"
                value={formData.meli_code}
                onChange={(e) =>
                  setFormData({ ...formData, meli_code: e.target.value })
                }
                style={{ direction: "rtl" }}
                className="border w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.9rem] "
                placeholder="کد ملی خود را وارد کنید..."
              />
            </div>
          </div>

          <div className="flex items-center gap-1">
            {data?.user?.complete_profile ? (
              <button
                type="submit"
                className="bg-yellow-500/80 cursor-pointer hover:bg-yellow-500 p-2 duration-300 px-5 rounded-lg text-white text-[.9rem] mt-5"
              >
                ویرایش
              </button>
            ) : (
              <button
                type="submit"
                className="hover:bg-primary cursor-pointer duration-300 bg-primary/80 p-2 px-5 rounded-lg text-white text-[.9rem] mt-5"
              >
                تکمیل پروفایل
              </button>
            )}
          </div>
        </form>
      </div>
    </AnimatedContainer>
  );
}
