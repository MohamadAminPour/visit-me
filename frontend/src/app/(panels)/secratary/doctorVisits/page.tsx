"use client";
import React, { useEffect, useState } from "react";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import ReactDOMServer from "react-dom/server";
import { Trash2, Plus, X, Timer } from "lucide-react";
import { ImLab } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { queryClient } from "@/lib/queryClient";
import { IExpertisies } from "@/app/api/expertisies/route";
import { getuseExpertise } from "@/hooks/useExpertise";
import { Toast } from "@/components/Toast";
import { getDoctors } from "@/hooks/useDoctors";
import { IDoctor } from "@/app/api/doctors/route";
import { HiOutlineNewspaper } from "react-icons/hi";
import { doctorVisits, IDoctorVisits } from "@/app/api/doctorVisits/route";
import { getDoctorVisits } from "@/hooks/useDoctorVisit";

const weeksName = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];

export default function page() {
  const [addExpertise, setAddExpertise] = useState(false);
  const [showVisits, setShowVisits] = useState(0);
  const [formData, setFormData] = useState({
    doctor_id: 0,
    week: "",
    time: "",
  });

  const renderIcon = (Icon: any) =>
    ReactDOMServer.renderToString(<Icon size={18} />);

  //doctorData
  const { data: doctorData, isPending: doctorIsPending } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  //handleAddVisit
  async function handleAddVisit(e: any) {
    e.preventDefault();
    console.log(formData);

    //check inputs
    const allFilled = Object.values(formData).every((value) => value);
    if (allFilled) {
      await fetch(`http://localhost:3000/api/doctorVisits`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(formData),
      });
      Toast.fire({
        icon: "success",
        title: "نوبت با موفقیت ایجاد شد",
      });
      await queryClient.invalidateQueries({ queryKey: ["doctorVisits"] });
      setAddExpertise(false);
    } else {
      Toast.fire({
        icon: "error",
        title: "لطفا تمام فیلدها را پر کنید",
      });
      return;
    }
  }

  //handleShowDoctorVisits
  const { data: doctorVisitsData, isPending: doctorVisitsIsPending } = useQuery(
    {
      queryKey: ["doctorVisits", showVisits],
      queryFn: () => getDoctorVisits(showVisits),
      enabled: !!showVisits, // فقط وقتی showVisits مقدار دارد، fetch کن
    }
  );

  useEffect(() => {
    console.log("📊 doctorVisitsData updated:", doctorVisitsData);
  }, [doctorVisitsData]);

  function handleShowVisits(id: number) {
    alert(id);
  }

  if (doctorIsPending) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col bg-white py-6 px-5 gap-2 rounded-xl shadow-[0_11px_50px_1px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <HiOutlineNewspaper className="size-5" />
          <p className="font-IranYekanBold text-[1rem]">نوبت های دکتر</p>
        </div>
        {/*buttons*/}
        {showVisits ? (
          <button
            onClick={() => {
              setShowVisits(0);
            }}
            className="flex items-center justify-center gap-2 text-[.8rem] bg-red-600 cursor-pointer duration-300 hover:bg-red-500 p-2 px-5 rounded-lg text-white"
          >
            بستن
            <X className="size-[1rem]" />
          </button>
        ) : (
          <>
            {addExpertise ? (
              <button
                onClick={() => {
                  setAddExpertise(!addExpertise);
                }}
                className="flex items-center justify-center gap-2 text-[.8rem] bg-red-600 cursor-pointer duration-300 hover:bg-red-500 p-2 px-5 rounded-lg text-white"
              >
                بستن
                <X className="size-[1rem]" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setAddExpertise(!addExpertise);
                }}
                className="flex items-center justify-center gap-2 text-[.8rem] bg-primary/80 cursor-pointer duration-300 hover:bg-primary p-2 px-4 rounded-lg text-white"
              >
                نوبت جدید
                <Plus className="size-[1rem]" />
              </button>
            )}
          </>
        )}
      </div>

      <div className="text-right">
        {showVisits ? (
          <Grid
            data={(doctorVisitsData ?? [])?.map((a: IDoctorVisits) => [
              a.doctor_id,
              a.week,
              a.time,
              a.id,
            ])}
            columns={[
              {
                name: "نام دکتر",
                formatter: (_, row) => {
                  const doctor_id = Number(row.cells[0].data);
                  const doctor = doctorData?.find(
                    (d: IDoctor) => d.id === doctor_id
                  );

                  return h("span", {}, doctor && doctor.nameFamily);
                },
              },
              "روز هفته",
              "ساعت",
              {
                name: "عملیات",
                formatter: (_, row) => {
                  const id = row.cells[3].data as number; // ستون id برای عملیات
                  return h("div", { className: "flex gap-2" }, [
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
        ) : (
          <>
            {addExpertise ? (
              <form onSubmit={handleAddVisit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
                  <div className="flex items-start flex-col mt-5">
                    <label htmlFor="">نام دکتر</label>
                    <select
                      name="doctor_id"
                      value={formData.doctor_id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: Number(e.target.value),
                        })
                      }
                      className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                    >
                      <option value="0">انتخاب کنید</option>
                      {doctorData.map((exp: IDoctor) => (
                        <option value={exp.id} key={exp.id}>
                          {exp.nameFamily}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-start flex-col mt-5">
                    <label htmlFor="">نام هفته</label>
                    <select
                      name="week"
                      value={formData.week}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                      className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                    >
                      <option value="0">انتخاب کنید</option>
                      {weeksName.map((w: string) => (
                        <option value={w} key={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-start flex-col mt-5">
                    <label htmlFor="">ساعت</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                      className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                      placeholder="ساعت را وارد کنید..."
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="flex items-center justify-center gap-2 bg-primary/80 cursor-pointer duration-300 hover:bg-primary p-2 px-5 rounded-lg text-white text-[.9rem] mt-5 ">
                    ایجاد
                  </button>
                </div>
              </form>
            ) : doctorData?.length ? (
              <Grid
                data={doctorData?.map((a: IDoctor) => [
                  a.nameFamily,
                  a.phone,
                  a.id,
                ])}
                columns={[
                  "نام دکتر",
                  "شماره تلفن",
                  {
                    name: "عملیات",
                    formatter: (_, row) => {
                      const id = row.cells[2].data as number; // ستون id برای عملیات
                      return h("div", { className: "flex gap-2" }, [
                        h(
                          "button",
                          {
                            className:
                              "p-2 rounded cursor-pointer text-[.8rem] bg-primary/80 text-white hover:bg-primary",
                            onClick: () => {
                              setShowVisits(id);
                              // handleShowDoctorVisits(id);
                            },
                            title: "نوبت ها",
                          },
                          h("span", {
                            dangerouslySetInnerHTML: {
                              __html: renderIcon(Timer),
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
            ) : (
              <Loader />
            )}
          </>
        )}
      </div>
    </div>
  );
}
