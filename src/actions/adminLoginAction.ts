"use server";

export default async function adminLoginAction(
  prevState: any,
  formData: FormData
) {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const phone = formData.get("phone");
  const password = formData.get("password");

  const res = await fetch(`${API}/adminLogin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone,password }),
  });
  const data = await res.json();

  if (res.ok && res.status === 200) {
    return {
      status: 200,
      token: data.token,
    };
  }
  if (res.status === 409) {
    return {
      status: 409,
    };
  }
  if (res.status === 404) {
    return {
      status: 404,
    };
  }
}
