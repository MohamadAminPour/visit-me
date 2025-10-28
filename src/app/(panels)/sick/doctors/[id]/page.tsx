"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getDoctor } from "@/hooks/useDoctor";
import Loader from "@/components/Loader";
import { useParams, useRouter } from "next/navigation";
import AnimatedContainer from "@/components/AnimatedContainer";
import { IExpertisies } from "@/app/api/expertisies/route";
import { Toast } from "@/components/Toast";
import { getMyProfile } from "@/hooks/useMyProfile";
import { queryClient } from "@/lib/queryClient";
import Swal from "sweetalert2";
import { getDoctorVisits } from "@/hooks/useDoctorVisit";
import { IDoctorVisits } from "@/app/api/doctorVisits/route";
import { getExpertise } from "@/hooks/useExpertise";
import { getVisits } from "@/hooks/useVisits";
import { IVisits } from "@/app/api/visits/route";
import Image from "next/image";

const weeksName = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];

export default function Page() {
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

  //getMyProfile
  const { data: visitsData, isPending: visitsDataIsPending } = useQuery({
    queryKey: ["visits"],
    queryFn: getVisits,
    enabled: !!token,
  });

  //getuseExpertise
  const { data: expertiseData, isPending: expertisePending } = useQuery({
    queryKey: ["expertise"],
    queryFn: getExpertise,
  });

  const { data: doctorVisitsData, isPending: doctorVisitsPending } = useQuery({
    queryKey: ["doctorVisits", id], // حتما id در key باشد
    queryFn: () => getDoctorVisits(Number(id)),
    enabled: !!id, // فقط وقتی id وجود دارد اجرا شود
  });

  console.log(doctorVisitsData);

  interface ISelectedTime {
    time: string;
    day: string;
  }

  const [selectedTime, setSelectedTime] = useState<ISelectedTime>({
    time: "",
    day: "",
  });

  async function handleChangeTime(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!selectedTime.day || !selectedTime.time) {
      Toast.fire({
        icon: "error",
        title: "لطفا یک نوبت را انتخاب کنید",
      });
      return;
    }
    if (!profileData?.user?.complete_profile) {
      Toast.fire({
        icon: "error",
        title: "لطفا اول پروفایل خود را تکمیل کنید",
      });
      return;
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-primary px-4 py-2 cursor-pointer rounded-sm text-white text-[.9rem] mx-1 ",
        cancelButton:
          "bg-red-500 px-4 py-2 cursor-pointer rounded-sm text-white text-[.9rem] mx-1 ",
      },
      buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
      title: `نوبت دکتر ${doctorData.nameFamily}`,
      text: "از نوبت انتخاب شده مطمئن هستید؟ بعد از انتخاب امکان لغو آن نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، ثبت کن",
      cancelButtonText: "خیر، لغو کن",
    });

    if (result.dismiss === Swal.DismissReason.cancel) {
      await swalWithBootstrapButtons.fire({
        title: "نوبت لغو شد",
        text: "نوبت انتخاب شده با موفقیت لغو شد، شما میتوانید یک نوبت دیگری انتخاب کنید !",
        icon: "error",
        confirmButtonText: "باشه",
      });
      setSelectedTime({ time: "", day: "" });
      return; // 🔥 این return جلوی ادامه اجرا را می‌گیرد
    }

    // ✅ اگر تأیید کرد
    const response = await fetch(`${API}/visits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: Number(profileData?.user?.id),
        doctor_id: Number(id),
        week: selectedTime.day,
        time: selectedTime.time,
      }),
    });

    // invalidate query بعد از ثبت
    await queryClient.invalidateQueries({ queryKey: ["doctorVisits"] });
    await queryClient.invalidateQueries({ queryKey: ["visits"] });

    if (!response.ok) {
      Toast.fire({
        icon: "error",
        title: "خطا در ثبت نوبت",
      });
      return;
    }

    await queryClient.invalidateQueries({ queryKey: ["sickVisits"] });

    swalWithBootstrapButtons.fire({
      title: "ثبت شد",
      text: "نوبت شما با موفقیت ثبت شد، لطفا سر موقع تشریف بیاورید و حتما همراه خود کارت ملی یا شناسنامه و کارت بانکی بیاورید !",
      icon: "success",
      confirmButtonText: "باشه",
    });

    setTimeout(() => {
      router.push("/sick/myVisits");
    }, 1500);
  }

  const doctorVisits = doctorVisitsData?.filter(
    (v: IDoctorVisits) => v.doctor_id === Number(id)
  );

  // استخراج هفته‌های منحصر به‌فرد
  const uniqueWeeks: string[] = Array.from(
    new Set(doctorVisits?.map((v: IDoctorVisits) => v.week))
  );

  if (
    doctorPending ||
    profileDataIsPending ||
    expertisePending ||
    doctorVisitsPending
  ) {
    return <Loader />;
  }

  return (
    <AnimatedContainer>
      <div className="w-full">
        <div className="mx-auto min-h-screen">
          {/* Doctor Info */}
          <div className="bg-white shadow-xl shadow-zinc-200/30 border-1 border-zinc-200  rounded-2xl p-6 flex flex-col md:flex-row items-start gap-6">
            <div className="w-[7rem] h-[7rem] relative rounded-full overflow-hidden border-blue-100 border-[.2rem]">
              <Image
                fill
                src={doctorData?.image || "/images/images.png"}
                alt={doctorData?.nameFamily || "Doctor"}
                className="object-cover"
              />
            </div>

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
              {uniqueWeeks.map((week: string) => {
                // همه‌ی تایم‌های آن هفته برای دکتر
                const times = doctorVisits
                  .filter((v: IDoctorVisits) => v.week === week)
                  .map((v: IDoctorVisits) => v.time);

                // ✅ حذف نوبت‌هایی که قبلاً در visitsData رزرو شده‌اند
                const availableTimes = times.filter((time: string) => {
                  const reserved = visitsData?.some(
                    (v: IVisits) =>
                      v.doctor_id === Number(id) &&
                      v.week === week &&
                      v.time === time
                  );
                  return !reserved; // فقط تایم‌هایی که رزرو نشده‌اند
                });

                return (
                  <div key={`week-${week}`}>
                    <p className="font-medium text-slate-700 mb-2">
                      {String(week)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {availableTimes.length > 0 ? (
                        availableTimes.map((time: string) => (
                          <button
                            key={`${week}-${time}`}
                            onClick={() => setSelectedTime({ time, day: week })}
                            className={`px-4 py-2 cursor-pointer rounded-md border flex items-center justify-center gap-1 text-sm transition ${
                              selectedTime.day === week &&
                              selectedTime.time === time
                                ? "bg-primary text-white border-primary"
                                : "bg-gray-50 hover:bg-blue-50 text-gray-700 border-gray-200"
                            }`}
                          >
                            <Clock className="w-4 h-4" />
                            {String(time)}
                          </button>
                        ))
                      ) : (
                        <p className="text-sm text-gray-400">
                          در این روز نوبت خالی وجود ندارد
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
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
