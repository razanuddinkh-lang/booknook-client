import type { ApiError } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function getJwt(): Promise<string> {
  const response = await fetch("/api/token", { cache: "no-store" });
  const data = (await response.json()) as { token?: string; message?: string };
  if (!response.ok || !data.token) {
    throw new Error(data.message || "Please log in to continue.");
  }
  return data.token;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  requiresAuth = false,
): Promise<T> {
  const token = requiresAuth ? await getJwt() : undefined;
  const headers = new Headers(options.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (options.body && !(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || "The request could not be completed.") as ApiError;
    error.status = response.status;
    throw error;
  }
  return data as T;
}
