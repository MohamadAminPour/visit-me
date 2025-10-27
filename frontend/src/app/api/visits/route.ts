import { NextRequest } from "next/server";

export interface IVisits {
  id: number;
  user_id: number;
  doctor_id: number;
  week: string;
  time: string;
  status: number;
  status_text: string;
  created_at: string | Date;
}

export let visits: IVisits[] = [
  {
    id: 1,
    user_id: 2,
    doctor_id: 1,
    week: "شنبه",
    time: "12:15",
    status:1,
    status_text: "",
    created_at: "1404/07/25",
  },
  {
    id: 2,
    user_id: 1,
    doctor_id: 2,
    week: "شنبه",
    time: "12:00",
    status:1,
    status_text: "",
    created_at: "1404/07/25",
  },
  {
    id: 3,
    user_id: 1,
    doctor_id: 2,
    week: "شنبه",
    time: "12:15",
    status:1,
    status_text: "",
    created_at: "1404/07/25",
  },
  {
    id: 4,
    user_id: 1,
    doctor_id: 2,
    week: "شنبه",
    time: "12:30",
    status:1,
    status_text: "",
    created_at: "1404/07/25",
  },
  {
    id: 5,
    user_id: 1,
    doctor_id: 2,
    week: "شنبه",
    time: "12:45",
    status:1,
    status_text: "",
    created_at: "1404/07/25",
  },
  {
    id: 6,
    user_id: 1,
    doctor_id: 2,
    week: "یک شنبه",
    time: "12:00",
    status:1,
    status_text: "",
    created_at: "1404/07/25",
  },
  {
    id: 7,
    user_id: 1,
    doctor_id: 2,
    week: "یک شنبه",
    time: "12:15",
    status:1,
    status_text: "",
    created_at: "1404/07/25",
  },
];

export async function GET() {
  try {
    return Response.json(visits, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}



export async function POST(req: NextRequest) {
  try {
    const body: IVisits = await req.json();
    const { user_id, doctor_id, week, time } = body;
    const date = new Date();

    visits.push({
      id: visits.length + 1,
      user_id,
      doctor_id,
      week,
      time,
      status:1,
      status_text:"",
      created_at: date,
    });

    return Response.json(visits, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    visits = visits.filter((exp: IVisits) => exp.id !== id);

    return Response.json(visits, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
