import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { secrataries } from "../../secrataries/route";



export async function POST(req: NextRequest) {
  try {
    const { phone }: { phone: string } = await req.json();

    const jswKey = process.env.SECRET_JWT_TOKEN as string;

    const mainSecratary = secrataries.find(
      (secratary) => secratary.phone === phone
    );
    const token = jwt.sign(
      {
        id: mainSecratary?.id,
        phone: mainSecratary?.phone,
        role: mainSecratary?.role,
      },
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
    if (mainSecratary) {
      return Response.json(
        { message: "Your info", mainSecratary, token: token },
        { status: 200 }
      );
    }
    if (!mainSecratary) {
      return Response.json({ message: "Doctor not found !" }, { status: 404 });
    }
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
