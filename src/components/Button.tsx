import type { JSX } from 'solid-js'

type ButtonVariant = 'seal' | 'seal-gryffindor' | 'seal-slytherin' | 'seal-ravenclaw' | 'seal-hufflepuff'

interface ButtonProps {
  children: JSX.Element
  variant?: ButtonVariant
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  class?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  seal: 'btn-seal',
  'seal-gryffindor': 'btn-seal bg-[#8b0000] border-[#6b0000] text-amber-100 hover:bg-[#a00000]',
  'seal-slytherin': 'btn-seal bg-[#2d5016] border-[#1d3010] text-amber-50 hover:bg-[#3d6020]',
  'seal-ravenclaw': 'btn-seal bg-[#5c4033] border-[#4c3020] text-amber-100 hover:bg-[#6c5040]',
  'seal-hufflepuff': 'btn-seal bg-[#b8860b] border-[#98700a] text-sepia-dark hover:bg-[#c89620]',
}

export function Button(props: ButtonProps) {
  const variant = props.variant ?? 'seal'
  return (
    <button
      type={props.type ?? 'button'}
      disabled={props.disabled}
      onClick={props.onClick}
      class={`${variantStyles[variant]} ${props.class ?? ''}`}
    >
      {props.children}
    </button>
  )
}
