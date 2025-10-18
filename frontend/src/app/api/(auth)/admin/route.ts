import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface IAdmin {
  id: string;
  phone: string;
  role: string;
}

const secrataries: IAdmin[] = [
  { id: "1", phone: "09155555555", role: "admin" },
  { id: "2", phone: "09156666666", role: "admin" },
];

export async function POST(req: NextRequest) {
  try {
    const { phone }: { phone: string } = await req.json();

    const jswKey = process.env.SECRET_JWT_TOKEN as string;

    const mainAdmin = secrataries.find((admin) => admin.phone === phone);
    const token = jwt.sign(
      { id: mainAdmin?.id, phone: mainAdmin?.phone, role: mainAdmin?.role },
      jswKey,
      {
        expiresIn: "1d",
      }
    );

    if (mainAdmin) {
      return Response.json(
        { message: "Your info", mainAdmin, token: token },
        { status: 200 }
      );
    } else {
      return Response.json({ message: "Admin not found !" }, { status: 404 });
    }
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
