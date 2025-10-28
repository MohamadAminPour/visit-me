import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export interface IAdmin {
  id: string;
  nameFamily: string;
  phone: string;
  password: string;
  role: string;
}

export const admins: IAdmin[] = [
  {
    id: "1",
    nameFamily: "محمد امین پور",
    phone: "09159875066",
    password: "1234",
    role: "admin",
  },
];

export async function POST(req: NextRequest) {
  try {
    const { phone, password }: IAdmin = await req.json();

    const jswKey = process.env.SECRET_JWT_TOKEN as string;

    const mainAdmin = admins.find(
      (admin) => admin.phone === phone && admin.password === password
    );
    const token = jwt.sign(
      { id: mainAdmin?.id, phone: mainAdmin?.phone, role: mainAdmin?.role },
      jswKey,
      {
        expiresIn: "1d",
      }
    );

    if (phone && password) {
      if (mainAdmin) {
        return Response.json(
          { message: "Your info", mainAdmin, token: token },
          { status: 200 }
        );
      } else {
        return Response.json({ message: "Admin not found !" }, { status: 404 });
      }
    } else {
      return Response.json({ message: "Fill inputs !" }, { status: 409 });
    }
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
