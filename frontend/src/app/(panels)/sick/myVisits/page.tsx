"use client";
import React, { useState } from "react";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import ReactDOMServer from "react-dom/server";
import { Plus, Trash2 } from "lucide-react";

const myVisits = [
  {
    id: 1,
    name: "",
    family: "",
    visit_number: "",
    visit_date: "",
    doctor: "",
    place_name: "",
    place_address: "",
  },
  {
    id: 2,
    name: "",
    family: "",
    visit_number: "",
    visit_date: "",
    doctor: "",
    place_name: "",
    place_address: "",
  },
];

import { HiOutlineNewspaper } from "react-icons/hi";
import Link from "next/link";
import AnimatedContainer from "@/components/AnimatedContainer";

export default function page() {
  const renderIcon = (Icon: any) =>
    ReactDOMServer.renderToString(<Icon size={18} />);

  function handleShowVisits(id: number) {
    alert(id);
  }

  return (
    <AnimatedContainer>
      <div className="w-full">
        <div className="flex flex-col bg-white py-6 px-10 gap-2 rounded-xl shadow-xl shadow-zinc-200/30 border-1 border-zinc-200 ">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <HiOutlineNewspaper className="size-7" />
              <p className="font-IranYekanBold text-[1rem]">نوبت های من</p>
            </div>

            <Link
              href="/sick/doctors"
              className="flex items-center justify-center gap-2 text-[.8rem] bg-primary cursor-pointer duration-300 p-2 px-4 rounded-lg text-white"
            >
              نوبت جدید
              <Plus className="size-[1rem]" />
            </Link>
          </div>

          <div className="text-right">
            <Grid
              data={myVisits.map((a) => [
                a.id,
                a.name,
                a.family,
                a.visit_number,
                a.visit_date,
                a.doctor,
                a.place_name,
                a.place_address,
                a.id,
              ])}
              columns={[
                "ردیف",
                "نام",
                "نام خانوادگی",
                "شماره نوبت",
                "تاریخ نوبت",
                "نام دکتر",
                "نام مطب",
                "آدرس مطب",
                {
                  name: "عملیات",
                  formatter: (_, row) => {
                    const id = row.cells[0].data as number; // ستون id برای عملیات
                    return h("div", { className: "flex gap-2" }, [
                      h(
                        "button",
                        {
                          className:
                            "p-2 flex items-center gap-2 rounded cursor-pointer text-[.8rem] bg-red-500 text-white hover:bg-red-600",
                          //  onClick: () => handleDeleteArticle(id),
                          title: "لغو",
                        },
                        h("span", {
                          dangerouslySetInnerHTML: {
                            __html: "لغو",
                          },
                        }),
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
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
}
