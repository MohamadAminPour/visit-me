import { NextRequest } from "next/server";

export interface IDoctor {
  id: string;
  nameFamily: string;
  bith_date: string;
  expertise: string;
  experience: string;
  phone: string;
  meli_code: string;
  email: string;
  image: string;
  about: string;
  created_at: string;
}

const doctors: IDoctor[] = [
  {
    id: "1",
    nameFamily: "سارا رحمانی",
    bith_date: "1372/12/08",
    expertise: "پوست و مو",
    experience: "10",
    phone: "09159764310",
    meli_code: "09276551456",
    email: "sararahmani@gmail.com",
    image: "doctor2.jpg",
    about: "",
    created_at: "1404/07/25",
  },
  {
    id: "2",
    nameFamily: "فرید خلج",
    bith_date: "1355/01/14",
    expertise: "چشم پزشک",
    experience: "18",
    phone: "09159764310",
    meli_code: "09276551456",
    email: "sararahmani@gmail.com",
    image: "doctor1.jpg",
    about: "",
    created_at: "1404/07/25",
  },
  {
    id: "3",
    nameFamily: "کامران ترابی",
    bith_date: "1360/06/16",
    expertise: "دندان پزشک",
    experience: "12",
    phone: "09159764310",
    meli_code: "09276551456",
    email: "sararahmani@gmail.com",
    image: "doctor3.jpg",
    about: "",
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
