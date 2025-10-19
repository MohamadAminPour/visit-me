import { NextRequest } from "next/server";

export interface ISick {
  id: number;
  nameFamily: string;
  phone: string;
  meli_code: string;
  insurance: string;
  birth_date: string;
  created_at: string;
}

const sicks: ISick[] = [
  {
    id: 1,
    nameFamily: "محمد امین پور",
    phone: "09159875066",
    meli_code: "09276551456",
    insurance: "تامین اجتماعی",
    birth_date:"1384/12/01",
    created_at: "1404/07/25",
  },
  {
    id: 2,
    nameFamily: "علی رضایی",
    phone: "09027653801",
    meli_code: "09865443630",
    insurance: "آزاد",
    birth_date:"1384/12/01",
    created_at: "1404/07/25",
  },
];

export async function GET() {
  try {
    return Response.json(sicks, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body: ISick = await request.json();
    const { nameFamily, phone, meli_code, insurance } = body;

    // اینجا لاجیک ویرایش پروفایل رو بنویس
    console.log("ویرایش بیمار:", body);

    return Response.json({ message: "پروفایل با موفقیت ویرایش شد" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "خطا در پردازش درخواست" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
  } catch (error) {}
}
