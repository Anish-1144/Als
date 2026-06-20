export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: { code: string; message: string };
  meta?: Record<string, unknown>;
};

export async function clientApi<T>(
  path: string,
  init?: RequestInit,
): Promise<ApiResponse<T>> {
  const res = await fetch(`/api/v1${path}`, {
    credentials: "include",
    cache: "no-store",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  return res.json();
}

export async function clientApiData<T>(
  path: string,
  init?: RequestInit,
): Promise<T | null> {
  const json = await clientApi<T>(path, init);
  return json.success && json.data !== undefined ? json.data : null;
}
