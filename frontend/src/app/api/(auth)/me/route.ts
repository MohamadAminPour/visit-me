import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface IJwtPayload {
  id: string;
  phone: string;
  role: "owner" | "sick" | "doctor" | "secretary";
  iat: number;
  exp: number;
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.SECRET_JWT_TOKEN as string;

    const decoded = jwt.verify(token, secret) as IJwtPayload;

    return NextResponse.json(
      {
        message: "Token is valid",
        user: {
          id: decoded.id,
          phone: decoded.phone,
          role: decoded.role, // 👈 اینجا نقش مشخص میشه
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}