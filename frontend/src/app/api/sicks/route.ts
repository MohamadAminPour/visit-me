import { NextRequest } from "next/server";

interface ISick {
  id: number;
  nameFamily: string;
  phone: string;
  meli_code: string;
  insurance: string;
  created_at: string;
}

const sicks: ISick[] = [
  {
    id: 1,
    nameFamily: "محمد امین پور",
    phone: "09159875066",
    meli_code: "09276551456",
    insurance: "تامین اجتماعی",
    created_at: "1404/07/25",
  },
  {
    id: 2,
    nameFamily: "علی رضایی",
    phone: "09157624331",
    meli_code: "09276551456",
    insurance: "تامین اجتماعی",
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
