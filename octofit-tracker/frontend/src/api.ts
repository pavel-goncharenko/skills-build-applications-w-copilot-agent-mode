export const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

type PaginatedResponse<T> = {
  results?: T[];
  data?: T[];
  items?: T[];
  docs?: T[];
};

export async function fetchCollection<T>(collection: string): Promise<T[]> {
  const response = await fetch(`${apiBaseUrl}/${collection}/`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as T[] | PaginatedResponse<T>;

  if (Array.isArray(payload)) {
    return payload;
  }

  return payload.results ?? payload.data ?? payload.items ?? payload.docs ?? [];
}