export function Footer() {
  return (
    <footer class="absolute w-full bottom-0 py-4 px-6 text-center bg-[#2c1810] text-[#f4e4bc]">
      <p class="font-dancing text-sm">
        Creado por{' '}
        <a
          href="https://github.com/betaniagonz"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:opacity-80"
        >
          Betanydev
        </a>{' '}
        y Cursor.
      </p>
      <p class="font-dancing text-sm mt-2">
        Repositorios:{' '}
        <a
          href="https://github.com/betaniagonz/the-sorting-hat-experience-backend"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:opacity-80"
        >
          Backend
        </a>
        {' · '}
        <a
          href="https://github.com/betaniagonz/the-sorting-hat-experience-frontend"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:opacity-80"
        >
          Frontend
        </a>
        {' · '}
        <a
          href="https://github.com/betaniagonz/the-sorting-hat-experience-frontend/tree/master/documents_AI"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:opacity-80"
        >
          documentos_AI
        </a>
      </p>
    </footer>
  )
}
