import { NextRequest } from "next/server";

export interface IVisits {
  id: number;
  user_id: number;
  doctor_id: number;
  time: string;
  week: string;
  status: number;
  status_text:string
  created_at: string | Date;
}

const visits: IVisits[] = [
  // {
  //   id: 1,
  //   user_id: 2,
  //   doctor_id: 1,
  //   time: "18:00",
  //   week: "شنبه",
  //   status: 0,
  //   status_text:"حضور نداشت",
  //   created_at: "1404/07/25",
  // },
  // {
  //   id: 2,
  //   user_id: 2,
  //   doctor_id: 1,
  //   time: "16:15",
  //   week: "شنبه",
  //   status: 2,
  //   status_text:"ویزیت شد",
  //   created_at: "1404/07/25",
  // },
  // {
  //   id: 3,
  //   user_id: 1,
  //   doctor_id: 2,
  //   time: "16:30",
  //   week: "شنبه",
  //   status: 1,
  //   status_text:"",
  //   created_at: "1404/07/25",
  // },
  // {
  //   id: 4,
  //   user_id: 3,
  //   doctor_id: 2,
  //   time: "16:30",
  //   week: "یکشنبه",
  //   status: 1,
  //   status_text:"",
  //   created_at: "1404/07/25",
  // },
  // {
  //   id: 5,
  //   user_id: 2,
  //   doctor_id: 3,
  //   time: "16:45",
  //   week: "یکشنبه",
  //   status: 1,
  //   status_text:"هنوز نیامده",
  //   created_at: "1404/07/25",
  // },
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
      status: 1,
      status_text:"هنوز نیامده",
      created_at: date,
    });

    return Response.json(visits, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
