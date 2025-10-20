export async function getDoctors() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API}/doctors`);
  if (!res.ok) throw new Error("Error fetching Doctors");
  return res.json();
}
  