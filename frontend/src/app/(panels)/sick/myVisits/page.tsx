"use client";
import React, { useEffect, useState } from "react";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import ReactDOMServer from "react-dom/server";
import { Plus, Trash2 } from "lucide-react";

import { HiOutlineNewspaper } from "react-icons/hi";
import Link from "next/link";
import AnimatedContainer from "@/components/AnimatedContainer";
import { getDoctors } from "@/hooks/useDoctors";
import { getDoctorVisits } from "@/hooks/useDoctorVisit";
import { getSickVisits } from "@/hooks/useSickVisits";
import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "@/hooks/useMyProfile";
import Loader from "@/components/Loader";
import { IVisits } from "@/app/api/visits/route";
import { IDoctor } from "@/app/api/doctors/route";

export default function page() {
  const renderIcon = (Icon: any) =>
    ReactDOMServer.renderToString(<Icon size={18} />);

  const [token, setToken] = useState<string | null>(null);
  const [counter, setCounter] = useState<string>();

  useEffect(() => {
    const t = localStorage.getItem("tokan");
    setToken(t);
  }, []);

  //doctorData
  const { data: doctorData, isPending: doctorIsPending } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
  

  //getMyProfile
  const { data: profileData, isPending: profileDataIsPending } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getMyProfile(token as string),
    enabled: !!token,
  });
  console.log("profileData : ", profileData);

  //getSickVisits
  const { data: sickVisitsData, isPending: sickVisitsIsPending } = useQuery({
    queryKey: ["sickVisits"],
    queryFn: () => getSickVisits(profileData.user.id),
    enabled: !!token,
  });
  console.log("sickVisitsData : ", sickVisitsData);

  function handleShowVisits(id: number) {
    alert(id);
  }

  if (profileDataIsPending || sickVisitsIsPending || doctorIsPending) {
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
              data={sickVisitsData?.map((s: IVisits) => [
                s.doctor_id,
                s.week,
                s.time,
                s.status,
                s.status_text,
                s.created_at,
                s.id,
              ])}
              columns={[
                {
                  name: "نام دکتر",
                  formatter: (_, row) => {
                    const doctor_id = Number(row.cells[0].data);
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
                        text = "رد شده";
                        bg =
                          "px-2 py-1 rounded-sm text-white text-[.8rem] bg-red-500";
                        break;
                      case 1:
                        text = "در انتظار";
                        bg =
                          "px-2 py-1 rounded-sm text-white text-[.8rem] bg-yellow-500";
                        break;
                      case 2:
                        text = "ویزیت شده";
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
                "تاریخ ویزیت",
                {
                  name: "عملیات",
                  formatter: (_, row) => {
                    const id = row.cells[6].data as number;
                    const status = row.cells[3].data as number;
                    if (status === 1) {
                      return h("div", { className: "flex gap-2" }, [
                        h(
                          "button",
                          {
                            className:
                              "p-2 flex items-center gap-2 rounded cursor-pointer text-[.8rem] bg-red-500 text-white hover:bg-red-600",
                            title: "لغو نوبت",
                            // onClick: () => handleCancelVisit(id),
                          },
                          [
                            h("span", { innerText: "لغو" }),
                            h("span", {
                              dangerouslySetInnerHTML: {
                                __html: renderIcon(Trash2),
                              },
                            }),
                          ]
                        ),
                      ]);
                    }
                  },
                },
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
