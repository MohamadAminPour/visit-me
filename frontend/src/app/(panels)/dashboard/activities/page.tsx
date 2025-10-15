"use client";
import React from "react";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import ReactDOMServer from "react-dom/server";
import { Trash2 } from "lucide-react";
import { TbEditCircle } from "react-icons/tb";

const activities = [
  {
    id: 1,
    doer: "علی حسینی",
    activity: "کاربری را بن کرد",
    who: "سهیل توکلی",
  },
  {
    id: 2,
    doer: "محسن محمدی",
    activity: "بیمار جدید عضو شد    ",
    who: "",
  },
];

import { HiOutlineNewspaper } from "react-icons/hi";
import { FaRegChartBar } from "react-icons/fa";

export default function page() {
  const renderIcon = (Icon: any) =>
    ReactDOMServer.renderToString(<Icon size={18} />);

  function handleShowVisits(id: number) {
    alert(id);
  }

  return (
    <div className="flex flex-col bg-white py-6 px-10 gap-2 rounded-xl shadow-[0_11px_50px_1px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FaRegChartBar className="size-7" />
          <p className="font-IranYekanBold text-[1rem]">فعالیت های مجموعه</p>
        </div>
      </div>

      <div className="text-right">
        <Grid
          data={activities.map((a) => [a.id, a.doer, a.activity, a.who, a.id])}
          columns={[
            "ردیف",
            "انجام دهنده",
            "فعالیت",
            "بر روی چه کسی",
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
