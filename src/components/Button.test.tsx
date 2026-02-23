import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@solidjs/testing-library'
import { Button } from './Button'

describe('Button', () => {
  it('renderiza el contenido', () => {
    render(() => <Button>Empezar</Button>)
    expect(screen.getByRole('button', { name: /empezar/i })).toBeInTheDocument()
  })

  it('llama onClick al hacer clic', () => {
    const onClick = vi.fn()
    render(() => <Button onClick={onClick}>Clic</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('está deshabilitado cuando disabled es true', () => {
    render(() => <Button disabled>Deshabilitado</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
