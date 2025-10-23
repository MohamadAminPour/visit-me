export async function getDoctor(id: string) {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API}/doctors/${id}`);
  if (!res.ok) throw new Error("خطا در دریافت دکتر")
  return res.json();
}
