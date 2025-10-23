import { NextRequest } from "next/server";

export interface IExperiencies {
  id: number;
  name: string;
  created_at: string | Date;
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
  {
    id: 4,
    name: "قلب و عروق",
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

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    const date = new Date();

    let mainExperience = experiencies.find((exp) => exp.name === name);
    if (mainExperience) {
      return Response.json(
        { message: `تخصص ${name} وجود دارد` },
        { status: 409 }
      );
    } else {
      experiencies.push({
        id: experiencies.length + 1,
        name,
        created_at: date,
      });
      return Response.json({ message: name }, { status: 200 });
    }
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
