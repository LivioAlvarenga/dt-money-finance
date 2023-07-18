import {
  Facebook,
  Github,
  Instagram,
  Link2,
  Linkedin,
  Twitter,
  Youtube,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Copyright } from './Copyright'
import { LinkIcon } from './LinkIcon'

export function Footer() {
  const VitrineDevIcon = ({ size = 82, className = '' }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={(size / 82) * 37}
      viewBox="0 0 82 37"
      fill="currentColor"
      stroke="none"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M.525.975v34.64h21.973v-3.257H3.78V4.233h74.11v28.125H64.552l-1.312 3.256h17.905V.975Z M37.803 22.563v3.822a4.485 4.485 0 0 0-2.393-.669c-2.95 0-5.046 2.137-5.046 5.123 0 2.987 2.098 5.136 5.044 5.136a4.445 4.445 0 0 0 2.897-1.042l.322.707h2.498V22.563zM35.86 33.04c-1.236 0-2.15-.94-2.15-2.2 0-1.263.914-2.201 2.149-2.201 1.236 0 2.15.938 2.15 2.198 0 1.265-.9 2.203-2.15 2.203zm17.196-2.29c0-2.82-2.149-5.034-5.251-5.034-3.012 0-5.215 2.175-5.215 5.123 0 2.936 2.216 5.123 5.215 5.123 2.406 0 4.35-1.378 5.033-3.565h-3.296c-.32.568-.966.901-1.737.901-1.044 0-1.752-.568-1.957-1.675h7.131c.052-.295.077-.579.077-.874zm-7.144-.953c.271-.953.94-1.48 1.906-1.48 1.004 0 1.685.512 1.982 1.48h-3.89zm14.444-3.76-1.79 5.69-1.814-5.69h-3.63l3.912 9.616h3l3.862-9.616zm-40.678-14.92-1.788 5.69-1.816-5.688h-3.63l3.914 9.615h3l3.86-9.615h-3.54Zm4.62-4.002v2.807h3.259V7.115Zm-.023 4.004v9.615h3.307v-9.617h-3.307zm18.805-.039c-1.146 0-1.97.32-2.652 1.107l-.515-1.068h-2.215v9.616h3.31v-4.893c0-1.222.488-1.737 1.66-1.737h1.287V11.08Zm2.15-3.965v2.807h3.257V7.115h-3.255zm-.025 4.004v9.615h3.307v-9.617h-3.307zm14.827 3.758c-.49-3.423-3.038-3.965-4.698-4.03-1.66.08-4.209.605-4.698 4.032-.025.153-.039.32-.066.461v5.394h3.335V15.6c0-1.147.515-1.842 1.429-1.932h.013c.914.092 1.43.785 1.43 1.932v5.136h3.332V15.34c-.026-.14-.051-.308-.077-.463zm11.946.967c0-2.821-2.149-5.035-5.251-5.035-3.012 0-5.215 2.177-5.215 5.123 0 2.935 2.216 5.125 5.215 5.125 2.406 0 4.35-1.378 5.033-3.567h-3.296c-.32.568-.966.901-1.737.901-1.044 0-1.752-.566-1.957-1.673h7.131c.052-.297.077-.592.077-.876zm-7.144-.967c.27-.953.94-1.48 1.906-1.48 1.004 0 1.698.514 1.982 1.48zm-28.486 3.076v2.871h-2.254c-2.109 0-3.384-1.288-3.384-3.398v-3.592h-1.737v-2.523h1.724V7.876h3.284v2.6l-.092.051-1.248.784h3.63v2.523h-2.303v3.038c0 .684.41 1.094 1.106 1.094h1.274z M30.712 13.834h-.015v.722h.015zM25.574 32.358v3.256h3.399v-3.256h-3.4z" />
    </svg>
  )
  return (
    <footer className="flex w-full flex-col items-center bg-gray-800 py-10">
      <div className="wrapper flex flex-wrap items-center justify-around gap-5 py-5 lg:gap-10">
        <Link
          href="https://www.livioalvarenga.com"
          target="_blank"
          rel="noreferrer"
          title="Portfolio Livio Alvarenga"
          className="accessibilityFocus rounded-sm sm:hidden lg:cursor-pointer"
        >
          <Image
            src={'./logoCodeDark.svg'}
            width={60}
            height={25}
            alt="ícone representando código de programação sinal menor e maior da cor azul"
          />
        </Link>
        <Link
          href="https://www.livioalvarenga.com"
          target="_blank"
          rel="noreferrer"
          title="Portfolio Livio Alvarenga"
          className="accessibilityFocus hidden rounded-sm sm:block lg:cursor-pointer"
        >
          <Image
            src={'./logo-livioalvarenga-light.svg'}
            width={350}
            height={60}
            alt="Logo do desenvolvedor Livio Alvarenga escrito em letras brancas e um ícone de código de programação sinal menor e maior da cor azul"
          />
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-3 py-5">
          <LinkIcon
            href="https://www.linkedin.com/in/livio-alvarenga-planejamento-mrp-engenheiro-produ%C3%A7%C3%A3o-materiais-vba-powerbi/"
            title="Linkedin Livio Alvarenga"
            icon={<Linkedin />}
          />

          <LinkIcon
            href="https://github.com/LivioAlvarenga"
            title="Github Livio Alvarenga"
            icon={<Github />}
          />

          <LinkIcon
            href="https://www.livioalvarenga.com/"
            title="Site Portfolio Livio Alvarenga"
            icon={<Link2 />}
          />

          <LinkIcon
            href="https://www.facebook.com/profile.php?id=100083957091312"
            title="Facebook Livio Alvarenga"
            icon={<Facebook />}
          />

          <LinkIcon
            href="https://twitter.com/AlvarengaLivio"
            title="Twitter Livio Alvarenga"
            icon={<Twitter />}
          />

          <LinkIcon
            href="https://www.instagram.com/livio_alvarenga/"
            title="Instagram Livio Alvarenga"
            icon={<Instagram />}
          />

          <LinkIcon
            href="https://www.youtube.com/channel/UCrZgsh8IWyyNrRZ7cjrPbcg"
            title="Youtube Livio Alvarenga"
            icon={<Youtube />}
          />

          <LinkIcon
            href="https://cursos.alura.com.br/vitrinedev/livioalvarenga"
            title="VitrineDev Cursos e Projetos Livio Alvarenga"
            icon={<VitrineDevIcon />}
            size={50}
          />
        </div>
      </div>
      <div className="wrapper">
        <Copyright text="Livio Alvarenga" />
      </div>
    </footer>
  )
}
