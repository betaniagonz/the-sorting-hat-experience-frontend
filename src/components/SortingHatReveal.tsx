import { createSignal, onMount, onCleanup } from 'solid-js'
import { Button } from './Button'
import { speakSortingHatReveal, cancelSortingHatSpeech } from '../utils/sortingHatSpeech'

interface SortingHatRevealProps {
  houseName: string
  studentName: string
  onContinue: () => void
}

export function SortingHatReveal(props: SortingHatRevealProps) {
  const [showMessage, setShowMessage] = createSignal(false)
  const [hatVisible, setHatVisible] = createSignal(false)
  const [hatTalking, setHatTalking] = createSignal(false)
  const [showPlayButton, setShowPlayButton] = createSignal(false)

  const startVoice = () =>
    speakSortingHatReveal(
      props.studentName,
      props.houseName,
      () => setHatTalking(true),
      () => {
        setHatTalking(false)
        setShowMessage(true)
      }
    )

  onMount(() => {
    setHatVisible(true)
    let fallbackTimer: ReturnType<typeof setTimeout>
    const cancelSpeech = startVoice()
    fallbackTimer = setTimeout(() => setShowMessage(true), 10000)
    setTimeout(() => setShowPlayButton(true), 2000)
    onCleanup(() => {
      cancelSpeech()
      cancelSortingHatSpeech()
      clearTimeout(fallbackTimer)
    })
  })

  return (
    <div class="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 parchment-bg">
      <div class="animate-ink-spread flex flex-col items-center max-w-md text-center">
        {/* Sombrero Seleccionador */}
        <div
          class={`${hatVisible() ? 'animate-hat-reveal' : 'opacity-0'} ${hatTalking() ? 'animate-hat-talking' : ''}`}
        >
          <img
            src="/sorting-hat.png"
            alt="Sombrero Seleccionador"
            class="w-40 h-48 md:w-52 md:h-60 object-contain drop-shadow-[0_8px_24px_rgba(92,74,58,0.4)] [mix-blend-mode:screen]"
          />
        </div>

        {/* Botón para reproducir si la voz no inició automáticamente */}
        {showPlayButton() && !showMessage() && !hatTalking() && (
          <button
            type="button"
            onClick={() => {
              cancelSortingHatSpeech()
              startVoice()
            }}
            class="mt-4 font-dancing text-sepia-dark text-sm underline hover:text-sepia-dark/80"
          >
            Reproducir mensaje del Sombrero
          </button>
        )}

        {/* Mensaje del sombrero */}
        <div
          class={`mt-6 transition-all duration-700 ease-out ${
            showMessage() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div class="hand-drawn-border inline-block px-6 py-4 mb-6 bg-[rgba(255,250,240,0.9)]">
            <p class="font-henny text-black text-xl md:text-2xl">
              {props.studentName}, has sido asignad{['a', 'e'].includes(props.studentName.trim().slice(-1).toLowerCase()) ? 'a' : 'o'} a
            </p>
            <p class="font-henny text-2xl md:text-3xl text-black mt-2">
              {props.houseName}
            </p>
          </div>
          <p class="font-henny text-black text-xl md:text-2xl mb-8 font-semibold">
            El Sombrero Seleccionador ha decidido
          </p>
          <Button onClick={props.onContinue}>
            Ver mi carta de aceptación
          </Button>
        </div>
      </div>
    </div>
  )
}
