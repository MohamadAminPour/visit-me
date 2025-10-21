"use client";

import { useEffect, useState } from "react";
import { MapPin, Calendar, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getDoctor } from "@/hooks/useDoctor";
import Loader from "@/components/Loader";
import { useParams } from "next/navigation";
import AnimatedContainer from "@/components/AnimatedContainer";

interface Schedule {
  day: string;
  times: string[];
}

export default function DoctorDetailsPage() {
  const id = useParams().id as string;
  console.log(id);

  const { data, isPending } = useQuery({
    queryKey: ["doctors", id],
    queryFn: () => getDoctor(id),
  });

  interface ISelectedTime {
    time: string;
    day: string;
  }

  const [selectedTime, setSelectedTime] = useState<ISelectedTime>({
    time: "",
    day: "",
  });

  function handleChangeTime() {
    alert(selectedTime.day + " : " + selectedTime.time);
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <AnimatedContainer>
      <div className="w-full">
        <div className="mx-auto min-h-screen">
          {/* Doctor Info */}
          <div className="bg-white shadow-xl shadow-zinc-200/30 border-1 border-zinc-200  rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
            <img
              src={data?.image}
              alt={data?.nameFamily}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
            />
            <div className="flex-1 text-right">
              <h1 className="text-2xl font-bold text-slate-800">
                {data?.nameFamily}
              </h1>
              <p className="text-primary text-sm mt-1">{data?.expertise}</p>
              <p className="text-gray-500 text-sm mt-1">
                شماره نظام پزشکی: {data?.medicalCode || "767624"}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                سابقه: {data?.experience} سال
              </p>
              <p className="text-gray-700 text-sm mt-2">{data?.about}</p>
              <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                <MapPin className="w-4 h-4 text-primary" />
                {data?.address}
              </div>
            </div>
          </div>

          {/* Visit Times */}
          <div className="mt-5 bg-white rounded-2xl shadow-xl shadow-zinc-200/30 border-1 border-zinc-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              زمان‌های ویزیت
            </h2>

            <div className="space-y-5">
              {data?.schedules.map((schedule: any, i: number) => (
                <div key={i}>
                  <p className="font-medium text-slate-700 mb-2">
                    {schedule.day}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {schedule.times.map((time: any) => (
                      <button
                        key={time}
                        onClick={() =>
                          setSelectedTime({ time, day: schedule.day })
                        }
                        className={`px-4 py-2 cursor-pointer rounded-md border flex items-center justify-center gap-1 text-sm transition ${
                          selectedTime?.time === time
                            ? "bg-primary text-white border-primary"
                            : "bg-gray-50 hover:bg-blue-50 text-gray-700 border-gray-200"
                        }`}
                      >
                        <Clock className="w-4 h-4" />
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Price and Reserve */}
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t border-t-zinc-200 pt-4 gap-4">
              <p className="text-gray-700">
                هزینه ویزیت : {/* */}
                <span className="text-primary font-semibold">
                  {data?.visit_price.toLocaleString()} تومان
                </span>
              </p>
              <div className="flex items-center gap-1">
                {selectedTime.day && selectedTime.time && (
                  <button
                    onClick={() => setSelectedTime({ time: "", day: "" })}
                    className={`px-6 py-2 text-[.8rem] rounded-lg cursor-pointer text-white transition bg-gray-400 
                    `}
                  >
                    کنسل کردن
                  </button>
                )}
                <button
                  onClick={handleChangeTime}
                  disabled={!selectedTime}
                  className={`px-6 py-2 text-[.8rem] rounded-lg  text-white transition ${
                    selectedTime
                      ? "bg-primary hover:bg-primary cursor-pointer"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  رزرو نوبت
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
}
