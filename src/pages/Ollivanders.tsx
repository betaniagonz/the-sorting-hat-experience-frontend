import { createSignal, onMount, Show } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { Button } from '../components/Button'
import { PaperCard } from '../components/PaperCard'
import { getAllWands, assignWand } from '../api/client'
import { student, setStudent, resetStore } from '../stores/studentStore'
import type { WandResponse } from '../api/client'

const MOCK_WANDS: { woodType: string; coreType: string; compatibleHouseId: number; compatibleHouseName: string; description: string }[] = [
  { woodType: 'Roble', coreType: 'Nervio de Dragón', compatibleHouseId: 1, compatibleHouseName: 'Gryffindor', description: 'Varita de roble, ideal para magos valientes.' },
  { woodType: 'Fresno', coreType: 'Fibra de Corazón de Dragón', compatibleHouseId: 2, compatibleHouseName: 'Hufflepuff', description: 'Varita de fresno, leal a su dueño.' },
  { woodType: 'Avellano', coreType: 'Fibra de Corazón de Dragón', compatibleHouseId: 2, compatibleHouseName: 'Hufflepuff', description: 'Varita de avellano, pacífica y constante.' },
  { woodType: 'Ébano', coreType: 'Pelo de Unicornio', compatibleHouseId: 3, compatibleHouseName: 'Ravenclaw', description: 'Varita de ébano, para mentes brillantes.' },
  { woodType: 'Tejo', coreType: 'Pluma de Fénix', compatibleHouseId: 4, compatibleHouseName: 'Slytherin', description: 'La varita de tejo elige a su dueño. Famosamente conocida.' },
]

function getMockAllWands(): WandResponse[] {
  return MOCK_WANDS.map((w, i) => ({
    id: i + 1,
    woodType: w.woodType,
    coreType: w.coreType,
    compatibleHouseId: w.compatibleHouseId,
    compatibleHouseName: w.compatibleHouseName,
    description: w.description,
  }))
}

