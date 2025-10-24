import { NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export interface ISelectedTime {
  times: string[];
  day: string;
}

export interface IDoctor {
  id: number;
  nameFamily: string;
  expertise_id: number;
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
    id: 1,
    nameFamily: "سارا رحمانی",
    expertise_id: 1,
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
    id: 2,
    nameFamily: "فرید خلج",
    expertise_id: 2,
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
    id: 3,
    nameFamily: "کامران ترابی",
    expertise_id: 3,
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



export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // 🟢 خواندن فیلدهای متنی
    const nameFamily = formData.get("nameFamily") as string;
    const expertise_id = Number(formData.get("expertise_id"));
    const experience = formData.get("experience") as string;
    const phone = formData.get("phone") as string;
    const visit_price = Number(formData.get("visit_price"));
    const meli_code = formData.get("meli_code") as string;
    const email = formData.get("email") as string;
    const about = formData.get("about") as string;

    // 🟢 خواندن فایل عکس
    const file = formData.get("image") as File;
    let imagePath = "";

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), "public", "uploads", "doctors");

      // ساخت پوشه در صورت نیاز
      await mkdir(uploadDir, { recursive: true });

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);

      imagePath = `/uploads/doctors/${fileName}`;
    }

    const newDoctor: IDoctor = {
      id: doctors.length+1,
      nameFamily,
      expertise_id,
      experience,
      phone,
      visit_price,
      meli_code,
      email,
      image: imagePath,
      about,
      schedules: [],
      created_at: new Date().toLocaleDateString("fa-IR"),
    };

    doctors.push(newDoctor);

    return Response.json({ message: "Doctor added successfully", doctor: newDoctor }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}