"use client";

import { useState } from "react";
import { MapPin, Calendar, Clock } from "lucide-react";

interface Schedule {
  day: string;
  times: string[];
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  medicalCode: string;
  experience: number;
  image: string;
  about: string;
  clinic: string;
  address: string;
  visitPrice: number;
  schedules: Schedule[];
}

export default function DoctorDetailsPage() {
  const doctor: Doctor = {
    id: 1,
    name: "دکتر سارا محمدی",
    specialty: "چشم‌ پزشک",
    medicalCode: "123456",
    experience: 8,
    image: "/images/doctor2.jpg",
    about:
      "دارای بورد تخصصی چشم‌پزشکی از دانشگاه تهران با بیش از ۸ سال سابقه درمان بیماران در زمینه جراحی لیزیک و مشکلات بینایی.",
    clinic: "کلینیک نور تهران",
    address: "تهران، خیابان ولیعصر، نرسیده به ونک",
    visitPrice: 300000,
    schedules: [
      { day: "شنبه", times: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30"] },
      { day: "یکشنبه", times: ["14:00", "14:30", "15:00", "15:30"] },
      { day: "سه‌شنبه", times: ["16:00", "16:30", "17:00"] },
    ],
  };

  const [selectedTime, setSelectedTime] = useState<string>("");

  return (
    <div className="mx-auto min-h-screen">
      {/* Doctor Info */}
      <div className="bg-white shadow-xl shadow-zinc-200/30 border-1 border-zinc-200  rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
        />
        <div className="flex-1 text-right">
          <h1 className="text-2xl font-bold text-slate-800">{doctor.name}</h1>
          <p className="text-primary text-sm mt-1">{doctor.specialty}</p>
          <p className="text-gray-500 text-sm mt-1">
            شماره نظام پزشکی: {doctor.medicalCode}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            سابقه: {doctor.experience} سال
          </p>
          <p className="text-gray-700 text-sm mt-2">{doctor.about}</p>
          <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
            <MapPin className="w-4 h-4 text-primary" />
            {doctor.address}
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
          {doctor.schedules.map((day, i) => (
            <div key={i}>
              <p className="font-medium text-slate-700 mb-2">{day.day}</p>
              <div className="flex flex-wrap gap-2">
                {day.times.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-2 cursor-pointer rounded-md border flex items-center justify-center gap-1 text-sm transition ${
                      selectedTime === time
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
              {doctor.visitPrice} تومان
            </span>
          </p>
          <div className="flex items-center gap-1">
            {selectedTime && (
              <button
                onClick={() => setSelectedTime("")}
                className={`px-6 py-2 text-[.8rem] rounded-lg cursor-pointer text-white transition bg-gray-400 
                    `}
              >
                کنسل کردن
              </button>
            )}
            <button
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
  );
}
