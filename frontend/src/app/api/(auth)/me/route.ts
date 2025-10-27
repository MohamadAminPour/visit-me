import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { sicks, ISick } from "../sickRegister/route";
import { doctors, IDoctor } from "../../doctors/route";
import { secrataries, ISecratary } from "../../secrataries/route";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token)
      return Response.json({ message: "توکن یافت نشد" }, { status: 401 });

    const decoded = jwt.verify(
      token,
      process.env.SECRET_JWT_TOKEN as string
    ) as {
      id: string | number;
      role: string;
    };

    let user: any = null;

    switch (decoded.role) {
      case "sick":
        user = sicks.find((u: ISick) => String(u.id) === String(decoded.id));
        break;
      case "doctor":
        user = doctors.find(
          (u: IDoctor) => String(u.id) === String(decoded.id)
        );
        break;
      case "secratary":
        user = secrataries.find(
          (u: ISecratary) => String(u.id) === String(decoded.id)
        );
        break;
    }

    if (!user)
      return Response.json({ message: "کاربر یافت نشد" }, { status: 404 });

    return Response.json({ user }, { status: 200 });
  } catch (error: any) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return Response.json(
        { message: "توکن نامعتبر یا منقضی است" },
        { status: 401 }
      );
    }
    console.error("❌ Error:", error);
    return Response.json({ message: "خطای سرور" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token)
      return Response.json({ message: "توکن یافت نشد" }, { status: 401 });

    const decoded = jwt.verify(
      token,
      process.env.SECRET_JWT_TOKEN as string
    ) as {
      id: string | number;
      role: string;
    };

    const { nameFamily, meli_code } = await req.json();
    if (!nameFamily || !meli_code) {
      return Response.json(
        { message: "نام و کد ملی الزامی است" },
        { status: 400 }
      );
    }

    let list: any[] = [];
    switch (decoded.role) {
      case "sick":
        list = sicks;
        break;
      case "doctor":
        list = doctors;
        break;
      case "secratary":
        list = secrataries;
        break;
    }

    const user = list.find((u) => String(u.id) === String(decoded.id));

    if (!user)
      return Response.json({ message: "کاربر یافت نشد" }, { status: 404 });

    // بروزرسانی پروفایل
    user.nameFamily = nameFamily;
    user.meli_code = meli_code;
    user.complete_profile = true;

    return Response.json(
      { message: "پروفایل با موفقیت بروزرسانی شد", user },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error:", error);
    return Response.json({ message: "خطای سرور" }, { status: 500 });
  }
}
