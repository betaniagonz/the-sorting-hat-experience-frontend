import type { JSX } from 'solid-js'

interface PaperCardProps {
  children: JSX.Element
  class?: string
}

export function PaperCard(props: PaperCardProps) {
  return (
    <div class={`hand-drawn-border bg-[rgba(255,250,240,0.9)] p-6 rounded-lg ${props.class ?? ''}`}>
      {props.children}
    </div>
  )
}
