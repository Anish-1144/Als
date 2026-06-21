const API_BASE =
  process.env.API_URL?.replace(/\/$/, "") ?? "http://localhost:4000";

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: { code: string; message: string };
  meta?: Record<string, unknown>;
};

export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { token?: string },
): Promise<T> {
  const { token, ...fetchInit } = init ?? {};
  const headers = new Headers(fetchInit.headers);
  if (!headers.has("Content-Type") && fetchInit.body) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_BASE}/api/v1${path}`, {
    ...fetchInit,
    headers,
    credentials: "include",
    cache: "no-store",
  });

  const json = (await res.json()) as ApiResponse<T>;
  if (!json.success || json.data === undefined) {
    throw new Error(json.error?.message ?? `API error ${res.status}`);
  }
  return json.data;
}

export async function apiFetchOptional<T>(
  path: string,
  init?: RequestInit,
): Promise<T | null> {
  try {
    return await apiFetch<T>(path, init);
  } catch {
    return null;
  }
}

export function getApiBase() {
  return API_BASE;
}
