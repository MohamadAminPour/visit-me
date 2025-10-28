"use server";

export type StatusType = 200 | 404 | 409 | 0;
export interface LoginState {
  status?: StatusType;
  token?: string;
}

export default async function adminLoginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const phone = formData.get("phone");
  const password = formData.get("password");

  const res = await fetch(`${API}/adminLogin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, password }),
  });

  const data = await res.json();

  if (res.status === 200) return { status: 200, token: data.token };
  if (res.status === 409) return { status: 409, token: "" };
  if (res.status === 404) return { status: 404, token: "" };

  return { status: 0, token: "" }; 
}
