import { Footer } from './Footer'

export function Layout(props: { children?: import('solid-js').JSX.Element }) {
  return (
    <div class="h-screen h-dvh flex flex-col overflow-hidden">
      <main class="flex-1 min-h-0 overflow-auto">
        {props.children}
      </main>
      <Footer />
    </div>
  )
}
