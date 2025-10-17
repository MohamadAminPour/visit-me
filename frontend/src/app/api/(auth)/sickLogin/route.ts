import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

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
    const { phone }: { phone: string } = await req.json();

    const jswKey = process.env.SECRET_JWT_TOKEN as string;

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
        { message: "Your info", mainSick, token: token },
        { status: 200 }
      );
    } else {
      return Response.json({ message: "Sick not found !" }, { status: 404 });
    }
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
