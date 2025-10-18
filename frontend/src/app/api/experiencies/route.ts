import { NextRequest } from "next/server";

interface IExperiencies {
  id: number;
  name: string;
  created_at: string;
}

const experiencies: IExperiencies[] = [
  {
    id: 1,
    name: "چشم پزشک",
    created_at: "1404/07/25",
  },
  {
    id: 2,
    name: "دندان پزشک",
    created_at: "1404/07/25",
  },
  {
    id: 3,
    name: "پوست و مو",
    created_at: "1404/07/25",
  },
];

export async function GET() {
  try {
    return Response.json(experiencies, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
