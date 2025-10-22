import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
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
    const jswKey = process.env.SECRET_JWT_TOKEN as string;

    const { phone }: { phone: string } = await req.json();
    const mainSick = sicks.find((sick) => sick.phone === phone);

    const token = jwt.sign(
      { id: mainSick?.id, phone: mainSick?.phone },
      jswKey,
      {
        expiresIn: "1d",
      }
    );

    if (!phone || phone.length < 11 || phone.length > 11) {
      return Response.json(
        { message: "Please enter any phone" },
        { status: 404 }
      );
    } else if (mainSick) {
      return Response.json(
        { message: "Sick with this phone has already exists" },
        { status: 409 }
      );
    } else {
      sicks.push({ id: crypto.randomUUID(), phone, role: "sick" });
      return Response.json(
        { message: "Sick is registred", mainSick, token },
        { status: 201 }
      );
    }
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
