import Link from 'next/link'

interface CopyrightProps {
  text: string
}

export function Copyright({ text }: CopyrightProps) {
  const currentYear = new Date().getFullYear()

  return (
    <p className="body2 max-w-full text-center text-tGray">
      Copyright © <span>{currentYear}</span>{' '}
      {`Todos os Direitos Reservados ${text}`}
      <span className="py-2 font-bold"> | </span>
      <span>
        Website Design by
        <Link
          className="accessibilityFocus cursor-pointer rounded-sm transition-colors lg:hover:text-primary"
          href="https://www.produtivese.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          title="Website Produtivese Tecnologia"
        >
          {' '}
          Produtivese
        </Link>{' '}
        -
        <Link
          className="accessibilityFocus cursor-pointer rounded-sm transition-colors lg:hover:text-primary"
          href="https://www.livioalvarenga.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="Website Livio Alvarenga Desenvolvedor"
        >
          {' '}
          Livio Alvarenga
        </Link>
      </span>
    </p>
  )
}
