"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getDoctor } from "@/hooks/useDoctor";
import Loader from "@/components/Loader";
import { useParams, useRouter } from "next/navigation";
import AnimatedContainer from "@/components/AnimatedContainer";
import { getuseExpertise } from "@/hooks/useExpertise";
import { IExpertisies } from "@/app/api/expertisies/route";
import { Toast } from "@/components/Toast";
import { getMyProfile } from "@/hooks/useMyProfile";
import { queryClient } from "@/lib/queryClient";

export default function DoctorDetailsPage() {
  const id = useParams().id as string;
  const API = process.env.NEXT_PUBLIC_API_URL;
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const t = localStorage.getItem("tokan");
    setToken(t);
  }, []);

  //getDoctors
  const { data: doctorData, isPending: doctorPending } = useQuery({
    queryKey: ["doctor", id],
    queryFn: () => getDoctor(id),
    enabled: !!id, // فقط وقتی id وجود دارد
  });

  //getMyProfile
  const { data: profileData, isPending: profileDataIsPending } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getMyProfile(token as string),
    enabled: !!token,
  });

  //getuseExpertise
  const { data: expertiseData, isPending: ExpertisePending } = useQuery({
    queryKey: ["expertise"],
    queryFn: getuseExpertise,
  });

  interface ISelectedTime {
    time: string;
    day: string;
  }

  const [selectedTime, setSelectedTime] = useState<ISelectedTime>({
    time: "",
    day: "",
  });

  console.log(profileData);

  async function handleChangeTime(e: any) {
    e.preventDefault();

    if (selectedTime.day && selectedTime.time) {
      Toast.fire({
        icon: "success",
        timer:7000,
        title:
          "نوبت با موفقیت ثبت شد، لطفا سر موقع تشریف بیاورید و حتما همراه خود کارت ملی یا شناسنامه و کارت بانکی بیاورید .",
      });
      await fetch(`${API}/visits`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          user_id: Number(profileData?.user?.id),
          doctor_id: Number(id),
          week: selectedTime.day,
          time: selectedTime.time,
        }),
      });
      await queryClient.invalidateQueries({ queryKey: ["sickVisits"] });
     setTimeout(() => {
       router.push("/sick/myVisits");
     }, 2000);
    } else {
      Toast.fire({
        icon: "error",
        title: "لطفا یک نوبت را انتخاب کنید",
      });
      return;
    }
  }

  if (doctorPending) {
    return <Loader />;
  }

  return (
    <AnimatedContainer>
      <div className="w-full">
        <div className="mx-auto min-h-screen">
          {/* Doctor Info */}
          <div className="bg-white shadow-xl shadow-zinc-200/30 border-1 border-zinc-200  rounded-2xl p-6 flex flex-col md:flex-row items-start gap-6">
            <img
              src={doctorData?.image}
              alt={doctorData?.nameFamily}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
            />
            <div className="flex-1 text-right">
              <h1 className="text-2xl font-bold text-slate-800">
                {doctorData?.nameFamily}
              </h1>
              <p className="text-primary text-sm mt-1">
                {doctorData?.expertise}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                {
                  expertiseData?.find(
                    (exp: IExpertisies) => exp.id === doctorData?.expertise_id
                  )?.name
                }
              </p>
              <p className="text-gray-500 text-sm mt-1">
                سابقه: {doctorData?.experience} سال
              </p>
              <p className="text-gray-700 text-sm mt-2">{doctorData?.about}</p>
              {/* <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                <MapPin className="w-4 h-4 text-primary" />
                {doctorData?.address}
              </div> */}
            </div>
          </div>

          {/* Visit Times */}
          <div className="mt-5 bg-white rounded-2xl shadow-xl shadow-zinc-200/30 border-1 border-zinc-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              زمان‌های ویزیت
            </h2>

            <div className="space-y-5">
              {doctorData?.schedules?.map((schedule: any, i: number) => (
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
                  {(doctorData?.visit_price ?? 0).toLocaleString()} تومان
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
