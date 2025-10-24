export async function getVisits() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API}/visits`);
  if (!res.ok) throw new Error("Error fetching posts");
  return res.json();
}
  