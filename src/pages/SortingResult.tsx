import { createSignal } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { SortingHatReveal } from '../components/SortingHatReveal'
import { AcceptanceLetterModal } from '../components/AcceptanceLetterModal'
import { student, sortingResult } from '../stores/studentStore'

export function SortingResult() {
  const navigate = useNavigate()
  const result = sortingResult()
  const s = student()
  const [showLetter, setShowLetter] = createSignal(false)

  if (!result) {
    navigate('/')
    return null
  }

  const studentName = s?.name ?? 'Estudiante'

  const handleGoToDiagon = () => {
    navigate('/ollivanders')
  }

  const handleContinueToLetter = () => {
    setShowLetter(true)
  }

  return (
    <>
      {!showLetter() ? (
        <SortingHatReveal
          houseName={result.houseName}
          studentName={studentName}
          onContinue={handleContinueToLetter}
        />
      ) : (
        <AcceptanceLetterModal
          studentName={studentName}
          houseName={result.houseName}
          onGoToDiagon={handleGoToDiagon}
        />
      )}
    </>
  )
}
