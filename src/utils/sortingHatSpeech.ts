/**
 * Audio del Sombrero Seleccionador por casa.
 * Cada archivo contiene la voz del Sombrero anunciando el nombre de la casa.
 */
const HOUSE_AUDIO: Record<string, string> = {
  Gryffindor: '/Gryffindor.mp3',
  Hufflepuff: '/Hufflepuff.mp3',
  Ravenclaw: '/Ravenclaw.mp3',
  Slytherin: '/Slytherin.mp3',
}

let currentCancel: (() => void) | null = null

export function speakSortingHatReveal(
  _studentName: string,
  houseName: string,
  onStart?: () => void,
  onEnd?: () => void
): () => void {
  if (typeof window === 'undefined') return () => {}

  const src = HOUSE_AUDIO[houseName] ?? HOUSE_AUDIO[houseName.charAt(0).toUpperCase() + houseName.slice(1).toLowerCase()]
  if (!src) {
    onEnd?.()
    return () => {}
  }

  const audio = new Audio(src)

  const cancel = () => {
    audio.pause()
    audio.currentTime = 0
    if (currentCancel === cancel) currentCancel = null
  }

  currentCancel?.()
  currentCancel = cancel

  audio.onplay = () => onStart?.()
  audio.onended = () => {
    currentCancel = null
    onEnd?.()
  }
  audio.onerror = () => {
    currentCancel = null
    onEnd?.()
  }

  audio.play().catch(() => onEnd?.())

  return cancel
}

export function cancelSortingHatSpeech(): void {
  currentCancel?.()
  currentCancel = null
}
