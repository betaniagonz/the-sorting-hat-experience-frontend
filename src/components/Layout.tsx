import { Footer } from './Footer'

export function Layout(props: { children?: import('solid-js').JSX.Element }) {
  return (
    <div class="min-h-screen flex flex-col">
      <main class="flex-1">
        {props.children}
      </main>
      <Footer />
    </div>
  )
}
