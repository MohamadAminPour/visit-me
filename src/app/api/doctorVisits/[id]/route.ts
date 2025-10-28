// api/doctorVisits/[id]/route.ts
import { doctorVisits, IDoctorVisits } from "../route";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const doctorId = Number(params.id);
    const mainVisits = doctorVisits.filter((v: IDoctorVisits) => v.doctor_id === doctorId);

    return Response.json(mainVisits, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
