"use server";

export type StatusType = 200 | 201 | 404 | 409 | 0;
export interface LoginState {
  status?: StatusType;
  token?: string;
}

export default async function sickRegisterAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const API = process.env.API_URL;
  const phone = formData.get("phone");

  const res = await fetch(`${API}/sickRegister`, {
    cache:"no-store",
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
      status: 404,
      token: "",
    };
  }
  return { status: 0, token: "" };
}