export function Ollivanders() {
  const navigate = useNavigate()
  const [wands, setWands] = createSignal<WandResponse[]>([])
  const [loading, setLoading] = createSignal(true)
  const [selecting, setSelecting] = createSignal(false)
  const [selectedWand, setSelectedWand] = createSignal<WandResponse | null>(null)
  const [error, setError] = createSignal<string | null>(null)
  const [demoMode, setDemoMode] = createSignal(false)

  onMount(async () => {
    const s = student()
    if (!s || !s.houseId) {
      setLoading(false)
      return
    }

    setError(null)
    try {
      const list = await getAllWands()
      setWands(list)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar varitas')
      setWands(getMockAllWands())
      setDemoMode(true)
    } finally {
      setLoading(false)
    }
  })

  const [assignError, setAssignError] = createSignal<string | null>(null)

  const handleSelectWand = async (wand: WandResponse) => {
    const s = student()
    if (!s) return

    if (demoMode()) {
      setAssignError(null)
      setSelectedWand(wand)
      return
    }

    setSelecting(true)
    setError(null)
    setAssignError(null)
    try {
      const updated = await assignWand(s.id, wand.id)
      setStudent(updated)
      setSelectedWand(wand)
    } catch (err) {
      setAssignError(err instanceof Error ? err.message : 'Error al asignar varita')
      setSelectedWand(wand)
    } finally {
      setSelecting(false)
    }
  }

  const handleRandomWand = () => {
    const list = wands()
    const s = student()
    if (list.length === 0 || !s?.houseId) return
    // La varita más compatible es la que coincide con la casa del estudiante
    const compatible = list.filter((w) => w.compatibleHouseId === s.houseId)
    const chosen = compatible.length > 0
      ? compatible[Math.floor(Math.random() * compatible.length)]
      : list[Math.floor(Math.random() * list.length)]
    handleSelectWand(chosen)
  }

  const s = student()
  const hasHouse = s?.houseId != null

  if (!s) {
    navigate('/')
    return null
  }

  if (!hasHouse) {
    return (
      <div class="min-h-screen parchment-bg flex flex-col items-center justify-center p-6 md:p-8">
        <div class="animate-ink-spread w-full max-w-md">
          <PaperCard class="text-center">
            <h1 class="font-henny text-3xl md:text-4xl text-sepia-dark mb-4">
              Ollivander's
            </h1>
            <p class="font-dancing text-xl text-sepia mb-6">
              Debes completar el Test del Sombrero Seleccionador y recibir tu carta de
              aceptación antes de visitar la tienda de varitas.
            </p>
            <Button onClick={() => { resetStore(); navigate('/') }}>Volver al inicio</Button>
          </PaperCard>
        </div>
      </div>
    )
  }

  return (
    <Show
      when={selectedWand()}
      keyed
      fallback={
    <div class="min-h-screen parchment-bg flex flex-col items-center justify-center p-6 md:p-8">
      <div class="animate-ink-spread w-full max-w-2xl">
        <PaperCard>
          <h1 class="font-henny text-3xl md:text-4xl text-sepia-dark text-center mb-2">
            Ollivander's
          </h1>
          <p class="font-dancing text-sepia-light text-center mb-8">
            Todas las varitas disponibles · Compatible con {s.houseName}
          </p>

          {error() && (
            <p class="font-dancing text-red-700 mb-4 text-center">{error()}</p>
          )}

          {loading() ? (
            <p class="font-dancing text-sepia-light text-center">
              Cargando varitas...
            </p>
          ) : wands().length === 0 ? (
            <p class="font-dancing text-sepia text-center mb-6">
              No se encontraron varitas disponibles.
            </p>
          ) : (
            <>
              <div class="mb-6">
                <Button
                  onClick={handleRandomWand}
                  disabled={selecting()}
                  class="w-full"
                >
                  {selecting() ? 'La varita te elige...' : 'Dejar que la varita me elija'}
                </Button>
              </div>

              <div class="space-y-4">
                {wands().map((wand) => {
                  const isCompatible = wand.compatibleHouseId === s.houseId
                  return (
                    <button
                      type="button"
                      onClick={() => handleSelectWand(wand)}
                      disabled={selecting()}
                      class="hand-drawn-border w-full bg-[rgba(255,250,240,0.9)] p-4 text-left hover:bg-[rgba(255,250,240,1)] transition-colors disabled:opacity-50"
                    >
                      <div class="flex items-start justify-between gap-2">
                        <div>
                          <p class="font-henny text-sepia-dark text-lg">
                            {wand.woodType} · {wand.coreType}
                          </p>
                          <p class="font-dancing text-sepia-light text-sm mt-1">
                            {wand.description}
                          </p>
                        </div>
                        {wand.compatibleHouseName && (
                          <span
                            class={`shrink-0 text-xs font-dancing px-2 py-1 rounded ${
                              isCompatible
                                ? 'bg-green-100 text-green-800'
                                : 'bg-sepia-light/20 text-sepia'
                            }`}
                          >
                            {wand.compatibleHouseName}
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </>
          )}

          <div class="mt-8 text-center">
            <Button onClick={() => { resetStore(); navigate('/') }} variant="seal">
              Volver al inicio
            </Button>
          </div>
        </PaperCard>
      </div>
    </div>
      }
    >
      {(wand) => (
        <div class="min-h-screen parchment-bg flex flex-col items-center justify-center p-6 md:p-8">
          <div class="animate-ink-spread w-full max-w-md">
            <PaperCard class="text-center">
              <div class="mb-4 inline-block rounded-lg bg-green-100 px-4 py-2">
                <p class="font-henny text-lg text-green-800">¡Éxito!</p>
              </div>
              <h1 class="font-henny text-3xl md:text-4xl text-sepia-dark mb-2">
                ¡La varita te ha elegido!
              </h1>
              <p class="font-dancing text-sepia-light mb-6">
                Tu varita ha sido seleccionada correctamente.
              </p>
              <Show when={assignError()}>
                <p class="font-dancing text-amber-700 text-sm mb-4">
                  (No se pudo guardar en el registro, pero tu elección es válida)
                </p>
              </Show>
              <div class="hand-drawn-border inline-block px-6 py-4 mb-4">
                <p class="font-henny text-xl text-sepia-dark">
                  {wand.woodType} · {wand.coreType}
                </p>
                {wand.compatibleHouseName && (
                  <p class="font-dancing text-sm text-sepia-light mt-1">
                    Compatible con {wand.compatibleHouseName}
                  </p>
                )}
              </div>
              <p class="font-dancing text-sepia-light mb-8">{wand.description}</p>
              <Button onClick={() => { resetStore(); navigate('/') }}>
                Volver al inicio
              </Button>
            </PaperCard>
          </div>
        </div>
      )}
    </Show>
  )
}
