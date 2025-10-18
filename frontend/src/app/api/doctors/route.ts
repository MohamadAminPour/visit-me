import { NextRequest } from "next/server";

interface IDoctors {
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

const doctors: IDoctors[] = [
  {
    id: "m7fmggmfdfg",
    nameFamily: "سارا رحمانی",
    bith_date: "1372/12/08",
    expertise: "hs79ghusdggs",
    experience: "10",
    phone: "09159764310",
    meli_code: "09276551456",
    email: "sararahmani@gmail.com",
    image: "doctor2.jpg",
    about: "",
    created_at: "1404/07/25",
  },
  {
    id: "n7s89gfgbsdgsg",
    nameFamily: "فرید خلج",
    bith_date: "1355/01/14",
    expertise: "n978ghdfdghdfh",
    experience: "18",
    phone: "09159764310",
    meli_code: "09276551456",
    email: "sararahmani@gmail.com",
    image: "doctor1.jpg",
    about: "",
    created_at: "1404/07/25",
  },
  {
    id: "mjs7dghs9d7fgsdg",
    nameFamily: "کامران ترابی",
    bith_date: "1360/06/16",
    expertise: "js9dyf979d9g",
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
