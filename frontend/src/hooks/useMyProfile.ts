export async function getMyProfile(token:string) {
  try {
    const API = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${API}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("⚠️ خطا در fetch پروفایل:", err);
    return null;
  }
}
