const API_BASE = '/api';

export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({})) as { message?: string };
    const msg = err.message ?? `Error del servidor (${response.status})`
    const error = new Error(msg) as Error & { status?: number }
    error.status = response.status
    throw error
  }

  return response.json();
}

export async function getHealth() {
  return fetchApi<{ status: string; message: string }>('/health');
}

export interface StudentResponse {
  id: number;
  name: string;
  houseId: number | null;
  houseName: string | null;
  createdAt: string;
}

export async function createStudent(name: string): Promise<StudentResponse> {
  return fetchApi<StudentResponse>('/students', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

export async function getStudent(id: number): Promise<StudentResponse> {
  return fetchApi<StudentResponse>(`/students/${id}`);
}

export interface SortingCompleteResponse {
  studentId: number;
  houseId: number;
  houseName: string;
  message: string;
}

export async function completeSorting(
  studentId: number,
  scores: Record<string, number>
): Promise<SortingCompleteResponse> {
  return fetchApi<SortingCompleteResponse>('/sorting/complete', {
    method: 'POST',
    body: JSON.stringify({ studentId, scores }),
  });
}

export interface WandResponse {
  id: number;
  woodType: string;
  coreType: string;
  compatibleHouseId: number | null;
  compatibleHouseName: string | null;
  description: string;
}

export async function getAllWands(): Promise<WandResponse[]> {
  return fetchApi<WandResponse[]>('/wands');
}

export async function getCompatibleWands(houseId: number): Promise<WandResponse[]> {
  return fetchApi<WandResponse[]>(`/wands/compatible/${houseId}`);
}

export async function assignWand(studentId: number, wandId: number): Promise<StudentResponse> {
  return fetchApi<StudentResponse>(`/students/${studentId}/wand`, {
    method: 'PATCH',
    body: JSON.stringify({ wandId }),
  });
}
