import "server-only";
import { ApiError } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

async function request<T>(
  path: string,
  init: RequestInit
): Promise<T> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL não está definida");
  }
  if (!ADMIN_API_KEY) {
    throw new Error("ADMIN_API_KEY não está definida");
  }

  const url = new URL(path.replace(/^\//, ""), `${API_URL}/`);

  const res = await fetch(url.toString(), {
    ...init,
    headers: {
      ...init.headers,
      "x-api-key": ADMIN_API_KEY,
    },
  });

  if (!res.ok) {
    const info = await res.json().catch(() => null);
    throw new ApiError(`Falha ao chamar ${path} (${res.status})`, res.status, info);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

export const adminApi = {
  post: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),

  patch: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),

  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),

  // Sem Content-Type manual: o fetch define o boundary multipart sozinho a partir do FormData
  postForm: <T>(path: string, form: FormData) =>
    request<T>(path, { method: "POST", body: form }),
};
