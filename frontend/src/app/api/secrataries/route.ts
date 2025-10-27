import { NextRequest } from "next/server";

export interface ISecratary {
  id: number;
  nameFamily: string;
  phone: string;
  created_at: string | Date;
}

export let secrataries: ISecratary[] = [
  {
    id: 1,
    nameFamily: "زهرا ملکی",
    phone: "09159764310",
    created_at: "1404/07/25",
  },
];

export async function GET() {
  try {
    return Response.json(secrataries, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { nameFamily, phone } = await req.json();
    const date = new Date();

    let mainSecrataries = secrataries.find((exp) => exp.phone === phone);
    if (mainSecrataries) {
      return Response.json(
        { message: `منشی ای با این شماره ${phone} وجود دارد` },
        { status: 409 }
      );
    } else {
      secrataries.push({
        id: secrataries.length + 1,
        nameFamily,
        phone,
        created_at: date,
      });
      return Response.json(secrataries, { status: 200 });
    }
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    secrataries = secrataries.filter((exp: ISecratary) => exp.id !== id);

    return Response.json(secrataries, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
