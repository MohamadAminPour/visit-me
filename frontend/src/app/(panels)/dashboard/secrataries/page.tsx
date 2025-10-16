"use client";
import React, { useEffect, useState } from "react";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import ReactDOMServer from "react-dom/server";
import { Trash2, Eye, Plus, X } from "lucide-react";
import { TbEditCircle, TbNurse } from "react-icons/tb";

const secrataryList = [
  {
    id: 1,
    name: "زهرا",
    family: "حبیبی",
    phone: "0916754343",
    email: "zhababi@gmail.com",
  },
];

import { HiOutlineNewspaper, HiOutlineShieldCheck } from "react-icons/hi";

export default function page() {
  const [secratary, setSecratary] = useState(false);

  const renderIcon = (Icon: any) =>
    ReactDOMServer.renderToString(<Icon size={18} />);

  function handleShowVisits(id: number) {
    alert(id);
  }

  return (
    <div className="flex flex-col bg-white py-6 px-10 gap-2 rounded-xl shadow-[0_11px_50px_1px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <TbNurse className="size-7" />
          <p className="font-IranYekanBold text-[1rem]">منشی های مجموعه</p>
        </div>
        {/*buttons*/}
        {secratary ? (
          <button
            onClick={() => {
              setSecratary(!secratary);
            }}
            className="flex items-center justify-center gap-2 text-[.8rem] bg-red-600 cursor-pointer duration-300 hover:bg-red-500 p-2 px-5 rounded-lg text-white"
          >
            بستن
            <X className="size-[1rem]" />
          </button>
        ) : (
          <button
            onClick={() => {
              setSecratary(!secratary);
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
        {secratary ? (
          <form>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
              <div className="flex items-start flex-col mt-5">
                <label htmlFor="">نام</label>
                <input
                  type="text"
                  className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                  placeholder="نام خود را وارد کنید..."
                />
              </div>
              <div className="flex items-start flex-col mt-5">
                <label htmlFor="">نام خانوادگی</label>
                <input
                  type="text"
                  className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                  placeholder="نام خانوادگی خود را وارد کنید..."
                />
              </div>
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
            </div>
            <div className="flex items-center gap-1">
              <button className="flex items-center justify-center gap-2 bg-primary/80 cursor-pointer duration-300 hover:bg-primary p-2 px-5 rounded-lg text-white text-[.9rem] mt-5 ">
                ایجاد
              </button>
            </div>
          </form>
        ) : (
          <Grid
            data={secrataryList?.map((s) => [
              s.name,
              s.family,
              s.phone,
              s.email,
              s.id,
            ])}
            columns={[
              "نام",
              "نام خانوادگی",
              "شماره تلفن",
              "ایمیل",
              {
                name: "عملیات",
                formatter: (_, row) => {
                  const id = row.cells[0].data as number; // ستون id برای عملیات
                  return h("div", { className: "flex gap-2" }, [
                    h(
                      "button",
                      {
                        className:
                          "p-2 rounded cursor-pointer text-[.8rem] bg-yellow-500 text-white hover:bg-yellow-600",
                        //  onClick: () => handleUpdateArticle(id),
                        title: "ویرایش",
                      },
                      h("span", {
                        dangerouslySetInnerHTML: {
                          __html: renderIcon(TbEditCircle),
                        },
                      })
                    ),
                    h(
                      "button",
                      {
                        className:
                          "p-2 rounded cursor-pointer text-[.8rem] bg-red-500 text-white hover:bg-red-600",
                        //  onClick: () => handleDeleteArticle(id),
                        title: "حذف",
                      },
                      h("span", {
                        dangerouslySetInnerHTML: {
                          __html: renderIcon(Trash2),
                        },
                      })
                    ),
                    h(
                      "button",
                      {
                        className:
                          "p-2 rounded cursor-pointer text-[.8rem] bg-blue-500 text-white hover:bg-blue-600",
                        onClick: () => handleShowVisits(id),
                        title: "ویزیت ها",
                      },
                      h("span", {
                        dangerouslySetInnerHTML: {
                          __html: renderIcon(HiOutlineNewspaper),
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
