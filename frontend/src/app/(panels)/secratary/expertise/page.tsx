"use client";
import React, { useEffect, useState } from "react";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import ReactDOMServer from "react-dom/server";
import { Trash2, Eye, Plus, X } from "lucide-react";
import { TbEditCircle } from "react-icons/tb";

const expertise = [
  {
    id: 1,
    title: "پوست و مو",
  },
  {
    id: 2,
    title: "چشم پزشک",
  },
  {
    id: 3,
    title: "قلب و عروق",
  },
];

import { LiaUserNurseSolid } from "react-icons/lia";
import { ImLab } from "react-icons/im";

export default function page() {
  const [addExpertise, setAddExpertise] = useState(false);

  const renderIcon = (Icon: any) =>
    ReactDOMServer.renderToString(<Icon size={18} />);

  function handleShowVisits(id: number) {
    alert(id);
  }

  return (
    <div className="flex flex-col bg-white py-6 px-5 gap-2 rounded-xl shadow-[0_11px_50px_1px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ImLab  className="size-5" />
          <p className="font-IranYekanBold text-[1rem]">تخصص های دکتر</p>
        </div>
        {/*buttons*/}
        {addExpertise ? (
          <button
            onClick={() => {
              setAddExpertise(!addExpertise);
            }}
            className="flex items-center justify-center gap-2 text-[.8rem] bg-red-600 cursor-pointer duration-300 hover:bg-red-500 p-2 px-5 rounded-lg text-white"
          >
            بستن
            <X className="size-[1rem]" />
          </button>
        ) : (
          <button
            onClick={() => {
              setAddExpertise(!addExpertise);
            }}
            className="flex items-center justify-center gap-2 text-[.8rem] bg-primary/80 cursor-pointer duration-300 hover:bg-primary p-2 px-4 rounded-lg text-white"
          >
            تخصص جدید
            <Plus className="size-[1rem]" />
          </button>
        )}
      </div>

      <div className="text-right">
        {addExpertise ? (
          <form>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
              <div className="flex items-start flex-col mt-5">
                <label htmlFor="">نام تخصص</label>
                <input
                  type="text"
                  className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                  placeholder="نام تخصص را وارد کنید..."
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
            data={expertise.map((a) => [
              a.id,
              a.title,
              a.id,
            ])}
            columns={[
              "ردیف",
              "نام تخصص",
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
                        //  onClick: () => handleDeleteArticle(id),
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
