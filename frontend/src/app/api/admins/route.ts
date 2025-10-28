import { NextRequest } from "next/server";
import { admins, IAdmin } from "../(auth)/adminLogin/route";


export async function GET() {
  try {
    return Response.json(admins, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}