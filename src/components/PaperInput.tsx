interface PaperInputProps {
  placeholder?: string
  value?: string
  onInput?: (e: InputEvent & { currentTarget: HTMLInputElement }) => void
  type?: 'text' | 'email'
  label?: string
  class?: string
}

export function PaperInput(props: PaperInputProps) {
  return (
    <div class={props.class}>
      {props.label && (
        <label class="block font-dancing text-sepia-dark text-lg mb-2">
          {props.label}
        </label>
      )}
      <input
        type={props.type ?? 'text'}
        placeholder={props.placeholder}
        value={props.value ?? ''}
        onInput={props.onInput}
        class="input-paper w-full"
      />
    </div>
  )
}
