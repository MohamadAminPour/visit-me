import { NextRequest } from "next/server";
import { sicks } from "../(auth)/sickRegister/route";

export async function GET() {
  try {
    return Response.json(sicks, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}


