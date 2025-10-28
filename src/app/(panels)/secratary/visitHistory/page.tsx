"use client";
import React from "react";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import ReactDOMServer from "react-dom/server";
import { HiOutlineNewspaper } from "react-icons/hi";
import AnimatedContainer from "@/components/AnimatedContainer";
import { getDoctors } from "@/hooks/useDoctors";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { IDoctor } from "@/app/api/doctors/route";
import { IVisits } from "@/app/api/visits/route";
import { getVisits } from "@/hooks/useVisits";
import { getSicks } from "@/hooks/useSicks";
import { IconType } from "react-icons";

export default function Page() {
  const renderIcon = (Icon: IconType) =>
    ReactDOMServer.renderToString(<Icon size={18} />);

  //doctorData
  const { data: doctorData, isPending: doctorIsPending } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  const { data: sicksData, isPending: sicksIsPending } = useQuery({
    queryKey: ["sicks"],
    queryFn: getSicks,
  });

  //getSickVisits
  const { data: visitsData, isPending: VisitsIsPending } = useQuery({
    queryKey: ["visits"],
    queryFn: getVisits,
  });


  if (!visitsData || sicksIsPending || doctorIsPending || VisitsIsPending) {
    return <Loader />;
  }

  return (
    <AnimatedContainer>
      <div className="w-full">
        <div className="flex flex-col bg-white py-6 px-5 gap-2 rounded-xl shadow-xl shadow-zinc-200/30 border-1 border-zinc-200 ">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <HiOutlineNewspaper className="size-7" />
              <p className="font-IranYekanBold text-[1rem]">نوبت های من</p>
            </div>
          </div>

          <div className="text-right">
            <Grid
              data={visitsData?.filter((v:IVisits)=>v.status===3||v.status===0).map((s: IVisits) => [
                s.user_id,
                s.doctor_id,
                s.week,
                s.time,
                s.status,
                s.status_text,
                s.created_at,
                new Intl.DateTimeFormat("fa-IR").format(new Date(s.created_at)),
              ])}
              columns={[
                {
                  name: "نام بیمار",
                  formatter: (_, row) => {
                    const sick_id = Number(row.cells[0].data);
                    const sickName =
                      sicksData?.find((d: IDoctor) => d.id === sick_id)
                        ?.nameFamily ?? "ناشناس";
                    return h("span", {}, sickName); // مقدار رشته‌ای
                  },
                },
                {
                  name: "نام دکتر",
                  formatter: (_, row) => {
                    const doctor_id = Number(row.cells[1].data);
                    const doctorName =
                      doctorData?.find((d: IDoctor) => d.id === doctor_id)
                        ?.nameFamily ?? "ناشناس";
                    return h("span", {}, doctorName); // مقدار رشته‌ای
                  },
                },
                "روز هفته",
                "ساعت",
                {
                  name: "وضعیت",
                  formatter: (cell) => {
                    let text = "";
                    let bg = "";

                    switch (cell) {
                      case 0:
                        text = "رد";
                        bg =
                          "px-2 py-1 rounded-sm text-white text-[.8rem] bg-red-500";
                        break;
                      case 1:
                        text = "در انتظار";
                        bg =
                          "px-2 py-1 rounded-sm text-white text-[.8rem] bg-yellow-500";
                        break;
                      case 2:
                        text = "پیش دکتر";
                        bg =
                          "px-2 py-1 rounded-sm text-white text-[.8rem] bg-primary";
                        break;
                      case 3:
                        text = "تایید";
                        bg =
                          "px-2 py-1 rounded-sm text-white text-[.8rem] bg-green-500";
                        break;
                      default:
                        text = "نامشخص";
                        bg =
                          "px-2 py-1 rounded-sm text-white text-[.8rem] bg-gray-500";
                    }

                    return h("span", { className: bg }, text);
                  },
                },
                "علت وضعیت",
                "تاریخ",
              ]}
              search={true}
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
    </AnimatedContainer>
  );
}
