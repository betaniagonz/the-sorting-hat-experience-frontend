import { createSignal, onMount } from 'solid-js'
import { Button } from './Button'

interface AcceptanceLetterModalProps {
  studentName: string
  houseName: string
  onGoToDiagon: () => void
}

export function AcceptanceLetterModal(props: AcceptanceLetterModalProps) {
  const [showLetter, setShowLetter] = createSignal(false)

  onMount(() => {
    setTimeout(() => setShowLetter(true), 600)
  })

  const gender = (name: string) => {
    const lastLetter = name.trim().slice(-1).toLowerCase()
    return lastLetter === 'a' || lastLetter === 'e' ? 'a' : 'o'
  }

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 parchment-bg">
      <div class="envelope-container">
        {/* Sobre cerrado */}
        <div
          class={`envelope-flap ${showLetter() ? 'envelope-open' : ''}`}
          aria-hidden={showLetter()}
        >
          <div class="envelope-body">
            <div class="envelope-flap-inner" />
          </div>
        </div>

        {/* Carta que se revela */}
        <div class={`letter-paper ${showLetter() ? 'letter-visible' : ''}`}>
          <div class="letter-content">
            <p class="font-henny text-sepia-dark text-xl mb-4">
              Colegio Hogwarts de Magia y Hechicería
            </p>
            <p class="font-dancing text-sepia text-base mb-6 leading-relaxed">
              Estimad{gender(props.studentName)} <strong>{props.studentName}</strong>,
            </p>
            <p class="font-dancing text-sepia text-base mb-6 leading-relaxed">
              Nos complace informarle que ha sido aceptad{gender(props.studentName)} en la casa
              de <strong>{props.houseName}</strong> en el Colegio Hogwarts de Magia y Hechicería.
            </p>
            <p class="font-dancing text-sepia text-base mb-6 leading-relaxed">
              El curso comienza el 1 de septiembre. Adjunto encontrará la lista de libros y
              equipamiento necesarios.
            </p>
            <p class="font-dancing text-sepia text-base mb-8">
              Sinceramente,
            </p>
            <p class="font-dancing text-sepia-dark text-lg">
              Minerva McGonagall
            </p>
            <p class="font-dancing text-sepia-light text-sm">
              Subdirectora
            </p>
            <div class="mt-8">
              <Button onClick={props.onGoToDiagon}>
                Ir al Callejón Diagon
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
