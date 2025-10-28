import { NextRequest } from "next/server";

interface IVisitHistories {
  id: number;
  nameFamily: string;
  visit_number:number
  phone: string;
  doctor: string;
  status: string;
  statusMsg:string
  created_at: string;
}

const visitHistories: IVisitHistories[] = [
  {
    id: 1,
    nameFamily: "حامد مولایی",
    visit_number:40901011,
    phone: "09159764310",
    doctor:"769n8dgbdgss",
    status:"1",
    statusMsg:"ویزیت شد",
    created_at: "1404/07/25",
  },
   {
    id: 2,
    nameFamily: "زهرا کریمانی",
    visit_number:40901011,
    phone: "09159764310",
    doctor:"769n8dgbdgss",
    status:"0",
    statusMsg:"حضور نداشتند",
    created_at: "1404/07/25",
  },
   {
    id: 3,
    nameFamily: "علی پورحسینی",
    visit_number:40901011,
    phone: "09159764310",
    doctor:"769n8dgbdgss",
    status:"1",
    statusMsg:"ویزیت شد",
    created_at: "1404/07/25",
  },
];

export async function GET() {
  try {
    return Response.json(visitHistories, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
