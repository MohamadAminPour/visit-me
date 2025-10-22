"use server";

export default async function sickRegisterAction(
  prevState: any,
  formData: FormData
) {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const phone = formData.get("phone");

  const res = await fetch(`${API}/sickRegister`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone }),
  });
  const data = await res.json();

  if (res.ok && res.status === 201) {
    return {
      status: 201,
      token: data.token,
    };
  }
  if (res.status === 404) {
    return {
      status: 404
    };
  } else {
    return {
      status: 409,
    };
  }
}
