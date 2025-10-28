"use client";
import React, { useEffect, useState } from "react";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import ReactDOMServer from "react-dom/server";
import { Check, Plus, X } from "lucide-react";

import { HiOutlineNewspaper } from "react-icons/hi";
import Link from "next/link";
import AnimatedContainer from "@/components/AnimatedContainer";
import { getDoctors } from "@/hooks/useDoctors";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { IDoctor } from "@/app/api/doctors/route";
import { IVisits } from "@/app/api/visits/route";
import { getVisits } from "@/hooks/useVisits";
import { getSicks } from "@/hooks/useSicks";
import { LiaUserNurseSolid } from "react-icons/lia";
import { Toast } from "@/components/Toast";
import { queryClient } from "@/lib/queryClient";
import { getMyProfile } from "@/hooks/useMyProfile";
import { ISick } from "@/app/api/(auth)/sickRegister/route";

export default function page() {
  const renderIcon = (Icon: any) =>
    ReactDOMServer.renderToString(<Icon size={18} />);

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("tokan");
    setToken(t);
  }, []);

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

  //getMyProfile
  const { data: profileData, isPending: profileDataIsPending } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getMyProfile(token as string),
    enabled: !!token,
  });

  //handleConfirmVisit
  async function handleConfirmVisit(id: number) {
    try {
      await fetch(`http://localhost:3000/api/visits/confirm/${id}`, {
        method: "PUT",
      });
      Toast.fire({
        icon: "success",
        title: "بیمار با موفقیت ویزیت شد",
      });
      await queryClient.invalidateQueries({ queryKey: ["visits"] });
    } catch (error) {
      console.log(error);
    }
  }

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
              data={visitsData
                ?.filter((visit: IVisits) => {
                  return (
                    visit.doctor_id === profileData?.user?.id
                  );
                })
                .map((s: IVisits) => [
                  s.user_id,
                  s.week,
                  s.time,
                  s.status,
                  s.status_text,
                  new Intl.DateTimeFormat("fa-IR").format(new Date(s.created_at)),
                  s.id,
                  new Intl.DateTimeFormat("fa-IR").format(
                    new Date(s.created_at)
                  ),
                ])}
              columns={[
                {
                  name: "نام بیمار",
                  formatter: (_, row) => {
                    const sick_id = Number(row.cells[0].data);
                    const sickName =
                      sicksData?.find((d:ISick) => d.id === sick_id)?.nameFamily ??
                      "ناشناس";
                    return h("span", {}, sickName);
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
                "تاریخ ویزیت",
                {
                  name: "عملیات",
                  formatter: (_, row) => {
                    const id = row.cells[6].data as number;
                    return h("div", { className: "flex gap-2" }, [
                      h(
                        "button",
                        {
                          className:
                            "p-2 rounded cursor-pointer text-[.8rem] bg-green-500 text-white hover:bg-green-600",
                          onClick: () => handleConfirmVisit(id),
                          title: "تایید",
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
