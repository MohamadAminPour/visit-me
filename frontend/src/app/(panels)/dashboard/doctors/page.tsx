"use client";
import React, { useEffect, useState } from "react";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import ReactDOMServer from "react-dom/server";
import { Trash2, Eye } from "lucide-react";
import { TbEditCircle } from "react-icons/tb";

const doctors = [
  {
    id: 1,
    name: "",
    family: "",
    phone: "",
    meli_code: "",
    gender: "",
    expertise: "",
    place_name: "",
    place_address: "",
  },
  {
    id: 2,
    name: "",
    family: "",
    phone: "",
    meli_code: "",
    gender: "",
    expertise: "",
    place_name: "",
    place_address: "",
  },
];

import { LiaUserNurseSolid } from "react-icons/lia";
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
        <LiaUserNurseSolid className="size-7" />
        <p className="font-IranYekanBold text-[1rem]">لیست دکتر های مجموعه</p>
      </div>

      <div className="text-right">
        <Grid
          data={doctors.map((a) => [
            a.name,
            a.family,
            a.phone,
            a.meli_code,
            a.gender,
            a.expertise,
            a.place_name,
            a.place_address,
            a.id,
          ])}
          columns={[
            "نام",
            "نام خانوادگی",
            "شماره تلفن",
            "کدملی",
            "جنسیت",
            "تخصص",
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
      </div>
    </div>
  );
}
