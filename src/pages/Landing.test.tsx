import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@solidjs/testing-library'
import { Landing } from './Landing'

vi.mock('@solidjs/router', () => ({
  useNavigate: () => vi.fn(),
}))

describe('Landing', () => {
  it('muestra el título y el formulario', () => {
    render(() => <Landing />)
    expect(screen.getByText(/Harry Potter/i)).toBeInTheDocument()
    expect(screen.getByText(/The Sorting Hat Experience/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/escribe tu nombre/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /empezar el test/i })).toBeInTheDocument()
  })

  it('el botón está deshabilitado cuando el nombre está vacío', () => {
    render(() => <Landing />)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
