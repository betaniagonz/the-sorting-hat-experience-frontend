import { ErrorBoundary } from 'solid-js'
import { Router, Route } from '@solidjs/router'
import { Landing } from './pages/Landing'
import { SortingTest } from './pages/SortingTest'
import { SortingResult } from './pages/SortingResult'
import { Ollivanders } from './pages/Ollivanders'
import { Button } from './components/Button'
import './App.css'

function App() {
  return (
    <ErrorBoundary
      fallback={(err: Error, reset: () => void) => (
        <div class="min-h-screen parchment-bg flex flex-col items-center justify-center p-6">
          <div class="max-w-md text-center">
            <h1 class="font-henny text-2xl text-sepia-dark mb-4">Algo ha ido mal</h1>
            <p class="font-dancing text-sepia mb-6">{err?.message || 'Error inesperado'}</p>
            <Button onClick={reset}>Intentar de nuevo</Button>
          </div>
        </div>
      )}
    >
      <Router>
        <Route path="/" component={Landing} />
        <Route path="/test" component={SortingTest} />
        <Route path="/result" component={SortingResult} />
        <Route path="/ollivanders" component={Ollivanders} />
      </Router>
    </ErrorBoundary>
  )
}

export default App
