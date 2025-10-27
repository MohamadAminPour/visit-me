"use client";
import React, { useState } from "react";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import ReactDOMServer from "react-dom/server";
import { Trash2, Plus, X } from "lucide-react";
import { TbEditCircle, TbNurse } from "react-icons/tb";
import Loader from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";
import { getSecrataries } from "@/hooks/useSecrataries";
import { ISecratary } from "@/app/api/secrataries/route";
import { Toast } from "@/components/Toast";
import { queryClient } from "@/lib/queryClient";

export default function page() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [addSecratary, setAddSecratary] = useState(false);
  const [secratary, setSecratary] = useState({ nameFamily: "", phone: "" });

  const { data, isPending } = useQuery({
    queryKey: ["secratary"],
    queryFn: getSecrataries,
  });

  async function handleAddSecratary(e: any) {
    e.preventDefault();
    const res = await fetch(`${API}/secrataries`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        nameFamily: secratary.nameFamily,
        phone: secratary.phone,
      }),
    });
    console.log(res);
    if (secratary.nameFamily && secratary.phone) {
      if (res.status === 200) {
        setAddSecratary(false);
        setSecratary({ nameFamily: "", phone: "" });
        Toast.fire({
          icon: "success",
          title: "منشی با موفقیت ایجاد شد",
        });
        await queryClient.invalidateQueries({ queryKey: ["secratary"] });
      }
      if (res.status === 409) {
        Toast.fire({
          icon: "error",
          title: "منشی ای با این تلفن وجود دارد",
        });
      }
    } else {
      Toast.fire({
        icon: "error",
        title: "لطفا فیلد ها را پر کنید",
      });
    }
  }
  const renderIcon = (Icon: any) =>
    ReactDOMServer.renderToString(<Icon size={18} />);

  async function handleDeleteSecratary(id: number) {
    await fetch(`${API}/secrataries`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ id }),
    });

    Toast.fire({
      icon: "success",
      title: "منشی با موفقیت حذف شد",
    });
    await queryClient.invalidateQueries({ queryKey: ["secratary"] });
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col bg-white py-6 px-5 gap-2 rounded-xl shadow-[0_11px_50px_1px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <TbNurse className="size-7" />
          <p className="font-IranYekanBold text-[1rem]">منشی های مجموعه</p>
        </div>
        {/*buttons*/}
        {addSecratary ? (
          <button
            onClick={() => {
              setAddSecratary(!addSecratary);
              setSecratary({ nameFamily: "", phone: "" });
            }}
            className="flex items-center justify-center gap-2 text-[.8rem] bg-red-600 cursor-pointer duration-300 hover:bg-red-500 p-2 px-5 rounded-lg text-white"
          >
            بستن
            <X className="size-[1rem]" />
          </button>
        ) : (
          <button
            onClick={() => {
              setAddSecratary(!addSecratary);
            }}
            className="flex items-center justify-center gap-2 text-[.8rem] bg-primary/80 cursor-pointer duration-300 hover:bg-primary p-2 px-4 rounded-lg text-white"
          >
            منشی جدید
            <Plus className="size-[1rem]" />
          </button>
        )}
      </div>

      <div className="text-right">
        {/*form*/}
        {addSecratary ? (
          <form onSubmit={handleAddSecratary}>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
              <div className="flex items-start flex-col mt-5">
                <label htmlFor="">نام و نام خانوادگی</label>
                <input
                  type="text"
                  name="nameFamily"
                  value={secratary.nameFamily}
                  onChange={(e) =>
                    setSecratary({
                      ...secratary,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                  placeholder="نام خانوادگی خود را وارد کنید..."
                />
              </div>
              <div className="flex items-start flex-col mt-5">
                <label htmlFor="">شماره تلفن</label>
                <input
                  type="tel"
                  name="phone"
                  value={secratary.phone}
                  onChange={(e) =>
                    setSecratary({
                      ...secratary,
                      [e.target.name]: e.target.value,
                    })
                  }
                  inputMode="numeric"
                  pattern="[0-9]*"
                  style={{ direction: "rtl" }}
                  className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                  placeholder="شماره تلفن خود را وارد کنید..."
                />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-primary/80 cursor-pointer duration-300 hover:bg-primary p-2 px-5 rounded-lg text-white text-[.9rem] mt-5 "
              >
                ایجاد
              </button>
            </div>
          </form>
        ) : (
          <Grid
            data={data?.map((s: ISecratary) => [
              s.id,
              s.nameFamily,
              s.phone,
              s.id,
            ])}
            columns={[
              "ردیف",
              "نام و نام خانوادگی",
              "شماره تلفن",
              {
                name: "عملیات",
                formatter: (_, row) => {
                  const id = row.cells[0].data as number; // ستون id برای عملیات
                  return h("div", { className: "flex gap-2" }, [
                    h(
                      "button",
                      {
                        className:
                          "p-2 rounded cursor-pointer text-[.8rem] bg-red-500 text-white hover:bg-red-600",
                        onClick: () => handleDeleteSecratary(id),
                        title: "حذف",
                      },
                      h("span", {
                        dangerouslySetInnerHTML: {
                          __html: renderIcon(Trash2),
                        },
                      })
                    ),
                  ]);
                },
              },
            ]}
            search={true}
            pagination={{ limit: 5 }}
            sort={true}
            language={{
              search: {
                placeholder: "جستجو...",
              },
              pagination: {
                previous: "قبلی",
                to: "تا",
                of: "از",
                next: "بعدی",
                showing: "نمایش",
                results: () => "رکورد",
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
