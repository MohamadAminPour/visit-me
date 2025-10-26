import { NextRequest } from "next/server";

export interface IDoctorVisits {
  id: number;
  doctor_id: number;
  week: string;
  time: string;
  created_at: string | Date;
}

export let doctorVisits: IDoctorVisits[] = [
  {
    id: 1,
    doctor_id: 1,
    week: "شنبه",
    time: "12:15",
    created_at: "1404/07/25",
  },
  {
    id: 2,
    doctor_id: 2,
    week: "شنبه",
    time: "12:00",
    created_at: "1404/07/25",
  },
  {
    id: 3,
    doctor_id: 2,
    week: "شنبه",
    time: "12:15",
    created_at: "1404/07/25",
  },
  {
    id: 4,
    doctor_id: 2,
    week: "شنبه",
    time: "12:30",
    created_at: "1404/07/25",
  },
  {
    id: 5,
    doctor_id: 2,
    week: "شنبه",
    time: "12:45",
    created_at: "1404/07/25",
  },
  {
    id: 6,
    doctor_id: 2,
    week: "یک شنبه",
    time: "12:00",
    created_at: "1404/07/25",
  },
  {
    id: 7,
    doctor_id: 2,
    week: "یک شنبه",
    time: "12:15",
    created_at: "1404/07/25",
  },
];

export async function POST(req: NextRequest) {
  try {
    const body: IDoctorVisits = await req.json();
    const {  doctor_id, week, time } = body;
    const date = new Date();

    doctorVisits.push({
      id: doctorVisits.length + 1,
      doctor_id,
      week,
      time,
      created_at: date,
    });

    return Response.json(doctorVisits, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    doctorVisits = doctorVisits.filter((exp: IDoctorVisits) => exp.id !== id);

    return Response.json(doctorVisits, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
