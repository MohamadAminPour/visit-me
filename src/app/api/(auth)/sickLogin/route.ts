import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { ISick, sicks } from "../sickRegister/route";

export async function POST(req: NextRequest) {
  try {
    const { phone }: { phone: string } = await req.json();
    const jwtKey = process.env.SECRET_JWT_TOKEN as string;

    // ✅ اعتبارسنجی شماره
    if (!phone || phone.length !== 11) {
      return Response.json({ message: "شماره موبایل معتبر نیست" }, { status: 409 });
    }

    // ✅ پیدا کردن کاربر
    const mainSick = sicks.find((s: ISick) => s.phone === phone);

    if (!mainSick) {
      return Response.json({ message: "کاربر یافت نشد" }, { status: 404 });
    }

    // ✅ ساخت JWT با role
    const token = jwt.sign(
      { id: mainSick.id, phone: mainSick.phone, role: mainSick.role },
      jwtKey,
      { expiresIn: "1d" }
    );

    return Response.json(
      { message: "ورود موفق", user: mainSick, token },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: "خطای سرور" }, { status: 500 });
  }
}
