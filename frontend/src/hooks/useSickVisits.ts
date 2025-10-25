import { IVisits } from "@/app/api/visits/route";

export async function getSickVisits(user_id:number) {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API}/visits`);
  const data = await res.json()

  const mainMyVisits = data.filter((v:IVisits)=>v.user_id===user_id)
  return mainMyVisits
}
  