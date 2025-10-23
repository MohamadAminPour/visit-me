import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

import "dayjs/locale/fa";
import JalaliDate from "@/components/JalaliDate";

interface IActivities {
  id: number;
  created_at: any;
}

const activities: IActivities[] = [
  {
    id: 1,
    created_at: "1404/07/25",
  },
  {
    id: 2,
    created_at: "1404/07/25",
  },
  {
    id: 3,
    created_at: "1404/07/25",
  },
];

export async function GET() {
  try {
    return NextResponse.json(activities, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: IActivities = await req.json();
    const { id } = body;

    const date = new Date().getTime() 
    console.log(date)

    let newView = {
      id: id,
      created_at:JalaliDate(date)
    };

    activities.push(newView);

     return NextResponse.json(activities, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
