export async function getuseExpertise() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API}/expertisies`);
  if (!res.ok) throw new Error("خطا در دریافت تخصص")
  return res.json();
}
