"use client";
import React, { useEffect, useState } from "react";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import ReactDOMServer from "react-dom/server";
import { Check } from "lucide-react";

const doctors = [
  {
    id: 1,
    nameFamily: "",
    phone: "",
    meli_code: "",
    visit_number: "",
    doctor: "",
  },
  {
    id: 2,
    nameFamily: "",
    phone: "",
    meli_code: "",
    visit_number: "",
    doctor: "",
  },
];

import { HiOutlineNewspaper } from "react-icons/hi";

export default function page() {
  const renderIcon = (Icon: any) =>
    ReactDOMServer.renderToString(<Icon size={18} />);

  function handleShowVisits(id: number) {
    alert(id);
  }

  return (
    <div className="flex flex-col bg-white py-6 px-10 gap-2 rounded-xl shadow-[0_11px_50px_1px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-1">
        <HiOutlineNewspaper className="size-7" />
        <p className="font-IranYekanBold text-[1rem]">نوبت های مجموعه</p>
      </div>

      <div className="text-right">
        <Grid
          data={doctors.map((a) => [
            a.id,
            a.nameFamily,
            a.visit_number,
            a.doctor,
            a.phone,
            a.meli_code,
            a.id,
          ])}
          columns={[
            "ردیف",
            "نام و نام خانوادگی",
            "شماره نوبت",
            "نام دکتر",
            "کدملی",
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
                        "p-2 rounded cursor-pointer text-[.8rem] bg-green-500 text-white hover:bg-green-600",
                      //  onClick: () => handleUpdateArticle(id),
                      title: "ویرایش",
                    },
                    h("span", {
                      dangerouslySetInnerHTML: {
                        __html: renderIcon(Check),
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
  );
}
