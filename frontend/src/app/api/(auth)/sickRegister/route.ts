import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export interface ISick {
  id: number;
  nameFamily: string | null;
  phone: string;
  role: string;
  meli_code: string | null;
  complete_profile: boolean;
  created_at: Date;
}

export const sicks: ISick[] = [
  {
    id: 1,
    nameFamily: "محسن کیایی",
    phone: "09026024562",
    meli_code: "0926511451",
    role: "sick",
    complete_profile: false,
    created_at: new Date(),
  },
  {
    id: 2,
    nameFamily: "فرید علیمی",
    phone: "09159875066",
    meli_code: "0928871665",
    role: "sick",
    complete_profile: false,
    created_at: new Date(),
  },
];

export async function POST(req: NextRequest) {
  try {
    const { phone }: { phone: string } = await req.json();
    const jwtKey = process.env.SECRET_JWT_TOKEN as string;

    if (!phone || phone.length !== 11) {
      return Response.json({ message: "شماره موبایل معتبر نیست" }, { status: 400 });
    }

    const mainSick = sicks.find((s) => s.phone === phone);

    if (mainSick) {
      return Response.json({ message: "این شماره قبلاً ثبت شده است" }, { status: 409 });
    }

    const newSick: ISick = {
      id: sicks.length + 1,
      nameFamily: null,
      phone,
      meli_code: null,
      role: "sick",
      complete_profile: false,
      created_at: new Date(),
    };

    sicks.push(newSick);

    const token = jwt.sign({ id: newSick.id, phone }, jwtKey, { expiresIn: "1d" });

    return Response.json({ message: "ثبت‌نام با موفقیت انجام شد", sick: newSick, token }, { status: 201 });
  } catch (error) {
    return Response.json({ message: "خطای سرور" }, { status: 500 });
  }
}
