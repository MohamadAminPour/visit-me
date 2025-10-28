import { NextRequest, NextResponse } from "next/server";
import { IVisits, visits } from "../../route";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const visitId = Number(params.id);

    // پیدا کردن آیتم مورد نظر
    const mainVisit = visits.find((v: IVisits) => v.id === visitId);

    if (!mainVisit) {
      return NextResponse.json({ message: "Visit not found" }, { status: 404 });
    }

    // به‌روزرسانی مقادیر
    mainVisit.status = 2;
    mainVisit.status_text = "در اتاق دکتر است";

    return NextResponse.json(mainVisit, { status: 200 });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
