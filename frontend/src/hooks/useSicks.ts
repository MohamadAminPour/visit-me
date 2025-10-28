export async function getSicks() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API}/sicks`);
  if (!res.ok) throw new Error("Error fetching sicks");
  return res.json();
}
  