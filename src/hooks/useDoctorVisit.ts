export async function getDoctorVisits(id:number) {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API}/doctorVisits/${id}`);
  if (!res.ok) throw new Error("خطا در دریافت نوبت دکتر")
  return res.json();
}
