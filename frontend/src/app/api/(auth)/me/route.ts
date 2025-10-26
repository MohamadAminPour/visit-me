import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { sicks } from "../sickRegister/route";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) return Response.json({ message: "توکن یافت نشد" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.SECRET_JWT_TOKEN as string) as { id: number };
    const sick = sicks.find((s) => s.id === decoded.id);
    if (!sick) return Response.json({ message: "کاربر یافت نشد" }, { status: 404 });

    return Response.json({ user: sick }, { status: 200 });
  } catch (error: any) {
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      return Response.json({ message: "توکن نامعتبر یا منقضی است" }, { status: 401 });
    }
    return Response.json({ message: "خطای سرور" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) return Response.json({ message: "توکن یافت نشد" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.SECRET_JWT_TOKEN as string) as { id: number };
    const sick = sicks.find((s) => s.id === decoded.id);
    if (!sick) return Response.json({ message: "کاربر یافت نشد" }, { status: 404 });

    const { nameFamily, meli_code } = await req.json();
    if (!nameFamily || !meli_code) {
      return Response.json({ message: "نام و کد ملی الزامی است" }, { status: 400 });
    }

    sick.nameFamily = nameFamily;
    sick.meli_code = meli_code;
    sick.complete_profile = true;

    return Response.json({ message: "پروفایل با موفقیت تکمیل شد", user: sick }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "خطای سرور" }, { status: 500 });
  }
}
