"use client";
import React, { useEffect, useState } from "react";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import ReactDOMServer from "react-dom/server";
import { Check, Eye, X } from "lucide-react";

const visitHistory = [
  {
    id: 1,
    nameFamily: "علی کریمانی",
    visit_number: "40901010",
    doctor: "1",
    reason: "ویزیت شده",
    status: "1",
    create_at: "1404/07/23",
  },
  {
    id: 2,
    nameFamily: "زهرا رضوی",
    visit_number: "40901011",
    doctor: "2",
    reason: "ویزیت شده",
    status: "1",
    create_at: "1404/07/24",
  },
  {
    id: 3,
    nameFamily: "بهرام نعیمی",
    visit_number: "40901012",
    doctor: "2",
    reason: "حضور نداشتند",
    status: "0",
    create_at: "1404/06/24",
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
    <div className="flex flex-col bg-white py-6 px-5 gap-2 rounded-xl shadow-[0_11px_50px_1px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-1">
        <HiOutlineNewspaper className="size-7" />
        <p className="font-IranYekanBold text-[1rem]">
          تاریخچه نوبت های مجموعه
        </p>
      </div>

      <div className="text-right">
        <Grid
          data={visitHistory.map((a) => [
            a.nameFamily,
            a.visit_number,
            a.doctor,
            a.status,
            new Intl.DateTimeFormat("fa-IR").format(new Date(a.create_at)),
            a.id,
          ])}
          columns={[
            "نام و نام خانوادگی",
            "شماره نوبت",
            "نام دکتر",
            "وضعیت",
            "تاریخ نوبت",
            {
              name: "عملیات",
              formatter: (_, row) => {
                const id = row.cells[5].data as number; // ستون id برای عملیات
                return h("div", { className: "flex gap-2" }, [
                  h(
                    "button",
                    {
                      className:
                        "p-2 rounded cursor-pointer text-[.8rem] bg-primary/80 text-white hover:bg-primary",
                      //    onClick: () => handleUpdateArticle(id),
                      onClick: () => alert(visitHistory[id - 1].reason),
                      title: "نمایش وضعیت",
                    },
                    h("span", {
                      dangerouslySetInnerHTML: {
                        __html: renderIcon(Eye),
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
