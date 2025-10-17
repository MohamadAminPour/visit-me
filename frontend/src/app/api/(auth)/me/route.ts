import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface IJwtPayload {
  id: string;
  phone: string;
  iat: number;
  exp: number;
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const secret = process.env.SECRET_JWT_TOKEN;
    if (!secret)
      throw new Error("SECRET_JWT_TOKEN is not defined in environment");

    const decoded = jwt.verify(token, secret) as IJwtPayload;
    
    return NextResponse.json(
      {
        message: "Token is valid",
        user: {
          id: decoded.id,
          phone: decoded.phone,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
