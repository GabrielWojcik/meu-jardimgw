import { ApiError } from "@/lib/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, init);

  if (!res.ok) {
    const info = await res.json().catch(() => null);
    throw new ApiError(`Falha ao chamar ${path} (${res.status})`, res.status, info);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

export const adminClient = {
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

  postForm: <T>(path: string, form: FormData) =>
    request<T>(path, { method: "POST", body: form }),
};
