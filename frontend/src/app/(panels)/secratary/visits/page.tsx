"use client";
import React, { useEffect, useState } from "react";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import ReactDOMServer from "react-dom/server";
import { Check, Clock, X } from "lucide-react";


import { HiOutlineNewspaper } from "react-icons/hi";
import { LiaUserNurseSolid } from "react-icons/lia";
import { useQuery } from "@tanstack/react-query";
import { getSecrataries } from "@/hooks/useSecrataries";
import Loader from "@/components/Loader";
import { ISecratary } from "@/app/api/secrataries/route";
import { getVisits } from "@/hooks/useVisits";
import { IVisits } from "@/app/api/visits/route";

export default function page() {
  const { data, isPending } = useQuery({
    queryKey: ["visits"],
    queryFn: getVisits
  });

  const renderIcon = (Icon: any) =>
    ReactDOMServer.renderToString(<Icon size={18} />);

  function handleShowVisits(id: number) {
    alert(id);
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col bg-white py-6 px-5 gap-2 rounded-xl shadow-[0_11px_50px_1px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-1">
        <HiOutlineNewspaper className="size-7" />
        <p className="font-IranYekanBold text-[1rem]">نوبت های مجموعه</p>
      </div>

      <div className="text-right">
        <Grid
          data={data.map((a:IVisits) => [
            a.id,
            a.nameFamily,
            a.visit_number,
            a.doctor,
            a.phone,
            a.meli_code,
            a.created_at,
            a.id,
          ])}
          columns={[
            "ردیف",
            "نام و نام خانوادگی",
            "شماره نوبت",
            "نام دکتر",
            "کدملی",
            "شماره تلفن",
            "تاریخ نوبت",
            {
              name: "عملیات",
              formatter: (_, row) => {
                const id = row.cells[0].data as number; // ستون id برای عملیات
                return h("div", { className: "flex gap-2" }, [
                  h(
                    "button",
                    {
                      className:
                        "p-2 rounded cursor-pointer text-[.8rem] bg-primary/80 text-white hover:bg-primary",
                      //  onClick: () => handleUpdateArticle(id),
                      title: "فرستادن پیش دکتر",
                    },
                    h("span", {
                      dangerouslySetInnerHTML: {
                        __html: renderIcon(LiaUserNurseSolid),
                      },
                    })
                  ),
                  h(
                    "button",
                    {
                      className:
                        "p-2 rounded cursor-pointer text-[.8rem] bg-red-500 text-white hover:bg-red-600",
                      //  onClick: () => handleUpdateArticle(id),
                      title: "رد کردن",
                    },
                    h("span", {
                      dangerouslySetInnerHTML: {
                        __html: renderIcon(X),
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
