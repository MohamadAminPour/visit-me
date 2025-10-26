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
import { getSicks } from "@/hooks/useSicks";
import { getDoctors } from "@/hooks/useDoctors";
import { IDoctor } from "@/app/api/doctors/route";
import { ISick } from "@/app/api/sicks/route";

export default function page() {
  const { data: visitsData, isPending: visitsIsPending } = useQuery({
    queryKey: ["visits"],
    queryFn: getVisits,
  });

  //doctorData
  const { data: doctorsData, isPending: doctorsIsPending } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  //doctorData
  const { data: sicksData, isPending: sicksIsPending } = useQuery({
    queryKey: ["sicks"],
    queryFn: getSicks,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = visitsData?.filter((a: any) =>
    searchTerm.trim() === "" ? true : a.week?.startsWith(searchTerm)
  );

  const renderIcon = (Icon: any) =>
    ReactDOMServer.renderToString(<Icon size={18} />);

  function handleShowVisits(id: number) {
    alert(id);
  }
  
  console.log(visitsData)

  if (visitsIsPending || doctorsIsPending || sicksIsPending) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col bg-white py-6 px-5 gap-2 rounded-xl shadow-[0_11px_50px_1px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-1">
        <HiOutlineNewspaper className="size-7" />
        <p className="font-IranYekanBold text-[1rem]">نوبت های مجموعه</p>
      </div>

      <div className="text-right">
        <div className="mt-7">
          <input
            type="text"
            placeholder="جستجو..."
            className="border-1 border-zinc-200 px-3 py-2 outline-0 rounded-md mb-4 w-[15rem] placeholder:text-[.9rem]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Grid
            data={filteredData.map((a: IVisits) => [
              a.user_id,
              a.doctor_id,
              a.week,
              a.time,
              new Intl.DateTimeFormat("fa-IR").format(new Date(a.created_at)),
              a.id,
            ])}
            columns={[
              {
                name: "نام بیمار",
                formatter: (_, row) => {
                  const sick_id = Number(row.cells[0].data);
                  const sickName =
                    sicksData?.find((s: ISick) => s.id === sick_id)
                      ?.nameFamily ?? "ناشناس";
                  return h("span", {}, sickName); // مقدار رشته‌ای
                },
              },
              {
                name: "نام دکتر",
                formatter: (_, row) => {
                  const doctor_id = Number(row.cells[1].data);
                  const doctorName =
                    doctorsData?.find((d: IDoctor) => d.id === doctor_id)
                      ?.nameFamily ?? "ناشناس";
                  return h("span", {}, doctorName); // مقدار رشته‌ای
                },
              },
              "روز هفته",
              "ساعت",
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
                        title: "رد کردن",
                      },
                      h("span", {
                        dangerouslySetInnerHTML: { __html: renderIcon(X) },
                      })
                    ),
                  ]);
                },
              },
            ]}
            pagination={{ limit: 5 }}
            sort={true}
            language={{
              search: { placeholder: "جستجو..." },
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
  );
}
