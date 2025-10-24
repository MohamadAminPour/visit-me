"use client";
import React, { useEffect, useState } from "react";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import ReactDOMServer from "react-dom/server";
import { Trash2, Eye, Plus, X } from "lucide-react";
import { TbEditCircle } from "react-icons/tb";

import { LiaUserNurseSolid } from "react-icons/lia";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { getDoctors } from "@/hooks/useDoctors";
import { IDoctor } from "@/app/api/doctors/route";
import { queryClient } from "@/lib/queryClient";
import { getuseExpertise } from "@/hooks/useExpertise";
import { IExpertisies } from "@/app/api/expertisies/route";
import { Toast } from "@/components/Toast";

export default function page() {
  const [addDoctor, setAddDoctor] = useState(false);
  const [formData, setFormData] = useState({
    nameFamily: "",
    expertise_id: 0,
    experience: "",
    phone: "",
    visit_price: 0,
    meli_code: "",
    email: "",
    image: "",
    about: "",
  });

  const renderIcon = (Icon: any) =>
    ReactDOMServer.renderToString(<Icon size={18} />);

  //getDoctors
  const { data: doctorData, isPending: doctorPending } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  function handleShowVisits(id: number) {
    alert(id);
  }

  //getuseExpertise
  const { data: expertiseData, isPending: ExpertisePending } = useQuery({
    queryKey: ["expertise"],
    queryFn: getuseExpertise,
  });

  //handleAddDoctor
  async function handleAddDoctor(e: any) {
    e.preventDefault();

    const fd = new FormData();
    for (const key in formData) {
      // @ts-ignore
      fd.append(key, formData[key]);
    }

    // اگر عکس انتخاب شده
    const fileInput = document.querySelector(
      'input[name="image"]'
    ) as HTMLInputElement;
    if (fileInput?.files?.[0]) {
      fd.set("image", fileInput.files[0]);
    }

    await fetch(`/api/doctors`, {
      method: "POST",
      body: fd,
    });

    //check inputs
    const allFilled = Object.values(formData).every((value) => value);

    if (allFilled) {
      Toast.fire({
        icon: "success",
        title: "دکتر با موفقیت ایجاد شد",
      });
      await queryClient.invalidateQueries({ queryKey: ["doctors"] });
      setAddDoctor(false);
      reserFormHandle();
    } else {
      Toast.fire({
        icon: "error",
        title: "لطفا تمام فیلدها را پر کنید",
      });
    }
  }

  //Loader
  if (doctorPending) {
    return <Loader />;
  }

  //reserFormHandle
  function reserFormHandle() {
    setFormData({
      nameFamily: "",
      expertise_id: 0,
      experience: "",
      phone: "",
      visit_price: 0,
      meli_code: "",
      email: "",
      image: "",
      about: "",
    });
  }

  return (
    <div className="flex flex-col bg-white py-6 px-5 gap-2 rounded-xl shadow-[0_11px_50px_1px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <LiaUserNurseSolid className="size-7" />
          <p className="font-IranYekanBold text-[1rem]">دکتر های مجموعه</p>
        </div>
        {/*buttons*/}
        {addDoctor ? (
          <button
            onClick={() => {
              setAddDoctor(!addDoctor);
              reserFormHandle();
            }}
            className="flex items-center justify-center gap-2 text-[.8rem] bg-red-600 cursor-pointer duration-300 hover:bg-red-500 p-2 px-5 rounded-lg text-white"
          >
            بستن
            <X className="size-[1rem]" />
          </button>
        ) : (
          <button
            onClick={() => {
              setAddDoctor(!addDoctor);
            }}
            className="flex items-center justify-center gap-2 text-[.8rem] bg-primary/80 cursor-pointer duration-300 hover:bg-primary p-2 px-4 rounded-lg text-white"
          >
            دکتر جدید
            <Plus className="size-[1rem]" />
          </button>
        )}
      </div>

      <div className="text-right">
        {addDoctor ? (
          <form onSubmit={handleAddDoctor}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="flex items-start flex-col mt-5">
                <label htmlFor="">نام و نام خانوادگی</label>
                <input
                  type="text"
                  name="nameFamily"
                  value={formData.nameFamily}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                  placeholder="نام خانوادگی دکتر را وارد کنید..."
                />
              </div>
              <div className="flex items-start flex-col mt-5">
                <label htmlFor="">تخصص</label>
                <select
                  name="expertise_id"
                  value={formData.expertise_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: Number(e.target.value),
                    })
                  }
                  className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                >
                  <option value="0">انتخاب کنید</option>
                  {expertiseData.map((exp: IExpertisies) => (
                    <option value={exp.id} key={exp.id}>
                      {exp.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-start flex-col mt-5">
                <label htmlFor="">سابقه کار</label>
                <input
                  type="tel"
                  name="experience"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  inputMode="numeric"
                  pattern="[0-9]*"
                  style={{ direction: "rtl" }}
                  className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                  placeholder="سابقه کار دکتر را وارد کنید..."
                />
              </div>
              <div className="flex items-start flex-col mt-5">
                <label htmlFor="">شماره تلفن</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  inputMode="numeric"
                  pattern="[0-9]*"
                  style={{ direction: "rtl" }}
                  className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                  placeholder="شماره تلفن دکتر را وارد کنید..."
                />
              </div>
              <div className="flex items-start flex-col mt-5">
                <label htmlFor="">قیمت ویزیت (تومان)</label>
                <input
                  type="tel"
                  name="visit_price"
                  value={formData.visit_price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  inputMode="numeric"
                  pattern="[0-9]*"
                  style={{ direction: "rtl" }}
                  className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                  placeholder="قیمت ویزیت دکتر را وارد کنید..."
                />
              </div>
              <div className="flex items-start flex-col mt-5">
                <label htmlFor="">کدملی</label>
                <input
                  type="tel"
                  name="meli_code"
                  value={formData.meli_code}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  inputMode="numeric"
                  pattern="[0-9]*"
                  style={{ direction: "rtl" }}
                  className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                  placeholder="کدملی دکتر را وارد کنید..."
                />
              </div>
              <div className="flex items-start flex-col mt-5">
                <label htmlFor="">ایمیل</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  type="text"
                  className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                  placeholder="ایمیل دکتر را وارد کنید..."
                />
              </div>
              <div className="flex items-start flex-col mt-5">
                <label htmlFor="">عکس پروفایل</label>
                <input
                  name="image"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.files
                        ? e.target.files[0]
                        : null,
                    })
                  }
                  type="file"
                  className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                />
              </div>
            </div>
            <div className="flex items-start flex-col mt-5">
              <label htmlFor="">توضیحات</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
                id=""
                cols={30}
                rows={5}
                className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
              ></textarea>
            </div>
            <div className="flex items-center gap-1">
              <button className="flex items-center justify-center gap-2 bg-primary/80 cursor-pointer duration-300 hover:bg-primary p-2 px-5 rounded-lg text-white text-[.9rem] mt-5 ">
                ایجاد
              </button>
            </div>
          </form>
        ) : (
          <Grid
            data={doctorData.map((a: IDoctor) => [
              a.id,
              a.nameFamily,
              a.phone,
              a.email,
              a.meli_code,
              a.expertise_id,
              a.id,
            ])}
            columns={[
              "ردیف",
              "نام و نام خانوادگی",
              "شماره تلفن",
              "ایمیل",
              "کدملی",
              "تخصص",
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
                        title: "مشاهده",
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
        )}
      </div>
    </div>
  );
}
