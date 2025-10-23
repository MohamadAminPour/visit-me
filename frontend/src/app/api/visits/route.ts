import { NextRequest } from "next/server";

export interface IVisits {
  id: number;
  nameFamily: string;
  visit_number:number
  doctor:number
  phone: string;
  meli_code: string;
  email: string;
  created_at: string;
}

const visits: IVisits[] = [
  {
    id: 1,
    nameFamily: "مهناز بهرامی",
    visit_number:75783568,
    doctor:1,
    phone: "09159764310",
    meli_code: "09276551456",
    email: "mhnazbahrami@gmail.com",
    created_at: "1404/07/25",
  },
    {
    id: 1,
    nameFamily: "سعید اسدی",
    visit_number:13780375,
    doctor:2,
    phone: "09159764310",
    meli_code: "09276551456",
    email: "saeedAssadi@gmail.com",
    created_at: "1404/07/25",
  }
];

export async function GET() {
  try {
    return Response.json(visits, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
