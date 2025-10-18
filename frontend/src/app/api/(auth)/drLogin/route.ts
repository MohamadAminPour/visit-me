import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface IDoctor {
  id: string;
  phone: string;
  role: string;
}

const doctors: IDoctor[] = [
  { id: "1", phone: "09151111111", role: "doctor" },
  { id: "2", phone: "09152222222", role: "doctor" },
];

export async function POST(req: NextRequest) {
  try {
    const { phone }: { phone: string } = await req.json();

    const jswKey = process.env.SECRET_JWT_TOKEN as string;

    const mainDoctor = doctors.find((doctor) => doctor.phone === phone);
    const token = jwt.sign(
      { id: mainDoctor?.id, phone: mainDoctor?.phone, role: mainDoctor?.role },
      jswKey,
      {
        expiresIn: "1d",
      }
    );

    if (mainDoctor) {
      return Response.json(
        { message: "Your info", mainDoctor, token: token },
        { status: 200 }
      );
    } else {
      return Response.json({ message: "Doctor not found !" }, { status: 404 });
    }
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
