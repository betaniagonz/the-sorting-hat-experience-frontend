import { createSignal } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { Button } from '../components/Button'
import { PaperInput } from '../components/PaperInput'
import { PaperCard } from '../components/PaperCard'
import { createStudent } from '../api/client'
import { setStudent, setError, resetStore, error } from '../stores/studentStore'

export function Landing() {
  const navigate = useNavigate()
  const [name, setName] = createSignal('')
  const [loading, setLoading] = createSignal(false)

  const handleStart = async () => {
    const n = name().trim()
    if (!n) return

    setLoading(true)
    resetStore()
    setError(null)
    try {
      const student = await createStudent(n)
      setStudent(student)
      navigate('/test')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al crear estudiante'
      const status = (err as { status?: number })?.status
      setError(msg)
      // Modo demo: si el backend no está disponible (5xx, red) o falla, continuar con datos locales
      const isNetworkError = /fetch|network|failed|connection|refused/i.test(msg)
      const isServerError = status && status >= 500
      if (isNetworkError || isServerError) {
        setStudent({
          id: 0,
          name: n,
          houseId: null,
          houseName: null,
          createdAt: new Date().toISOString(),
        })
        setError(null)
        navigate('/test')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div class="min-h-screen parchment-bg flex flex-col items-center justify-center p-6 md:p-8">
      <div class="animate-ink-spread w-full max-w-md">
        <PaperCard class="text-center">
          <h1 class="font-henny text-4xl md:text-5xl text-sepia-dark mb-2">
            Harry Potter
          </h1>
          <h2 class="font-dancing text-2xl md:text-3xl text-sepia mb-8">
            The Sorting Hat Experience
          </h2>

          <p class="font-dancing text-lg text-sepia-light mb-6">
            Bienvenido a Hogwarts. El Sombrero Seleccionador te espera...
          </p>

          <PaperInput
            label="¿Cuál es tu nombre?"
            placeholder="Escribe tu nombre..."
            value={name()}
            onInput={(e) => setName(e.currentTarget.value)}
            class="mb-6"
          />

          {error() && (
            <p class="font-dancing text-red-700 mb-4">{error()}</p>
          )}
          <Button
            onClick={handleStart}
            disabled={!name().trim() || loading()}
          >
            {loading() ? 'Entrando a Hogwarts...' : 'Empezar el Test'}
          </Button>
        </PaperCard>
      </div>
    </div>
  )
}
