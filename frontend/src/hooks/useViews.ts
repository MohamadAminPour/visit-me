export async function getViews() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API}/views`);
  if (!res.ok) throw new Error("Error fetching views");
  return res.json();
}
  