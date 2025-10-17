import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
interface ISick {
  id: string;
  phone: string;
}

const sicks: ISick[] = [
  { id: "jfs89fhsfsf", phone: "0917653333434" },
  { id: "ofihdf8ghdf", phone: "0917653333431" },
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

    if (mainSick) {
      return Response.json(
        { message: "Sick with this phone has already exists" },
        { status: 409 }
      );
    } else {
      sicks.push({ id: crypto.randomUUID(), phone });
      return Response.json(
        { message: "Sick is registred", mainSick, token },
        { status: 201 }
      );
    }
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
