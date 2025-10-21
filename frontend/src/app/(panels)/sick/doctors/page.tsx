"use client";
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import Link from "next/link";
import AnimatedContainer from "@/components/AnimatedContainer";
import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "@/hooks/useDoctors";
import { IDoctor } from "@/app/api/doctors/route";



export default function DoctorsList() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("همه");

   const { data, isPending } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors
  });

  const filteredDoctors = data?.filter((doctor:IDoctor) => {
    const matchesSearch = doctor.nameFamily.includes(search);
    const matchesFilter = filter === "همه" || doctor.expertise === filter;
    return matchesSearch && matchesFilter;
  });

  const specialties = ["همه", "دندان پزشک", "چشم‌ پزشک", "پوست و مو"];
  console.log(filter)

  return (
    <AnimatedContainer>
      <div className="w-full">
        {/* Header */}
        <div className="w-full flex flex-col md:flex-row justify-between gap-4 mb-6">
          {/* Search bar */}
          <div className="relative w-full md:w-1/2 flex items-center justify-center rounded-lg shadow-xl shadow-zinc-200/30 border-1 border-zinc-200">
            <Search className="absolute left-3 size-[1.2rem] text-gray-400" />
            <input
              type="text"
              placeholder="جستجو پزشک..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 placeholder:text-[.9rem] pr-4 py-2 outline-0"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2 border-1 border-zinc-200 rounded-lg pl-2 shadow-xl shadow-zinc-200/30">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-[.9rem] px-3 py-2 outline-0"
            >
              {specialties.map((sp) => (
                <option key={sp}>{sp}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredDoctors?.map((doctor:IDoctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl shadow-xl shadow-zinc-200/30 border-1 border-zinc-200 transition p-5 flex flex-col items-center text-center"
            >
              <img
                src={doctor.image}
                alt={doctor.nameFamily}
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-100"
              />
              <h2 className="text-lg font-semibold text-slate-800">
                {doctor.nameFamily}
              </h2>
              <p className="text-sm text-slate-500 mt-1">{doctor.expertise}</p>
              <p className="text-xs text-gray-400 mt-1">
                سابقه کاری : {doctor.experience} سال
              </p>
              <p className="text-sm font-medium text-primary mt-2">
               هزینه ویزیت : {doctor.visit_price.toLocaleString()} تومان
              </p>
              <Link
                href={`/sick/doctors/${doctor.id}`}
                className="mt-4 bg-primary text-[.8rem] text-white px-4 py-2 rounded-lg hover:primary transition"
              >
                مشاهده جزئیات
              </Link>
            </div>
          ))}
        </div>

        {filteredDoctors?.length === 0 && (
          <p className="text-center text-gray-400 mt-8">
            پزشکی با این مشخصات یافت نشد.
          </p>
        )}
      </div>
    </AnimatedContainer>
  );
}
