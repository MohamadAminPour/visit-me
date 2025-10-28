"use client";
import React, { useState } from "react";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import ReactDOMServer from "react-dom/server";
import { Trash2, Plus, X } from "lucide-react";
import { ImLab } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { queryClient } from "@/lib/queryClient";
import { IExpertisies } from "@/app/api/expertisies/route";
import { getExpertise } from "@/hooks/useExpertise";
import { Toast } from "@/components/Toast";
import { IconType } from "react-icons";

export default function Page() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [addExpertise, setAddExpertise] = useState(false);
  const [expertiseName, setExpertiseName] = useState("");

  const renderIcon = (Icon: IconType) =>
    ReactDOMServer.renderToString(<Icon size={18} />);

  const { data, isPending } = useQuery({
    queryKey: ["expertisies"],
    queryFn: getExpertise,
  });

  //handleAddExpertise
  async function handleAddExpertise(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (expertiseName) {
      Toast.fire({
        icon: "success",
        title: "تخصص با موفقیت ایجاد شد",
      });
      await fetch(`${API}/expertisies`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ name: expertiseName }),
      });
      await queryClient.invalidateQueries({ queryKey: ["expertisies"] });
      setAddExpertise(false);
    } else {
      Toast.fire({
        icon: "error",
        title: "لطفا تمام فیلدها را پر کنید",
      });
      return;
    }
  }

  //handleDeleteExpertisies
  async function handleDeleteExpertisies(id: number) {
    await fetch(`${API}/expertisies`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ id }),
    });

    Toast.fire({
      icon: "success",
      title: "تخصص با موفقیت حذف شد",
    });
    await queryClient.invalidateQueries({ queryKey: ["expertisies"] });
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col bg-white py-6 px-5 gap-2 rounded-xl shadow-[0_11px_50px_1px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ImLab className="size-5" />
          <p className="font-IranYekanBold text-[1rem]">تخصص های دکتر</p>
        </div>
        {/*buttons*/}
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
            تخصص جدید
            <Plus className="size-[1rem]" />
          </button>
        )}
      </div>

      <div className="text-right">
        {addExpertise ? (
          <form onSubmit={handleAddExpertise}>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
              <div className="flex items-start flex-col mt-5">
                <label htmlFor="">نام تخصص</label>
                <input
                  value={expertiseName}
                  onChange={(e) => setExpertiseName(e.target.value)}
                  type="text"
                  className="border-1 w-full mt-2 text-right outline-0 border-zinc-200 px-2 py-2 rounded-sm placeholder:text-[.8rem]"
                  placeholder="نام تخصص را وارد کنید..."
                />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="flex items-center justify-center gap-2 bg-primary/80 cursor-pointer duration-300 hover:bg-primary p-2 px-5 rounded-lg text-white text-[.9rem] mt-5 ">
                ایجاد
              </button>
            </div>
          </form>
        ) : (
          <Grid
            data={data?.map((a: IExpertisies) => [a.id, a.name, a.id])}
            columns={[
              "ردیف",
              "نام تخصص",
              {
                name: "عملیات",
                formatter: (_, row) => {
                  const id = row.cells[0].data as number; // ستون id برای عملیات
                  return h("div", { className: "flex gap-2" }, [
                    h(
                      "button",
                      {
                        className:
                          "p-2 rounded cursor-pointer text-[.8rem] bg-red-500 text-white hover:bg-red-600",
                        onClick: () => handleDeleteExpertisies(id),
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
        )}
      </div>
    </div>
  );
}
