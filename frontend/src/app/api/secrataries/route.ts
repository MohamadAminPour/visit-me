import { NextRequest } from "next/server";

interface ISecratary {
  id: number;
  nameFamily: string;
  phone: string;
  meli_code: string;
  email: string;
  created_at: string;
}

const secrataries: ISecratary[] = [
  {
    id: 1,
    nameFamily: "مهناز بهرامی",
    phone: "09159764310",
    meli_code: "09276551456",
    email: "mhnazbahrami@gmail.com",
    created_at: "1404/07/25",
  }
];

export async function GET() {
  try {
    return Response.json(secrataries, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
