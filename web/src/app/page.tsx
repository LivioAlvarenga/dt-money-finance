import ComponentExample from '@/components/ComponentExample'

export default function Home() {
  return (
    <main className="wrapper flex min-h-screen flex-col items-start justify-center p-10">
      <ComponentExample />
      <h2 className="headline3 pb-5">Não esquecer de:</h2>
      <ul className="flex flex-wrap items-start justify-between gap-4">
        <li className="body1 pb-3">
          Ir na pasta files e modificar o arquivo favicon.xcf e adiciona-lo em
          src/app/favicon.ico - Use o gimp para isso o favicon possuem as
          medidas 16x16, 32x32, 48x48, 256x256. Este arquivo irá gerar os
          favicons para os navegadores.
        </li>
        <li className="body1 pb-3">
          Ir na pasta files e modificar os arquivos logo-og-800-600.xcf e
          logo-og-1800-1600.xcf e adiciona-los em public/logo-og-800-600.png e
          public/logo-og-1800-1600.png - Use o gimp para isso. Estes arquivos
          são citados no layout no metadata.
        </li>
        <li className="body1 pb-3">
          Adicione o diretório files no .gitignore, aqui guardamos arquivos do
          projeto que não queremos enviar para o repositório.
        </li>
        <li className="body1 pb-3">
          Criar arquivo .env na raiz do projeto e adicionar as variáveis de
          ambiente que deseja trabalhar - Não esqueça de modificar o arquivo
          .env.example para refletir as variáveis que você criou.
        </li>
        <li className="body1 pb-3">
          Criar arquivo .npmrc e adicione save-exact=true, se não quiser que o
          npm atualize as versões dos pacotes.
        </li>
        <li className="body1 pb-3">
          Edite p arquivo .nvmrc e adicione a versão do node que deseja usar no
          projeto.
        </li>
        <li className="body1 pb-3">
          Edite a variável metadata em src/app/layout.tsx para refletir as suas
          informações.
        </li>
        <li className="body1 pb-3">
          Edite o arquivo tailwind.config.js para refletir as suas informações
          de cores do seu projeto.
        </li>
        <li className="body1 pb-3">
          Edite o arquivo src/styles/globals.css para refletir as suas classes e
          estilos globais.
        </li>
        <li className="body1 pb-3">
          Edite o arquivo src/styles/fonts para refletir as suas fontes.
        </li>
        <li className="body1 pb-3">
          Edite o arquivo src/app/robots e sitemap para refletir as suas urls.
        </li>
      </ul>
    </main>
  )
}
