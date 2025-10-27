import { NextRequest, NextResponse } from "next/server";

export interface IViews {
  id: number;
  created_at: string | Date;
}

export const views: IViews[] = [
  {
    id: 1,
    created_at: "Mon Oct 26 2024 18:06:06 GMT+0330",
  },
  {
    id: 2,
    created_at: "Mon Oct 26 2025 18:06:06 GMT+0330",
  },
  {
    id: 3,
    created_at: "Mon Oct 27 2025 18:06:06 GMT+0330",
  },
   {
    id: 4,
    created_at: "Mon Oct 27 2025 18:06:06 GMT+0330",
  },
];

export async function GET() {
  try {
    return NextResponse.json(views, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const date = new Date();
    console.log(date);

    let newView = {
      id: views.length + 1,
      created_at: date,
    };

    views.push(newView);

    return NextResponse.json(views, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
