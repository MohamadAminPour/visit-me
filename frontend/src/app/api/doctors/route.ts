import { NextRequest } from "next/server";

export interface ISelectedTime {
  times: string[];
  day: string;
}

export interface IDoctor {
  id: string;
  nameFamily: string;
  bith_date: string;
  expertise: string;
  experience: string;
  phone: string;
  visit_price: number;
  meli_code: string;
  email: string;
  image: string;
  about: string;
  schedules: ISelectedTime[];
  created_at: string;
}

 export const doctors: IDoctor[] = [
  {
    id: "1",
    nameFamily: "سارا رحمانی",
    bith_date: "1372/12/08",
    expertise: "پوست و مو",
    experience: "10",
    phone: "09159764310",
    visit_price: 310000,
    meli_code: "09276551456",
    email: "sararahmani@gmail.com",
    image: "/images/doctor2.jpg",
    about: "",
    schedules: [
      {
        day: "شنبه",
        times: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30"],
      },
      { day: "یکشنبه", times: ["14:00", "14:30", "15:00", "15:30"] },
      { day: "سه‌شنبه", times: ["16:00", "16:30", "17:00"] },
    ],
    created_at: "1404/07/25",
  },
  {
    id: "2",
    nameFamily: "فرید خلج",
    bith_date: "1355/01/14",
    expertise: "چشم‌ پزشک",
    experience: "18",
    phone: "09159764310",
    visit_price: 150000,
    meli_code: "09276551456",
    email: "sararahmani@gmail.com",
    image: "/images/doctor1.jpg",
    about: "",
    schedules: [
      {
        day: "شنبه",
        times: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30"],
      },
      { day: "یکشنبه", times: ["14:00", "14:30", "15:00", "15:30"] },
      { day: "پنج شنبه", times: ["16:00", "16:30", "17:00"] },
    ],
    created_at: "1404/07/25",
  },
  {
    id: "3",
    nameFamily: "کامران ترابی",
    bith_date: "1360/06/16",
    expertise: "دندان پزشک",
    experience: "12",
    phone: "09159764310",
    visit_price: 200000,
    meli_code: "09276551456",
    email: "sararahmani@gmail.com",
    image: "/images/doctor3.jpg",
    about: "",
    schedules: [
      {
        day: "شنبه",
        times: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30"],
      },
      { day: "یکشنبه", times: ["14:00", "14:30", "15:00", "15:30"] },
      { day: "سه‌شنبه", times: ["16:00", "16:30", "17:00"] },
    ],
    created_at: "1404/07/25",
  },
];

export async function GET() {
  try {
    return Response.json(doctors, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
