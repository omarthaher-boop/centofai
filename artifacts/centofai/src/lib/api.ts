const apiBase = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/api`;

async function request<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${apiBase}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export interface FavoriteRow {
  id: number;
  toolName: string;
  createdAt: string;
}

export const api = {
  listFavorites: () => request<FavoriteRow[]>("/favorites"),
  addFavorite: (toolName: string) =>
    request<FavoriteRow>("/favorites", {
      method: "POST",
      body: JSON.stringify({ toolName }),
    }),
  removeFavorite: (toolName: string) =>
    request<void>(`/favorites/${encodeURIComponent(toolName)}`, {
      method: "DELETE",
    }),
  submitTool: (data: {
    name: string;
    category: string;
    description: string;
    pricing: string;
    audience?: string;
    url: string;
  }) =>
    request<unknown>("/tool-submissions", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  deleteAccount: () =>
    request<void>("/account", { method: "DELETE" }),
  search: (q: string) =>
    request<{ tools: any[]; news: any[]; courses: any[] }>(`/search?q=${encodeURIComponent(q)}`),
  submitProposal: (data: {
    name: string;
    email: string;
    idea: string;
    budget?: string;
    timeline?: string;
  }) =>
    request<unknown>("/proposals", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  subscribeNewsletter: (email: string) =>
    request<unknown>("/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
};
