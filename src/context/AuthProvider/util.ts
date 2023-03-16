import { Api } from "../../infrastructure/api";
import { UserAuth } from "./types";

export function setUserLocalStorage(user: UserAuth | null) {
  localStorage.setItem("o", JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem("o");
  if (!json) {
    return null;
  }

  const user = JSON.parse(json);

  return user ?? null;
}

export async function LoginRequest(email: string, password: string) {
  try {
    const request = await Api.post("users/login", { email, password });

    return request.data;
  } catch (error) {
    return null;
  }
}
