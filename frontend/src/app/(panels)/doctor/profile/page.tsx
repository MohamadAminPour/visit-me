"use client";

import { getMyProfile } from "@/hooks/useMyProfile";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AnimatedContainer from "@/components/AnimatedContainer";
import Loader from "@/components/Loader";
import { LiaUserSolid } from "react-icons/lia";
import { Toast } from "@/components/Toast";

export default function Page() {
  const [token, setToken] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const t = localStorage.getItem("tokan"); 
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
  });

  useEffect(() => {
    if (data?.user) {
      setFormData({
        nameFamily: data?.user?.nameFamily || "",
        phone: data?.user?.phone || "",
        meli_code: data?.user?.meli_code || "",
      });
    }
    console.log(data)
  }, [data]);

  console.log(data)

  async function handleCompleteProfile(e: any) {
    e.preventDefault();

    if (!formData.nameFamily || !formData.meli_code) {
     Toast.fire({
        icon: "error",
        title: "لطفا نام و کد ملی را وارد کنید",
      });
      return;
    }

    const res = await fetch("http://localhost:3000/api/me", {
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
    console.log(res)

    if (res.ok) {
      Toast.fire({
        icon: "success",
        title: `پروفایل با موفقیت ویرایش شد !`,
      });

      // ✅ آپدیت بدون رفرش
      queryClient.setQueryData(["profile"], (old: any) => ({
        ...old,
        user: {
          ...old.user,
          nameFamily: formData.nameFamily,
          meli_code: formData.meli_code,
          complete_profile: true,
        },
      }));
    } else {
        Toast.fire({
        icon: "error",
        title: "لطفا نام و کد ملی را وارد کنید",
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
                style={{direction:"rtl"}}
                className="border w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.9rem] "
                placeholder="کد ملی خود را وارد کنید..." 
              />
            </div>
          </div>

          <div className="flex items-center gap-1">
              <button
                type="submit"
                className="bg-yellow-500/80 cursor-pointer hover:bg-yellow-500 p-2 duration-300 px-5 rounded-lg text-white text-[.9rem] mt-5"
              >
                ویرایش
              </button>
          </div>
        </form>
      </div>
    </AnimatedContainer>
  );
}
