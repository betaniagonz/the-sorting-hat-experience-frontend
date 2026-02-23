import { createSignal } from 'solid-js'
import type { StudentResponse, SortingCompleteResponse } from '../api/client'

export const [student, setStudent] = createSignal<StudentResponse | null>(null)
export const [sortingResult, setSortingResult] = createSignal<SortingCompleteResponse | null>(null)
export const [loading, setLoading] = createSignal(false)
export const [error, setError] = createSignal<string | null>(null)

export function resetStore() {
  setStudent(null)
  setSortingResult(null)
  setError(null)
}
