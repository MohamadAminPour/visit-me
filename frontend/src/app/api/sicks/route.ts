import { NextRequest } from "next/server";
import { sicks } from "../(auth)/sickRegister/route";

export interface ISick {
  id: number;
  nameFamily: string;
  phone: string;
  meli_code: string;
  insurance: string;
  birth_date: string;
  created_at: string;
}

export async function GET() {
  try {
    return Response.json(sicks, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}


