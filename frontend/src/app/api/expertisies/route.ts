import { NextRequest } from "next/server";

export interface IExpertisies {
  id: number;
  name: string;
  created_at: string | Date;
}

let expertisies: IExpertisies[] = [
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
    return Response.json(expertisies, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    const date = new Date();

    let mainExperience = expertisies.find((exp) => exp.name === name);
    if (mainExperience) {
      return Response.json(
        { message: `تخصص ${name} وجود دارد` },
        { status: 409 }
      );
    } else {
      expertisies.push({
        id: expertisies.length + 1,
        name,
        created_at: date,
      });
      return Response.json({ message: name }, { status: 200 });
    }
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    expertisies = expertisies.filter((exp: IExpertisies) => exp.id !== id);

    return Response.json(expertisies, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
