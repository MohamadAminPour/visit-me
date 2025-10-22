import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface ISick {
  id: string;
  phone: string;
  role: string;
}

const sicks: ISick[] = [
  { id: "1", phone: "09153333333", role: "sick" },
  { id: "2", phone: "09154444444", role: "sick" },
];

export async function POST(req: NextRequest) {
  try {
    const { phone }: { phone: string } = await req.json();

    const jswKey = process.env.SECRET_JWT_TOKEN as string;

    const mainSick = sicks.find((sick) => sick.phone === phone);
    const token = jwt.sign(
      { id: mainSick?.id, phone: mainSick?.phone, role: mainSick?.role },
      jswKey,
      {
        expiresIn: "1d",
      }
    );

    if (!phone || phone.length < 11 || phone.length > 11) {
      return Response.json(
        { message: "Please enter any phone" },
        { status: 409 }
      );
    }
    if (mainSick) {
      return Response.json(
        { message: "Your info", mainSick, token: token },
        { status: 200 }
      );
    }
    if (!mainSick) {
      return Response.json({ message: "Sick not found !" }, { status: 404 });
    }
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
