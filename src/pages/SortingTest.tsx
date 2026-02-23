import { createSignal, onMount } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { PaperCard } from '../components/PaperCard'
import { completeSorting } from '../api/client'
import { student, setStudent, setSortingResult, setError } from '../stores/studentStore'
import questionsData from '../data/questions.json'

interface QuestionOption {
  text: string
  scores: Record<string, number>
}

interface Question {
  id: number
  text: string
  options: QuestionOption[]
}

const questions = questionsData.questions as Question[]

const HOUSE_NAMES: Record<string, string> = {
  gryffindor: 'Gryffindor',
  hufflepuff: 'Hufflepuff',
  ravenclaw: 'Ravenclaw',
  slytherin: 'Slytherin',
}

const HOUSE_IDS: Record<string, number> = {
  Gryffindor: 1,
  Hufflepuff: 2,
  Ravenclaw: 3,
  Slytherin: 4,
}

function computeHouseFromScores(scores: Record<string, number>) {
  let maxScore = -1
  let winningHouse = 'Gryffindor'
  for (const [key, score] of Object.entries(scores)) {
    if (score > maxScore && HOUSE_NAMES[key]) {
      maxScore = score
      winningHouse = HOUSE_NAMES[key]
    }
  }
  return winningHouse
}

export function SortingTest() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = createSignal(0)
  const [scores, setScores] = createSignal<Record<string, number>>({
    gryffindor: 0,
    hufflepuff: 0,
    ravenclaw: 0,
    slytherin: 0,
  })
  const [submitting, setSubmitting] = createSignal(false)

  onMount(() => {
    if (!student()) {
      navigate('/')
    }
  })

  const currentQuestion = () => questions[currentIndex()]
  const progress = () => ((currentIndex() + 1) / questions.length) * 100

  const handleAnswer = (option: QuestionOption) => {
    const newScores = { ...scores() }
    for (const [house, points] of Object.entries(option.scores)) {
      newScores[house] = (newScores[house] ?? 0) + points
    }
    setScores(newScores)

    if (currentIndex() < questions.length - 1) {
      setCurrentIndex((i) => i + 1)
    } else {
      handleComplete(newScores)
    }
  }

  const handleComplete = async (finalScores: Record<string, number>) => {
    const s = student()
    if (!s) return

    setSubmitting(true)
    setError(null)
    try {
      const result = await completeSorting(s.id, finalScores)
      setSortingResult(result)
      setStudent({ ...s, houseId: result.houseId, houseName: result.houseName })
      navigate('/result')
    } catch (err) {
      // Modo demo: calcular resultado localmente si el backend no está disponible
      const houseName = computeHouseFromScores(finalScores)
      const houseId = HOUSE_IDS[houseName] ?? 1
      setSortingResult({
        studentId: s.id,
        houseId,
        houseName,
        message: `¡El Sombrero te ha asignado a ${houseName}!`,
      })
      setStudent({ ...s, houseId, houseName })
      navigate('/result')
    } finally {
      setSubmitting(false)
    }
  }

  const s = student()
  if (!s) return null

  return (
    <div class="min-h-screen parchment-bg flex flex-col items-center justify-center p-6 md:p-8">
      <div class="animate-ink-spread w-full max-w-lg">
        <PaperCard>
          <p class="font-dancing text-sepia-light text-sm mb-8">
            Pregunta {currentIndex() + 1} de {questions.length}
          </p>
          <div class="h-1 bg-sepia-light/30 rounded mb-6 overflow-hidden">
            <div
              class="h-full bg-sepia transition-all duration-300"
              style={{ width: `${progress()}%` }}
            />
          </div>

          <h2 class="font-henny text-xl md:text-2xl text-sepia-dark mb-6">
            {currentQuestion()?.text}
          </h2>

          <div class="flex flex-col gap-3">
            {currentQuestion()?.options.map((option) => (
              <button
                type="button"
                onClick={() => handleAnswer(option)}
                disabled={submitting()}
                class="hand-drawn-border bg-[rgba(255,250,240,0.9)] p-4 text-left font-dancing text-lg text-sepia-dark hover:bg-[rgba(255,250,240,1)] transition-colors disabled:opacity-50"
              >
                {option.text}
              </button>
            ))}
          </div>

          {submitting() && (
            <p class="font-dancing text-sepia-light mt-4 text-center">
              El Sombrero está deliberando...
            </p>
          )}
        </PaperCard>
      </div>
    </div>
  )
}
