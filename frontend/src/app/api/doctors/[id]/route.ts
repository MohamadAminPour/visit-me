import { NextRequest, NextResponse } from "next/server";
import { doctors, IDoctor } from "../route";


export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id as string;
    const doctor = doctors.find((d: IDoctor) => String(d.id) === id);

    if (!doctor) {
      return NextResponse.json({ message: "دکتر پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json(doctor, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
