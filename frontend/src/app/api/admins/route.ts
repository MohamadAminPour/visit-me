import { NextRequest } from "next/server";

interface IAdmin {
  id: number;
  nameFamily: string;
  phone: string;
  meli_code: string;
  email: string;
  created_at: string;
}

const admins: IAdmin[] = [
  {
    id: 1,
    nameFamily: "محمد امین پور",
    phone: "09159764310",
    meli_code: "09276551456",
    email: "mohammad@gmail.com",
    created_at: "1404/07/25",
  },
];

export async function GET() {
  try {
    return Response.json(admins, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: IAdmin = await req.json();
    const { nameFamily, phone, meli_code, email } = body;

    return Response.json(admins, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
