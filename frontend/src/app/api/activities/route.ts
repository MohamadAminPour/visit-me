import { NextRequest } from "next/server";

interface IActivities {
  id: number;
  created_at: string;
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
    return Response.json(activities, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
